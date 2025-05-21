<script setup lang="ts">
import { createName } from '../../../utils/index';
import { UseVirtualList } from '@vueuse/components';
import { treeProps, TreeNodeType } from './types';
import TreeNode from './tree-node.vue';
import { ref, computed, watch, useTemplateRef } from 'vue';
import { useStore } from './store';

defineOptions({
	name: createName('treeSelectTree'),
});

let flag = 0;
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

let noChecked = ref(false);
const flattenTree = computed(() => {
	const arr = [];
	function dfs(tree: TreeNodeType[]) {
		tree?.forEach((node) => {
			if (noChecked.value) {
				node.isChecked = false;
				node.isHalfChecked = false;
			}
			if (store.checkedKeys.has(node.value)) {
				node.isChecked = true;
			} else {
				node.isChecked = false;
			}
			arr.push(node);
			if (props.defaultExpandAll && flag == 0) expandedKeys.value.add(node.value);
			if (expandedKeys.value.has(node.value)) dfs(node.children);
		});
	}
	dfs(treeData.value);
	flag = 1;
	return arr;
});
const store = useStore();
const treeMap = computed(() => store.treeMap);
const treeData = computed(() => store.treeData);
const fieldNames = ref(props.fieldNames);
const selectedKeys = ref(new Map<string, TreeNodeType>());
const checkedKeys = computed(() => store.checkedKeys);
const expandedKeys = ref(new Set(props.expandedKeys));

const expandParents = () => {
	props.expandedKeys?.forEach((v) => {
		expandParent(props.treeData, v)?.forEach((t) => {
			if (!expandedKeys.value.has(t)) expandedKeys.value.add(t);
		});
	});
};

