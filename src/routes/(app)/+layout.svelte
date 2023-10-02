<script lang="ts">
	import Aside from './Aside.svelte';

	/* import Aside from './Aside.svelte'; */
	//	import type { LayoutData } from './$types';

	//	export let data: LayoutData;
</script>

<div id="main-layout" class=" grid h-full grid-cols-[auto_1fr]">
	<div>
		<Aside />
	</div>
	<main>
		<slot />
	</main>
</div>
