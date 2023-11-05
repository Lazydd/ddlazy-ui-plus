import { h } from 'vue';
import DefaultTheme from 'vitepress/theme';

import Demo from 'vitepress-theme-demoblock-fork/dist/client/components/Demo.vue';
import DemoBlock from 'vitepress-theme-demoblock-fork/dist/client/components/DemoBlock.vue';
import 'vitepress-theme-demoblock-fork/dist/theme/styles/index.css';

import BlogApp from '../components/BlogApp.vue';
import Changelog from '../components/Changelog.vue';
import Contributors from '../components/Contributors.vue';

import '../style/main.css';
import '../style/vars.css';
import '../style/scroll.css';
import '../style/inline-demo.css';
import '../style/dark.css';
import 'uno.css';

// import { ddButton, ddIcon } from '@/lib/ddlazy-ui-plus.es';
import ddlazyUi from '@/lib/ddlazy-ui-plus.es.js';
import '@/lib/index.css';
import '../style/ddlazy-ui-plus.css';

export default {
	...DefaultTheme,
	Layout: () => {
		return h(BlogApp);
	},
	enhanceApp: (ctx) => {
		const { app } = ctx;
		DefaultTheme.enhanceApp(ctx);
		app.component('Demo', Demo);
		app.component('DemoBlock', DemoBlock);
		app.component('Changelog', Changelog);
		app.component('Contributors', Contributors);
		// app.use(ddButton);
		// app.use(ddIcon);
		app.use(ddlazyUi);
	},
};
