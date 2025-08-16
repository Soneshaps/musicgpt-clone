"use client";

import { usePostMutation } from "@/utils/api-client";
import { ApiResponse } from "@/types/api";

export interface SpeechRequest {
  prompt: string;
  type: "text-to-speech" | "song" | "podcast" | "story";
  lyrics?: string;
  voiceId?: string;
}

export interface SpeechRequestResponse {
  id: string;
  prompt: string;
  type: string;
  lyrics?: string;
  status: string;
  voiceId?: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Hook for creating a speech request
 */
export const useCreateSpeechRequest = () => {
  return usePostMutation<SpeechRequestResponse, SpeechRequest>(
    "/speech-requests",
    {
      // When successfully created
      onSuccess: (response) => {
        console.log("Speech request created:", response.data.data);
      },
      // On error
      onError: (error) => {
        console.error("Error creating speech request:", error);
      },
    }
  );
};

