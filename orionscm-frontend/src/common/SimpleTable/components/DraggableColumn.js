import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { createUseStyles } from 'react-jss';
import { Space, InputNumber, Switch } from 'antd';

const useStyles = createUseStyles({
    row: {
        padding: 8,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    left: {
        flexGrow: 1,
        display: 'flex',
        alignItems: 'center',
    },
    colorDiv: {
        padding: '0 10px',
        maxWidth: '500px',
        whiteSpace: 'nowrap',
    }
})

const DraggableColumn = ({
    index,
    draggableId,
    title,
    width,
    show,
    isDefault,
    onChange = () => { },
    widthEditable,
}) => {
    const classes = useStyles();

    const handleWidthChange = value => {
        onChange({ width: value })
    }

    const handleShowChange = checked => {
        onChange({ show: checked })
    }
    return (
        <Draggable draggableId={draggableId} index={index}>
            {(provided, snapshot) => {
                const style = {
                    border: snapshot.isDragging ? '1px dashed green' : 'none',
                    borderBottom: snapshot.isDragging ? '1px dashed green' : '1px solid rgb(232, 232, 232)',
                    ...provided.draggableProps.style,
                };
                return (
                    <div
                        ref={provided.innerRef}
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}
                        className={classes.row}
                        style={style}
                    >
                        <div className={classes.left}>
                            <div
                                className={classes.colorDiv}
                                /*
                                style={{
                                    width: width,
                                    background: show ? '#c9edcd' : '#eee',
                                    fontWeight: show ? '700' : '400',
                                }} */
                            >
                                {title}
                            </div>
                        </div>
                        <Space>
                            {widthEditable && <span>
                                <InputNumber
                                    size='small'
                                    value={width}
                                    formatter={value => `宽度 ${value}`}
                                    min={0}
                                    precision={0}
                                    step={10}
                                    onChange={handleWidthChange}
                                />
                                &nbsp;px
                            </span>}
                            <Switch
                                size='small'
                                disabled={isDefault}
                                checkedChildren="显示"
                                unCheckedChildren="隐藏"
                                checked={show}
                                onChange={handleShowChange}
                            />
                        </Space>
                    </div>
                )
            }}
        </Draggable>
    );
}

export default DraggableColumn;
