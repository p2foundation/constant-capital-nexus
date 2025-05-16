
// Authentication API service
import { apiRequest } from './utils';

// Authentication API methods
export const authAPI = {
  login: (email: string, password: string) => 
    apiRequest("/auth/login", "POST", { email, password }),
  logout: () => apiRequest("/auth/logout", "POST"),
  getCurrentUser: () => apiRequest("/auth/me"),
};
