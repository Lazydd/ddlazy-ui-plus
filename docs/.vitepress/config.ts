import { headerPlugin } from './plugin/headerMdPlugin';
import { MarkdownTransform } from './plugin/markdownTransform';
import { ChangeLog } from './plugin/changelog';
import { getChangeLog } from '../../scripts/changelog';
import UnoCSS from 'unocss/vite';
import { demoblockPlugin, demoblockVitePlugin } from 'vitepress-theme-demoblock-fork';
import { RssPlugin, RSSOptions } from 'vitepress-plugin-rss';
import vueJsx from '@vitejs/plugin-vue-jsx';
import algoliaSearchOptions from './search/algolia';
import { en, root, zhDemoBlock, enDemoBlock } from './languages';
import { siteName, githubRepoLink, githubLink } from './meta';

const RSS: RSSOptions = {
	title: siteName,
	baseUrl: githubLink,
	id: githubLink,
	link: githubLink,
	description: 'A Component Library for Vue3.',
	language: 'zh-cn',
	copyright: 'Copyright © 2023-present ddlazy',
	url: `${githubLink}/feed.rss`,
};

const extraHead =
	process.env.NODE_ENV === 'production'
		? [
				[
					'script',
					{
						async: '',
						src: 'https://www.googletagmanager.com/gtag/js?id=G-RN9ZL9TS70',
					},
				],
				[
					'script',
					{},
					`window.dataLayer = window.dataLayer || [];
					function gtag(){dataLayer.push(arguments);}
					gtag('js', new Date());
				  
					gtag('config', 'G-RN9ZL9TS70');`,
				],
				[
					'script',
					{},
					`var _hmt = _hmt || [];
					(function() {
					  var hm = document.createElement("script");
					  hm.src = "https://hm.baidu.com/hm.js?da6ff7ee2337f49fb5ac79060ed3e5bb";
					  var s = document.getElementsByTagName("script")[0]; 
					  s.parentNode.insertBefore(hm, s);
					})();`,
				],
		  ]
		: [];

const [changeLog] = await Promise.all([getChangeLog(800)]);

export default {
	title: siteName,
	head: [
		[
			'meta',
			{
				name: 'google-site-verification',
				content: 'pliM8nmbxXXWli97aWKp8dgPJttPmxt0lvBTSquCjJI',
			},
		],
		['link', { rel: 'icon', href: '/ddlazy-ui-plus/favicon.ico', type: 'image/x-icon' }],
		[
			'script',
			{
				src: 'https://at.alicdn.com/t/font_3116237_st7bhqgkyyc.js',
			},
		],
		[
			'link',
			{
				href: 'https://cdn.ddlazy.cn/map/main.css',
				rel: 'stylesheet',
			},
		],
		...extraHead,
	],
	outDir: '../dist/ddlazy-ui-plus',
	srcDir: 'src',
	base: '/ddlazy-ui-plus/',
	lastUpdated: true,
	cleanUrls: true,
	ignoreDeadLinks: true,
	sitemap: {
		hostname: githubLink,
		transformItems(items) {
			return items.filter((item) => !item.url.includes('migration'));
		},
	},
	markdown: {
		// lineNumbers: true,//行号
		theme: 'material-theme-palenight',
		config(md) {
			md.use(headerPlugin);
			md.use(demoblockPlugin, {
				customClass: 'demoblock-custom',
			});
		},
	},
	vue: {
		template: {
			ssr: true,
			compilerOptions: {
				isCustomElement: (tag) => customElements.includes(tag),
			},
		},
	},
	vite: {
		plugins: [
			demoblockVitePlugin(),
			RssPlugin(RSS),
			vueJsx(),
			MarkdownTransform(),
			ChangeLog(changeLog),
			UnoCSS(),
		],
		resolve: {
			alias: {
				'@': process.cwd(),
			},
		},
		server: {
			host: true,
		},
		build: {
			minify: 'terser',
			chunkSizeWarningLimit: Infinity,
		},
		json: {
			stringify: true,
		},
	},
	locales: {
		...root,
		...en,
	},
	themeConfig: {
		i18nRouting: true,
		logo: '/logo.svg',
		socialLinks: [{ icon: 'github', link: githubRepoLink }],
		search: {
			provider: 'algolia',
			options: algoliaSearchOptions,
		},
		demoblock: {
			...zhDemoBlock,
			...enDemoBlock,
		},
		footer: {
			message: 'Released under the MIT License.',
			copyright: 'Copyright © 2023-present ddlazy',
		},
		commentConfig: {
			repo: 'Lazydd/ddlazy-ui-plus',
			repoId: 'R_kgDOKOAqoQ',
			category: 'Announcements',
			categoryId: 'DIC_kwDOKOAqoc4CZis9',
			inputPosition: 'top',
		},
	},
};

const customElements = [
	'mjx-container',
	'mjx-assistive-mml',
	'math',
	'maction',
	'maligngroup',
	'malignmark',
	'menclose',
	'merror',
	'mfenced',
	'mfrac',
	'mi',
	'mlongdiv',
	'mmultiscripts',
	'mn',
	'mo',
	'mover',
	'mpadded',
	'mphantom',
	'mroot',
	'mrow',
	'ms',
	'mscarries',
	'mscarry',
	'mscarries',
	'msgroup',
	'mstack',
	'mlongdiv',
	'msline',
	'mstack',
	'mspace',
	'msqrt',
	'msrow',
	'mstack',
	'mstack',
	'mstyle',
	'msub',
	'msup',
	'msubsup',
	'mtable',
	'mtd',
	'mtext',
	'mtr',
	'munder',
	'munderover',
	'semantics',
	'math',
	'mi',
	'mn',
	'mo',
	'ms',
	'mspace',
	'mtext',
	'menclose',
	'merror',
	'mfenced',
	'mfrac',
	'mpadded',
	'mphantom',
	'mroot',
	'mrow',
	'msqrt',
	'mstyle',
	'mmultiscripts',
	'mover',
	'mprescripts',
	'msub',
	'msubsup',
	'msup',
	'munder',
	'munderover',
	'none',
	'maligngroup',
	'malignmark',
	'mtable',
	'mtd',
	'mtr',
	'mlongdiv',
	'mscarries',
	'mscarry',
	'msgroup',
	'msline',
	'msrow',
	'mstack',
	'maction',
	'semantics',
	'annotation',
	'annotation-xml',
];
