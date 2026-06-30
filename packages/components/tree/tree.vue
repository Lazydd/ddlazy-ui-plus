<script setup lang="ts">
import { createName } from '../../utils/index';
import { useVirtualList } from '@vueuse/core';
import { treeProps, TreeNodeType, TreeProps } from './types';
import TreeNode from './tree-node.vue';
import { ref, computed, watch, useTemplateRef } from 'vue';

defineOptions({
	name: createName('tree'),
});

let flag = 0;
const { defaultExpandAll, expandedKeys, treeData, autoExpandParent, fieldNames } =
	defineProps(treeProps);
const emit = defineEmits<{
	select: [selectedKeys: (number | string)[], e: { node: any }];
	expand: [expandedKeys: (number | string)[], e: { expand: boolean; node: any }];
	check: [checkedKeys: (number | string)[], e: { checked: boolean; node: any }];
}>();

const treeDataForamt = ref<TreeNodeType[]>();
const flattenTree = computed(() => {
	const res = [];
	function dfs(tree: TreeNodeType[]) {
		tree?.forEach((node) => {
			res.push(node);
			if (defaultExpandAll && flag == 0) expandedKeysSet.value.add(node.value);
			if (expandedKeysSet.value.has(node.value)) dfs(node.children);
		});
	}
	dfs(treeDataForamt.value);
	flag = 1;
	return res;
});
const treeMap = computed<Map<string | number, TreeNodeType>>(() => {
	const map = new Map<string | number, TreeNodeType>();
	const dfs = (data: TreeNodeType[]) => {
		data?.forEach((item) => {
			map.set(item.value, item);
			dfs(item.children);
		});
	};
	dfs(treeDataForamt.value);
	return map;
});
const fieldNamesValue = computed(() => fieldNames);
const ModelselectedKeys = defineModel<TreeProps['selectedKeys']>('selectedKeys');
const selectedKeysMap = computed({
	get() {
		const map = new Map();
		ModelselectedKeys.value?.forEach((v) => {
			map.set(v, treeMap.value.get(v));
		});
		return map;
	},
	set(value) {
		ModelselectedKeys.value = Array.from(value.values());
	},
});
const ModelcheckedKeys = defineModel<TreeProps['checkedKeys']>('checkedKeys');
const checkedKeysSet = computed({
	get() {
		return new Set(ModelcheckedKeys.value);
	},
	set(value) {
		ModelcheckedKeys.value = Array.from(value);
	},
});
const ModelexpandedKeys = defineModel<TreeProps['expandedKeys']>('expandedKeys');
const expandedKeysSet = computed({
	get() {
		return new Set(ModelexpandedKeys.value);
	},
	set(value) {
		ModelexpandedKeys.value = Array.from(value);
	},
});

const expandParents = () => {
	expandedKeys?.forEach((v) => {
		expandParent(treeData, v)?.forEach((t) => {
			if (!expandedKeysSet.value.has(t)) expandedKeysSet.value.add(t);
		});
	});
};

const expandParent = (nodes, key, path = []) => {
	for (const node of nodes) {
		const currentPath = [...path, node[fieldNamesValue.value.value ?? 'value']];
		if (node[fieldNamesValue.value.value ?? 'value'] === key) {
			return path; // 返回不包括目标节点的父路径
		}
		if (node[fieldNamesValue.value.children ?? 'children']) {
			const result = expandParent(
				node[fieldNamesValue.value.children ?? 'children'],
				key,
				currentPath,
			);
			if (result) {
				return result;
			}
		}
	}
	return null;
};

