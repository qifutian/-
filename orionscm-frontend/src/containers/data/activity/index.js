import React, { Component } from 'react';
import history from 'common/history';
import { Row, Col, Button, Breadcrumb, DatePicker, Input, Table, Upload, Modal, Select, Form, Switch, Checkbox, TreeSelect, Tabs, message} from 'antd';
import { CloseOutlined, CheckOutlined } from "@ant-design/icons";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as activityActions from 'reducers/data/activityReducer';
import * as uploadActions from 'reducers/DataCenter/UploadReducer';
import { util } from 'common/util';
import _ from 'lodash';
import intl from 'src/i18n/index';
import moment from 'moment';
import './index.less';
import { baseURI } from 'common/baseURI';
import GoIcons from 'common/GoIcons';
import iconCreation from 'image/common/create-icon.png';
import QueryGroup from 'src/common/QueryGroup'
import SimpleTable  from 'src/common/SimpleTable'
import EditTableCell  from 'src/common/EditTableCell';
import { notification } from 'src/common/notification';
import { NumericInput } from 'src/common/NumericInput';
import AlertUp from 'src/common/AlertUp'
import DownloadCase from 'src/common/Download'


const { RangePicker } = DatePicker;
const { TextArea } = Input;
const { Opiton } = Select;
const { TabPane } = Tabs;
const SHOW_PARENT = TreeSelect.SHOW_PARENT;

let sortMapTest = {
    "sortKeyMap": {
        "GUQING_DATE_ASC": "guQingDate",
        "GUQING_DATE_DESC": "guQingDate",
        "SKU_CODE_ASC": "skuCode",
        "SKU_CODE_DESC": "skuCode",
    }
}
let uploadData={};
function getKeyByValue(object, value) {
    return Object.keys(object).filter(key => object[key] === value);
}

