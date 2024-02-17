/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				"modrinth": "#00d845",
				"curseforge": "#fc785b"
			},
			typography: (theme) => ({
				DEFAULT: {
					css: {
						color: "inherit",
						h1: {
							color: "inherit",
						},
						h2: {
							color: "inherit",
						},
						h3: {
							color: "inherit",
						},
						h4: {
							color: "inherit",
						},
						h5: {
							color: "inherit",
						},
						h6: {
							color: "inherit",
						},
					},
				},
			}),
		},
	},
	darkMode: 'class',
	plugins: [
		require('@tailwindcss/typography'),
		require("daisyui"),
	],
}
