import React, { PureComponent } from 'react'
import { Button, Col, Row } from 'antd';
import './index.less'
import _ from "lodash";

export default class FieldGroup extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {};
        for (var [key, map] of this.props.fields) {
            if (!map.component.props.isIgnored) {
                this.state[key] = this.getDefaultValue(map.component.props);
            }
        }
    }

    componentDidMount() {
        this.props.onRef && this.props.onRef(this)
    }

    componentWillUnmount() {
        this.props.onRef && this.props.onRef(null)
    }

    renderRows(){
        return (
            <div className="query-row">
                {this.renderCols()}
                <div className="query-block btn" >
                    <Button className="confirm" onClick={this.doSearch.bind(this)} >查询</Button>
                    <Button className="reset" onClick={this.doReset.bind(this)}>重置</Button>
                </div>
            </div>
        );
    }

    renderCols = () => {
        const self = this;
        let cols =[];

        for (var [key, map] of this.props.fields) {
            cols.push(<div key={key} className="query-block">
                <span className="common-label">{map.text}</span> <span className="component">{self.renderComponent(key, map)} {map.afterComponent ? <span className="after">{map.afterComponent}</span> : null}</span>
            </div>);
        }

        return (cols);
    }

    renderComponent(key, obj){
        const _this = this;
        if (obj.component.props.children) {
            return React.cloneElement( obj.component, {
                // for select customization
                onSelect: obj.component.props.onSelect,
                onChange: this.onCloneChange.bind(this, key, obj),
                className: key + (obj.component.props.className ? ' ' + obj.component.props.className : '' ),
                value: this.state[key]
            });
        } else if ( obj.component.props.className && obj.component.props.className.indexOf( 'common-input' ) > -1 ){
            return React.cloneElement( obj.component, {
                onChange: this.onCloneChange.bind(this, key, obj),
                onKeyDown: this.onCloneChange.bind(this, key, obj),
                className: key + (obj.component.props.className ? ' ' + obj.component.props.className : '' ),
                value: this.state[key]
            });
        } else {
            return React.cloneElement( obj.component, {
                onChange: this.onCloneChange.bind(this, key, obj),
                className: key + (obj.component.props.className ? ' ' + obj.component.props.className : '' ),
                value: this.state[key]
            });
        }
    }

    onCloneChange( key, obj, e, datePickerValue ){
        if ( e && e.keyCode == 13 ) {
            this.props.callback( { queryData: { ...this.state, queryAction: 'search' } } )
        } else if ( e && e.target ) {
            this.setState({ [key]: e.target.value });
        } else {
            this.setState(obj.setExtraValue ? { [key]: e, [obj.setExtraValue.key]: obj.setExtraValue.value }: { [key]: e  })
        }
        if (obj.needCheckSearch) {
            let queryData = Object.assign({ ...this.state, queryAction: 'search' }, {[key]: e})
            this.props.callback( { queryData: queryData} )
        }
    }

    getDefaultValue( props, needClearDefault = false ){
        if ( typeof props.defaultPickerValue !== 'undefined' ) {
            return props.defaultPickerValue;
        } else if ( typeof props.defaultValue !== 'undefined' && needClearDefault ) {
            return [];
        } else if ( typeof props.defaultValue !== 'undefined' ) {
            return props.defaultValue;
        } else if ( typeof props.options !== 'undefined' ) {
            return [];
        } else if ( typeof props.children !== 'undefined' ) {
            return [];
        } else {
            return '';
        }
    }
    // 更新为state值
    doUpdate(){
        let obj = {}
        for (var [key, map] of this.props.fields) {
            this.setState({ [key]: this.getDefaultValue( map.component.props ) })
        }
    }


    // 更新为state值但不清空
    doUpdateSearch(){
        let obj = {}
        for (var [key, map] of this.props.fields) {
            obj[key] = this.getDefaultValue( map.component.props );
            this.setState({ [key]: this.getDefaultValue( map.component.props )  })
        }
        this.props.callback( { queryData: {...obj, queryAction: 'search' } } )
    }

    // 调用查询按钮
    doSearch(){
        this.props.callback( { queryData: { ...this.props.query, ...this.state, pageNum: 1, queryAction: 'search' } } )
    }

    // 如果带clear则清空
    doReset(){
        let obj = {}
        for (var [key, map] of this.props.fields) {
            obj[key] = this.getDefaultValue( map.component.props, map.needClearDefault );
            this.setState({ [key]: this.getDefaultValue( map.component.props, map.needClearDefault )  })
        }
        this.props.callback( { queryData: {...obj, queryAction: 'reset' }, sort: [], filter: null } )
    }

    render() {
        return (<div className={this.props.className}>{this.renderRows()}</div>);
    }
}
