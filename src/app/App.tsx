import React from 'react';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { HelmetProvider } from 'react-helmet-async';
import { Routers } from './routers';
import { store } from './data/stores';
import 'normalize.css';

const persistor = persistStore(store);
const helmetContext = {};

export const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <HelmetProvider context={helmetContext}>
          <Routers />
        </HelmetProvider>
      </PersistGate>
    </Provider>
  );
};
