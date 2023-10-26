<script lang="ts">
	import { createDropdownMenu, melt } from '@melt-ui/svelte';
	import { goto } from '$app/navigation';
	import { writable } from 'svelte/store';
	import { fly } from 'svelte/transition';
	import { AlignJustify, Check, ChevronRight } from 'lucide-svelte';

	export let id: string | undefined;

	const settingsSync = writable(true);
	const hideMeltUI = writable(false);

	const {
		elements: { trigger, menu, item, separator, arrow },
		builders: { createSubmenu, createMenuRadioGroup, createCheckboxItem },
		states: { open }
	} = createDropdownMenu({
		forceVisible: true,
		loop: true
	});
	const {
		elements: { subMenu, subTrigger },
		states: { subOpen }
	} = createSubmenu();

	const {
		elements: { radioGroup, radioItem },
		helpers: { isChecked }
	} = createMenuRadioGroup({
		defaultValue: 'Hunter Johnston'
	});

	const {
		elements: { checkboxItem }
	} = createCheckboxItem({
		checked: settingsSync
	});

	const {
		elements: { checkboxItem: checkboxItemA }
	} = createCheckboxItem({
		checked: hideMeltUI
	});

	const personsArr = ['Hunter Johnston', 'Thomas G. Lopes', 'Adrian Gonz', 'Franck Poingt'];
</script>

<!-- <button type="button" on:click={() => goto(`/catalog/product/${id}`)}>
	<AlignJustify class="opacity-80 hover:opacity-50 focus:opacity-100"></AlignJustify>
</button>
 -->

<button type="button" class="trigger" use:melt={$trigger} aria-label="Update dimensions">
	<AlignJustify class="square-4" />
	<span class="sr-only">Open Popover</span>
</button>

{#if $open}
	<div class="menu" use:melt={$menu} transition:fly={{ duration: 150, y: -10 }}>
		<div class="item" use:melt={$item} on:m-click={() => goto(`/catalog/product/${id}`)}>Edit</div>
		<div class="item" use:melt={$item}>Check for Updates...</div>
	</div>
{/if}

<style lang="postcss">
	.menu {
		@apply z-10 flex max-h-[300px] min-w-[220px] flex-col shadow-3;
		@apply rounded-2 bg-gray-1 p-1 shadow-layer-1/30 lg:max-h-none;
		@apply ring-0 !important;
	}
	.subMenu {
		@apply min-w-[220px] shadow-3 shadow-layer-1/30;
	}
	.item {
		@apply relative h-6 min-h-[24px] select-none rounded-2 pl-6 pr-1;
		@apply z-20 text-primary-9 outline-none;
		@apply data-[highlighted]:bg-primary-2 data-[highlighted]:text-primary-9;
		@apply data-[disabled]:text-gray-3;
		@apply flex items-center text-sm leading-none;
		@apply ring-0 !important;
	}
	.trigger {
		@apply inline-flex h-9 w-9 items-center justify-center rounded-full bg-gray-1;
		@apply text-primary-9 transition-colors hover:bg-gray-1/90;
		@apply data-[highlighted]:ring-primary-4 data-[highlighted]:ring-offset-2 !important;
		@apply p-0 text-sm font-medium  data-[highlighted]:outline-none;
	}
	.check {
		@apply absolute left-2 top-1/2 text-primary-5;
		translate: 0 calc(-50% + 1px);
	}

	.dot {
		@apply h-[4.75px] w-[4.75px] rounded-full bg-primary-9;
	}

	.separator {
		@apply m-[5px] h-[1px] bg-primary-2;
	}

	.rightSlot {
		@apply ml-auto pl-5;
	}

	.icon {
		@apply h-[13px] w-[13px];
	}
	.check {
		@apply absolute left-0 inline-flex w-6 items-center justify-center;
	}
	.text {
		@apply pl-6 text-xs leading-6 text-gray-6;
	}
</style>
