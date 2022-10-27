import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer } from 'redux-persist';
import storage from 'redux-persist-indexeddb-storage';
import { hospitalSearchApi } from '../api/hospitalAPI';

const reducers = combineReducers({
  [hospitalSearchApi.reducerPath]: hospitalSearchApi.reducer
});

const persistedReducer = persistReducer(
  {
    key: 'root',
    storage: storage('myDB'),
    blacklist: ['hospital']
  },
  reducers
);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => {
    // setting for thunk(immutable, serializable...)
    const middleware = getDefaultMiddleware({
      serializableCheck: { ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER] }
    });

    // Adding the api middleware features(caching, invalidation, polling, etc.)
    middleware.push(hospitalSearchApi.middleware);

    // setting when dev mode
    if (process.env.REACT_APP_MODE === `development`) {
      // eslint-disable-next-line global-require, @typescript-eslint/no-var-requires
      const { logger } = require(`redux-logger`);
      middleware.push(logger);
    }
    return middleware;
  },
  // enable redux-devtools
  devTools: process.env.REACT_APP_MODE === 'development'
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch<AppDispatch>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
