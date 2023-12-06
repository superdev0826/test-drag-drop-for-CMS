import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FileContent } from "use-file-picker/types";

import { ElementStateType, Element } from "./types";
import { Area } from "../../interface";
import { ELEMENTS } from "../../contants";

const initialState: ElementStateType = {
  elements: ELEMENTS,
  editable: false,
};

const elementSlice = createSlice({
  name: "element",
  initialState,
  reducers: {
    setElements: (
      state,
      {
        payload,
      }: PayloadAction<{
        header: Element[];
        content: Element[];
        footer: Element[];
      }>
    ) => {
      state.elements = payload;
    },
    setElement: (
      state,
      {
        payload,
      }: PayloadAction<{
        area: Area;
        id: string;
        text?: string;
        color?: string;
        image?: FileContent<string> | string;
      }>
    ) => {
      const { area, id, text, color, image } = payload;
      const areaElements = state.elements[area];
      const index = areaElements.findIndex((e) => e.id === id);
      if (text) {
        areaElements[index].text = text;
      }
      if (color) {
        areaElements[index].color = color;
      }
      if (image) {
        areaElements[index].image = image;
      }
      const newElements = {
        ...state.elements,
        [area]: [...areaElements],
      };
      state.elements = newElements;
      localStorage.setItem("elements", JSON.stringify(newElements));
    },
    setEditable: (state, { payload }: PayloadAction<boolean>) => {
      state.editable = payload;
    },
  },
});

export const actions = elementSlice.actions;
export default elementSlice.reducer;
