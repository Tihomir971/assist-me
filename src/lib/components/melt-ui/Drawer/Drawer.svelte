<script lang="ts">
	import { createDialog, melt } from '@melt-ui/svelte';
	import { fade, fly } from 'svelte/transition';
	// Internal helpers
	import { X } from 'lucide-svelte';

	const {
		elements: { trigger, overlay, content, title, description, close, portalled },
		states: { open }
	} = createDialog();
</script>

<button
	use:melt={$trigger}
	class="rounded-md bg-white font-medium leading-none shadow-lg focus:ring-magnum-400 inline-flex items-center
      justify-center px-4 py-2 hover:opacity-75 focus:outline-none
      focus:ring"
>
	View Notifications
</button>
<div use:melt={$portalled}>
	{#if $open}
		<div
			use:melt={$overlay}
			class="bg-black/50 fixed inset-0 z-50"
			transition:fade={{ duration: 150 }}
		/>
		<div
			use:melt={$content}
			class="bg-white shadow-lg fixed left-0 top-0 z-50 h-screen w-full max-w-[350px]
              p-6 focus:outline-none"
			transition:fly={{
				x: -350,
				duration: 300,
				opacity: 1
			}}
		>
			<button
				use:melt={$close}
				aria-label="Close"
				class="text-magnum-800 hover:bg-magnum-100 focus:shadow-magnum-400 focus:ring-magnum-400 absolute right-[10px]
                  top-[10px] inline-flex h-6 w-6 appearance-none
                  items-center justify-center rounded-full focus:outline-none
                  focus:ring-2"
			>
				<X class="square-4" />
			</button>
			<h2 use:melt={$title} class="font-medium text-black mb-0 text-lg">Notifications</h2>
			<p use:melt={$description} class="leading-normal text-zinc-600 mb-5 mt-2">
				Check out your latest updates.
			</p>
			<section>
				<div class="rounded-md bg-gray-100/80 text-zinc-800 shadow p-4">
					<h3 class="font-semibold mb-3 text-base">New invitation</h3>
					<p class="">
						You have been invited to join the <strong>Designers</strong> team.
					</p>
					<div class="mt-6 flex justify-end gap-4">
						<button
							class="bg-zinc-100 font-medium leading-none text-zinc-600
                              focus:ring-magnum-400 inline-flex h-8 items-center justify-center
                              rounded-[4px] px-4 focus:outline-none
                              focus:ring-2"
						>
							Reject
						</button>
						<button
							class="bg-magnum-100 font-medium leading-none text-magnum-900
                              focus:ring-magnum-400 inline-flex h-8 items-center justify-center
                              rounded-[4px] px-4 focus:outline-none
                              focus:ring-2"
						>
							Accept
						</button>
					</div>
				</div>
			</section>
		</div>
	{/if}
</div>
