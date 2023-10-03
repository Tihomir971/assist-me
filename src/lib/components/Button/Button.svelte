<script lang="ts">
	export let type: 'submit' | 'reset' | 'button' | null | undefined;
</script>

<button {type} {...$$restProps} on:click><slot /></button>

<style lang="postcss">
	button:is([type='button'], [type='reset'], [type='submit']) {
		@apply flex max-w-fit items-center gap-1 rounded-1 bg-primary-5 px-4 pb-2 pt-2.5 text-center align-bottom font-medium text-text-1 shadow-2 transition duration-150 ease-in-out hover:bg-primary-6 hover:shadow-3 focus:bg-primary-6 focus:shadow-3 focus:outline-none focus:ring-0 active:bg-primary-7 active:shadow-3 disabled:opacity-70;
	}
</style>
