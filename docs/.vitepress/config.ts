import { headerPlugin } from './plugin/headerMdPlugin';
import { MarkdownTransform } from './plugin/markdownTransform';
import { ChangeLog } from './plugin/changelog';
import { getChangeLog } from '../../scripts/changelog';
import UnoCSS from 'unocss/vite';
import { demoblockPlugin, demoblockVitePlugin } from 'vitepress-theme-demoblock-fork';
import { createRssFile } from './plugin/rss';
import vueJsx from '@vitejs/plugin-vue-jsx';
import algoliaSearchOptions from './search/algolia';
import { en, root, zhDemoBlock, enDemoBlock } from './languages';
import { siteName, githubRepoLink, githubLink } from './meta';
import type { SiteConfig } from 'vitepress';

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
		// [
		// 	'link',
		// 	{
		// 		href: 'https://cdn.ddlazy.cn/map/main.css',
		// 		rel: 'stylesheet',
		// 	},
		// ],
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
		// transformItems(items) {
		// 	return items.filter((item) => !item.url.includes('migration'));
		// },
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
		image: {
			lazyLoading: true,
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
			port: 9999,
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
	buildEnd: (config: SiteConfig) => {
		createRssFile(config);
	},
	themeConfig: {
		i18nRouting: true,
		logo: '/logo.svg',
		socialLinks: [
			{ icon: 'github', link: githubRepoLink },
			{
				icon: {
					svg: '<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"><title>RSS</title><path d="M108.56,342.78a60.34,60.34,0,1,0,60.56,60.44A60.63,60.63,0,0,0,108.56,342.78Z"/><path d="M48,186.67v86.55c52,0,101.94,15.39,138.67,52.11s52,86.56,52,138.67h86.66C325.33,312.44,199.67,186.67,48,186.67Z"/><path d="M48,48v86.56c185.25,0,329.22,144.08,329.22,329.44H464C464,234.66,277.67,48,48,48Z"/></svg>',
				},
				link: '/ddlazy-ui-plus/feed.xml',
			},
		],
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
