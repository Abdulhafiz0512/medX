import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuthContext } from './context/AuthContext';
import { AppProvider } from './context/AppContext';
import './index.css';

// Layout
import { Layout } from './components/layout';

// Pages
import HomePage from './pages/HomePage';
import ClinicsPage from './pages/ClinicsPage';
import DoctorsPage from './pages/DoctorsPage';
import ProfilePage from './pages/ProfilePage';
import ClinicDetailPage from './pages/ClinicDetailPage';
import DoctorDetailPage from './pages/DoctorDetailPage';
import LoginPage from './pages/LoginPage';

// Wrapper component to handle auth state and routing
const AppRouter = () => {
  const { user } = useAuthContext();
  
  // If user is not logged in, redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <AppProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/clinics" element={<ClinicsPage />} />
          <Route path="/clinics/:id" element={<ClinicDetailPage />} />
          <Route path="/doctors" element={<DoctorsPage />} />
          <Route path="/doctors/:id" element={<DoctorDetailPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </AppProvider>
  );
};

// Create root and render the app
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/*" element={<AppRouter />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>
);
