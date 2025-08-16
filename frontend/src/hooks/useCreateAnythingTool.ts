import { CreateAnythingMode } from "@/components/tools/create-anything-tool";
import { ChangeEvent, useCallback, useState } from "react";

export const useCreateAnythingTool = () => {
  const [activeMode, setActiveMode] = useState<CreateAnythingMode | null>(null);

  const [createAnythingPrompt, setCreateAnythingPrompt] = useState<string>("");
  const [lyrics, setLyrics] = useState<string>("");
  const [createAnythingSubmit, setCreateAnythingSubmit] = useState<
    (() => Promise<void>) | null
  >(null);

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
  };
};
