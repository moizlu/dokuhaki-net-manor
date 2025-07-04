import { getAllArticles, type Article } from "$lib/articles";

export const load = async () => {
    const articles: Article[] = await getAllArticles();

    return {
        articles: articles
    }
};
