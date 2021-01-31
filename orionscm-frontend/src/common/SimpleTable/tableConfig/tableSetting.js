/**
 * columns 表格默认配置，可配置列宽、列顺序、列是否展示
 * @param {String} id  唯一表识
 * @param {Number} order  列顺序
 * @param {Boolean} show  列是否展示
 * @param {Number} width  列宽
 * @param {String|Boolean} fixed  是否是固定列，固定方式 'left' | false | false
 * @param {Boolean} isDefault  是否是默认列，默认列必须显示
 */

// 样例
const DATA_ACTIVITY = {
    columns: [
        { id: 'guQingDate', order: 1, show: true, width: 150, fixed: 'left', isDefault: true },
        { id: 'skuCode', order: 2, show: true, width: 150, fixed: 'left', isDefault: true },
        { id: 'skuName', order: 3, show: true, width: 150, fixed: false, isDefault: false },
        { id: 'specs', order: 4, show: true, width: 150, fixed: false, isDefault: false },
        { id: 'materialCode', order: 5, show: true, width: 150, fixed: false, isDefault: false },
        { id: 'materialName', order: 6, show: true, width: 150, fixed: false, isDefault: false }
    ]
}
const DATA_OREDER =  {
    columns: [
        { id: 'status', order: 1, show: true, width: 150, fixed: false, isDefault: false },
        { id: 'warning', order: 2, show: true, width: 150, fixed: false, isDefault: false },
        { id: 'orderType', order: 3, show: true, width: 150, fixed: false, isDefault: false },
        { id: 'orderNum', order: 4, show: true, width: 150, fixed: false, isDefault: false },
        { id: 'orderCreateDtt', order: 5, show: true, width: 150, fixed: false, isDefault: false },
        { id: 'creditDtt', order: 6, show: true, width: 150, fixed: false, isDefault: false },
        { id: 'effectiveDt', order: 7, show: true, width: 150, fixed: false, isDefault: false },
        { id: 'latestDeliveryDt', order: 8, show: true, width: 150, fixed: false, isDefault: false },
        { id: 'extendEffDtt', order: 9, show: true, width: 150, fixed: false, isDefault: false },
        { id: 'salesOrgName', order: 10, show: true, width: 150, fixed: false, isDefault: false },
        { id: 'salesRegionName', order: 11, show: true, width: 150, fixed: false, isDefault: false },
        { id: 'salesOfficeName', order: 12, show: true, width: 150, fixed: false, isDefault: false },
        { id: 'custGrpName', order: 13, show: true, width: 150, fixed: false, isDefault: false },
        { id: 'productGrpName', order: 14, show: true, width: 150, fixed: false, isDefault: false },
        { id: 'soldToCode', order: 15, show: true, width: 150, fixed: false, isDefault: false },
        { id: 'payFromName', order: 16, show: true, width: 150, fixed: false, isDefault: false },
        { id: 'shipToCode', order: 17, show: true, width: 150, fixed: false, isDefault: false },
        { id: 'custOrderNum', order: 18, show: true, width: 150, fixed: false, isDefault: false },
        { id: 'custOrderDate', order: 19, show: true, width: 150, fixed: false, isDefault: false },
        { id: 'warehouseName', order: 20, show: true, width: 150, fixed: false, isDefault: false },
        { id: 'orderQty', order: 21, show: true, width: 150, fixed: false, isDefault: false },
        { id: 'receivedQty', order: 22, show: true, width: 150, fixed: false, isDefault: false },
        { id: 'assignedQty', order: 23, show: true, width: 150, fixed: false, isDefault: false },
        { id: 'expectAllotQty', order: 24, show: true, width: 150, fixed: false, isDefault: false },
        { id: 'pendingAllotQty', order: 25, show: true, width: 150, fixed: false, isDefault: false },
        { id: 'lockedQty', order: 26, show: true, width: 150, fixed: false, isDefault: false },
        { id: 'actualFillRate', order: 27, show: true, width: 150, fixed: false, isDefault: false },
        { id: 'expectFillRate', order: 28, show: true, width: 150, fixed: false, isDefault: false },
        { id: 'shortQty', order: 29, show: true, width: 150, fixed: false, isDefault: false },
        { id: 'shortDays', order: 30, show: true, width: 150, fixed: false, isDefault: false },
        { id: 'expectArrivalDtt', order: 31, show: true, width: 150, fixed: false, isDefault: false },
        { id: 'tagReason', order: 32, show: true, width: 150, fixed: false, isDefault: false },
        { id: 'remark', order: 33, show: true, width: 150, fixed: false, isDefault: false }
    ]
}

