<script lang="ts">
	import type { LayoutData } from './$types';
	import { convertToTreeStructure } from '$lib/scripts/tree';
	import CategoryToolbar from './CategoryToolbar.svelte';
	import TreeView from '$lib/components/melt-ui/TreeView/TreeView.svelte';

	export let data: LayoutData;
	let { categories } = data;

	type Context = {
		categories: Tables<'m_product_category'>[];
	};
	import { setContext } from 'svelte';
	import type { Tables } from '$lib/types/database.types';
	import type { CategoryCtx } from '$lib/types/app.types';
	setContext<CategoryCtx>('catalog', { categories: categories });

	$: treeItems = convertToTreeStructure(categories);
</script>

<div class="grid h-screen grid-cols-[auto_1fr]">
	<div class="grid max-h-screen w-80 grid-rows-[auto_1fr] bg-layer-2">
		<div class="h-12 border-b border-layer-3">
			<CategoryToolbar />
		</div>
		<TreeView {treeItems} />
	</div>

	<slot />
</div>
