<script lang="ts">
  import { onMount } from "svelte";
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
                for(const parts in partConf )
               
              }
              }
          }
        }
      }
  });
  const hideSprite=(element:PIXI.Sprite)=>{
    return element.visible=false
  }
  const hideOptionSprites = (elements:any) =>{
    for(const item in elements){
     
      elements[item].sprite.alpha = elements[item].opacity
    }
  }
const showSprite = (element:PIXI.Sprite)=>{
  return element.visible=true
}
 

</script>

<canvas id="application" bind:this={view}></canvas>

<div class="buttons">
<button on:click={()=>showSprite($floorsObj.FF.unit.sprite)}>GF trigger</button>
</div>

<style lang="scss">
  #application {
      margin: 0;
      display: block;
      width: 100%;
      height: 100%;
  }
</style>