const DETAIL_OREDER =  {
    columns: [
        { id: 'skuCode', order: 1, show: true, width: 150, fixed: false, isDefault: false },
        { id: 'skuDesc', order: 2, show: true, width: 150, fixed: false, isDefault: false },
        { id: 'paRequire', order: 3, show: true, width: 150, fixed: false, isDefault: false },
        { id: 'skuQty', order: 4, show: true, width: 150, fixed: false, isDefault: false },
        { id: 'receivedQty', order: 5, show: true, width: 150, fixed: false, isDefault: false },
        { id: 'usassignedQtyer', order: 6, show: true, width: 150, fixed: false, isDefault: false },
        { id: 'expectDeliveryQty', order: 7, show: true, width: 150, fixed: false, isDefault: false },
        { id: 'expectAllotQty', order: 8, show: true, width: 150, fixed: false, isDefault: false },
        { id: 'extendEffDtt', order: 9, show: true, width: 150, fixed: false, isDefault: false },
        { id: 'lockedQty', order: 10, show: true, width: 150, fixed: false, isDefault: false },
        { id: 'actualFillRate', order: 11, show: true, width: 150, fixed: false, isDefault: false },
        { id: 'expectFillRate', order: 12, show: true, width: 150, fixed: false, isDefault: false },
        { id: 'shortQty', order: 13, show: true, width: 150, fixed: false, isDefault: false },
        { id: 'shortDays', order: 14, show: true, width: 150, fixed: false, isDefault: false },
        { id: 'shortReason', order: 15, show: true, width: 150, fixed: false, isDefault: false },
        { id: 'price', order: 16, show: true, width: 150, fixed: false, isDefault: false },
        { id: 'stdPrice', order: 17, show: true, width: 150, fixed: false, isDefault: false },
        { id: 'discountValue', order: 18, show: true, width: 150, fixed: false, isDefault: false },
        { id: 'discountPrice', order: 19, show: true, width: 150, fixed: false, isDefault: false },
        { id: 'promoDiscountValue', order: 20, show: true, width: 150, fixed: false, isDefault: false },
        { id: 'promoDiscountPrice', order: 21, show: true, width: 150, fixed: false, isDefault: false },
        { id: 'dcValue', order: 22, show: true, width: 150, fixed: false, isDefault: false },
        { id: 'dcPrice', order: 23, show: true, width: 150, fixed: false, isDefault: false },
        { id: 'expectDeliveryDt', order: 24, show: true, width: 150, fixed: false, isDefault: false },
        { id: 'expectDeliveryQty', order: 25, show: true, width: 150, fixed: false, isDefault: false },
        { id: 'expectArrivalDt', order: 26, show: true, width: 150, fixed: false, isDefault: false }
    ]
}

const DELIVERY_OREDER =  {
    columns: [
        { id: 'vdoNum', order: 1, show: true, width: 150, fixed: false, isDefault: false },
        { id: 'skuCode', order: 2, show: true, width: 150, fixed: false, isDefault: false },
        { id: 'skuDesc', order: 3, show: true, width: 150, fixed: false, isDefault: false },
        { id: 'createDtt', order: 4, show: true, width: 150, fixed: false, isDefault: false },
        { id: 'expectDeliveryDt', order: 5, show: true, width: 150, fixed: false, isDefault: false },
        { id: 'actualDeliveryDt', order: 6, show: true, width: 150, fixed: false, isDefault: false },
        { id: 'expectArrivalDt', order: 7, show: true, width: 150, fixed: false, isDefault: false },
        { id: 'actualArrivalDt', order: 8, show: true, width: 150, fixed: false, isDefault: false },
        { id: 'expectExwhQty', order: 9, show: true, width: 150, fixed: false, isDefault: false },
        { id: 'actualDeliveryQty', order: 10, show: true, width: 150, fixed: false, isDefault: false },
        { id: 'actualReceiveQty', order: 11, show: true, width: 150, fixed: false, isDefault: false }
    ]
}

