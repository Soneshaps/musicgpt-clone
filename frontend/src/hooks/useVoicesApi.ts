"use client";

import { useGetQuery } from "@/utils/api-client";
import { ApiResponse, VoicesResponse } from "@/types/api";
import { AxiosError } from "axios";

export interface UseVoicesParams {
  page?: number;
  limit?: number;
  language?: string;
  searchQuery?: string;
}

/**
 * Hook for fetching voices with optional pagination, filtering, and search
 */
export const useVoices = ({
  page = 1,
  limit = 15,
  language,
  searchQuery,
}: UseVoicesParams = {}) => {
  // Build URL with query parameters
  let url;

  // Use search endpoint if searchQuery is provided
  if (searchQuery && searchQuery.trim() !== "") {
    url = `/voices/search?query=${encodeURIComponent(
      searchQuery
    )}&page=${page}&limit=${limit}`;
    if (language && language !== "All Languages") {
      url += `&language=${language.toLowerCase()}`;
    }
  } else {
    // Use regular endpoint if no search query
    url = `/voices?page=${page}&limit=${limit}`;
    if (language && language !== "All Languages") {
      url += `&language=${language.toLowerCase()}`;
    }
  }

  // Create query key that includes all parameters
  const queryKey = ["voices", { page, limit, language, searchQuery }];

  // We'll use this query key for both initial and subsequent pages

  // Use the getQuery hook from our API client
  // Get the data using our custom hook without custom options
  return useGetQuery<VoicesResponse>(queryKey, url);
};
