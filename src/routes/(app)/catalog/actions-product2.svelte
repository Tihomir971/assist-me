<script lang="ts">
	import { goto } from '$app/navigation';
	import { AlignJustify } from 'lucide-svelte';
	export let id: string | undefined;
</script>

<button type="button" on:click={() => goto(`/catalog/product/${id}`)}>
	<AlignJustify class="opacity-80 hover:opacity-50 focus:opacity-100"></AlignJustify>
</button>
