// Import configuration
import { CONFIG } from '../config';

// Import mock service
import { apiService as mockApiService } from './MockApiService';

// Real API service implementation
class RealApiService {
  constructor(baseUrl = CONFIG.API.BASE_URL) {
    this.baseUrl = baseUrl;
    this.token = null;
  }

  setToken(token) {
    this.token = token;
  }

  clearToken() {
    this.token = null;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...(this.token && { Authorization: `Bearer ${this.token}` }),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Request failed');
      }
      
      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // Auth methods
  async login(credentials) {
    const data = await this.request('/api/v1/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    this.setToken(data.token);
    return data;
  }

  async register(userData) {
    return this.request('/api/v1/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  // Clinic methods
  async getClinics() {
    return this.request('/api/clinics');
  }

  async createClinic(userId, clinicData) {
    return this.request(`/api/clinics/user/${userId}`, {
      method: 'POST',
      body: JSON.stringify(clinicData),
    });
  }

  // Doctor methods
  async getDoctors() {
    return this.request('/api/doctors');
  }

  async createDoctor(doctorData) {
    return this.request('/api/doctors', {
      method: 'POST',
      body: JSON.stringify(doctorData),
    });
  }
}

// Export the appropriate service based on configuration
export const apiService = CONFIG.USE_MOCK_DATA ? mockApiService : new RealApiService();
export default apiService;