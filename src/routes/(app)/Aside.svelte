<script lang="ts">
	import { createAvatar, melt } from '@melt-ui/svelte';
	import { LayoutDashboard, Package, Tag } from 'lucide-svelte';
	const {
		elements: { image, fallback }
	} = createAvatar({
		src: 'https://avatars.githubusercontent.com/u/1162160?v=4'
	});
</script>

<aside class="flex h-full w-16 flex-col justify-between bg-gray-12">
	<div id="topAside">
		<div
			id="logo"
			class="flex aspect-square w-full cursor-pointer items-center justify-center text-text-2 hover:bg-surface-2"
		>
			<img
				class="h-8 w-8"
				src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
				alt="Your Company"
			/>
		</div>
		<div id="navAside">
			<a
				href="/dashboard"
				class="flex aspect-square w-full cursor-pointer flex-col items-center justify-center space-y-1 text-xs !text-current hover:bg-surface-2"
			>
				<LayoutDashboard />
				<span>Dashboard</span>
			</a>
			<a
				href="/catalog"
				class="flex aspect-square w-full cursor-pointer flex-col items-center justify-center space-y-1 text-xs !text-current hover:bg-surface-2"
			>
				<Tag />
				<span>Catalog</span>
			</a>
		</div>
	</div>
	<div id="bottomAside">
		<div class="flex items-center justify-center hover:bg-surface-2">
			<!-- Profile dropdown -->
			<div class="flex aspect-square w-full cursor-pointer items-center justify-center">
				<img use:melt={$image} alt="Avatar" class="h-10 w-10 rounded-[inherit]" />
				<span use:melt={$fallback} class="text-magnum-700 text-xl font-medium">RH</span>
			</div>
		</div>
	</div>
</aside>

<style lang="postcss">
	.listItem {
		position: relative;
		margin: 0 0 8px;
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-pack: center;
		-ms-flex-pack: center;
		justify-content: center;
		width: var(--custom-list-items-list-item-width);
	}
	.pill {
		position: absolute;
		top: 0;
		left: 0;
	}
</style>
