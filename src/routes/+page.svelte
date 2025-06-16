<script lang="ts">
    import { onMount } from "svelte";
    import { getAllArticles, type Article } from "$lib/articles";

    let articles: Article[] = $state([]);
    onMount(async () => {
        articles = await getAllArticles();
    });
</script>

{#each articles as article }
    <article id={article.slug} class="my-50 w-full max-w-200 mx-auto px-5 scroll-m-5">
        <article.component />
    </article>
{/each}
