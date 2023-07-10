import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { IToolsSlice } from "../types/toolsSliceInterface";

const initialState: IToolsSlice = {
  selectedTool: 0,
};

const toolsSlice = createSlice({
  name: "tools",
  initialState,
  reducers: {
    setTool: (state, action: PayloadAction<number>) => {
      state.selectedTool = action.payload;
    },
  },
});

export const { setTool } = toolsSlice.actions;

export default toolsSlice.reducer;
