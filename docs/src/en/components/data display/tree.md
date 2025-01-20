# Tree

## Basic usage

Almost anything can be represented in a tree structure. Examples include directories, organization hierarchies, biological classifications, countries, etc. The `Tree` component is a way of representing the hierarchical relationship between these things. You can also expand, collapse, and select a treeNode within a `Tree`.

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
		const key = `${path}-${i}`;
		const treeNode: any['treeData'][number] = {
			title: key,
			key,
			disabled: i === 1,
		};

		if (level > 0) {
			treeNode.children = dig(key, level - 1);
		}

		list.push(treeNode);
	}
	return list;
}
const t = ref(dig());
</script>
```

:::

## Customize Icon

You can customize icons for different nodes.

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
		const key = `${path}-${i}`;
		const treeNode: any['treeData'][number] = {
			title: key,
			key,
		};

		if (level > 0) {
			treeNode.children = dig(key, level - 1);
		}

		list.push(treeNode);
	}
	return list;
}
const t = ref(dig());
</script>
```

:::

## load data asynchronously

To load data asynchronously when click to expand a treeNode.

:::demo

```vue
<template>
	<dd-tree :tree-data="data" :load="loadMoreData" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const data = ref([
	{
		key: 1,
		title: '1',
		children: [
			{
				key: 4,
				title: '1-1',
				children: [
					{
						key: 9,
						title: '1-1-1',
						// new
						isLeaf: false,
					},
					{
						key: 10,
						title: '1-1-2',
					},
				],
			},
		],
	},
	{
		key: 2,
		title: '2',
		children: [
			{
				key: 100,
				title: '2-1',
			},
			{
				key: 200,
				title: '2-2',
			},
		],
	},
	{
		key: 3,
		title: '3',
	},
]);
const loadMoreData = (node, resolve) => {
	if (node.key === 9) {
		setTimeout(() => {
			resolve([
				{
					key: 20,
					title: '1-1-1-1',
				},
				{
					key: 21,
					title: '1-1-1-2',
				},
			]);
		}, 1500);
	}
};
</script>
```

:::

## Tree With Line

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
		const key = `${path}-${i}`;
		const treeNode: any['treeData'][number] = {
			title: key,
			key,
		};

		if (level > 0) {
			treeNode.children = dig(key, level - 1);
		}

		list.push(treeNode);
	}
	return list;
}
const t = ref(dig());
</script>
```

:::

## Customize collapse/expand icon

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
		const key = `${path}-${i}`;
		const treeNode: any['treeData'][number] = {
			title: key,
			key,
		};

		if (level > 0) {
			treeNode.children = dig(key, level - 1);
		}

		list.push(treeNode);
	}
	return list;
}
const t = ref(dig());
</script>
```

:::

## ReplaceFields

Replace the title,key and children fields in treeNode with the corresponding fields in treeData.

:::demo

```vue
<template>
	<dd-tree :tree-data="t" showLine :fieldNames="{ children: 'a', title: 'b', key: 'c' }" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
function dig(path = '0', level = 2) {
	const list: any['treeData'] = [];
	for (let i = 0; i < 2; i += 1) {
		const key = `${path}-${i}`;
		const treeNode: any['treeData'][number] = {
			b: key,
			c: key,
		};

		if (level > 0) {
			treeNode.a = dig(key, level - 1);
		}

		list.push(treeNode);
	}
	return list;
}
const t = ref(dig());
</script>
```

:::

## Virtual scroll

