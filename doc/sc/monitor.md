# 性能监控与异常复盘

Kebab 的每个 HTTP 子进程启动时都会自动启用 `sys/monitor`。这里的“主线程”是该子进程执行请求处理的 JavaScript 主线程；master 是负责创建、管理这些子进程的独立进程，目前没有自动启动这套监控。每个 HTTP 子进程内的主线程每秒检查资源，独立的看门狗 Worker 在该主线程无法运行时继续采样和保存阻塞现场。

## 默认检测规则

| 指标 | 默认规则 | 记录含义 |
| --- | --- | --- |
| 进程 CPU | 达到 80%，连续采样窗口持续 10 秒 | 资源使用偏高；100% 为占满一个逻辑核心，多线程可以超过 100% |
| 进程 RSS | 超过自动计算的内存阈值，持续 10 秒 | 进程驻留内存偏高，包含 JS 堆、Buffer 和原生内存 |
| 事件循环延迟 | 每秒窗口的 P99 达到 500ms，持续 10 秒 | 持续的事件循环延迟 |
| 主线程心跳 | 连续约 5 秒未更新，每秒检查一次 | 心跳中断；独立 Worker 立即尝试抓取正在执行的主线程调用栈和 CPU Profile |

各指标分别计时，CPU 高后接着内存高不会被合并成“连续异常”。未达到持续时间的 CPU/内存波动只保留在最近一分钟的采样中，不单独触发重型诊断。窗口最大事件循环延迟也保留在采样中，便于查看单次卡顿。

CPU 高本身不能证明业务出错。事件的 `impact=resource-high` 表示资源超过阈值；确认事件循环延迟或心跳中断后标记为 `event-loop-delayed`。应结合请求持续时间、CPU Profile 和业务指标判断原因。

## 配置

```ts
import * as sMonitor from '@maiyunnet/kebab/sys/monitor.js';

// --- 已自动启动的实例需要先停止，才能应用新配置 ---
sMonitor.stop();
const started = sMonitor.start({
    'cpu': 80,
    'mem': 512,
    'eloop': 500,
    'duration': 10_000,
    'blocked': 5_000,
    'heapSnapshot': false,
});
if (started === false) {
    process.stderr.write('Monitor configuration is invalid.\n');
}
```

`start()` 成功或已经启动时返回 `true`，无效配置返回 `false`。`mem=0` 自动参考系统/容器内存限制和 V8 堆上限，配置单位为 MB；`duration` 和 `blocked` 单位为 ms，最小 1000。内存预算与业务并发差异较大，应按实际进程预算配置 `mem`。监控依据绝对阈值，不会自动学习业务基线。

`stop()` 停止监控、断开正在进行的主线程 Profile 并清空请求追踪。调用它重新配置时，原有活跃请求的追踪不会延续。

## 监控日志

主线程与看门狗的监控简讯保存到 `log/system-monitor/YYYY/MM/DD/HH.jsonl` 或 `HH.csv`，采用框架的 `logFormat` 配置，默认 `jsonl`。JSONL 字段和 CSV 的 12 列顺序与 `Core.log` 一致，可通过 `Core.getLog` 读取，指定 `hostname='system'`、`fend='-monitor'` 和对应日期、小时的 `path`。看门狗在主线程阻塞时仍独立写盘；热重载后的日志格式随下一次主线程采样同步到看门狗。

日志用于查看异常简讯和诊断目录。完整的采样、诊断结果与 Profile 等取证文件保存在下述 `log/monitor/` 目录，不作为普通日志行返回。

## 读取事件和下载文件

`lib/core` 提供三个方法，通过目标服务器的 master RPC 读取已保存数据。目标 HTTP 子进程即使正在阻塞或已经退出，仍可读取磁盘中保留的记录；master 或服务器不可用时则返回读取错误。`host` 与 `getLog` 一样：省略表示本机，传入节点地址表示读取该服务器，使用当前框架配置的 `rpcPort` 和 `rpcSecret`。

| 方法 | 输入 | 返回 |
| --- | --- | --- |
| `getMonitorEvents()` | `path` 为 `YYYY/MM/DD`，默认目标服务器当天；`offset` 默认 0，`limit` 默认 20、范围 1–100；可传 `host` | `{ list, total }`；按事件目录时间倒序，摘要包含 `path`、`pid`、`time`、`source`、`status`、`reasons` |
| `getMonitorEvent()` | `path` 使用列表返回的事件路径；可传 `host` | `{ summary, data, recordStatus, files }`，包含原始事件数据及文件清单 |
| `getMonitorFile()` | `path` 使用 `files` 中的文件路径；可传 `host`、`preview` | 框架 HTTP `Response`，可通过 `getStream()` 取得原始文件流 |

