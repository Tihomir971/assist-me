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
	export let id: string;

	let product: Tables<'m_product'> | undefined;
	let categories: SelectOption<number>[];

	async function loadData() {
		const getProduct = async () => {
			const { data } = await $page.data.supabase
				.from('m_product')
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
		product = await getProduct();
		categories = await getCategories();
	}
	const onOpenChange: CreateDialogProps['onOpenChange'] = ({ curr, next }) => {
		if (curr === false) {
			loadData();
		} else {
			product = undefined;
		}
		return next;
	};
	const {
		elements: { trigger, overlay, content, title, description, close, portalled },
		states: { open }
	} = createDialog({
		onOpenChange
	});
	const updateProduct = async () => {
		const propertiesToCopy: (keyof Tables<'m_product'>)[] = [
			'barcode',
			'mpn',
			'name',
			'm_product_category_id',
			'isactive',
			'isselfservice',
			'discontinued'
		];
		const targetObject: any = {};
		for (const property of propertiesToCopy) {
			if (product?.hasOwnProperty(property)) {
				targetObject[property] = product[property];
			}
		}
		const { error } = await $page.data.supabase
			.from('m_product')
			.update(targetObject)
			.eq('id', product?.id);

		/* console.log('targetObject', targetObject); */
		return;
	};
	/* let value: stir; */
</script>

<button use:melt={$trigger} type="button" class="trigger" aria-label="Update dimensions">
	<AlignJustify class="square-4" />
	<span class="sr-only">Open Popover</span>
</button>
<div use:melt={$portalled}>
	{#if $open && product}
		<div
			use:melt={$overlay}
			class="fixed inset-0 z-50 bg-layer-1/50"
			transition:fade={{ duration: 150 }}
		/>
		{#if product}
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
				<p use:melt={$description} class="text-zinc-600 mb-5 mt-2 leading-normal">Edit product.</p>
				<div class="flex flex-col space-y-2">
					<!-- <form method="POST" action="?/updateProduct"> -->
					<section class="grid grid-cols-2 gap-2">
						<div>
							<label for="id">ID</label>
							<input id="id" name="id" type="text" class="w-full" disabled value={product.id} />
						</div>
						<div>
							<label for="sku">SKU</label>
							<input id="sku" name="sku" type="text" class="w-full" bind:value={product.sku} />
						</div>
					</section>
					<section>
						<div>
							<label for="name">Name</label>
							<input id="name" name="name" type="text" class="w-full" bind:value={product.name} />
						</div>
						<div class="grid grid-cols-3 gap-2">
							<div>
								<label for="barcode">Barcode</label>
								<input
									id="barcode"
									name="barcode"
									type="text"
									class="w-full"
									bind:value={product.barcode}
								/>
							</div>
							<div>
								<label for="brand">Brand</label>
								<input
									id="brand"
									name="brand"
									type="text"
									class="w-full"
									bind:value={product.brand}
								/>
							</div>
							<div>
								<label for="mpn">MPN</label>
								<input id="mpn" name="mpn" type="text" class="w-full" bind:value={product.mpn} />
							</div>
						</div>
						<div>
							<label for="m_product_category_id">Product category</label>
							<input
								id="m_product_category_id"
								name="m_product_category_id"
								type="text"
								class="w-full"
								bind:value={product.m_product_category_id}
							/>
						</div>
						<div>
							<label for="c_uom_id">UOM</label>
							<input
								id="c_uom_id"
								name="c_uom_id"
								type="text"
								class="w-full"
								bind:value={product.c_uom_id}
							/>
						</div>
						<div>
							<label for="condition">Condition</label>
							<input
								id="condition"
								name="condition"
								type="text"
								class="w-full"
								bind:value={product.condition}
							/>
						</div>
						<div>
							<label for="created">Created</label>
							<input
								id="created"
								name="created"
								type="text"
								class="w-full"
								value={DateTimeFormat(product.created)}
							/>
						</div>
						<div>
							<label for="updated">Updated</label>
							<input
								id="updated"
								name="updated"
								type="text"
								class="w-full"
								value={DateTimeFormat(product.updated)}
							/>
						</div>
						<div class="grid grid-cols-3 gap-2">
							<!-- <input hidden name="isselfservice" bind:value={product.isselfservice} /> -->
							<Checkbox
								name="isselfservice"
								labelText="Is self-service?"
								bind:checked={product.isselfservice}
								value
							></Checkbox>
							<Checkbox
								name="discontinued"
								labelText="Is Discontinued?"
								bind:checked={product.discontinued}
							></Checkbox>
							<Checkbox name="isactive" labelText="Is active?" bind:checked={product.isactive} value
							></Checkbox>
						</div>
						<!-- <Select name="Category" bind:options={categories}></Select> -->
						<!-- <input hidden name="m_product_category_id" bind:value={product.m_product_category_id} /> -->
						{#if categories}
							<Combobox
								labelText="Category"
								placeholder="Choose category"
								comboboxOptions={categories}
								bind:value={product.m_product_category_id}
							></Combobox>
						{/if}
					</section>
					<Button type="button" on:click={updateProduct}>Save</Button>
					<!-- </form> -->
				</div>
			</div>
		{/if}
	{/if}
</div>