const expandParentsSet = (nodes, keys) => {
	const stack = nodes.map((node) => ({ node, path: [] }));
	const visited = new Set();
	const resultPaths = new Map();

	while (stack.length > 0) {
		const { node, path } = stack.pop();

		const currentPath = [...path, node[fieldNamesValue.value.value ?? 'value']];

		if (keys.has(node[fieldNamesValue.value.value ?? 'value'])) {
			resultPaths.set(node[fieldNamesValue.value.value ?? 'value'], path);
		}

		if (!visited.has(node[fieldNamesValue.value.value ?? 'value'])) {
			visited.add(node[fieldNamesValue.value.value ?? 'value']);
			if (node[fieldNamesValue.value.children ?? 'children']) {
				for (let child of node[fieldNamesValue.value.children ?? 'children']) {
					stack.push({ node: child, path: currentPath });
				}
			}
		}
	}

	return resultPaths;
};
watch(
	() => autoExpandParent,
	(newValue) => {
		if (newValue) {
			expandParents();
		}
	},
);
const formatTreeData = (data: TreeNodeType[], parent: TreeNodeType | undefined) => {
	return data.map((item, i) => {
		const children = item[fieldNamesValue.value.children ?? 'children'] || [];
		const isLine = i === data.length - 1;
		const treeNode = {
			value: item[fieldNamesValue.value.value ?? 'value'],
			label: item[fieldNamesValue.value.label ?? 'label'],
			children: [],
			disableCheckbox: item.disableCheckbox ?? false,
			disabled: item.disabled ?? false,
			level: parent ? parent.level + 1 : 0,
			parentKey: parent ? parent.value : null,
			isLeaf: item.isLeaf ?? !item[fieldNamesValue.value.children ?? 'children'],
			isChecked: item.isChecked ?? checkedKeysSet.value.has(item.value),
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
				isLeaf: item.isLeaf ?? !item[fieldNamesValue.value.children ?? 'children'],
			});
			if (expandedKeysSet.value.has(item.value)) {
				const parents = JSON.parse(JSON.stringify(item));
				item?.[fieldNamesValue.value.children ?? 'children'] &&
					mp(item[fieldNamesValue.value.children ?? 'children'], level, parents);
			}
		});
		level--;
	};
	mp(tree, level, parent);
	return result;
};
watch(
	() => treeData,
	(newValue) => {
		treeDataForamt.value = formatTreeData(newValue, null);
	},
	{
		immediate: true,
	},
);

const onCheckedNodes = (node: TreeNodeType, checked: boolean) => {
	const keys = Array.from(checkedKeysSet.value);
	ModelcheckedKeys.value = keys;
	emit('check', keys, { checked, node });
};
const onExpandedNodes = (node: TreeNodeType, expand: boolean) => {
	const keys = Array.from(expandedKeysSet.value);
	ModelexpandedKeys.value = keys;
	emit('expand', keys, { expand, node });
};
const onSelectNodes = (node: TreeNodeType[]) => {
	const keys = node.map((v) => v.value);
	ModelselectedKeys.value = keys;
	emit('select', keys, { node });
};

const {
	list,
	containerProps,
	wrapperProps,
	scrollTo: scrollToFunc,
} = useVirtualList(flattenTree, {
	itemHeight: 28,
	overscan: 10,
});
const scrollTo = (key: string | number) => {
	const index = flattenTree.value.findIndex((v) => v.key === key);
	if (index === -1) return;
	scrollToFunc(index);
	return instance;
};

const setExpand = (str: string | ((node: TreeNodeType) => boolean)) => {
	const arr = [];
	let func = str as Function;
	if (typeof str === 'string') {
		func = (v: TreeNodeType) => v[fieldNamesValue.value.label ?? 'label'].includes(str);
	}
	treeMap.value.forEach((v) => {
		if (func(v)) arr.push(v[fieldNamesValue.value.value ?? 'value']);
	});
	if (!arr.length) return;
	const newExpandedKeys = new Set([]);
	expandParentsSet(treeData, new Set(arr))?.forEach((t) => {
		t.forEach((id) => newExpandedKeys.add(id));
	});
	expandedKeysSet.value = newExpandedKeys;
	return instance;
};

const instance = {
	scrollTo,
	setExpand,
};

defineExpose(instance);
</script>

<template>
	<div :class="['dd-tree', { 'dd-tree-show-line': showLine, 'dd-tree-disabled': disabled }]">
		<div class="dd-tree-list">
			<div class="dd-tree-list-holder">
				<div :class="['dd-tree-list-holder-inner', { 'dd-tree-block-node': blockNode }]">
					<template v-if="virtual">
						<div v-bind="containerProps" style="height: 100%">
							<div v-bind="wrapperProps">
								<TreeNode
									v-for="{ data } in list"
									:data
									:tree-map
									:multiple
									:checkable
									:showIcon
									:showLine
									:disabled
									:load
									:depTree
									:selectedKeys="selectedKeysMap"
									:checkedKeys="checkedKeysSet"
									:expandedKeys="expandedKeysSet"
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
							</div>
						</div>
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
							:selectedKeys="selectedKeysMap"
							:checkedKeys="checkedKeysSet"
							:expandedKeys="expandedKeysSet"
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
