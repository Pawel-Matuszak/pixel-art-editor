import { RefObject } from "react";

export interface IColor {
  hex?: string;
  rgb: { r: number; g: number; b: number; a: number };
}

export interface ICanvasProps {
  color: IColor;
  secondaryColor: IColor;
  brushSize: number;
  undoBtn: RefObject<HTMLButtonElement>;
  redoBtn: RefObject<HTMLButtonElement>;
  getCanvasRef: (ref: RefObject<HTMLCanvasElement>) => void;
  currentTool: number;
  handleToolChange: (value: number) => void;
  zoom: boolean;
  canvasClear: boolean;
  highlight: boolean;
  transform: number;
}

export interface ICanvasParams {
  width: number;
  height: number;
  transform: number;
  originX: number;
  originY: number;
}

export interface IOffset {
  x: number;
  y: number;
  scale: number;
}

export interface IHistoryQueue {
  history: ImageData[];
  redo: ImageData[];
}
