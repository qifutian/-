// 用户编辑组件
import React, { PureComponent, Fragment } from 'react';
import { Button, Modal, TreeSelect, List, Tag } from 'antd';
import SimpleTable from 'src/common/SimpleTable';
import { util } from 'common/util';
import intl from 'src/i18n/index';
const { SHOW_PARENT } = TreeSelect;
const layout = { labelCol: { span: 6 }, wrapperCol: { span: 18 } };

export default class DetailModal extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            detailColumns: [
                { title: intl.get('DataAdmin.行数'), dataIndex: 'row', width: 250, render: text => util.isEmpty(text) },
                { title: intl.get('DataAdmin.错误原因'), dataIndex: 'reason', render: text => util.isEmpty(text) },
            ],
            dataUploadList: {}
        }
    }

    componentDidMount() {

    }

    queryCallback = (query) => {
        const { pageNum, pageSize, queryData, sorter = [], confirm, filter, ...others } = query;
        this.setState({ queryObj: queryData }, () => this.props.fetchGetUserList({ ...this.state.queryObj }) );
    }

    render() {
        const { ...rest } = this.props;
        const { detailColumns, dataUploadList } = this.state;
        let datatest = [{ row: '1', reason: '2' }];

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
                    <SimpleTable
                        className="common-table"
                        query={this.state.queryObj}
                        callback={(query) => this.queryCallback(query)}
                        columns={detailColumns}
                        dataSource={datatest}
                        rowKey="id"
                        pagination={{
                            size: 'small',
                            current: dataUploadList.pageNum,
                            pageSizeOptions: [ '10', '20', '50', '100' ],
                            pageSize: dataUploadList.pageSize,
                            total: dataUploadList.total,
                            showSizeChanger: true,
                            showQuickJumper: true,
                            showTotal: (total) => {
                                return <span>
                                    {total ? <span>共计<span className="summary">{total}</span>行</span> : null}
                                </span>;
                            }
                        }}
                    />
                </div>
            </Modal>
        )
    }
}

