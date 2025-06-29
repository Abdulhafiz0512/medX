import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import { LoginForm } from '../components/auth';

const LoginPage = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  // If user is already logged in, redirect to home
  if (user) {
    navigate('/');
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <LoginForm />
    </div>
  );
};

export default LoginPage; 