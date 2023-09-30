<script lang="ts">
	import { cn } from '$lib/scripts/tailwind';
	import type { HTMLAttributes } from 'svelte/elements';

	type $$Props = HTMLAttributes<HTMLTableRowElement> & {
		'data-state'?: unknown;
	};

	let className: $$Props['class'] = undefined;
	export { className as class };
</script>

<tr class={cn(className)} {...$$restProps}>
	<!-- <tr
	class={cn(
		'hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors',
		className
	)}
	{...$$restProps}
> -->
	<slot />
</tr>
