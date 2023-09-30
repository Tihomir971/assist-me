<script lang="ts">
	import type { Readable, Writable } from 'svelte/store';

	export let isSelected: Writable<boolean>;
	export let isSomeSubRowsSelected: Readable<boolean>;
</script>

<input
	class="h-4 w-4"
	type="checkbox"
	bind:checked={$isSelected}
	indeterminate={$isSomeSubRowsSelected && !$isSelected}
/>
