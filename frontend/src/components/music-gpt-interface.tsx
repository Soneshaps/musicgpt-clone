"use client";

import { FC, useState } from "react";
import PromptTitle from "./prompt-title";
import Description from "./description";
import PromptBox from "./prompt-box";

export enum ToolType {
  CREATE_ANYTHING = "Create anything",
  TEXT_TO_SPEECH = "Text to Speech",
}

const toolTypeToTitleMap = {
  [ToolType.CREATE_ANYTHING]: "What song to create?",
  [ToolType.TEXT_TO_SPEECH]: "Text to speech",
};

const MusicGptInterface: FC = () => {
  const [selectedTool, setSelectedTool] = useState<ToolType>(
    ToolType.CREATE_ANYTHING
  );

  return (
    <div className="w-full">
      <PromptTitle title={toolTypeToTitleMap[selectedTool]} />

      <PromptBox
        selectedTool={selectedTool}
        setSelectedTool={setSelectedTool}
      />

      {selectedTool === ToolType.TEXT_TO_SPEECH && (
        <Description description="Voices are optimized for english but can work in any language" />
      )}
    </div>
  );
};

export default MusicGptInterface;
