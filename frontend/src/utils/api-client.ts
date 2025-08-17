import {
  useMutation,
  useQuery,
  UseMutationOptions,
  UseQueryOptions,
  QueryKey,
} from "@tanstack/react-query";
import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import * as api from "./axios-client";

// Generic type for API responses
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

// Types for GET requests
export function useGetQuery<TData = unknown, TError = AxiosError>(
  queryKey: QueryKey,
  url: string,
  options?: UseQueryOptions<AxiosResponse<ApiResponse<TData>>, TError, TData>,
  config?: AxiosRequestConfig
) {
  return useQuery<AxiosResponse<ApiResponse<TData>>, TError, TData>({
    queryKey,
    queryFn: () => api.get<ApiResponse<TData>>(url, config),
    select: (response) => response.data.data,
    ...options,
  });
}

// Types for POST requests
export function usePostMutation<
  TData = unknown,
  TVariables = unknown,
  TError = AxiosError
>(
  url: string,
  options?: UseMutationOptions<
    AxiosResponse<ApiResponse<TData>>,
    TError,
    TVariables
  >,
  config?: AxiosRequestConfig
) {
  return useMutation<AxiosResponse<ApiResponse<TData>>, TError, TVariables>({
    mutationFn: (variables) =>
      api.post<ApiResponse<TData>>(url, variables, config),
    onSuccess: () => {
      // You can add specific cache invalidation here if needed
    },
    ...options,
  });
}