const UPLOAD_CENTER = {
    columns: [
        { id: 'type', order: 1, show: true, fixed: false, isDefault: false },
        { id: 'dataList', order: 2, show: true, fixed: false, isDefault: false },
        { id: 'filename', order: 3, show: true, fixed: false, isDefault: false },
        { id: 'createTime', order: 4, show: true, fixed: false, isDefault: false },
        { id: 'finishTime', order: 5, show: true, fixed: false, isDefault: false },
        { id: 'fileCount', order: 6, show: true, fixed: false, isDefault: false },
        { id: 'successCount', order: 7, show: true, fixed: false, isDefault: false },
        { id: 'failCount', order: 8, show: true, fixed: false, isDefault: false },
        { id: 'state', order: 9, show: true, fixed: false, isDefault: false },
        { id: 'errorDetail', order: 10, show: true, fixed: false, isDefault: false },
        { id: 'actions', order: 11, show: true, fixed: false, isDefault: true }
    ]
}

const DATA_LOGS = {
    columns: [
        { id: 'ioType', order: 1, show: true, fixed: false, isDefault: false },
        { id: 'typeDetailDesc', order: 2, show: true, fixed: false, isDefault: false },
        { id: 'startDtt', order: 3, show: true, fixed: false, isDefault: false },
        { id: 'endDtt', order: 4, show: true, fixed: false, isDefault: false },
        { id: 'status', order: 5, show: true, fixed: false, isDefault: false },
        { id: 'actions', order: 6, show: true, fixed: false, isDefault: true }
    ]
}

const ORDER_DETAIL = {
    columns: [
        { id: 'status', order: 1, show: true, fixed: false, isDefault: false },
        { id: 'warning', order: 2, show: true, fixed: false, isDefault: false },
        { id: 'orderType', order: 3, show: true, fixed: false, isDefault: false },
        { id: 'endDate', order: 4, show: true, fixed: false, isDefault: false },
        { id: 'orderNum', order: 5, show: true, fixed: false, isDefault: false },
        { id: 'orderCreateDtt', order: 6, show: true, fixed: false, isDefault: false },
        { id: 'creditDtt', order: 7, show: true, fixed: false, isDefault: false },
        { id: 'effectiveDt', order: 8, show: true, fixed: false, isDefault: false },
        { id: 'latestDeliveryDt', order: 9, show: true, fixed: false, isDefault: false },
        { id: 'extendEffDtt', order: 10, show: true, fixed: false, isDefault: false },
        { id: 'salesOrgName', order: 11, show: true, fixed: false, isDefault: false },
        { id: 'salesRegionName', order: 12, show: true, fixed: false, isDefault: false },
        { id: 'salesOfficeName', order: 13, show: true, fixed: false, isDefault: false },
        { id: 'channelName', order: 14, show: true, fixed: false, isDefault: false },
        { id: 'custGrpName', order: 15, show: true, fixed: false, isDefault: false },
        { id: 'productGrpName', order: 16, show: true, fixed: false, isDefault: false },
        { id: 'soldToCode', order: 17, show: true, fixed: false, isDefault: false },
        { id: 'soldToName', order: 18, show: true, fixed: false, isDefault: false },
        { id: 'payFromName', order: 19, show: true, fixed: false, isDefault: false },
        { id: 'shipToCode', order: 20, show: true, fixed: false, isDefault: false },
        { id: 'shipToName', order: 21, show: true, fixed: false, isDefault: false },
        { id: 'custOrderNum', order: 22, show: true, fixed: false, isDefault: false },
        { id: 'custOrderDate', order: 23, show: true, fixed: false, isDefault: false },
        { id: 'custOrderType', order: 24, show: true, fixed: false, isDefault: false },
        { id: 'warehouseName', order: 25, show: true, fixed: false, isDefault: false },
        { id: 'skuCode', order: 26, show: true, fixed: false, isDefault: false },
        { id: 'skuDesc', order: 27, show: true, fixed: false, isDefault: false },
        { id: 'categoryDesc', order: 28, show: true, fixed: false, isDefault: false },
        { id: 'brandDesc', order: 29, show: true, fixed: false, isDefault: false },
        { id: 'paRequire', order: 30, show: true, fixed: false, isDefault: false },
        { id: 'skuQty', order: 31, show: true, fixed: false, isDefault: false },
        { id: 'receivedQty', order: 32, show: true, fixed: false, isDefault: false },
        { id: 'assignedQty', order: 33, show: true, fixed: false, isDefault: false },
        { id: 'expectAllotQty', order: 34, show: true, fixed: false, isDefault: false },
        { id: 'pendingAllotQty', order: 35, show: true, fixed: false, isDefault: false },
        { id: 'lockedQty', order: 36, show: true, fixed: false, isDefault: false },
        { id: 'actualFillRate', order: 37, show: true, fixed: false, isDefault: false },
        { id: 'expectFillRate', order: 38, show: true, fixed: false, isDefault: false },
        { id: 'shortQty', order: 39, show: true, fixed: false, isDefault: false },
        { id: 'shortDays', order: 40, show: true, fixed: false, isDefault: false },
        { id: 'shortReason', order: 41, show: true, fixed: false, isDefault: false },
        { id: 'price', order: 42, show: true, fixed: false, isDefault: false },
        { id: 'stdPrice', order: 43, show: true, fixed: false, isDefault: false },
        { id: 'discountValue', order: 44, show: true, fixed: false, isDefault: false },
        { id: 'discountPrice', order: 45, show: true, fixed: false, isDefault: false },
        { id: 'promoDiscountValue', order: 46, show: true, fixed: false, isDefault: false },
        { id: 'promoDiscountPrice', order: 47, show: true, fixed: false, isDefault: false },
        { id: 'dcValue', order: 48, show: true, fixed: false, isDefault: false },
        { id: 'dcPrice', order: 49, show: true, fixed: false, isDefault: false },
        { id: 'expectDeliveryDtt', order: 50, show: true, fixed: false, isDefault: false },
        { id: 'expectArrivalDtt', order: 51, show: true, fixed: false, isDefault: false },
        { id: 'tag', order: 52, show: true, fixed: false, isDefault: false },
        { id: 'tagReason', order: 53, show: true, fixed: false, isDefault: false }
    ]
}

