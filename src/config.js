// Configuration for the application
export const CONFIG = {
  // Set to false to use real API, true to use mock data
  USE_MOCK_DATA: true,
  
  // API Configuration
  API: {
    BASE_URL: 'http://localhost:8080',
    TIMEOUT: 10000,
  },
  
  // Mock Data Configuration
  MOCK: {
    // Add any mock-specific configuration here
    NETWORK_DELAY: {
      MIN: 200,  // ms
      MAX: 1000  // ms
    }
  }
}
