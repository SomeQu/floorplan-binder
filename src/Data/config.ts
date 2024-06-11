import type { IConfig } from "../types/types";
export type floorOrderType = "GF" | "SF" | "FF";

const config: IConfig = {
  floorOrder: ["GF", "FF", "SF"],
  polly: {
    minX: 0,
    minY: 0,
    maxX: 400,
    maxY: 100,
  },
  minZoom: 1,
  maxZoom: 3.0,
  layers: {
    GF: {
      type: "group",
      name: "GF",
      position: { x: 400, y: 5 },
      size: { width: 800, height: 800 },
      layers: [
        {
          type: "unit",
          name: "plot_GF",
          src: "public/images/parts/plot_GF.png",
          zIndex: 3,
          opacity: 0.2,
        },
        {
          type: "unit",
          name: "unit_GF",
          src: "public/images/parts/unit_GF.png",
          zIndex: 3,
          opacity: 1,
        },
        {
          type: "optional",
          name: "tree_GF",
          src: "public/images/parts/optional.png",
          zIndex: 3,
          opacity: 0.2,
        },
      ],
    },
    FF: {
      type: "single",
      name: "FF",
      position: { x: 400, y: 5 },
      size: { width: 800, height: 800 },
      layers: [
        {
          type: "unit",
          name: "plot_FF",
          src: "public/images/parts/plot_1F.png",
          zIndex: 2,
          opacity: 0.6,
        },
        {
          type: "unit",
          name: "unit_FF",
          src: "public/images/parts/unit_1F.png",
          position: { x: 400, y: 5 },
          size: { width: 800, height: 800 },
          zIndex: 2,
          opacity: 1,
        },
      ],
    },
    SF: {
      type: "group",
      name: "SF",
      position: { x: 400, y: 5 },
      size: { width: 800, height: 800 },
      layers: [
        {
          type: "unit",
          name: "plot_SF",
          src: "public/images/parts/plot_2F.png",
          zIndex: 3,
          opacity: 0.4,
        },
        {
          type: "unit",
          name: "unit_SF",
          src: "public/images/parts/unit_2F.png",
          zIndex: 3,
          opacity: 1,
        },
        {
          type: "optional",
          name: "table_SF",
          src: "public/images/parts/optional2.png",
          zIndex: 3,
          opacity: 0.5,
        },
      ],
    },
  },
};
export default config;
