# Tree 树形控件

## 基础用法

文件夹、组织架构、生物分类、国家地区等等，世间万物的大多数结构都是树形结构。使用树控件可以完整展现其中的层级关系，并具有展开收起选择等交互功能。

:::demo

```vue
<template>
	<dd-tree :tree-data="t" checkable showIcon />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
function dig(path = '0', level = 2) {
	const list: any['treeData'] = [];
	for (let i = 0; i < 2; i += 1) {
		const value = `${path}-${i}`;
		const treeNode: any['treeData'][number] = {
			label: value,
			value,
			disabled: i === 1,
		};

		if (level > 0) {
			treeNode.children = dig(value, level - 1);
		}

		list.push(treeNode);
	}
	return list;
}
const t = ref(dig());
</script>
```

:::

## 自定义图标

可以针对不同的节点定制图标。

:::demo

```vue
<template>
	<dd-tree :tree-data="t" showIcon>
		<template #icon="{ selected }">
			<svg
				v-if="selected"
				focusable="false"
				data-icon="frown"
				width="1em"
				height="1em"
				fill="currentColor"
				aria-hidden="true"
				viewBox="64 64 896 896"
			>
				<path
					d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zM288 421a48.01 48.01 0 0196 0 48.01 48.01 0 01-96 0zm376 272h-48.1c-4.2 0-7.8-3.2-8.1-7.4C604 636.1 562.5 597 512 597s-92.1 39.1-95.8 88.6c-.3 4.2-3.9 7.4-8.1 7.4H360a8 8 0 01-8-8.4c4.4-84.3 74.5-151.6 160-151.6s155.6 67.3 160 151.6a8 8 0 01-8 8.4zm24-224a48.01 48.01 0 010-96 48.01 48.01 0 010 96z"
				/>
			</svg>
			<svg
				v-else
				focusable="false"
				data-icon="frown"
				width="1em"
				height="1em"
				fill="currentColor"
				aria-hidden="true"
				viewBox="64 64 896 896"
			>
				<path
					d="M288 421a48 48 0 1096 0 48 48 0 10-96 0zm352 0a48 48 0 1096 0 48 48 0 10-96 0zM512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm263 711c-34.2 34.2-74 61-118.3 79.8C611 874.2 562.3 884 512 884c-50.3 0-99-9.8-144.8-29.2A370.4 370.4 0 01248.9 775c-34.2-34.2-61-74-79.8-118.3C149.8 611 140 562.3 140 512s9.8-99 29.2-144.8A370.4 370.4 0 01249 248.9c34.2-34.2 74-61 118.3-79.8C413 149.8 461.7 140 512 140c50.3 0 99 9.8 144.8 29.2A370.4 370.4 0 01775.1 249c34.2 34.2 61 74 79.8 118.3C874.2 413 884 461.7 884 512s-9.8 99-29.2 144.8A368.89 368.89 0 01775 775zM512 533c-85.5 0-155.6 67.3-160 151.6a8 8 0 008 8.4h48.1c4.2 0 7.8-3.2 8.1-7.4C420 636.1 461.5 597 512 597s92.1 39.1 95.8 88.6c.3 4.2 3.9 7.4 8.1 7.4H664a8 8 0 008-8.4C667.6 600.3 597.5 533 512 533z"
				/>
			</svg>
		</template>
	</dd-tree>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
function dig(path = '0', level = 2) {
	const list: any['treeData'] = [];
	for (let i = 0; i < 2; i += 1) {
		const value = `${path}-${i}`;
		const treeNode: any['treeData'][number] = {
			label: value,
			value,
		};

		if (level > 0) {
			treeNode.children = dig(value, level - 1);
		}

		list.push(treeNode);
	}
	return list;
}
const t = ref(dig());
</script>
```

:::

## 异步数据加载

点击展开节点，动态加载数据。

:::demo

```vue
<template>
	<dd-tree :tree-data="data" :load="loadMoreData" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const data = ref([
	{
		value: 1,
		label: '一级 1',
		children: [
			{
				value: 4,
				label: '二级 1-1',
				children: [
					{
						value: 9,
						label: '三级 1-1-1',
						// new
						isLeaf: false,
					},
					{
						value: 10,
						label: '三级 1-1-2',
					},
				],
			},
		],
	},
	{
		value: 2,
		label: '一级 2',
		children: [
			{
				value: 100,
				label: '二级 2-1',
			},
			{
				value: 200,
				label: '二级 2-2',
			},
		],
	},
	{
		value: 3,
		label: '一级 3',
	},
]);
const loadMoreData = (node, resolve) => {
	if (node.value === 9) {
		setTimeout(() => {
			resolve([
				{
					value: 20,
					label: '四级 1-1-1-1',
				},
				{
					value: 21,
					label: '四级 1-1-1-2',
				},
			]);
		}, 1500);
	}
};
</script>
```

