import React, { useState, useContext } from 'react';
import { Card, CardHeader, CardContent, CardTitle, Button, Input } from '../ui';
import { Eye, EyeOff, Mail, Lock, Heart, Stethoscope, Building2, User } from 'lucide-react';
import { useAuthContext } from '../../context/AuthContext';

export const LoginForm = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuthContext();

  const mockUsers = [
    { email: 'admin@example.com', password: 'any', role: 'Administrator', icon: User },
    { email: 'doctor@example.com', password: 'any', role: 'Shifokor', icon: Stethoscope },
    { email: 'patient@example.com', password: 'any', role: 'Bemor', icon: Heart }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!credentials.email || !credentials.password) return;
    
    setLoading(true);
    try {
      await login(credentials);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickLogin = (email) => {
    setCredentials({ email, password: 'any' });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-blue-600 p-3 rounded-full mr-3">
              <Heart className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold">
              <span className="text-blue-600">Med</span>
              <span className="text-green-600">X</span>
            </h1>
          </div>
          <p className="text-gray-600 mt-2">Sog'liqni saqlash platformasi</p>
        </div>
        
        {/* Login Card */}
        <Card className="w-full shadow-2xl rounded-2xl overflow-hidden border-0 bg-white">
          <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-8 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10">
              <h2 className="text-2xl font-bold mb-2">Xush kelibsiz</h2>

            </div>
            {/* Decorative elements */}
            <div className="absolute top-4 right-4 opacity-20">
              <Heart className="h-12 w-12" />
            </div>
            <div className="absolute bottom-4 left-4 opacity-20">
              <Stethoscope className="h-8 w-8" />
            </div>
          </div>
          
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2 mt-4">
                    Elektron pochta manzili
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Elektron pochtangizni kiriting"
                      value={credentials.email}
                      onChange={(e) => setCredentials(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
                      Parol
                    </label>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Parolingizni kiriting"
                      value={credentials.password}
                      onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                      className="w-full pl-10 pr-12 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700 transition-colors"
                      aria-label={showPassword ? "Parolni yashirish" : "Parolni ko'rsatish"}
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <a href="#" className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors">
                      Parolni unutdingizmi?
                    </a>
                    <span className="text-xs text-gray-500">Demo uchun har qanday parol ishlaydi</span>
                  </div>
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Kirish...
                  </span>
                ) : 'Kirish'}
              </Button>
            </form>

            {/* Quick Login Options */}
            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500 font-medium">Tez kirish (Demo)</span>
                </div>
              </div>
              
              <div className="mt-6 grid grid-cols-1 gap-3">
                {mockUsers.map((user, index) => {
                  const IconComponent = user.icon;
                  return (
                    <button
                      key={index}
                      onClick={() => handleQuickLogin(user.email)}
                      className="flex items-center p-3 rounded-xl border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 group"
                    >
                      <div className="bg-blue-100 p-2 rounded-lg mr-3 group-hover:bg-blue-200 transition-colors">
                        <IconComponent className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="text-left">
                        <div className="font-medium text-gray-900">{user.role}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-600">
                Hisobingiz yo'qmi?{' '}
                <a href="#" className="font-semibold text-blue-600 hover:text-blue-800 transition-colors">
                  Administrator bilan bog'laning
                </a>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-sm text-gray-500 mt-8">
          © 2024 MedX Platformasi. Barcha huquqlar himoyalangan.
        </div>
      </div>
    </div>
  );
};