<script lang="ts">
	import { createCombobox, melt } from '@melt-ui/svelte';
	import type { ComboboxOption, CreateComboboxProps } from '@melt-ui/svelte';
	import { Check, ChevronDown, ChevronUp } from 'lucide-svelte';
	import { fly } from 'svelte/transition';

	export let labelText: string | undefined = undefined;
	export let placeholder: string | undefined = undefined;
	export let name: string | undefined = undefined;
	export let value: number | null;
	export let options: ComboboxOption<number>[];
	const {
		elements: { menu, input, option, label },
		states: { open, inputValue, touchedInput, selected },
		helpers: { isSelected }
	} = createCombobox({
		forceVisible: true,
		/* onSelectedChange, */
		defaultSelected: options.find((obj) => obj.value === value)
		/* defaultSelected: options.find((obj) => obj.value === value) */
	});

	$: if (!$open) {
		$inputValue = $selected?.label ?? '';
		value = $selected?.value ?? null;
	}

	$: filteredOptions = $touchedInput
		? options.filter(({ label, value }) => {
				const normalizedInput = $inputValue.toLowerCase();
				return label?.toLowerCase().includes(normalizedInput) /*  ||
          value.toLowerCase().includes(normalizedInput) */;
		  })
		: options;
</script>

<div class="wrapper">
	<!-- svelte-ignore a11y-label-has-associated-control - $label contains the 'for' attribute -->
	<label use:melt={$label} for={name}>
		<span>{labelText}</span>
	</label>
	<div class="relative">
		<input hidden {name} type="text" value={$selected?.value} />
		<input use:melt={$input} type="text" {placeholder} class="w-full" />
		<div class="absolute right-2 top-1/2 z-10 -translate-y-1/2">
			{#if $open}
				<ChevronUp size="16" class="square-4" />
			{:else}
				<ChevronDown size="16" class="square-4" />
			{/if}
		</div>
	</div>
</div>
{#if $open}
	<ul
		class="z-10 flex max-h-96 flex-col overflow-hidden bg-layer-2"
		use:melt={$menu}
		transition:fly={{ duration: 150, y: -5 }}
	>
		<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
		<div class="flex max-h-full flex-col gap-0 overflow-y-auto px-2 py-2" tabindex="0">
			{#each filteredOptions as item, index (index)}
				<li
					use:melt={$option({
						value: item.value,
						label: item.label
					})}
					class="rounded-md relative cursor-pointer scroll-my-2 py-2 pl-4 pr-4
          data-[highlighted]:bg-layer-4 data-[highlighted]:text-text-1
            data-[disabled]:opacity-50"
				>
					{#if $isSelected(item)}
						<div class="check absolute left-2 top-1/2 z-10 text-primary-9">
							<Check class="square-4" />
						</div>
					{/if}
					<div class="pl-4">
						<span class="block">{item.label}</span>
					</div>
				</li>
			{:else}
				<li
					class="relative cursor-pointer rounded-md py-1 pl-8 pr-4
          data-[highlighted]:bg-primary-1 data-[highlighted]:text-primary-7"
				>
					No results found
				</li>
			{/each}
		</div>
	</ul>
{/if}

<style lang="postcss">
	.check {
		@apply absolute left-2 top-1/2 text-primary-5;
		translate: 0 calc(-50% + 1px);
	}
</style>
