import { createStore, applyMiddleware } from 'redux';
import { rootReducers } from 'reducers/rootReducers';

import createSagaMiddleware from 'redux-saga';
import rootSagas from './sagas/rootSagas';

const saga = createSagaMiddleware();
const middlewares = [ saga ];

export function configureStore(initialState) {
    const store = createStore(rootReducers, initialState, applyMiddleware(...middlewares));
    return store;
};

export let store = configureStore();
saga.run(rootSagas);