<script lang="ts">
    import { onMount } from "svelte";

    import Modal from "../Modal/Modal.svelte";
    import ThemeButton from "$lib/components/parts/Header/ThemeButton.svelte";

    import NavItems from "./NavItems.svelte";

    import { getAllArticles, type Article } from "$lib/articles";

    let isOpen: boolean = $state(false);

    const onclick = () => {
        isOpen = !isOpen;
    }

    let articles: Article[] = $state([]);
    let isSidebarWidth: boolean = $state(false);

    onMount(async () => {
        articles = await getAllArticles();
    });

    onMount(() => {
        const rootStyles = getComputedStyle(document.documentElement);
        const sidebarMaxWidth = rootStyles.getPropertyValue('--breakpoint-xl');

        const widthMediaQuery = window.matchMedia(`(min-width: ${sidebarMaxWidth})`);

        const handleWidthMediaQuery = (e: MediaQueryList | MediaQueryListEvent) => {
            isSidebarWidth = e.matches;
        };

        handleWidthMediaQuery(widthMediaQuery);
        widthMediaQuery.addEventListener('change', handleWidthMediaQuery);
    });
</script>

{#snippet drawNavLink(href: string, text: string)}
    <a {href} class="text-xl">{text}</a>
{/snippet}

<button {onclick} class="xl:hidden fixed top-0 right-0 m-5 z-100">
    <div>
        <img src="/icons/light/hamburger-menu.svg" alt="menu" width={30} class="block dark:hidden">
        <img src="/icons/dark/hamburger-menu.svg" alt="menu" width={30} class="hidden dark:block">
    </div>
</button>

<Modal bind:isOpen={isOpen}>
    <div></div>
</Modal>

<!-- <div class="fixed top-0 right-0 min-h-screen"> -->
<!-- <div class={[(!isOpen && !isSidebarWidth) ? "hidden" : "flex", "fixed top-0 right-2 w-45 m-5 flex-col items-start justify-center gap-4 z-1000"]}>
    <NavItems className="min-h-screen" />
</div> -->
<div class={[(!isOpen && !isSidebarWidth) ? "hidden" : "block", "fixed top-0 right-2 w-45 m-5 gap-4 z-1000"]}>
    <NavItems className="min-h-screen" />
</div>
