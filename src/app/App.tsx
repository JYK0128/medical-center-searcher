import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Routers } from './routers';
import 'normalize.css';

const queryClient = new QueryClient();
const helmetContext = {}; // TODO: change SEO

export const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider context={helmetContext}>
        <Routers />
        <ReactQueryDevtools initialIsOpen={false} />
      </HelmetProvider>
    </QueryClientProvider>
  );
};
