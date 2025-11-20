# 快速开始

## 安装

执行 `npm i @maiyunnet/kebab` 安装最新版，安装后，执行 `npx kebab init` 进行初始化，然后执行 `npx kebab` 启动项目。

也可以使用 pm2 启动项目，执行 `pm2 start npx --name "kebab" -- kebab` 即可。

## 目录

项目初始化后，会生成一些基础文件和目录，介绍如下：

- `conf/`: 配置
  - `cert/`: 证书
  - `vhost/`: 虚拟主机配置
  - `cert.json`: 框架自动引入的证书配置
  - `config.json`: 框架的所有配置内容（如 db、kv 等连接信息也在本文件）
- `ftmp/`: 上传文件的临时存放
- `ind/`: 独立应用，可用 npx kebab --ind xxx 启动
- `lib/`: 用户编写的库
- `log/`: 日志
- `mod/`: 用户定义的模型
- `www/`: 网站根目录
  - `站点名或网址` - 例如 example.com、example，可多层
    - `ctr/`: 控制器目录
    - `data/`: 数据目录，存放语言文件等
      - `locale/`: 语言文件目录
    - `stc/`: 静态资源目录
    - `view/`: 视图目录，存放 ejs 文件
    - `ws/`: WebSocket 目录
