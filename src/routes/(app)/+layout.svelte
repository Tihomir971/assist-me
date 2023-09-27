<script lang="ts">
	import Aside from './Aside.svelte';

	/* import Aside from './Aside.svelte'; */
	//	import type { LayoutData } from './$types';

	//	export let data: LayoutData;
</script>

<div class="flex h-full">
	<Aside />
	<main class="flex-grow">
		<slot />
	</main>
</div>
