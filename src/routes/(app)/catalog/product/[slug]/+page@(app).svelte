<script lang="ts">
	import { enhance } from '$app/forms';
	import { afterNavigate, goto } from '$app/navigation';
	import { base } from '$app/paths';
	import { Gallery } from '$lib';
	import { Thumbnails } from '$lib/components/Gallery';
	import { Combobox } from '$lib/components/melt-ui';
	import { DateTimeFormat } from '$lib/scripts/format';
	import { afterUpdate, onMount } from 'svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	$: ({ product, categories, streamed } = data);
	let localCopy: any = undefined;
	let modified = false;
	$: if (localCopy && JSON.stringify(product) !== JSON.stringify(localCopy)) {
		modified = true;
	} else {
		modified = false;
	}
	let previousPage: string = base;
	afterNavigate(({ from }) => {
		previousPage = from?.url.pathname || previousPage;
		previousPage = previousPage + '?' + from?.url.searchParams.toString() || previousPage;
		localCopy = Object.assign({}, product);
	});
</script>

<form
	method="POST"
	action="?/setProduct"
	use:enhance={() => {
		return async ({ update }) => {
			update({ reset: false });
		};
	}}
>
	<div class="card container overflow-auto">
		<header class="flex justify-between">
			<h3 class="title">Edit product</h3>
			<div class="flex gap-2">
				<button
					type="reset"
					class="btn"
					on:click={() => {
						goto(previousPage);
					}}>Back</button
				>
				<button type="submit" class="btn" disabled={!modified}>Save</button>
			</div>
		</header>
		<div class="space-y-4 p-4">
			{previousPage}
			{#if product}
				<div class="wrapper">
					<label for="name">Name</label>
					<input
						id="name"
						name="name"
						type="text"
						class="w-full"
						required
						bind:value={product.name}
					/>
				</div>
				<div class="grid grid-cols-2 gap-4">
					<div>
						<section class="grid grid-cols-2 gap-2">
							<div class="wrapper">
								<label for="id">ID</label>
								<input id="id" name="id" type="text" class="w-full" value={product.id} />
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
										name="m_product_category_id"
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
							<div>
								<input
									type="checkbox"
									id="isselfservice"
									name="isselfservice"
									checked={product.isselfservice}
								/>
								<label for="isselfservice">Is Self-service?</label>
							</div>
							<div>
								<input
									type="checkbox"
									id="discontinued"
									name="discontinued"
									checked={product.discontinued}
								/>
								<label for="discontinued">Is Discontinued?</label>
							</div>
							<div>
								<input type="checkbox" id="isactive" name="isactive" checked={product.isactive} />
								<label for="isactive">Is Active?</label>
							</div>
						</div>
					</div>
					{#await streamed.images then images}
						{#if images.imageURLs.length > 0}
							<Gallery images={images.imageURLs} />
							<Thumbnails images={images.imageURLs}></Thumbnails>
						{/if}
					{/await}
				</div>
			{/if}
		</div>
	</div>
</form>
