<script lang="ts">
	import '../app.css';

	import { browser } from '$app/environment';
	import { replaceState } from '$app/navigation';
	import { page } from '$app/state';
	import { onMount } from "svelte";

	import { getAllArticles, type Article } from "$lib/articles";
	import { initTheme } from '$lib/utils/theme.svelte';

	import SplashScreen from '$lib/components/parts/SplashScreen/SplashScreen.svelte';
	import Header from '$lib/components/parts/Header/Header.svelte';
	import Footer from '$lib/components/parts/Footer/Footer.svelte';

	let { children } = $props();

	let isLoaded = $state(false);
	let articles: Article[] = $state([]);

	if (browser) { // ブラウザじゃないと`document`が使えない
		initTheme();
	}

    onMount(async () => {
        articles = await getAllArticles();
		isLoaded = true;
    });
</script>

<!-- OGP系の設定 -->
<svelte:head>
	<meta property="og:url" content="https://dokuhaki-net-manor.moizlu.com/" />
	<meta property="og:type" content="profile" />
	<meta property="og:title" content="毒吐きネットマナーミラー" />
	<meta property="og:image" content="https://dokuhaki-net-manor.moizlu.com/ogp.png" />
	<meta property="og:site_name" content="毒吐きネットマナーミラー" />
	<meta property="og:description" content="毒吐きネットマナーのミラーサイトです。" />
</svelte:head>

<SplashScreen />
<Header />
<div>
	{@render children()}
</div>
<Footer />
