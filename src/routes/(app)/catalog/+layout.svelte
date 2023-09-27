<script lang="ts">
	import type { LayoutData } from './$types';

	export let data: LayoutData;
	let { categories } = data;

	$: treeItems = convertToTreeStructure(categories);

	import { convertToTreeStructure } from '$lib/scripts/tree';
	import { setContext } from 'svelte';
	import { createTreeView } from '@melt-ui/svelte';
	import { TreeView } from '$lib/components/melt-ui/index';
	import Header from './Header.svelte';
	import CategoryToolbar from './CategoryToolbar.svelte';
	const ctx = createTreeView({
		defaultExpanded: ['lib-0', 'tree-0']
	});
	setContext('tree', ctx);

	const {
		elements: { tree }
	} = ctx;
</script>

<div class="flex h-full flex-grow">
	<div class="grid w-80 grid-rows-[auto_1fr] bg-surface-2">
		<div class="h-12 bg-surface-2">
			<CategoryToolbar />
		</div>
		<ul class="h-full overflow-auto" {...$tree}>
			<TreeView {treeItems} />
		</ul>
	</div>
	<!-- <CategoryTree bind:children></CategoryTree> -->
	<!-- 	<DemoTreeView /> -->
	<div class="grid w-full grid-rows-[auto_1fr]">
		<div class="h-12 w-full bg-surface-4"><Header /></div>
		<slot />
	</div>
</div>
