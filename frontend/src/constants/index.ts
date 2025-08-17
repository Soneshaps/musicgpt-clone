import { ToolType } from "@/enums";

export const toolTypeToTitleMap = {
  [ToolType.CREATE_ANYTHING]: "What song to create?",
  [ToolType.TEXT_TO_SPEECH]: "Text to speech",
};

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
