import { twclsx } from "@/utils/twclsx";
import { FC } from "react";

interface VoiceAvatarProps {
  name: string;
  isSelected?: boolean;
  onClick?: () => void;
  className?: string;
  hideName?: boolean;
  size?: number;
}

export const VoiceAvatar: FC<VoiceAvatarProps> = ({
  name,
  isSelected = false,
  onClick,
  className = "",
  hideName = false,
  size,
}) => {
  const firstLetter = name.charAt(0).toUpperCase();

  return (
    <div
      className={twclsx(
        "flex cursor-pointer flex-col items-center gap-2 transition-all duration-200",
        {
          "scale-105": isSelected,
          "hover:scale-105": !isSelected,
        },
        className,
      )}
      onClick={onClick}
    >
      <div
        style={{ width: size, height: size }}
        className={twclsx(
          "flex h-12 w-12 items-center justify-center rounded-full border-2 border-transparent text-xl font-medium transition-all duration-200",
          {
            "border-orange-purple bg-neutral-light text-neutral-black ":
              isSelected,
            "bg-neutral-hover text-neutral-light hover:bg-neutral-light/20":
              !isSelected,
          },
        )}
      >
        {firstLetter}
      </div>
      {!hideName && (
        <span className="text-center text-body-small text-neutral-sub-text">
          {name.length > 12 ? `${name.substring(0, 12)}...` : name}
        </span>
      )}
    </div>
  );
};
