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

<div class="m-1 flex h-full flex-grow gap-1">
	<div class="grid w-80 grid-rows-[auto_1fr] gap-1 bg-surface-2">
		<div class="h-12 bg-surface-2">
			<CategoryToolbar />
		</div>
		<ul class="h-full overflow-auto" {...$tree}>
			<TreeView {treeItems} />
		</ul>
	</div>
	<!-- <CategoryTree bind:children></CategoryTree> -->
	<!-- 	<DemoTreeView /> -->
	<div class="grid w-full grid-rows-[auto_1fr] gap-1">
		<div class="h-12 w-full rounded-2 bg-surface-2"><PageHeader /></div>
		<slot />
	</div>
</div>
