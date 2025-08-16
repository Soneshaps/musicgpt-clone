import { twclsx } from "@/utils/twclsx";
import { ChangeEvent, FC, useLayoutEffect, useRef } from "react";

interface TextareaProps {
  name?: string;
  id?: string;
  placeholder?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  className?: string;
  autoResize?: boolean;
  minHeight?: number;
  maxHeight?: number;
}

export const Textarea: FC<TextareaProps> = ({
  name,
  id,
  placeholder,
  value,
  onChange,
  className = "",
  autoResize = false,
  minHeight = 64,
  maxHeight = 200,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Use useLayoutEffect to calculate height before paint to prevent visual jumps
  useLayoutEffect(() => {
    if (autoResize && textareaRef.current) {
      const textarea = textareaRef.current;
      // Reset height to auto to get the correct scrollHeight
      textarea.style.height = "auto";

      // Calculate new height based on content
      const newHeight = Math.min(
        Math.max(textarea.scrollHeight, minHeight),
        maxHeight
      );
      textarea.style.height = `${newHeight}px`;
    }
  }, [value, autoResize, minHeight, maxHeight]);

  return (
    <textarea
      ref={textareaRef}
      name={name}
      id={id}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={twclsx(
        "block w-full resize-none bg-transparent p-5 text-left text-base leading-relaxed text-pure-white outline-none scrollbar-hide placeholder:text-neutral-sub-text",
        autoResize ? "" : "min-h-[120px]",
        className
      )}
    />
  );
};
