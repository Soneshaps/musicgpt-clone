import { CreateAnythingTool } from "./tools/create-anything-tool";
import { FormActions } from "./tools/form-actions";
import { TextToSpeechTool } from "./tools/text-to-speech-tool";
import { ToolType } from "./music-gpt-interface";
import { useState, useCallback } from "react";
import { twclsx } from "@/utils/twclsx";
import CreateAnythingActions from "./tools/action/create-anything-actions";
import { ToolsDropdown } from "./common/dropdown/tools-dropdown";
import { useCreateAnythingTool } from "@/hooks/useCreateAnythingTool";
import { useTextToSpeechTool } from "@/hooks/useTextToSpeechTool";

const PromptBox = ({
  selectedTool,
  setSelectedTool,
}: {
  selectedTool: ToolType;
  setSelectedTool: (tool: ToolType) => void;
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    activeMode,
    setActiveMode,
    createAnythingPrompt,
    handlePromptChange,
    lyrics,
    handleLyricsChange,
    createAnythingSubmit,
    handleCreateAnythingSubmitReady,
  } = useCreateAnythingTool();

  const {
    textToSpeechPrompt,
    handleTextToSpeechPromptChange,
    textToSpeechSubmit,
    setTextToSpeechSubmit,
    selectedVoice,
    setSelectedVoice,
  } = useTextToSpeechTool();

  const handleTextToSpeechSubmitReady = useCallback(
    (submitFn: () => Promise<void>) => {
      setTextToSpeechSubmit(() => submitFn);
    },
    []
  );

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      if (selectedTool === ToolType.TEXT_TO_SPEECH && textToSpeechSubmit) {
        await textToSpeechSubmit();
      }
      if (selectedTool === ToolType.CREATE_ANYTHING && createAnythingSubmit) {
        await createAnythingSubmit();
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
                prompt={textToSpeechPrompt}
                onPromptChange={handleTextToSpeechPromptChange}
                selectedVoice={selectedVoice}
                onVoiceSelect={setSelectedVoice}
                onSubmitReady={handleTextToSpeechSubmitReady}
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
                prompt={createAnythingPrompt}
                lyrics={lyrics}
                activeMode={activeMode}
                onPromptChange={handlePromptChange}
                onLyricsChange={handleLyricsChange}
                onSubmitReady={handleCreateAnythingSubmitReady}
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
                      ? Boolean(textToSpeechPrompt.trim())
                      : selectedTool === ToolType.CREATE_ANYTHING
                      ? Boolean(createAnythingPrompt.trim())
                      : false
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
