import adapter from "@sveltejs/adapter-static"; 

/** @type {import(""@sveltejs/kit").Config} */
const config = {
    kit: {
        adapter: adapter({
/* Default folder options for static files; Github pages requires "docs".*/
            pages: "pages",
            assets: "pages"
        }),
    prerender: {
        crawl: true,
//* I don't know how to write out entries for blog pages, I got it working on the main blog page. Basically the entries section is an array of URLs for the crawler to find; by default it wont find dynamic pages like blog pages */ 
        entries: ['*',  `/blog/*`]
        }
    }
};

export default config;