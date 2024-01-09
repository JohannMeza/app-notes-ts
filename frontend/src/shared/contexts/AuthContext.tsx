import { FC, PropsWithChildren, createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { APP_TOKEN, APP_URL } from '../constants/EnvConstants';
import axios from 'axios';

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

export const AuthContext = createContext<AuthContextType>({
  state: {
    isAuthenticated: false,
    user: { id: '', username: '' }
  },
  action: {
    login: () => {},
    logout: () => {},
    setUser: () => {},
    access: () => {},
  }
});

export const AuthContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem(APP_TOKEN) ? true : false);
  const [user, setUser] = useState({ id: '', username: '' });
  
  const access = async (): Promise<void> => { 
    const headers = { 
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `${localStorage.getItem(APP_TOKEN)}`
      } 
    };

    try {
      const response = await axios.post(`${APP_URL}/user/access`, {}, headers);
      setIsAuthenticated(true);
      setUser(response.data);
    } catch (error) {
      setIsAuthenticated(false);
      setUser({ id: '', username: '' });
      localStorage.removeItem(APP_TOKEN);
    }
  };

  const logout = (): void => {
    localStorage.removeItem(APP_TOKEN);
    setIsAuthenticated(false);
    setUser({ id: '', username: '' });
  };

  const login = useCallback((token: string) => {
    localStorage.setItem(APP_TOKEN, token);
    setIsAuthenticated(true);
  }, []);

  const value = useMemo(() => ({
    state: {
      isAuthenticated,
      user,
    },
    action: {
      login,
      logout,
      setUser,
      access,
    }
  }), [isAuthenticated, login, user]);

  useEffect(() => { 
    if (isAuthenticated) access();
  }, [isAuthenticated]);
  
  return <AuthContext.Provider value={value} children={children} />;
};