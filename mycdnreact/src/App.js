// src/App.js
import React, { useState } from 'react';
import { UserProvider } from './contexts/UserContext';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import Dashboard from './pages/Dashboard'; // Değiştirilen isim
import { KotaProvider } from './contexts/KotaContext';
import { DosyaProvider } from './contexts/DosyaContext';

const App = () => {
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    // Kullanıcı bilgilerini ayarla
    setUser(userData);
  };

  const handleLogout = () => {
 
    setUser(null);
  };

  return (
    <KotaProvider>
      <UserProvider value={{ user, handleLogin, handleLogout }}>
        <DosyaProvider>
          <div className="App">
            <header className="App-header">
              {user && user.role === 'admin' ? (
                <AdminDashboard onLogout={handleLogout} />
              ) : user && user.role === 'user' ? (
                <Dashboard onLogout={handleLogout} />
              ) : (
                <Login onLogin={handleLogin} />
              )}
            </header>
          </div>
        </DosyaProvider>
      </UserProvider>
    </KotaProvider>
  );
};

export default App;
