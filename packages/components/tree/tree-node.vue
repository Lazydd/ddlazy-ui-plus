<script setup lang="ts">
import type { TreeNodeType, SwitcherIconType } from './types';
import { toRaw, ref } from 'vue';
import defaultIcon from './icon/defaultIcon.vue';

const props = withDefaults(
	defineProps<{
		data: TreeNodeType;
		treeMap: Map<string | number, TreeNodeType>;
		disabled?: boolean;
		multiple?: boolean;
		checkable?: boolean;
		showIcon?: boolean;
		showLine?: boolean;
		selectedKeys: Map<string | number, TreeNodeType>;
		checkedKeys: Set<string | number>;
		expandedKeys: Set<string | number>;
		depTree: Function;
		load?: Function;
		onExpandedNodes?: Function;
	}>(),
	{
		disabled: false,
		multiple: false,
		checkable: false,
		showIcon: false,
		showLine: false,
		load: () => {},
		onExpandedNodes: (node: any, checked: boolean) => {},
	},
);

const emit = defineEmits<{
	onSelectNodes: [nodes: TreeNodeType[]];
	onCheckedNodes: [nodes: TreeNodeType, checked: boolean];
}>();

defineSlots<{
	switcherIcon(props: SwitcherIconType): SwitcherIconType;
}>();

const loadingKeys = ref(new Set<string | number>([]));

const handleLoadTreeData = (node: TreeNodeType) => {
	if (!node?.children?.length && !node.isLeaf && props.load) {
		loadingKeys.value.add(node.value);
		props.load(node, (res) => {
			if (res.length) {
				node.children = props.depTree(res, node.level, node);
				props.expandedKeys.add(node.value);
			} else {
				node.isLeaf = true;
				props.expandedKeys.delete(node.value);
			}
			props.onExpandedNodes(node, node.isChecked);
			loadingKeys.value.delete(node.value);
		});
		return true;
	}
	return false;
};

const expand = (value: string | number, node: TreeNodeType) => {
	// if (node.disabled || props.disabled) return;
	if (!handleLoadTreeData(node))
		props.expandedKeys.has(value)
			? props.expandedKeys.delete(value)
			: props.expandedKeys.add(value);
	props.onExpandedNodes(node, node.isChecked);
};
const select = (value: string | number, disabled: boolean, node: TreeNodeType) => {
	if (disabled || props.disabled) return;
	if (props.selectedKeys.has(value)) {
		props.selectedKeys.delete(value);
	} else {
		if (!props.multiple) props.selectedKeys.clear();
		props.selectedKeys.set(value, node);
	}
	const nodes = Array.from(props.selectedKeys).map(([_, node]) => toRaw(node));
	emit('onSelectNodes', nodes);
};

const checked = (disabled: boolean, node: TreeNodeType) => {
	if (disabled || props.disabled) return;
	node.isChecked = !node.isChecked;
	if (node.isChecked) node.isHalfChecked = false;
	props.checkedKeys[node.isChecked ? 'add' : 'delete'](node.value);
	setChildrenCheckedKeys(node, node.isChecked);
	setParentCheckedKeys(node, node.isChecked);
	emit('onCheckedNodes', toRaw(node.rawNode), node.isChecked);
};
const setChildrenCheckedKeys = (node: TreeNodeType, isChecked: boolean) => {
	const children = node?.children;
	if (children?.length) {
		children?.forEach((v) => {
			v.isChecked = isChecked;
			if (isChecked) v.isHalfChecked = false;
			props.checkedKeys[node.isChecked ? 'add' : 'delete'](v.value);
			setChildrenCheckedKeys(v, isChecked);
		});
	}
};
const setParentCheckedKeys = (node: TreeNodeType, isChecked: boolean) => {
	let parentKey = node?.parentKey;
	while (parentKey) {
		const parent = props.treeMap.get(parentKey);
		const children = parent.children;
		let isAll = true,
			isHalf = false;
		if (children?.length) {
			children?.forEach((v) => {
				if (!v.isChecked) isAll = false;
				if (v.isChecked || v.isHalfChecked) isHalf = true;
			});
		}
		if (isAll) {
			parent.isChecked = isChecked;
			parent.isHalfChecked = false;
			props.checkedKeys[isChecked ? 'add' : 'delete'](parent.value);
		} else {
			parent.isChecked = false;
			props.checkedKeys.delete(parent.value);
			parent.isHalfChecked = isHalf;
		}
		parentKey = parent.parentKey;
	}
};
</script>

