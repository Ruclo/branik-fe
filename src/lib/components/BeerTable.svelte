<script lang="ts">
import type { ListingsResponse } from "$lib/types";

let { listings = $bindable() }: {listings: ListingsResponse} = $props();

let sortArrow: string = $state('↓');

function ArrowOnClick(): void {
    sortArrow = sortArrow == '↓' ? '↑' : '↓';

    listings.forEach(listing => {
        listing.beers.reverse();
    });

    let first = 0;
    let last = listings.length - 1;

    while (first < last) {
        if (listings[last].beers.length == 0) {
            last--;
            continue;
        }

        const temp = listings[first];
        listings[first] = listings[last];
        listings[last] = temp;
        first++;
        last--;
    }
}

</script>

<style>
table {
    text-align: center;
    border-collapse: collapse;

}

thead > tr > th {
    border-bottom: 1px solid black;
    
}

td, th {
    padding: 5px;
}

.store-name {
    background-color: #fac92c;
    border-radius: 5px;
    font-weight: bold;
}

h1 {
    text-align: center;
    margin: 0.2em;
}

.sort-col {
    display: flex;
    align-items: center;
}

.sort-arrow {
    font-size: 2em;
    padding: 0 0.3em;
    background: none;
    border: 0;
}

</style>
<div>
<h1>Branik Deals</h1>
<table>
    <thead >
        <tr>
            <th>Type</th>
            <th>Container</th>
            <th>Price<br>(CZK)</th>
            <th>Volume<br>(L)</th>
            <th>Units</th>
            <th><div class="sort-col"><span>Price<br>per<br>Liter</span><button class='sort-arrow' onclick={ArrowOnClick}>{sortArrow}</button></div></th>
          </tr>
    </thead>

    <tbody>
        {#each listings as listing}
            <tr>
                <td class="store-name" colspan="6">{listing.store}</td>
            </tr>
            {#each listing.beers as beer}
                <tr>
                    <td>{beer.type}</td>
                    <td>{beer.container}</td>
                    <td>{beer.price_czk}</td>
                    <td>{beer.volume_l}</td>
                    <td>{beer.units}</td>
                    <td>{beer.price_per_liter}</td>
                </tr>
            {:else}
                <tr>
                    <td colspan="6">No listings found</td>
                </tr>
            {/each}
        {/each}
    </tbody>
</table>
</div>