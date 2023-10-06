<script lang="ts">
	import { Card } from '$lib/components/card';
	import { cn } from '$lib/scripts/tailwind';
	import type { HTMLTableAttributes } from 'svelte/elements';

	type $$Props = HTMLTableAttributes;

	let className: $$Props['class'] = undefined;
	export { className as class };
</script>

<Card class="m-1 block max-h-full overflow-auto">
	<table class={cn('h-full w-full ', className)} {...$$restProps}>
		<!-- <table class={cn("w-full caption-bottom text-sm", className)} {...$$restProps}> -->
		<slot />
	</table>
</Card>
