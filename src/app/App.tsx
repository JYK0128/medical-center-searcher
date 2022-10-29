import React from 'react';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { HelmetProvider } from 'react-helmet-async';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PersistGate } from 'redux-persist/integration/react';
import { Routers } from './routers';
import { store } from './data/stores';
import 'normalize.css';

const persistor = persistStore(store);
const queryClient = new QueryClient();
const helmetContext = {};

export const App: React.FC = () => {
  const redux = () => (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <HelmetProvider context={helmetContext}>
          <Routers />
        </HelmetProvider>
      </PersistGate>
    </Provider>
  );

  const reactQuery = () => (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider context={helmetContext}>
        <Routers />
        <ReactQueryDevtools initialIsOpen={false} />
      </HelmetProvider>
    </QueryClientProvider>
  );

  return reactQuery();
};
