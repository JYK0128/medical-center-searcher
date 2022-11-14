import React from 'react';
import { Screen } from 'app/components/Screen';
import { useParams } from 'react-router-dom';
import { ReservationPage } from 'app/features/Reservation/ReservationPage';

export const ReservationScreen: React.FC = () => {
  const params = useParams();
  const { hmcNm } = params;

  return <Screen title="병원">{hmcNm && <ReservationPage hmcNm={hmcNm} />}</Screen>;
};
