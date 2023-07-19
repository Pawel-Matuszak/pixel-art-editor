import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { IColor } from "../types";
import { IToolsSlice } from "../types/toolsSliceInterface";

const initialState: IToolsSlice = {
  selectedTool: 0,
  brushSize: 1,
  zoom: false,
  highlight: false,
  color: {
    hex: "#fff",
    rgb: { r: 255, g: 255, b: 255, a: 255 },
  },
  secondaryColor: {
    hex: "#000",
    rgb: { r: 0, g: 0, b: 0, a: 255 },
  },
  canvas: {
    transform: 20,
  },
};

const toolsSlice = createSlice({
  name: "tools",
  initialState,
  reducers: {
    setZoom: (state, action: PayloadAction<boolean>) => {
      state.zoom = action.payload;
    },
    setHighlight: (state, action: PayloadAction<boolean>) => {
      state.highlight = action.payload;
    },
    setBrushSize: (state, action: PayloadAction<number>) => {
      state.brushSize = action.payload;
    },
    setTool: (state, action: PayloadAction<number>) => {
      state.selectedTool = action.payload;
    },
    setPrimaryColor: (state, action: PayloadAction<IColor>) => {
      state.color = action.payload;
    },
    setSecondaryColor: (state, action: PayloadAction<IColor>) => {
      state.secondaryColor = action.payload;
    },
    setCanvasTransform: (state, action: PayloadAction<number>) => {
      state.canvas.transform = action.payload;
    },
  },
});

export const {
  setZoom,
  setBrushSize,
  setHighlight,
  setTool,
  setPrimaryColor,
  setSecondaryColor,
  setCanvasTransform,
} = toolsSlice.actions;

export default toolsSlice.reducer;
