<script lang="ts">
    import { cn } from '$lib/scripts/tailwind';
    import { createTabs, melt } from '@melt-ui/svelte';
    import { cubicInOut } from 'svelte/easing';
    import { crossfade } from 'svelte/transition';
	import { setCtx } from './context';
	import type { Props } from './types';
   
    type $$Props = Props;
	export let orientation: $$Props["orientation"] = undefined;
	export let activateOnFocus: $$Props["activateOnFocus"] = undefined;
	export let loop: $$Props["loop"] = undefined;
	export let autoSet: $$Props["autoSet"] = undefined;
	export let value: $$Props["value"] = undefined;
	export let onValueChange: $$Props["onValueChange"] = undefined;
	export let asChild = false;
    
    const {
		elements: { root },
		states: { value: localValue },
		updateOption
	} = setCtx({
		orientation,
		activateOnFocus,
		loop,
		autoSet,
		defaultValue: value,
		onValueChange: ({ next }) => {
			if (value !== next) {
				onValueChange?.(next);
				value = next;
			}
			return next;
		}
	});
   
    let className = '';
    export { className as class };
   
    const triggers = [
      { id: 'tab-1', title: 'Account' },
      { id: 'tab-2', title: 'Password' },
      { id: 'tab-3', title: 'Settings' },
    ];
   
    const [send, receive] = crossfade({
      duration: 250,
      easing: cubicInOut,
    });

    $: builder = $root;
    const attrs = getAttrs("root");
  </script>
   
   {#if asChild}
   <slot {builder} {attrs} />
{:else}
   <div use:melt={builder} {...$$restProps} {...attrs}>
       <slot {builder} {attrs} />
   </div>
{/if}