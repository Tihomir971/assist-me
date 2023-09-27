<script lang="ts">
	import type { HTMLInputTypeAttribute } from 'svelte/elements';

	//	export let placeholder: string;
	export let type: HTMLInputTypeAttribute;
	export let name: string;
</script>

<div class="sm:col-span-4">
	<label for="email" class="text-gray-900 block text-sm font-medium leading-6">Email address</label>
	<div class="mt-2">
		<input
			id="email"
			{name}
			{type}
			autocomplete="email"
			class="text-gray-900 block w-full shadow-2 ring-1 ring-inset ring-gray-3 placeholder:text-gray-4 focus:ring-2 focus:ring-inset focus:ring-indigo-6 sm:text-sm sm:leading-6"
		/>
	</div>
</div>
