import Immutable from 'seamless-immutable';

export function showMessage(content = '服务异常,请稍后再试!', type = 'success', successCallback, failCallback) {
    return {
        type: 'SHOW_MESSAGE',
        message: {
            content,
            type
        },
        successCallback,
        failCallback
    };
}

export function resetMessage() {
    return {
        type: 'RESET_MESSAGE'
    };
}

export function notifyReducer(state = { message: { content: '', type: '', successCallback: {}, failCallback: {} } }, action) {
    switch (action.type) {
        case 'SHOW_MESSAGE':
            state = Immutable.setIn(state, [ 'successCallback' ], action.successCallback);
            state = Immutable.setIn(state, [ 'failCallback' ], action.failCallback);
            return Immutable.setIn(state, [ 'message' ], action.message);
        case 'RESET_MESSAGE':
            return Immutable.set(state, 'message', {
                content: '',
                type: ''
            });
        default:
            return state;
    }
}
