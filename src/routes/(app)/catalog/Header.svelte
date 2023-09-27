<script lang="ts">
	import { Bell, Grip, Check, ChevronDown } from 'lucide-svelte';
	import { createSelect, melt } from '@melt-ui/svelte';
	import type { CreateSelectProps, SelectOption } from '@melt-ui/svelte';

	import { fade } from 'svelte/transition';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	const options: SelectOption<number>[] = [
		{ value: 5, label: 'Retail T' },
		{ value: 6, label: 'Service T' },
		{ value: 2, label: 'Wholesale T' }
	];
	const onSelectedChange: CreateSelectProps['onSelectedChange'] = ({ next }) => {
		const stringValue: string = (next?.value as number)?.toString();
		if (next !== undefined) {
			const newUrl = new URL($page.url);
			newUrl?.searchParams?.set('wh', stringValue);
			goto(newUrl);
		}
		return next;
	};
	const {
		elements: { trigger, menu, option, label },
		states: { selectedLabel, open, selected },
		helpers: { isSelected }
	} = createSelect({
		defaultSelected: options[0],
		forceVisible: true,
		positioning: {
			placement: 'bottom',
			fitViewport: true,
			sameWidth: true
		},
		onSelectedChange
	});
</script>

<header class="flex h-full w-full items-center justify-between px-4">
	<div class="flex items-center gap-1">
		<!-- svelte-ignore a11y-label-has-associated-control - $label contains the 'for' attribute -->
		<label class="text-magnum-900 block" use:melt={$label}>Warehouse:</label>
		<button
			class="rounded-lg text-magnum-700 shadow flex h-10 min-w-[220px] items-center justify-between bg-surface-2
				px-3 py-2 transition-opacity hover:opacity-90"
			use:melt={$trigger}
			aria-label="Food"
		>
			{$selectedLabel || 'Choose Warehouse'}
			<ChevronDown class="square-5" />
		</button>
		{#if $open}
			<div
				class="rounded-lg shadow z-10 flex
				  max-h-[300px] flex-col overflow-y-auto bg-surface-3
				  p-1 focus:!ring-0"
				use:melt={$menu}
				transition:fade={{ duration: 150 }}
			>
				{#each options as item}
					<div
						class="rounded-lg text-neutral-800 focus:text-magnum-700 data-[highlighted]:bg-magnum-50 data-[selected]:bg-magnum-100 data-[highlighted]:text-magnum-900 data-[selected]:text-magnum-900
							relative cursor-pointer
						  py-1 pl-8
						  pr-4 focus:z-10"
						use:melt={$option({ value: item.value, label: item.label })}
					>
						<div class="check {$isSelected(item) ? 'block' : 'hidden'}">
							<Check class="square-4" />
						</div>

						{item.label}
					</div>
				{/each}
			</div>
		{/if}
	</div>
</header>

<style lang="postcss">
	.check {
		position: absolute;
		/* left: theme(spacing.2); */
		top: 50%;
		/* z-index: theme(zIndex.20); */
		translate: 0 calc(-50% + 1px);
		/* color: theme(colors.magnum.500); */
	}
</style>
