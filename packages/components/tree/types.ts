import type { ExtractPropTypes, PropType, Component } from 'vue';

export type TreeNodeType = {
	key?: string | number;
	disabled?: boolean;
	title: string;
	disableCheckbox: boolean;
	children?: TreeNodeType[];
	isLeaf?: boolean;
	isChecked?: boolean;
	isHalfChecked?: boolean;
	level?: number;
	parentKey?: string | number;
	rawNode: TreeNodeType;
	line?: boolean[];
};

export const treeProps = {
	treeData: {
		type: [Array] as PropType<TreeNodeType[]>,
	},
	expandedKeys: {
		type: Array as PropType<(string | number)[]>,
		default: () => [],
	},
	selectedKeys: {
		type: Array as PropType<(string | number)[]>,
		default: () => [],
	},
	checkedKeys: {
		type: Array as PropType<(string | number)[]>,
		default: () => [],
	},
	disabled: {
		type: Boolean,
		defualt: false,
	},
	checkable: {
		type: Boolean,
		defualt: false,
	},
	multiple: {
		type: Boolean,
		defualt: false,
	},
	showIcon: {
		type: Boolean,
		defualt: false,
	},
	showLine: {
		type: Boolean,
		defualt: false,
	},
	blockNode: {
		type: Boolean,
		defualt: false,
	},
	load: {
		type: Function,
		default: () => {},
	},
	fieldNames: {
		type: Object as PropType<{ title: string; key: string; children: string }>,
		default: () => ({ children: 'children', title: 'title', key: 'key' }),
	},
	height: {
		type: Number,
	},
	defaultExpandAll: {
		type: Boolean,
		defualt: false,
	},
} as const;

export type SwitcherClsType = {
	'dd-tree-switcher-icon': boolean;
	'dd-tree-switcher-icon-close': boolean;
};

export type SwitcherIconType = {
	active: boolean;
	key: string | number;
	selected: boolean;
	expanded: boolean;
	checked: boolean;
	children: TreeNodeType[];
	data: TreeNodeType;
	defaultIcon: Component;
	title: string;
	switcherCls: SwitcherClsType;
};

export type TreeProps = ExtractPropTypes<typeof treeProps>;
