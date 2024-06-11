interface Position {
  x: number;
  y: number;
}

interface Size {
  width: number;
  height: number;
}

interface Layer {
  type: string;
  name: string;
  src?: string;
  opacity?: number;
  position?: Position;
  size?: Size;
  zIndex: number;
}

interface GroupLayer extends Layer {
  type: "group";
  layers: Layer[];
}

interface SingleLayer extends Layer {
  type: "single";
  layers: Layer[];
}

export interface IConfig {
  initialZoom: number;
  layers: {
    [key: string]: GroupLayer | SingleLayer;
  };
}
