<script lang="ts">
	import { createSwitch, melt } from '@melt-ui/svelte';

	export let label: string | undefined = undefined;
	export let checked: boolean | undefined = undefined;

	const {
		elements: { root, input }
	} = createSwitch({ defaultChecked: checked });
</script>

<form>
	<div class="flex items-center">
		<label class=" pr-4 leading-none" for="airplane-mode" id="airplane-mode-label">
			{label}
		</label>
		<button
			on:m-click
			use:melt={$root}
			class="relative h-6 cursor-default rounded-full bg-layer-3 transition-colors data-[state=checked]:bg-[--link]"
			id="airplane-mode"
			aria-labelledby="airplane-mode-label"
		>
			<span class="thumb block rounded-full bg-text-2 transition" />
		</button>
		<input use:melt={$input} />
	</div>
</form>

<style>
	button {
		--w: 2.75rem;
		--padding: 0.125rem;
		width: var(--w);
	}

	.thumb {
		--size: 1.25rem;
		width: var(--size);
		height: var(--size);
		transform: translateX(var(--padding));
	}

	:global([data-state='checked']) .thumb {
		transform: translateX(calc(var(--w) - var(--size) - var(--padding)));
	}
</style>
