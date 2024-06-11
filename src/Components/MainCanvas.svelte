<script lang="ts">
  import { afterUpdate, beforeUpdate, onMount } from "svelte";
  import * as PIXI from "pixi.js";
import config from '../Data/config'
  import { writable, type Writable } from "svelte/store";

 
  let app: PIXI.Application;
  let view: HTMLCanvasElement;
  const floor:Writable<'GF'|'SF'|'FF'> = writable('GF')
  const mainContainer:PIXI.Container<PIXI.ContainerChild> = new PIXI.Container()
  const opacityMap: Writable<{ [key: string]: number }> = writable({})
  mainContainer.label='main'

interface DragData {
    startX: number;
    startY: number;
}


(mainContainer as any).dragData = {};


function onDragStart(event) {
    mainContainer.dragging = true;
    (mainContainer as any).dragData.startX = event.clientX;
    (mainContainer as any).dragData.startY = event.clientY;
}


function onDragMove(event) {
    if (mainContainer.dragging) {
        const newPositionX = event.clientX;
        const newPositionY = event.clientY;
        const diffX = newPositionX - (mainContainer as any).dragData.startX;
        const diffY = newPositionY - (mainContainer as any).dragData.startY;
        mainContainer.x += diffX;
        mainContainer.y += diffY;
        (mainContainer as any).dragData.startX = newPositionX;
        (mainContainer as any).dragData.startY = newPositionY;
    }
}

function onDragEnd(event) {
    mainContainer.dragging = false;
    (mainContainer as any).dragData = {};
}

  onMount(async() => {
      view.width = window.innerWidth;
      view.height = window.innerHeight;
      view.addEventListener('pointerdown', onDragStart);
      view.addEventListener('pointerup', onDragEnd);
      view.addEventListener('pointerupoutside', onDragEnd);
      view.addEventListener('pointermove', onDragMove);
      
      app = new PIXI.Application();
      await app.init({ view,backgroundColor:'grey',  width: window.innerWidth, height: window.innerHeight, autoDensity: true, resolution: devicePixelRatio, });
      
      for(const item in config){
    
        if(item==='layers'){

          const itemConf = config[item]
        
          for(const layer in itemConf){
            
            const elementConf = itemConf[layer]
           
            const container = new PIXI.Container()
            
            for(const element in elementConf){
              if(element ==='layers'){
                const partConf = elementConf[element]
                for(const parts in partConf ){
              
                  const src = partConf[parts].src ?? ''
                  const texture = await PIXI.Assets.load(src);
                  const sprite = new PIXI.Sprite(texture);
                  sprite.label = partConf[parts].name
                  const positionX = itemConf[layer].position?.x ?? 0;
              const positionY = itemConf[layer].position?.y ?? 0;
              const width = itemConf[layer].size?.width ?? 0;
              const height = itemConf[layer].size?.height ?? 0;
              const zIndex = itemConf[layer].zIndex ?? 1
              sprite.x = positionX;
              sprite.y = positionY;
              sprite.width = width;
              sprite.height = height;
              sprite.zIndex = zIndex
              sprite.visible = false;
              sprite.renderable = false;
              $opacityMap = {
                ...$opacityMap,
                [partConf[parts].name]:partConf[parts].opacity}; 
                  container.addChild(sprite)
                  container.label= itemConf[layer].name
                  
                 
                }
               
              }
              }
           
              mainContainer.addChild(container)
              app.stage.interactive = true;
    app.stage.on('pointerdown', onDragStart)
             .on('pointerup', onDragEnd)
             .on('pointerupoutside', onDragEnd)
             .on('pointermove', onDragMove);

              // app.stage.addChild(mainContainer)

              
              
               
                
              
            
          }
        }
      }
      updateVisibility('GF');
      app.stage.addChild(mainContainer)
  });
 const handleClick =(message:string) =>{
  if(message ==='GF' ||message ==='SF' || message ==='FF')
  $floor = message
 }

 const updateVisibility = (floor: string) => {
  const floorOrder = ['GF', 'FF', 'SF'];
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
        if(item.label.includes('plot')){
          console.log(item.label)
          item.visible =false
          item.renderable=false
        }else{
          item.visible = true;
          item.renderable = true;
        item.alpha = itemOpacity + 0.1; 
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
<button disabled={$floor==='GF'} on:click={()=>handleClick('GF')}>GF</button>
<button disabled={$floor==='FF'} on:click={()=>handleClick('FF')}>FF</button>
<button disabled={$floor==='SF'} on:click={()=>handleClick('SF')}>SF</button>
</div>

<style lang="scss">
  #application {
      margin: 0;
      display: block;
      width: 100%;
      height: 100%;
  }
</style>
