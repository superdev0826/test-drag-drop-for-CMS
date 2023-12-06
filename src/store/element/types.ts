import { FileContent } from "use-file-picker/types";

export type Element = {
  id: string;
  text: string;
  color?: string;
  image?: FileContent<string> | string;
};

export type ElementStateType = {
  elements: {
    header: Element[];
    content: Element[];
    footer: Element[];
  };
  editable: boolean;
};
