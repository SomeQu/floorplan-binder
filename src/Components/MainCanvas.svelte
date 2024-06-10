<script lang="ts">
  import { onMount } from "svelte";
  import * as PIXI from "pixi.js";
  import {Assets} from 'pixi.js'
  import {config} from '../Data/config'
  import { writable, type Writable } from "svelte/store";
  import {addSprite,addOptionalSprite} from './utils/index'

 
  let app: PIXI.Application;
  let view: HTMLCanvasElement;
  const floor:Writable<string> = writable('GF')
  const floorsObj = writable({}) 
  onMount(async() => {
      view.width = window.innerWidth;
      view.height = window.innerHeight;
      app = new PIXI.Application();

      await app.init({ view,backgroundColor:'#55432F',  width: window.innerWidth, height: window.innerHeight, autoDensity: true, resolution: devicePixelRatio, }); 
      for(let option in config.GF){
        if(option ==='plot'){
         $floorsObj= await addSprite(app,config.GF[option],$floorsObj,option,'GF')
        }else if (option ==='unit'){
          $floorsObj= await addSprite(app,config.GF[option],$floorsObj,option,'GF')
        }else if (option ==='options'){
         $floorsObj =await addOptionalSprite(app,config.GF[option],$floorsObj,option,'GF')
        }
      }
    
    
     
     
   
     
  });
  $:console.log('$floorsObj :>> ', $floorsObj);
  const hideSprite=(element)=>{
    return element.sprite.alpha = element.opacity
  }
  const hideOptionSprites = (elements) =>{
    for(const item in elements){
      console.log('item :>> ', item);
      elements[item].sprite.alpha = elements[item].opacity
    }
  }

  $:if($floor ==='1F'){
    hideSprite($floorsObj.GF.plot)
    hideSprite($floorsObj.GF.unit)
    hideOptionSprites($floorsObj.GF.options)
   
  }
  
  $:console.log('$floor :>> ', $floor);
</script>

<canvas id="application" bind:this={view}></canvas>

<div class="buttons">
<button on:click={()=>$floor='1F'}>GF trigger</button>
</div>

<style lang="scss">
  #application {
      margin: 0;
      display: block;
      width: 100%;
      height: 100%;
  }
</style>
