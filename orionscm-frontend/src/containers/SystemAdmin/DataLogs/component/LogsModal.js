// 日志详情组件
import React, { PureComponent, Fragment } from 'react';
import { Button, Modal, List } from 'antd';
import { util } from 'common/util';
import intl from 'src/i18n/index';

export default class LogsModal extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        const { ...rest } = this.props;
        return (
            <Modal title={<span className={'modal-title-text'}>{rest.title}</span>}
                className="common-alert view-system-log-modal"
                visible={rest.visible}
                centered
                onCancel={rest.handleCancel}
                maskClosable={false}
                width={480}
                footer={[
                    <Button key="cancel" className="common-btn-white-lg" size="large" onClick={rest.handleCancel}>{intl.get('SystemAdmin.关闭')}</Button>
                ]}>
                <div className="modal-content">
                    {rest.logsDetailList.length ? <List
                        size="small"
                        bordered
                        dataSource={rest.logsDetailList}
                        renderItem={item => <List.Item>logs > {item.createDtt} jobId:{item.jobId} {item.failedReason}</List.Item>}
                    /> : <List
                        size="small"
                        bordered
                        dataSource={['接口传输成功']}
                        renderItem={item => <List.Item>logs > {item}</List.Item>}
                    />}
                </div>
            </Modal>
        )
    }
}

