<script lang="ts">
  import { afterUpdate, beforeUpdate, onMount } from "svelte";
  import * as PIXI from "pixi.js";
import config from '../Data/config'
  import { writable, type Writable } from "svelte/store";
  import {addSprite,addOptionalSprite} from './utils/index'

 
  let app: PIXI.Application;
  let view: HTMLCanvasElement;
  const floor:Writable<string> = writable('GF')
  const floorsObj = writable({}) 
  const mainContainer = new PIXI.Container()
  mainContainer.label='main'
  onMount(async() => {
      view.width = window.innerWidth;
      view.height = window.innerHeight;
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
                  
                  const texture = await PIXI.Assets.load(partConf[parts].src);
                  const sprite = new PIXI.Sprite(texture);
                  sprite.label = partConf[parts].name
                  sprite.x =  itemConf[layer].position.x
                  sprite.y = itemConf[layer].position.y
                  sprite.width = itemConf[layer].size.width
                  sprite.height =  itemConf[layer].size.height
                  container.addChild(sprite)
                  container.label= itemConf[layer].name
                  
                 
                }
               
              }
              }
              mainContainer.addChild(container)
              
              // app.stage.addChild(mainContainer)

              
              
               
                
              
            
          }
        }
      }

      app.stage.addChild(mainContainer)
  });

 const handleClick =(message:string) =>{
  $floor = message
 }

 const spriteListener = (container: PIXI.Container<PIXI.ContainerChild>, floor: string) => {
    for (const element of container.children) {
        if (element.label !== floor) {
            element.alpha = 0.2;
        } else {
            element.alpha = 1;
         
            container.setChildIndex(element, container.children.length - 1);
        }
        
    }
}

 $:if($floor){
 spriteListener(mainContainer,$floor)
 }
    $:console.log('container.children', mainContainer.children)
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
