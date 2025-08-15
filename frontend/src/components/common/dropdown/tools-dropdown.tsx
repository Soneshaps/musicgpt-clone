"use client";

import { useRef, FC, ReactNode } from "react";
import { Aperture, Check, ChevronDown, Type } from "lucide-react";
import { Dropdown } from "@/components/common/dropdown";
import Badge from "@/components/common/badge";

export type Tool = "Create anything" | "Text to Speech";

interface ToolOption {
  id: string;
  label: string;
  description: string;
  icon: ReactNode;
  hasBadge?: boolean;
  heading: string;
}

interface ToolsDropdownProps {
  onToolChange: (tool: Tool) => void;
  selectedTool: Tool;
}

const tools: ToolOption[] = [
  {
    id: "create-anything",
    label: "Tools",
    heading: "Create anything",
    description: "A Simple text to create it all",
    icon: <Aperture height={20} width={20} className="text-neutral-light" />,
  },
  {
    id: "text-to-speech",
    label: "Text to Speech",
    heading: "Text to Speech",
    description: "Speak text in any voice",
    icon: <Type height={20} width={20} className="text-neutral-light" />,
    hasBadge: true,
  },
];

export const ToolsDropdown: FC<ToolsDropdownProps> = ({
  onToolChange,
  selectedTool,
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  const activeTool =
    tools?.find((tool) => tool?.heading === selectedTool) || tools[0];

  const handleToolSelect = (tool: ToolOption) => {
    onToolChange(tool?.heading as Tool);
    setTimeout(() => {
      document.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
    }, 0);
  };

  return (
    <div ref={dropdownRef}>
      <Dropdown
        align="right"
        isRelative={false}
        label={
          <span className="flex items-center gap-1">
            {activeTool?.label}
            <ChevronDown
              height={16}
              width={16}
              className="text-neutral-light"
            />
          </span>
        }
        className="py-2 pl-3 pr-2"
        showDropdownIcon={false}
      >
        <div className="min-w-[400px] px-2.5 py-2 max-sm:min-w-[300px]">
          {tools?.map((tool) => (
            <div
              key={tool?.id}
              className="active:scale-98 relative flex cursor-pointer items-center justify-between gap-2.5 rounded-2xl bg-transparent px-2.5 py-2 transition-all duration-200 ease-in-out hover:scale-[1.02] hover:bg-black hover:bg-opacity-20"
              onClick={() => handleToolSelect(tool)}
            >
              <div className="flex min-w-0 flex-1 items-center gap-2.5">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-neutral-light/10">
                  {tool?.icon}
                </div>
                <div className="flex min-w-0 flex-col gap-0.5">
                  <span className="flex items-center text-sm font-medium tracking-wide text-neutral-light">
                    {tool?.heading}
                    {tool?.hasBadge && <Badge label="Plus" />}
                  </span>
                  <span className="text-body-small tracking-wide text-neutral-sub-text">
                    {tool?.description}
                  </span>
                </div>
              </div>
              {activeTool?.id === tool?.id && (
                <div className="ml-2 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-neutral-light">
                  <Check
                    height={16}
                    width={16}
                    className="text-neutral-black"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </Dropdown>
    </div>
  );
};
