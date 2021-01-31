import { combineReducers } from 'redux';

// 获取当前目录下的所有.js文件
const context = require.context('./', true, /\.js$/);
// => ["./commonReducer/index.js", "./headReducer/index.js" ...]
const files = context.keys();
// 分解获取的文件值 过滤掉rootReducer.js
const keys = files.filter(item => item !== "./rootReducers.js");
let rootRdcObj = {};
for (let i = 0; i < keys.length; i++) {
    const exp = context(keys[i]);
    for (let fn in exp) {
        // 找到文件中的Reducer
        if (fn.indexOf("Reducer")>0) {
            rootRdcObj[fn] = exp[fn];
        }
    }
}

export const rootReducers = combineReducers(rootRdcObj);