<template>
	<div :class="['dd-tree-treenode', { 'dd-tree-treenode-disabled': data.disabled || disabled }]">
		<span class="dd-tree-indent">
			<span
				:class="[
					'dd-tree-indent-unit',
					{
						'dd-tree-index-start': !data.line?.[i],
					},
				]"
				v-for="(v, i) in data.level"
				:key="v"
			/>
		</span>
		<span
			v-if="!data.isLeaf || (!data.children && checkable && !showIcon)"
			:class="['dd-tree-switcher', { 'dd-tree-switcher-noop': !data.children }]"
			@click="expand(data.value, data)"
		>
			<svg
				class="dd-circular"
				viewBox="0 0 50 50"
				width="1em"
				height="1em"
				v-if="loadingKeys.has(data.value)"
			>
				<circle class="path" cx="25" cy="25" r="20" fill="none" />
			</svg>
			<span
				v-else-if="!data.isLeaf"
				role="img"
				aria-label="caret-down"
				:class="[
					'anticon',
					'dd-tree-switcher-icon',
					{
						'dd-tree-switcher-icon-close': $slots.switcherIcon
							? false
							: !props.expandedKeys.has(data.value),
					},
				]"
			>
				<slot
					name="switcherIcon"
					v-bind="{
						active: props.expandedKeys.has(data.value),
						key: data.value,
						selected: props.selectedKeys?.has(data.value),
						expanded: props.expandedKeys.has(data.value),
						checked: props.checkedKeys.has(data.value),
						switcherCls: {
							'dd-tree-switcher-icon': true,
							'dd-tree-switcher-icon-close': !props.expandedKeys.has(data.value),
						},
						children: data.children,
						data,
						defaultIcon,
						title: data.label,
					}"
				>
					<defaultIcon />
				</slot>
			</span>
		</span>
		<span class="dd-tree-iconEle" v-if="data.isLeaf">
			<span role="img" aria-label="file" class="anticon anticon-file" v-if="showIcon">
				<slot
					name="icon"
					v-bind="{ key: data.value, selected: props.selectedKeys?.has(data.value) }"
				>
					<svg
						focusable="false"
						data-icon="file"
						width="1em"
						height="1em"
						fill="currentColor"
						aria-hidden="true"
						viewBox="64 64 896 896"
					>
						<path
							d="M854.6 288.6L639.4 73.4c-6-6-14.1-9.4-22.6-9.4H192c-17.7 0-32 14.3-32 32v832c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V311.3c0-8.5-3.4-16.7-9.4-22.7zM790.2 326H602V137.8L790.2 326zm1.8 562H232V136h302v216a42 42 0 0042 42h216v494z"
						/>
					</svg>
				</slot>
			</span>
		</span>
		<span
			:class="[
				'dd-tree-checkbox',
				{
					'dd-tree-checkbox-checked': data.isChecked,
					'dd-tree-checkbox-indeterminate': data.isHalfChecked,
					'dd-tree-checkbox-disabled': data.disabled || data.disableCheckbox || disabled,
				},
			]"
			v-if="checkable"
			@click="checked(data?.disabled ?? data?.disableCheckbox ?? false, data)"
		>
			<div class="dd-tree-checkbox-inner" />
		</span>
		<span
			:class="[
				'dd-tree-node-content-wrapper',
				{
					'dd-tree-node-selected': props.selectedKeys?.has(data.value),
				},
			]"
			@click="select(data.value, data?.disabled ?? false, data)"
		>
			<span class="dd-tree-title" :title="data.label">
				<slot name="title" v-bind="{ data, title: data.label }">
					{{ data.label }}
				</slot>
			</span>
		</span>
	</div>