const DATA_DELIVERY = {
    columns: [
        { id: 'vdoStatus', order: 1, show: true, fixed: false, isDefault: false },
        { id: 'warning', order: 2, show: true, fixed: false, isDefault: false },
        { id: 'vdoNum', order: 3, show: true, fixed: false, isDefault: false },
        { id: 'logisticsPlanNum', order: 4, show: true, fixed: false, isDefault: false },
        { id: 'warehouseCode', order: 5, show: true, fixed: false, isDefault: false },
        { id: 'orderNum', order: 6, show: true, fixed: false, isDefault: false },
        { id: 'orderType', order: 7, show: true, fixed: false, isDefault: true },
        { id: 'effectiveDt', order: 8, show: true, fixed: false, isDefault: true },
        { id: 'salesOrgCode', order: 9, show: true, fixed: false, isDefault: true },
        { id: 'salesRegionCode', order: 10, show: true, fixed: false, isDefault: true },
        { id: 'salesOfficeCode', order: 11, show: true, fixed: false, isDefault: true },
        { id: 'channelCode', order: 12, show: true, fixed: false, isDefault: true },
        { id: 'custGrpCode', order: 13, show: true, fixed: false, isDefault: true },
        { id: 'productGrpCode', order: 14, show: true, fixed: false, isDefault: true },
        { id: 'soldToCode', order: 15, show: true, fixed: false, isDefault: true },
        { id: 'edit', order: 16, show: true, fixed: false, isDefault: true },
        { id: 'payFromCode', order: 17, show: true, fixed: false, isDefault: true },
        { id: 'shipToCode', order: 18, show: true, fixed: false, isDefault: true },
        { id: 'edit', order: 19, show: true, fixed: false, isDefault: true },
        { id: 'createDtt', order: 20, show: true, fixed: false, isDefault: true },
        { id: 'expectDeliveryDt', order: 21, show: true, fixed: false, isDefault: true },
        { id: 'actualDeliveryDt', order: 22, show: true, fixed: false, isDefault: true },
        { id: 'edit', order: 23, show: true, fixed: false, isDefault: true },
        { id: 'edit', order: 24, show: true, fixed: false, isDefault: true },
        { id: 'edit', order: 25, show: true, fixed: false, isDefault: true },
        { id: 'edit', order: 26, show: true, fixed: false, isDefault: true }
    ]
}
const DETAIL_DELIVERY = {
    columns: [
        { id: 'skuCode', order: 1, show: true, fixed: false, isDefault: false },
        { id: 'skuDesc', order: 2, show: true, fixed: false, isDefault: false },
        { id: 'expectExwhQty', order: 3, show: true, fixed: false, isDefault: false },
        { id: 'actualDeliveryQty', order: 4, show: true, fixed: false, isDefault: false },
        { id: 'actualReceiveQty', order: 5, show: true, fixed: false, isDefault: false }
    ]
}
const DATA_VDO = {
    columns: [
        { id: 'vdoStatus', order: 1, show: true, fixed: false, isDefault: false },
        { id: 'warning', order: 2, show: true, fixed: false, isDefault: false },
        { id: 'vdoNum', order: 3, show: true, fixed: false, isDefault: false },
        { id: 'logisticsPlanNum', order: 4, show: true, fixed: false, isDefault: false },
        { id: 'warehouseCode', order: 5, show: true, fixed: false, isDefault: false },
        { id: 'skuCode', order: 6, show: true, fixed: false, isDefault: false },
        { id: 'orderType', order: 7, show: true, fixed: false, isDefault: true },
        { id: 'effectiveDt', order: 8, show: true, fixed: false, isDefault: true },
        { id: 'salesOrgName', order: 9, show: true, fixed: false, isDefault: true },
        { id: 'orderNum', order: 10, show: true, fixed: false, isDefault: true },
        { id: 'salesOrgName', order: 11, show: true, fixed: false, isDefault: true },
        { id: 'salesOfficeName', order: 12, show: true, fixed: false, isDefault: true },
        { id: 'channelName', order: 13, show: true, fixed: false, isDefault: true },
        { id: 'custGrpName', order: 14, show: true, fixed: false, isDefault: true },
        { id: 'productGrpName', order: 15, show: true, fixed: false, isDefault: true },
        { id: 'soldToCode', order: 16, show: true, fixed: false, isDefault: true },
        { id: 'soldToName', order: 17, show: true, fixed: false, isDefault: true },
        { id: 'payFromName', order: 18, show: true, fixed: false, isDefault: true },
        { id: 'shipToCode', order: 19, show: true, fixed: false, isDefault: true },
        { id: 'shipToName', order: 20, show: true, fixed: false, isDefault: true },
        { id: 'orderNum', order: 21, show: true, fixed: false, isDefault: true },
        { id: 'createDtt', order: 22, show: true, fixed: false, isDefault: true },
        { id: 'actualDeliveryDt', order: 23, show: true, fixed: false, isDefault: true },
        { id: 'actualArrivalDt', order: 24, show: true, fixed: false, isDefault: true },
        { id: 'skuCode', order: 25, show: true, fixed: false, isDefault: true },
        { id: 'skuDesc', order: 26, show: true, fixed: false, isDefault: true },
        { id: 'productGrpName', order: 27, show: true, fixed: false, isDefault: true },
        { id: 'brandDesc', order: 28, show: true, fixed: false, isDefault: true },
        { id: 'expectExwhQty', order: 29, show: true, fixed: false, isDefault: true },
        { id: 'actualReceiveQty', order: 30, show: true, fixed: false, isDefault: true },
        { id: 'isCold', order: 31, show: true, fixed: false, isDefault: true },
        { id: 'discountPrice', order: 32, show: true, fixed: false, isDefault: true },
        { id: 'promoDiscountPrice', order: 33, show: true, fixed: false, isDefault: true },
        { id: 'dcPrice', order: 34, show: true, fixed: false, isDefault: true }
    ]
}

