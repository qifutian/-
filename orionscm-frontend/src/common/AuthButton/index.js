// 按钮编辑组件
import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import { util } from 'common/util';
import './index.less';

// 例子：src\containers\SystemConfigure\OrderFulfillmentConfigur\component\DemandPriority.js
// code 为空时不做验证
// typt: 'text'||'btn'(默认)
// text例：
// [{ name: 'name', func: Callback, disabled: false, code: '' }]
// <AuthButton type="text" btnList={[{ name: 'name', func: ()=>this.Callback(data), disabled: false, code: 'authButtonCode' }]}
// btn例：
// [{ name: 'name', func: 'callback', className: 'parentClassName', disabled: 'true || false', code: 'authButtonCode'}]
// <AuthButton btnList={[{ name: 'name', func: () => this.btnCallBack({type: 'upload', tag: 'st'}), className:'common-btn-white-sm', disabled: false, code: 'authButtonCode'}]} />

const AuthButton = ({ ...props }) => {
    const [authBtns, SetAuthBtns] = useState([]);
    useEffect(() => {
        let auth = util.empty(util.getCookieObj('authorities', true));
        let btns = auth.filter(ele => ele.type === 'btn');
        SetAuthBtns(btns);
    }, [])
    const verificAuth = ele => {
        if (ele.code) {
            return !authBtns.filter(item => item.authority === ele.code).length;
        } else {
            return false
        }
    }
    if (props.type === 'text') {
        // 表格内权限字段
        return (
            <div className="nuth-jurisdic-edit-text">
                {
                    props.btnList && props.btnList.map(ele => <span key={ele.name}
                        className={`${ele.disabled || verificAuth(ele) ? 'common-btn-disabled-sm' : 'common-btn-enable-sm'} common-link`}
                        onClick={ ele.disabled || verificAuth(ele) ? null : () => ele.func ? ele.func() : null  }
                    >
                        {ele.name}
                    </span>)
                }
            </div>
        )
    } else {
        // 普通按钮权限
        return (
            <div className="nuth-jurisdic-edit-btn">
                {
                    props.btnList && props.btnList.map(ele => <Button
                        className={ele.className ? ele.className : ''}
                        onClick={() => ele.func ? ele.func() : null}
                        key={ele.name}
                        disabled={ele.disabled || verificAuth(ele)}>
                        {ele.name}
                    </Button>)
                }
            </div>
        )
    }
}
export default AuthButton;