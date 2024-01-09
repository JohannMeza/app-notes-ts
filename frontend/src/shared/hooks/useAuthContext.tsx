import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

interface UserProps {
  id: string,
  username: string
}

interface AuthContextType {
  state: {
    isAuthenticated: boolean
    user: UserProps
  }
  
  action: {
    login: (token: string) => void
    setUser: (user: UserProps) => void
    logout: () => void
    access: () => void;
  }
}

export const useAuthContext = (): AuthContextType => useContext(AuthContext);