const STOCK_STATUS = {
    columns: [
        { id: 'status', order: 1, show: true, fixed: false, isDefault: false },
        { id: 'skuCode', order: 2, show: true, fixed: false, isDefault: false },
        { id: 'skuDesc', order: 3, show: true, fixed: false, isDefault: false },
        { id: 'saleType', order: 4, show: true, fixed: false, isDefault: false },
        { id: 'categoryDesc', order: 5, show: true, fixed: false, isDefault: false },
        { id: 'brandDesc', order: 6, show: true, fixed: false, isDefault: false },
        { id: 'productType', order: 7, show: true, fixed: false, isDefault: true },
        { id: 'warehouseName', order: 8, show: true, fixed: false, isDefault: true },
        { id: 'realQty', order: 9, show: true, fixed: false, isDefault: true },
        { id: 'realDays', order: 10, show: true, fixed: false, isDefault: true },
        { id: 'stoFreezQty', order: 11, show: true, fixed: false, isDefault: true },
        { id: 'stoAllocationQty', order: 12, show: true, fixed: false, isDefault: true },
        { id: 'otherFreezQty', order: 13, show: true, fixed: false, isDefault: true },
        { id: 'qaQty', order: 14, show: true, fixed: false, isDefault: true },
        { id: 'otherExwhQty', order: 15, show: true, fixed: false, isDefault: true },
        { id: 'unavaiable_Qty', order: 16, show: true, fixed: false, isDefault: true },
        { id: 'availableSaleQty', order: 17, show: true, fixed: false, isDefault: true },
        { id: 'availableSaleDay', order: 18, show: true, fixed: false, isDefault: true },
        { id: 'remainingReserveQty', order: 19, show: true, fixed: false, isDefault: true },
        { id: 'availableAllocationQty', order: 20, show: true, fixed: false, isDefault: true },
        { id: 'availableAllocationDay', order: 21, show: true, fixed: false, isDefault: true },
        { id: 'expectAllocationQty', order: 22, show: true, fixed: false, isDefault: true },
        { id: 'availableUseQty', order: 23, show: true, fixed: false, isDefault: true },
        { id: 'inveTurnoverDays', order: 24, show: true, fixed: false, isDefault: true },
        { id: 'putinIntransitQty', order: 25, show: true, fixed: false, isDefault: true },
        { id: 'factoryQty', order: 26, show: true, fixed: false, isDefault: true }
    ]
}

