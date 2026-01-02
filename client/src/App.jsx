import { useState } from 'react';
import { LoginPage } from './components/authentication/LoginPage';
import { RegistrationPage } from './components/authentication/RegistrationPage';
import { Sidebar } from './components/mainContent/Sidebar';
import { DashboardContent } from './components/mainContent/Dashboard';

export default function LMSApp() {
  const [currentPage, setCurrentPage] = useState('login');
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  const handleAuth = (userData) => {
    setUser(userData);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('login');
  };

  if (currentPage === 'register') {
    return <RegistrationPage onNavigate={setCurrentPage} onRegister={handleAuth} />;
  }

  if (currentPage === 'login') {
    return <LoginPage onNavigate={setCurrentPage} onLogin={handleAuth} />;
  }

  if (currentPage === 'dashboard' && user) {
    return (
      <>
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} onLogout={handleLogout} />
        <DashboardContent user={user} />
      </>
    );
  }

  return null;
}