<script setup lang="ts">
import { createName } from '../../utils/index';
import { UseVirtualList } from '@vueuse/components';
import { treeProps, TreeNodeType } from './types';
import TreeNode from './tree-node.vue';
import { ref, computed, watch } from 'vue';

defineOptions({
	name: createName('tree'),
});

const props = defineProps(treeProps);
const emit = defineEmits<{
	'update:value': [value: number];
	'update:expandedKeys': [value: (number | string)[]];
	'update:checkedKeys': [value: (number | string)[]];
	'update:selectedKeys': [value: (number | string)[]];
	select: [selectedKeys: (number | string)[], e: { node: any }];
	expand: [expandedKeys: (number | string)[], e: { expand: boolean; node: any }];
	check: [checkedKeys: (number | string)[], e: { checked: boolean; node: any }];
}>();

const treeData = ref<TreeNodeType[]>();
const flattenTree = computed(() => {
	const res = [];
	function dfs(tree: TreeNodeType[]) {
		tree?.forEach((node) => {
			res.push(node);
			if (props.defaultExpandAll) expandedKeys.value.add(node.key);
			if (expandedKeys.value.has(node.key)) dfs(node.children);
		});
	}
	dfs(treeData.value);
	return res;
});
const treeMap = computed<Map<string | number, TreeNodeType>>(() => {
	const map = new Map<string | number, TreeNodeType>();
	const dfs = (data: TreeNodeType[]) => {
		data?.forEach((item) => {
			map.set(item.key, item);
			dfs(item.children);
		});
	};
	dfs(treeData.value);
	return map;
});
const fieldNames = ref(props.fieldNames);
const selectedKeys = ref(new Map<string | number, TreeNodeType>());
const checkedKeys = ref(new Set(props.checkedKeys));
const expandedKeys = ref(new Set(props.expandedKeys));

watch(
	() => props.fieldNames,
	(newValue) => {
		fieldNames.value = newValue;
	},
	{
		immediate: true,
	},
);

watch(
	() => props.selectedKeys,
	(newValue) => {
		selectedKeys.value.clear();
		newValue.forEach((v) => {
			selectedKeys.value.set(v, treeMap.value.get(v));
		});
	},
	{
		immediate: true,
	},
);
watch(
	() => props.checkedKeys,
	(newValue) => {
		checkedKeys.value = new Set(newValue);
	},
	{
		immediate: true,
	},
);
watch(
	() => props.expandedKeys,
	(newValue) => {
		expandedKeys.value = new Set(newValue);
	},
	{
		immediate: true,
	},
);
const formatTreeData = (data: TreeNodeType[], parent: TreeNodeType | undefined) => {
	return data.map((item, i) => {
		const children = item[fieldNames.value.children] || [];
		const isLine = i === data.length - 1;
		const treeNode = {
			key: item[fieldNames.value.key],
			title: item[fieldNames.value.title],
			children: [],
			disableCheckbox: item.disableCheckbox,
			disabled: item.disabled,
			level: parent ? parent.level + 1 : 0,
			parentKey: parent ? parent.key : null,
			isLeaf: item.isLeaf ?? !item[fieldNames.value.children],
			isChecked: item.isChecked ?? checkedKeys.value.has(item.key),
			isHalfChecked: item.isHalfChecked ?? false,
			line: parent?.line ? [...parent.line, isLine] : [isLine],
			rawNode: item,
		};
		if (children.length) treeNode.children = formatTreeData(children, treeNode);
		return treeNode;
	});
};
const depTree = (tree: TreeNodeType[], level = 0, parent: TreeNodeType = undefined) => {
	let result = [];
	let mp = (data: TreeNodeType[], level: number, parent: TreeNodeType | undefined) => {
		level++;
		data.forEach((item) => {
			result.push({
				...item,
				level,
				parent,
				isLeaf: item.isLeaf ?? !item[fieldNames.value.children],
			});
			if (expandedKeys.value.has(item.key)) {
				const parents = JSON.parse(JSON.stringify(item));
				item?.[fieldNames.value.children] &&
					mp(item[fieldNames.value.children], level, parents);
			}
		});
		level--;
	};
	mp(tree, level, parent);
	return result;
};
watch(
	() => props.treeData,
	(newValue) => {
		treeData.value = formatTreeData(newValue, null);
	},
	{
		immediate: true,
	},
);

const onCheckedNodes = (node: TreeNodeType, checked: boolean) => {
	const keys = Array.from(checkedKeys.value);
	emit('update:checkedKeys', keys);
	emit('check', keys, { checked, node });
};
const onExpandedNodes = (node: TreeNodeType, expand: boolean) => {
	const keys = Array.from(expandedKeys.value);
	emit('update:expandedKeys', keys);
	emit('expand', keys, { expand, node });
};
const onSelectNodes = (node: TreeNodeType[]) => {
	const keys = node.map((v) => v.key);
	emit('update:selectedKeys', keys);
	emit('select', keys, { node });
};

const virtualListOptions = ref({
	itemHeight: 28,
	overscan: 10,
});
</script>

<template>
	<div :class="['dd-tree', { 'dd-tree-show-line': showLine, 'dd-tree-disabled': disabled }]">
		<div class="dd-tree-list">
			<div class="dd-tree-list-holder">
				<div :class="['dd-tree-list-holder-inner', { 'dd-tree-block-node': blockNode }]">
					<template v-if="height">
						<UseVirtualList
							:list="flattenTree"
							:options="virtualListOptions"
							:height="height + 'px'"
							ref="virtualListRef"
						>
							<template #="{ data }">
								<TreeNode
									:data
									:tree-map
									:multiple
									:checkable
									:showIcon
									:showLine
									:disabled
									:load
									:depTree
									:selectedKeys
									:checkedKeys
									:expandedKeys
									:onExpandedNodes
									@onSelectNodes="onSelectNodes"
									@onCheckedNodes="onCheckedNodes"
								>
									<template #icon="icon">
										<slot name="icon" v-bind="icon" />
									</template>
									<template
										v-if="$slots.switcherIcon"
										#switcherIcon="switcherIcon"
									>
										<slot name="switcherIcon" v-bind="switcherIcon" />
									</template>
									<template #title="title">
										<slot name="title" v-bind="title" />
									</template>
								</TreeNode>
							</template>
						</UseVirtualList>
					</template>
					<template v-else v-for="data in flattenTree">
						<TreeNode
							:data
							:tree-map
							:disabled
							:multiple
							:checkable
							:showIcon
							:showLine
							:load
							:depTree
							:selectedKeys
							:checkedKeys
							:expandedKeys
							:onExpandedNodes
							@onSelectNodes="onSelectNodes"
							@onCheckedNodes="onCheckedNodes"
						>
							<template #icon="icon">
								<slot name="icon" v-bind="icon" />
							</template>
							<template v-if="$slots.switcherIcon" #switcherIcon="switcherIcon">
								<slot name="switcherIcon" v-bind="switcherIcon" />
							</template>
							<template #title="title">
								<slot name="title" v-bind="title" />
							</template>
						</TreeNode>
					</template>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
@import './style/tree.scss';
</style>
