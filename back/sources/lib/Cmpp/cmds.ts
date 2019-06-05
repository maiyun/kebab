export let id = {
    /** 请求连接 */
    CMPP_CONNECT: 0x00000001,
    0x00000001: "CMPP_CONNECT",
    /** 请求连接应答 */
    CMPP_CONNECT_RESP: 0x80000001,
    0x80000001: "CMPP_CONNECT_RESP",
    /** 终止连接 */
    CMPP_TERMINATE: 0x00000002,
    0x00000002: "CMPP_TERMINATE",
    /** 终止连接应答 */
    CMPP_TERMINATE_RESP: 0x80000002,
    0x80000002: "CMPP_TERMINATE_RESP",
    /** 提交短信 */
    CMPP_SUBMIT: 0x00000004,
    0x00000004: "CMPP_SUBMIT",
    /** 提交短信应答 */
    CMPP_SUBMIT_RESP: 0x80000004,
    0x80000004: "CMPP_SUBMIT_RESP",
    /** 短信下发 */
    CMPP_DELIVER: 0x00000005,
    0x00000005: "CMPP_DELIVER",
    /** 下发短信应答 */
    CMPP_DELIVER_RESP: 0x80000005,
    0x80000005: "CMPP_DELIVER_RESP",
    /** 发送短信状态查询 */
    CMPP_QUERY: 0x00000006,
    0x00000006: "CMPP_QUERY",
    /** 发送短信状态查询应答 */
    CMPP_QUERY_RESP: 0x80000006,
    0x80000006: "CMPP_QUERY_RESP",
    /** 删除短信 */
    CMPP_CANCEL: 0x00000007,
    0x00000007: "CMPP_CANCEL",
    /** 删除短信应答 */
    CMPP_CANCEL_RESP: 0x80000007,
    0x80000007: "CMPP_CANCEL_RESP",
    /** 激活测试 */
    CMPP_ACTIVE_TEST: 0x00000008,
    0x00000008: "CMPP_ACTIVE_TEST",
    /** 激活测试应答 */
    CMPP_ACTIVE_TEST_RESP: 0x80000008,
    0x80000008: "CMPP_ACTIVE_TEST_RESP",
    /** 消息前转 */
    CMPP_FWD: 0x00000009,
    0x00000009: "CMPP_FWD",
    /** 消息前转应答 */
    CMPP_FWD_RESP: 0x80000009,
    0x80000009: "CMPP_FWD_RESP",
    /** MT路由请求 */
    CMPP_MT_ROUTE: 0x00000010,
    0x00000010: "CMPP_MT_ROUTE",
    /** MT路由请求应答 */
    CMPP_MT_ROUTE_RESP: 0x80000010,
    0x80000010: "CMPP_MT_ROUTE_RESP",
    /** MO路由请求 */
    CMPP_MO_ROUTE: 0x00000011,
    0x00000011: "CMPP_MO_ROUTE",
    /** MO路由请求应答 */
    CMPP_MO_ROUTE_RESP: 0x80000011,
    0x80000011: "CMPP_MO_ROUTE_RESP",
    /** 获取路由请求 */
    CMPP_GET_ROUTE: 0x00000012,
    0x00000012: "CMPP_GET_ROUTE",
    /** 获取路由请求应答 */
    CMPP_GET_ROUTE_RESP: 0x80000012,
    0x80000012: "CMPP_GET_ROUTE_RESP",
    /** MT路由更新 */
    CMPP_MT_ROUTE_UPDATE: 0x00000013,
    0x00000013: "CMPP_MT_ROUTE_UPDATE",
    /** MT路由更新应答 */
    CMPP_MT_ROUTE_UPDATE_RESP: 0x80000013,
    0x80000013: "CMPP_MT_ROUTE_UPDATE_RESP",
    /** MO路由更新 */
    CMPP_MO_ROUTE_UPDATE: 0x00000014,
    0x00000014: "CMPP_MO_ROUTE_UPDATE",
    /** MO路由更新应答 */
    CMPP_MO_ROUTE_UPDATE_RESP: 0x80000014,
    0x80000014: "CMPP_MO_ROUTE_UPDATE_RESP",
    /** MT路由更新 */
    CMPP_PUSH_MT_ROUTE_UPDATE: 0x00000015,
    0x00000015: "CMPP_PUSH_MT_ROUTE_UPDATE",
    /** MT路由更新应答 */
    CMPP_PUSH_MT_ROUTE_UPDATE_RESP: 0x80000015,
    0x80000015: "CMPP_PUSH_MT_ROUTE_UPDATE_RESP",
    /** MO路由更新 */
    CMPP_PUSH_MO_ROUTE_UPDATE: 0x00000016,
    0x00000016: "CMPP_PUSH_MO_ROUTE_UPDATE",
    /** MO路由更新应答 */
    CMPP_PUSH_MO_ROUTE_UPDATE_RESP: 0x80000016,
    0x80000016: "CMPP_PUSH_MO_ROUTE_UPDATE_RESP"
};

