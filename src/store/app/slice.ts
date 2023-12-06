import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { AppStateType } from "./types";
import { Area } from "../../interface";

const initialState: AppStateType = {
  header: [],
  content: [],
  footer: [],
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setState: (
      state,
      { payload }: PayloadAction<{ area: Area; elements: string[] }>
    ) => {
      state[payload.area] = payload.elements;
      localStorage.setItem("app", JSON.stringify(state));
    },
  },
});

export const actions = appSlice.actions;
export default appSlice.reducer;
