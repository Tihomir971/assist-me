<script context="module" lang="ts">
	import { ArrowLeft, ChevronRight, ChevronDown } from 'lucide-svelte';
	import JS from './icons/JS.svelte';
	import Svelte from './icons/Svelte.svelte';

	type Icon = 'svelte' | 'folder' | 'js';

	export type TreeItem = {
		id: number | string;
		text: string;
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

{#each treeItems as { id, text, icon, children }}
	{@const itemId = id.toString()}
	{@const hasChildren = !!children?.length}

	<li class={hasChildren ? 'pl-4' : 'pl-9'}>
		<button
			on:m-click={() => rerunLoadFunction(itemId)}
			class="rounded-md shadow-none flex min-h-[1.5rem] w-full flex-1 items-center !bg-transparent p-0 text-left font-normal text-text-2 focus:!bg-primary-2 focus:!text-indigo-6 active:!bg-primary-2 active:!text-indigo-6"
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
			<span>{text}</span>

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
