<script lang="ts">
	import type { LayoutData } from './$types';

	export let data: LayoutData;
	let { categories } = data;

	$: treeItems = convertToTreeStructure(categories);

	import { convertToTreeStructure } from '$lib/scripts/tree';
	/* import { setContext } from 'svelte'; */
	/* 	import { createTreeView } from '@melt-ui/svelte'; */
	/* import { TreeView } from '$lib/components/melt-ui/index'; */
	import TreeView from '$lib/components/melt-ui/TreeView/TreeView.svelte';

	import CategoryToolbar from './CategoryToolbar.svelte';
	/* 	const ctx = createTreeView({
		defaultExpanded: ['lib-0', 'tree-0']
	});
	setContext('tree', ctx);

	const {
		elements: { tree }
	} = ctx; */
</script>

<div class="grid h-screen grid-cols-[auto_1fr]">
	<div class="grid max-h-screen w-80 grid-rows-[auto_1fr] bg-layer-2">
		<div class="h-12 border-b border-layer-3">
			<CategoryToolbar />
		</div>
		<!-- <ul class="h-full overflow-auto rounded-2" {...$tree}> -->
		<!-- <div class="h-full overflow-auto"> -->
		<TreeView {treeItems} />
		<!-- </div> -->
		<!-- </ul> -->
	</div>

	<slot />
</div>
