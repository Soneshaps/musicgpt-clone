import { Textarea } from "../common/input/textarea";
import { FileAttachment } from "../common/file-attachment";
import { ChangeEvent, FC, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useCreateSpeechRequest } from "@/hooks/useSpeechRequestApi";

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
      return;
    }

    await createSpeechRequest({
      prompt: prompt,
      type: "create-anything",
      lyrics: lyrics,
    });
  };

  // Expose handleSubmit to parent component
  useEffect(() => {
    if (onSubmitReady) {
      onSubmitReady(handleSubmit);
    }
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
