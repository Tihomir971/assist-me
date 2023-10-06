<script lang="ts">
	/**
	 * @restProps {div}
	 * @event {boolean} check
	 */

	/**
	 * Specify the value of the checkbox
	 * @type {any}
	 */
	export let value: any = '';

	/** Specify whether the checkbox is checked */
	export let checked = false;

	/** Specify whether the checkbox is indeterminate */
	export let indeterminate = false;

	/** Set to `true` to mark the field as required */
	export let required = false;

	/** Set to `true` for the checkbox to be read-only */
	export let readonly = false;

	/** Set to `true` to disable the checkbox */
	export let disabled = false;

	/** Specify the label text */
	export let labelText = '';

	/** Set to `true` to visually hide the label text */
	export let hideLabel = false;

	/** Set a name for the input element */
	export let name = '';

	/**
	 * Specify the title attribute for the label element
	 */
	export let title: string | undefined = undefined;

	/** Set an id for the input label */
	export let id = 'ccs-' + Math.random().toString(36);

	/** Obtain a reference to the input HTML element */
	export let ref = null;

	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	$: dispatch('check', checked);

	let refLabel: HTMLSpanElement | null = null;
</script>

<input hidden name="isselfservice" bind:value={checked} />
<!-- svelte-ignore a11y-mouse-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
	class="flex items-center justify-start gap-2"
	{...$$restProps}
	on:click
	on:mouseover
	on:mouseenter
	on:mouseleave
>
	<input
		bind:this={ref}
		type="checkbox"
		{value}
		bind:checked
		{disabled}
		{id}
		{indeterminate}
		{name}
		{required}
		{readonly}
		class:bx--checkbox={true}
		class="ml-1 h-4 w-4"
		on:change
		on:change
		on:blur
	/>
	<label for={id} {title} class:bx--checkbox-label={true}>
		<span
			bind:this={refLabel}
			class:bx--checkbox-label-text={true}
			class:bx--visually-hidden={hideLabel}
		>
			<slot name="labelText">
				{labelText}
			</slot>
		</span>
	</label>
</div>

<style lang="postcss">
	.bx--visually-hidden {
		position: absolute;
		overflow: hidden;
		width: 1px;
		height: 1px;
		padding: 0;
		border: 0;
		margin: -1px;
		clip: rect(0, 0, 0, 0);
		visibility: inherit;
		white-space: nowrap;
	}
</style>
