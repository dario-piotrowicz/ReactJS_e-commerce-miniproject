import { createStore, applyMiddleware } from 'redux';
import rootReducer from './root-reducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './root-saga';

const sagaMiddleware = createSagaMiddleware();
const middlewares = [ sagaMiddleware ];

export const store = createStore( rootReducer,
                           composeWithDevTools(
                               applyMiddleware(...middlewares)
                           )
                         );

sagaMiddleware.run(rootSaga);