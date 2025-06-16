import type { Component } from "svelte";

interface ArticleMetadata {
    index: number;
    title: string;
}

interface ArticleModule {
    default: Component
    metadata: ArticleMetadata;
}

export interface Article {
    slug: string;
    metadata: ArticleMetadata & { id: string };
    component: Component
}

export const getAllArticles = async () => {
    const modules = import.meta.glob('$lib/articles/*.md');
    const articles: Article[] = [];

    for (const [path, resolver] of Object.entries(modules)) {
        const slug = path.split('/').pop()?.replace('.md', '').toLowerCase();
        if (!slug) { continue; }

        const articleModule = await resolver() as ArticleModule;

        articles.push({
            slug,
            metadata: { ...articleModule.metadata, id: slug},
            component: articleModule.default
        });
    }

    return articles.sort((a, b) => a.metadata.index - b.metadata.index);
};

export const getArticleBySlug = async (slug: string) => {
    const modules = import.meta.glob('$lib/articles/*.md');

    for (const [path, resolver] of Object.entries(modules)) {
        if (!path.toLowerCase().endsWith(`${slug}.md`)) { continue; }

        const articleModule = await resolver() as ArticleModule;

        const article: Article = {
            slug,
            metadata: { ...articleModule.metadata, id: slug},
            component: articleModule.default
        }

        return article;
    }

    throw new Error(`Article '${slug}' is not found.`);
};
