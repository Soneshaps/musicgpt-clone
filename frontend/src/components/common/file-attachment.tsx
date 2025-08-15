import { FC } from "react";
import { X, FileAudio } from "lucide-react";
import { twclsx } from "@/utils/twclsx";

interface FileAttachmentProps {
  file: File;
  onRemove: () => void;
  className?: string;
}

export const FileAttachment: FC<FileAttachmentProps> = ({
  file,
  onRemove,
  className,
}) => {
  return (
    <div
      className={twclsx(
        "flex items-center gap-3 rounded-lg border border-neutral-hover bg-neutral-hover/50 px-3 py-2 backdrop-blur-sm",
        className,
      )}
    >
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-500/20">
        <FileAudio className="h-4 w-4 text-blue-400" />
      </div>

      <div className="min-w-0 flex-1">
        <div className="truncate text-sm font-medium text-neutral-light">
          {file.name}
        </div>
      </div>

      <button
        onClick={onRemove}
        className="group flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-neutral-hover transition-colors duration-200 hover:bg-red-500/20"
        type="button"
        aria-label="Remove file"
      >
        <X className="h-4 w-4 text-neutral-sub-text transition-colors duration-200 group-hover:text-red-400" />
      </button>
    </div>
  );
};
