import type { DefaultTheme } from 'vitepress';
import { githubRepoLink } from '../meta';

export const config = {
	root: {
		label: '简体中文',
		lang: 'Zh_CN',
		description: '一个基于Vue的组件库',
		themeConfig: {
			nav: [
				{
					text: '🧩组件',
					items: getGuide(),
				},
				{
					text: 'v0.0.1',
					items: [
						{
							text: '更新日志',
							link: '/changeLog',
						},
					],
					activeMatch: '^/changeLog',
				},
			],
			sidebar: {
				'/components/': getGuide(),
			},
			editLink: {
				pattern: `${githubRepoLink}/edit/main/docs/src/:path`,
				text: '在GitHub上编辑',
			},
			lastUpdated: {
				text: '上次更新',
			},
			outline: {
				label: '本页目录',
				level: 'deep',
			},
			docFooter: {
				prev: '上一页',
				next: '下一页',
			},
		},
	},
};

export const demoblock = {
	root: {
		'view-source': '查看源代码',
		'hide-source': '隐藏源代码',
		'edit-in-editor': '在 Playground 中编辑',
		'edit-on-github': '在 Github 中编辑',
		'copy-code': '复制代码',
		'copy-success': '复制成功',
		'copy-error': '复制失败',
	},
};

function getGuide(): DefaultTheme.SidebarItem[] {
	return [
		{
			text: 'Guide',
			// collapsed: false,
			items: [
				{
					text: '安装',
					link: '/components/guide/installation',
				},
				{
					text: '快速上手',
					link: '/components/guide/quickstart',
				},
				{
					text: '内置过渡动画',
					link: '/components/guide/transition',
				},
			],
		},
		{
			text: 'Basic',
			items: [
				{
					text: 'Icon 图标',
					link: '/components/basic/icon',
				},
				{
					text: 'Button 按钮',
					link: '/components/basic/button',
				},
			],
		},
		{
			text: 'Form',
			items: [
				{
					text: 'DatePicker 日期选择器',
					link: '/components/form/date-picker',
				},
				{
					text: 'Input 输入框',
					link: '/components/form/input',
				},
				{
					text: 'Input Number 数字输入框',
					link: '/components/form/input-number',
				},
				{
					text: 'Radio 单选框',
					link: '/components/form/radio',
				},
				{
					text: 'Select 选择器',
					link: '/components/form/select',
				},
				{
					text: 'Switch 开关',
					link: '/components/form/switch',
				},
				{
					text: 'TimePicker 时间选择器',
					link: '/components/form/time-picker',
				},
			],
		},
		{
			text: 'Data',
			items: [
				{
					text: 'Carousel 走马灯',
					link: '/components/data/carousel',
				},
				{
					text: 'Empty 空状态',
					link: '/components/data/empty',
				},
			],
		},
		{
			text: 'Notice',
			items: [
				{
					text: 'Message 消息提示',
					link: '/components/notice/message',
				},
				{
					text: 'Tooltip 文字提示',
					link: '/components/notice/tooltip',
				},
			],
		},
		{
			text: 'FeedBack',
			items: [
				{
					text: 'Loading 加载',
					link: '/components/feedback/loading',
				},
			],
		},
	];
}
