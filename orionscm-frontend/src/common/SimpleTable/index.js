import React from 'react';
import { Table } from 'antd';
import _ from 'lodash';

import './index.less';
import useTableSetting from './hook/useTableSetting';
import TableSetting from './components/TableSetting';

const SimpleTable = ({
    id,
    columns,
    pagination,
    callback = () => {},
    query,
    widthEditable = false,
    ...rest
}) => {
    const [isFetchingTableSetting, tableSettingColumns, setColumns] = useTableSetting(id);

    const onChange = (p, filter, sorter) => {
        let sorterArr = Array.isArray(sorter) ? sorter : [ sorter ];
        sorterArr = sorterArr.filter( e => e.order != null );

        callback({
            queryData: {
                ...query,
                pageNum: p.current,
                pageSize: p.pageSize,
                queryAction: 'table'
            },
            sorter: sorterArr,
            filter
        })
    }

    // 根据表格配置选择显示的列表并进行排序
    const columnsIds = tableSettingColumns.filter(item => item.show).map(item => item.id);
    const columnsShow = columns.filter(item => id ? columnsIds.includes(item.dataIndex) : true)
        .map(item => {
            const tableSettingConfigItem = tableSettingColumns.find(element => element.id === item.dataIndex)
            return {
                ...item,
                ...{
                    align: item.align ? item.align : 'center',
                    width: tableSettingConfigItem ? tableSettingConfigItem.width : item.width,
                    order: tableSettingConfigItem ? tableSettingConfigItem.order : item.order,
                    fixed: tableSettingConfigItem ? tableSettingConfigItem.fixed : item.fixed,
                }
            }
        })
        .sort((a, b) => (a.order - b.order));

    return (
        <div className={'simple-table'}>
            {id && (
                <TableSetting
                    id={id}
                    titles={columns}
                    loading={isFetchingTableSetting}
                    data={tableSettingColumns}
                    onChange={setColumns}
                    widthEditable={widthEditable}
                />
            )}
            <Table
                {...rest}
                pagination={pagination}
                onChange={onChange}
                columns={columnsShow}
            />
        </div>
    );
}

export default SimpleTable;
