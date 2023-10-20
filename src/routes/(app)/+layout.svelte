<script lang="ts">
	import { Toaster } from '$lib/components/melt-ui/';
	import Aside from './Aside.svelte';

	/* import Aside from './Aside.svelte'; */
	//	import type { LayoutData } from './$types';

	//	export let data: LayoutData;
</script>

<Toaster />
<div id="main-layout" class="grid h-full grid-cols-[auto_1fr] border-r border-layer-3 bg-layer-2">
	<div>
		<Aside />
	</div>
	<main>
		<slot />
	</main>
</div>
