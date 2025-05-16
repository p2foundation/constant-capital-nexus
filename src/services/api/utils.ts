
// Shared API utilities
import { toast } from "sonner";

// Default API base URL
export const API_BASE_URL = "https://api.constantcapital.com";

// Default headers for API requests
export const defaultHeaders = {
  "Content-Type": "application/json",
};

// Generic error handler
export const handleError = (error: any) => {
  console.error("API Error:", error);
  toast.error("An error occurred while connecting to the server");
  throw error;
};

// Generic API request method
export const apiRequest = async (
  endpoint: string,
  method: string = "GET",
  data: any = null,
  customHeaders: Record<string, string> | null = null,
  options: { contentType?: string } = {}
) => {
  try {
    const url = `${API_BASE_URL}${endpoint}`;
    let headers = { ...defaultHeaders };
    
    // Apply custom headers if provided
    if (customHeaders) {
      headers = { ...headers, ...customHeaders };
    }
    
    // Override content type if specified in options
    if (options.contentType) {
      headers["Content-Type"] = options.contentType;
    }
    
    const requestOptions: RequestInit = {
      method,
      headers,
    };
    
    if (data && (method === "POST" || method === "PUT" || method === "PATCH")) {
      // If it's FormData, don't stringify it
      if (data instanceof FormData) {
        requestOptions.body = data;
        // Remove default Content-Type so browser sets the correct boundary for FormData
        if (headers["Content-Type"] === "application/json") {
          delete headers["Content-Type"];
        }
      } else {
        requestOptions.body = JSON.stringify(data);
      }
    }
    
    const response = await fetch(url, requestOptions);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Request failed with status ${response.status}`);
    }
    
    // For 204 No Content responses
    if (response.status === 204) {
      return null;
    }
    
    return await response.json();
  } catch (error) {
    return handleError(error);
  }
};
