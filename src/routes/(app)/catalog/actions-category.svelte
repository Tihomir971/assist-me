<script lang="ts">
	import { page } from '$app/stores';
	import { fade, fly } from 'svelte/transition';

	import { createDialog, melt } from '@melt-ui/svelte';
	import type { ComboboxOption, CreateDialogProps, SelectOption } from '@melt-ui/svelte';

	import { X, AlignJustify } from 'lucide-svelte';
	import type { Tables } from '$lib/types/database.types';
	import Button from '$lib/components/Button/Button.svelte';
	import NumberFormat from './NumberFormat.svelte';
	import { DateTimeFormat } from '$lib/scripts/format';
	import { Checkbox } from '$lib/components/carbon';
	import { Combobox } from '$lib/components/melt-ui';
	import { getContext, onMount } from 'svelte';
	import type { CategoryCtx } from '$lib/types/app.types';
	export let id: Number;
	export let openDrawer: boolean;

	let category: Tables<'m_product_category'> | undefined;
	let categories: ComboboxOption<number>[] = [];
	const ctx = getContext<CategoryCtx>('catalog');

	if (ctx) {
		ctx.categories?.forEach((element) => {
			categories.push({ value: element.id, label: element.name });
		});
		console.log('element2', categories);
	}
	async function loadData() {
		const getProduct = async () => {
			const { data } = await $page.data.supabase
				.from('m_product_category')
				.select()
				.eq('id', id)
				.maybeSingle();

			return data;
		};
		const getCategories = async () => {
			const { data } = await $page.data.supabase
				.from('m_product_category')
				.select('value:id,label:name')
				.order('name');

			return data;
		};
		category = await getProduct();
		/* categories = await getCategories(); */
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
	open.set(openDrawer);
	const updateCategory = async () => {
		const propertiesToCopy: (keyof Tables<'m_product_category'>)[] = [
			'name',
			'description',
			'parent_id',
			'isactive',
			'isselfservice'
		];
		const targetObject: any = {};
		for (const property of propertiesToCopy) {
			if (category?.hasOwnProperty(property)) {
				targetObject[property] = category[property];
			}
		}
		const { error } = await $page.data.supabase
			.from('m_product')
			.update(targetObject)
			.eq('id', category?.id);

		/* console.log('targetObject', targetObject); */
		return;
	};

	onMount(async () => {
		const activeId = $page.url.searchParams.get('cat') as unknown as Number;
		const { data } = await $page.data.supabase
			.from('m_product_category')
			.select()
			.eq('id', activeId)
			.single();
		category = data;
		return;
	});
</script>

<div use:melt={$portalled}>
	{#if $open && category}
		<div
			use:melt={$overlay}
			class="fixed inset-0 z-50 bg-layer-1/50"
			transition:fade={{ duration: 150 }}
		/>
		{#if category}
			<div
				use:melt={$content}
				class="fixed right-0 top-0 z-50 h-screen w-1/2 bg-layer-1 p-6
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
						<div>
							<label for="id">ID</label>
							<input id="id" name="id" type="text" class="w-full" disabled value={category.id} />
						</div>
						<div>
							<label for="name">Name</label>
							<input id="name" name="name" type="text" class="w-full" bind:value={category.name} />
						</div>
					</section>
					<section>
						<div>
							<label for="sku">SKU</label>
							<input
								id="sku"
								name="sku"
								type="text"
								class="w-full"
								bind:value={category.description}
							/>
						</div>

						<div>
							<label for="created">Created</label>
							<input
								id="created"
								name="created"
								type="text"
								class="w-full"
								value={DateTimeFormat(category.created)}
							/>
						</div>
						<div>
							<label for="updated">Updated</label>
							<input
								id="updated"
								name="updated"
								type="text"
								class="w-full"
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
						<!-- {#if categories}
							<Combobox
								labelText="Category"
								placeholder="Choose category"
								comboboxOptions={categories}
								bind:value={category.parent_id}
							></Combobox>
						{/if} -->
					</section>
					<Button type="button" on:click={updateCategory}>Save</Button>
					<!-- </form> -->
				</div>
			</div>
		{/if}
	{/if}
</div>
