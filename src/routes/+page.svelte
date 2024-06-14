<script>
    import Loading from '../components/Loading.svelte'
    import Hero from '../components/Hero.svelte'

    let isLoaded = false;

    function handleLoaded() {
        isLoaded = true;
        document.getElementsByTagName("body")[0].style.backgroundColor = "#171c28"
    }

    function handleFinished() {
        document.querySelector('#loading-component').remove();
    }

</script>

<div id="loading-component" class="fixed inset-0 z-50">
    <Loading on:loaded={handleLoaded} on:finished={handleFinished}/>
</div>

{#if isLoaded}
    <Hero />
{/if}