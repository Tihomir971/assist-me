<script lang="ts">
	interface TreeNode {
		id: string | number;
		text: string;
		icon?: typeof import('svelte').SvelteComponent;
		disabled?: boolean;
		expanded?: boolean;
		parent_id?: number | null;
		children?: TreeNode[];
	}

	//	import { TreeView } from '$lib/components/carbon/TreeView';
	import { page } from '$app/stores';
	import { goto, invalidate } from '$app/navigation';
	import { FolderSync, Minimize2, Pencil, Plus, Search, Trash2 } from 'lucide-svelte';
	//	export let children: TreeNode[];

	let categories:
		| {
				value: number;
				label: string;
		  }[]
		| null;
	let activeId: TreeNodeId | undefined;

	$: parentCategory = categories
		? categories.find((obj: { value: number; label: string }) => obj.value === category.parent_id)
		: undefined;

	let openEdit = false;

	type TreeNodeId = string | number;

	function rerunLoadFunction() {
		if (typeof activeId !== 'undefined') {
			const newUrl = new URL($page.url);
			newUrl?.searchParams?.set('cat', activeId.toString());

			goto(newUrl);
		}
		return;
	}
	let category: any;
	async function getCategory(id: number) {
		const { data: categoryData } = await $page.data.supabase
			.from('m_product_category')
			.select()
			.eq('id', id)
			.single();
		category = categoryData;
		const { data: categoriesData } = await $page.data.supabase
			.from('m_product_category')
			.select('value:id,label:name');
		categories = categoriesData;
		return;
	}
</script>

<!-- <aside class="p-1 hidden h-[calc(100vh-3rem)] w-full shrink-0 md:sticky md:block overflow-hidden"></aside> -->
<aside class="flex h-[calc(100vh-3rem)] w-64 flex-col overflow-hidden border-r">
	<div
		class="isolate inline-flex w-full flex-row justify-center overflow-hidden border border-solid"
	>
		<button type="button" on:click><Plus /></button>
		<button on:click><Trash2 /></button>
		<button
			disabled={activeId === undefined}
			on:click={() => {
				if (activeId) {
					getCategory(Number(activeId)).then((data) => {
						/* drawerSettings.meta = data; */
						openEdit = true;
					});
				}
			}}><Pencil /></button
		>
		<button on:click={() => invalidate('app:categories')}><FolderSync /></button>
		<button on:click><Minimize2 /></button>
		<button on:click><Search /></button>
	</div>
	<div class="h-full overflow-y-auto">
		<!-- <TreeView hideLabel bind:activeId {children} on:select={() => rerunLoadFunction()} /> -->
	</div>
</aside>

<!-- Edit Category -->
<!-- <Sheet.Root open={openEdit} closeOnOutsideClick={false} onOpenChange={() => (openEdit = !openEdit)}> -->
<!-- <Sheet.Content side="right"> -->
<!-- <Sheet.Header>
			<Sheet.Title>Edit Category</Sheet.Title>
			<Sheet.Description>
				Make changes to your profile here. Click save when you're done.
			</Sheet.Description>
		</Sheet.Header> -->
<!-- <form>
			<div class="grid gap-4 w-full py-4">
				<div class="grid grid-cols-4 items-center gap-4">
					<Label for="name" class="text-right">ID</Label>
					<Input id="name" value={category.id} class="col-span-3" />
				</div> -->
<!-- <div class="grid grid-cols-4 items-center gap-4">
					<Label for="username" class="text-right">Name</Label>
					<Input id="username" value={category.name} class="col-span-3" />
				</div>
				<div class="flex items-center space-x-2">
					<input type="checkbox" id="terms" bind:checked={category.isactive} />
					<Label
						for="terms"
						class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
					>
						Is active?
					</Label>
				</div>
				<div class="flex items-center space-x-2">
					<input id="terms" type="checkbox" bind:checked={category.isselfservice} />
					<Label
						for="terms"
						class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
					>
						Is self service?
					</Label>
				</div>
				<div class="grid grid-cols-4 items-center gap-4">
					<Label for="name" class="text-right">Parent</Label>
					<Select.Root selected={parentCategory}>
						<Select.Trigger class="col-span-3">
							<Select.Value placeholder="Select parent category" />
						</Select.Trigger>
						<Select.Content
							>{#if categories}
								{#each categories as category}
									<Select.Item value={category.value}>{category.label}</Select.Item>
								{/each}
							{/if}
						</Select.Content>
					</Select.Root>
				</div>
			</div>
		</form> -->
<!-- <Sheet.Footer>
			<Sheet.Close asChild let:builder>
				<button  type="submit">Save changes</button>
			</Sheet.Close>
		</Sheet.Footer> -->
<!-- </Sheet.Content> -->
<!-- </Sheet.Root> -->
