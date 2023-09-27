<script lang="ts">
	import Actions from './data-table-actions.svelte';
	import NumberFormat from './NumberFormat.svelte';
	import CheckboxHeader from './CheckboxHeader.svelte';
	import CheckboxRow from './CheckboxRow.svelte';
	import TextRight from './TextRight.svelte';

	//	import { Drawer } from '$lib/components/flowbite';
	/* 	import { sineIn } from 'svelte/easing'; */
	let hidden1 = true;
	/* 	let transitionParams = {
		x: -320,
		duration: 200,
		easing: sineIn
	}; */

	import { writable } from 'svelte/store';
	import type { PageData } from './$types';
	export let data: PageData;
	let { supabase } = data;
	$: ({ supabase } = data);

	//DataTable
	// import Headles Table
	import * as Table from '$lib/components/ui/table';

	import { createTable, createRender, Subscribe, Render } from 'svelte-headless-table';
	// import Headles Table Plugins
	import {
		addColumnFilters,
		addHiddenColumns,
		addPagination,
		addSelectedRows,
		addSortBy,
		addTableFilter
	} from 'svelte-headless-table/plugins';
	const products = writable(data.products);
	$: $products = data.products;
	const table = createTable(products, {
		sort: addSortBy({ disableMultiSort: true }),
		page: addPagination({ initialPageSize: 17 }),
		tableFilter: addTableFilter({
			fn: ({ filterValue, value }) => value.toLowerCase().includes(filterValue.toLowerCase())
		}),
		select: addSelectedRows(),
		hide: addHiddenColumns()
	});
	let columns = table.createColumns([
		table.column({
			accessor: 'id',
			header: (_, { pluginStates }) => {
				const { allPageRowsSelected, someRowsSelected } = pluginStates.select;
				return createRender(CheckboxHeader, {
					allPageRowsSelected,
					someRowsSelected
				});
			},
			cell: ({ row }, { pluginStates }) => {
				const { getRowState } = pluginStates.select;
				const { isSelected, isSomeSubRowsSelected } = getRowState(row);
				return createRender(CheckboxRow, {
					isSelected,
					isSomeSubRowsSelected
				});
			},
			plugins: {
				sort: {
					disable: true
				},
				tableFilter: {
					exclude: true
				}
			}
		}),
		/* 		table.display({
			id: 'selected',
			header: '',
			cell: ({ row }, { pluginStates }) => {
				const { isSelected, isSomeSubRowsSelected } = pluginStates.select.getRowState(row);
				return createRender(SelectIndicator, {
					isSelected,
					isSomeSubRowsSelected
				});
			}
		}),*/
		table.column({
			header: 'SKU',
			accessor: 'sku',
			plugins: {
				sort: {},
				tableFilter: {
					getFilterValue(value) {
						return value.toLowerCase();
					}
				}
			}
		}),
		table.column({ header: 'Barcode', accessor: 'barcode' }),
		table.column({ header: 'MPN', accessor: 'mpn' }),
		table.column({ header: 'Name', accessor: 'name' }),

		table.column({
			header: createRender(TextRight, { text: 'Qty.' }),
			accessor: 'qtyonhand',
			cell: ({ value }) =>
				createRender(NumberFormat, {
					value: value,
					locales: 'sr-Latn',
					style: 'decimal',
					fractionDigits: 2
				})
		}),

		table.column({
			header: createRender(TextRight, { text: 'Purch.' }),
			accessor: 'pricePurchase',
			cell: ({ value }) =>
				createRender(NumberFormat, {
					value: value,
					locales: 'sr-Latn',
					style: 'decimal',
					fractionDigits: 2
				})
		}),
		table.column({
			header: createRender(TextRight, { text: 'Retail' }),
			accessor: 'priceRetail',
			cell: ({ value }) =>
				createRender(NumberFormat, {
					value: value,
					locales: 'sr-Latn',
					style: 'decimal',
					fractionDigits: 2
				})
		}),
		table.column({
			header: createRender(TextRight, { text: 'Market' }),
			accessor: 'priceMarket',
			cell: ({ value }) =>
				createRender(NumberFormat, {
					value: value,
					locales: 'sr-Latn',
					style: 'decimal',
					fractionDigits: 2
				})
		}),
		table.column({
			header: createRender(TextRight, { text: 'Recom.' }),
			accessor: 'priceRecommended',
			cell: ({ value }) =>
				createRender(NumberFormat, {
					value: value,
					locales: 'sr-Latn',
					style: 'decimal',
					fractionDigits: 2
				})
		}),
		table.column({
			header: '',
			accessor: ({ id }) => id,
			cell: ({ value }) =>
				createRender(Actions, { id: value.toString() }).on('edit', (ev) => {
					getProduct(ev.detail.id).then((data) => {
						hidden1 = false;
						//	drawerSettings.meta = data;
						//	drawerSettings.meta.form = form;
						//	drawerStore.open(drawerSettings);
					});
				}),

			plugins: {
				sort: { disable: true }
			}
		})
	]);
	//Create View Model
	const { headerRows, pageRows, tableAttrs, tableBodyAttrs, flatColumns, pluginStates, rows } =
		table.createViewModel(columns, {
			rowDataId: (row) => row.id.toString()
		});
	async function getProduct(id: number) {
		const { data: product } = await supabase.from('m_product').select().eq('id', id).single();
		const { data: categories } = await supabase
			.from('m_product_category')
			.select('id,name')
			.order('name');

		return { product, categories };
	}
	const { selectedDataIds } = pluginStates.select;
