import React from 'react';
import { Screen } from 'app/components/Screen';
import { HospitalPage } from 'app/features/Hospital/HospitalPage';
import { useParams } from 'react-router-dom';

export const HospitalScreen: React.FC = () => {
  const params = useParams();
  const { hmcNm } = params;

  return <Screen title="병원">{hmcNm && <HospitalPage hmcNm={hmcNm} />}</Screen>;
};
