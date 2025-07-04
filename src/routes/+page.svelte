<script lang="ts">
    import type { PageData } from "./$types";

    import type { Article } from "$lib/articles";

    const { data }: { data: PageData } = $props();

    const { articles } = data;
</script>

{#each articles as article }
    <article id={article.slug} class="my-50 w-full max-w-200 mx-auto px-5 scroll-m-5">
        <article.component />
    </article>
{/each}