Use virtual list through `height` prop.

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
		const key = `${path}-${i}`;
		const treeNode: any['treeData'][number] = {
			title: key,
			key,
		};

		if (level > 0) {
			treeNode.children = dig(key, level - 1);
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

Use the `setExpand` method to expand the corresponding parent node, and use the `scrollTo` method to scroll to the specified node.

:::demo

```vue
<template>
	<div style="display: flex; gap: 10px;margin-bottom: 10px;">
		<dd-input v-model:value="searchValue" placeholder="Please input" />
		<dd-button @click="search">Search</dd-button>
	</div>
	<dd-tree :tree-data="t" showLine :height="200" ref="treeRef" blockNode />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
function dig(path = '0', level = 4) {
	const list: any['treeData'] = [];
	for (let i = 0; i < 8; i += 1) {
		const key = `${path}-${i}`;
		const treeNode: any['treeData'][number] = {
			title: key,
			key,
		};

		if (level > 0) {
			treeNode.children = dig(key, level - 1);
		}

		list.push(treeNode);
	}
	return list;
}
const t = ref(dig());
const searchValue = ref('0-4-0-0');
const treeRef = ref();
const search = () => {
	treeRef.value.setExpand(searchValue.value).scrollTo(searchValue.value);
};
</script>
```

:::

## API

### Tree Attributes

| Name                  | Description                                                                                     | Type                        | Default                                            | Version |
| --------------------- | ----------------------------------------------------------------------------------------------- | --------------------------- | -------------------------------------------------- | ------- |
| blockNode             | Whether treeNode fill remaining horizontal space                                                | `boolean`                   | `false`                                            |
| checkable             | Adds a `Checkbox` before the treeNodes                                                          | `boolean`                   | `false`                                            |
| checkedKeys(v-model)  | Specifies the keys of the checked treeNodes                                                     | `string[] \| number[]`      | `[]`                                               |         |
| defaultExpandAll      | Whether to expand all treeNodes by default                                                      | `boolean`                   | `false`                                            |
| disabled              | whether disabled the tree                                                                       | `boolean`                   | `false`                                            |
| expandedKeys(v-model) | Specifies the keys of the expanded treeNodes                                                    | `string[] \| number[]`      | `[]`                                               |         |
| fieldNames            | Replace the title,key and children fields in treeNode with the corresponding fields in treeData | `object`                    | `{children:'children', title:'title', key:'key' }` |
| height                | Config virtual scroll height. Will not support horizontal scroll when enable this               | `number`                    | —                                                  |
| load                  | Load data asynchronously                                                                        | `function(node)`            | —                                                  |
| multiple              | Allows selecting multiple treeNodes                                                             | `boolean`                   | `false`                                            |
| selectable            | whether can be selected                                                                         | `boolean`                   | `true`                                             |
| selectedKeys(v-model) | Specifies the keys of the selected treeNodes                                                    | `string[] \| number[]`      | `[]`                                               |         |
| showIcon              | Shows the icon before a TreeNode's title.                                                       | `boolean`                   | `false`                                            |         |
| showLine              | Shows a connecting line                                                                         | `boolean`                   | `false`                                            |         |
| treeData              | treeNode of tree                                                                                | [`TreeNode[]`](###TreeNode) | —                                                  |         |

### Tree Events

| Name   | Description                                                    | Type                                                                              |
| ------ | -------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| select | Callback function for when the user clicks a treeNode          | `(checkedKeys: (string \| number)[], e: { node: any }) => void`                   |
| expand | Callback function for when a treeNode is expanded or collapsed | `(expandedKeys: (string \| number)[], e: { expand: boolean; node: any }) => void` |
| check  | Callback function for when the onCheck event occurs            | `(checkedKeys: (string \| number)[], e: { checked: boolean; node: any }) => void` |

### TreeNode

| Name            | Description                                                                     | Type               | Default |
| --------------- | ------------------------------------------------------------------------------- | ------------------ | ------- |
| checkable       | When Tree is `checkable`, set TreeNode display Checkbox or not                  | `boolean`          | —       |
| disableCheckbox | Disables the checkbox of the treeNode                                           | `boolean`          | `false` |
| disabled        | Disables the treeNode                                                           | `boolean`          | `false` |
| isLeaf          | Determines if this is a leaf node(effective when loadData is specified)         | `boolean`          | `false` |
| key             | Used with (default)ExpandedKeys / (default)CheckedKeys / (default)SelectedKeys. | `string \| number` | —       |
| title           | Title                                                                           | `string`           | —       |

### Tree Slots

| Name         | Description                                 |
| ------------ | ------------------------------------------- |
| icon         | customize icon                              |
| switcherIcon | customize collapse/expand icon of tree node |
| title        | custom title                                |

### Tree Exposes

| Name      | Description                                                                                      | Type                                                             |
| --------- | ------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------- |
| setExpand | Set expandedKeys                                                                                 | `(str: string \| ((node: TreeNodeType) => boolean)) => instance` |
| scrollTo  | Scroll to the node(Enable virtual scroll and reach the desired quantity `height / 28` Round Up) | `(key: string \| number) => instance`                            |
