<script lang="ts">
    import type { Article } from "$lib/articles";

    interface Props extends Article {}
    export let data: Props;
    const { slug, metadata, component: ArticleBody } = data;
</script>

<svelte:head>
    <title>{metadata.title}</title>
</svelte:head>

<article class="w-full max-w-200 mx-auto px-5">
    <ArticleBody />
</article>
