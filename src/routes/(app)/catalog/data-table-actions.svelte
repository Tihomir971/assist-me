<script lang="ts">
	//	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	//	import { Button } from '$lib/components/ui/button';
	import { createEventDispatcher } from 'svelte';
	//	import CarbonEdit from '~icons/carbon/edit';
	import { AlignJustify } from 'lucide-svelte';

	const dispatch = createEventDispatcher();
	export let id: string;

	const handleClick = () => {
		console.log('id', id);

		dispatch('edit', { id });
	};
</script>

<button type="button" class="trigger" aria-label="Update dimensions" on:click={handleClick}>
	<AlignJustify class="square-4" />
	<span class="sr-only">Open Popover</span>
</button>

<!-- <DropdownMenu.Root>
	<DropdownMenu.Trigger asChild let:builder>
		<button type="button" class="bg-initial btn-icon-sm w-5" on:click={handleClick}>
			<span class="sr-only">Open menu</span>
			<CarbonEdit></CarbonEdit>
		</button>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content>
		<DropdownMenu.Group>
			<DropdownMenu.Label>Actions</DropdownMenu.Label>
			<DropdownMenu.Item on:click={() => navigator.clipboard.writeText(id)}>
				Copy payment ID
			</DropdownMenu.Item>
		</DropdownMenu.Group>
		<DropdownMenu.Separator />
		<DropdownMenu.Item>View customer</DropdownMenu.Item>
		<DropdownMenu.Item>View payment details</DropdownMenu.Item>
	</DropdownMenu.Content>
</DropdownMenu.Root>
 -->
<!-- <style lang="postcss">
	.trigger {
		@apply inline-flex h-6 w-6 items-center justify-center rounded-full bg-white;
		@apply text-magnum-900 transition-colors hover:bg-white/90;
		@apply p-0 text-sm font-medium;
	}
</style> -->
