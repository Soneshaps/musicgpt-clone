"use client";

import {
  useRef,
  FC,
  ChangeEvent,
  useState,
  useEffect,
  useCallback,
} from "react";
import { Textarea } from "../common/input/textarea";
import { VoiceAvatar } from "@/components/common/voice-avatar";
import { LanguageDropdown } from "@/components/common/dropdown/language-dropdown";
import { Search } from "lucide-react";
import VoiceSkeleton from "@/components/common/skeletons/voice-skeleton";
import Image from "next/image";
import { useVoices } from "@/hooks/useVoicesApi";
import { useCreateSpeechRequest } from "@/hooks/useSpeechRequestApi";
import { showToast, toastMessages } from "@/utils/toast-utils";
import { languages } from "@/constants";
import { Voice } from "@/types/api";

interface TextToSpeechToolProps {
  prompt: string;
  onPromptChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  selectedVoice?: Voice | null;
  onVoiceSelect?: (voice: Voice | null) => void;
  onSubmitReady?: (submitFn: () => Promise<void>) => void;
}

export const TextToSpeechTool: FC<TextToSpeechToolProps> = ({
  prompt,
  onPromptChange,
  selectedVoice,
  onVoiceSelect,
  onSubmitReady,
}) => {
  const [searchInputValue, setSearchInputValue] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [allVoices, setAllVoices] = useState<Voice[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [isPaginationLoading, setIsPaginationLoading] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<{
    value: string;
    label: string;
    flag: string;
  }>(languages[0]);

  const { mutateAsync: createSpeechRequest } = useCreateSpeechRequest();

  useEffect(() => {
    setIsSearching(true);
    const timer = setTimeout(() => {
      setSearchQuery(searchInputValue);
      setIsSearching(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchInputValue]);

  const observerRef = useRef<IntersectionObserver | null>(null);

  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const {
    data: voicesData,
    isLoading: loading,
    isFetching,
  } = useVoices({
    page: currentPage,
    limit: 12,
    language:
      selectedLanguage.value === "All Languages"
        ? undefined
        : selectedLanguage.value,
    searchQuery: searchQuery,
  });

  const lastVoiceCallback = useCallback(
    (node: HTMLDivElement | null) => {
      if (!node) return;

      if (observerRef.current) {
        observerRef.current.disconnect();
      }

      const observer = new IntersectionObserver(
        (entries) => {
          if (
            entries[0].isIntersecting &&
            hasMore &&
            !loading &&
            !isFetching &&
            currentPage > 0
          ) {
            setIsPaginationLoading(true);

            setTimeout(() => {
              setCurrentPage((prev) => prev + 1);
            }, 500);
          }
        },
        {
          root: scrollContainerRef.current,
          threshold: 0.5,
          rootMargin: "0px",
        }
      );

      observer.observe(node);
      observerRef.current = observer;

      return () => {
        observer.disconnect();
      };
    },
    [hasMore, loading, isFetching, currentPage, scrollContainerRef]
  );

  useEffect(() => {
    setCurrentPage(1);
    setAllVoices([]);
    setHasMore(true);

    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }
  }, [selectedLanguage, searchQuery]);

  useEffect(() => {
    if (!voicesData) return;

    setIsPaginationLoading(false);

    if (currentPage === 1) {
      setAllVoices(voicesData.voices);
    } else {
      setAllVoices((prev) => {
        const existingIds = new Set(prev.map((voice) => voice.id));
        const newVoices = voicesData.voices.filter(
          (voice) => !existingIds.has(voice.id)
        );
        return [...prev, ...newVoices];
      });
    }

    const { pagination } = voicesData;
    const moreAvailable = pagination.page < pagination.pages;
    setHasMore(moreAvailable);
  }, [voicesData, currentPage]);

  const voices = allVoices;

  const handleVoiceClick = (voice: Voice) => {
    onVoiceSelect?.(voice);
  };

  const handleSubmit = async () => {
    if (!prompt.trim()) {
      showToast.error(toastMessages.validation.promptRequired);
      return;
    }

    let loadingToast: string | undefined;
    try {
      loadingToast = showToast.loading(toastMessages.textToSpeech.loading);

      await createSpeechRequest({
        prompt: prompt,
        type: "text-to-speech",
        voiceId: selectedVoice?.id,
      });

      showToast.dismiss(loadingToast);
      showToast.success(toastMessages.textToSpeech.success);
    } catch (error) {
      if (loadingToast) {
        showToast.dismiss(loadingToast);
      }
      showToast.error(toastMessages.textToSpeech.error || error);
    }
  };

  useEffect(() => {
    if (onSubmitReady) {
      onSubmitReady(handleSubmit);
    }
  }, [onSubmitReady, prompt, selectedVoice]);

  const renderVoiceContent = () => {
    if ((loading && currentPage === 1) || isSearching) {
      return <VoiceSkeleton />;
    }

    if (voices.length === 0 && !loading && !isSearching) {
      return (
        <div className="col-span-4 flex flex-col items-center justify-center py-8 text-center">
          <div className="mb-2 text-sm text-neutral-sub-text">
            No voices found
          </div>
          {searchQuery ? (
            <div className="text-xs text-neutral-sub-text">
              No voices found matching &quot;{searchQuery}&quot;.
              <br />
              Try a different search term or clear the filter.
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

    return (
      <>
        {voices.map((voice, index) => {
          const isLast = index === voices.length - 1;
          return (
            <div
              key={`${voice?.id || voice?.name}-${index}`}
              ref={isLast ? lastVoiceCallback : undefined}
            >
              <VoiceAvatar
                name={voice?.name}
                isSelected={selectedVoice?.name === voice?.name}
                onClick={() => onVoiceSelect?.(voice)}
              />
            </div>
          );
        })}

        {isPaginationLoading && <VoiceSkeleton />}
      </>
    );
  };

  return (
    <div className="flex h-full w-full flex-col justify-between gap-6 p-5 pb-0 sm:flex-row">
      <div className="hidden min-w-0 flex-col gap-4 sm:flex">
        <div className="flex gap-3">
          <div className="relative flex w-[222px]">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-sub-text" />
            <input
              type="text"
              placeholder="Search voices"
              value={searchInputValue}
              onChange={(e) => setSearchInputValue(e.target.value)}
              className="block w-full text-[13px] rounded-full bg-[#1b2125] pl-11 pr-[10px] h-[44px] text-pure-white placeholder:text-neutral-sub-text border-1 border-neutral-hover"
            />
          </div>
          <LanguageDropdown
            selectedLanguage={selectedLanguage}
            onLanguageChange={setSelectedLanguage}
          />
        </div>

        <div
          ref={scrollContainerRef}
          className="grid max-h-48 min-h-48 grid-cols-3 md:grid-cols-4 gap-y-[15px] gap-x-[10px] overflow-y-auto pt-[10px] pb-[20px] transition-all duration-200 ease-in-out scroll-fade-mask relative hide-scrollbar"
          style={{ willChange: "transform" }}
        >
          {renderVoiceContent()}
        </div>
      </div>

      <div className="flex w-full flex-col gap-1 sm:w-1/3">
        <div className="flex items-center gap-4">
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
            className="px-0 pretty-scrollbar-2"
          />
        </div>
      </div>
    </div>
  );
};
