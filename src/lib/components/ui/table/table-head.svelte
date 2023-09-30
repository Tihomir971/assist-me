<script lang="ts">
	import { cn } from '$lib/scripts/tailwind';
	import type { HTMLThAttributes } from 'svelte/elements';

	type $$Props = HTMLThAttributes;

	let className: $$Props['class'] = undefined;
	export { className as class };
</script>

<th class={cn(className)} {...$$restProps}>
	<!-- <th
	class={cn(
		'sticky top-0 h-12 px-4 text-left align-middle font-medium text-text-2 [&:has([role=checkbox])]:pr-0',
		className
	)}
	{...$$restProps}
> -->
	<slot />
</th>
