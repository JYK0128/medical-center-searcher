import React from 'react';
import { Screen } from 'app/components/Screen';
import MainPage from 'app/features/Main/MainPage';

interface MainScreenProps {}

export const MainScreen: React.FC<MainScreenProps> = () => {
  return (
    <Screen title="메인">
      <MainPage />
    </Screen>
  );
};
