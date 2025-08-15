import { Paperclip, AudioLines, Plus, ArrowRight, Loader2 } from "lucide-react";
import { ButtonVariants } from "@/components/common/button";
import Button from "@/components/common/button/button";
import { twclsx } from "@/utils/twclsx";
import { SongMode } from "./create-anything-tool";
import { ToolsDropdown } from "@/components/common/dropdown/tools-dropdown";
import { ChangeEvent, FC, useRef } from "react";
import { ToolType } from "../music-gpt-interface";

interface FormActionsProps {
  activeMode: SongMode | null;
  selectedTool: ToolType;
  isButtonEnabled: boolean;
  isLoading?: boolean;
  showModeButtons?: boolean;
  onModeToggle: (mode: SongMode | null) => void;
  onToolChange: (tool: ToolType) => void;
  onSubmit: () => void;
  onFileChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const FormActions: FC<FormActionsProps> = ({
  activeMode,
  selectedTool,
  isButtonEnabled,
  isLoading = false,
  onModeToggle,
  onToolChange,
  onSubmit,
  onFileChange,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleModeToggle = (mode: SongMode) => {
    if (mode === activeMode) {
      onModeToggle(null);
    } else {
      onModeToggle(mode);
    }
  };

  return (
    <div className="flex h-9 items-center justify-between">
      <div className="flex gap-2">
        {selectedTool === ToolType.CREATE_ANYTHING && (
          <>
            <Button
              variant={ButtonVariants.PRIMARY}
              onClick={handleFileButtonClick}
              type="button"
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="audio/*"
                className="hidden"
                onChange={onFileChange}
              />
              <Paperclip
                height={16}
                width={16}
                className="text-neutral-light"
              />
            </Button>
            <Button
              variant={ButtonVariants.PRIMARY}
              className={twclsx(
                "transform transition-all duration-300 ease-in-out",
                {
                  "scale-105 border-neutral-light bg-neutral-light/20 shadow-lg hover:border-neutral-light hover:!bg-neutral-light/20":
                    activeMode === SongMode.INSTRUMENTAL,
                  "hover:scale-105 active:scale-95":
                    activeMode !== SongMode.INSTRUMENTAL,
                }
              )}
              onClick={() => handleModeToggle(SongMode.INSTRUMENTAL)}
            >
              <AudioLines
                height={16}
                width={16}
                className={twclsx(
                  "text-neutral-light transition-transform duration-200",
                  {
                    "scale-110": activeMode === SongMode.INSTRUMENTAL,
                    "scale-100": activeMode !== SongMode.INSTRUMENTAL,
                  }
                )}
              />
              <span className="hidden sm:inline">Instrumental</span>
            </Button>
            <Button
              variant={ButtonVariants.PRIMARY}
              className={twclsx(
                "transform transition-all duration-300 ease-in-out",
                {
                  "scale-105 border-neutral-light bg-neutral-light/20 shadow-lg hover:border-neutral-light hover:!bg-neutral-light/20":
                    activeMode === SongMode.LYRICS,
                  "hover:scale-105 active:scale-95":
                    activeMode !== SongMode.LYRICS,
                }
              )}
              onClick={() => handleModeToggle(SongMode.LYRICS)}
            >
              <Plus
                height={16}
                width={16}
                className={twclsx(
                  "text-neutral-light transition-transform duration-200",
                  {
                    "rotate-45": activeMode === SongMode.LYRICS,
                    "rotate-0": activeMode !== SongMode.LYRICS,
                  }
                )}
              />
              <span className="hidden sm:inline">Lyrics</span>
            </Button>
          </>
        )}
      </div>
      <div className="flex gap-1">
        <ToolsDropdown
          onToolChange={onToolChange}
          selectedTool={selectedTool}
        />
        <Button
          type="button"
          className="relative h-9 w-9 overflow-hidden bg-neutral-base/50 !px-0 !py-0 transition-all duration-300 ease-in-out hover:scale-110"
          variant={ButtonVariants.PRIMARY}
          disabled={!isButtonEnabled || isLoading}
          onClick={onSubmit}
        >
          <div
            className={twclsx(
              "absolute inset-0 origin-center rounded-full bg-neutral-light transition-all duration-300 ease-in-out",
              {
                "scale-100": isButtonEnabled && !isLoading,
                "scale-0": !isButtonEnabled || isLoading,
              }
            )}
          ></div>
          <div
            className={twclsx(
              "absolute inset-0 origin-center rounded-full bg-neutral-light transition-all duration-300 ease-in-out",
              {
                "scale-100": isLoading,
                "scale-0": !isLoading,
              }
            )}
          ></div>
          {isLoading ? (
            <Loader2
              height={18}
              width={18}
              className="relative z-10 animate-spin text-neutral-black"
            />
          ) : (
            <ArrowRight
              height={20}
              width={20}
              className="relative z-10 text-neutral-black"
            />
          )}
        </Button>
      </div>
    </div>
  );
};