const STOCK_VBN = {
    columns: [
        { id: 'status', order: 1, show: true, fixed: false, isDefault: false },
        { id: 'skuCode', order: 2, show: true, fixed: false, isDefault: false },
        { id: 'skuDesc', order: 3, show: true, fixed: false, isDefault: false },
        { id: 'saleType', order: 4, show: true, fixed: false, isDefault: false },
        { id: 'categoryDesc', order: 5, show: true, fixed: false, isDefault: false },
        { id: 'brandDesc', order: 6, show: true, fixed: false, isDefault: false },
        { id: 'productType', order: 7, show: true, fixed: false, isDefault: true },
        { id: 'warehouseName', order: 8, show: true, fixed: false, isDefault: true },
        { id: 'lowriskQty', order: 9, show: true, fixed: false, isDefault: true },
        { id: 'highriskQty', order: 10, show: true, fixed: false, isDefault: true },
        { id: 'realQty', order: 11, show: true, fixed: false, isDefault: true }
    ]
}

const JSTOCK_STATUS = {
    columns: [
        { id: 'status', order: 1, show: true, fixed: false, isDefault: false },
        { id: 'skuCode', order: 2, show: true, fixed: false, isDefault: false },
        { id: 'skuDesc', order: 3, show: true, fixed: false, isDefault: false },
        { id: 'saleType', order: 4, show: true, fixed: false, isDefault: false },
        { id: 'categoryDesc', order: 5, show: true, fixed: false, isDefault: false },
        { id: 'brandDesc', order: 6, show: true, fixed: false, isDefault: false },
        { id: 'productType', order: 7, show: true, fixed: false, isDefault: true },
        { id: 'warehouseName', order: 8, show: true, fixed: false, isDefault: true },
        { id: 'soldToCode', order: 9, show: true, fixed: false, isDefault: true },
        { id: 'soldToName', order: 10, show: true, fixed: false, isDefault: true },
        { id: 'salesOrgName', order: 11, show: true, fixed: false, isDefault: true },
        { id: 'salesRegionName', order: 12, show: true, fixed: false, isDefault: true },
        { id: 'salesOfficeName', order: 13, show: true, fixed: false, isDefault: true },
        { id: 'channelName', order: 14, show: true, fixed: false, isDefault: true },
        { id: 'custGrpName', order: 15, show: true, fixed: false, isDefault: true },
        { id: 'productGrpName', order: 16, show: true, fixed: false, isDefault: true },
        { id: 'edit', order: 17, show: true, fixed: false, isDefault: true },
        { id: 'edit', order: 18, show: true, fixed: false, isDefault: true },
        { id: 'realQty', order: 19, show: true, fixed: false, isDefault: true },
        { id: 'intransitQty', order: 20, show: true, fixed: false, isDefault: true },
        { id: 'inveSumQty', order: 21, show: true, fixed: false, isDefault: true },
        { id: 'realDays', order: 22, show: true, fixed: false, isDefault: true },
        { id: 'intransitDays', order: 23, show: true, fixed: false, isDefault: true },
        { id: 'inveSumDays', order: 24, show: true, fixed: false, isDefault: true }
    ]
}

