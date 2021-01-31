import React from 'react';
import { Droppable } from 'react-beautiful-dnd';

import DraggableColumn from './DraggableColumn';

function getBgColor(snapshot) {
    if (snapshot.draggingFromThisWith) {
        return '#E3F2FD';
    }
    if (snapshot.isDraggingOver) {
        return '#FFEBEE';
    }
    return 'white';
}

const DroppableColumns = ({
    droppableId,
    columns,
    titleMap,
    onChange,
    widthEditable,
}) => {
    return (
        <Droppable droppableId={droppableId} type="columns">
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    style={{
                        padding: 0,
                        backgroundColor: getBgColor(snapshot),
                        opacity: 1,
                    }}
                    {...provided.droppableProps}
                >
                    {columns.map((item, index) => <DraggableColumn
                        key={item.id}
                        index={index}
                        draggableId={item.id}
                        title={titleMap[item.id]}
                        width={item.width}
                        show={item.show}
                        isDefault={item.isDefault}
                        onChange={onChange(index)}
                        widthEditable={widthEditable}
                    />)}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    );
}

export default DroppableColumns;
