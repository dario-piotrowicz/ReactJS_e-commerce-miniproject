import { createStore, applyMiddleware } from 'redux';
import rootReducer from './root-reducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import { requestShopDataUpdatesFromFirestore } from './shop/shop.sagas';

const sagaMiddleware = createSagaMiddleware();
const middlewares = [ thunk, sagaMiddleware ];

export const store = createStore( rootReducer,
                           composeWithDevTools(
                               applyMiddleware(...middlewares)
                           )
                         );

sagaMiddleware.run(requestShopDataUpdatesFromFirestore);

export const persistor = persistStore(store);