const JSTOCK_VBN = {
    columns: [
        { id: 'status', order: 1, show: true, fixed: false, isDefault: false },
        { id: 'skuCode', order: 2, show: true, fixed: false, isDefault: false },
        { id: 'skuDesc', order: 3, show: true, fixed: false, isDefault: false },
        { id: 'saleType', order: 4, show: true, fixed: false, isDefault: false },
        { id: 'categoryDesc', order: 5, show: true, fixed: false, isDefault: false },
        { id: 'brandDesc', order: 6, show: true, fixed: false, isDefault: false },
        { id: 'productType', order: 7, show: true, fixed: false, isDefault: true },
        { id: 'warehouseName', order: 8, show: true, fixed: false, isDefault: true },
        { id: 'soldToCode', order: 9, show: true, fixed: false, isDefault: true },
        { id: 'soldToName', order: 10, show: true, fixed: false, isDefault: true },
        { id: 'salesOrgName', order: 11, show: true, fixed: false, isDefault: true },
        { id: 'salesRegionName', order: 12, show: true, fixed: false, isDefault: true },
        { id: 'salesOfficeName', order: 13, show: true, fixed: false, isDefault: true },
        { id: 'channelName', order: 14, show: true, fixed: false, isDefault: true },
        { id: 'custGrpName', order: 15, show: true, fixed: false, isDefault: true },
        { id: 'productGrpName', order: 16, show: true, fixed: false, isDefault: true },
        { id: 'edit', order: 17, show: true, fixed: false, isDefault: true },
        { id: 'edit', order: 18, show: true, fixed: false, isDefault: true },
        { id: 'lowriskQty', order: 19, show: true, fixed: false, isDefault: true },
        { id: 'highriskQty', order: 20, show: true, fixed: false, isDefault: true },
        { id: 'realQty', order: 21, show: true, fixed: false, isDefault: true }
    ]
}

const DATA_RESULT = {
    columns: [
        { id: 'matchResult', order: 1, show: true, fixed: false, isDefault: false },
        { id: 'orderType', order: 2, show: true, fixed: false, isDefault: false },
        { id: 'orderNum', order: 3, show: true, fixed: false, isDefault: false },
        { id: 'orderCreateDtt', order: 4, show: true, fixed: false, isDefault: false },
        { id: 'creditDtt', order: 5, show: true, fixed: false, isDefault: false },
        { id: 'effectiveDt', order: 6, show: true, fixed: false, isDefault: false },
        { id: 'latestDeliveryDt', order: 7, show: true, fixed: false, isDefault: true },
        { id: 'extendEffDtt', order: 8, show: true, fixed: false, isDefault: true },
        { id: 'salesOrgName', order: 9, show: true, fixed: false, isDefault: true },
        { id: 'salesRegionName', order: 10, show: true, fixed: false, isDefault: true },
        { id: 'salesOfficeName', order: 11, show: true, fixed: false, isDefault: true },
        { id: 'channelName', order: 12, show: true, fixed: false, isDefault: true },
        { id: 'custGrpName', order: 13, show: true, fixed: false, isDefault: true },
        { id: 'productGrpName', order: 14, show: true, fixed: false, isDefault: true },
        { id: 'soldToCode', order: 15, show: true, fixed: false, isDefault: true },
        { id: 'soldToName', order: 16, show: true, fixed: false, isDefault: true },
        { id: 'payFromName', order: 17, show: true, fixed: false, isDefault: true },
        { id: 'shipToCode', order: 18, show: true, fixed: false, isDefault: true },
        { id: 'shipToName', order: 19, show: true, fixed: false, isDefault: true },
        { id: 'custOrderNum', order: 20, show: true, fixed: false, isDefault: true },
        { id: 'custOrderDate', order: 21, show: true, fixed: false, isDefault: true },
        { id: 'custGrpName', order: 15, show: true, fixed: false, isDefault: true },
        { id: 'warehouseCode', order: 16, show: true, fixed: false, isDefault: true },
        { id: 'warehouseName', order: 17, show: true, fixed: false, isDefault: true },
        { id: 'orderQty', order: 18, show: true, fixed: false, isDefault: true },
        { id: 'receivedQty', order: 19, show: true, fixed: false, isDefault: true },
        { id: 'assignedQty', order: 20, show: true, fixed: false, isDefault: true },
        { id: 'tag', order: 21, show: true, fixed: false, isDefault: true },
        { id: 'remark', order: 22, show: true, fixed: false, isDefault: true },
        { id: 'matchAssignedQty', order: 23, show: true, fixed: false, isDefault: true },
        { id: 'matchUnAssignedQty', order: 24, show: true, fixed: false, isDefault: true },
        { id: 'satisfyRate', order: 25, show: true, fixed: false, isDefault: true },
        { id: 'expectDeliveryDate', order: 26, show: true, fixed: false, isDefault: true }
    ]
}

