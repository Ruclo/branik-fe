<script lang="ts">
import BeerAnimation from "$lib/components/BeerAnimation.svelte";
import BeerTable from "$lib/components/BeerTable.svelte";
import { onMount } from "svelte";
import { fly } from "svelte/transition";
import type { ListingsResponse } from "$lib/types";

let animationCompleted = $state(false)

let listings: ListingsResponse = $state([])
let dataFetched = $derived(listings.length > 0)

async function fetchListings(): Promise<void> {
    try {
        const response = await fetch(import.meta.env.VITE_LISTINGS_URL);
        listings = await response.json()
    } catch (error) {
        console.log('Error fetching data')
    }
}


let screenWidth: number = $state(0);
function updateScreenWidth(): void {
    screenWidth = window.innerWidth;
}

onMount(() => {
    fetchListings()
    updateScreenWidth()
    window.addEventListener('resize', updateScreenWidth);
    return () => window.removeEventListener('resize', updateScreenWidth);
});
</script>

<style>
    :global(body)
    {
        margin: 0;
        height: 100vh;
        width: 100vw;
        background-color: bisque;
    }

    main {
        display:flex;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        overflow-x: hidden;
    }
    div {
        position: absolute;
    }
</style>
<main>
    
    {#if animationCompleted && dataFetched}
    <div in:fly={{duration:3000, x: -screenWidth}}>

        <BeerTable bind:listings={listings}/>
    </div>
    {:else}
    <div out:fly={{duration:3000, x: screenWidth}}>

        <BeerAnimation delay=1000 animationEndCallback={() => {animationCompleted = true}}/>
    </div>
    {/if}
</main>
