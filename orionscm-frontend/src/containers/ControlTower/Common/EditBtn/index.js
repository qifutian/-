// 按钮编辑组件
import React from 'react';
import { Button } from 'antd';

const EditBtn = ({ ...props }) => {
    return (
        <div className="system-configure-edit-btn">
            {
                props.btnList && props.btnList.map(ele => <Button className={`system-folding-window-${ele.color}-sm`} onClick={() => props[ele.func](ele.data)} key={ele.name} disabled={ele.disabled}>
                    {ele.name}
                </Button>)
            }
        </div>
    )
}
export default EditBtn;

