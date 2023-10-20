<script lang="ts">
	import { invalidate } from '$app/navigation';
	import { FolderSync, Minimize2, Pencil, Plus, Search, Trash2, X } from 'lucide-svelte';
	import ActionsCategory from './actions-category.svelte';
	import { page } from '$app/stores';
	import type { Tables } from '$lib/types/database.types';
	import { createDialog, melt } from '@melt-ui/svelte';
	import type { CreateDialogProps, SelectOption } from '@melt-ui/svelte';
	import { fade, fly } from 'svelte/transition';
	import { DateTimeFormat } from '$lib/scripts/format';
	import { Checkbox } from '$lib/components/carbon';
	import Button from '$lib/components/Button/Button.svelte';
	import { Combobox } from '$lib/components/melt-ui';
	import { addToast } from '$lib/components/melt-ui/Toaster/Toaster.svelte';

	$: activeId = $page.url.searchParams.get('cat') as unknown as Number;

	let openDrawer = false;
	let category: Tables<'m_product_category'> | undefined;
	let categories: SelectOption<number>[];

	async function loadData() {
		const getCategory = async () => {
			const { data } = await $page.data.supabase
				.from('m_product_category')
				.select()
				.eq('id', activeId)
				.single();
			return data;
		};
		const getCategories = async () => {
			const { data } = await $page.data.supabase
				.from('m_product_category')
				.select('value:id,label:name')
				.order('name');

			return data;
		};
		category = await getCategory();
		categories = await getCategories();
	}

	const onOpenChange: CreateDialogProps['onOpenChange'] = ({ curr, next }) => {
		if (curr === false) {
			loadData();
		} else {
			category = undefined;
		}
		return next;
	};
	const {
		elements: { trigger, overlay, content, title, description, close, portalled },
		states: { open }
	} = createDialog({
		onOpenChange
	});

	const updateCategory = async () => {
		const propertiesToCopy: (keyof Tables<'m_product_category'>)[] = [
			'description',
			'parent_id',
			'name',
			'isactive',
			'isselfservice'
		];
		const targetObject: any = {};
		for (const property of propertiesToCopy) {
			if (category?.hasOwnProperty(property)) {
				targetObject[property] = category[property];
			}
		}
		/* 	console.log('targetObject', targetObject); */

		const { error } = await $page.data.supabase
			.from('m_product_category')
			.update(targetObject)
			.eq('id', category?.id);

		if (error) {
			addToast({
				data: {
					title: error.message,
					description: error.details,
					color: 'bg-red-5',
					hint: error.hint,
					code: error.code
				}
			});
		} else {
			$open = false;
			addToast({
				data: {
					title: 'Success',
					description: 'Category updated!',
					color: 'bg-purple-5'
				}
			});
			invalidate('catalog:categories');
		}

		return;
	};
	const delCategory = async () => {
		const { error } = await $page.data.supabase
			.from('m_product_category')
			.delete()
			.eq('id', activeId);
		if (error) {
			addToast({
				data: {
					title: 'Error',
					description: 'Error Category deleting',
					color: 'bg-purple-5'
				}
			});
		} else {
			addToast({
				data: {
					title: 'Success',
					description: 'Category deleted!',
					color: 'bg-purple-5'
				}
			});
			invalidate('catalog:categories');
		}
	};
</script>

<div class="flex h-full">
	<button type="button" class="icon h-full"><Plus /></button>
	<button
		class="icon h-full"
		on:click={() => {
			delCategory();
		}}><Trash2 /></button
	>
	<button use:melt={$trigger} class="icon h-full" disabled={activeId === undefined}
		><Pencil />
	</button>
	<button
		class="icon h-full"
		on:click={() => {
			console.log('click');
			invalidate('catalog:categories');
		}}><FolderSync /></button
	>
	<button class="icon h-full" on:click><Minimize2 /></button>
	<button class="icon h-full" on:click><Search /></button>
</div>

<!-- Edit Category -->
<div use:melt={$portalled}>
	{#if $open && category}
		<div
			use:melt={$overlay}
			class="fixed inset-0 z-auto bg-layer-1/50"
			transition:fade={{ duration: 150 }}
		/>
		{#if category}
			<div
				use:melt={$content}
				class="fixed right-0 top-0 z-auto h-screen w-1/2 bg-layer-2 p-6
			  shadow-3 focus:outline-none"
				transition:fly={{
					x: '100%',
					duration: 300,
					opacity: 1
				}}
			>
				<button
					use:melt={$close}
					aria-label="Close"
					class="absolute right-[10px] top-[10px] inline-flex h-6 w-6
				  appearance-none items-center justify-center rounded-full text-primary-8
				  hover:bg-primary-1 focus:shadow-primary-4 focus:outline-none focus:ring-2
				  focus:ring-primary-4"
				>
					<X size="20" />
				</button>
				<h3 use:melt={$title}>Edit product</h3>
				<p use:melt={$description} class="text-zinc-600 mb-5 mt-2 leading-normal">Edit category.</p>
				<div class="flex flex-col space-y-2">
					<!-- <form method="POST" action="?/updateProduct"> -->
					<section class="grid grid-cols-2 gap-2">
						<div class="wrapper">
							<label for="id">ID</label>
							<input id="id" name="id" type="text" class="w-full" disabled value={category.id} />
						</div>
						<div class="wrapper">
							<label for="name">Name</label>
							<input
								id="name"
								name="name"
								type="text"
								class="w-full"
								bind:value={category.name}
								autocomplete="off"
							/>
						</div>
					</section>
					<section>
						<div class="wrapper">
							<label for="sku">Description</label>
							<textarea
								id="description"
								name="description"
								class="w-full"
								rows="3"
								bind:value={category.description}
							/>
						</div>

						<div class="wrapper">
							<label for="created">Created</label>
							<input
								id="created"
								name="created"
								type="text"
								class="w-full"
								disabled
								value={DateTimeFormat(category.created)}
							/>
						</div>
						<div class="wrapper">
							<label for="updated">Updated</label>
							<input
								id="updated"
								name="updated"
								type="text"
								class="w-full"
								disabled
								value={DateTimeFormat(category.updated)}
							/>
						</div>
						<div class="grid grid-cols-3 gap-2">
							<!-- <input hidden name="isselfservice" bind:value={product.isselfservice} /> -->
							<Checkbox
								name="isselfservice"
								labelText="Is self-service?"
								bind:checked={category.isselfservice}
								value
							></Checkbox>

							<Checkbox
								name="isactive"
								labelText="Is active?"
								bind:checked={category.isactive}
								value
							></Checkbox>
						</div>
						<!-- <Select name="Category" bind:options={categories}></Select> -->
						<!-- <input hidden name="m_product_category_id" bind:value={product.m_product_category_id} /> -->
						{#if categories}
							<Combobox
								labelText="Parent Category"
								placeholder="Choose category"
								options={categories}
								bind:value={category.parent_id}
							></Combobox>
						{/if}
					</section>
					<Button type="button" on:click={updateCategory}>Save</Button>
					<!-- </form> -->
				</div>
			</div>
		{/if}
	{/if}
</div>
