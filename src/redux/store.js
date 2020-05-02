import { createStore, applyMiddleware } from 'redux';
import rootReducer from './root-reducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore } from 'redux-persist';

const middlewares = [];

export const store = createStore( rootReducer,
                           composeWithDevTools(
                               applyMiddleware(...middlewares)
                           )
                         );

export const persistor = persistStore(store);