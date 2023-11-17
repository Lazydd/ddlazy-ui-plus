# Select

## Basic usage

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

## Disabled option

Set the value of `disabled` in `dd-option` to `true` to disable this option.

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

## Disabled select

Disable the whole component.

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

## Clearable single select

Set `clearable` attribute for `dd-select`

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

## Bordered-less

Bordered-less style component.

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

## Suffix

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

## Basic multiple select

Set `multiple` attribute for `dd-select` to enable multiple mode. In this case, the value of v-model will be an array of selected options.

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

## Filter Option

You can filter options for your desired ones.
Adding 'show-search' to `dd-select` enables filtering. `filter-option` is a `Function` that gets called when the input value changes, and its parameter is the current input value.

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

## Custom template

Insert customized HTML templates into the `slot` of `dd-option`.

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

## Remote Search

Enter keywords and search data from server.

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

## Big Data

`dd-select` use virtual scroll

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

| Name           | Description                          | Type                                                             | Default | Version |
| -------------- | ------------------------------------ | ---------------------------------------------------------------- | ------- | ------- |
| value(v-model) | binding value                        | `'string' \| 'number' \| 'string[]' \| 'number[]'`               | —       |
| options        | custom render option                 | `{ value: any; label?: any; disabled?: boolean; title?: any }[]` | —       |         |
| showSearch     | Whether select is searchable         | `boolean`                                                        | false   |
| placeholder    | placeholder of Input                 | `string`                                                         | —       |
| disabled       | whether Input is disabled            | `boolean`                                                        | false   |
| size           | size of Select                       | `'large'\|'default'\| 'small'`                                   | —       |
| filterOption   | Filter based on input items          | `Function(inputValue, option)`                                   | true    |
| multiple       | whether multiple-select is activated | `boolean`                                                        | false   |
| clearable      | whether select can be cleared        | `boolean`                                                        | false   |
| maxTagCount    | Max tag count to show                | `number`                                                         | —       |
| bordered       | Bordered-less                        | `boolean`                                                        | false   |

### Select Events

| Name                    | Description                                                    | Type                      |
| ----------------------- | -------------------------------------------------------------- | ------------------------- |
| change                  | only if the modelValue has changed                             | `(value, option) => void` |
| select                  | Called when a option is selected                               | `(value, option) => void` |
| search                  | Callback function that is fired when input changed.            | `(value) => void`         |
| deselect                | Called when a option is deselected，only called for `multiple` | `(value, option) => void` |
| remove-tag              | Called when a tag is removed ，only called for `multiple`      | `(value, option) => void` |
| input                   | Called when input changed                                      | `(value) => void`         |
| clear                   | Called when the clear icon is clicked in a clearable Select    | `() => void`              |
| dropdown-visible-change | Called when the dropdown appears/disappears                    | `(visible) => void`       |
| blur                    | Called when input blurs                                        | `(e) => void`             |
| focus                   | Called when input focuses                                      | `(e) => void`             |

### Select Slots

| Name           | Description                |
| -------------- | -------------------------- |
| dropdownRender | Customize dropdown content |
| suffixIcon     | The custom suffix icon     |

### Select Exposes
