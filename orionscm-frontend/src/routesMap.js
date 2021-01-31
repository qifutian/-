import { baseURI } from 'common/baseURI';
import intl from 'src/i18n/index';


import Example from  'containers/data/activity';
import OrderBoard from 'containers/ControlTower/OrderBoard/view';
import StockBoard from 'containers/ControlTower/StockBoard/view';
import PermissionConfiguration from 'containers/SystemAdmin/PermissionConfiguration/view';
import PerformanceTasks from 'containers/OrderFullfil/PerformanceTasks/view';
import OrderCenter from 'containers/ControlTower/OrderCenter/view';
import StockQuery from 'containers/ControlTower/StockQuery/view';
import OrderResult from 'containers/ControlTower/OrderResult/view';
import ResultAmend from 'containers/ControlTower/ResultAmend/view';
import QueryReserve from 'containers/OrderFullfil/QueryReserve/view';
import AddQueryReserve from 'containers/OrderFullfil/AddQueryReserve/view'
import OrderFulfillmentConfigur from 'containers/SystemConfigure/OrderFulfillmentConfigur/view';
import DataAdmin from 'containers/SystemAdmin/DataLogs/view';
import DataLogs from 'containers/SystemAdmin/DataLogs/view';
import UploadCenter from 'containers/DataAdmin/UploadCenter/view';
import Supply from 'containers/SystemConfigure/Supply/view'

export const routesMap = [
    /*
    {
        path: baseURI + 'store/homepage',
        linkName: intl.get('menu.首页'),
        menuIcon: 'daohangshouye',
        component: dataActivity
    }, */
    {
        linkName: intl.get('menu.控制塔'),
        code: 'control',
        menuIcon: 'daohangdinghuo',
        path: baseURI + 'control',
        subMenu: true,
        children: [
            {
                path: baseURI + 'control/order',
                linkName: intl.get('menu.样例'),
                component: Example,
                code: 'sample',
                icon: 'xiaoxihe'
            },
            {
                path: baseURI + 'control/orderboard',
                code: 'orderboard',
                linkName: intl.get('menu.订单看板'),
                component: OrderBoard,
                icon: 'xiaoxihe'
            },
            {
                path: baseURI + 'control/ordercenter',
                code: 'ordercenter',
                linkName: intl.get('menu.订单中心'),
                component: OrderCenter,
                icon: 'xiaoxihe'
            },
            {
                path: baseURI + 'control/stockboard',
                code: 'stockboard',
                linkName: intl.get('menu.库存看板'),
                component: StockBoard,
                icon: 'xiaoxihe'
            },
            {
                path: baseURI + 'control/stockquery',
                code: 'stockquery',
                linkName: intl.get('menu.库存查询'),
                component: StockQuery,
                icon: 'xiaoxihe'
            }
        ]
    }, {
        linkName: intl.get('menu.订单履约'),
        code: 'fullfill',
        menuIcon: 'daohangshujuguanli',
        path: baseURI + 'fullfill',
        subMenu: true,
        children: [
            {
                path: baseURI + 'fullfill/tasks',
                code: 'tasks',
                linkName: intl.get('menu.履约任务'),
                component: PerformanceTasks,
                icon: 'xiaoxihe'
            },
            {
                path: baseURI + 'fullfill/orderresult',
                code: 'orderresult',
                linkName: intl.get('menu.订单分配结果'),
                component: OrderResult,
                icon: 'xiaoxihe',
                children: [{
                    path: baseURI + 'fullfill/resultamend',
                    code: 'resultamend',
                    linkName: intl.get('menu.修改分配结果'),
                    component: ResultAmend,
                    isMenu: false
                }]
            },
            {
                path: baseURI + 'fullfill/allocation',
                code: 'allocation',
                linkName: intl.get('menu.调拨分配结果'),
                component: Example,
                icon: 'xiaoxihe'
            },
            {
                path: baseURI + 'fullfill/reserved',
                code: 'reserved',
                linkName: intl.get('menu.库存预留'),
                component: QueryReserve,
                icon: 'xiaoxihe',
                children: [{
                    path: baseURI + 'fullfill/addqueryreserve',
                    code: 'addqueryreserve',
                    linkName: intl.get('menu.新增库存预留'),
                    component: AddQueryReserve,
                    isMenu: false
                }]
            }
        ]
    }, {
        linkName: intl.get('menu.数据管理'),
        code: 'data',
        menuIcon: 'daohangshujuguanli',
        path: baseURI + 'data',
        subMenu: true,
        children: [
            {
                path: baseURI + 'data/datacenter',
                code: 'datacenter',
                linkName: intl.get('menu.上传下载中心'),
                component: UploadCenter,
                icon: 'xiaoxihe'
            }
        ]
    }, {
        linkName: intl.get('menu.系统配置'),
        code: 'setting',
        menuIcon: 'daohangshujuguanli',
        path: baseURI + 'setting',
        subMenu: true,
        children: [
            {
                path: baseURI + 'setting/control',
                code: 'controlsetting',
                linkName: intl.get('menu.控制塔配置'),
                component: Example,
                icon: 'xiaoxihe'
            },
            {
                path: baseURI + 'setting/orderfulfillmentconfigur',
                code: 'fullfillsetting',
                linkName: intl.get('menu.订单履约配置'),
                component: OrderFulfillmentConfigur,
                icon: 'xiaoxihe'
            },
            {
                path: baseURI + 'setting/supply',
                code: 'supply',
                linkName: intl.get('menu.供应网络配置'),
                component: Supply,
                icon: 'xiaoxihe'
            }
        ]
    }, {
        linkName: intl.get('menu.后台管理'),
        code: 'manage',
        menuIcon: 'daohangshujuguanli',
        path: baseURI + 'manage',
        subMenu: true,
        children: [
            {
                path: baseURI + 'manage/permission',
                code: 'permission',
                linkName: intl.get('menu.用户权限配置'),
                component: PermissionConfiguration,
                icon: 'xiaoxihe'
            },
            {
                path: baseURI + 'manage/logs',
                code: 'logs',
                linkName: intl.get('menu.数据接口日志'),
                component: DataLogs,
                icon: 'xiaoxihe'
            }
        ]
    }
];

const flatRoutesMap = {};

function defineFlatRoutesMap(route, parent = []) {
    route.forEach((r) => {
        if (r.component && r.path) {
            flatRoutesMap[ `${r.path}` ] = {
                selectedKeys: r.isMenu === false && parent.length ? parent[0].path : r.path,
                openKeys: parent.length ? parent.map((p) => p.path) : [],
                linkName: r.linkName + ' ',
                component: r.component,
                auth: r.code
            };
        }
        if (r.children) {
            defineFlatRoutesMap(r.children, [ r, ...parent ]);
        }
    });
}
defineFlatRoutesMap(routesMap);

export { flatRoutesMap };
