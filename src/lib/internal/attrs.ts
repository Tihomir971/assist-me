import type { Bit } from '$lib/content/api-reference';

export function createBitAttrs<T extends readonly string[]>(bit: Bit, parts: T) {
	const attrs: Record<string, Record<string, string>> = {};
	parts.forEach((part) => {
		attrs[part] = {
			[`data-bits-${bit}-${part}`]: ''
		};
	});

	return (part: T[number]) => attrs[part];
}

export function disabledAttrs(disabled: boolean) {
	return disabled ? { 'aria-disabled': true, 'data-disabled': '' } : {};
}
