export const ORION_COMMON_API = '/global/'; // 登录，权限验证
export const ORION_SETTING_API = '/nebula-auth-backend/'; // 用户管理
export const ORION_CONTROL_API = '/aurora-backend/'; // 控制塔
export const ORION_FULLFIL_API = '/stardust-backend/'; // 履约计划 后端未部署
export const ORION_UPLOAD_API = '/nebula-intg-backend/'; //上传下载中心
export const ORION_LOGS_API = /nebula-audit-backend/; //日志


/*
    连接后端规范：
        1. 变量放在左边相应模块下
        2. 命名方式直接用后端的api名称并驼峰使用，请赋注释
            例: 订单锁定 -- /aurora-backend/bOrder/order-locked
        3. 调用命名：在调用方式
            例: let api = connection.control
        4. reducer方法命名方式
        fetchOrderLocked (params, successCallback) {
            return {
                type: 'WATCH_ORIONSCM_SAGAS', 保持不变
                putType: [ 'QUERY_CONTROLL_ORDER_LOCKED' ],
                payload: params,
                url: api.orderLocked,
                method: 'POST', GET不用写 POST,PUT,DELETE
                successCallback
            };
        }
*/
export const connection = {
    // 履约引擎
    fullfill : {
        //订单分配结果 one
        orderMatchResult: `${ORION_FULLFIL_API}order-match-result/list`, // 订单分配结果 --订单查看 --订单分配结果
        matchDetailList: `${ORION_FULLFIL_API}supply-dmd-match-detail/list`, // 订单分配结果 -- 订单结果页
        vdoDetailList: `${ORION_FULLFIL_API}vdo-detail/list`, //订单分配结果 -- 交货单明细
        getTaskOrderNumber: `${ORION_FULLFIL_API}execute-appoint-task/order-number`, //获取订单数汇总
        getTaskOrderQty: `${ORION_FULLFIL_API}execute-appoint-task/order-qty`, //获取订单量汇总
        getTaskList: `${ORION_FULLFIL_API}execute-appoint-task/task-list`, //分配任务列表
        getTaskStatistics: `${ORION_FULLFIL_API}execute-appoint-task/task-statistics`, //分配任务统计
        cancelTaskItem: `${ORION_FULLFIL_API}execute-appoint-task/cancel`, //履约任务撤销
        //two
        detailList: `${ORION_FULLFIL_API}supply-dmd-match-detail/detail-list`, // 订单明细
        //库存预留
        listReserve: `${ORION_FULLFIL_API}api/v1/bReserveInve/listReserve`, // 库存预留
        bReserveInve: `${ORION_FULLFIL_API}api/v1/bReserveInve`, // 检查库存预留是否能操作
        bReserveInveClose: `${ORION_FULLFIL_API}api/v1/bReserveInve/close`, // 库存预留关闭
        bReserveInveEdit: `${ORION_FULLFIL_API}api/v1/bReserveInve/edit`, // 库存预留修改确认
        bReserveInveListProduct: `${ORION_FULLFIL_API}api/v1/bReserveInve/listProduct`, // 库存预留选择商品
        bReserveInveListSold: `${ORION_FULLFIL_API}api/v1/bReserveInve/listSold`, // 添加库存预留 --售达方列表
    },
    // 公共
    common :{
        'login': `${ORION_COMMON_API}login`,
        'getGlobalUserList': `${ORION_COMMON_API}user/aad/list`,
    },
    // 设置
    setting:{
        saveUserpreference: `${ORION_SETTING_API}api/v1/sys/userpreference/save`, // 保存用户设置
        getUserpreference: `${ORION_SETTING_API}api/v1/sys/userpreference`, // 保存用户设置
        getUserList: `${ORION_SETTING_API}api/v1/user/list`, // 用户列表
        getUserRoleList: `${ORION_SETTING_API}api/v1/user/roleList`, //用户编辑-角色列表
        getUserFuncList: `${ORION_SETTING_API}api/v1/user/groupList`, //用户编辑-职能列表
        addUser: `${ORION_SETTING_API}api/v1/user/addUser`, // 用户新增
        editUser: `${ORION_SETTING_API}api/v1/user/editUser`, // 用户编辑保存
        updUserState: `${ORION_SETTING_API}api/v1/user/updUserState`, // 用户禁用/启用
        addRole: `${ORION_SETTING_API}api/v1/role/addRole`, // 角色新增
        delRole: `${ORION_SETTING_API}api/v1/role/delRole`, // 角色删除
        getRoleButton: `${ORION_SETTING_API}api/v1/role/getButton`, // 根据父资源获取页面权限列表（编辑角色）
        getRoleResourceTree: `${ORION_SETTING_API}api/v1/role/getResourceTree`, //资源树状列表（编辑角色）
        getRoleList: `${ORION_SETTING_API}api/v1/role/listRole`, // 角色列表（分页，查询）
        getRoleListDetail: `${ORION_SETTING_API}api/v1/role/listRoleDetail`, // 展示角色所有资源详情
        updRoleState: `${ORION_SETTING_API}api/v1/role/updRoleState`, // 角色启用/禁用
        editRoleSave: `${ORION_SETTING_API}api/v1/role/editRole`, // 角色编辑
        addGroup: `${ORION_SETTING_API}addGroup`, // 职能新增/编辑
        delGroup: `${ORION_SETTING_API}delGroup`, // 职能删除
        getGroupListDetail: `${ORION_SETTING_API}getGroupParamVO`, //  获取职能详情
        getGroupList: `${ORION_SETTING_API}listGroup`, // 职能列表（分页，查询）
        updGroupState: `${ORION_SETTING_API}updGroup`, // 职能启用/禁用
        getPublicFields: `${ORION_SETTING_API}api/v1/sys/dom/batch/`, // 公共字段获取

        getOrderPerConfList: `${ORION_FULLFIL_API}cOrderFulfillmentConf/order-fulfillment-conf-list`, // 订单履约基础配置-信息
        saveOrderPerConf: `${ORION_FULLFIL_API}cOrderFulfillmentConf/order-fulfillment-conf-edit`, // 订单履约基础配置-修改
        getOrderPerOrderPriorityList: `${ORION_FULLFIL_API}cOrderPriorityConf/detail-list`, // 订单优先级配置-列表
        editOrderPerOrderPriority: `${ORION_FULLFIL_API}cOrderPriorityConf/detail-edit`, // 订单优先级配置-编辑
        getOrderPerStPriorityList: `${ORION_FULLFIL_API}cStPriorityConf/detail-list`, // 调拨优先级配置-列表
        editOrderPerStPriority: `${ORION_FULLFIL_API}cStPriorityConf/detail-edit`, // 调拨优先级配置-编辑
        getOrderPerCuontShippingList: `${ORION_FULLFIL_API}cCustShippingConf/cust-shipping-list`, // 发运规则列表
        editOrderPerCustShipping:`${ORION_FULLFIL_API}cCustShippingConf/cust-shipping-edit`, // 发运规则列表
        getOrderPerCustPaGradeList: `${ORION_FULLFIL_API}cCustPaGradeConfDetail/cust-detail-list`, // 客户新鲜度要求列表
        editOrderPerCustPaGrade: `${ORION_FULLFIL_API}cCustPaGradeConfDetail/cust-detail-edit`, // 客户新鲜度要求编辑
        getOrderPerPaGradeList: `${ORION_FULLFIL_API}cPaGradeConf/detail-list`, // 新鲜度等级列表
        editOrderPerPaGrade: `${ORION_FULLFIL_API}cPaGradeConf/detail-save-edit`, // 新鲜度等级保存
    },
    // 控制塔
    control:{
        orderLocked: `${ORION_CONTROL_API}bOrder/order-locked`, // 订单锁定
        pageVdo: `${ORION_CONTROL_API}/bVdo/page-vdo`, //交货单分页列表
        listOrderDetail: `${ORION_CONTROL_API}/bOrder/list-order-detail`, //订单查看 -- 订单列表
        orderDetailInfo: `${ORION_CONTROL_API}/bOrderDetail/list-order-detail`, //订单详情 -- 订单明细
        pageVdoSkuDetail: `${ORION_CONTROL_API}/bVdo/page-vdo-sku-detail`, //交货单查看 --发货单明细
        pageOrderVdoDetails: `${ORION_CONTROL_API}/bVdo/page-order-vdo-details`, //订单详情 -- 交货单明细
        pageOrderWithOrderDetail: `${ORION_CONTROL_API}/bOrder/page-order-with-order-detail`, //订单中心 --订单明细查看
        pageVdoDetail: `${ORION_CONTROL_API}/bVdoDetail/page-vdo-detail`, //订单中心 --交货单明细查看
        closeOrderWarning: `${ORION_CONTROL_API}/bOrder/close-order-warning`, //订单中心 -- 预警关闭
        orderUrgent: `${ORION_CONTROL_API}/bOrder/order-urgent`, //订单中心 -- 订单加急
        orderCancelTag: `${ORION_CONTROL_API}/bOrder/order-cancel-tag`, //订单中心 -- 订单取消标注
        orderRemark: `${ORION_CONTROL_API}/bOrder/order-remark`, //订单中心 -- 订单备注
        orderReschedule: `${ORION_CONTROL_API}/bOrder/order-reschedule`, //订单中心 -- 订单改期
        orderDetailFreshnessModify: `${ORION_CONTROL_API}/bOrderDetail/order-detail-freshness-modify`, //订单中心-- 新鲜度修改
        orderUrging: `${ORION_CONTROL_API}/bOrder/order-urging`, //订单中心-- 订单催办
        eventList: `${ORION_CONTROL_API}/tOrderEventLog/list`, //订单中心 -- 事件历史
        statusList: `${ORION_CONTROL_API}/hOrderStatusHis/list`, //订单中心 -- 状态历史
        listInventoryDetail: `${ORION_CONTROL_API}/bCustInve/list-inventory-detail`, // 好丽友库存 --库存状态
        listInventoryFreshDetail: `${ORION_CONTROL_API}/bInvePaCo/list-inventory-fresh-detail`, // 好丽友库存 --库存新鲜度
        inventoryDetailList: `${ORION_CONTROL_API}/bCustInve/list-inventory-detail`, // 经销商库存 --库存状态
        listCustInventoryFreshDetail: `${ORION_CONTROL_API}/bCustInvePa/list-cust-inventory-fresh-detail`, // 经销商库存 --库存新鲜度

        getInventorySummaryDashboard: `${ORION_CONTROL_API}bInveCo/get-inventory-summary-dashboard`,//库存汇总统计-库存统计
        getInventoryFreshStatusDashboard: `${ORION_CONTROL_API}bInvePaWarnCo/get-inventory-fresh-status-dashboard`, //库存汇总统计-好丽友库存新鲜度状态
        getInveImportFreshStatusLatelyDashboard: `${ORION_CONTROL_API}bInvePaWarnCo/get-inve-import-fresh-status-lately-dashboard`, // 库存汇总统计-好丽友库存新鲜度状态-最近十五天趋势-全部-内销-进口
        getInventoryHealthyStatusDashboard: `${ORION_CONTROL_API}bInveWarnCo/get-inventory-healthy-status-dashboard`,//库存汇总统计-好丽友库存健康状态
        getInveHealthyStatusLatelyDashboard: `${ORION_CONTROL_API}bInveWarnCo/get-inve-healthy-status-lately-dashboard`, // 库存汇总统计-好丽友库存健康状态-最近十五天趋势-所有-内销-进口
        getInventoryFreshDashboard: `${ORION_CONTROL_API}bInvePaCo/get-inventory-summary-dashboard`, // 库存汇总统计-新鲜度库存统计
        getOrderStockDashboard: `${ORION_CONTROL_API}bOrder/get-order-stock-dashboard`,//订单看板库存箱数统计
        getUncloseOrderDashboard: `${ORION_CONTROL_API}bOrder/get-unclose-order-dashboard`,//未关闭订单状态
        getUncloseVdoDashBoard: `${ORION_CONTROL_API}bVdo/get-unclose-vdo-dashboard`,//未关闭交货单状态


    },
    manage: {
        listSyncLog: `${ORION_LOGS_API}data-sync-log/list-sync-log`, //日志列表
        listErrorLog: `${ORION_LOGS_API}error-log/list-error-log` //日志错误详情
    },
    upload: {
        getUploadState: `${ORION_UPLOAD_API}file/getUploadState`, // 获取任务状态
        getTemplateAddress: `${ORION_UPLOAD_API}file/getTemplateAddress`, // 获取模板地址
    }
}