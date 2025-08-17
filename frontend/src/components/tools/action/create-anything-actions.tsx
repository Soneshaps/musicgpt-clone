import Button from "@/components/common/button/button";
import { Paperclip, AudioLines, Plus } from "lucide-react";
import { twclsx } from "@/utils/twclsx";
import { ChangeEvent, useRef } from "react";
import { ButtonVariants } from "@/components/common/button";
import { showToast } from "@/utils/toast-utils";
import { CreateAnythingMode } from "@/enums";

interface CreateAnythingActionsProps {
  activeMode: CreateAnythingMode | null;
  onFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleModeToggle: (mode: CreateAnythingMode | null) => void;
  selectedFile?: File | null;
}

const CreateAnythingActions = ({
  activeMode,
  onFileChange,
  handleModeToggle,
  selectedFile,
}: CreateAnythingActionsProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileButtonClick = () => {
    if (fileInputRef.current) {
      // Clear the input value first to ensure change event fires even for same file
      fileInputRef.current.value = "";
      fileInputRef.current.click();
    }
  };

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    onFileChange(e);
  };

  const handleModeToggleClick = (mode: CreateAnythingMode) => {
    if (activeMode === mode) {
      handleModeToggle(null);
      showToast.success("Mode disabled");
    } else {
      handleModeToggle(mode);
      showToast.success(
        `${
          mode === CreateAnythingMode.LYRICS ? "Lyrics" : "Instrumental"
        } mode enabled`
      );
    }
  };

  return (
    <div className="flex gap-2">
      <div className="relative">
        <input
          ref={fileInputRef}
          type="file"
          accept="audio/*"
          className="hidden"
          onChange={handleFileInputChange}
        />
        <Button
          variant={ButtonVariants.PRIMARY}
          onClick={handleFileButtonClick}
          type="button"
          className={twclsx(
            "relative transition-all duration-200",
            selectedFile && "border-white"
          )}
        >
          <Paperclip
            height={16}
            width={16}
            className={twclsx("transition-colors duration-200", {
              "text-neutral-light": !selectedFile,
            })}
          />
        </Button>
      </div>
      <Button
        variant={ButtonVariants.PRIMARY}
        className={twclsx("transform transition-all duration-300 ease-in-out", {
          "scale-105 border-neutral-light bg-neutral-light/20 shadow-lg hover:border-neutral-light hover:!bg-neutral-light/20":
            activeMode === CreateAnythingMode.INSTRUMENTAL,
          "hover:scale-105 active:scale-95":
            activeMode !== CreateAnythingMode.INSTRUMENTAL,
        })}
        onClick={() => handleModeToggleClick(CreateAnythingMode.INSTRUMENTAL)}
      >
        <AudioLines
          height={16}
          width={16}
          className={twclsx(
            "text-neutral-light transition-transform duration-200",
            {
              "scale-110": activeMode === CreateAnythingMode.INSTRUMENTAL,
              "scale-100": activeMode !== CreateAnythingMode.INSTRUMENTAL,
            }
          )}
        />
        <span className="hidden sm:inline">Instrumental</span>
      </Button>
      <Button
        variant={ButtonVariants.PRIMARY}
        className={twclsx("transform transition-all duration-300 ease-in-out", {
          "scale-105 border-neutral-light bg-neutral-light/20 shadow-lg hover:border-neutral-light hover:!bg-neutral-light/20":
            activeMode === CreateAnythingMode.LYRICS,
          "hover:scale-105 active:scale-95":
            activeMode !== CreateAnythingMode.LYRICS,
        })}
        onClick={() => handleModeToggleClick(CreateAnythingMode.LYRICS)}
      >
        <Plus
          height={16}
          width={16}
          className={twclsx(
            "text-neutral-light transition-transform duration-200",
            {
              "rotate-45": activeMode === CreateAnythingMode.LYRICS,
              "rotate-0": activeMode !== CreateAnythingMode.LYRICS,
            }
          )}
        />
        <span className="hidden sm:inline">Lyrics</span>
      </Button>
    </div>
  );
};

export default CreateAnythingActions;
