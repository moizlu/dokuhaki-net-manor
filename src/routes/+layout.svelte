<script lang="ts">
	import '../app.css';

	import { browser } from '$app/environment';
	import { replaceState } from '$app/navigation';
	import { page } from '$app/state';

	import { initTheme } from '$lib/utils/theme.svelte';

	import Header from '$lib/components/parts/Header/Header.svelte';
	import Footer from '$lib/components/parts/Footer/Footer.svelte';

	let { children } = $props();

	// `#`のアンカータグの挙動を置き換える(フラグメント識別子を付けずに遷移する)
	if (browser) { // ブラウザじゃないと`document`が使えない
		document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
			anchor.addEventListener('click', (e) => {
				e.preventDefault();

				const targetId = anchor.getAttribute('href')!.substring(1);
				const targetElement = document.getElementById(targetId);

				if (targetElement) {
					targetElement.scrollIntoView();

					replaceState(page.url, {});
				}
			});
		});

		initTheme();
	}
</script>

<Header />
<div>
	{@render children()}
</div>
<Footer />
