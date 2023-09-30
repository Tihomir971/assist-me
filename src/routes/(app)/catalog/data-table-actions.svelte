<script lang="ts">
	//	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	//	import { Button } from '$lib/components/ui/button';
	import { createEventDispatcher } from 'svelte';
	//	import CarbonEdit from '~icons/carbon/edit';
	import { AlignJustify } from 'lucide-svelte';
	import { createDialog, melt, type CreateDialogProps } from '@melt-ui/svelte';
	import { fade, fly } from 'svelte/transition';
	// Internal helpers
	import { X } from 'lucide-svelte';
	const onOpenChange: CreateDialogProps['onOpenChange'] = ({ curr, next }) => {
		if (curr === false) {
			console.log('curr', curr);
			console.log('next', next);
			console.log('id', id);
			/* const response = await fetch('/api/getProduct');
			const product = await response.json();
			console.log(JSON.stringify(product)); */
		} else {
			console.log('closing');
		}
		return next;
	};
	const {
		elements: { trigger, overlay, content, title, description, close, portalled },
		states: { open }
	} = createDialog({
		onOpenChange
	});
	const dispatch = createEventDispatcher();
	export let id: string;

	const handleClick = () => {
		console.log('id', id);
		open.set(true);
		dispatch('edit', { id });
	};
</script>

<button use:melt={$trigger} type="button" class="trigger" aria-label="Update dimensions">
	<AlignJustify class="square-4" />
	<span class="sr-only">Open Popover</span>
</button>
<div use:melt={$portalled}>
	{#if $open}
		<div
			use:melt={$overlay}
			class="fixed inset-0 z-50 bg-surface-1"
			transition:fade={{ duration: 150 }}
		/>
		<div
			use:melt={$content}
			class="shadow-lg fixed left-0 top-0 z-50 h-screen w-full max-w-[350px] bg-surface-4
			  p-6 focus:outline-none"
			transition:fly={{
				x: -350,
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
				<X class="square-4" />
			</button>
			<h2 use:melt={$title} class="text-black mb-0 text-lg font-medium">Notifications</h2>
			<p use:melt={$description} class="text-zinc-600 mb-5 mt-2 leading-normal">
				Check out your latest updates.
			</p>
			<section>
				<div class="rounded-md text-zinc-800 shadow bg-gray-10/80 p-4">
					<h3 class="mb-3 text-base font-semibold">New invitation</h3>
					<p class="text-sm">
						You have been invited to join the <strong>Designers</strong> team.
					</p>
					<div class="mt-6 flex justify-end gap-4">
						<button
							class="bg-zinc-100 text-zinc-600 inline-flex h-8
							  items-center justify-center rounded-[4px] px-4 font-medium
							  leading-none focus:outline-none focus:ring-2
							  focus:ring-primary-4"
						>
							Reject
						</button>
						<button
							class="inline-flex h-8 items-center justify-center
							  rounded-[4px] bg-primary-1 px-4 font-medium leading-none
							  text-primary-9 focus:outline-none focus:ring-2
							  focus:ring-primary-4"
						>
							Accept
						</button>
					</div>
				</div>
			</section>
		</div>
	{/if}
</div>
