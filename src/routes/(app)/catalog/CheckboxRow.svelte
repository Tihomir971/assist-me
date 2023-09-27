<script lang="ts">
	import type { Readable, Writable } from 'svelte/store';
	type Checkbox = HTMLInputElement & { indeterminate?: Boolean };
	let checkbox: Checkbox;
	export let isSelected: Writable<boolean>;
	//	export let isSelected: Writable<boolean> = ;

	//	export let isSomeSubRowsSelected: Readable<boolean>;
	export let isSomeSubRowsSelected: Readable<boolean>;

	$: if (checkbox !== undefined) {
		if ($isSomeSubRowsSelected === true && $isSelected === false) {
			checkbox.indeterminate = true;
		} else {
			checkbox.indeterminate = false;
		}
	}
</script>

<input
	id="checkbox"
	type="checkbox"
	class="checkbox ml-1 h-4 w-4"
	bind:this={checkbox}
	bind:checked={$isSelected}
/>
