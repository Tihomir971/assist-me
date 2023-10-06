<script lang="ts">
	import Card from '$lib/components/card/card.svelte';
	import { createSelect, melt } from '@melt-ui/svelte';
	import { Check, ChevronDown } from 'lucide-svelte';
	import { fade } from 'svelte/transition';
	import type { CreateSelectProps, SelectOption } from '@melt-ui/svelte';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	export let options: SelectOption<number>[];
	export let name: string | undefined = undefined;
	/* sweet: ['Caramel', 'Chocolate', 'Strawberry', 'Cookies & Cream'] */
	/* savory: ['Basil', 'Bacon', 'Rosemary'] */
	export let defaultSelected: SelectOption<number | string> | undefined = undefined;
	export let flexRow = true;
	const onSelectedChange: CreateSelectProps['onSelectedChange'] = ({ next }) => {
		dispatch('onSelectedChange', { next });
		return next;
	};
	const {
		elements: { trigger, menu, option, label },
		states: { selectedLabel, open },
		helpers: { isSelected }
	} = createSelect({
		defaultSelected,
		forceVisible: true,
		positioning: {
			placement: 'bottom',
			fitViewport: true,
			sameWidth: true
		},
		onSelectedChange
	});
</script>

<div class="flex items-center gap-2" class:flex-row={flexRow}>
	<!-- svelte-ignore a11y-label-has-associated-control - $label contains the 'for' attribute -->
	<label class="block" use:melt={$label}>{name ?? ''}</label>
	<button
		class="flex h-10 min-w-[220px] items-center justify-between rounded-2 bg-layer-3 px-3 py-2
    text-text-2 transition-opacity hover:opacity-80"
		use:melt={$trigger}
		aria-label="Food"
	>
		{$selectedLabel || 'Select a flavor'}
		<ChevronDown size="20" />
	</button>
	{#if $open}
		<div
			class="shadow z-10 flex max-h-[300px] flex-col overflow-y-auto rounded-2 bg-layer-2 p-1 focus:!ring-0"
			use:melt={$menu}
			transition:fade={{ duration: 150 }}
		>
			{#each options as item}
				<div class="options" use:melt={$option({ value: item.value, label: item.label })}>
					<div class="check {$isSelected(item) ? 'block' : 'hidden'}">
						<Check class="square-4" />
					</div>

					{item.label}
				</div>
			{/each}
		</div>
	{/if}
</div>

<style lang="postcss">
	.check {
		position: absolute;
		left: theme(spacing.2);
		top: 50%;
		z-index: theme(zIndex.20);
		translate: 0 calc(-50% + 1px);
		color: theme(colors.primary.2);
	}
	.options {
		@apply relative cursor-pointer rounded-1 bg-layer-2 py-1 pl-8 pr-4 text-text-2 focus:z-10 focus:text-text-1 data-[highlighted]:bg-primary-3 data-[selected]:bg-primary-10 data-[highlighted]:text-text-1 data-[selected]:text-text-1;
	}
</style>
