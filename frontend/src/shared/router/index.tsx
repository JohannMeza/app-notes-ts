import { LoginView } from '@src/modules/auth/login/LoginView';
import { RegisterView } from '@src/modules/auth/register/RegisterView';
import { DashboardView } from '@src/modules/dashboard/DashboardView';
import { FC, PropsWithChildren } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';

export const IndexRouter: FC<PropsWithChildren> = () => (
  <Router>
    <Routes>
      <Route path='/' element={<LoginView />} />
      <Route path='/login' element={<PublicRoute path="/" element={<LoginView />} />} />
      <Route path='/logout' element={<PublicRoute path="/" element={<LoginView />} />} />
      <Route path='/register' element={<PublicRoute path="/" element={<RegisterView />} />} />
      <Route path='/dashboard/*' element={<PrivateRoute path="*" element={<DashboardView />} />} />
    </Routes>  
  </Router>
);