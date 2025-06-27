<script lang="ts">
    import Icon from '$lib/components/ui/Icon/Icon.svelte';

    import { getTheme, setTheme } from '$lib/utils/theme.svelte';

    const onclick = () => {
        setTheme(getTheme() === "dark" ? "light" : "dark");
    }
</script>

<button {onclick} class="" id="theme-button">
    <Icon lightSrc="/icons/light/theme.svg" darkSrc="/icons/dark/theme.svg" alt="theme" width={30} fetchpriority="low" class="m-5 drop-shadow-primary drop-shadow-md" />
</button>
