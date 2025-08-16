"use client";

import { useGetQuery } from "@/utils/api-client";
import { ApiResponse, VoicesResponse } from "@/types/api";

export interface UseVoicesParams {
  page?: number;
  limit?: number;
  language?: string;
}

/**
 * Hook for fetching voices with optional pagination and filtering
 */
export const useVoices = ({
  page = 1,
  limit = 15,
  language,
}: UseVoicesParams = {}) => {
  // Build URL with query parameters
  let url = `/voices?page=${page}&limit=${limit}`;
  if (language && language !== "All Languages") {
    url += `&language=${language.toLowerCase()}`;
  }

  // Create query key that includes all parameters
  const queryKey = ["voices", { page, limit, language }];

  // We'll use this query key for both initial and subsequent pages

  // Use the getQuery hook from our API client
  return useGetQuery<VoicesResponse>(queryKey, url, {
    // Keep previous data while loading new data
    keepPreviousData: true,
    // Refetch when query parameters change
    refetchOnMount: true,
    // Handle errors
    onError: (error) => {
      console.error("Error fetching voices:", error);
    },
    // Lower stale time for quicker refreshes
    staleTime: 1000 * 60, // 1 minute
    // Don't refetch on window focus for smoother UX
    refetchOnWindowFocus: false,
  });
};
