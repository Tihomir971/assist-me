import type { Config } from 'tailwindcss';
const colorScale = 12;
const openPropsColors = [
	/* 	'tomato',
	'ruby',
	'crimson',
	'pink',
	'plum',
	'purple',
	'violet',
	'iris', */
	'gray',
	'red',
	'indigo'
	/* 	'blue',
	'cyan',
	'teal',
	'jade',
	'green',
	'grass',
	'bronze',
	'gold',
	'brown',
	'orange',
	'amber',
	'yellow',
	'lime',
	'mint',
	'sky' */
];

const getColor = (color: string, scale: number) => {
	const colors = Array.from(Array(scale).keys()).reduce(
		(acc, _, i) => {
			acc[i + 1] = `hsl(var(--${color}-${i + 1}-hsl) / <alpha-value>)`;
			return acc;
		},
		{} as Record<number | string, string>
	) as Record<string | number, string>;

	return colors;
};

const getColors = (arr: string[]) => {
	const colors = arr.reduce(
		(acc, color) => {
			acc[color] = getColor(color, colorScale);
			return acc;
		},
		{} as Record<string, Record<number | string, string>>
	);
	return { ...colors };
};

export const radixThemePreset: Config = {
	content: [],
	theme: {
		colors: {
			transparent: 'transparent',
			current: 'currentColor',
			/*	indigo: getColor('indigo', colorScale)
			 			...getColors(radixGrayColors, true),
			gray: getGrayColor('gray', colorScale),*/
			...getColors(openPropsColors),
			surface: {
				1: 'hsl(var(--surface-1) / <alpha-value>)',
				2: 'hsl(var(--surface-2) / <alpha-value>)',
				3: 'hsl(var(--surface-3) / <alpha-value>)',
				4: 'hsl(var(--surface-4) / <alpha-value>)'
			},
			text: {
				1: 'hsl(var(--text-1) / <alpha-value>)',
				2: 'hsl(var(--text-2) / <alpha-value>)'
			},
			primary: getColor('indigo', colorScale)
		},
		borderRadius: {
			1: 'var(--radius-conditional-1)',
			2: 'var(--radius-conditional-2)',
			3: 'var(--radius-conditional-3)',
			4: 'var(--radius-conditional-4)',
			5: 'var(--radius-conditional-5)',
			6: 'var(--radius-conditional-6)',
			full: 'var(--radius-round)'
		},
		boxShadow: {
			1: 'var(--shadow-1)',
			2: 'var(--shadow-2)',
			3: 'var(--shadow-3)',
			4: 'var(--shadow-4)',
			5: 'var(--shadow-5)',
			6: 'var(--shadow-6)'
		},

		extend: {}
	}
};