:::

## 连接线

:::demo

```vue
<template>
	<dd-tree :tree-data="t" showLine />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
function dig(path = '0', level = 2) {
	const list: any['treeData'] = [];
	for (let i = 0; i < 2; i += 1) {
		const value = `${path}-${i}`;
		const treeNode: any['treeData'][number] = {
			label: value,
			value,
		};

		if (level > 0) {
			treeNode.children = dig(value, level - 1);
		}

		list.push(treeNode);
	}
	return list;
}
const t = ref(dig());
</script>
```

:::

## 自定义展开/折叠图标

:::demo

```vue
<template>
	<dd-tree :tree-data="t" showLine>
		<template #switcherIcon="{ switcherCls }">
			<svg
				v-if="!switcherCls['dd-tree-switcher-icon-close']"
				focusable="false"
				data-icon="minus-square"
				width="1em"
				height="1em"
				fill="currentColor"
				aria-hidden="true"
				viewBox="64 64 896 896"
			>
				<path
					d="M328 544h368c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8H328c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8z"
				/>
				<path
					d="M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zm-40 728H184V184h656v656z"
				/>
			</svg>
			<svg
				v-else
				focusable="false"
				data-icon="plus-square"
				width="1em"
				height="1em"
				fill="currentColor"
				aria-hidden="true"
				viewBox="64 64 896 896"
			>
				<path
					d="M328 544h152v152c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V544h152c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8H544V328c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v152H328c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8z"
				/>
				<path
					d="M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zm-40 728H184V184h656v656z"
				/>
			</svg>
		</template>
	</dd-tree>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
function dig(path = '0', level = 2) {
	const list: any['treeData'] = [];
	for (let i = 0; i < 2; i += 1) {
		const value = `${path}-${i}`;
		const treeNode: any['treeData'][number] = {
			label: value,
			value,
		};

		if (level > 0) {
			treeNode.children = dig(value, level - 1);
		}

		list.push(treeNode);
	}
	return list;
}
const t = ref(dig());
</script>
```

:::

## 自定义字段

替换treeNode中 title,key,children字段为treeData中对应的字段

:::demo

```vue
<template>
	<dd-tree :tree-data="t" showLine :fieldNames="{ children: 'a', label: 'b', value: 'c' }" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
function dig(path = '0', level = 2) {
	const list: any['treeData'] = [];
	for (let i = 0; i < 2; i += 1) {
		const value = `${path}-${i}`;
		const treeNode: any['treeData'][number] = {
			b: value,
			c: value,
		};

		if (level > 0) {
			treeNode.a = dig(value, level - 1);
		}

		list.push(treeNode);
	}
	return list;
}
const t = ref(dig());
</script>
```

:::

## 虚拟滚动

使用 `height` 属性则切换为虚拟滚动。

:::demo

```vue
<template>
	<dd-tree :tree-data="t" showLine :height="200" blockNode defaultExpandAll />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
function dig(path = '0', level = 4) {
	const list: any['treeData'] = [];
	for (let i = 0; i < 8; i += 1) {
		const value = `${path}-${i}`;
		const treeNode: any['treeData'][number] = {
			label: value,
			value,
		};

		if (level > 0) {
			treeNode.children = dig(value, level - 1);
		}

		list.push(treeNode);
	}
	return list;
}
const t = ref(dig());
</script>
```

:::

## 查询树节点

使用 `setExpand` 方法来展开对应的父节点，使用 `scrollTo` 方法来滚动到指定节点。

:::demo

```vue
<template>
	<div style="display: flex; gap: 10px;margin-bottom: 10px;">
		<dd-input v-model:value="searchValue" placeholder="请输入关键字" />
		<dd-button @click="search">搜索</dd-button>
	</div>
	<dd-tree :tree-data="t" showLine :height="200" ref="treeRef" blockNode />
</template>

<script lang="ts" setup>
import { ref, nextTick } from 'vue';
function dig(path = '0', level = 4) {
	const list: any['treeData'] = [];
	for (let i = 0; i < 8; i += 1) {
		const value = `${path}-${i}`;
		const treeNode: any['treeData'][number] = {
			label: value,
			value,
		};

		if (level > 0) {
			treeNode.children = dig(value, level - 1);
		}

		list.push(treeNode);
	}
	return list;
}
const t = ref(dig());
const searchValue = ref('0-4-0-0');
const treeRef = ref();
const search = async () => {
	treeRef.value.setExpand(searchValue.value);
	await nextTick();
	treeRef.value.scrollTo(searchValue.value);
};
</script>
```

