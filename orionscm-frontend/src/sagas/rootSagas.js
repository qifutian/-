import { call, all, fork, spawn } from 'redux-saga/effects';

// 获取当前目录下的所有文件
const context = require.context("./", true, /.Saga.js$/);

// 分解获取的文件值
const keys = context.keys().filter(item => item !== "./rootSaga.js");

let sagas = [];

for (let i = 0; i < keys.length; i++) {
    const exp = context(keys[i]);
    for (let fn in exp) {
	    sagas.push(exp[fn]);
    }
}

export default function *rootSagas() {
    yield all(sagas.map(saga => spawn(function *() {
        while (true) {
            try {
                yield call(saga);
                break;
            } catch (e) {
                console.log(e);
            }
        }
	    })
    ));
}