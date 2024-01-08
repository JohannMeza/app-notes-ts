import { FC, ReactNode, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';

export const PrivateRoute: FC<{ path: string, element: ReactNode }> = (props) => {
  const { state } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!state.isAuthenticated) navigate('/');
  }, [state.isAuthenticated, navigate]);

  return (
    <Routes>
      <Route {...props} />
    </Routes>
  );
};