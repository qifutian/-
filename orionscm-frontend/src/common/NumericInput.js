import React, { Component } from 'react';
import { Input } from 'antd';

export class NumericInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.value
        }
    }

    componentWillReceiveProps(nextProps){
        if ( this.props.value != nextProps.value ){
            this.setState({value: nextProps.value})
        }
    }

  onChange = (e) => {
      let value = e.target ? e.target.value : e
      let reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;
      let tested = false
      if ( this.props.isPositiveInteger ){
          reg = /^([1-9][0-9]*)$/;
          if ( reg.test(value) ) { tested = true }
      } else if ( this.props.isPositive && this.props.isInteger ){
          reg = /^([0-9][0-9]*)$/;
          if ( reg.test(value) ) { tested = true }
      } else if ( this.props.isInteger ){
          reg = /^-?([1-9][0-9]*)$/;
          if ( reg.test(_.toNumber(value)) ) { tested = true }
      } else if ( this.props.isPositive ){
          if (this.props.precision){
              reg = new RegExp('^(0|[1-9][0-9]*)(\\.[0-9]{0,'+this.props.precision+'})?$', "g");
              if ( reg.test(value) ){
                  tested = true
              } else {
                  value = value === '' ? '' : _.floor(_.toNumber(value), this.props.precision)
                  tested = true
              }
          } else {
              reg = /^(0|[1-9][0-9]*)(\.[0-9]*)?$/;
              if ( reg.test(_.toNumber(value)) ) { tested = true }
          }
      }
      if ((!Number.isNaN(value) && tested ) || value === '' || ( !this.props.isPositive && value === '-' ) ) {
      // let number = value.charAt(1) === '.' || value.charAt(0) == '' ? value : _.toNumber(value)
          this.setState({ value })
          this.props.onChange(value, 'change');
      }
  }

  // '.' at the end or only '-' in the input box.
  onBlur = () => {
      const { value, onBlur, onChange, isPositiveInteger } = this.props;
      // if (value.charAt(value.length - 1) === '.' || value === '-') {
      if (isPositiveInteger){
          onChange(value, 'blur');
      } else {
          this.setState({ value: _.toNumber(value) })
          onChange(_.toNumber(value), 'blur');
      }
      // }
      if (onBlur) {
          onBlur();
      }
  }

  onKeyDown = (e) => {
      const { value, onBlur, onChange, onKeyDown } = this.props;
      if ( e.keyCode == 13 ){
          onChange(_.toNumber(value), 'enter');
      }
      // ArrowUp      ArrowDown
      if ( e.keyCode == 38 || e.keyCode == 40 ){
          onKeyDown && onKeyDown(e)
      } else if (onKeyDown) {
          onKeyDown();
      }

      let isNumber = (e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 96 && e.keyCode <= 105)
      if ( onKeyDown && ( isNumber || e.keyCode == 8 ) ) {
          onKeyDown(e, 'number_key_down')
      }
  }

  onInput = (e) => {
      let reg = /^(0|[1-9][0-9]*)(\.[0-9]*)?$/
      if ( this.props.onInput && e.target && reg.test(e.target.value) ){
          this.props.onInput(e, 'number_key_down')
      }
  }

  render() {
      const { isInteger, isPositive, isPositiveInteger, ...rest } = this.props;
      return (
          <Input
              {...rest}
              value={this.state.value}
              onBlur={this.onBlur}
              onKeyDown={this.onKeyDown}
              onChange={this.onChange}
              onInput={this.onInput}
          />
      );
  }
}