const DETAIL_RESULT = {
    columns: [
        { id: 'orderType', order: 1, show: true, fixed: false, isDefault: false },
        { id: 'orderNum', order: 2, show: true, fixed: false, isDefault: false },
        { id: 'orderCreateDtt', order: 3, show: true, fixed: false, isDefault: false },
        { id: 'creditDtt', order: 4, show: true, fixed: false, isDefault: false },
        { id: 'salesOrgName', order: 5, show: true, fixed: false, isDefault: false },
        { id: 'salesRegionName', order: 6, show: true, fixed: false, isDefault: false },
        { id: 'salesOfficeName', order: 7, show: true, fixed: false, isDefault: true },
        { id: 'channelName', order: 8, show: true, fixed: false, isDefault: true },
        { id: 'custGrpName', order: 9, show: true, fixed: false, isDefault: true },
        { id: 'productGrpName', order: 10, show: true, fixed: false, isDefault: true },
        { id: 'soldToCode', order: 11, show: true, fixed: false, isDefault: true },
        { id: 'soldToName', order: 12, show: true, fixed: false, isDefault: true },
        { id: 'payFromName', order: 13, show: true, fixed: false, isDefault: true },
        { id: 'shipToCode', order: 14, show: true, fixed: false, isDefault: true },
        { id: 'shipToName', order: 15, show: true, fixed: false, isDefault: true },
        { id: 'custOrderNum', order: 16, show: true, fixed: false, isDefault: true },
        { id: 'custOrderDate', order: 17, show: true, fixed: false, isDefault: true },
        { id: 'warehouseOutCode', order: 18, show: true, fixed: false, isDefault: true },
        { id: 'warehouseOutName', order: 19, show: true, fixed: false, isDefault: true },
        { id: 'skuCode', order: 20, show: true, fixed: false, isDefault: true },
        { id: 'skuDesc', order: 21, show: true, fixed: false, isDefault: true },
        { id: 'categoryDesc', order: 15, show: true, fixed: false, isDefault: true },
        { id: 'brandDesc', order: 16, show: true, fixed: false, isDefault: true },
        { id: 'details.paGrade', order: 17, show: true, fixed: false, isDefault: true },
        { id: 'orderQty', order: 18, show: true, fixed: false, isDefault: true },
        { id: 'receivedQty', order: 19, show: true, fixed: false, isDefault: true },
        { id: 'assigned_qtyQty', order: 20, show: true, fixed: false, isDefault: true },
        { id: 'pendingAllotQty', order: 21, show: true, fixed: false, isDefault: true },
        { id: 'price', order: 22, show: true, fixed: false, isDefault: true },
        { id: 'stdPrice', order: 23, show: true, fixed: false, isDefault: true },
        { id: 'discountValue', order: 24, show: true, fixed: false, isDefault: true },
        { id: 'discountPrice', order: 25, show: true, fixed: false, isDefault: true },
        { id: 'dcValue', order: 26, show: true, fixed: false, isDefault: true },
        { id: 'dcPrice', order: 27, show: true, fixed: false, isDefault: true },
        { id: 'tag', order: 28, show: true, fixed: false, isDefault: true },
        { id: 'details.inveType', order: 29, show: true, fixed: false, isDefault: true },
        { id: 'details.warehouseCode', order: 30, show: true, fixed: false, isDefault: true },
        { id: 'details.warehouseName', order: 31, show: true, fixed: false, isDefault: true },
        { id: 'details.paGrade', order: 32, show: true, fixed: false, isDefault: true },
        { id: 'details.useReserve', order: 33, show: true, fixed: false, isDefault: true },
        { id: 'details.supplyDt', order: 34, show: true, fixed: false, isDefault: true },
        { id: 'details.deliveryDt', order: 35, show: true, fixed: false, isDefault: true }
    ]
}

export default {
    DATA_ACTIVITY,
    DATA_LOGS,
    UPLOAD_CENTER,
    DATA_OREDER,
    DETAIL_OREDER,
    DELIVERY_OREDER,
    ORDER_DETAIL,
    DATA_DELIVERY,
    DETAIL_DELIVERY,
    DATA_VDO,
    STOCK_STATUS,
    STOCK_VBN,
    JSTOCK_STATUS,
    JSTOCK_VBN,
    DATA_RESULT,
    DETAIL_RESULT
}