</template>
<style scoped lang="scss">
@keyframes ddCheckboxEffect {
	0% {
		transform: scale(1);
		opacity: 0.5;
	}
	100% {
		transform: scale(1.6);
		opacity: 0;
	}
}
@keyframes loading-rotate {
	100% {
		transform: rotate(360deg);
	}
}
@keyframes loading-dash {
	0% {
		stroke-dasharray: 1, 200;
		stroke-dashoffset: 0;
	}

	50% {
		stroke-dasharray: 90, 150;
		stroke-dashoffset: -40px;
	}
	100% {
		stroke-dasharray: 90, 150;
		stroke-dashoffset: -120px;
	}
}
.dd-tree {
	&.dd-tree-show-line {
		.dd-tree-indent-unit {
			position: relative;
			height: 100%;
		}
		.dd-tree-index-start {
			&::before {
				position: absolute;
				top: 0;
				inset-inline-end: 12px;
				bottom: -4px;
				border-inline-end: 1px solid var(--dd-tree-border-color);
				content: '';
			}
		}
	}
	&-treenode {
		display: flex;
		align-items: flex-start;
		padding: 0 0 4px 0;
		outline: none;
	}

	&-indent {
		align-self: stretch;
		white-space: nowrap;
		user-select: none;
		&-unit {
			display: inline-block;
			width: 24px;
		}
	}

	&-switcher {
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		flex: none;
		align-self: stretch;
		width: 24px;
		margin: 0;
		cursor: pointer;
		user-select: none;
		transition: all 0.3s;
		border-radius: 6px;
		&:not(dd-tree-switcher-noop):hover {
			background-color: var(--dd-tree-switcher-hover-background-color);
		}
		.dd-circular {
			display: inline;
			animation: loading-rotate 2s linear infinite;
		}
		.path {
			animation: loading-dash 1.5s ease-in-out infinite;
			stroke-dasharray: 90, 150;
			stroke-dashoffset: 0;
			stroke-width: 4;
			stroke: var(--dd-primary);
			stroke-linecap: round;
		}
		&-icon {
			display: inline-block;
			font-size: 14px;
			vertical-align: baseline;
			&-close {
				position: relative;
				flex: none;
				align-self: stretch;
				width: 14px;
				margin: 0;
				line-height: 24px;
				text-align: center;
				cursor: pointer;
				user-select: none;
				> svg {
					transform: rotate(-90deg);
				}
			}

			> svg {
				transition: transform 0.3s;
			}
		}
		&-noop {
			cursor: default;
		}
	}

	&-checkbox {
		top: initial;
		margin: 4px 8px 0 4px;
		cursor: pointer;
		&-inner {
			position: relative;
			top: 0;
			inset-inline-start: 0;
			display: block;
			width: 16px;
			height: 16px;
			direction: ltr;
			background-color: var(--dd-tree-inner-background-color);
			border: 1px solid var(--dd-tree-border-color);
			border-radius: 4px;
			border-collapse: separate;
			transition: all 0.3s;
			&::after {
				box-sizing: border-box;
				position: absolute;
				top: 50%;
				inset-inline-start: 21.5%;
				display: table;
				width: 5.7142857142857135px;
				height: 9.142857142857142px;
				border: 2px solid #fff;
				border-top: 0;
				border-inline-start: 0;
				transform: rotate(45deg) scale(0) translate(-50%, -50%);
				opacity: 0;
				content: '';
				transition:
					all 0.1s cubic-bezier(0.71, -0.46, 0.88, 0.6),
					opacity 0.1s;
			}
		}

		&:hover {
			.dd-tree-checkbox-inner {
				border-color: var(--dd-primary);
			}
		}

		&-checked {
			&::after {
				position: absolute;
				top: 0;
				inset-inline-start: 0;
				width: 100%;
				height: 100%;
				border-radius: 4px;
				visibility: hidden;
				border: 2px solid var(--dd-primary);
				animation-name: ddCheckboxEffect;
				animation-duration: 0.3s;
				animation-timing-function: ease-in-out;
				animation-fill-mode: backwards;
				content: '';
				transition: all 0.3s;
			}
			.dd-tree-checkbox-inner {
				background-color: var(--dd-border-hover-color);
				border-color: transparent;
				&::after {
					opacity: 1;
					transform: rotate(45deg) scale(1) translate(-50%, -50%);
					transition: all 0.2s cubic-bezier(0.12, 0.4, 0.29, 1.46) 0.1s;
				}
			}
		}
		&-indeterminate {
			.dd-tree-checkbox-inner {
				&::after {
					top: 50%;
					inset-inline-start: 50%;
					width: 8px;
					height: 8px;
					background-color: var(--dd-primary);
					border: 0;
					transform: translate(-50%, -50%) scale(1);
					opacity: 1;
					content: '';
				}
			}
		}
		&-disabled {
			cursor: not-allowed;
			pointer-events: none;
			.dd-tree-checkbox-inner {
				background: var(--dd-hover-background-color);
				border-color: var(--dd-tree-border-color);
				&::after {
					border-color: var(--dd-tree-disabled-color);
				}
			}
		}
	}

	&-node-content-wrapper {
		position: relative;
		z-index: auto;
		min-height: 24px;
		margin: 0;
		padding: 0 4px;
		color: inherit;
		background: transparent;
		border-radius: 6px;
		cursor: pointer;
		transition:
			all 0.2s,
			border 0s,
			line-height 0s,
			box-shadow 0s;
		user-select: none;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		&:hover:not(.dd-tree-node-selected) {
			background-color: var(--dd-hover-background-color);
		}
	}

	&-node-selected {
		background-color: var(--dd-tree-selected-background-color);
	}

	&-treenode-disabled {
		.dd-tree-node-content-wrapper {
			color: var(--dd-tree-disabled-color);
			cursor: not-allowed;
			&:hover:not(.dd-tree-node-selected) {
				background-color: transparent;
			}
		}
	}
	&-iconEle {
		display: inline-block;
		width: 24px;
		height: 24px;
		line-height: 24px;
		text-align: center;
		vertical-align: top;
	}
	&-switcher {
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		flex: none;
		align-self: stretch;
		width: 24px;
		margin: 0;
		cursor: pointer;
		-webkit-user-select: none;
		-moz-user-select: none;
		user-select: none;
	}
	.anticon {
		display: inline-flex;
		align-items: center;
		color: inherit;
		font-style: normal;
		line-height: 0;
		text-align: center;
		text-transform: none;
		vertical-align: -0.125em;
		text-rendering: optimizeLegibility;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}
	&-disabled {
		cursor: not-allowed;
	}
}
</style>
