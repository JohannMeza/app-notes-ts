import { FC, ReactNode } from 'react';
import { Route, Routes } from 'react-router-dom';

export const PublicRoute: FC<{ path: string, element: ReactNode }> = (props) => (
  <Routes>
    <Route {...props} />
  </Routes>
);