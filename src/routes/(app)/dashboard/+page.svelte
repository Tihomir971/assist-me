<script lang="ts">
	//	import type { PageData } from './$types';

	import { Accessibility } from 'lucide-svelte';

	//	export let data: PageData;
</script>

<div class="flex flex-col">
	Dahboard
	<a href="/">Link</a>
	<input type="checkbox" />
	<form method="POST" action="/auth?/signout">
		<button class="btn" type="submit">Log out</button>
	</form>

	<div class="h-12 w-12"></div>
	<div class="bg-indigo-6">
		<h1 class="text-yellow-800">Welcome to SvelteKit</h1>
		<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
	</div>
	<div class="bg-purple-6">
		<h1 class="text-yellow-800">Welcome to SvelteKit</h1>
		<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
	</div>
	<div class="bg-layer-2">
		<h1 class="text-yellow-800">Welcome to SvelteKit</h1>
		<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
	</div>
	<div class="bg-layer-3">
		<h1 class="text-yellow-800">Welcome to SvelteKit</h1>
		<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
	</div>

	<button class="btn" type="submit"><Accessibility />Help</button>
	<button class="btn" type="submit">Help</button>
	<button class="btn" type="submit"><Accessibility /></button>
</div>
