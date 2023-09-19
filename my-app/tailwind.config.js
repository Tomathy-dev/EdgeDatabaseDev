/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {}
	},
	plugins: [require('daisyui')],
	daisyui: {
		themes: [
			'business',
			'corporate',
			'emerald',
			{
				mytheme: {
					primary: '#0d9488',

					secondary: '#2563eb',

					accent: '#6d28d9',

					neutral: '#2a323c',

					'base-100': '#1d232a',

					info: '#3abff8',

					success: '#16a34a',

					warning: '#fbbd23',

					error: '#e11d48'
				}
			}
		]
	}
};