三个方法发生参数、配置或读取错误时返回 `false`。列表无事件时返回空列表；事件或文件不存在时，详情和文件方法返回 `null`。调用后需要分别检查错误与不存在，不能直接将返回值作为数据使用。

```ts
import * as lCore from '@maiyunnet/kebab/lib/core.js';

// --- 从自己的节点配置中选取地址；undefined 表示本机 ---
const host = lCore.globalConfig.hosts[0];
const events = await lCore.getMonitorEvents({ host, 'limit': 20 });
if (events !== false && events.list.length > 0) {
    const event = await lCore.getMonitorEvent({ 'path': events.list[0].path, host });
    if (event !== false && event !== null) {
        for (const file of event.files) {
            console.log(file.path, file.size, file.preview);
        }
    }
}
```

路径均相对于目标服务器的 `log/monitor/`，应直接使用接口返回的 `path`。文件清单包含主线程事件 `diagnostics` 引用的看门狗取证文件；不需要从日志中的绝对磁盘路径拼接 URL。读取范围限定在监控目录及框架诊断文件名，拒绝目录穿越和符号链接逃逸。

`getMonitorEvent` 最多解析 4 MiB 的事件记录。旧目录没有记录、记录不完整或超过上限时，`data=null`，`recordStatus` 分别说明 `missing`、`invalid`、`too-large` 或 `unreadable`；现有原始文件仍可通过清单下载。

文件的 `preview` 元数据为 `json`、`text` 或 `null`。预览只开放 1 MiB 内的 JSON 和调用栈文本：调用 `getMonitorFile({ path, host, preview: true })` 后可使用 `getText()` 或 `getJson()`。复杂的 `.cpuprofile`、`.heapsnapshot` 即使很小也不提供预览；大 JSON/文本同样只下载。事件读取不会解析 Profile 或堆快照。

下载时省略 `preview` 或设为 `false`，使用 `getStream()` 将原始字节写入本地文件或传给浏览器；调用方负责消费或销毁响应流，不应将大型文件整份读入 Buffer。RPC 不会整文件读取、压缩或转换为 Base64。

浏览器下载地址由应用控制器提供，框架不会自动发布公开文件 URL。开发者应在控制器验证运维权限、限制可选节点，再调用 `getMonitorFile`，设置附件下载响应头并流式输出；不要把 RPC 密钥或内部 RPC 地址交给浏览器。

完整调用演示在 `www/example/ctr/test.ts`：`test/monitor-events` 支持日期、节点选择和分页，`test/monitor-event` 展示详情和文件清单，`test/monitor-file` 提供小文件预览与下载链接，下载过程中断开浏览器会关闭远程文件流。可从示例首页的 Monitor 分组进入。这些演示沿用示例控制器的访问限制，实际运维页面须接入应用自己的权限校验。

## Node.js 的 OOM 取证

