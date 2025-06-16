<script lang="ts">
  import type { Snippet } from 'svelte';

    interface Props {
        isOpen: boolean;
        children: Snippet;
    }

    let { isOpen = $bindable(), children }: Props = $props();

    let backgroundElement: HTMLButtonElement | undefined = $state(undefined);

    const onclick = (e: Event) => {
        if (!backgroundElement) { return; }

        if (e.target === backgroundElement) {
            isOpen = false;
        }
    };
</script>

<div class={[`fixed top-0 left-0 w-full h-full z-10
              transition-opacity duration-200
              flex items-center justify-center
              bg-zinc-50 dark:bg-zinc-900
`, (isOpen) ? "opacity-90" : "opacity-0 pointer-events-none"]}>
</div>

{#if isOpen}
    <button class="fixed top-0 left-0 w-full h-full z-10
                   transition-opacity duration-200
                   flex items-center justify-center"
        bind:this={backgroundElement}
        onclick={onclick}
    >
        {@render children()}
    </button>
{/if}
