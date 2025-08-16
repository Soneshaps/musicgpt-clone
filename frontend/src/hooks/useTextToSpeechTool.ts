import { Voice } from "@/components/tools/text-to-speech-tool";
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

  return {
    textToSpeechPrompt,
    handleTextToSpeechPromptChange,
    textToSpeechSubmit,
    setTextToSpeechSubmit,
    selectedVoice,
    setSelectedVoice,
  };
};