:::

## API

### Tree Attributes

| Name                  | Description                                                        | Type                        | Default                                                | Version |
| --------------------- | ------------------------------------------------------------------ | --------------------------- | ------------------------------------------------------ | ------- |
| autoExpandParent      | 是否自动展开父节点                                                 | `boolean`                   | `false`                                                |
| blockNode             | 是否节点占据一行                                                   | `boolean`                   | `false`                                                |
| checkable             | 节点前添加 `Checkbox` 复选框                                       | `boolean`                   | `false`                                                |
| checkedKeys(v-model)  | 选中复选框的树节点                                                 | `string[] \| number[]`      | `[]`                                                   |         |
| defaultExpandAll      | 默认展开所有树节点                                                 | `boolean`                   | `false`                                                |
| disabled              | 将树禁用                                                           | `boolean`                   | `false`                                                |
| expandedKeys(v-model) | 展开指定的树节点                                                   | `string[] \| number[]`      | `[]`                                                   |         |
| fieldNames            | 替换 treeNode 中 label,value,children 字段为 treeData 中对应的字段 | `object`                    | `{children:'children', label:'label', value:'value' }` |
| height                | 设置虚拟滚动容器高度，设置后内部节点不再支持横向滚动               | `number`                    | —                                                      |
| load                  | 异步加载数据                                                       | `function(node)`            | —                                                      |
| multiple              | 支持点选多个节点（节点本身）                                       | `boolean`                   | `false`                                                |
| selectable            | 是否可选中                                                         | `boolean`                   | `true`                                                 |
| selectedKeys(v-model) | 设置选中的树节点                                                   | `string[] \| number[]`      | `[]`                                                   |         |
| showIcon              | 是否展示 TreeNode title 前的图标                                   | `boolean`                   | `false`                                                |         |
| showLine              | 是否展示连接线                                                     | `boolean`                   | `false`                                                |         |
| treeData              | treeNodes 数据                                                     | [`TreeNode[]`](#treenode) | —                                                      |         |

### Tree Events

| Name   | Description         | Type                                                                              |
| ------ | ------------------- | --------------------------------------------------------------------------------- |
| select | 点击树节点触发      | `(checkedKeys: (string \| number)[], e: { node: any }) => void`                   |
| expand | 展开/收起节点时触发 | `(expandedKeys: (string \| number)[], e: { expand: boolean; node: any }) => void` |
| check  | 点击复选框触发      | `(checkedKeys: (string \| number)[], e: { checked: boolean; node: any }) => void` |

### TreeNode

| Name            | Description                                                                            | Type               | Default |
| --------------- | -------------------------------------------------------------------------------------- | ------------------ | ------- |
| checkable       | 当树为 `checkable` 时，设置独立节点是否展示 Checkbox                                   | `boolean`          | —       |
| disableCheckbox | 禁掉 checkbox                                                                          | `boolean`          | `false` |
| disabled        | 禁掉响应                                                                               | `boolean`          | `false` |
| isLeaf          | 设置为叶子节点(设置了loadData时有效)                                                   | `boolean`          | `false` |
| key             | 被树的 (default)ExpandedKeys / (default)CheckedKeys / (default)SelectedKeys 属性所用。 | `string \| number` | —       |
| title           | 标题                                                                                   | `string`           | —       |

### Tree Slots

| Name         | Description                 |
| ------------ | --------------------------- |
| icon         | 自定义图标                  |
| switcherIcon | 自定义树节点的展开/折叠图标 |
| title        | 自定义标题                  |

### Tree Exposes

| Name      | Description                                                   | Type                                                             |
| --------- | ------------------------------------------------------------- | ---------------------------------------------------------------- |
| setExpand | 设置展开节点                                                  | `(str: string \| ((node: TreeNodeType) => boolean)) => instance` |
| scrollTo  | 滚动到指定节点(开启虚拟滚动和数量达到 `height / 28` 向上取整) | `(key: string \| number) => instance`                            |
