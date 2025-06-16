<script lang="ts">
    import { onMount } from 'svelte';

    import { getAllArticles, type Article } from '$lib/articles';
    import ThemeButton from '$lib/components/parts/Header/ThemeButton.svelte';

    interface Props {
        className?: string;
    }
    const { className }: Props = $props();

    let activeArticleId = $state('');
    let navArticles: Article[] = $state([]);

    const activeNavStyle: string = "bg-zinc-800 text-zinc-100 dark:bg-zinc-100 dark:text-zinc-800";

    onMount(async () => {
        navArticles = await getAllArticles();
    });

    // 現在の場所のナビ要素を検出する
    // Intersection Observer APIだと挙動がイマイチ
    onMount(() => {
        const DEBOUNCE_TIME = 100;
        let articles: HTMLElement[] = [];
        let preExecutedTime = Date.now();
        let preOffsetY = 0;

        const transitionNav = () => {
            if (articles.length === 0) {
                articles = Array.from(document.querySelectorAll('article'));
            }

            const now = Date.now();

            if (now - preExecutedTime < DEBOUNCE_TIME) {
                return;
            }

            preExecutedTime = now;

            let currentOffsetY = window.pageYOffset;
            const centerY = window.innerHeight / 2;

            const isOverCenter = articles.map((article) => {
                const rect = article.getBoundingClientRect();
                const top = rect.top;
                const bottom = rect.bottom;

                // 下端が真ん中より上 or 真ん中より上で上も下も画面内にある時true
                return (bottom >= centerY) || ((bottom < centerY) && ((top >= 0) || (Math.abs(top) <= 100))); // デバウンスのせいでずれる事があるため
            });

            let pos = isOverCenter.filter((over) => !over).length; // 真ん中より下にある要素の数

            // 下まで行くと全部falseになるため
            activeArticleId = (pos >= navArticles.length) ? navArticles[navArticles.length - 1].slug : navArticles[pos].slug

            preOffsetY = currentOffsetY;
        };

        window.addEventListener('scroll', transitionNav);
        setInterval(transitionNav, 300); // 早すぎると対応できないため
    });
</script>

{#snippet navItem(article: Article)}
    <li>
        <a href={`#${article.slug}`} class={[`m-3 p-1 transition-all duration-300
                                        hover:bg-accent hover:text-primary
                                        text-sm xs:text-xl
        `,
                                    (article.slug === activeArticleId) && activeNavStyle]}>{article.metadata.title}</a>
    </li>
{/snippet}


<div class={[className, "fixed top-0 flex flex-col gap-0 items-end justify-center"]}>
    <ul class="flex flex-col gap-5 items-start justify-center">
        {#each navArticles as article}
            {@render navItem(article)}
        {/each}
    </ul>

    <ThemeButton />
</div>
