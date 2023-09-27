<script lang="ts">
	import { enhance } from '$app/forms';
	import { Input } from '$lib';
	import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '$lib/components/card';
	import CardDescription from '$lib/components/card/card-description.svelte';
	import type { ActionData } from './$types';

	export let form: ActionData;

	let email: string;
	let password: string;

	let loading: true;
</script>

<div class="flex h-full items-center justify-center">
	<Card class="w-[320px] shadow-6">
		<CardHeader>
			<CardTitle tag="h4">Log in to Assistant</CardTitle>
			<CardDescription>This is example of base font. I ovo je onako</CardDescription>
		</CardHeader>
		<CardContent>
			<form action="?/signin" method="post" use:enhance>
				<div class="grid w-full items-center gap-4">
					<!-- 					{#if form?.signinWithPassword?.error}
						<Alert.Root variant="destructive">
							<RadixIconsExclamationTriangle></RadixIconsExclamationTriangle>
							<Alert.Title>Error</Alert.Title>
							<Alert.Description>
								{form.signinWithPassword.error}
							</Alert.Description>
						</Alert.Root>
					{/if} -->
					<div class="sm:col-span-3">
						<label for="email">Email</label>
						<div class="mt-2">
							<input
								id="email"
								name="email"
								value={form?.values?.email ?? ''}
								type="email"
								required
								placeholder="Enter email"
								class="w-full"
							/>
						</div>
					</div>
					<div class="sm:col-span-3">
						<label for="password" class="text-sm font-medium">Password</label>
						<div class="mt-2">
							<input
								autocomplete="off"
								id="password"
								name="password"
								type="password"
								placeholder="Enter password"
								class="w-full"
							/>
						</div>
					</div>
					<div class="sm:col-span-3">
						<label for="first-name" class="block text-sm font-medium leading-6">First name</label>
						<div class="mt-2">
							<input
								type="text"
								name="first-name"
								id="first-name"
								autocomplete="given-name"
								class="block w-full py-1.5 ring-inset ring-gray-3 placeholder:text-gray-4 sm:text-sm sm:leading-6"
								placeholder="Enter first name"
							/>
						</div>
					</div>
					<div class="relative">
						<button type="submit" disabled={false}>Log in</button>
					</div>
				</div>
			</form>
		</CardContent>
		<CardFooter>
			<a href="/" type="button"> Forgot your Password? </a>
		</CardFooter>
	</Card>
</div>
