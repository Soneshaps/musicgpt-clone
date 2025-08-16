import { CreateAnythingTool, SongMode } from "./tools/create-anything-tool";
import { FormActions } from "./tools/form-actions";
import { TextToSpeechTool, Voice } from "./tools/text-to-speech-tool";
import { ToolType } from "./music-gpt-interface";
import { ChangeEvent, useState, useCallback } from "react";
import { twclsx } from "@/utils/twclsx";
import CreateAnythingActions from "./tools/action/create-anything-actions";
import { ToolsDropdown } from "./common/dropdown/tools-dropdown";

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
    setIsLoading(true);
    try {
      if (selectedTool === ToolType.TEXT_TO_SPEECH && textToSpeechSubmit) {
        await textToSpeechSubmit();
      }
    } catch (error) {
      console.error("Error submitting text to speech:", error);
    } finally {
      setIsLoading(false);
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
            {selectedTool === ToolType.CREATE_ANYTHING && (
              <CreateAnythingActions
                activeMode={activeMode}
                handleFileButtonClick={() => {
                  console.log("File button clicked");
                }}
                onFileChange={() => {
                  console.log("File changed");
                }}
                handleModeToggle={setActiveMode}
              />
            )}
            <div className="absolute bottom-3 right-3">
              <div className="flex gap-3">
                <ToolsDropdown
                  onToolChange={setSelectedTool}
                  selectedTool={selectedTool}
                />

                <FormActions
                  isButtonEnabled={
                    selectedTool === ToolType.TEXT_TO_SPEECH
                      ? Boolean(prompt.trim())
                      : true
                  }
                  isLoading={isLoading}
                  onSubmit={handleSubmit}
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PromptBox;
