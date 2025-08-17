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
import { Search, CheckCircle2, AlertCircle } from "lucide-react";
import VoiceSkeleton from "@/components/common/skeletons/voice-skeleton";
import Image from "next/image";
import { useVoices } from "@/hooks/useVoicesApi";
import { useCreateSpeechRequest } from "@/hooks/useSpeechRequestApi";

// Local interface that matches component expectations
export interface Voice {
  id?: string;
  name: string;
  language: string;
}

interface TextToSpeechToolProps {
  prompt: string;
  onPromptChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  selectedVoice?: Voice | null;
  onVoiceSelect?: (voice: Voice | null) => void;
  onSubmitReady?: (submitFn: () => Promise<void>) => void;
}

export const languages = [
  {
    value: "All Languages",
    label: "All Languages",
    flag: "",
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

// Mock data removed - now using API

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // Create speech request mutation
  const { mutateAsync: createSpeechRequest } = useCreateSpeechRequest();

  // Search input handler with debounce
  useEffect(() => {
    setIsSearching(true);
    const timer = setTimeout(() => {
      setSearchQuery(searchInputValue);
      setIsSearching(false);
    }, 500); // 500ms debounce delay

    return () => clearTimeout(timer);
  }, [searchInputValue]);
  const [selectedLanguage, setSelectedLanguage] = useState<{
    value: string;
    label: string;
    flag: string;
  }>(languages[0]);

  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastVoiceRef = useRef<HTMLDivElement | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  // Fetch voices from API
  const {
    data: voicesData,
    isLoading: loading,
    error,
    isFetching,
  } = useVoices({
    page: currentPage,
    limit: 12, // Changed from 15 to 12
    language:
      selectedLanguage.value === "All Languages"
        ? undefined
        : selectedLanguage.value,
    searchQuery: searchQuery,
  });

  // Improved intersection observer setup
  const lastVoiceCallback = useCallback(
    (node: HTMLDivElement | null) => {
      if (!node) return;

      console.log("Setting up intersection observer on node");

      // Always disconnect previous observer before creating a new one
      if (observerRef.current) {
        observerRef.current.disconnect();
      }

      // Create a new intersection observer
      const observer = new IntersectionObserver(
        (entries) => {
          // If the last element is intersecting and we have more data to load
          if (
            entries[0].isIntersecting &&
            hasMore &&
            !loading &&
            !isFetching &&
            currentPage > 0
          ) {
            console.log("Last item intersected, loading more data");
            // Set loading state
            setIsPaginationLoading(true);

            // Load next page with a short delay
            setTimeout(() => {
              setCurrentPage((prev) => prev + 1);
            }, 500);
          }
        },
        {
          root: scrollContainerRef.current, // Only trigger when visible in the scroll container
          threshold: 0.5, // Element must be 50% visible to trigger
          rootMargin: "0px", // No extra margin
        }
      );

      // Start observing this node
      observer.observe(node);

      // Save the observer
      observerRef.current = observer;

      // Clean up the observer when the component unmounts
      return () => {
        observer.disconnect();
      };
    },
    [hasMore, loading, isFetching, currentPage, scrollContainerRef]
  );

  // Reset state when language or search query changes
  useEffect(() => {
    console.log("Language or search changed, resetting state");
    setCurrentPage(1);
    setAllVoices([]);
    setHasMore(true);

    // Clean up any existing observer
    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }
  }, [selectedLanguage, searchQuery]);

  // Log search events
  useEffect(() => {
    if (searchQuery) {
      console.log(`Searching for: "${searchQuery}"`);
    }
  }, [searchQuery]);

  // Simplified data handling
  useEffect(() => {
    if (!voicesData) return;

    // Reset loading state when new data arrives
    setIsPaginationLoading(false);

    console.log("Received voice data for page:", voicesData.pagination.page);
    console.log("Total pages:", voicesData.pagination.pages);
    console.log("Got", voicesData.voices.length, "voices");

    if (currentPage === 1) {
      // On first page, replace all voices
      console.log("Setting initial voices data");
      setAllVoices(voicesData.voices);
    } else {
      // On subsequent pages, append new voices
      console.log("Appending new voices");
      setAllVoices((prev) => {
        // Create a Set of existing IDs for faster lookup
        const existingIds = new Set(prev.map((voice) => voice.id));

        // Filter out duplicates
        const newVoices = voicesData.voices.filter(
          (voice) => !existingIds.has(voice.id)
        );
        console.log("Adding", newVoices.length, "new voices");

        // Return combined array
        return [...prev, ...newVoices];
      });
    }

    // Update hasMore flag
    const { pagination } = voicesData;
    const moreAvailable = pagination.page < pagination.pages;
    console.log("Has more pages:", moreAvailable);
    setHasMore(moreAvailable);
  }, [voicesData, currentPage]);

  // Use accumulated voices instead of just current page
  const voices = allVoices;

  const handleVoiceClick = (voice: Voice) => {
    onVoiceSelect?.(voice);
  };

  // Handle speech request submission
  const handleSubmit = async () => {
    // Validate input
    if (!prompt.trim()) {
      setSubmitError("Please enter text to convert to speech");
      return;
    }

    try {
      setIsSubmitting(true);
      setSubmitError("");
      setSubmitSuccess(false);

      // Create the speech request
      await createSpeechRequest({
        prompt: prompt,
        type: "text-to-speech",
        voiceId: selectedVoice?.id,
      });

      // Show success message
      setSubmitSuccess(true);

      // Reset after 3 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 3000);
    } catch (error) {
      console.error("Failed to submit speech request:", error);
      setSubmitError("Failed to submit request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Expose handleSubmit to parent component
  useEffect(() => {
    if (onSubmitReady) {
      onSubmitReady(handleSubmit);
    }
  }, [onSubmitReady, prompt, selectedVoice]);

  const renderVoiceContent = () => {
    // Only show skeleton during initial load (page 1) or when search is being typed
    if ((loading && currentPage === 1) || isSearching) {
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

    // Show voices
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
                onClick={() => handleVoiceClick(voice)}
              />
            </div>
          );
        })}

        {/* Pagination loading - positioned directly under the fetched data */}
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

        {/* Using CSS mask for fade effect */}
        <div
          ref={scrollContainerRef}
          className="grid max-h-48 min-h-48 grid-cols-3 md:grid-cols-4 gap-y-[15px] gap-x-[10px] overflow-y-auto pt-[10px] pb-[20px] transition-all duration-200 ease-in-out scroll-fade-mask relative hide-scrollbar"
          style={{ willChange: "transform" }}
        >
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

          {/* Error message */}
          {submitError && (
            <div className="flex items-center gap-1 mt-2 text-red-500 text-xs">
              <AlertCircle size={14} />
              <span>{submitError}</span>
            </div>
          )}

          {/* Success message */}
          {submitSuccess && (
            <div className="flex items-center gap-1 mt-2 text-green-500 text-xs">
              <CheckCircle2 size={14} />
              <span>Successfully submitted!</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
