const config = {
  initialZoom: 1.0,

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
          src: "public/images/parts/unit_GF.png",
          opacity: 1.0,
        },
        {
          type: "unit",
          name: "unit_GF",
          src: "public/images/parts/unit_GF.png",
          opacity: 1.0,
        },
        {
          type: "optional",
          name: "tree_GF",
          src: "public/images/parts/optional.png",

          opacity: 0.8,
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
          name: "unit_FF",
          src: "public/images/parts/unit_1F.png",
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
          src: "public/images/parts/unit_2F.png",
          opacity: 1.0,
        },
        {
          type: "optional",
          name: "table_SF",
          src: "public/images/parts/optional2.png",

          opacity: 0.8,
        },
      ],
    },
  },
};
export default config;
