# Developer Guide / Rivojlanish qo'llanmasi

[English](#english) | [O'zbekcha](#uzbekcha)

---

## English

### Welcome Developers!

This guide is designed to help developers understand, contribute to, and extend the MedX healthcare platform. Whether you're setting up the development environment, contributing code, or deploying the application, this guide has you covered.

### Table of Contents

1. [Development Setup](#development-setup)
2. [Project Architecture](#project-architecture)
3. [Code Standards](#code-standards)
4. [Component Development](#component-development)
5. [State Management](#state-management)
6. [API Integration](#api-integration)
7. [Testing](#testing)
8. [Deployment](#deployment)
9. [Contributing Guidelines](#contributing-guidelines)

### Development Setup

#### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16.0.0 or higher)
- **npm** (v8.0.0 or higher) or **yarn** (v1.22.0 or higher)
- **Git** (v2.30.0 or higher)
- **VS Code** (recommended) or any code editor

#### Installation Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-org/sogliqni-saqlash.git
   cd sogliqni-saqlash
   ```

2. **Install Dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Configuration**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` file with your configuration:
   ```env
   VITE_APP_TITLE=MedX
   VITE_API_BASE_URL=http://localhost:3000/api
   VITE_APP_VERSION=1.0.0
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open in Browser**
   ```
   http://localhost:5173
   ```

#### Available Scripts

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext js,jsx --report-unused-disable-directives --max-warnings 0",
    "lint:fix": "eslint . --ext js,jsx --fix",
    "format": "prettier --write .",
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage"
  }
}
```

### Project Architecture

#### Directory Structure

```
src/
├── components/          # Reusable UI components
│   ├── auth/           # Authentication components
│   │   ├── LoginForm.jsx
│   │   └── RegisterForm.jsx
│   ├── clinics/        # Clinic-related components
│   │   ├── ClinicCard.jsx
│   │   ├── ClinicDetail.jsx
│   │   └── ClinicList.jsx
│   ├── doctors/        # Doctor-related components
│   │   ├── DoctorCard.jsx
│   │   ├── DoctorDetail.jsx
│   │   └── DoctorList.jsx
│   ├── layout/         # Layout components
│   │   ├── BottomNav.jsx
│   │   ├── Header.jsx
│   │   └── Sidebar.jsx
│   ├── profile/        # Profile components
│   │   ├── ProfilePage.jsx
│   │   └── ProfileTabs.jsx
│   ├── search/         # Search components
│   │   ├── SearchBar.jsx
│   │   └── SearchFilters.jsx
│   └── ui/             # Basic UI components
│       ├── Button.jsx
│       ├── Card.jsx
│       ├── Input.jsx
│       └── Modal.jsx
├── context/            # React Context providers
│   ├── AuthContext.jsx
│   └── AppContext.jsx
├── hooks/              # Custom React hooks
│   ├── useAuth.js
│   ├── useLocalStorage.js
│   └── useApi.js
├── pages/              # Page components
│   ├── HomePage.jsx
│   ├── LoginPage.jsx
│   ├── ClinicsPage.jsx
│   ├── DoctorsPage.jsx
│   ├── ProfilePage.jsx
│   ├── SearchPage.jsx
│   └── DoctorDetail.jsx
├── routes/             # Routing configuration
│   ├── AppRoutes.jsx
│   └── ProtectedRoute.jsx
├── services/           # API and data services
│   ├── ApiService.js
│   ├── MockApiService.js
│   └── LocalStorageService.js
├── utils/              # Utility functions
│   ├── constants.js
│   ├── helpers.js
│   └── validators.js
├── styles/             # Global styles
│   ├── index.css
│   └── tailwind.css
├── assets/             # Static assets
│   ├── images/
│   └── icons/
├── App.jsx            # Main App component
└── main.jsx          # Application entry point
```

#### Technology Stack

- **Frontend Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Routing**: React Router v6
- **State Management**: React Context API
- **HTTP Client**: Fetch API
- **Form Handling**: React Hook Form (recommended)
- **Testing**: Vitest + React Testing Library
- **Linting**: ESLint + Prettier

### Code Standards

#### JavaScript/JSX Standards

1. **File Naming**
   - Use PascalCase for component files: `UserProfile.jsx`
   - Use camelCase for utility files: `apiHelpers.js`
   - Use kebab-case for CSS files: `user-profile.css`

2. **Component Structure**
   ```jsx
   import React, { useState, useEffect } from 'react';
   import PropTypes from 'prop-types';
   import { Button } from '../ui';
   import { useAuth } from '../../hooks/useAuth';
   
   const UserProfile = ({ userId, onUpdate }) => {
     // Hooks first
     const { user } = useAuth();
     const [loading, setLoading] = useState(false);
     const [data, setData] = useState(null);
   
     // Effects
     useEffect(() => {
       // Effect logic
     }, [userId]);
   
     // Event handlers
     const handleSubmit = async (formData) => {
       // Handler logic
     };
   
     // Render
     if (loading) {
       return <div>Loading...</div>;
     }
   
     return (
       <div className="user-profile">
         {/* JSX content */}
       </div>
     );
   };
   
   UserProfile.propTypes = {
     userId: PropTypes.string.isRequired,
     onUpdate: PropTypes.func
   };
   
   UserProfile.defaultProps = {
     onUpdate: () => {}
   };
   
   export default UserProfile;
   ```

3. **Import Order**
   ```jsx
   // React imports
   import React, { useState, useEffect } from 'react';
   import PropTypes from 'prop-types';
   
   // Third-party libraries
   import { useNavigate } from 'react-router-dom';
   import { Star, Heart } from 'lucide-react';
   
   // Local components
   import { Button } from '../ui';
   import DoctorCard from './DoctorCard';
   
   // Hooks
   import { useAuth } from '../../hooks/useAuth';
   
   // Utilities
   import { formatDate } from '../../utils/helpers';
   
   // Styles
   import './DoctorList.css';
   ```

#### CSS/Tailwind Standards

1. **Tailwind Classes Order**
   ```jsx
   // Layout → Spacing → Typography → Colors → Effects
   <div className="flex items-center justify-between p-4 text-lg text-gray-800 bg-white shadow-md rounded-lg">
   ```

2. **Custom CSS**
   ```css
   /* Component-specific styles */
   .doctor-card {
     @apply bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow;
   }
   
   .doctor-card__image {
     @apply w-16 h-16 rounded-full object-cover;
   }
   ```

#### Naming Conventions

1. **Variables and Functions**
   ```javascript
   // Use camelCase
   const userName = 'John Doe';
   const getUserData = () => {};
   const isAuthenticated = true;
   ```

2. **Constants**
   ```javascript
   // Use UPPER_SNAKE_CASE
   const API_BASE_URL = 'https://api.example.com';
   const MAX_RETRY_ATTEMPTS = 3;
   ```

3. **Component Names**
   ```javascript
   // Use PascalCase
   const UserProfile = () => {};
   const DoctorCard = () => {};
   ```

### Component Development

#### Creating New Components

1. **Component Template**
   ```jsx
   import React from 'react';
   import PropTypes from 'prop-types';
   
   const ComponentName = ({ prop1, prop2 }) => {
     return (
       <div className="component-name">
         {/* Component content */}
       </div>
     );
   };
   
   ComponentName.propTypes = {
     prop1: PropTypes.string.isRequired,
     prop2: PropTypes.number
   };
   
   ComponentName.defaultProps = {
     prop2: 0
   };
   
   export default ComponentName;
   ```

2. **Component with State**
   ```jsx
   import React, { useState, useEffect } from 'react';
   import PropTypes from 'prop-types';
   
   const ComponentName = ({ initialData }) => {
     const [data, setData] = useState(initialData);
     const [loading, setLoading] = useState(false);
     const [error, setError] = useState(null);
   
     useEffect(() => {
       const fetchData = async () => {
         try {
           setLoading(true);
           // API call
           setData(result);
         } catch (err) {
           setError(err.message);
         } finally {
           setLoading(false);
         }
       };
   
       fetchData();
     }, []);
   
     if (loading) return <div>Loading...</div>;
     if (error) return <div>Error: {error}</div>;
   
     return (
       <div className="component-name">
         {/* Component content */}
       </div>
     );
   };
   ```

#### Component Best Practices

1. **Single Responsibility**
   ```jsx
   // Good: Component has one clear purpose
   const DoctorCard = ({ doctor }) => {
     return (
       <div className="doctor-card">
         <img src={doctor.image} alt={doctor.name} />
         <h3>{doctor.name}</h3>
         <p>{doctor.specialty}</p>
       </div>
     );
   };
   
   // Bad: Component does too many things
   const DoctorCard = ({ doctor, onBook, onFavorite, onShare }) => {
     // Too many responsibilities
   };
   ```

2. **Props Validation**
   ```jsx
   import PropTypes from 'prop-types';
   
   const DoctorCard = ({ doctor, onBook }) => {
     // Component logic
   };
   
   DoctorCard.propTypes = {
     doctor: PropTypes.shape({
       id: PropTypes.string.isRequired,
       name: PropTypes.string.isRequired,
       specialty: PropTypes.string.isRequired,
       image: PropTypes.string,
       rating: PropTypes.number
     }).isRequired,
     onBook: PropTypes.func.isRequired
   };
   ```

3. **Error Boundaries**
   ```jsx
   class ErrorBoundary extends React.Component {
     constructor(props) {
       super(props);
       this.state = { hasError: false };
     }
   
     static getDerivedStateFromError(error) {
       return { hasError: true };
     }
   
     componentDidCatch(error, errorInfo) {
       console.error('Error caught by boundary:', error, errorInfo);
     }
   
     render() {
       if (this.state.hasError) {
         return <h1>Something went wrong.</h1>;
       }
   
       return this.props.children;
     }
   }
   ```

### State Management

#### React Context API

1. **Creating Context**
   ```jsx
   // src/context/AuthContext.jsx
   import React, { createContext, useContext, useReducer } from 'react';
   
   const AuthContext = createContext();
   
   const authReducer = (state, action) => {
     switch (action.type) {
       case 'LOGIN':
         return { ...state, user: action.payload, isAuthenticated: true };
       case 'LOGOUT':
         return { ...state, user: null, isAuthenticated: false };
       default:
         return state;
     }
   };
   
   export const AuthProvider = ({ children }) => {
     const [state, dispatch] = useReducer(authReducer, {
       user: null,
       isAuthenticated: false,
       loading: false
     });
   
     const login = (userData) => {
       dispatch({ type: 'LOGIN', payload: userData });
     };
   
     const logout = () => {
       dispatch({ type: 'LOGOUT' });
     };
   
     return (
       <AuthContext.Provider value={{ ...state, login, logout }}>
         {children}
       </AuthContext.Provider>
     );
   };
   
   export const useAuth = () => {
     const context = useContext(AuthContext);
     if (!context) {
       throw new Error('useAuth must be used within AuthProvider');
     }
     return context;
   };
   ```

2. **Using Context**
   ```jsx
   // In any component
   import { useAuth } from '../context/AuthContext';
   
   const UserProfile = () => {
     const { user, isAuthenticated, logout } = useAuth();
   
     if (!isAuthenticated) {
       return <div>Please log in</div>;
     }
   
     return (
       <div>
         <h1>Welcome, {user.name}</h1>
         <button onClick={logout}>Logout</button>
       </div>
     );
   };
   ```

#### Custom Hooks

1. **API Hook**
   ```jsx
   // src/hooks/useApi.js
   import { useState, useEffect } from 'react';
   import { apiService } from '../services/ApiService';
   
   export const useApi = (endpoint, options = {}) => {
     const [data, setData] = useState(null);
     const [loading, setLoading] = useState(true);
     const [error, setError] = useState(null);
   
     useEffect(() => {
       const fetchData = async () => {
         try {
           setLoading(true);
           const result = await apiService.get(endpoint, options);
           setData(result);
         } catch (err) {
           setError(err.message);
         } finally {
           setLoading(false);
         }
       };
   
       fetchData();
     }, [endpoint]);
   
     return { data, loading, error };
   };
   ```

2. **Local Storage Hook**
   ```jsx
   // src/hooks/useLocalStorage.js
   import { useState, useEffect } from 'react';
   
   export const useLocalStorage = (key, initialValue) => {
     const [storedValue, setStoredValue] = useState(() => {
       try {
         const item = window.localStorage.getItem(key);
         return item ? JSON.parse(item) : initialValue;
       } catch (error) {
         console.error(error);
         return initialValue;
       }
     });
   
     const setValue = (value) => {
       try {
         setStoredValue(value);
         window.localStorage.setItem(key, JSON.stringify(value));
       } catch (error) {
         console.error(error);
       }
     };
   
     return [storedValue, setValue];
   };
   ```

### API Integration

#### Service Layer

1. **API Service Structure**
   ```javascript
   // src/services/ApiService.js
   class ApiService {
     constructor(baseURL) {
       this.baseURL = baseURL;
       this.token = localStorage.getItem('authToken');
     }
   
     setToken(token) {
       this.token = token;
       localStorage.setItem('authToken', token);
     }
   
     async request(endpoint, options = {}) {
       const url = `${this.baseURL}${endpoint}`;
       const config = {
         headers: {
           'Content-Type': 'application/json',
           ...(this.token && { Authorization: `Bearer ${this.token}` }),
           ...options.headers
         },
         ...options
       };
   
       try {
         const response = await fetch(url, config);
         if (!response.ok) {
           throw new Error(`HTTP error! status: ${response.status}`);
         }
         return await response.json();
       } catch (error) {
         console.error('API request failed:', error);
         throw error;
       }
     }
   
     // Auth endpoints
     async login(credentials) {
       return this.request('/auth/login', {
         method: 'POST',
         body: JSON.stringify(credentials)
       });
     }
   
     async register(userData) {
       return this.request('/auth/register', {
         method: 'POST',
         body: JSON.stringify(userData)
       });
     }
   
     // Clinic endpoints
     async getClinics(filters = {}) {
       const params = new URLSearchParams(filters);
       return this.request(`/clinics?${params}`);
     }
   
     async getClinic(id) {
       return this.request(`/clinics/${id}`);
     }
   
     // Doctor endpoints
     async getDoctors(filters = {}) {
       const params = new URLSearchParams(filters);
       return this.request(`/doctors?${params}`);
     }
   
     async getDoctor(id) {
       return this.request(`/doctors/${id}`);
     }
   
     // Appointment endpoints
     async getAppointments() {
       return this.request('/appointments');
     }
   
     async createAppointment(appointmentData) {
       return this.request('/appointments', {
         method: 'POST',
         body: JSON.stringify(appointmentData)
       });
     }
   }
   
   export const apiService = new ApiService(import.meta.env.VITE_API_BASE_URL);
   ```

2. **Using API Service**
   ```jsx
   import { apiService } from '../services/ApiService';
   
   const DoctorList = () => {
     const [doctors, setDoctors] = useState([]);
     const [loading, setLoading] = useState(true);
   
     useEffect(() => {
       const fetchDoctors = async () => {
         try {
           setLoading(true);
           const data = await apiService.getDoctors({ specialty: 'cardiology' });
           setDoctors(data);
         } catch (error) {
           console.error('Failed to fetch doctors:', error);
         } finally {
           setLoading(false);
         }
       };
   
       fetchDoctors();
     }, []);
   
     return (
       <div>
         {loading ? (
           <div>Loading...</div>
         ) : (
           doctors.map(doctor => <DoctorCard key={doctor.id} doctor={doctor} />)
         )}
       </div>
     );
   };
   ```

### Testing

#### Unit Testing

1. **Component Testing**
   ```jsx
   // src/components/DoctorCard.test.jsx
   import { render, screen, fireEvent } from '@testing-library/react';
   import { BrowserRouter } from 'react-router-dom';
   import DoctorCard from './DoctorCard';
   
   const mockDoctor = {
     id: '1',
     name: 'Dr. John Doe',
     specialty: 'Cardiology',
     rating: 4.5,
     image: 'test-image.jpg'
   };
   
   const renderWithRouter = (component) => {
     return render(
       <BrowserRouter>
         {component}
       </BrowserRouter>
     );
   };
   
   describe('DoctorCard', () => {
     it('renders doctor information correctly', () => {
       renderWithRouter(<DoctorCard doctor={mockDoctor} />);
   
       expect(screen.getByText('Dr. John Doe')).toBeInTheDocument();
       expect(screen.getByText('Cardiology')).toBeInTheDocument();
       expect(screen.getByText('4.5')).toBeInTheDocument();
     });
   
     it('calls onBook when book button is clicked', () => {
       const mockOnBook = jest.fn();
       renderWithRouter(<DoctorCard doctor={mockDoctor} onBook={mockOnBook} />);
   
       fireEvent.click(screen.getByText('Book Appointment'));
       expect(mockOnBook).toHaveBeenCalledWith(mockDoctor.id);
     });
   });
   ```

2. **Hook Testing**
   ```jsx
   // src/hooks/useApi.test.js
   import { renderHook, waitFor } from '@testing-library/react';
   import { useApi } from './useApi';
   import { apiService } from '../services/ApiService';
   
   jest.mock('../services/ApiService');
   
   describe('useApi', () => {
     it('fetches data successfully', async () => {
       const mockData = [{ id: 1, name: 'Test' }];
       apiService.get.mockResolvedValue(mockData);
   
       const { result } = renderHook(() => useApi('/test'));
   
       expect(result.current.loading).toBe(true);
   
       await waitFor(() => {
         expect(result.current.loading).toBe(false);
       });
   
       expect(result.current.data).toEqual(mockData);
       expect(result.current.error).toBe(null);
     });
   });
   ```

#### Integration Testing

```jsx
// src/components/DoctorList.test.jsx
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import DoctorList from './DoctorList';
import { apiService } from '../services/ApiService';

jest.mock('../services/ApiService');

const mockDoctors = [
  { id: '1', name: 'Dr. John Doe', specialty: 'Cardiology' },
  { id: '2', name: 'Dr. Jane Smith', specialty: 'Neurology' }
];

describe('DoctorList Integration', () => {
  it('loads and displays doctors', async () => {
    apiService.getDoctors.mockResolvedValue(mockDoctors);

    render(
      <BrowserRouter>
        <DoctorList />
      </BrowserRouter>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Dr. John Doe')).toBeInTheDocument();
      expect(screen.getByText('Dr. Jane Smith')).toBeInTheDocument();
    });
  });
});
```

### Deployment

#### Build Process

1. **Production Build**
   ```bash
   npm run build
   ```

2. **Preview Build**
   ```bash
   npm run preview
   ```

#### Deployment Options

1. **Vercel Deployment**
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Deploy
   vercel
   ```

2. **Netlify Deployment**
   ```bash
   # Build the project
   npm run build
   
   # Deploy to Netlify (drag and drop dist folder)
   ```

3. **Firebase Hosting**
   ```bash
   # Install Firebase CLI
   npm install -g firebase-tools
   
   # Login to Firebase
   firebase login
   
   # Initialize Firebase
   firebase init hosting
   
   # Deploy
   firebase deploy
   ```

#### Environment Configuration

1. **Production Environment**
   ```env
   VITE_APP_TITLE=MedX
   VITE_API_BASE_URL=https://api.medx.uz
   VITE_APP_VERSION=1.0.0
   VITE_APP_ENV=production
   ```

2. **Staging Environment**
   ```env
   VITE_APP_TITLE=MedX (Staging)
   VITE_API_BASE_URL=https://staging-api.medx.uz
   VITE_APP_VERSION=1.0.0
   VITE_APP_ENV=staging
   ```

### Contributing Guidelines

#### Code Review Process

1. **Create Feature Branch**
   ```bash
   git checkout -b feature/new-feature
   ```

2. **Make Changes**
   - Follow coding standards
   - Write tests for new features
   - Update documentation

3. **Commit Changes**
   ```bash
   git add .
   git commit -m "feat: add new doctor search feature"
   ```

4. **Push and Create PR**
   ```bash
   git push origin feature/new-feature
   # Create Pull Request on GitHub
   ```

#### Commit Message Convention

```
type(scope): description

feat: new feature
fix: bug fix
docs: documentation changes
style: formatting changes
refactor: code refactoring
test: adding tests
chore: maintenance tasks
```

#### Pull Request Checklist

- [ ] Code follows project standards
- [ ] Tests are written and passing
- [ ] Documentation is updated
- [ ] No console errors or warnings
- [ ] Mobile responsive design
- [ ] Accessibility considerations
- [ ] Performance optimizations

---

## O'zbekcha

### Rivojlanish qo'llanmasi

#### Rivojlanish muhitini sozlash

**Talablar:**
- Node.js (v16.0.0 yoki undan yuqori)
- npm (v8.0.0 yoki undan yuqori) yoki yarn (v1.22.0 yoki undan yuqori)
- Git (v2.30.0 yoki undan yuqori)
- VS Code (tavsiya etiladi) yoki har qanday kod muharriri

#### O'rnatish qadamlari

1. **Repositoryni klonlash**
   ```bash
   git clone https://github.com/your-org/sogliqni-saqlash.git
   cd sogliqni-saqlash
   ```

2. **Bog'liqliklarni o'rnatish**
   ```bash
   npm install
   # yoki
   yarn install
   ```

3. **Muhit konfiguratsiyasi**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` file with your configuration:
   ```env
   VITE_APP_TITLE=MedX
   VITE_API_BASE_URL=http://localhost:3000/api
   VITE_APP_VERSION=1.0.0
   ```

4. **Rivojlanish serverini ishga tushirish**
   ```bash
   npm run dev
   # yoki
   yarn dev
   ```

5. **Brauzerda ochish**
   ```
   http://localhost:5173
   ```

#### Mavjud skriptlar

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext js,jsx --report-unused-disable-directives --max-warnings 0",
    "lint:fix": "eslint . --ext js,jsx --fix",
    "format": "prettier --write .",
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage"
  }
}
```

### Loyiha arxitekturasi

#### Papka tuzilishi

```
src/
├── components/          # Qayta ishlatiladigan UI komponentlari
│   ├── auth/           # Autentifikatsiya komponentlari
│   ├── clinics/        # Klinika bilan bog'liq komponentlar
│   ├── doctors/        # Shifokor bilan bog'liq komponentlar
│   ├── layout/         # Layout komponentlari
│   ├── profile/        # Profil komponentlari
│   ├── search/         # Qidiruv komponentlari
│   └── ui/             # Asosiy UI komponentlari
├── context/            # React Context provayderlari
├── hooks/              # Maxsus React hooklar
├── pages/              # Sahifa komponentlari
├── routes/             # Marshrutlash konfiguratsiyasi
├── services/           # API va ma'lumotlar xizmatlari
├── utils/              # Yordamchi funksiyalar
├── styles/             # Global stillar
├── assets/             # Statik resurslar
├── App.jsx            # Asosiy App komponenti
└── main.jsx          # Ilova kirish nuqtasi
```

#### Texnologiya to'plami

- **Frontend Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Routing**: React Router v6
- **State Management**: React Context API
- **HTTP Client**: Fetch API
- **Form Handling**: React Hook Form (tavsiya etiladi)
- **Testing**: Vitest + React Testing Library
- **Linting**: ESLint + Prettier

### Kod standartlari

#### JavaScript/JSX standartlari

1. **Fayl nomlari**
   - Komponent fayllari uchun PascalCase: `UserProfile.jsx`
   - Yordamchi fayllar uchun camelCase: `apiHelpers.js`
   - CSS fayllari uchun kebab-case: `user-profile.css`

2. **Komponent tuzilishi**
   ```jsx
   import React, { useState, useEffect } from 'react';
   import PropTypes from 'prop-types';
   import { Button } from '../ui';
   import { useAuth } from '../../hooks/useAuth';
   
   const UserProfile = ({ userId, onUpdate }) => {
     // Hooklar birinchi
     const { user } = useAuth();
     const [loading, setLoading] = useState(false);
     const [data, setData] = useState(null);
   
     // Effectlar
     useEffect(() => {
       // Effect logikasi
     }, [userId]);
   
     // Event handlerlar
     const handleSubmit = async (formData) => {
       // Handler logikasi
     };
   
     // Render
     if (loading) {
       return <div>Yuklanmoqda...</div>;
     }
   
     return (
       <div className="user-profile">
         {/* JSX kontenti */}
       </div>
     );
   };
   
   UserProfile.propTypes = {
     userId: PropTypes.string.isRequired,
     onUpdate: PropTypes.func
   };
   
   UserProfile.defaultProps = {
     onUpdate: () => {}
   };
   
   export default UserProfile;
   ```

#### CSS/Tailwind standartlari

1. **Tailwind klasslari tartibi**
   ```jsx
   // Layout → Spacing → Typography → Colors → Effects
   <div className="flex items-center justify-between p-4 text-lg text-gray-800 bg-white shadow-md rounded-lg">
   ```

2. **Maxsus CSS**
   ```css
   /* Komponent-ga xos stillar */
   .doctor-card {
     @apply bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow;
   }
   
   .doctor-card__image {
     @apply w-16 h-16 rounded-full object-cover;
   }
   ```

### Komponent rivojlanishi

#### Yangi komponentlar yaratish

1. **Komponent shabloni**
   ```jsx
   import React from 'react';
   import PropTypes from 'prop-types';
   
   const ComponentName = ({ prop1, prop2 }) => {
     return (
       <div className="component-name">
         {/* Komponent kontenti */}
       </div>
     );
   };
   
   ComponentName.propTypes = {
     prop1: PropTypes.string.isRequired,
     prop2: PropTypes.number
   };
   
   ComponentName.defaultProps = {
     prop2: 0
   };
   
   export default ComponentName;
   ```

#### Komponent eng yaxshi amaliyotlari

1. **Yagona javobgarlik**
   ```jsx
   // Yaxshi: Komponentning aniq bir maqsadi bor
   const DoctorCard = ({ doctor }) => {
     return (
       <div className="doctor-card">
         <img src={doctor.image} alt={doctor.name} />
         <h3>{doctor.name}</h3>
         <p>{doctor.specialty}</p>
       </div>
     );
   };
   ```

2. **Props validatsiyasi**
   ```jsx
   import PropTypes from 'prop-types';
   
   const DoctorCard = ({ doctor, onBook }) => {
     // Komponent logikasi
   };
   
   DoctorCard.propTypes = {
     doctor: PropTypes.shape({
       id: PropTypes.string.isRequired,
       name: PropTypes.string.isRequired,
       specialty: PropTypes.string.isRequired,
       image: PropTypes.string,
       rating: PropTypes.number
     }).isRequired,
     onBook: PropTypes.func.isRequired
   };
   ```

### Holat boshqaruvi

#### React Context API

1. **Context yaratish**
   ```jsx
   // src/context/AuthContext.jsx
   import React, { createContext, useContext, useReducer } from 'react';
   
   const AuthContext = createContext();
   
   const authReducer = (state, action) => {
     switch (action.type) {
       case 'LOGIN':
         return { ...state, user: action.payload, isAuthenticated: true };
       case 'LOGOUT':
         return { ...state, user: null, isAuthenticated: false };
       default:
         return state;
     }
   };
   
   export const AuthProvider = ({ children }) => {
     const [state, dispatch] = useReducer(authReducer, {
       user: null,
       isAuthenticated: false,
       loading: false
     });
   
     const login = (userData) => {
       dispatch({ type: 'LOGIN', payload: userData });
     };
   
     const logout = () => {
       dispatch({ type: 'LOGOUT' });
     };
   
     return (
       <AuthContext.Provider value={{ ...state, login, logout }}>
         {children}
       </AuthContext.Provider>
     );
   };
   
   export const useAuth = () => {
     const context = useContext(AuthContext);
     if (!context) {
       throw new Error('useAuth AuthProvider ichida ishlatilishi kerak');
     }
     return context;
   };
   ```

### API integratsiyasi

#### Xizmat qatlami

1. **API xizmati tuzilishi**
   ```javascript
   // src/services/ApiService.js
   class ApiService {
     constructor(baseURL) {
       this.baseURL = baseURL;
       this.token = localStorage.getItem('authToken');
     }
   
     setToken(token) {
       this.token = token;
       localStorage.setItem('authToken', token);
     }
   
     async request(endpoint, options = {}) {
       const url = `${this.baseURL}${endpoint}`;
       const config = {
         headers: {
           'Content-Type': 'application/json',
           ...(this.token && { Authorization: `Bearer ${this.token}` }),
           ...options.headers
         },
         ...options
       };
   
       try {
         const response = await fetch(url, config);
         if (!response.ok) {
           throw new Error(`HTTP xatosi! status: ${response.status}`);
         }
         return await response.json();
       } catch (error) {
         console.error('API so\'rovi muvaffaqiyatsiz:', error);
         throw error;
       }
     }
   
     // Auth endpointlar
     async login(credentials) {
       return this.request('/auth/login', {
         method: 'POST',
         body: JSON.stringify(credentials)
       });
     }
   
     // Klinika endpointlar
     async getClinics(filters = {}) {
       const params = new URLSearchParams(filters);
       return this.request(`/clinics?${params}`);
     }
   
     // Shifokor endpointlar
     async getDoctors(filters = {}) {
       const params = new URLSearchParams(filters);
       return this.request(`/doctors?${params}`);
     }
   }
   
   export const apiService = new ApiService(import.meta.env.VITE_API_BASE_URL);
   ```

### Testlash

#### Unit testlash

1. **Komponent testlash**
   ```jsx
   // src/components/DoctorCard.test.jsx
   import { render, screen, fireEvent } from '@testing-library/react';
   import { BrowserRouter } from 'react-router-dom';
   import DoctorCard from './DoctorCard';
   
   const mockDoctor = {
     id: '1',
     name: 'Dr. John Doe',
     specialty: 'Cardiology',
     rating: 4.5,
     image: 'test-image.jpg'
   };
   
   const renderWithRouter = (component) => {
     return render(
       <BrowserRouter>
         {component}
       </BrowserRouter>
     );
   };
   
   describe('DoctorCard', () => {
     it('shifokor ma\'lumotlarini to\'g\'ri ko\'rsatadi', () => {
       renderWithRouter(<DoctorCard doctor={mockDoctor} />);
   
       expect(screen.getByText('Dr. John Doe')).toBeInTheDocument();
       expect(screen.getByText('Cardiology')).toBeInTheDocument();
       expect(screen.getByText('4.5')).toBeInTheDocument();
     });
   });
   ```

### Joylashtirish

#### Qurish jarayoni

1. **Ishlab chiqarish qurishi**
   ```bash
   npm run build
   ```

2. **Qurishni ko'rish**
   ```bash
   npm run preview
   ```

#### Joylashtirish variantlari

1. **Vercel joylashtirish**
   ```bash
   # Vercel CLI o'rnatish
   npm i -g vercel
   
   # Joylashtirish
   vercel
   ```

2. **Netlify joylashtirish**
   ```bash
   # Loyihani qurish
   npm run build
   
   # Netlify-ga joylashtirish (dist papkasini sudrab tashlash)
   ```

### Hissa qo'shish ko'rsatmalari

#### Kod ko'rib chiqish jarayoni

1. **Feature branch yaratish**
   ```bash
   git checkout -b feature/yangi-xususiyat
   ```

2. **O'zgarishlar kiritish**
   - Kodlash standartlariga rioya qilish
   - Yangi xususiyatlar uchun testlar yozish
   - Hujjatlarni yangilash

3. **O'zgarishlarni commit qilish**
   ```bash
   git add .
   git commit -m "feat: yangi shifokor qidiruv xususiyatini qo'shish"
   ```

4. **Push va PR yaratish**
   ```bash
   git push origin feature/yangi-xususiyat
   # GitHub-da Pull Request yaratish
   ```

#### Commit xabar konventsiyasi

```
type(scope): description

feat: yangi xususiyat
fix: xatolik tuzatish
docs: hujjat o'zgarishlari
style: formatlash o'zgarishlari
refactor: kod qayta yozish
test: testlar qo'shish
chore: texnik xizmat vazifalari
```

#### Pull Request ro'yxati

- [ ] Kod loyiha standartlariga mos
- [ ] Testlar yozilgan va o'tadi
- [ ] Hujjatlar yangilangan
- [ ] Console xatolari yoki ogohlantirishlar yo'q
- [ ] Mobil responsive dizayn
- [ ] Accessibility ko'rsatmalari
- [ ] Performance optimizatsiyalari 