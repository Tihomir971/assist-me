<script lang="ts">
	import type { TreeItem } from '$lib/components/melt-ui';
	import { setContext } from 'svelte';
	import { createTreeView } from '@melt-ui/svelte';
	import Tree from './tree.svelte';

	export let treeItems: TreeItem[];
	const ctx = createTreeView({});
	setContext('tree', ctx);
	let {
		elements: { tree }
	} = ctx;
</script>

<div class="max-h-full overflow-auto">
	<ul class="overflow-auto py-4" {...$tree}>
		<Tree {treeItems} />
	</ul>
</div>
