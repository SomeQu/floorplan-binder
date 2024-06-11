import * as PIXI from "pixi.js";
import type { GroupLayer, SingleLayer, Layer } from "../../types/types";
import config from "../../Data/config";
export const createSprite = async (
  itemConfiguration: GroupLayer | SingleLayer,
  partConfiguration: GroupLayer | SingleLayer
): Promise<PIXI.Sprite> => {
  const src = partConfiguration.src ?? "";
  const texture = await PIXI.Assets.load(src);
  const sprite = new PIXI.Sprite(texture);
  sprite.label = partConfiguration.name;
  const positionX = itemConfiguration.position?.x ?? 0;
  const positionY = itemConfiguration.position?.y ?? 0;
  const width = itemConfiguration.size?.width ?? 0;
  const height = itemConfiguration.size?.height ?? 0;
  const zIndex = itemConfiguration.zIndex ?? 1;
  sprite.x = positionX;
  sprite.y = positionY;
  sprite.width = width;
  sprite.height = height;
  sprite.zIndex = zIndex;
  sprite.visible = false;
  sprite.renderable = false;
  return sprite;
};
export const preventDefaultOnCanvas = (event: WheelEvent) => {
  event.preventDefault();
};

const scaleSpeed = 0.1;
const maxZoom = config?.maxZoom;

const minZoom = config?.minZoom;

export const onWheel = (
  event: WheelEvent,
  view: HTMLCanvasElement,
  container: PIXI.Container<PIXI.ContainerChild>
) => {
  const diffX = event.clientX - (container as any).dragData.startX;
  const diffY = event.clientY - (container as any).dragData.startY;
  let newX = (container as any).dragData.initialX + diffX;
  let newY = (container as any).dragData.initialY + diffY;
  console.log("newX :>> ", newX);
  const oldScale = container.scale.x;
  const newScale =
    oldScale +
    -1 * Math.max(-1, Math.min(1, event.deltaY)) * scaleSpeed * oldScale;

  // Проверяем, не меньше ли новый масштаб минимального предела
  if (newScale >= minZoom && newScale <= maxZoom) {
    const pointerX = event.clientX - view.getBoundingClientRect().left;
    const pointerY = event.clientY - view.getBoundingClientRect().top;
    const oldX = container.x;
    const oldY = container.y;
    const newX = pointerX - (pointerX - oldX) * (newScale / oldScale);
    const newY = pointerY - (pointerY - oldY) * (newScale / oldScale);

    container.scale.set(newScale);
    container.position.set(newX, newY);
  }
};
