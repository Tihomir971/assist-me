import type { Config } from 'tailwindcss';
import { radixThemePreset } from './src/lib/styles/radix-themes-tw';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {}
	},
	plugins: [],
	presets: [radixThemePreset]
} satisfies Config;
