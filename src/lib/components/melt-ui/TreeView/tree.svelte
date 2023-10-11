<script context="module" lang="ts">
	import { ArrowLeft, ChevronRight, ChevronDown } from 'lucide-svelte';
	import JS from './icons/JS.svelte';
	import Svelte from './icons/Svelte.svelte';

	type Icon = 'svelte' | 'folder' | 'js';

	export type TreeItem = {
		id: number | string;
		name: string;
		icon?: Icon;

		children?: TreeItem[];
	};

	export const icons = {
		svelte: Svelte,
		folder: ChevronRight,
		folderOpen: ChevronDown,
		js: JS,
		highlight: ArrowLeft
	};
</script>

<script lang="ts">
	import { melt, type TreeView } from '@melt-ui/svelte';
	import { getContext } from 'svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	export let treeItems: TreeItem[];
	export let level = 1;

	const {
		elements: { item, group },
		helpers: { isExpanded, isSelected }
	} = getContext<TreeView>('tree');

	function rerunLoadFunction(activeId: string) {
		if (typeof activeId !== 'undefined') {
			const newUrl = new URL($page.url);
			newUrl?.searchParams?.set('cat', activeId);

			goto(newUrl);
		}
		return;
	}
</script>

{#each treeItems as { id, name, icon, children }}
	{@const itemId = id.toString()}
	{@const hasChildren = !!children?.length}

	<li class={hasChildren ? 'pl-3' : 'pl-8'}>
		<button
			on:m-click={() => rerunLoadFunction(itemId)}
			class="flex items-center rounded-2 p-1 text-left hover:bg-layer-3/50 focus:bg-layer-3"
			class:bg-layer-3={$isSelected(itemId)}
			class:text-text-1={$isSelected(itemId)}
			use:melt={$item({
				id: itemId,
				hasChildren
			})}
		>
			<!-- Add icon. -->
			{#if hasChildren}
				{#if $isExpanded(itemId)}
					<span class="mr-1">
						<svelte:component this={icons['folderOpen']} class="h-4 w-4" />
					</span>
				{:else}
					<span class="mr-1">
						<svelte:component this={icons['folder']} class="h-4 w-4" />
					</span>
				{/if}
			{/if}
			{#if icon !== undefined}
				<svelte:component this={icons[icon]} class="h-4 w-4" />
			{/if}
			<span>{name}</span>

			<!-- Selected icon. -->
			<!-- 			{#if $isSelected(itemId)}
				<svelte:component this={icons['highlight']} class="h-4 w-4" />
			{/if} -->
		</button>

		{#if children}
			<ul use:melt={$group({ id: itemId })}>
				<svelte:self treeItems={children} level={level + 1} />
			</ul>
		{/if}
	</li>
{/each}

<style lang="postcss">
	/* Remove docs' focus box-shadow styling. */
	li:focus {
		box-shadow: none !important;
	}
</style>
