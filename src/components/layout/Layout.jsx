import React from 'react';
import { LogOut } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '../ui';
import { useAuthContext } from '../../context/AuthContext';
import BottomNavigation from './BottomNav';

export const Layout = ({ children }) => {
  const { user, logout } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();
  
  const getTitle = () => {
    if (location.pathname === '/') return 'Bosh sahifa';
    if (location.pathname.startsWith('/clinics/')) return 'Klinika ma\'lumotlari';
    if (location.pathname === '/clinics') return 'Klinikalar';
    if (location.pathname.startsWith('/doctors/')) return 'Shifokor ma\'lumotlari';
    if (location.pathname === '/doctors') return 'Shifokorlar';
    if (location.pathname === '/profile') return 'Profil';
    return '';
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="px-4 py-3 flex items-center justify-between">
          <h1 className="text-lg font-semibold text-gray-900">{getTitle()}</h1>
          {user && (
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
            </Button>
          )}
        </div>
      </header>
      
      {/* Main Content */}
      <main className="pb-20">
        {children}
      </main>
      
      {/* Bottom Navigation */}
      {user && <BottomNavigation />}
    </div>
  );
};