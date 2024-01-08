import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

interface AuthContextType<T> {
  state: {
    isAuthenticated: boolean
    user: T | object
  }
  
  action: {
    login: (token: string) => void
    setUser: (user: T | object) => void
    logout: () => void
    access: () => void;
  }
}

export const useAuthContext = <T extends object>(): AuthContextType<T> => useContext(AuthContext);