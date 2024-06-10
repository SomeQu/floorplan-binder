<script lang="ts">
  import { onMount } from "svelte";
  import * as PIXI from "pixi.js";

  let app: PIXI.Application;
  let view: HTMLCanvasElement;
  let texture: PIXI.Texture;
  let texture2:PIXI.Texture
  onMount(async() => {
      view.width = window.innerWidth;
      view.height = window.innerHeight;
      app = new PIXI.Application();
  
      await app.init({ view, backgroundColor: 0x1099bb, width: window.innerWidth, height: window.innerHeight, autoDensity: true, resolution: devicePixelRatio, }); 
      texture = await PIXI.Assets.load('/public/Plot.png');
      texture2 = await PIXI.Assets.load('/public/Unit.png');
      const sprite = new PIXI.Sprite(texture);
      const sprite2 = new PIXI.Sprite(texture2)
      const sprite3= new PIXI.Sprite(texture2)
      const scale = Math.max(app.screen.width / sprite.width, app.screen.height / sprite.height)*0.50;
      
    
      sprite.scale.set(scale);
      sprite2.scale.set(scale)
      sprite3.scale.set(scale)
      sprite.x = (app.screen.width - sprite.width) / 2;
      sprite.y = (app.screen.height - sprite.height) / 2;
      sprite2.x = (app.screen.width - sprite2.width) / 2;
      sprite2.y = (app.screen.height - sprite2.height) / 2;
      sprite3.x = (app.screen.width - sprite3.width) / 2;
      sprite3.y = (app.screen.height - sprite3.height) / 2;
      
      app.stage.addChild(sprite);
      app.stage.addChild(sprite2)
      app.stage.addChild(sprite3)
      console.log('app :>> ', app.stage.children);
  });
</script>

<canvas id="application" bind:this={view}></canvas>

<style lang="scss">
  #application {
      margin: 0;
      display: block;
      width: 100%;
      height: 100%;
  }
</style>
