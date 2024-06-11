<script lang="ts">
  import { afterUpdate, beforeUpdate, onMount } from "svelte";
  import * as PIXI from "pixi.js";
  import config, { type floorOrderType } from '../Data/config';
  import { writable, type Writable } from "svelte/store";
  import { createSprite, onWheel, preventDefaultOnCanvas } from "./utils";
  import type { GroupLayer, PollyBoundaries, SingleLayer } from "../types/types";

// const updateBoundaries = () => {
//   const pollyBoundaries: PollyBoundaries = config.polly;
//   return pollyBoundaries;
// };
// let { minX, minY, maxX, maxY } = updateBoundaries();

// const scalePolly = (event: WheelEvent, container: PIXI.Container) => {
//   const scaleSpeed = 0.1;
//   const oldScale = container.scale.x;
//   const newScale =
//     oldScale +
//     -1 * Math.max(-1, Math.min(1, event.deltaY)) * scaleSpeed * oldScale;


//   const scaledMinX = minX * newScale;
//   const scaledMinY = minY * newScale;
//   const scaledMaxX = maxX * newScale;
//   const scaledMaxY = maxY * newScale;


//   minX = scaledMinX;
//   minY = scaledMinY;
//   maxX = scaledMaxX;
//   maxY = scaledMaxY;


// };



  let app: PIXI.Application;
  let view: HTMLCanvasElement;
  const floor: Writable<floorOrderType> = writable('GF');
  const mainContainer: PIXI.Container<PIXI.ContainerChild> = new PIXI.Container();
  const opacityMap: Writable<{ [key: string]: number | unknown }> = writable({});


  let hovered = ''
  if (typeof mainContainer.label === 'string') {
    mainContainer.label = 'main';
  }

  (mainContainer as any).dragData = {};



  const onDragStart = (event: PointerEvent) => {
    (mainContainer as any).dragging = true;
    (mainContainer as any).dragData.startX = event.clientX;
    (mainContainer as any).dragData.startY = event.clientY;
    (mainContainer as any).dragData.initialX = mainContainer.x;
    (mainContainer as any).dragData.initialY = mainContainer.y;
  };

  const onDragMove = (event: PointerEvent) => {
  if ((mainContainer as any).dragging) {
    const diffX = event.clientX - (mainContainer as any).dragData.startX;
    const diffY = event.clientY - (mainContainer as any).dragData.startY;

    let newX = (mainContainer as any).dragData.initialX + diffX;
    let newY = (mainContainer as any).dragData.initialY + diffY;

   

    // if (newX < minX) newX = minX;
    // if (newX > maxX) newX = maxX;
    // if (newY < minY) newY = minY;
    // if (newY > maxY) newY = maxY;

    mainContainer.x = newX;
    mainContainer.y = newY;
  }
};

  const onDragEnd = (event: PointerEvent) => {
    (mainContainer as any).dragging = false;
    (mainContainer as any).dragData = {};
  };
 
  onMount(async () => {
    const resolution = window.devicePixelRatio;
    const width = window.innerWidth * resolution; 
    const height = window.innerHeight * resolution; 
    view.width = width
    view.height = height
    view.addEventListener('pointerdown', onDragStart);
    view.addEventListener('pointerup', onDragEnd);
    view.addEventListener('pointermove', onDragMove);

    app = new PIXI.Application();
    await app.init({ view, backgroundColor: 'grey', width, height, autoDensity: true, resolution });

    for (const item in config) {
      if (item === 'layers') {
        const itemConf = config[item];
        for (const layer in itemConf) {
          const elementConf = itemConf[layer];
          const container = new PIXI.Container();
          for (const element in elementConf) {
            if (element === 'layers') {
              const partConf = elementConf[element];
              for (const parts in partConf) {
                const sprite = await createSprite(itemConf[layer], (partConf[parts] as GroupLayer | SingleLayer));
                $opacityMap = {
                  ...$opacityMap,
                  [partConf[parts].name]: partConf[parts].opacity
                };
                container.addChild(sprite);
                container.label = itemConf[layer].name;
              }
            }
          }
          mainContainer.addChild(container);
          app.stage.interactive = true;
          app.stage.on('pointerdown', onDragStart)
            .on('pointerup', onDragEnd)
            .on('pointerupoutside', onDragEnd)
            .on('pointermove', onDragMove);
          app.stage.onwheel = (e) => {onWheel(e, view, mainContainer)
            // scalePolly(e,mainContainer)
          };
          view.onwheel = preventDefaultOnCanvas;
        }
      }
    }
    updateVisibility('GF');
    mainContainer.scale.set(config?.minZoom)
    app.stage.addChild(mainContainer);
  });

  const handleClick = (message: string) => {
    if (message === 'GF' || message === 'SF' || message === 'FF')
      $floor = message;
  };

  const updateVisibility = (floor: string) => {
    const floorOrder = config.floorOrder;
    const floorIndex = floorOrder.indexOf(floor);

    for (const element of mainContainer.children) {
      const elementIndex = floorOrder.indexOf(element.label);
      for (const item of element.children) {
        const itemOpacity = $opacityMap[item.label] ?? 1.0;
        if (elementIndex === floorIndex) {
          item.visible = true;
          item.renderable = true;
          if (floor !== 'GF' && item.label !== 'plot_GF') {
            const opacityFromConfig = config.layers[floor].layers.find(layer => layer.name === item.label)?.opacity ?? 1.0;
            item.alpha = opacityFromConfig;
          } else {
            item.alpha = 1.0;
          }
        } else if (elementIndex < floorIndex) {
          if (item.label.includes('plot')) {
            item.visible = false;
            item.renderable = false;
          } else {
            item.visible = true;
            item.renderable = true;
            item.alpha = typeof itemOpacity === 'number' ? itemOpacity + 0.1 : 0;
          }
        } else {
          item.visible = false;
          item.renderable = false;
        }
      }
      mainContainer.setChildIndex(element, elementIndex);
    }
  };

  $: if ($floor) {
    updateVisibility($floor);
  }

</script>

<canvas id="application" bind:this={view}></canvas>

<div class="buttons">
  <span class="title">Floor</span>
  {#each config.floorOrder as _floor}
  
  <button class="btn" on:mouseleave={()=>hovered=''} on:mouseenter={()=>hovered=_floor} class:hovered={hovered===_floor && $floor!==_floor} class:active={$floor===_floor} disabled={$floor === _floor} on:click={() => handleClick(_floor)}>{_floor}</button>
  {/each}

</div>

<style lang="scss">
  #application {
    margin: 0;
    display: block;
    width: 100%;
    height: 100%;
  }
  .buttons{

    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 10px;
    position: absolute;
    left: 5%;
    top: 50%;
    border: 1px solid rgba(35, 35, 35, 0.85);
    border-radius: 8px;
    background-color: rgba(35, 35, 35, 0.85);
    padding: 10px;
    .btn{
      border-radius: 4px;
      border: 1px solid #3e3e3e;
      background-color: #353535;
      color: #dadada;
      width: 35px;
      height: 35px;
      transition: 0.3s;
      &.active{
        background-color: #DADADA;
        color: #353535;
      }
      &.hovered{
      background-color: #464646;
      transition: 0.3s;
      }
    }
    .title{
      font-size: 14px;
      color: #BDBDBD;
    }
  }
</style>
