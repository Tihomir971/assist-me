<script context="module">
	let id = 1;

	export function uid() {
		return `ui:${id++}`;
	}

	/**
	 * @param {any} json
	 */
	export function clone(json) {
		return JSON.parse(JSON.stringify(json));
	}

	/**
	 * @param {{ contains: (arg0: any) => any; }} element
	 * @param {() => any} callback
	 */
	export function onClickOutside(element, callback) {
		const onClick = (/** @type {{ target: any; }} */ event) =>
			!element.contains(event.target) && callback();

		document.body.addEventListener('mousedown', onClick);

		return {
			/**
			 * @param {() => any} newCallback
			 */
			update(newCallback) {
				callback = newCallback;
			},

			destroy() {
				document.body.removeEventListener('mousedown', onClick);
			}
		};
	}
</script>

<div class="ui">
	<slot />
</div>

<style>
	/* Default styles */
	.ui :global(*) {
		box-sizing: border-box;
	}

	/* Design tokens */
	.ui {
	}

	/* Utility classes */
	.ui :global(.visually-hidden) {
		clip: rect(0 0 0 0);
		clip-path: inset(50%);
		height: 1px;
		overflow: hidden;
		position: absolute;
		white-space: nowrap;
		width: 1px;
	}

	.ui :global(.input) {
	}

	.ui :global(.label) {
		font-weight: bold;
	}

	.ui :global(.icon) {
		width: 24px;
		height: 24px;
		fill: none;
		stroke: currentColor;
		stroke-width: 2;
		stroke-linecap: round;
		stroke-linejoin: round;
	}
</style>
