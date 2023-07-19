import { type IColor } from ".";

export interface IToolsSlice {
  selectedTool: number;
  brushSize: number;
  zoom: boolean;
  highlight: boolean;
  color: IColor;
  secondaryColor: IColor;
  canvas: {
    transform: number;
    factor: number;
  };
}
