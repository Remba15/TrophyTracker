import { createContext, useEffect, useState } from 'react';
import { logInService } from '../services/AuthService';
import { useNavigate } from 'react-router-dom';
import { RouteNames } from '../constants';
import useLoading from '../hooks/useLoading';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authToken, setAuthToken] = useState('');
  const { showLoading, hideLoading } = useLoading();

  const navigate = useNavigate();

  // useEffect hook na ovaj način koristimo da prilikom prve inicijalizacije
  // provjerimo postoji li bearer token u local storageu i ako postoji ,
  // automatski ulogiramo korisnika. Također ako bearer token ne postoji ,
  // u else dijelu štitimo aplikaciju tako da korisnik ne može pristupiti zaštićenim rutama
  useEffect(() => {
    const token = localStorage.getItem('Bearer');

    if (token) {
      setAuthToken(token);
      setIsLoggedIn(true);
    } else {
      navigate(RouteNames.HOME);
    }
  }, []);

  async function login(userData) {
    showLoading();
    const response = await logInService(userData);
    hideLoading();
    if (!response.error) {
      localStorage.setItem('Bearer', response.message);
      setAuthToken(response.message);
      setIsLoggedIn(true);
      navigate(RouteNames.GAMES_VIEW);
    } else {
      showError(response.message);
      localStorage.setItem('Bearer', '');
      setAuthToken('');
      setIsLoggedIn(false);
    }
  }

  function logout() {
    localStorage.setItem('Bearer', '');
    setAuthToken('');
    setIsLoggedIn(false);
    navigate(RouteNames.HOME);
  }

  const value = {
    isLoggedIn,
    authToken,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}