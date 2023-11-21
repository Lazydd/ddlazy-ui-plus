# Select 选择器

## 基础用法

:::demo

```vue
<template>
	<dd-select
		style="width: 120px"
		v-model:value="select"
		placeholder="Please input"
		:options="options"
	/>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const select = ref('d13');
const options = ref();
let c = [];
for (let i = 10; i < 100; i++) {
	c.push({
		label: i.toString(36) + i,
		value: i.toString(36) + i,
	});
}
options.value = c;
</script>
```

:::

## 有禁用选项

在 `option` 中，设定 `disabled` 值为 `true` ，即可禁用该选项

:::demo

```vue
<template>
	<dd-select
		style="width: 120px"
		v-model:value="select"
		placeholder="Please input"
		:options="options"
	/>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const select = ref('d13');
const options = ref();
let c = [];
for (let i = 10; i < 100; i++) {
	c.push({
		label: i.toString(36) + i,
		value: i.toString(36) + i,
		disabled: i % 4 == 0,
	});
}
options.value = c;
</script>
```

:::

## 有禁用选项

为 `dd-select` 设置 `disabled` 属性，则整个选择器不可用。

:::demo

```vue
<template>
	<dd-select
		style="width: 120px"
		v-model:value="select"
		placeholder="Please input"
		:options="options"
		disabled
	/>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const select = ref('d13');
const options = ref([]);
</script>
```

:::

## 可清空单选

为 `dd-select` 设置 `clearable` 属性，则可将选择器清空。

:::demo

```vue
<template>
	<dd-select
		style="width: 120px"
		v-model:value="select"
		placeholder="Please input"
		:options="options"
		clearable
	/>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const select = ref('d13');
const options = ref();
let c = [];
for (let i = 10; i < 100; i++) {
	c.push({
		label: i.toString(36) + i,
		value: i.toString(36) + i,
		disabled: i % 4 == 0,
	});
}
options.value = c;
</script>
```

:::

## 无边框

无边框样式。

:::demo

```vue
<template>
	<dd-select
		style="width: 120px"
		v-model:value="select"
		placeholder="Please input"
		:options="options"
		:bordered="false"
	/>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const select = ref('d13');
const options = ref([]);
</script>
```

:::

## 后缀图标

:::demo

```vue
<template>
	<dd-select
		style="width: 120px"
		v-model:value="select"
		placeholder="Please input"
		:options="options"
	>
		<template #suffixIcon>
			<svg
				focusable="false"
				data-icon="smile"
				width="1em"
				height="1em"
				fill="currentColor"
				aria-hidden="true"
				viewBox="64 64 896 896"
			>
				<path
					d="M288 421a48 48 0 1096 0 48 48 0 10-96 0zm352 0a48 48 0 1096 0 48 48 0 10-96 0zM512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm263 711c-34.2 34.2-74 61-118.3 79.8C611 874.2 562.3 884 512 884c-50.3 0-99-9.8-144.8-29.2A370.4 370.4 0 01248.9 775c-34.2-34.2-61-74-79.8-118.3C149.8 611 140 562.3 140 512s9.8-99 29.2-144.8A370.4 370.4 0 01249 248.9c34.2-34.2 74-61 118.3-79.8C413 149.8 461.7 140 512 140c50.3 0 99 9.8 144.8 29.2A370.4 370.4 0 01775.1 249c34.2 34.2 61 74 79.8 118.3C874.2 413 884 461.7 884 512s-9.8 99-29.2 144.8A368.89 368.89 0 01775 775zM664 533h-48.1c-4.2 0-7.8 3.2-8.1 7.4C604 589.9 562.5 629 512 629s-92.1-39.1-95.8-88.6c-.3-4.2-3.9-7.4-8.1-7.4H360a8 8 0 00-8 8.4c4.4 84.3 74.5 151.6 160 151.6s155.6-67.3 160-151.6a8 8 0 00-8-8.4z"
				/>
			</svg>
		</template>
	</dd-select>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const select = ref('d13');
const options = ref([]);
</script>
```

:::

## 基础多选

为 `dd-select` 设置 `multiple` 属性即可启用多选， 此时 `v-model` 的值为当前选中值所组成的数组。

:::demo

```vue
<template>
	<div style="display: flex; flex-direction: column; justify-content: center">
		<dd-select
			style="width: 300px"
			v-model:value="select"
			placeholder="Please input"
			:options="options"
			clearable
			multiple
		/>

		<p>maxTagCount</p>

		<dd-select
			style="width: 300px"
			v-model:value="select"
			placeholder="Please input"
			:options="options"
			clearable
			multiple
			:maxTagCount="3"
		/>
	</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const select = ref(['d13', 'e14', 'f15', 'g16']);
const options = ref();
let c = [];
for (let i = 10; i < 100; i++) {
	c.push({
		label: i.toString(36) + i,
		value: i.toString(36) + i,
		disabled: i % 4 == 0,
	});
}
options.value = c;
</script>
```

