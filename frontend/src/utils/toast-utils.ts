import toast from "react-hot-toast";

export const showToast = {
  success: (message: string) => toast.success(message),
  error: (message: string) => toast.error(message),
  loading: (message: string) => toast.loading(message),
  dismiss: (toastId: string) => toast.dismiss(toastId),
};

export const toastMessages = {
  speechRequest: {
    success: "Request submitted successfully! We'll process it soon.",
    error: "Failed to submit request. Please try again.",
    loading: "Processing your request...",
  },
  createAnything: {
    success: "Song creation request submitted! We'll process it soon.",
    error: "Failed to submit song creation request. Please try again.",
    loading: "Creating your song...",
  },
  textToSpeech: {
    success: "Text-to-speech request submitted! We'll process it soon.",
    error: "Failed to submit request. Please try again.",
    loading: "Converting text to speech...",
  },
  validation: {
    promptRequired: "Please describe your request first",
    lyricsRequired: "Please add lyrics for your song",
    fileRequired: "Please select an audio file",
  },
} as const;
