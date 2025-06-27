<script lang="ts">
    import { onMount } from "svelte";
    import { fade } from "svelte/transition";

    import Icon from "$lib/components/ui/Icon/Icon.svelte";
  import { browser } from "$app/environment";

    let isShow = $state(true);

    onMount(() => {
        isShow = false;
    });

</script>

{#if isShow}
    <div transition:fade={{ duration: 300 }} class="fixed z-10000 top-0 left-0 min-h-screen min-w-screen bg-primary transition-colors duration-300 flex flex-col justify-center items-center">
        <p>読込中...</p>
        <p>多少時間がかかる場合があります。</p>
        <Icon lightSrc="/icons/light/loading.svg" darkSrc="/icons/dark/loading.svg" width={100} height={100} fetchpriority="high" class="animate-spin" />
    </div>
{/if}
