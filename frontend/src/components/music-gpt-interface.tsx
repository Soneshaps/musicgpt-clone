"use client";

import { FC } from "react";
import PromptTitle from "./prompt-title";
import Description from "./description";
import PromptBox from "./prompt-box";

const MusicGptInterface: FC = () => {
  const isTextToSpeech = false;

  return (
    <div className="w-full">
      <PromptTitle
        title={isTextToSpeech ? "Text to speech" : "What song to create?"}
      />

      <PromptBox />

      {isTextToSpeech && (
        <Description description="Voices are optimized for english but can work in any language" />
      )}
    </div>
  );
};

export default MusicGptInterface;
