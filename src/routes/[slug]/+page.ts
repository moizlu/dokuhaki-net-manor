import { getArticleBySlug } from "$lib/articles";
import { error } from "@sveltejs/kit";

export const load = async ({ params }: { params: { slug: string}}) => {
    const { slug } = params;

    try {
        return await getArticleBySlug(slug);
    } catch (err) {
        // throw error(404, 'Article not found');
        throw error(404, err as string);
    }
};
