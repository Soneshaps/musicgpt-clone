"use client";

import { usePostMutation } from "@/utils/api-client";
import { ApiResponse } from "@/types/api";
import { ToolType } from "@/components/music-gpt-interface";

export interface SpeechRequest {
  prompt: string;
  type: "text-to-speech" | "create-anything";
  lyrics?: string;
  songMode?: "lyrics" | "instrumental";
  fileUrl?: string;
  voiceId?: string;
}

export interface SpeechRequestResponse {
  id: string;
  prompt: string;
  type: string;
  lyrics?: string;
  songMode?: string;
  fileUrl?: string;
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
