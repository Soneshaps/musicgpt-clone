"use client";

import { FC, useState } from "react";
import PromptTitle from "./prompt-title";
import Description from "./description";
import PromptBox from "./prompt-box";
import { ToolType } from "@/enums";
import { toolTypeToTitleMap } from "@/constants";

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
