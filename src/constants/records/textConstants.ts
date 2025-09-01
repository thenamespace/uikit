import { IconName } from "@/components";

export enum TextRecordCategory {
  Image = "image",
  General = "general",
  Social = "social",
}
export interface SupportedTextRecord {
  icon: IconName | string;
  key: string;
  category: TextRecordCategory;
}

export const supportedTexts: SupportedTextRecord[] = [
  {
    icon: "person",
    key: "avatar",
    category: TextRecordCategory.Image,
  },
  {
    icon: "person",
    key: "header",
    category: TextRecordCategory.Image,
  },
  {
    icon: "person",
    key: "name",
    category: TextRecordCategory.General,
  },
  {
    icon: "x",
    key: "description",
    category: TextRecordCategory.General,
  },
  {
    icon: "person",
    key: "url",
    category: TextRecordCategory.General,
  },
  {
    icon: "person",
    key: "location",
    category: TextRecordCategory.General,
  },
];

export const getSupportedText = (key: string) => {
  return supportedTexts.find(txt => txt.key === key);
};
