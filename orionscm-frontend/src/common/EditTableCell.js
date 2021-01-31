import React, { Component } from 'react';
import { Form } from 'antd';
import moment from 'moment';

export default class EditTableCell extends Component {
    constructor(props){
        super(props);
        const { dataIndex, record } = props;
        let values = null;
        if (dataIndex){
            values = { [dataIndex]: record[dataIndex] };
        }
        this.state = {
            ...values
        };
    }
    componentDidUpdate(prevProps, preState){
        const { dataIndex, record } = this.props;
        let values = null;
        if (dataIndex){
            if (prevProps.record && record[dataIndex] != prevProps.record[dataIndex]){
                values = { [dataIndex]: record[dataIndex] };
                this.setState({ ...values });
            }
        }
    }

    renderComponent(key, component){
        const { record } = this.props;
        if (component.key == 'DatePicker'){
            return React.cloneElement( component, {
                onChange: this.onCloneChange.bind(this, key),
                className: key + (component.props.className ? ' ' + component.props.className : '' ),
                value: this.state[key]?moment(this.state[key]):null,
                record: record
            });
        } else if (component.key == 'Switch'){
            return React.cloneElement( component, {
                onChange: this.onCloneChange.bind(this, key),
                className: key + (component.props.className ? ' ' + component.props.className : '' ),
                checked: this.state[key]?true:false,
                record: record
            });
        } else if (component.props.children){
            return React.cloneElement(component, {
                // for select customization
                onSelect: component.props.onSelect,
                onChange: this.onCloneChange.bind(this, key),
                onBlur: this.onCloneBlur.bind(this, key),
                // onPressEnter: this.onCloneBlur.bind(this, key),
                className: key + (component.props.className ? ' ' + component.props.className : '' ),
                value: this.state[key],
                record: record
            });
        } else {
            return React.cloneElement( component, {
                onChange: this.onCloneChange.bind(this, key),
                onBlur: this.onCloneBlur.bind(this, key),
                onPressEnter: this.onCloneBlur.bind(this, key),
                className: key + (component.props.className ? ' ' + component.props.className : '' ),
                value: this.state[key],
                record: record
            });
        }
    }
    onCloneBlur(key, e){
        const { record, onBlurSave } = this.props;
        let values = { [key]: this.state[key] };
        if (record[key] != values[key]) {
            if (record[`${key}ValidateStatus`]){
                delete record[`${key}ValidateStatus`];
            }
            let params = {
                row: { ...record, ...values },
                key
            };
            onBlurSave(params);
        }
    }
    onCloneChange( key, e, datePickerValue ){
        const { record, onBlurSave, component } = this.props;
        if (component.key == 'DatePicker'){
            this.setState({
                [key]: datePickerValue
            });
            let values = { [key]: datePickerValue };
            let params = {
                row: { ...record, ...values },
                values
            };
            onBlurSave(params);
        } else if (e === true || e === false){
            let values = { [key]: e?1:0 };
            let params = {
                row: { ...record, ...values },
                values
            };
            onBlurSave(params);
        } else if ( e && e.target ){
            this.setState({
                [key]: e.target.value
            });
        } else {
            this.setState({
                [key]: e
            });
        }
    }

    renderCell = () => {
        const { dataIndex, record, component } = this.props;
        let validateStatus = record[`${dataIndex}ValidateStatus`] ? record[`${dataIndex}ValidateStatus`] : 'success';
        return (
            <Form.Item style={{ margin: 0 }}
                validateStatus={validateStatus}
                help={null}
            >
                {this.renderComponent(dataIndex, component)}
            </Form.Item>
        );
    };

    render() {
        const { isEdit, children, dataIndex, record, component, onBlurSave, ...restProps } = this.props;
        let title = dataIndex ? record[dataIndex] : null;
        return (
            <td {...restProps} title={title}>
                { isEdit ? this.renderCell() : children }
            </td>
        );
    }
}