class uploadHistory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addModalalert: false,
            deleteModalVisible: false,
            editTableData: {list: [
                {id: 1, guQingDate: 'test', skuCode: 11, skuName: 'test', specs: 'test', materialCode: 'test', materialName: 'test'},
                {id: 2, guQingDate: 'test1', skuCode: 12, skuName: 'test1', specs: 'test1', materialCode: 'test1', materialName: 'test1'}
            ], pageSize: 100, pageNum: 1, total: 10},
            editParams: [],
            queryObj: { pageSize: 100, pageNum: 1 },
            sortObj: {},

            sorterKey: [],
            sorter: [],

            dates: [ { value: [ null, null ] } ],
            desc: '',
            unit: '',
            amount: '',
            type: '1',
            typeStartTime: 0,
            typeEndTime: 0,

            dateError: false,
            descError: false,
            amountError: false,
            typeError: false,
            typeErrorMsg: '',
            handleId: 0,
            tableScrollY: document.body.offsetHeight - 245,

            // multi sotter
            sortKeys: [],
            cancelSortOrder: 1,
            testModelVisible: false,
            testFooValidate: {
                validateStatus: 'success',
                errorMsg: ''
            },
            testBarValidate: {
                validateStatus: 'success',
                errorMsg: ''
            },
            isTableEdit: false
        };

        this.handleViewResize = _.debounce(this.handleViewResize.bind(this), 500, { leading: false, trailing: true });
    }

    componentDidMount() {
        this.props.fetchGetTemplate()
        notification.success('提示三连1!!!');
        notification.error('提示三连2!!!');
        notification.warn('提示三连3!!!');
        notification.info('提示三连4!!!');
        window.addEventListener('resize', this.handleViewResize );
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleViewResize );
    }

    handleViewResize(){
        let tableScrollY = document.body.offsetHeight - 245;
        this.setState({ tableScrollY });
    }

    queryCallback = (query) => {
        const { pageNum, pageSize, queryData, sorter = [], confirm, filter, ...others } = query;

        let excelTest = util.toExcelDataArray(queryData.reflectionName)

        let sortKeys = []
        sorter.map( e => {
            let matchSort = Object.keys(sortMapTest.sortKeyMap).filter(key => sortMapTest.sortKeyMap[key] === e.field);
            if ( matchSort.length ) {
                sortKeys.push(e.order == 'ascend' ? matchSort.filter( e => e.indexOf('_ASC') > -1 )[0] : matchSort.filter( e => e.indexOf('_DESC') > -1 )[0]);
            }
        })

        this.setState({ queryObj: queryData, sorter });

        this.props.fetchActivityList(queryData, (res) => {
            if (res.code == 0) {
                this.setState({ sellallList: res.data, queryObj: queryData, sorterArr })
            }
        })
    }

    treeDataPineVal(ThreeData){
        const dataTemp = !_.isEmpty(ThreeData) ? [{title: '全选', value: '', children: []}] : [];
        dataTemp.length && ThreeData.forEach((item, index) => {
            dataTemp[0].children.push({
                title: item.name,
                value: item.id,
                pinyin: item.pinyin
            });
        });
        return dataTemp;
    }

    queryMultipleSelection(data, type) {
        const treeData = [...data];
        const tProps = {
            treeData,
            value: this.state[type],
            defaultValue: [],
            onChange: '',
            // maxTagCount: 1,
            treeCheckable: true,
            // treeNodeFilterProp: 'title',
            filterTreeNode: (inputValue, treeNode) => {
                if ( treeNode.pinyin ) {
                    return treeNode.title.toLowerCase().indexOf(inputValue.toLowerCase()) >= 0 || treeNode.pinyin.toLowerCase().indexOf(inputValue.toLowerCase()) >= 0
                }
                return false
            },
            treeDefaultExpandAll: true,
            showCheckedStrategy: SHOW_PARENT,
            placeholder: '请选择城市',
            size: 'middle',
            className: 'common-tree-select',
        }
        // tProps.searchValue = '';
        tProps.onChange = (value, label, extra) => {
            this.setState({[type]: value});
        }
        return <TreeSelect {...tProps} />;
    }

    handleEvent(){
        this.setState({ testModelVisible: true})
    }

    handleTestCancel(){
        this.setState({ testModelVisible: false})
    }

    handleTestSave(){
        let hasError = false;
        if ( !this.state.foo ) {
            this.setState( { testFooValidate: {
                validateStatus: 'error',
                errorMsg: '必填'
            }});
            hasError = true;
        }

        if ( !this.state.bar ) {
            this.setState( { testBarValidate: {
                validateStatus: 'error',
                errorMsg: '必填'
            }});
            hasError = true;
        }
        if ( !hasError ) {
            this.setState({ testModelVisible: false})
        }

    }

    handleChange(){
        this.setState({
            testFooValidate: {
                validateStatus: 'success',
                errorMsg: ''
            },
            testBarValidate: {
                validateStatus: 'success',
                errorMsg: ''
            }
        })
    }

    callback(key) {
        console.log(key);
    }
    open(){
        let self=this
        AlertUp.open({
            alertTip: "创建上传任务",
            alertStatus: true,
            alertvisible: false,
            tableData: [],
            closeAlert: function(){
                console.log("关闭了...");
            },
            determineAlert: function(data){
                self.getupload('', data);
            },
            seeDetails: function(){
                console.log("触发查看详情方法")
            },
            // pollingStatus: this.pollingStatus.bind(this)
        });
    }
    getupload(status, data){
        let self=this;
        // 先判断是否有进行中
        if ( sessionStorage.getItem("sessionProcessing") != null ){
            // 如果有，先不进行接口轮询调用，循环调用方法
            // return setTimeout(self.getupload(status, data), 5000);
            return console.log("开始轮询中")
        } else {
            self.props.fetchGetUpload([1, 2, 3], (datas) => {
                let pollingData=datas;
                // 进行状态 计数
                let status, time=1, arr=[];
                for ( let i=0; i< pollingData.data.length; i++){
                    if (pollingData.data[i].state == '正在处理'){
                        sessionStorage.setItem('alertUpId'+ pollingData.data[i].reqId, pollingData.data[i].reqId);
                        sessionStorage.setItem('sessionProcessing', pollingData.data[i].reqId );
                        status = pollingData.data[i].state;
                        arr.push(pollingData.data[i].reqId)
                    } 
                }
                // 任务开始轮询
                let doProcsss=function(arr){
                    self.props.fetchGetUpload(arr, (datasa) => {
                        let PollStatus= datasa.data[sessionStorage.getItem('sessionProcessing' )-1].state;
                        for ( let i=0; i< pollingData.data.length; i++){
                            if (pollingData.data[i].state == '正在处理'){
                                sessionStorage.setItem('alertUpId'+ pollingData.data[i].reqId, pollingData.data[i].reqId);
                                sessionStorage.setItem('sessionProcessing', pollingData.data[i].reqId );
                                status = pollingData.data[i].state;
                                arr.push(pollingData.data[i].reqId)
                            }
                        }
                        if ( PollStatus == '正在处理' ) {
                            notification.warn('正在生成上传任务', '', 100);
                            setTimeout( doProcsss([...new Set(arr)]), 2000 )
                        } else if ( PollStatus==='处理完成' || PollStatus==='处理失败'){
                            arr=[];
                            setTimeout(() => {
                                if (PollStatus==='处理完成'){
                                    AlertUp.openquery()
                                } else if (PollStatus==='处理失败'){
                                    AlertUp.open({
                                        alertStatus: false,
                                        alertvisible: true,
                                        tableData: [    {
                                            key: '1',
                                            name: 'John Brown',
                                            age: 32,
                                        },
                                        {
                                            key: '2',
                                            name: 'Jim Green',
                                            age: 42,
                                        },
                                        {
                                            key: '3',
                                            name: 'Joe Black',
                                            age: 32,
                                        }],
                                    });
                                }
                            }, 2000 )     
                            // 停止定时及清除本次轮训id及进行中id
                            window.clearTimeout(doProcsss);
                            sessionStorage.removeItem('alertUpId'+sessionStorage.getItem('sessionProcessing'));
                            sessionStorage.removeItem('sessionProcessing');
                        } 
                    })
                    time++;
                    if ( time > 10){
                        arr=[];
                        console.log("请求次数太多")
                        window.clearTimeout(doProcsss);
                        sessionStorage.removeItem('alertUpId'+sessionStorage.getItem('sessionProcessing'));
                        sessionStorage.removeItem('sessionProcessing');
                    }
                }
                doProcsss(arr)
            })

        }
        
    } 
    onBlurSave(params){
        let { row, key } = params;
        if (util._isEmpty(row[key])) { row[key] = 0; }
        let { editTableData, editParams } = this.state;
        let newData = [ ...editTableData.list ];
        let index = newData.findIndex(item => row.id === item.id);
        let item = newData[index];
        newData.splice(index, 1, {
            ...item,
            ...row
        });

        // 传给后端的数据处理；

        let newEditParams = [ ...editParams ];
        let editRowIndex = newEditParams.findIndex(item => row.id === item.id);
        let editRowItem = newEditParams[index];
        if (editRowIndex<0){
            newEditParams.push(row);
        } else {
            newEditParams.splice(editRowIndex, 1, {
                ...editRowItem,
                ...row
            });
        }

        this.setState({
            editTableData: {
                ...editTableData,
                list: newData
            },
            editParams: newEditParams
        });
    }

    getColumn(){
        const sorterInfo = {};
        this.state.sorter.forEach((item, index) => item && (sorterInfo[item["field"]] = item["field"]) && (sorterInfo[item[["columnKey"]]] = item["order"]));
        const columns = [
            {
                title: '永远第一列',
                dataIndex: 'guQingDate',
                key: 'GUQINGDATE',
                sorter: {
                    multiple: 1
                },
                sortOrder: sorterInfo.guQingDate === "guQingDate" && sorterInfo.GUQINGDATE,
                // className: 'td-width-25',
                render: (text, record) => {
                    return <div>
                        {util.isEmpty(text)}
                    </div>
                },
            //
            },
            {
                title: '第二列',
                dataIndex: 'skuCode',
                key: 'SKUCODE',
                sorter: {
                    multiple: 2
                },
                isColEdit: true,
                sortOrder: sorterInfo.skuCode === "skuCode" &&  sorterInfo.SKUCODE,
                // className: 'td-width-25',
                component: <NumericInput
                    className="common-input"
                    style={{ width: '100% ' }}
                    isPositive={true}
                    precision={2}
                />
            },
            {
                title: '第三列',
                dataIndex: 'skuName',
                // className: 'td-width-25 td-left',
                render: (text, record) => {
                    return <div>
                        {util.isEmpty(text)}
                    </div>
                }
            },
            {
                title: '测试列',
                dataIndex: 'specs',
                // showSorterTooltip: false,
                sorter: {
                    multiple: 3
                },
                // sortOrder: this.state.queryObj.queryAction == 'reset' || sortObj.specs,
                // className: 'td-width-15',
                render: (text, record) => {
                    return <div>
                        {text}
                    </div>
                }
            },
            {
                title: '测试完了再加一列',
                dataIndex: 'materialCode',
                // showSorterTooltip: false,
                sorter: {
                    multiple: 4
                },
                // sortOrder: this.state.queryObj.queryAction == 'reset' || sortObj.materialCode,
                // className: 'td-width-30',
                render: (text, record) => {
                    return <div>
                        {util.isEmpty(text)}
                    </div>
                }
            },
            {
                title: '非常长的一列title',
                dataIndex: 'materialName',
                // className: 'td-width-30',
                render: (text, record) => {
                    return <div>
                        {util.isEmpty(text)}
                    </div>
                }
            }

        ];
        let editColumns = columns.map(col => {
            if (!col.isColEdit) {
                if (col.render) {
                    return col;
                } else {
                    col.render=(text, record) => (
                        <div className="text-ellipsis text-left" title={text}>
                            {util.isEmpty(text)}
                        </div>
                    );
                }
                return col;
            }
            return {
                ...col,
                onCell: record => ({
                    record,
                    isEdit: this.state.isTableEdit,
                    dataIndex: col.dataIndex,
                    title: col.title,
                    component: col.component,
                    onBlurSave: this.onBlurSave.bind(this)
                })
            };
        });
        return editColumns;
    }

    onSwitchChange = (e) => {
        this.setState({ isTableEdit: e })
    }

    render() {
        const { uploadList } = this.props.upload;
        uploadData=uploadList;
        const checkOptions = [
            { label: '是', value: '1' },
            { label: '否', value: '0' }
        ];
        const checkOptions1 = [
            { label: '是', value: '1' },
            { label: '否', value: '2' }
        ];
        const checkOptions2 = [
            { label: '是', value: '1' },
            { label: '否', value: '0' }
        ];
        let fields = new Map([
            ['code1',
                {
                    text: '物料号',
                    component: <Input defaultValue="1111" className="common-input" disabled />,

                }
            ],
            ['code',
                {
                    text: '单日期',
                    component: <DatePicker className={ "common-date" } />,

                }
            ],
            ['range',
                {
                    text: '范围日期',
                    component: <RangePicker className={ "common-range-date" }  />,
                }
            ],
            ['select',
                {
                    text: '单选',
                    component: <Select className={ "common-select"} defaultValue={''} >
                        <Option value="">全部</Option>
                        <Option value="1">选项1</Option>
                        <Option value="2">选项2</Option>
                    </Select>
                }
            ],
            ['multiSelect',
                {
                    text: '多选',
                    component: this.queryMultipleSelection(this.treeDataPineVal([]), 'multiSelect'),
                }
            ],
            ['name',
                {
                    text: '物料描述',
                    component: <Input className="common-input" />,

                }
            ],
            ['reflectionName',
                {
                    text: '映射物料',
                    component: <Input className="common-input" />,

                }
            ],
            ['confirmStates',
                {
                    text: '是否已确认',
                    component: <Checkbox.Group options={checkOptions2} />,

                }
            ],
            ['pGroupCodes',
                {
                    text: '是否可订货',
                    component: <Checkbox.Group options={checkOptions} />,

                }
            ],
            ['orderCodes',
                {
                    text: '是否下单物料',
                    component: <Checkbox.Group options={checkOptions1} />,

                }
            ]
        ]);


        return (
            <div className="content data-sellall">
                <div className="common-breadcrumb">
                    <button onClick = { this.open.bind(this)}>开启上传任务</button>
                    <DownloadCase />
                    <span>{intl.get('homepage.测试')}</span>
                    <span>
                        <div className="common-new"  onClick={this.handleEvent.bind(this)} >
                            <img src={iconCreation}/><span>样例弹窗</span>
                        </div>
                        <div style={{position: 'absolute', top: 0, right: 140}}>
                            <Switch checked={this.state.isTableEdit} onChange={this.onSwitchChange} />
                        </div>
                    </span>
                </div>

                <Tabs className="common-tabs" onChange={this.callback} type="card">
                    <TabPane tab="Tab 1" key="1" forceRender={true}>
                        <div className="common-container filling">
                            <QueryGroup
                                className="query-group upload-history"
                                query={this.state.queryObj}
                                callback={this.queryCallback}
                                fields={fields}
                                onRef={ ref => ( this.querygroup = ref ) }

                            />
                            <div className="table-wraper">
                                <SimpleTable
                                    id='DATA_ACTIVITY'
                                    className="common-table"
                                    query={this.state.queryObj}
                                    callback={this.queryCallback}
                                    columns={this.getColumn()}
                                    dataSource={this.state.editTableData.list}
                                    rowKey="id"
                                    components={{
                                        body: {
                                            cell: EditTableCell
                                        }
                                    }}
                                    // scroll={ { y: this.state.tableScrollY } }
                                    pagination={{
                                        size: 'small',
                                        current: this.state.editTableData.pageNum,
                                        pageSizeOptions: [ '10', '20', '50', '100' ],
                                        pageSize: this.state.editTableData.pageSize,
                                        total: this.state.editTableData.total,
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
                        </div>
                    </TabPane>
                    <TabPane tab="Tab 2" key="2">
                      Content of Tab Pane 2
                    </TabPane>
                    <TabPane tab="Tab 3" key="3">
                      Content of Tab Pane 3
                    </TabPane>
                </Tabs>
                <Modal title={<span className={'modal-title-text'}>样例弹窗</span>}
                    className="common-alert"
                    maskClosable={false}
                    destroyOnClose={true}
                    width={400}
                    onCancel={this.handleTestCancel.bind(this)}
                    visible={this.state.testModelVisible}
                    centered
                    footer={
                        <div>
                            <Button className='common-btn-white-lg' onClick={this.handleTestCancel.bind(this)}>取消</Button>
                            <Button className="common-btn-blue-lg" onClick={this.handleTestSave.bind(this)}>确认</Button>
                        </div>
                    } >
                    <Form>
                        <Row>
                            <Form.Item
                                className={''}
                                label="标签1："
                                validateStatus={this.state.testBarValidate.validateStatus}
                                help={this.state.testBarValidate.errorMsg } >
                                <Input className='common-input' value={this.state.foo} onChange={this.handleChange.bind(this)} />
                            </Form.Item>
                        </Row>
                        <Row>
                            <Form.Item
                                className={''}
                                label="标签2："
                                validateStatus={this.state.testFooValidate.validateStatus}
                                help={this.state.testFooValidate.errorMsg } >
                                <Input className='common-input' value={this.state.bar} onChange={this.handleChange.bind(this)} />
                            </Form.Item>
                        </Row>
                    </Form>
                </Modal>


            </div>
        );
    }
    shouldComponentUpdate(nextProps, nextState) {
        if (!util.isEqual(this.props, nextProps) || !util.isEqual(this.state, nextState)) {
            return true;
        } else {
            return false;
        }
    }
};

var mapStateToProps = state => ({
    activity: state.activityReducer,
    upload: state.UploadReducer
});

const mapDispatchToProps = dispatch => bindActionCreators({...activityActions, ...uploadActions}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(uploadHistory);