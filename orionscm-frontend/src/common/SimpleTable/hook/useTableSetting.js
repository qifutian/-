import { useState, useEffect, useCallback } from 'react';
import { message } from 'antd';
import fetch from 'common/fetch';
import { connection } from 'common/connection';
import tableSetting from '../tableConfig/tableSetting';
import { notification } from 'src/common/notification';
import { util } from 'common/util';

// 对映射后的数组进行排序，该列不存在于存储的数据中时则相对位置不变
const setting = connection.setting
function _sorter(first, second) {
    if (first.dataIndex === -1 || second.dataIndex === -1) {
        return 0
    } else {
        return first.dataIndex - second.dataIndex
    }
}
// 映射恢复
function _mapWapper(columns, columnsData) {
    return (item) => {
        if (item.dataIndex > -1) {
            return columnsData[item.dataIndex]
        } else {
            return columns[item.index]
        }
    }
}

// 合并表格配置的存储数据与默认数据
function _mergeColumns(columns, columnsData) {
    if (Array.isArray(columnsData) && columnsData.length > 0) {
        // 数组映射，便于排序
        let leftColumnsMapped = [];
        let noFixedColumnsMapped = [];
        let rightColumnsMapped = [];
        columns.forEach((item, index) => {
            const dataIndex = columnsData.findIndex(columnData => columnData.id === item.id)
            if (item.fixed === 'left' || item.fixed === true) {
                leftColumnsMapped.push({ ...item, ...{ index, dataIndex } })
            } else if (item.fixed === 'right') {
                rightColumnsMapped.push({ ...item, ...{ index, dataIndex } })
            } else {
                noFixedColumnsMapped.push({ ...item, ...{ index, dataIndex } })
            }
        });
        // 排序
        leftColumnsMapped.sort(_sorter);
        noFixedColumnsMapped.sort(_sorter);
        rightColumnsMapped.sort(_sorter);
        // 映射恢复
        return (
            [
                ...leftColumnsMapped.map(_mapWapper(columns, columnsData)),
                ...noFixedColumnsMapped.map(_mapWapper(columns, columnsData)),
                ...rightColumnsMapped.map(_mapWapper(columns, columnsData)),
            ]
                .map((item, index) => ({ ...item, ...{ order: index + 1 } }))
        )
    } else {
        return columns
    }
}

/**
 * 获取表格列配置（列宽、列顺序、列显示与否）
 *
 * @export
 * @param {*} tableKey
 * @returns
 */
export default function useTableSetting(tableKey) {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);

    const update = useCallback((newData, callback) => {
        setLoading(true);
        const fetchData = async(key) => {
            try {
                let response = await fetch(setting.saveUserpreference,
                    {
                        method: 'POST',
                        body: JSON.stringify({
                            prefKey: key,
                            prefType: "SIMPLE_TABLE",
                            jsonData: newData ? JSON.stringify(newData) : null,
                        })
                    });

                const json = await response.json();
                if ( json.code == 0 ){
                    setData(newData ? newData : tableSetting[tableKey].columns);
                    if (typeof callback === 'function') {
                        callback();
                    }
                } else if ( json.code == '20010001' ) {
                    notification.error('无权限访问！');
                    window.location.href = `${util.BASE_URL}login`;
                }
            } catch (error) {
                notification.error(`表格"${tableKey}"偏好设置无法保存!`)
            } finally {
                setLoading(false);
            }
        }
        fetchData(tableKey);
    }, [tableKey])

    useEffect(() => {
        const fetchData = async(key) => {
            setLoading(true);
            try {
                const response = await fetch( `${setting.getUserpreference}?prefKey=${key}&prefType=${"SIMPLE_TABLE"}`);
                let httpCode = response.status;
                if ( httpCode === 200 ) {
                    const json = await response.json();
                    if ( json.code == 0 ){
                        let data = json.data ? json.data.jsonData : null
                        const d = _mergeColumns(tableSetting[tableKey].columns, data ? JSON.parse(data) : [] );
                        setData(d);
                    } else if ( json.code == '20010001' ) {
                        notification.error('无权限访问！');
                        window.location.href = `${util.BASE_URL}login`;
                    }
                }
            } catch (error) {
                notification.error(`表格"${tableKey}"偏好设置获取失败!`)
            } finally {
                setLoading(false);
            }
        }
        if (tableKey) {
            fetchData(tableKey);
        }
    }, [tableKey]);

    return [loading, data, update];
}
