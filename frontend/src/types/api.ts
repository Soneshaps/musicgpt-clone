// Common API response structure
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

// Pagination metadata structure
export interface Pagination {
  total: number;
  page: number;
  limit: number;
  pages: number;
}

// Voice model
export interface Voice {
  id: string;
  name: string;
  language: string;
  createdAt: string;
  updatedAt: string;
}

// API response for voices with pagination
export interface VoicesResponse {
  voices: Voice[];
  pagination: Pagination;
}
