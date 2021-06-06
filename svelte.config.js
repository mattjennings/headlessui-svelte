import preprocess from "svelte-preprocess";
/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [
		preprocess({
			postcss: true
		}),
	],
	kit: {
		package: {
      dir: 'package',
      exports: {
        include: ['**'],
        exclude: []
      },
      files: {
        include: ['**'],
        exclude: []
      }
    }
	}
};

export default config;
