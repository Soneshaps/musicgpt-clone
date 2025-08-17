import { CreateAnythingMode } from "@/components/tools/create-anything-tool";
import { ChangeEvent, useCallback, useState } from "react";

export const useCreateAnythingTool = () => {
  const [activeMode, setActiveMode] = useState<CreateAnythingMode | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [createAnythingPrompt, setCreateAnythingPrompt] = useState<string>("");
  const [lyrics, setLyrics] = useState<string>("");
  const [createAnythingSubmit, setCreateAnythingSubmit] = useState<
    (() => Promise<void>) | null
  >(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate that it's an audio file
      if (!file.type.startsWith("audio/")) {
        alert("Please select an audio file");
        return;
      }
      setSelectedFile(file);
    }
  };

  const handleFileRemove = useCallback(() => {
    setSelectedFile(null);
    // Reset the file input value so the same file can be selected again
    if (typeof window !== "undefined") {
      const fileInputs = document.querySelectorAll('input[type="file"]');
      fileInputs.forEach((input) => {
        (input as HTMLInputElement).value = "";
      });
    }
  }, []);

  const handlePromptChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setCreateAnythingPrompt(e.target.value);
  };

  const handleLyricsChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setLyrics(e.target.value);
  };

  const handleCreateAnythingSubmitReady = useCallback(
    (submitFn: () => Promise<void>) => {
      setCreateAnythingSubmit(() => submitFn);
    },
    []
  );

  return {
    activeMode,
    setActiveMode,
    createAnythingPrompt,
    handlePromptChange,
    lyrics,
    handleLyricsChange,
    createAnythingSubmit,
    handleCreateAnythingSubmitReady,
    selectedFile,
    handleFileChange,
    handleFileRemove,
  };
};
