<script lang="ts">
	import { Bell, Grip, Check, ChevronDown } from 'lucide-svelte';
	import { createSelect, melt } from '@melt-ui/svelte';
	import type { CreateSelectProps, SelectOption } from '@melt-ui/svelte';

	import { fade } from 'svelte/transition';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { Select } from '$lib/components/melt-ui';

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
	/* 	const onSelected = ({ next }:{next: SelectOption<number>}) => { */
	const onSelected = ({ detail }: CustomEvent) => {
		const next = detail.next;
		const stringValue: string = (next?.value as number)?.toString();
		if (next !== undefined) {
			const newUrl = new URL($page.url);
			newUrl?.searchParams?.set('wh', stringValue);
			goto(newUrl);
		}
		return;
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

<header class="flex h-full items-center justify-between px-4">
	<Select {options} defaultSelected={options[0]} on:onSelectedChange={onSelected}></Select>
</header>
