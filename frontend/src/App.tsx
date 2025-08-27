import React, { useEffect, useState } from 'react';
import AuthPage from './pages/AuthPage';
import Dashboard from './pages/Dashboard';
import api from './api/client';

export default function App() {
  const [token, setToken] = useState<string | null>(localStorage.getItem('tb_token'));
  const [user, setUser] = useState<any>(localStorage.getItem('tb_user') ? JSON.parse(localStorage.getItem('tb_user')!) : null);

  useEffect(() => {
    if (token) {
      localStorage.setItem('tb_token', token);
    } else {
      localStorage.removeItem('tb_token');
    }
  }, [token]);

  useEffect(() => {
    if (user) localStorage.setItem('tb_user', JSON.stringify(user));
    else localStorage.removeItem('tb_user');
  }, [user]);

  const onLogin = (token: string, user: any) => {
    setToken(token);
    setUser(user);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
  };

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', padding: 20 }}>
      {!token ? (
        <AuthPage onLogin={onLogin} />
      ) : (
        <Dashboard user={user} onLogout={logout} refreshUser={(u: any) => setUser(u)} />
      )}
    </div>
  );
}
