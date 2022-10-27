import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Main } from '../pages';

export const Routers: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Main />} />
    </Routes>
  </BrowserRouter>
);

export default Routers;
