import React, { Component } from 'react';
import Cookie from 'js-cookie';

export class NotFound extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const containerStyle={
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column'
        };
        const titleStyle={
            fontSize: 88,
            lineHeight: 1,
            color: '#4F5058',
            marginBottom: 12
        };
        const descStyle = {
            fontSize: 18,
            color: '#4F5058'
        };
        return (
            Cookie.get( 'token' ) ? <div style={containerStyle}><div style={titleStyle}>404</div><div style={descStyle}>抱歉，您访问的页面不存在</div></div> : null
        );
    }
}