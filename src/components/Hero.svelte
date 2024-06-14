
<script>
    import { onMount } from 'svelte';
    let selectedIndex = 0; // Start with the first element selected
    let elements = [
        { id: 'element1', bgClass: 'bg-web-dev-ss', title: 'Web Dev', offset: 'left-5 top-10' },
        { id: 'element2', bgClass: 'bg-web-dev-ss', title: 'Game Dev' },
        { id: 'element3', bgClass: 'bg-web-dev-ss', title: 'Any Dev', offset: 'left-5 bottom-10' }
    ];
  
    onMount(() => {
      const interval = setInterval(() => {
        selectedIndex = (selectedIndex + 1) % elements.length;
      }, 3000);
  
      return () => {
        clearInterval(interval);
      };
    });
</script>

<div id="hero-container" class="container flex flex-col md:flex-row mx-auto px-10 md:px-32 md:py-32 pt-10 h-max md:h-screen justify-around md:space-x-32">
    <header id="header" class="intro w-full lg:py-10 md:w-3/5 flex flex-col h-80v md:h-full justify-around">
        <h1 class="intro__hello font-bold text-4xl md:text-5xl text-sky-50">
            Hi, I'm Kevin Hu!
        </h1>   
        <h2 class="intro__tagline text-2xl md:text-3xl md:leading-relaxed text-sky-100 z-10">
            <span class="font-bold"> CS (Games) </span>
            <span> @ USC by Day</span>

            <br>
            <span> Making things I think are
            <span id="start-anchor"> cool </span>
            <span> by Night</span>
        </h2>
        <h3 class="into__socials flex flex-row text-sky-100 z-10">
            <a href="https://github.com/keviin0" target="_blank">
                <svg class="logo " width="50" height="50" viewBox="0 0 98 96" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"/>
                </svg>
            </a>
            <a href="https://www.linkedin.com/in/keviin0/" target="_blank">
                <svg class="logo " xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            </a>
        </h3>
    </header>
    <div id="pictures" class="invisible md:visible md:h-full h-80v w-2/5 flex flex-col mr-11">
        {#each elements as element, index}
            <div class={` ${element.offset} ${index === selectedIndex ? 'card-selected' : 'card'} ${element.bgClass}`} style="z-index: {index === selectedIndex ? 10 : 1};">
                <div class={index === selectedIndex ? 'hidden' : 'overlay'}>
                    {element.title}
                </div>
            </div>
        {/each}
    </div>
</div>
<canvas id="arrowCanvas"></canvas>


<style>
    .logo {
        @apply fill-[#e7e7e7] hover:fill-white hover:cursor-pointer transition-colors mr-8;
    }

    .card, .card-selected {
        @apply my-2 md:my-0 relative w-full h-1/2 border-2 bg-cover rounded-lg;
        transition: transform 0.5s ease-in-out;
    }

    .card {
        transform: translateX(2.5rem);
    }

    .card-selected {
        transform: translateX(-2.5rem);
    }

    .overlay {
        @apply absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white font-bold text-xl rounded-lg;
        transition: opacity 0.5s ease;
    }

    .hidden {
        opacity: 0;
        transition: opacity 0.5s ease;
    }
</style>
