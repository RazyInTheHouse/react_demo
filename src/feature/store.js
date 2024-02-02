import { configureStore } from '@reduxjs/toolkit'
import rootReducer from '../redux/rootReducer'
import { 
  persistStore, 
  persistReducer,
 } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { thunk } from 'redux-thunk'

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: () => {
     return [thunk]
  }
});

export const persistor = persistStore(store);