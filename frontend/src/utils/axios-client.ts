import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";

// Create an Axios instance with default config
const axiosClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000", // Default to localhost if not set
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000, // 30 seconds timeout
});

// Add request interceptor for authentication
axiosClient.interceptors.request.use(
  (config) => {
    // Get auth token from storage if it exists
    const token =
      typeof window !== "undefined" ? localStorage.getItem("authToken") : null;

    // If token exists, add to headers
    if (token && config.headers) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    // Handle specific error cases
    if (error.response?.status === 401) {
      // Handle unauthorized (e.g., logout user, redirect to login)
      console.error("Unauthorized request");
      // Example: localStorage.removeItem("authToken");
    }

    return Promise.reject(error);
  }
);

// Function to create request for GET
export const get = <T>(url: string, config?: AxiosRequestConfig) => {
  return axiosClient.get<T>(url, config);
};

// Function to create request for POST
export const post = <T>(
  url: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any,
  config?: AxiosRequestConfig
) => {
  return axiosClient.post<T>(url, data, config);
};
