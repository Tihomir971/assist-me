import type { Config } from 'tailwindcss';
/* import colors from 'tailwindcss/colors'; */
import { myPreset } from './src/lib/styles/myPreset';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {}
	},
	plugins: [],
	presets: [myPreset]
} satisfies Config;
