import { Textarea } from "../common/input/textarea";
import { FileAttachment } from "../common/file-attachment";
import { ChangeEvent, FC, useEffect } from "react";
import { motion } from "framer-motion";
import { useCreateSpeechRequest } from "@/hooks/useSpeechRequestApi";
import { showToast, toastMessages } from "@/utils/toast-utils";

export enum CreateAnythingMode {
  INSTRUMENTAL = "instrumental",
  LYRICS = "lyrics",
}

interface CreateAnythingToolProps {
  prompt: string;
  lyrics: string;
  activeMode: CreateAnythingMode | null;
  selectedFile?: File | null;
  onPromptChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onLyricsChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onFileRemove?: () => void;
  onSubmitReady?: (submitFn: () => Promise<void>) => void;
}

export const CreateAnythingTool: FC<CreateAnythingToolProps> = ({
  prompt,
  lyrics,
  activeMode,
  selectedFile,
  onPromptChange,
  onLyricsChange,
  onFileRemove,
  onSubmitReady,
}) => {
  const { mutateAsync: createSpeechRequest } = useCreateSpeechRequest();

  // Handle submission logic
  const handleSubmit = async () => {
    // Validate input
    if (!prompt.trim()) {
      showToast.error(toastMessages.validation.promptRequired);
      return;
    }

    try {
      const loadingToast = showToast.loading(
        toastMessages.createAnything.loading
      );

      await createSpeechRequest({
        prompt: prompt,
        type: "create-anything",
        lyrics: activeMode === CreateAnythingMode.LYRICS ? lyrics : undefined,
        songMode: activeMode || undefined,
        fileUrl: selectedFile ? selectedFile.name : undefined,
      });

      showToast.dismiss(loadingToast);
      showToast.success(toastMessages.createAnything.success);
    } catch {
      showToast.error(toastMessages.createAnything.error);
    }
  };

  // Expose handleSubmit to parent component
  useEffect(() => {
    if (onSubmitReady) {
      onSubmitReady(handleSubmit);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onSubmitReady, prompt, lyrics, activeMode, selectedFile]);

  return (
    <div className="relative flex flex-col ">
      <div>
        <Textarea
          name="description"
          id="description"
          placeholder="Describe your song"
          value={prompt}
          onChange={onPromptChange}
          autoResize={true}
          minHeight={64}
          maxHeight={120}
          className="p-5 pretty-scrollbar-2"
        />
      </div>

      {activeMode === CreateAnythingMode.LYRICS && (
        <>
          <div className="border-t border-neutral-sub-text"></div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{
              duration: 0.3,
              ease: [0.4, 0, 0.2, 1],
            }}
          >
            <Textarea
              name="lyrics"
              id="lyrics"
              placeholder="Add your lyrics"
              value={lyrics}
              onChange={onLyricsChange}
              autoResize={true}
              minHeight={64}
              maxHeight={120}
              className="p-5 pretty-scrollbar-2"
            />
          </motion.div>
        </>
      )}

      {selectedFile && onFileRemove && (
        <div className="mb-4 w-fit pl-5">
          <FileAttachment file={selectedFile} onRemove={onFileRemove} />
        </div>
      )}
    </div>
  );
};
