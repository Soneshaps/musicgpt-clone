"use client";

import {
  useRef,
  useCallback,
  FC,
  ChangeEvent,
  useEffect,
  useState,
} from "react";
import { Textarea } from "../common/input/textarea";
import { VoiceAvatar } from "@/components/common/voice-avatar";
import { LanguageDropdown } from "@/components/common/dropdown/language-dropdown";
import { Search } from "lucide-react";
import VoiceSkeleton from "@/components/common/skeletons/voice-skeleton";
import Image from "next/image";

export interface Voice {
  name: string;
  language: string;
}

interface TextToSpeechToolProps {
  prompt: string;
  onPromptChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  selectedVoice?: Voice | null;
  onVoiceSelect?: (voice: Voice | null) => void;
}

export const languages = [
  {
    value: "All Languages",
    label: "All",
    flag: "🌐",
  },
  {
    value: "English",
    label: "English",
    flag: "🇺🇸",
  },
  {
    value: "Indian",
    label: "Indian",
    flag: "🇮🇳",
  },
  {
    value: "Nepali",
    label: "Nepali",
    flag: "🇳🇵",
  },
];

export const VOICES_DATA: Voice[] = [
  { name: "Emma Watson", language: "english" },
  { name: "Morgan Freeman", language: "english" },
  { name: "Scarlett Johansson", language: "english" },
  { name: "Tom Hanks", language: "english" },
  { name: "Jennifer Lawrence", language: "english" },
  { name: "Leonardo DiCaprio", language: "english" },
  { name: "Meryl Streep", language: "english" },
  { name: "Brad Pitt", language: "english" },
  { name: "Angelina Jolie", language: "english" },
  { name: "Johnny Depp", language: "english" },

  { name: "Narayan Gopal", language: "nepali" },
  { name: "Ambar Gurung", language: "nepali" },
  { name: "Tara Devi", language: "nepali" },
  { name: "Kumar Basnet", language: "nepali" },
  { name: "Sabin Rai", language: "nepali" },
  { name: "Deepak Bajracharya", language: "nepali" },
  { name: "Nepathya", language: "nepali" },
  { name: "Phiroj Shyangden", language: "nepali" },
  { name: "Adrian Pradhan", language: "nepali" },
  { name: "Swoopna Suman", language: "nepali" },

  { name: "Amitabh Bachchan", language: "indian" },
  { name: "Lata Mangeshkar", language: "indian" },
  { name: "Shah Rukh Khan", language: "indian" },
  { name: "Aishwarya Rai", language: "indian" },
  { name: "Priyanka Chopra", language: "indian" },
  { name: "Deepika Padukone", language: "indian" },
  { name: "Ranbir Kapoor", language: "indian" },
  { name: "Alia Bhatt", language: "indian" },
  { name: "Aamir Khan", language: "indian" },
  { name: "Kajol", language: "indian" },
];

