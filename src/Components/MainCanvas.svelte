<script lang="ts">
  import { onMount } from "svelte";
  import * as PIXI from "pixi.js";
  import {Assets} from 'pixi.js'
  import {config} from '../Data/config'
  import { writable, type Writable } from "svelte/store";
  const toScale =(sprite:PIXI.Sprite,app:PIXI.Application):number =>{
    const scale = Math.max(app.screen.width / sprite.width, app.screen.height / sprite.height)*0.50;
    console.log('scale,sprite :>> ', scale,sprite);
    return scale
  }
  let app: PIXI.Application;
  let view: HTMLCanvasElement;
  const floor:Writable<string> = writable('GF')
   
  onMount(async() => {
      view.width = window.innerWidth;
      view.height = window.innerHeight;
      app = new PIXI.Application();

      await app.init({ view,backgroundColor:'#55432F',  width: window.innerWidth, height: window.innerHeight, autoDensity: true, resolution: devicePixelRatio, }); 
      for(let option in config.GF){
        if(option ==='plot'){
          const texture = await PIXI.Assets.load(config.GF[option].src)
          texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
          const sprite = new PIXI.Sprite(texture);

       if(config.GF[option].positionRule==='enabled'){
         sprite.x =config.GF[option]?.x
         sprite.y = config.GF[option]?.y
        }else if (config.GF[option].positionRule==='disabled'){
          sprite.x = (app.screen.width - sprite.width) / 2
          sprite.y = (app.screen.width - sprite.width) / 2
        }
          if(config.GF[option].sizeRule==='enabled'){
              sprite.width = config.GF[option].width
              sprite.height = config.GF[option].height
            }else{
              sprite.scale.set(toScale(sprite,app));
            }
          app.stage.addChild(sprite);
        }else if (option ==='unit'){
          const texture = await PIXI.Assets.load(config.GF[option].src)
          texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
          const sprite = new PIXI.Sprite(texture);
        
         
      
          sprite.scale.set(toScale(sprite,app));
       if(config.GF[option].positionRule==='enabled'){
         sprite.x =   config.GF[option]?.x
         sprite.y = config.GF[option]?.y
        }else if (config.GF[option].positionRule==='disabled'){
          sprite.x = (app.screen.width - sprite.width) / 2 
          sprite.y = (app.screen.width - sprite.width) / 2
        }
          if(config.GF[option].sizeRule==='enabled'){
              sprite.width = config.GF[option].width
              sprite.height = config.GF[option].height
            }else if (config.GF[option].sizeRule==='disabled'){
              sprite.scale.set(toScale(sprite,app));
            }
          app.stage.addChild(sprite);
        }else if (option ==='options'){
          const texture:PIXI.Texture = await PIXI.Assets.load(config.GF[option].element.src)
          const sprite = new PIXI.Sprite(texture);
          texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
         if(config.GF[option].element.positionRule==='enabled'){

           sprite.x = config.GF[option].element.x ===undefined ?sprite.x = (app.screen.width - sprite.width) / 2:  config.GF[option].element.x
          
          
          sprite.y = config.GF[option].element.x ===undefined ?sprite.y = (app.screen.width - sprite.width) / 2: config.GF[option].element.y
          }else if(config.GF[option].element.positionRule==='disabled'){
            sprite.x = (app.screen.width - sprite.width) / 2 
            sprite.y = (app.screen.width - sprite.width) / 2
          }
       
       
          if(config.GF[option].element.sizeRule==='enabled'){
              sprite.width = config.GF[option].element.width
              sprite.height = config.GF[option].element.height
            }else if (config.GF[option].element.sizeRule==='disabled'){
              sprite.scale.set(toScale(sprite,app));
            }
      
          //?      | config.GF[option].element.x === false ? sprite.x = (app.screen.width - sprite.width) / 2; : config.GF[option].element.x
          //?      |config.GF[option].element.y === false ?sprite.y = (app.screen.height - sprite.height) / 2;   : config.GF[option].element.y
    
          app.stage.addChild(sprite);
        }
      }
    
    
     
     
   
     
  });
  $:if($floor ==='1F'){
    addBunny(app)
   
  }
  const addBunny = async(app:PIXI.Application) =>{
    const texture =  await Assets.load('https://pixijs.com/assets/bunny.png');   
    const sprite = new PIXI.Sprite(texture)

   return app.stage.addChild(sprite)
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