:::

## 筛选选项

可以利用筛选功能快速查找选项。
为 `dd-select` 添加 `show-search` 属性即可启用搜索功能。 `filter-option` 为一个 `Function`，它会在输入值发生变化时调用，参数为当前输入值。

:::demo

```vue
<template>
	<dd-select
		style="width: 120px"
		v-model:value="select"
		placeholder="Please input"
		:options="options"
		:filter-option="filterOption"
		show-search
	/>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const select = ref('d13');
const options = ref();
let c = [];
for (let i = 10; i < 100; i++) {
	c.push({
		label: i.toString(36) + i,
		value: i.toString(36) + i,
	});
}
options.value = c;
const filterOption = (input: string, option: any) => {
	return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0;
};
</script>
```

:::

## 自定义模板

将自定义的 HTML 模板插入 `dd-select` 的 `slot` 中即可。

:::demo

```vue
<template>
	<dd-select style="width: 120px" placeholder="Please input" clearable>
		<template #dropdownRender>
			<dd-loading tip="努力加载中..." />
		</template>
	</dd-select>
</template>
```

:::

## 远程搜索

输入关键字以从远程服务器中查找数据。

:::demo

```vue
<template>
	<dd-select
		style="width: 120px"
		v-model:value="select"
		placeholder="Please input"
		:options="options"
		show-search
		:filter-option="null"
		@search="handleSearch"
	>
		<template #dropdownRender v-if="loading">
			<dd-loading tip="努力加载中..." />
		</template>
	</dd-select>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const select = ref('d13');
const options = ref([]);
const loading = ref(false);
const handleSearch = (val) => {
	loading.value = true;
	setTimeout(() => {
		loading.value = false;
		let c = [];
		for (let i = 10; i < 100; i++) {
			c.push({
				label: i.toString(36) + i + val,
				value: i.toString(36) + i + val,
			});
		}
		options.value = c;
	}, 2000);
};
</script>
```

:::

## 大数据

`dd-select` 默认使用了虚拟滚动技术

:::demo

```vue
<template>
	<p>100000 Items</p>
	<dd-select
		style="width: 120px"
		v-model:value="select"
		placeholder="Please input"
		:options="options"
	/>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const select = ref('d13');
const options = ref();
let c = [];
for (let i = 10; i < 100000; i++) {
	c.push({
		label: i.toString(36) + i,
		value: i.toString(36) + i,
	});
}
options.value = c;
</script>
```

:::

## Select API

### Select Attributes

| Name           | Description                | Type                                                             | Default | Version |
| -------------- | -------------------------- | ---------------------------------------------------------------- | ------- | ------- |
| value(v-model) | 绑定值                     | `'string' \| 'number' \| 'string[]' \| 'number[]'`               | —       |
| options        | 通过 `option` ，自定义节点 | `{ value: any; label?: any; disabled?: boolean; title?: any }[]` | —       |         |
| showSearch     | 配置是否可搜索             | `boolean`                                                        | false   |
| placeholder    | 输入框占位文本             | `string`                                                         | —       |
| disabled       | 禁用                       | `boolean`                                                        | false   |
| size           | 输入框尺寸                 | `'large'\|'default'\| 'small'`                                   | —       |
| filterOption   | 是否根据输入项进行筛选。   | `Function(inputValue, option)`                                   | true    |
| multiple       | 多选模式                   | `boolean`                                                        | false   |
| clearable      | 是否可以清空选项           | `boolean`                                                        | false   |
| maxTagCount    | 最多显示多少个 `tag`       | `number`                                                         | —       |
| bordered       | 无边框样式                 | `boolean`                                                        | false   |

### Select Events

| Name                    | Description                                   | Type                      |
| ----------------------- | --------------------------------------------- | ------------------------- |
| change                  | 仅当 `modelValue` 改变时                      | `(value, option) => void` |
| select                  | 被选中时调用                                  | `(value, option) => void` |
| search                  | 文本框值变化时回调                            | `(value) => void`         |
| deselect                | 取消选中时调用，仅在 `multiple`               | `(value, option) => void` |
| remove-tag              | 移除 `tag` 时触发，仅在 `multiple`            | `(value, option) => void` |
| input                   | 在 `Input` 值改变时触发                       | `(value) => void`         |
| clear                   | 在点击由 `clearable` 属性生成的清空按钮时触发 | `() => void`              |
| dropdown-visible-change | 下拉框出现/隐藏时触发                         | `(visible) => void`       |
| blur                    | 当 `input` 失去焦点时触发                     | `(e) => void`             |
| focus                   | 当 `input` 获得焦点时触发                     | `(e) => void`             |

### Select Slots

| Name           | Description |
| -------------- | ----------- |
| dropdownRender | 自定义内容  |
| suffixIcon     | 后缀图标    |
