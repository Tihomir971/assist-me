<script lang="ts">
	import { invalidate } from '$app/navigation';
	import { FolderSync, Minimize2, Plus, Search, Trash2 } from 'lucide-svelte';
</script>

<div class="flex h-full">
	<button type="button" class="icon h-full"><Plus /></button>
	<button class="icon h-full" on:click><Trash2 /></button>
	<!-- <button
	disabled={activeId === undefined}
	on:click={() => {
		if (activeId) {
			getCategory(Number(activeId)).then((data) => {
				/* drawerSettings.meta = data; */
				openEdit = true;
			});
		}
	}}><Pencil /></button
> -->
	<button class="icon h-full" on:click={() => invalidate('app:categories')}><FolderSync /></button>
	<button class="icon h-full" on:click><Minimize2 /></button>
	<button class="icon h-full" on:click><Search /></button>
</div>