export const TextToSpeechTool: FC<TextToSpeechToolProps> = ({
  prompt,
  onPromptChange,
  selectedVoice,
  onVoiceSelect,
}) => {
  const voices: Voice[] = VOICES_DATA;
  const loading = false;
  const isSearching = false;
  const searchQuery = "";

  const [selectedLanguage, setSelectedLanguage] = useState<{
    value: string;
    label: string;
    flag: string;
  }>(languages[0]);
  const currentPage = 1;
  const lastVoiceRef = useRef<HTMLDivElement>(null);

  console.log(selectedVoice);

  const handleVoiceClick = (voice: Voice) => {
    onVoiceSelect?.(voice);
  };

  const renderVoiceContent = () => {
    // Show skeleton during initial load or when search is being typed
    if (loading || isSearching) {
      return <VoiceSkeleton />;
    }
    // Show no results state
    if (voices.length === 0 && !loading && !isSearching) {
      return (
        <div className="col-span-4 flex flex-col items-center justify-center py-8 text-center">
          <div className="mb-2 text-sm text-neutral-sub-text">
            No voices found
          </div>
          {searchQuery ? (
            <div className="text-xs text-neutral-sub-text">
              No voices match &quot;{searchQuery}&quot;. Try a different search
              term or clear the filter.
            </div>
          ) : selectedLanguage.value !== "All Languages" ? (
            <div className="text-xs text-neutral-sub-text">
              No voices available for the selected language.
            </div>
          ) : (
            <div className="text-xs text-neutral-sub-text">
              No voices available at the moment.
            </div>
          )}
        </div>
      );
    }

    // Show voices
    return (
      <>
        {voices.map((voice, index) => {
          const isLast = index === voices?.length - 1;
          return (
            <div
              key={`${voice?.name}-${index}`}
              ref={isLast ? lastVoiceRef : undefined}
            >
              <VoiceAvatar
                name={voice?.name}
                isSelected={selectedVoice?.name === voice?.name}
                onClick={() => handleVoiceClick(voice)}
              />
            </div>
          );
        })}

        {loading && currentPage > 1 && (
          <div className="col-span-4 flex justify-center py-4">
            <div className="flex gap-2">
              {Array.from({ length: 3 })?.map((_, index) => (
                <div
                  key={index}
                  className="h-2 w-2 animate-bounce rounded-full bg-neutral-light"
                  style={{ animationDelay: `${index * 0.1}s` }}
                />
              ))}
            </div>
          </div>
        )}
      </>
    );
  };

  return (
    <div className="flex h-full w-full flex-col justify-between gap-6 p-5 pb-0 sm:flex-row">
      <div className="hidden min-w-0 flex-col gap-6 sm:flex">
        <div className="flex gap-3">
          <div className="relative flex w-[222px]">
            {isSearching ? (
              <div className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-neutral-sub-text border-t-neutral-light"></div>
              </div>
            ) : (
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-sub-text" />
            )}
            <input
              type="text"
              placeholder="Search voices"
              value={searchQuery}
              onChange={(e) => {}}
              className="block w-full text-[13px] rounded-full bg-neutral-hover pl-12 py-2 pr-10 text-pure-white transition-all duration-200 placeholder:text-neutral-sub-text"
            />
          </div>
          <LanguageDropdown
            selectedLanguage={selectedLanguage}
            onLanguageChange={setSelectedLanguage}
          />
        </div>

        {/* Using CSS mask for fade effect */}
        <div className="grid max-h-48 min-h-48 grid-cols-3 lg:grid-cols-4 gap-4 overflow-y-auto pt-1 transition-all duration-200 ease-in-out scrollbar-hide scroll-fade-mask">
          {renderVoiceContent()}
        </div>
      </div>

      <div className="flex w-full flex-col gap-1 sm:w-1/3">
        <div className="flex items-center gap-[10px]">
          {selectedVoice ? (
            <>
              <VoiceAvatar
                name={selectedVoice?.name || "Default Voice"}
                isSelected={true}
                hideName
                size={40}
                className="flex-row gap-2"
              />
              <span className="text-body-base font-semibold text-neutral-light">
                {selectedVoice?.name || "Default Voice"}
              </span>
            </>
          ) : (
            <>
              <div>
                <Image
                  loading="lazy"
                  src="https://musicgpt.s3.us-east-1.amazonaws.com/system_images/musicgpt-logo-on-dark-small-2.png"
                  alt="Default Voice"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              </div>
              <span className="text-body-base font-semibold text-neutral-light">
                Default Voice
              </span>
            </>
          )}
        </div>

        <div className="flex-1">
          <Textarea
            name="text-to-speech"
            id="text-to-speech"
            placeholder="Enter text"
            value={prompt}
            onChange={onPromptChange}
            autoResize={true}
            minHeight={80}
            maxHeight={150}
            className="px-0"
          />
        </div>
      </div>
    </div>
  );
};
