// 折叠窗组件
import React, { PureComponent, useState } from 'react';
import { Collapse, Row, Col } from 'antd';
import { UpCircleOutlined, DownCircleOutlined } from '@ant-design/icons'
import './index.less';
const { Panel } = Collapse;

const FoldingWindow = ({ ...rest }) => {
    const [IsOpen, setIsOpen] = useState(false);
    return (
        <div className="system-folding-window">
            <Collapse activeKey={IsOpen ? ['1'] : []}>
                <Panel
                    header={
                        <Row justify="space-between">
                            <Col className="system-folding-window-left">
                                <Row justify="start">
                                    <Col className="modal-title">{rest.modalTitle}</Col>
                                    {
                                        rest.children && <Col className="edit-title" onClick={() => setIsOpen(!IsOpen)}>查询展开{IsOpen ? <UpCircleOutlined /> : <DownCircleOutlined />}</Col>
                                    }
                                    <Col className="additional-assembly">{rest.leftContent}</Col>
                                </Row>
                            </Col>
                            <Col className="system-folding-window-right">{rest.rightContent}</Col>
                        </Row>
                    }
                    key="1"
                    showArrow={false}
                >
                    {rest.children}
                </Panel>
            </Collapse>
        </div>
    )
}
export default FoldingWindow;

