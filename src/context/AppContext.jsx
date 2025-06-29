import React, { createContext, useState, useContext, useCallback } from 'react';

// Create context
const AppContext = createContext();

// Custom hook to use the app context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

// Provider component
export const AppProvider = ({ children }) => {
  // App state
  const [currentTab, setCurrentTab] = useState('home');
  const [selectedClinic, setSelectedClinic] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState(null);

  // Show a notification message
  const showNotification = useCallback((message, type = 'info') => {
    setNotification({ message, type });
    // Auto-hide notification after 5 seconds
    setTimeout(() => setNotification(null), 5000);
  }, []);

  // Context value
  const value = {
    currentTab,
    setCurrentTab,
    selectedClinic,
    setSelectedClinic,
    selectedDoctor,
    setSelectedDoctor,
    isLoading,
    setIsLoading,
    notification,
    showNotification,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
      {/* Notification component can be rendered here */}
      {notification && (
        <div className={`fixed bottom-4 right-4 p-4 rounded-md ${getNotificationClass(notification.type)}`}>
          {notification.message}
        </div>
      )}
    </AppContext.Provider>
  );
};

// Helper function for notification styling
const getNotificationClass = (type) => {
  const baseClasses = 'text-white px-4 py-2 rounded-md shadow-lg';
  switch (type) {
    case 'success':
      return `${baseClasses} bg-green-500`;
    case 'error':
      return `${baseClasses} bg-red-500`;
    case 'warning':
      return `${baseClasses} bg-yellow-500`;
    default:
      return `${baseClasses} bg-blue-500`;
  }
};

export { AppContext };
export default AppContext;