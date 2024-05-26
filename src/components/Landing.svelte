<script>
    import { onMount } from 'svelte';

    onMount(() => {
        const wrapper = document.getElementById("tiles");
        const scrollContainer = document.getElementById("scroll-container");
        var chanceOfDisappearing;
        let locked = false;
        let allTransparent = false;

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
            scrollContainer.style.setProperty("--scroll-container-height", "800vh");
            if (allTransparent) {
                return;
            }
            window.scrollTo(0, 0);
            wrapper.innerHTML = "";
            chanceOfDisappearing = 0.65;
            
            if (window.innerWidth > 1400) {
                
            }
            const tileSize = window.innerWidth > 768 ? window.innerWidth / 15 : window.innerWidth / 6; 
            
            let columns = Math.floor(window.innerWidth / tileSize),
                rows = Math.floor(window.innerHeight / tileSize);
            
            wrapper.style.setProperty("--columns", columns);
            wrapper.style.setProperty("--rows", rows);
        
            populateTiles(rows * columns, columns);
        };

        let lastScrollTop = 0;
        let iteration = 0;
        const scrollThreshold = 200; // Amount of pixels to scroll before updating visibility

        const updateTileVisibility = () => {
            if (document.querySelectorAll('.tile').length <= 0) {
                return;
            }

            const currentScrollTop = window.scrollY;
            if (Math.abs(currentScrollTop - lastScrollTop) >= scrollThreshold) {
                lastScrollTop = currentScrollTop; // Update last scroll position for next check
                
                const tiles = document.querySelectorAll('.tile');
                const columns = parseInt(wrapper.style.getPropertyValue("--columns"));
                const rows = parseInt(wrapper.style.getPropertyValue("--rows"));
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
                            tile.style.borderRadius = "15px"
                        }
                        if (tile.style.opacity !== "0") {
                            allTransparent = false;
                        }
                    }
                }
                
                if (allTransparent && window.innerWidth >= 768 && !locked) { // Desktop size adjustment
                    setTimeout(() => {
                        document.querySelector("#scroll-container").style.height = "100vh";
                        window.scrollTo(0,0); 
                        locked = true;
                    }, "250");
                    setTimeout(() => {
                        document.getElementById("tiles").remove();
                    }, "500");
                }
            }
        };

        const resizeOnMobile = () => {
            if (window.innerWidth <= 768 && allTransparent && !locked) { // Mobile size adjustment
                document.querySelector("#scroll-container").style.height = "100vh";
                window.scrollTo(0,0); 
                locked = true;
                setTimeout(() => {
                    document.getElementById("tiles").remove();
                }, "500");
            }
        };

        document.addEventListener('touchend', resizeOnMobile);

        window.onresize = createGrid;
        window.onscroll = updateTileVisibility;

        createGrid();
    });

</script>

<svelte:head>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300..900;1,300..900&display=swap" rel="stylesheet">
</svelte:head>

<div id="scroll-container">
    <div id="sticky-wrapper">
        <div id="under">
            <div id="under-content">
                <h1>Some Title Text</h1>
            </div>
        </div>
        <div id="tiles"></div>
    </div>
</div>
<div id="spacer">
    other page content
</div>

<style>

    :global(body) {
        height: 100vh;
        margin: 0;
        scrollbar-width: none;
        -ms-overflow-style: none;
    }

    :global(.tile) {
        transition: border-radius 0.75s, opacity 1s ease, transform 0.2s ease;
        z-index: 1;
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

    #spacer {
        height: 100vh;
        background: black;
        color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        font-family: "Rubik", sans-serif;
        font-weight: 500;
        font-size: 5em;
    }

    #scroll-container {
        height: var(--scroll-container-height);
        position: relative;
    }

    :global(::-webkit-scrollbar) {
        display: none;
    }

    #under-content {
        display: flex;
        justify-content: center;
        align-items: center;
        font-family: "Rubik", sans-serif;
        font-size: 5vw;
        height: 100%;
        width: 70%;
        color: white;
    }

    #under {
        position: absolute;
        display: flex;
        justify-content: center;
        top: 0;
        background-color: black;
        width: 100%; 
        height: 100vh;
        z-index: 1;
    }
</style>