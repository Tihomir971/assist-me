<script lang="ts">
	import type { LayoutData } from './$types';

	export let data: LayoutData;
	let { categories } = data;

	$: treeItems = convertToTreeStructure(categories);

	import { convertToTreeStructure } from '$lib/scripts/tree';
	import { setContext } from 'svelte';
	import { createTreeView } from '@melt-ui/svelte';
	import { TreeView } from '$lib/components/melt-ui/index';
	import PageHeader from './PageHeader.svelte';
	import CategoryToolbar from './CategoryToolbar.svelte';
	const ctx = createTreeView({
		defaultExpanded: ['lib-0', 'tree-0']
	});
	setContext('tree', ctx);

	const {
		elements: { tree }
	} = ctx;
</script>

<div class="grid max-h-screen grid-cols-[auto_1fr]">
	<div class="bg-layer-2 grid max-h-screen w-80 grid-rows-[auto_1fr]">
		<div class="border-layer-3 h-12 border-b">
			<CategoryToolbar />
		</div>
		<ul class="h-full overflow-auto rounded-2" {...$tree}>
			<TreeView {treeItems} />
		</ul>
	</div>
	<div class="grid max-h-screen grid-rows-[auto_1fr]">
		<div class="bg-layer-2 border-layer-3 h-12 w-full border-b"><PageHeader /></div>
		<div class="grid h-full grid-rows-[1fr_auto] overflow-auto px-2">
			<slot />
		</div>
	</div>
</div>
