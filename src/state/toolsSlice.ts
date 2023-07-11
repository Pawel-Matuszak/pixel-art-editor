import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { IColor } from "../types";
import { IToolsSlice } from "../types/toolsSliceInterface";

const initialState: IToolsSlice = {
  selectedTool: 0,
  color: {
    hex: "#fff",
    rgb: { r: 255, g: 255, b: 255, a: 255 },
  },
  secondaryColor: {
    hex: "#000",
    rgb: { r: 0, g: 0, b: 0, a: 255 },
  },
};

const toolsSlice = createSlice({
  name: "tools",
  initialState,
  reducers: {
    setTool: (state, action: PayloadAction<number>) => {
      state.selectedTool = action.payload;
    },
    setPrimaryColor: (state, action: PayloadAction<IColor>) => {
      state.color = action.payload;
    },
    setSecondaryColor: (state, action: PayloadAction<IColor>) => {
      state.secondaryColor = action.payload;
    },
  },
});

export const { setTool, setPrimaryColor, setSecondaryColor } =
  toolsSlice.actions;

export default toolsSlice.reducer;
