"use client";

import { twclsx } from "@/utils/twclsx";
import Dropdown from "./dropdown";
import { FC } from "react";
import { languages } from "@/components/tools/text-to-speech-tool";

interface LanguageDropdownProps {
  selectedLanguage: {
    value: string;
    label: string;
    flag: string;
  };
  onLanguageChange: (language: {
    value: string;
    label: string;
    flag: string;
  }) => void;
}

export const LanguageDropdown: FC<LanguageDropdownProps> = ({
  selectedLanguage,
  onLanguageChange,
}) => {
  const handleLanguageSelect = (value: {
    value: string;
    label: string;
    flag: string;
  }) => {
    onLanguageChange(value);
  };

  return (
    <Dropdown
      label={
        <div className="flex w-[140px] items-center gap-2">
          <span className="text-sm">{selectedLanguage.flag}</span>
          <span className="text-xs font-medium text-pure-white">
            {selectedLanguage.label}
          </span>
        </div>
      }
      className="group relative flex w-[140px] h-[44px] shrink-0 grow-0 select-none items-center justify-center gap-1 rounded-full border border-neutral-hover py-2 text-sm text-pure-white transition-all duration-200 ease-in-out hover:cursor-pointer"
      align="center"
    >
      {languages.map((option) => (
        <div
          key={option?.value}
          className={twclsx(
            "dropdown-item mb-1 flex cursor-pointer items-center gap-3 rounded-lg px-4 py-2 transition-all duration-150 hover:bg-neutral-hover",
            selectedLanguage.value === option?.value && "bg-neutral-hover"
          )}
          onClick={() => handleLanguageSelect(option)}
        >
          {option?.flag && <span className="text-base">{option?.flag}</span>}
          <span className="text-xs font-medium text-pure-white text-left">
            {option?.label}
          </span>
        </div>
      ))}
    </Dropdown>
  );
};
