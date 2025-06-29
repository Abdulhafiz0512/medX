import React from 'react';
import { Building2, Stethoscope, User, Home } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const BottomNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const tabs = [
    { id: 'home', label: 'Bosh sahifa', icon: Home, path: '/' },
    { id: 'clinics', label: 'Klinikalar', icon: Building2, path: '/clinics' },
    { id: 'doctors', label: 'Shifokorlar', icon: Stethoscope, path: '/doctors' },
    { id: 'profile', label: 'Profil', icon: User, path: '/profile' },
  ];

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
      <div className="flex justify-around items-center h-16">
        {tabs.map(({ id, label, icon: Icon, path }) => (
          <button
            key={path}
            onClick={() => handleNavigation(path)}
            className={`flex-1 h-full flex flex-col items-center justify-center transition-colors duration-200 ${
              isActive(path) ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <div className="relative">
              <Icon className="h-6 w-6" />
              {isActive(path) && (
                <span className="absolute -top-1 -right-2 h-2 w-2 rounded-full bg-blue-600"></span>
              )}
            </div>
            <span className="text-xs mt-1">{label}</span>
          </button>
        ))}
      </div>
      
      {/* Safe area for mobile devices with notches */}
      <div className="h-4 bg-white sm:hidden"></div>
    </nav>
  );
};

export default BottomNavigation;