</script>

<!-- SkeletonLab .table-container -->
<Table.Root {...$tableAttrs}>
	<Table.Header class="bg-Base-7 text-Base-12">
		{#each $headerRows as headerRow}
			<Subscribe rowAttrs={headerRow.attrs()}>
				<Table.Row>
					{#each headerRow.cells as cell (cell.id)}
						<Subscribe attrs={cell.attrs()} let:attrs props={cell.props()} let:props>
							<Table.Head {...attrs} class="text-Base-12 [&:has([role=checkbox])]:pl-3">
								<Render of={cell.render()} />
							</Table.Head>
						</Subscribe>
					{/each}
				</Table.Row>
			</Subscribe>
		{/each}
	</Table.Header>
	<Table.Body {...$tableBodyAttrs}>
		{#each $pageRows as row (row.id)}
			<Subscribe rowAttrs={row.attrs()} let:rowAttrs>
				<Table.Row {...rowAttrs} data-state={$selectedDataIds[row.id] && 'selected'}>
					{#each row.cells as cell (cell.id)}
						<Subscribe attrs={cell.attrs()} let:attrs>
							<Table.Cell class="border-Base-7 border-b [&:has([role=checkbox])]:pl-3" {...attrs}>
								{#if cell.id === 'amount'}
									<div class="text-right font-medium">
										<Render of={cell.render()} />
									</div>
								{:else}
									<Render of={cell.render()} />
								{/if}
							</Table.Cell>
						</Subscribe>
					{/each}
				</Table.Row>
			</Subscribe>
		{/each}
	</Table.Body>
</Table.Root>

<!-- <Drawer
	placement="right"
	transitionType="fly"
	{transitionParams}
	bind:hidden={hidden1}
	id="sidebar1"
>
	<div class="flex items-center">
		<h5
			id="drawer-label"
			class="inline-flex items-center mb-6 text-base font-semibold text-gray-500 uppercase dark:text-gray-400"
		>
			Contact us
		</h5>
		  <CloseButton on:click={() => (hidden3 = true)} class="mb-4 dark:text-white" />
	</div>
	<form action="#" class="mb-6">
		<div class="relative">
			<input id="email" name="email" required placeholder="name@company.com" />
			<label for="email" class="block mb-2">Your email</label>
		</div>
		<div class="relative">
			<input id="subject" name="subject" required placeholder="Let us know how we can help you" />
			<label for="subject" class="block mb-2">Subject</label>
		</div>
		<div class="relative">
			<textarea id="message" placeholder="Your message..." rows="4" name="message" />
			<label for="message" class="mb-2">Your message</label>
		</div>
		<button type="submit" class="w-full">Send message</button>
	</form>
	<p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
		<a href="/" class="text-primary-600 hover:underline dark:text-primary-500">info@company.com</a>
	</p>
	<p class="text-sm text-gray-500 dark:text-gray-400">
		<a href="/" class="text-primary-600 hover:underline dark:text-primary-500">212-456-7890</a>
	</p>
</Drawer> -->
