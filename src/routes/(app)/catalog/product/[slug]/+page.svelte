<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import { base } from '$app/paths';
	import { Gallery, GalleryNew } from '$lib';
	import { Checkbox } from '$lib/components/carbon';
	import { Combobox } from '$lib/components/melt-ui';
	import { DateTimeFormat } from '$lib/scripts/format';
	import ActionsProduct from '../../actions-product.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	$: ({ product, categories, streamed } = data);
	let previousPage: string = base;
	$: images = product?.imageurl?.split(';');
	afterNavigate(({ from }) => {
		if (from) {
			previousPage = from.url.pathname + from.url.search;
		}
	});
</script>

<div class="card m-8 w-[1000px] overflow-auto">
	<header class="flex justify-between">
		<h3 class="title">Edit product</h3>
		<button type="submit">Save</button>
	</header>
	<div class="space-y-4 p-4">
		{previousPage}
		{#if product}
			<div class="wrapper">
				<label for="name">Name</label>
				<input id="name" name="name" type="text" class="w-full" bind:value={product.name} />
			</div>
			<div class="grid grid-cols-2 gap-4">
				<div>
					<section class="grid grid-cols-2 gap-2">
						<div class="wrapper">
							<label for="id">ID</label>
							<input id="id" name="id" type="text" class="w-full" disabled value={product.id} />
						</div>
						<div class="wrapper">
							<label for="sku">SKU</label>
							<input id="sku" name="sku" type="text" class="w-full" bind:value={product.sku} />
						</div>
						<div class="wrapper">
							<label for="barcode">Barcode</label>
							<input
								id="barcode"
								name="barcode"
								type="text"
								class="w-full"
								bind:value={product.barcode}
							/>
						</div>
						<div class="wrapper">
							<label for="c_uom_id">UOM</label>
							<input
								id="c_uom_id"
								name="c_uom_id"
								type="text"
								class="w-full"
								bind:value={product.c_uom_id}
							/>
						</div>
						<div class="wrapper">
							<label for="brand">Brand</label>
							<input
								id="brand"
								name="brand"
								type="text"
								class="w-full"
								bind:value={product.brand}
							/>
						</div>
						<div class="wrapper">
							<label for="mpn">MPN</label>
							<input id="mpn" name="mpn" type="text" class="w-full" bind:value={product.mpn} />
						</div>
						<div class="wrapper">
							<label for="created">Created</label>
							<input
								id="created"
								name="created"
								type="text"
								class="w-full"
								disabled
								value={DateTimeFormat(product.created)}
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
								value={DateTimeFormat(product.updated)}
							/>
						</div>
						<div>
							{#if categories}
								<Combobox
									labelText="Product category"
									placeholder="Choose category"
									options={categories}
									bind:value={product.m_product_category_id}
								></Combobox>
							{/if}
							<!-- 	<label for="m_product_category_id">Product category</label>
							<input
							id="m_product_category_id"
							name="m_product_category_id"
							type="text"
							class="w-full"
							bind:value={product.m_product_category_id}
							/> -->
						</div>
						<div class="wrapper">
							<label for="condition">Condition</label>
							<input
								id="condition"
								name="condition"
								type="text"
								class="w-full"
								bind:value={product.condition}
							/>
						</div>
					</section>
					<div class="grid grid-cols-3 gap-2 p-2">
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
				</div>
				{#await streamed.images then images}
					<Gallery images={images.imageURLs} />
				{/await}
			</div>
		{/if}
	</div>
</div>
