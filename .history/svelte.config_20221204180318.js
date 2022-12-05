import adapter from '@sveltejs/adapter-auto';
import preprocessor from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocessor({
		scss: {
			prependData: "@import './src/lib/styles.scss';"
		}
	}),

	kit: {
		adapter: adapter()
	}
};

export default config;
