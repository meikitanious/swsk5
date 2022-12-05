import preprocessor from 'svelte-preprocess';
import adapter from "@sveltejs/adapter-static"; 

/** @type {import(""@sveltejs/kit").Config} */
const config = {
    preprocess: preprocessor({
		scss: {
			prependData: "@import './src/lib/styles.scss';"
		}
	}),
    kit: {
        adapter: adapter({
            pages: "pages",
            assets: "pages"
        }),
        prerender: {
            crawl: true,
            entries: ['*',  `/blog/*`]
        }
,
    }
};

export default config;