<script lang="ts">
	import { invalidate } from '$app/navigation';
	import { FolderSync, Minimize2, Pencil, Plus, Search, Trash2 } from 'lucide-svelte';
	import ActionsCategory from './actions-category.svelte';
	import { page } from '$app/stores';
	import type { Tables } from '$lib/types/database.types';

	$: activeId = $page.url.searchParams.get('cat') as unknown as Number;

	let openDrawer = false;
	let category: Tables<'m_product_category'>;
	async function getCategory(id: Number) {
		const { data } = await $page.data.supabase
			.from('m_product_category')
			.select()
			.eq('id', id)
			.single();
		return data;
		/* 	const { data: categoriesData } = await $page.data.supabase
			.from('m_product_category')
			.select('value:id,label:name');
		categories = categoriesData;
		return; */
	}
</script>

<div class="flex h-full">
	<button type="button" class="icon h-full"><Plus /></button>
	<button class="icon h-full" on:click><Trash2 /></button>
	<button
		disabled={activeId === undefined}
		on:click={() => {
			if (activeId) {
				openDrawer = true;
				openDrawer = false;
				/* getCategory(activeId).then((data) => {
					category = data;
				}); */
			}
		}}><Pencil /></button
	>
	<button class="icon h-full" on:click={() => invalidate('app:categories')}><FolderSync /></button>
	<button class="icon h-full" on:click><Minimize2 /></button>
	<button class="icon h-full" on:click><Search /></button>
</div>
<ActionsCategory id={activeId} openDrawer></ActionsCategory>
