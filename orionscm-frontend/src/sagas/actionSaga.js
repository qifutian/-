import { call, takeEvery } from 'redux-saga/effects';
import { sagaApi } from 'common/sagaApi';

export function *watchOrionScmActions() {
    yield takeEvery('WATCH_ORIONSCM_SAGAS', function *(action) {
        let response = yield call(sagaApi, action);
        if (response && `${response.code}` == 0) {
            action.successCallback && action.successCallback(response);
        } else {
            action.failCallback && action.failCallback();
        }
    });
}