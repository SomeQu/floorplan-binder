# Floorplan-binder

Test task

## Configuration of config.ts file

```typescript
export interface IConfig {
  floorOrder: floorOrderForTypesType;
  polly: PollyBoundaries;
  minZoom: number;
  maxZoom: number;
  layers: {
    [key: string]: GroupLayer | SingleLayer;
  };
}

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
```

## Installation

Install floorplan-binder via npm

```bash
  git clone https://github.com/SomeQu/floorplan-binder.git

  npm install

  npm run dev

```
