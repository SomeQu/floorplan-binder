import * as PIXI from "pixi.js";

const toScale = (sprite: PIXI.Sprite, app: PIXI.Application): number => {
  const scale =
    Math.max(
      app.screen.width / sprite.width,
      app.screen.height / sprite.height
    ) * 0.5;
  console.log("scale,sprite :>> ", scale, sprite);
  return scale;
};

export const addSprite = async (app: PIXI.Application, config, type, floor) => {
  console.log("config.src,floor,type :>> ", config.src, floor, type);
  const texture = await PIXI.Assets.load(config.src);
  const sprite = new PIXI.Sprite(texture);
  sprite.label = type;
  if (config.positionRule === "enabled") {
    sprite.x = config?.x;
    sprite.y = config?.y;
  } else if (config?.positionRule === "disabled") {
    sprite.x = (app.screen.width - sprite.width) / 2;
    sprite.y = (app.screen.width - sprite.width) / 2;
  }
  if (config.sizeRule === "enabled") {
    sprite.width = config.width;
    sprite.height = config.height;
  } else {
    sprite.scale.set(toScale(sprite, app));
  }

  return sprite;
};
export const addOptionalSprite = async (
  app: PIXI.Application,
  config,
  floorsObj,
  type,
  floor
) => {
  const texture: PIXI.Texture = await PIXI.Assets.load(config.element.src);
  const sprite = new PIXI.Sprite(texture);
  sprite.label = type;
  if (config.element.positionRule === "enabled") {
    sprite.x = config.element.x;

    sprite.y = config.element.y;
  } else if (config.element.positionRule === "disabled") {
    sprite.x = (app.screen.width - sprite.width) / 2;
    sprite.y = (app.screen.width - sprite.width) / 2;
  }

  if (config.element.sizeRule === "enabled") {
    sprite.width = config.element.width;
    sprite.height = config.element.height;
  } else if (config.element.sizeRule === "disabled") {
    sprite.scale.set(toScale(sprite, app));
  }

  floorsObj = {
    ...floorsObj,

    [floor]: {
      ...floorsObj[floor],
      options: {
        ...floorsObj[floor].options,
        [config.element.name]: {
          ...[config.element.name],
          sprite,
          opacity: config.element.opacity,
        },
      },
    },
  };

  return floorsObj;
};
