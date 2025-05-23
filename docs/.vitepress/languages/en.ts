import type { DefaultTheme } from 'vitepress';
import { githubRepoLink } from '../meta';
export const config = {
	en: {
		label: 'English',
		lang: 'en',
		link: '/en/',
		description: 'A Component Library for Vue.js.',
		themeConfig: {
			nav: [
				{
					text: '🧩Component',
					items: getGuide(),
				},
				{
					text: 'v0.0.1',
					activeMatch: '^/en/changeLog',
					items: [
						{
							text: 'Changelog',
							link: '/en/changeLog',
						},
					],
				},
			],
			sidebar: {
				'/en/components/': getGuide(),
			},
			editLink: {
				pattern: `${githubRepoLink}/edit/main/docs/src/:path`,
				text: 'Edit this page on GitHub',
			},
			lastUpdated: {
				text: 'LastUpdated',
			},
			outline: {
				label: 'On this page',
				level: 'deep',
			},
			docFooter: {
				prev: 'Previous page',
				next: 'Next page',
			},
		},
	},
};

export const demoblock = {
	en: {
		'view-source': 'View source',
		'hide-source': 'Hide source',
		'edit-in-editor': 'Edit in Playground',
		'edit-on-github': 'Edit on GitHub',
		'copy-code': 'Copy code',
		'copy-success': 'Copy success',
		'copy-error': 'Copy error',
	},
};

function getGuide(): DefaultTheme.SidebarItem[] {
	return [
		{
			text: 'Guide',
			// collapsed: false,
			items: [
				{
					text: 'Install',
					link: '/en/components/guide/installation',
				},
				{
					text: 'Quickstart',
					link: '/en/components/guide/quickstart',
				},
				{
					text: 'Transition',
					link: '/en/components/guide/transition',
				},
			],
		},
		{
			text: 'Basic',
			items: [
				{
					text: 'Icon',
					link: '/en/components/basic/icon',
				},
				{
					text: 'Button',
					link: '/en/components/basic/button',
				},
			],
		},
		{
			text: 'Form',
			items: [
				{
					text: 'DatePicker',
					link: '/en/components/form/date-picker',
				},
				{
					text: 'Input',
					link: '/en/components/form/input',
				},
				{
					text: 'Input Number',
					link: '/en/components/form/input-number',
				},
				{
					text: 'Radio',
					link: '/en/components/form/radio',
				},
				{
					text: 'Select',
					link: '/en/components/form/select',
				},
				{
					text: 'Switch',
					link: '/en/components/form/switch',
				},
				{
					text: 'TimePicker',
					link: '/en/components/form/time-picker',
				},
				{
					text: 'ColorPicker',
					link: '/en/components/form/color-picker',
				},
			],
		},
		{
			text: 'Data',
			items: [
				{
					text: 'Carousel',
					link: '/en/components/data/carousel',
				},
				{
					text: 'Empty',
					link: '/en/components/data/empty',
				},
			],
		},
		{
			text: 'Notice',
			items: [
				{
					text: 'Message',
					link: '/en/components/notice/message',
				},
				{
					text: 'Tooltip',
					link: '/en/components/notice/tooltip',
				},
			],
		},
		{
			text: 'Data Display',
			items: [
				{
					text: 'Tree',
					link: '/en/components/data display/tree',
				},
			],
		},
		{
			text: 'FeedBack',
			items: [
				{
					text: 'Loading',
					link: '/en/components/feedback/loading',
				},
			],
		},
	];
}
