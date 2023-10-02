<script lang="ts">
	import { page } from '$app/stores';
	import { fade, fly } from 'svelte/transition';

	import { createDialog, melt } from '@melt-ui/svelte';
	import type { CreateDialogProps } from '@melt-ui/svelte';

	import { X, AlignJustify } from 'lucide-svelte';
	import type { Tables } from '$lib/types/database.types';

	export let id: string;

	let product: Tables<'m_product'> | undefined;
	async function loadData() {
		const { data: result } = await $page.data.supabase
			.from('m_product')
			.select()
			.eq('id', id)
			.maybeSingle();
		/* const { data: categories } = await supabase
			.from('m_product_category')
			.select('id,name')
			.order('name'); */
		console.log(JSON.stringify(result, null, 2));
		product = result;
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
</script>

<button use:melt={$trigger} type="button" class="trigger" aria-label="Update dimensions">
	<AlignJustify class="square-4" />
	<span class="sr-only">Open Popover</span>
</button>
<div use:melt={$portalled}>
	{#if $open}
		<div
			use:melt={$overlay}
			class="bg-layer-1/50 fixed inset-0 z-50"
			transition:fade={{ duration: 150 }}
		/>
		{#if product}
			<div
				use:melt={$content}
				class="bg-layer-1 fixed right-0 top-0 z-50 h-screen w-1/2 p-6
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
				<p use:melt={$description} class="mb-5 mt-2 leading-normal text-zinc-600">Edit product.</p>
				<div class="flex flex-col space-y-2">
					<section class="grid grid-cols-2 gap-2">
						<div>
							<label for="id">ID</label>
							<input id="id" type="text" class="w-full" disabled bind:value={product.id} />
						</div>
						<div>
							<label for="sku">SKU</label>
							<input id="sku" type="text" class="w-full" bind:value={product.sku} />
						</div>
					</section>
					<section>
						<div>
							<label for="name">Name</label>
							<input id="name" type="text" class="w-full" bind:value={product.name} />
						</div>
						<div>
							<label for="name">Name</label>
							<input id="name" type="text" class="w-full" bind:value={product.name} />
						</div>
						<div>
							<label for="name">Name</label>
							<input id="name" type="text" class="w-full" bind:value={product.name} />
						</div>
						<div>
							<label for="name">Name</label>
							<input id="name" type="text" class="w-full" bind:value={product.name} />
						</div>
						<div>
							<label for="name">Name</label>
							<input id="name" type="text" class="w-full" bind:value={product.name} />
						</div>
						<div>
							<label for="name">Name</label>
							<input id="name" type="text" class="w-full" bind:value={product.name} />
						</div>
					</section>
				</div>
			</div>
		{/if}
	{/if}
</div>