const expandParent = (nodes, key, path = []) => {
	for (const node of nodes) {
		const currentPath = [...path, node[fieldNames.value.value ?? 'value']];
		if (node[fieldNames.value.value ?? 'value'] === key) {
			return path; // 返回不包括目标节点的父路径
		}
		if (node[fieldNames.value.children ?? 'children']) {
			const result = expandParent(
				node[fieldNames.value.children ?? 'children'],
				key,
				currentPath
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
		const currentPath = [...path, node[fieldNames.value.value ?? 'value']];

		if (keys.has(node[fieldNames.value.value ?? 'value'])) {
			resultPaths.set(node[fieldNames.value.value ?? 'value'], path);
		}

		if (!visited.has(node[fieldNames.value.value ?? 'value'])) {
			visited.add(node[fieldNames.value.value ?? 'value']);
			if (node[fieldNames.value.children ?? 'children']) {
				for (let child of node[fieldNames.value.children ?? 'children']) {
					stack.push({ node: child, path: currentPath });
				}
			}
		}
	}

	return resultPaths;
};

watch(
	() => props.fieldNames,
	(newValue) => {
		fieldNames.value = newValue;
	},
	{
		immediate: true,
	}
);

watch(
	() => props.selectedKeys,
	(newValue) => {
		selectedKeys.value.clear();
		if (Array.isArray(newValue)) {
			for (let i = 0; i < newValue.length; i++) {
				if (!newValue[i]) continue;
				selectedKeys.value.set(newValue[i], treeMap.value.get(newValue[i]));
			}
		} else {
			if (!newValue) return;
			selectedKeys.value.set(newValue, treeMap.value.get(newValue));
		}
	},
	{
		immediate: true,
	}
);
watch(
	() => props.expandedKeys,
	(newValue) => {
		expandedKeys.value = new Set(newValue);
	},
	{
		immediate: true,
	}
);
watch(
	() => props.autoExpandParent,
	(newValue) => {
		if (newValue) {
			expandParents();
		}
	}
);
const depTree = (tree: TreeNodeType[], level = 0, parent: TreeNodeType = undefined) => {
	let result = [];
	let mp = (data: TreeNodeType[], level: number, parent: TreeNodeType | undefined) => {
		level++;
		data.forEach((item) => {
			result.push({
				...item,
				level,
				parent,
				isLeaf: item.isLeaf ?? !item[fieldNames.value.children ?? 'children'],
			});
			if (expandedKeys.value.has(item.value)) {
				const parents = JSON.parse(JSON.stringify(item));
				item?.[fieldNames.value.children ?? 'children'] &&
					mp(item[fieldNames.value.children ?? 'children'], level, parents);
			}
		});
		level--;
	};
	mp(tree, level, parent);
	return result;
};

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
	const keys = node.map((v) => v.value);
	emit('update:selectedKeys', keys);
	emit('select', keys, { node });
};

const virtualListOptions = ref({
	itemHeight: 28,
	overscan: 10,
});
const virtualListRef = useTemplateRef<HTMLElement | null>('virtualList');
const scrollTo = (key: string | number) => {
	if (!virtualListRef.value) return;
	const index = flattenTree.value.findIndex((v) => v.key === key);
	if (index === -1) return;
	virtualListRef.value.scrollTo(index as ScrollToOptions);
	return instance;
};

const filterFlattenTree = ref([]);
const filterTreeMap = computed<Map<string | number, TreeNodeType>>(() => {
	const map = new Map<string | number, TreeNodeType>();
	const dfs = (data: TreeNodeType[]) => {
		data?.forEach((item) => {
			map.set(item.value, item);
			dfs(item.children);
		});
	};
	dfs(buildTree(filterFlattenTree.value));
	store.setFilterTreeMap(map);
	return map;
});
const flattenTree2 = computed(() => {
	const arr = [];
	function dfs(tree: TreeNodeType[]) {
		tree?.forEach((node) => {
			arr.push(node);
			if (expandedKeys.value.has(node.value)) dfs(node.children);
		});
	}
	dfs(buildTree(filterFlattenTree.value));
	return arr;
});
const buildTree = (flatArray: TreeNodeType[]) => {
	const nodeMap = new Map();

	flatArray.forEach((node) => {
		nodeMap.set(node.value, { ...node, children: [] });
	});

	const tree = [];
	flatArray.forEach((node) => {
		const parentKey = node.parentKey;
		if (parentKey === null) {
			tree.push(nodeMap.get(node.value));
		} else if (nodeMap.has(parentKey)) {
			nodeMap.get(parentKey).children.push(nodeMap.get(node.value));
		}
	});
	return tree;
};

const clearCheckeys = () => {
	setNoChecked(true);
};
const treeNodeRef = useTemplateRef('treeNode');
const setCheckeys = (value) => {
	// treeNodeRef.value.setChildrenCheckedKeys(store.treeMap.get(value), false);
	// treeNodeRef.value.setParentCheckedKeys(store.treeMap.get(value), false);
	// const index = flattenTree.value.findIndex((v) => v.value === value);
	// flattenTree.value[index].isChecked = false;
	// treeNodeRef.value.checked(false, flattenTree.value[index]);
	// console.log(flattenTree.value);
};

const setNoChecked = (val: boolean) => {
	if (noChecked.value === val) return;
	noChecked.value = val;
};

const filterTree = (str: string | ((node: TreeNodeType) => boolean)) => {
	filterFlattenTree.value = [];
	const arr = [];
	let func = str as Function;
	if (typeof str === 'string') {
		func = (v: TreeNodeType) => v[fieldNames.value.label ?? 'label'].includes(str);
	}
	treeMap.value.forEach((v) => {
		if (func(v)) arr.push(v[fieldNames.value.value ?? 'value']);
	});

	if (!arr.length) return;

	const newExpandedKeys = new Set([]);
	const newExpandedKeysSelf = new Set([]);
	expandParentsSet(treeData.value, new Set(arr))?.forEach((t, v) => {
		t.forEach((id) => newExpandedKeys.add(id));
		newExpandedKeysSelf.add(v);
	});
	const arr2 = [];
	const allKeys = [...newExpandedKeys, ...newExpandedKeysSelf].sort((a, b) => {
		return treeMap.value.get(a).index - treeMap.value.get(b).index;
	});
	new Set(allKeys).forEach((v) => {
		arr2.push(treeMap.value.get(v));
	});
	filterFlattenTree.value = arr2;
	console.log(filterFlattenTree.value);
	console.log(filterTreeMap.value);
	expandedKeys.value = newExpandedKeys;
};
const setExpand = (str: string | ((node: TreeNodeType) => boolean)) => {
	const arr = [];
	let func = str as Function;
	if (typeof str === 'string') {
		func = (v: TreeNodeType) => v[fieldNames.value.label ?? 'label'].includes(str);
	}
	treeMap.value.forEach((v) => {
		if (func(v)) arr.push(v[fieldNames.value.value ?? 'value']);
	});
	if (!arr.length) return;
	const newExpandedKeys = new Set([]);
	expandParentsSet(treeData.value, new Set(arr))?.forEach((t) => {
		t.forEach((id) => newExpandedKeys.add(id));
	});
	expandedKeys.value = newExpandedKeys;
	return instance;
};

const instance = {
	scrollTo,
	setExpand,
	filterTree,
	clearCheckeys,
	setCheckeys,
};

defineExpose(instance);
</script>

<template>
	<div :class="['dd-tree', { 'dd-tree-show-line': showLine, 'dd-tree-disabled': disabled }]">
		<div class="dd-tree-list">
			<div class="dd-tree-list-holder">
				<div :class="['dd-tree-list-holder-inner', { 'dd-tree-block-node': blockNode }]">
					<template
						v-if="
							height &&
							(filterFlattenTree.length
								? filterFlattenTree.length
								: flattenTree.length) >
								Math.ceil(height / virtualListOptions.itemHeight)
						"
					>
						<UseVirtualList
							:list="filterFlattenTree.length ? flattenTree2 : flattenTree"
							:options="virtualListOptions"
							:height="height + 'px'"
							style="width: 100%"
							ref="virtualList"
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
									:expandedKeys
									:onExpandedNodes
									:setNoChecked
									:isSearch="filterFlattenTree.length > 0"
									@onSelectNodes="onSelectNodes"
									@onCheckedNodes="onCheckedNodes"
									ref="treeNode"
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
					<template
						v-else
						v-for="data in filterFlattenTree.length ? flattenTree2 : flattenTree"
					>
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
							:expandedKeys
							:onExpandedNodes
							:setNoChecked
							@onSelectNodes="onSelectNodes"
							@onCheckedNodes="onCheckedNodes"
							ref="treeNode"
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
