<script>
    import { onMount, createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    onMount(() => {
        const wrapper = document.getElementById("tiles");
        var chanceOfDisappearing = 0.65;
        let allTransparent = false;
        let iteration;

        const createTile = (index, columns) => {
            const tile = document.createElement("div");
            tile.classList.add("tile");
            tile.style.backgroundColor = "#fff"; 
            tile.dataset.row = Math.floor(index / columns); 
            tile.dataset.column = index % columns;
            return tile;
        };

        const populateTiles = (quantity, columns) => {
            for (let i = 0; i < quantity; i++) {
                wrapper.appendChild(createTile(i, columns));
            }
        };

        const createGrid = () => {
            iteration = 0;
            if (allTransparent) {
                return;
            }
            wrapper.innerHTML = "";
            const tileSize = window.innerWidth > 768 ? window.innerWidth / 15 : window.innerWidth / 6; 
            
            let columns = Math.floor(window.innerWidth / tileSize),
                rows = Math.floor(window.innerHeight / tileSize);
            
            wrapper.style.setProperty("--columns", columns);
            wrapper.style.setProperty("--rows", rows);
        
            populateTiles(rows * columns, columns);

            dispatch('loaded');

            setTimeout(updateTileVisibility, 1750);
        };

        

        async function updateTileVisibility() {
            if (document.querySelectorAll('.tile').length <= 0) {
                return;
            }

            const tiles = document.querySelectorAll('.tile');
            const columns = parseInt(wrapper.style.getPropertyValue("--columns"));
            const rows = parseInt(wrapper.style.getPropertyValue("--rows"));
            while (!allTransparent)
            {
                await new Promise(r => setTimeout(r, 150));
                allTransparent = true;
                
                let baseChance = chanceOfDisappearing + iteration * 0.1;
                iteration += 0.75;
                let lower = (rows / 4) + iteration;

                for (let row = 0; row < rows; row++) {
                    if (row > lower) {
                        continue;
                    }
                    let rowChance;
                    if (row < iteration) {
                        rowChance = baseChance;                        
                    } else {
                        rowChance = baseChance / ((row - iteration) + 1);
                    }

                    for (let col = 0; col < columns; col++) {
                        const tile = tiles[row * columns + col];
                        if (Math.random() < rowChance) {
                            tile.style.opacity = "0";
                            tile.style.transform = "scale(0.9)";
                        }
                        if (tile.style.opacity !== "0") {
                            allTransparent = false;
                        }
                    }
                }

                if (allTransparent)
                {
                    setTimeout(() => {
                        document.querySelector('#scroll-container').remove();
                        dispatch('finished');
                    }, 1500);
                }
            }
        }

        window.onresize = createGrid;

        createGrid();
    });

</script>

<div id="scroll-container">
    <div id="sticky-wrapper">
        <div id="tiles"></div>
    </div>
</div>

<style>

    :global(.tile) {
        opacity: 1;
        transition: border-radius 0.75s, opacity 1s ease, transform 0.2s ease;
        z-index: 50;
    }

    #tiles {
        display: grid;
        height: 100vh;
        width: 100%;
        grid-template-columns: repeat(var(--columns), 1fr);
        grid-template-rows: repeat(var(--rows), 1fr);
        position: absolute;
        top: 0;
        z-index: 2;
        overflow: hidden;
    }

    #sticky-wrapper {
        position: sticky;
        height: 100vh;
        top: 0;
    }

    #scroll-container {
        height: var(--scroll-container-height);
        position: relative;
    }

    :global(::-webkit-scrollbar) {
        display: none;
    }
</style>