interface Position {
  x: number;
  y: number;
}

interface Size {
  width: number;
  height: number;
}

export interface Layer {
  type: string;
  name: string;
  src?: string;
  opacity?: number;
  position?: Position;
  size?: Size;
  zIndex?: number;
}

export interface GroupLayer extends Layer {
  type: "group";
  layers: Layer[];
}

export interface SingleLayer extends Layer {
  type: "single";
  layers: Layer[];
}
export type floorOrderForTypesType = string[];
export interface IConfig {
  floorOrder: floorOrderForTypesType;
  polly: PollyBoundaries;
  minZoom: number;
  maxZoom: number;
  layers: {
    [key: string]: GroupLayer | SingleLayer;
  };
}
interface DragData {
  startX: number;
  startY: number;
}
export type PollyBoundaries = {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
};
