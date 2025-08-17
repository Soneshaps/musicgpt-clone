import { CreateAnythingTool } from "./tools/create-anything-tool";
import { FormActions } from "./tools/form-actions";
import { TextToSpeechTool } from "./tools/text-to-speech-tool";
import { ToolType } from "./music-gpt-interface";
import { useState, useCallback } from "react";
import CreateAnythingActions from "./tools/action/create-anything-actions";
import { ToolsDropdown } from "./common/dropdown/tools-dropdown";
import { useCreateAnythingTool } from "@/hooks/useCreateAnythingTool";
import { useTextToSpeechTool } from "@/hooks/useTextToSpeechTool";
import { AutoHeightMotion } from "./common/AutoHeightMotion";
import { twclsx } from "@/utils/twclsx";

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
    selectedFile,
    handleFileChange,
    handleFileRemove,
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
    <div
      className={twclsx(
        "relative z-10 w-full rounded-[27px] bg-[#272A2E] transition duration-200 opacity-90",
        {
          "pb-[50px]": selectedTool !== ToolType.TEXT_TO_SPEECH,
        }
      )}
    >
      <form onSubmit={() => {}}>
        <AutoHeightMotion dependency={[selectedTool, activeMode]}>
          <div className={"transition-all duration-500 ease-in-out"}>
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

          <div className={"transition-all duration-500 ease-in-out"}>
            {selectedTool === ToolType.CREATE_ANYTHING && (
              <CreateAnythingTool
                prompt={createAnythingPrompt}
                lyrics={lyrics}
                activeMode={activeMode}
                selectedFile={selectedFile}
                onPromptChange={handlePromptChange}
                onLyricsChange={handleLyricsChange}
                onFileRemove={handleFileRemove}
                onSubmitReady={handleCreateAnythingSubmitReady}
              />
            )}
          </div>
        </AutoHeightMotion>
        <div className="px-5">
          {selectedTool === ToolType.CREATE_ANYTHING && (
            <div className="absolute bottom-3 left-3">
              <CreateAnythingActions
                activeMode={activeMode}
                onFileChange={handleFileChange}
                handleModeToggle={setActiveMode}
                selectedFile={selectedFile}
              />
            </div>
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
      </form>
    </div>
  );
};

export default PromptBox;
