const config = {
  initialZoom: 1.0,
  mainLayer: {
    x: 400,
    y: 5,
    positionRule: "enabled",
    width: 800,
    height: 800,
    sizeRule: "enabled",
    src: "/public/mainLayer.png",
    opacity: 0.4,
  },
  layers: {
    GF: {
      type: "group",
      name: "GF",
      position: { x: 400, y: 5 },
      size: { width: 800, height: 800 },
      layers: [
        {
          type: "unit",
          name: "unit_GF",
          src: "path/to/unit_GF.png",
          opacity: 1.0,
        },
        {
          type: "optional",
          name: "tree_GF",
          src: "path/to/optional.png",

          opacity: 0.8,
        },
      ],
    },
    FF: {
      type: "single",
      name: "FF",
      position: { x: 100, y: 100 },
      size: { width: 300, height: 200 },
      layers: [
        {
          type: "unit",
          name: "unit_FF",
          src: "path/to/unit_1F.png",
          position: { x: 400, y: 5 },
          size: { width: 800, height: 800 },
          opacity: 1.0,
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
          name: "unit_SF",
          src: "path/to/unit_GF.png",
          opacity: 1.0,
        },
        {
          type: "optional",
          name: "table_SF",
          src: "path/to/optional2.png",

          opacity: 0.8,
        },
      ],
    },
  },
};
export default config;
