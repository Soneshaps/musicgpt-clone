import { CreateAnythingTool, SongMode } from "./tools/create-anything-tool";
import { FormActions } from "./tools/form-actions";
import { TextToSpeechTool } from "./tools/text-to-speech-tool";
import { ToolType } from "./music-gpt-interface";
import { useState } from "react";
import { twclsx } from "@/utils/twclsx";

const PromptBox = ({
  selectedTool,
  setSelectedTool,
}: {
  selectedTool: ToolType;
  setSelectedTool: (tool: ToolType) => void;
}) => {
  const [activeMode, setActiveMode] = useState<SongMode | null>(null);
  return (
    <div className="relative z-10 w-full rounded-[27px] bg-[#272A2E] shadow-lg backdrop-blur-sm transition duration-200">
      <form onSubmit={() => {}} className="overflow-hidden pb-4">
        <div className="px-5 pt-5">
          <div
            className={twclsx("transition-all duration-500 ease-in-out ", {
              "translate-x-0 opacity-100":
                selectedTool === ToolType.TEXT_TO_SPEECH,
              "pointer-events-none absolute inset-0 -translate-x-full opacity-0":
                selectedTool !== ToolType.TEXT_TO_SPEECH,
            })}
          >
            {selectedTool === ToolType.TEXT_TO_SPEECH && (
              <TextToSpeechTool
                prompt={"asd"}
                onPromptChange={() => {}}
                selectedVoice={null}
                onVoiceSelect={() => {}}
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
                prompt={"asd"}
                lyrics={"asd"}
                activeMode={activeMode}
                onPromptChange={() => {}}
                onLyricsChange={() => {}}
              />
            )}
          </div>

          <FormActions
            activeMode={activeMode}
            selectedTool={selectedTool}
            isButtonEnabled={true}
            isLoading={false}
            onModeToggle={setActiveMode}
            onToolChange={setSelectedTool}
            onFileChange={() => {}}
            onSubmit={() => {}}
          />
        </div>
      </form>
    </div>
  );
};

export default PromptBox;
