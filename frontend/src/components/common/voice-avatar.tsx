import { twclsx } from "@/utils/twclsx";
import { FC, useState } from "react";
import Image from "next/image";

interface VoiceAvatarProps {
  name: string;
  isSelected?: boolean;
  onClick?: () => void;
  className?: string;
  hideName?: boolean;
  size?: number;
  showPlayButton?: boolean;
}

export const VoiceAvatar: FC<VoiceAvatarProps> = ({
  name,
  isSelected = false,
  onClick,
  className = "",
  hideName = false,
  size,
  showPlayButton = true,
}) => {
  const firstLetter = name.charAt(0).toUpperCase();
  const lastname = name.split(" ")[1]?.charAt(0).toUpperCase();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={twclsx(
        "flex cursor-pointer flex-col items-center gap-2 transition-all duration-200",
        {
          "scale-105": isSelected,
          // "hover:scale-105": !isSelected,
        },
        className
      )}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        style={{ width: size, height: size }}
        className={twclsx(
          "flex h-[46px] w-[46px] items-center justify-center rounded-full border-2 border-transparent text-base font-medium transition-all duration-200 relative",
          {
            " bg-neutral-light text-neutral-black circle": isSelected,
            "bg-neutral-hover text-neutral-light hover:bg-neutral-light/20":
              !isSelected,
          }
        )}
      >
        {firstLetter}
        {lastname}

        {showPlayButton && isHovered && (
          <div className="absolute -bottom-1 -right-2 flex items-center justify-center h-6 w-6 rounded-full drop-shadow-lg border-2 border-neutral-base bg-white">
            <Image
              src="/svg/icon-control-play-gray.svg"
              alt="Play"
              width={16}
              height={16}
            />
          </div>
        )}
      </div>
      {!hideName && (
        <span className="text-center text-sm text-neutral-sub-text w-[85px] overflow-hidden text-ellipsis whitespace-nowrap">
          {name.length > 10 ? `${name.substring(0, 10)}...` : name}
        </span>
      )}
    </div>
  );
};
