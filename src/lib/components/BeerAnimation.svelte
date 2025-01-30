<script lang="ts">
import { onMount } from "svelte";
let pouring: boolean = $state(false);
let { filled = $bindable(false) } = $props()

function updateScale(): void {
  const scale = Math.max(1, Math.min(window.innerWidth / 500, 2));
  document.documentElement.style.setProperty("--scale", scale.toString());
}


function pourBeer(): void {
    pouring = true;
    setTimeout(function(): void { 
        filled = true;
    }, 1500);
}

onMount(() => {
    setTimeout(() => {
      pourBeer();
    }, 3000);

    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  });
  

</script>

<style>
#container {
  width: calc(100px * var(--scale));
  height: calc(200px * var(--scale));
  margin: 0 auto;
  position: relative;
  margin-top: calc(70px * var(--scale));
  
  .beer {
    width: 100%;
    height: 100%;
    position: absolute;
    background: #fac92c;
    bottom: 0;
    height: 0;
    transition: 1500ms ease-in;
    
    &.fill {
      height: 100%;
    }
    
    &:after {
      content: '';
      position: absolute;
      width: 50%;
      height: 100%;
      background: #ea9602;
      right: 0;
    }
  }
  
  .glass {
    position: absolute;
    width: 100%;
    height: 100%;
    border: solid calc(10px * var(--scale)) #e8e4d9;
    border-top: solid calc(5px * var(--scale)) #e8e4d9;
    border-bottom: solid calc(30px * var(--scale)) #e8e4d9;
    border-radius: calc(5px * var(--scale));
    transform: perspective(calc(500px * var(--scale))) rotateX(-30deg);
    
    &:before, &:after {
      content: '';
      position: absolute;
      border-radius: calc(10px * var(--scale));
      background: #fff;
      width: calc(10px * var(--scale));
    }
    
    &:before {
      height: 20%;
      left: calc(10px * var(--scale));
      top: 5%;
      z-index: 1;
    }
    
    &:after {
      height: 70%;
      right: calc(10px * var(--scale));
      top: 5%;
    }
  }
  
  .head {
    position: absolute;
    width: 60%;
    height: calc(60px * var(--scale));
    background: #fff;
    bottom: calc(-5px * var(--scale));
    left: calc(5px * var(--scale));
    border-radius: 50%;
    z-index: -1;
    transition: 1600ms ease-in;

    &.active {
      bottom: 82%;
    }

    &:before, &:after {
      content: '';
      position: absolute;
      background: #fff;
      border-radius: 50%;
    }

    &:before {
      width: calc(30px * var(--scale));
      height: calc(30px * var(--scale));
      left: calc(50px * var(--scale));
      top: calc(15px * var(--scale));
    }

    &:after {
      width: calc(40px * var(--scale));
      height: calc(40px * var(--scale));
      left: calc(67px * var(--scale));
      top: calc(9px * var(--scale));
    }
  }
  
  .pour {
    position: absolute;
    width: calc(20px * var(--scale));
    height: 100vh;
    background: #fac92c;
    border-radius: calc(20px * var(--scale));
    left: calc(20px * var(--scale));
    z-index: -1;
    bottom: 100vh;
    transition: 300ms ease-in;
    
    &.pouring {
      bottom: 0%;
    }
    
    &.end {
      height: 0;
    }
  }
}
</style>


<div id="container">
    <div class="glass">
      <div class="beer" class:fill={pouring}></div>
    </div>
    <div class="head" class:active={pouring}></div>
    <div class="pour" class:pouring={pouring} class:end={filled}></div>
</div>