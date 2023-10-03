<script lang="ts">
	import type { HTMLInputTypeAttribute } from 'svelte/elements';

	export let type: HTMLInputTypeAttribute;
	export let name: string | null | undefined = undefined;
	export let value: any;
	export let placeholder: string | null | undefined = undefined;
	export let label: string | undefined = undefined;
</script>

<div class="inline-flex" class:flex-row-reverse={type === 'checkbox'}>
	{#if label}
		<label for={name} class="text-gray-900 block text-sm font-medium leading-6">{label}</label>
	{/if}
	<div class="mt-2">
		<input
			id="email"
			{name}
			{type}
			autocomplete="email"
			{value}
			{placeholder}
			class="text-gray-900 block w-full shadow-2 ring-1 ring-inset ring-gray-3 placeholder:text-gray-4 focus:ring-2 focus:ring-inset focus:ring-indigo-6 sm:text-sm sm:leading-6"
		/>
	</div>
</div>
