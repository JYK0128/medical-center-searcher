import React from 'react';
import { Screen } from 'app/components/Screen';
import MainPage from 'app/features/Main/MainPage';

export const Main: React.FC = () => {
  return (
    <Screen title="메인">
      <MainPage />
    </Screen>
  );
};
