import React, { useState, useEffect } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { Modal, Tooltip, Switch, Button, Space, Spin } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import { createUseStyles } from 'react-jss';
import GoIcons from 'src/common/GoIcons'
import DroppableColumns from './DroppableColumns';
import { notification } from 'src/common/notification';

// 数组中两个元素交换位置后返回新数组
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
};

// 根据 column key 获取 column title 的 map 数据
const getTitleMap = (list) => {
    let result = {};
    for (let i = 0; i < list.length; i++) {
        const element = list[i];
        result[element.dataIndex] = element.title || '';
    }
    return result;
}

const useStyles = createUseStyles({
    button: {
        position: 'absolute',
        top: 20,
        right: 20,
        zIndex: 1,
    }
})

const TableSetting = ({
    id,
    titles = [],
    loading,
    data = [],
    onChange = () => { },
    children,
    widthEditable = true,
    ...rest
}) => {
    const classes = useStyles();
    const [visible, setVisible] = useState(false);
    const [columns, setColumns] = useState([]);
    const [changed, setChanged] = useState(false);
    const [titleMap, setTitleMap] = useState({});

    useEffect(() => {
        setColumns(data);
    }, [data]);

    // 开始调整
    const handleOpen = () => {
        setTitleMap(getTitleMap(titles));
        setChanged(false);
        setVisible(true);
    }

    // 取消
    const handleClose = () => {
        setVisible(false);
    }

    // 保存至数据库
    const handleOk = () => {
        onChange(columns.map((item, index) => ({
            ...item,
            ...{ order: index + 1 }
        })), () => setVisible(false))
    }

    // 使用默认值
    const handleResetDefault = () => {
        onChange(null, () => setVisible(false))
    }

    // 显示/隐藏所有列
    const toggleAllColumnShow = (checked) => {
        const newColumns = [...columns].map(item => ({
            ...item,
            show: item.isDefault ? item.show : checked
        }));
        setColumns(newColumns);
        setChanged(true);
    }

    // 修改单行的 width 或者 show
    const handelChange = index => (option) => {
        const newColumns = [...columns];
        newColumns[index] = { ...newColumns[index], ...option };
        setColumns(newColumns);
        setChanged(true);
    }

    // 拖拽结束
    const onDragEnd = (result) => {
        const { source, destination } = result;
        // 固定列、普通列之间不允许移动
        if (source.droppableId !== destination.droppableId) {
            return false;
        }
        const sourceItem = columns[source.index];
        const destinationItem = columns[destination.index];
        if (sourceItem.fixed !== destinationItem.fixed) {
            notification.error('固定列、普通列之间不允许移动')
            return false;
        }
        const newColumns = reorder(
            columns,
            source.index,
            destination.index,
        );
        setColumns(newColumns);
        setChanged(true);
    }

    // 是否全显示
    const showAllColumns = columns.filter(item => item.show).length === columns.length;

    return (
        <>
            <Tooltip placement="top" title='表格配置'>

                <GoIcons type={'xiaoxihe'} onClick={handleOpen} className={classes.button}/>
            </Tooltip>
            <Modal
                title={
                    <Space>
                        <span>表格自定义（可拖拽调整列顺序）</span>
                        <Switch size='middle' checkedChildren="显示所有列" unCheckedChildren="隐藏所有列" checked={showAllColumns} onChange={toggleAllColumnShow} />
                    </Space>
                }
                width={500}
                bodyStyle={{ padding: 8, maxHeight: '600px', overflowY: 'auto', }}
                maskClosable={true}
                destroyOnClose={true}
                visible={visible}
                onCancel={handleClose}
                footer={
                    <Space>
                        <Button className="common-btn-white-sm" onClick={handleClose} >取消</Button>
                        <Button className="common-btn-white-sm" style={{width: 90}} onClick={handleResetDefault} >使用默认值</Button>
                        <Button className="common-btn-blue-sm" disabled={!changed} onClick={handleOk} >保存</Button>
                    </Space>
                }
            >
                <Spin spinning={loading}>
                    <DragDropContext onDragEnd={onDragEnd}>
                        <DroppableColumns
                            droppableId='columns'
                            columns={columns}
                            titleMap={titleMap}
                            onChange={handelChange}
                            widthEditable={widthEditable}
                        />
                    </DragDropContext>
                </Spin>
            </Modal>
        </>
    );
}

export default TableSetting;