master 创建 HTTP 子进程时已经传入 `--heapsnapshot-near-heap-limit=3`。V8 堆接近上限时，Node.js 会尝试保存最多三份堆快照；这个机制不等待监控的持续异常确认，也不受 `heapSnapshot=false` 控制。该选项不能保证保存满三份快照，生成快照本身也需要额外时间和内存，详见 [Node.js 启动参数文档](https://nodejs.org/api/cli.html#--heapsnapshot-near-heap-limitmax_count)。这些 Node.js 自动生成的快照目前没有关联到监控的 `event.json`。

`heapSnapshot=false` 只关闭监控在确认 RSS 异常后主动采集的堆快照。它不表示关闭了 Node.js 在堆接近上限时自动生成的快照。

监控按阈值主动生成诊断报告，与 Node.js 在 fatal OOM 时自动生成报告是两种触发方式。框架源码目前没有显式启用 `--report-on-fatalerror` 或 `process.report.reportOnFatalError`；运行环境额外传入的启动参数另行生效。fatal 自动报告的用途见 [Node.js 诊断报告文档](https://nodejs.org/api/report.html)。

V8 堆耗尽与系统/容器因进程内存超限而终止进程需要分别判断。Buffer 或原生内存增长不一定使 V8 堆接近上限；系统直接发送 `SIGKILL` 时，Node.js 无法执行退出前的采集，需要结合系统/容器的 OOM 记录复盘。

## 复盘文件

诊断目录位于运行项目的 `log/monitor/YYYY/MM/DD/`，各事件以时间、PID 和毫秒时间戳区分。目录权限为 `0700`，诊断文件为 `0600`。CPU Profile 的开始、停止和写入均由 Worker 执行，主线程再次阻塞不会拖延 Profile 的停止计时。

- `event.json`：主线程确认的事件。保存首次观察与确认时间、阈值、确认前一分钟的采样、事件中的采样与峰值、活跃请求、最近完成的请求、恢复快照，以及每次重型诊断的状态、文件路径和失败原因。
- `blocked-event.json`：Worker 在心跳中断时独立保存的现场。包括独立 CPU/RSS 采样、心跳中断时间、请求，以及 `lastMainSnapshot`；该快照的 `time` 是主线程最后成功提供上下文的时间，不代表阻塞中的最新 JS 堆数据。
- `report-*.json`：Node.js 诊断报告，移除命令行、环境变量、网络接口和网络端点后保存。
- `cpu-*.cpuprofile`、`blocked-cpu-*.cpuprofile`：可用 Chrome DevTools 的 Performance 面板读取的 CPU Profile。
- `blocked-stack-*.txt`：Worker 采集的主线程暂停调用栈。
- `profile-*.json`：Worker 独立保存的 Profile 结果。主线程仍在阻塞时，也可查看是否成功保存及失败原因。
- `heap-*.heapsnapshot`：明确开启 `heapSnapshot` 后，内存异常时按需采集的主线程 JS 堆快照。

主线程事件中的 `diagnostics` 会关联 Worker 的实际文件和采集结果。只有 Worker 确实保存了本次阻塞的调用栈或 Profile，主线程恢复后才省略重复 Profile；没有成功采集时会记录补救尝试，并注明无法还原已经结束的阻塞调用栈。

同一次持续异常的重型诊断间隔至少 60 秒，新增异常指标或某个指标恢复后再次升高，可以提前补充采集；每次采集都会附上当时的请求快照。新的独立事件会单独记录，不受上一事件的冷却时间限制。Inspector 正被占用时，事件摘要仍然保存，持续异常约 5 秒后重试。事件摘要每约 5 秒更新一次，恢复或采集结束后更新；正常恢复与监控被停止分别记录。

保留数据有界：确认前最多 60 次采样、事件内最近 300 次采样及累计峰值、最多 100 条活跃请求详情、最近一分钟内最多 100 条完成请求、最近 60 次重型诊断结果。诊断文件不会自动清理，应纳入项目既有日志保留策略。

## 解释边界

- 采样无法保证捕获任意短暂峰值。Profile 从异常被确认或心跳中断被发现时开始，不包含过去的执行；它能定位采集期间的热点，不能倒放异常开始前的执行。
- CPU 使用率覆盖整个进程，所采 Profile 面向主线程。原生线程池和其他 Worker 的 CPU 热点不一定出现在主线程 Profile 中。
- 请求的 CPU/RSS 增量是请求存续期间**整个进程**的增量。并发请求、后台任务、Worker 和 GC 都可能参与，不能直接把资源增量归因给单个 URL。请求参数、片段和请求体不保存。
- RSS 高不等于 JS 堆泄漏。默认的报告与内存采样用于区分堆、external、arrayBuffers 和 RSS；要分析 JS 对象保留关系，需要堆快照。堆快照不包含其他 Worker 的堆，也不能完整解释原生分配。
- 监控主动采集的堆快照同步阻塞主线程，还需要大量额外内存（见 [Node.js V8 文档](https://nodejs.org/api/v8.html#v8writeheapsnapshotfilenameoptions)），默认关闭；可用内存明显不足时跳过并记录原因。监控不会把自己主动采集的同步 Report/HeapSnapshot 开销再次当成业务异常。
- Inspector 可能无法及时中断原生调用或在 OOM 前完成采集。Worker 会保存采样及失败/超时原因，并释放采集状态；进程被 OOM killer 或强制终止时，进程内监控无法保证留下完整文件。
- `--inspect` 调试模式跳过异常确认与阻塞采集，避免干扰断点；系统时钟调整不影响 CPU 比例、持续确认与心跳计时。
