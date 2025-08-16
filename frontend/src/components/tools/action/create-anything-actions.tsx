import Button from "@/components/common/button/button";
import { Paperclip, AudioLines, Plus } from "lucide-react";
import { twclsx } from "@/utils/twclsx";
import { ToolType } from "@/components/music-gpt-interface";
import { SongMode } from "../create-anything-tool";
import { ChangeEvent, useRef } from "react";
import { ButtonVariants } from "@/components/common/button";

interface CreateAnythingActionsProps {
  activeMode: SongMode | null;
  handleFileButtonClick: () => void;
  onFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleModeToggle: (mode: SongMode) => void;
}

const CreateAnythingActions = ({
  activeMode,
  handleFileButtonClick,
  onFileChange,
  handleModeToggle,
}: CreateAnythingActionsProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex gap-2">
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
        <Paperclip height={16} width={16} className="text-neutral-light" />
      </Button>
      <Button
        variant={ButtonVariants.PRIMARY}
        className={twclsx("transform transition-all duration-300 ease-in-out", {
          "scale-105 border-neutral-light bg-neutral-light/20 shadow-lg hover:border-neutral-light hover:!bg-neutral-light/20":
            activeMode === SongMode.INSTRUMENTAL,
          "hover:scale-105 active:scale-95":
            activeMode !== SongMode.INSTRUMENTAL,
        })}
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
        className={twclsx("transform transition-all duration-300 ease-in-out", {
          "scale-105 border-neutral-light bg-neutral-light/20 shadow-lg hover:border-neutral-light hover:!bg-neutral-light/20":
            activeMode === SongMode.LYRICS,
          "hover:scale-105 active:scale-95": activeMode !== SongMode.LYRICS,
        })}
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
    </div>
  );
};

export default CreateAnythingActions;
