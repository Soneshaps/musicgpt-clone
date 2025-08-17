import { Voice } from "@/types/api";
import { ChangeEvent, useState } from "react";

export const useTextToSpeechTool = () => {
  const [textToSpeechPrompt, setTextToSpeechPrompt] = useState<string>("");

  const [textToSpeechSubmit, setTextToSpeechSubmit] = useState<
    (() => Promise<void>) | null
  >(null);

  const [selectedVoice, setSelectedVoice] = useState<Voice | null>(null);

  const handleTextToSpeechPromptChange = (
    e: ChangeEvent<HTMLTextAreaElement>
  ) => {
    setTextToSpeechPrompt(e.target.value);
  };

  const resetState = () => {
    setTextToSpeechPrompt("");
    setTextToSpeechSubmit(null);
    setSelectedVoice(null);
  };

  return {
    textToSpeechPrompt,
    handleTextToSpeechPromptChange,
    textToSpeechSubmit,
    setTextToSpeechSubmit,
    selectedVoice,
    setSelectedVoice,
    resetState,
  };
};
