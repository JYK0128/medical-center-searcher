import { ReservationScreen } from 'app/pages/Reservation';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MainScreen } from '../pages';
import { HospitalScreen } from '../pages/Hospital';

export const Routers: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route index element={<MainScreen />} />
      <Route path="hospital/:hmcNm" element={<HospitalScreen />} />
      <Route path="reservation/:hmcNm" element={<ReservationScreen />} />
    </Routes>
  </BrowserRouter>
);

export default Routers;
