<script lang="ts">
    import { getTheme, setTheme } from '$lib/utils/theme.svelte';

    const onclick = () => {
        setTheme(getTheme() === "dark" ? "light" : "dark");
    }
</script>

<button {onclick} class="" id="theme-button">
    <img src="/icons/light/theme.svg" alt="theme" width={30} class="block dark:hidden m-5 drop-shadow-primary drop-shadow-md">
    <img src="/icons/dark/theme.svg" alt="theme" width={30} class="hidden dark:block m-5 drop-shadow-primary drop-shadow-md">
</button>
