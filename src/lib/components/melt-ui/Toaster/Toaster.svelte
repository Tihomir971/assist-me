<script lang="ts" context="module">
	export type ToastData = {
		title: string;
		description: string;
		hint?: string;
		code?: string;
		color: string;
	};

	const {
		elements: { content, title, description, close },
		helpers,
		states: { toasts },
		actions: { portal }
	} = createToaster<ToastData>();

	export const addToast = helpers.addToast;
</script>

<script lang="ts">
	import { createToaster, melt } from '@melt-ui/svelte';
	import { flip } from 'svelte/animate';
	import { fly } from 'svelte/transition';
	import { X } from 'lucide-svelte';
</script>

<div class="fixed bottom-0 right-0 z-50 m-4 flex flex-col items-end gap-2" use:portal>
	{#each $toasts as { id, data } (id)}
		<div
			use:melt={$content(id)}
			animate:flip={{ duration: 500 }}
			in:fly={{ duration: 150, x: '100%' }}
			out:fly={{ duration: 150, x: '100%' }}
			class="rounded-2 bg-layer-3 shadow-6"
		>
			<div
				class="relative flex w-[24rem] max-w-[calc(100vw-2rem)] items-center justify-between gap-4 p-5"
			>
				<div>
					<h4 use:melt={$title(id)} class="flex items-center gap-2 font-semibold">
						{data.title}
						<span class="square-1.5 rounded-full {data.color}" />
					</h4>
					<div use:melt={$description(id)}>
						{data.description}
					</div>
					{#if data.hint}
						<div use:melt={$description(id)}>
							{data.hint}
						</div>
					{/if}
					{#if data.code}
						<div use:melt={$description(id)}>
							{data.code}
						</div>
					{/if}
				</div>
				<button
					use:melt={$close(id)}
					class="text-magnum-500 square-6 hover:bg-magnum-900/50 absolute right-4 top-4 grid place-items-center
        rounded-full"
				>
					<X class="square-4" />
				</button>
			</div>
		</div>
	{/each}
</div>