export let desc: {
    [key: string]: {
        name: string;
        type: string;
        length: any;
   }[]
} = {
    CMPP_CONNECT: [
        {name: "Source_Addr", type: "string", length: 6},
        {name: "AuthenticatorSource", type: "buffer", length: 16},
        {name: "Version", type: "number", length: 1},
        {name: "Timestamp", type: "number", length: 4}
    ],
    CMPP_CONNECT_RESP: [
        {name: "Status", type: "number", length: 1},
        {name: "AuthenticatorISMG", type: "buffer", length: 16},
        {name: "Version", type: "number", length: 1}
    ],
    CMPP_SUBMIT: [
        {name: "Msg_Id", type: "buffer", length: 8},
        {name: "Pk_total", type: "number", length: 1},
        {name: "Pk_number", type: "number", length: 1},
        {name: "Registered_Delivery", type: "number", length: 1},
        {name: "Msg_level", type: "number", length: 1},
        {name: "Service_Id", type: "string", length: 10},
        {name: "Fee_UserType", type: "number", length: 1},
        {name: "Fee_terminal_Id", type: "number", length: 21},
        // {name: "Fee_terminal_type", type: "number", length: 1},
        {name: "TP_pId", type: "number", length: 1},
        {name: "TP_udhi", type: "number", length: 1},
        {name: "Msg_Fmt", type: "number", length: 1},
        {name: "Msg_src", type: "string", length: 6},
        {name: "FeeType", type: "string", length: 2},
        {name: "FeeCode", type: "string", length: 6},
        {name: "ValId_Time", type: "string", length: 17},
        {name: "At_Time", type: "string", length: 17},
        {name: "Src_Id", type: "string", length: 21},
        {name: "DestUsr_tl", type: "number", length: 1}, // < 100
        {name: "Dest_terminal_Id", type: "string", length: function (obj: any) {
            return obj.DestUsr_tl * 21;
        }},
        // {name: "Dest_terminal_type", type: "number", length: 1},
        {name: "Msg_Length", type: "number", length: 1}, // <= 140
        {name: "Msg_Content", type: "buffer", length: function (obj: any) {
            return obj.Msg_Length;
        }},
        // {name: "LinkID", type: "string", length: 20} // 留空，点播业务使用的LinkID
        {name: "Reserve", type: "string", length: 8} // 保留
    ],
    CMPP_SUBMIT_RESP: [
        {name: "Msg_Id", type: "buffer", length: 8},
        {name: "Result", type: "number", length: 1}
    ],
    CMPP_DELIVER: [
        {name: "Msg_Id", type: "buffer", length: 8},
        {name: "Dest_Id", type: "string", length: 21},
        {name: "Service_Id", type: "string", length: 10},
        {name: "TP_pid", type: "number", length: 1},
        {name: "TP_udhi", type: "number", length: 1},
        {name: "Msg_Fmt", type: "number", length: 1},
        {name: "Src_terminal_Id", type: "string", length: 21},
        {name: "Src_terminal_type", type: "number", length: 1},
        {name: "Registered_Delivery", type: "number", length: 1}, // 0 非状态报告 1 状态报告
        {name: "Msg_Length", type: "number", length: 1},
        {name: "Msg_Content", type: "buffer", length: function (obj: any) {
            return obj.Msg_Length;
        }},
        {name: "Reserve", type: "string", length: 8} // 保留
        // {name: "LinkID", type: "string", length: 20}
    ],
    CMPP_DELIVER_REPORT_CONTENT: [
        {name: "Msg_Id", type: "buffer", length: 8},
        {name: "Stat", type: "string", length: 7},
        {name: "Submit_time", type: "string", length: 10},
        {name: "Done_time", type: "string", length: 10},
        {name: "Dest_terminal_Id", type: "string", length: 21},
        {name: "SMSC_sequence", type: "number", length: 4}
    ],
    CMPP_DELIVER_RESP: [
        {name: "Msg_Id", type: "buffer", length: 8},
        {name: "Result", type: "number", length: 4}
    ]
};