import { CreateAnythingTool, SongMode } from "./tools/create-anything-tool";
import { FormActions } from "./tools/form-actions";
import { TextToSpeechTool, Voice } from "./tools/text-to-speech-tool";
import { ToolType } from "./music-gpt-interface";
import { ChangeEvent, useState, useCallback } from "react";
import { twclsx } from "@/utils/twclsx";

const PromptBox = ({
  selectedTool,
  setSelectedTool,
}: {
  selectedTool: ToolType;
  setSelectedTool: (tool: ToolType) => void;
}) => {
  const [activeMode, setActiveMode] = useState<SongMode | null>(null);
  const [prompt, setPrompt] = useState<string>("");
  const [lyrics, setLyrics] = useState<string>("");
  const [selectedVoice, setSelectedVoice] = useState<Voice | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [textToSpeechSubmit, setTextToSpeechSubmit] = useState<
    (() => Promise<void>) | null
  >(null);

  const handlePromptChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(e.target.value);
  };

  const handleLyricsChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setLyrics(e.target.value);
  };

  const handleSubmitReady = useCallback((submitFn: () => Promise<void>) => {
    setTextToSpeechSubmit(() => submitFn);
  }, []);

  const handleSubmit = async () => {
    if (selectedTool === ToolType.TEXT_TO_SPEECH && textToSpeechSubmit) {
      setIsLoading(true);
      try {
        await textToSpeechSubmit();
      } catch (error) {
        console.error("Error submitting text to speech:", error);
      } finally {
        setIsLoading(false);
      }
    } else if (selectedTool === ToolType.CREATE_ANYTHING) {
      // Handle create anything submission logic here
      console.log("Create anything submitted:", { prompt, lyrics, activeMode });
    }
  };

  return (
    <div className="relative z-10 w-full rounded-[27px] bg-[#272A2E] shadow-lg backdrop-blur-sm transition duration-200">
      <form onSubmit={() => {}} className="overflow-hidden pb-4">
        <div className="">
          <div
            className={twclsx(
              "transition-all duration-500 ease-in-out px-5 pt-5",
              {
                "translate-x-0 opacity-100":
                  selectedTool === ToolType.TEXT_TO_SPEECH,
                "pointer-events-none absolute inset-0 -translate-x-full opacity-0":
                  selectedTool !== ToolType.TEXT_TO_SPEECH,
              }
            )}
          >
            {selectedTool === ToolType.TEXT_TO_SPEECH && (
              <TextToSpeechTool
                prompt={prompt}
                onPromptChange={handlePromptChange}
                selectedVoice={selectedVoice}
                onVoiceSelect={setSelectedVoice}
                onSubmitReady={handleSubmitReady}
              />
            )}
          </div>

          <div
            className={twclsx("transition-all duration-500 ease-in-out", {
              "translate-x-0 opacity-100":
                selectedTool == ToolType.CREATE_ANYTHING,
              "pointer-events-none absolute inset-0 translate-x-full opacity-0":
                selectedTool !== ToolType.CREATE_ANYTHING,
            })}
          >
            {selectedTool === ToolType.CREATE_ANYTHING && (
              <CreateAnythingTool
                prompt={prompt}
                lyrics={lyrics}
                activeMode={activeMode}
                onPromptChange={handlePromptChange}
                onLyricsChange={handleLyricsChange}
              />
            )}
          </div>

          <div className="px-5">
            <FormActions
              activeMode={activeMode}
              selectedTool={selectedTool}
              isButtonEnabled={
                selectedTool === ToolType.TEXT_TO_SPEECH
                  ? Boolean(prompt.trim())
                  : true
              }
              isLoading={isLoading}
              onModeToggle={setActiveMode}
              onToolChange={setSelectedTool}
              onFileChange={() => {}}
              onSubmit={handleSubmit}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default PromptBox;
