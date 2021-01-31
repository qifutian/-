import Immutable from 'seamless-immutable';
import { util } from 'common/util'
import _ from "lodash";
export function requestStart() {
    return {
        type: 'REQUEST_START'
    };
}

export function requestEnd() {
    return {
        type: 'REQUEST_END'
    };
}

export function requestAddTabs( params ) {
    return {
        type: 'REQUEST_ADD_TABS',
        params
    };
}

export function requestRemoveTabs( params ) {
    return {
        type: 'REQUEST_REMOVE_TABS',
        params
    };
}

export function fetchingReducer(state = { fetching: false }, action) {
    switch (action.type) {
        case 'REQUEST_START':
            return Immutable.set(state, 'fetching', true);
        case 'REQUEST_END':
            return Immutable.set(state, 'fetching', false);
        case 'REQUEST_ADD_TABS':
            let openTabs = _.isEmpty(util.getSessionObj('openTabs')) ? [] : util.getSessionObj('openTabs');
            return Immutable.set(state, 'activeKey', action.params.key );
        case 'REQUEST_REMOVE_TABS':
            return Immutable.set(state, 'removeKey', action.params );
        default:
            return state;
    }
}
