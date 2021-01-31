import _ from 'lodash';
import Cookie from 'js-cookie';

let baseURI = '/';

export let util = {
    LOGIN_ROUTE: `${baseURI}login`,
    BASE_URL: baseURI,
    DEFAULT_OPEN_KEYS: [ '/control', '/fullfill', '/data', '/setting', '/manage' ],
    /* format params for GET request */
    formatUrl: (url, params) => {
        let paramsArray = [];
        Object.keys(params).forEach(key => paramsArray.push(key + '=' + encodeURIComponent(params[key])));
        if (url.search(/\?/) === -1) {
            url += '?' + paramsArray.join('&')
        } else {
            url += '&' + paramsArray.join('&')
        }
        return url;
    },
    /* truncate a string by char length */
    truncate: (str = '', length = 20) => _.truncate(str, { length: length }),
    /* remove specified char from a string */
    trim: (str = '', chars = ' ') => _.trim(str, chars),
    isEqual: (object, other) => _.isEqual(object, other),
    /* reassign the value for empty field */
    isEmpty: (value) => {
        if ((typeof value) === 'object') {
            if (_.isEmpty(value)) {
                return '—';
            }
        } else if (!_.isNumber(value) && !value) {
            return '—';
        }
        return value;
    },
    empty: (value, isArray = false) => {
        if ((typeof value) === 'object') {
            if ((Array.isArray(value) || isArray) && _.isEmpty(value)) {
                return [];
            } else if (_.isEmpty(value)) {
                return {};
            }
        } else if (!_.isNumber(value) && !value) {
            return 0;
        }
        return value;
    },
    _isEmpty: (value) => {
        if ((typeof value) === 'object') {
            if (_.isEmpty(value)) {
                return true;
            }
        } else if (!_.isNumber(value) && !value) {
            return true;
        }
        return false;
    },
    /* formats a number using fixed-point notation */
    fixed: function (num, digits) {
        var n = Number(num);
        return n.toFixed(digits);
    },
    /* validate number and letter */
    checkNumberAndLetter: function (str) {
        const strReg = /^[a-zA-Z0-9]*$/;
        if (strReg.test(str)) {
            return { code: true };
        } else {
            return { code: false };
        }
    },
    /* validate email */
    checkEmail: function (strEmail) {
        const emailReg = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/;
        if (emailReg.test(strEmail)) {
            return { code: true };
        } else {
            return { code: false, msg: '邮箱格式错误！' };
        }
    },
    /* validate phone number */
    checkMobile: function (strMobile) {
        const mobileReg = /^[1][0-9]{10}$/;
        if (mobileReg.test(strMobile)) {
            return { code: true };
        } else {
            return { code: false, msg: '手机号格式错误！' };
        }
    },
    showTotal(total = 0, selected = 0) {
        let desc = '';
        desc = selected ? `已选中${selected}行` : ``
        desc += (total ? (selected ? `/共计${total}行` : `共计${total}行`) : ``)
        return desc;
    },
    //分页数据初始化
    getPageData(data) {
        let pageDta = {
            ...data,
            pageInfo: {
                list: [],
                pageNum: 1,
                pageSize: 20,
                total: 0,
            }

        };
        if (_.isEmpty(data)) {
            return pageDta;
        } else {
            if (_.isEmpty(data.pageInfo)) {
                return pageDta;
            } else {
                if (_.isEmpty(data.pageInfo.list)) {
                    return pageDta;
                }
                return data;
            }
        }
    },
    removeLeadingChar: function (origin, char) {
        while (origin.charAt(0) === ',') {
            origin = origin.substr(1);
        }
        return origin;
    },
    getNowFormatDate: function (seperator) {
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var currentdate = year + seperator + month + seperator + strDate;
        return currentdate;
    },
    getSessionObj: (key = '', isArray = false) => JSON.parse(sessionStorage.getItem(key)) || (isArray ? []: {}),
    setSessionObj: (key = '', value = null) => {
        if (_.isEmpty(value)) {
            sessionStorage.removeItem(key);
        } else {
            sessionStorage.setItem(key, JSON.stringify(value));
        }
    },
    getCookieObj: (key = '', isArray = false) => (Cookie.get(key) && JSON.parse(Cookie.get(key))) || (isArray ? []: {}),
    setCookieObj: (key = '', value = null) => {
        if (_.isEmpty(value)) {
            Cookie.remove(key);
        } else {
            Cookie.set(key, JSON.stringify(value));
        }
    },
    toChinesNum: function (num) {
        let changeNum = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']; //changeNum[0] = "零"
        let unit = ["", "十", "百", "千", "万"];
        num = parseInt(num);
        let getWan = (temp) => {
            let strArr = temp.toString().split("").reverse();
            let newNum = "";
            for (var i = 0; i < strArr.length; i++) {
                newNum = (i === 0 && strArr[i] === 0 ? "" : (i > 0 && strArr[i] === 0 && strArr[i - 1] === 0 ? "" : changeNum[strArr[i]] + (strArr[i] === 0 ? unit[0] : unit[i]))) + newNum;
            }
            return newNum;
        }
        let overWan = Math.floor(num / 10000);
        let noWan = num % 10000;
        if (noWan.toString().length < 4) noWan = "0" + noWan;
        return overWan ? getWan(overWan) + "万" + getWan(noWan) : getWan(num);
    },
    toWeek: function (num) {
        let week = ''
        switch (num) {
            case 1:
                week = '周一';
                break;
            case 2:
                week = '周二';
                break;
            case 3:
                week = '周三';
                break;
            case 4:
                week = '周四';
                break;
            case 5:
                week = '周五';
                break;
            case 6:
                week = '周六';
                break;
            case 7:
                week = '周日';
                break;
            default:
                week = '';
        }
        return week;
    },
    getDaysBetween(dateString1, dateString2) { //计算两个日期之间相差的天数
        let startDate = Date.parse(dateString1);
        let endDate = Date.parse(dateString2);
        let days = (endDate - startDate) / (1 * 24 * 60 * 60 * 1000) + 1;
        if (_.isNaN(days)) return '—';
        return days;
    },
    //treeSelect DATA
    treeDataPineVal(ThreeData) {
        const dataTemp = !_.isEmpty(ThreeData) ? [{ title: '全选', value: '', children: [] }] : [];
        dataTemp.length && ThreeData.forEach((item, index) => {
            dataTemp[0].children.push({
                title: item.name,
                value: item.id,
                // key: item.id
            });
        });
        return dataTemp;
    },
    //multi sorter filter
    /**
        * [过滤对象]
        * @param  obj [过滤前数据]
        * @param  arr [过滤条件，要求为数组]
    */
    multiSorterFilter(obj) {
        if (typeof (obj) !== "object") {
            throw new Error("参数格式不正确")
        }
        const result = {}
        Object.keys(obj).forEach((key) => {
            (obj[key] !== "" && Object.prototype.toString.call(obj[key]) !== "[object Object]" && obj[key] !== null && obj[key] !== undefined) && (result[key] = obj[key]);
        })
        return result;
    },
    serializeSorterOrder(sort) {
        const sorts = sort;
        const sortObj = {};
        if (sorts) {
            if (Array.isArray(sorts)) {
                sorts.forEach(key => sortObj[key.field] = key.order)
            } else {
                sortObj[sorts.field] = sorts.order;
            }
        }
        return sortObj;
    },
    // format excel data to list
    toExcelDataArray( excelStr ) {
        if (!excelStr) return []
        excelStr = excelStr.replaceAll(/(\r\n|\n|\r|\t)/gm, ",");
        excelStr = excelStr.replaceAll( ' ', ',');
        if( excelStr.indexOf(',') > -1 ) {
            return _.split(excelStr, ',');
        } else {
            return excelStr ? [excelStr] : []
        }
    },
    downLoad: (options) => {
        const { url, method = "POST", data = null, customName } = options;
        return new Promise((resolve, reject) => {
            const options = {
                method,
                headers: {
                    "token": `${Cookie.get( 'token' )}`
                }
            };
            data && (options.body = JSON.stringify(data));
            fetch(url, options).then(res => {
                if (res.ok && res.status === 200) {
                    let fileName;
                    if (!customName && !res.headers.get("content-disposition")) {
                        // 此文件前后端都没有进行命名
                        fileName = "下载文件内容为空";
                    } else {
                        fileName = customName ? customName : decodeURIComponent(res.headers.get("content-disposition")?.split(";")[ 1 ].split("=")[ 1 ]);
                    };
                    return res.blob().then(response => {
                        // 创建隐藏的可下载链接
                        const eleLink = document.createElement('a'),
                            objectURL = URL.createObjectURL(response);
                        eleLink.download = fileName;
                        eleLink.style.display = 'none';
                        // 字符内容转变成blob地址
                        eleLink.href = objectURL;
                        // 触发点击
                        document.body.appendChild(eleLink);
                        eleLink.click();
                        // 然后移除
                        document.body.removeChild(eleLink);
                        notification.success('下载成功');
                        // 下载成功
                        resolve(1);
                        URL.revokeObjectURL(objectURL);
                    });
                } else {
                    reject(0);
                    notification.error('下载失败请重试');
                }
            }).catch((error) => {
                reject(0);
                notification.error('网络请求错误');
            });
        });
    }
}