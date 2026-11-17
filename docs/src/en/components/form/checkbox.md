# Checkbox

## Single checkbox

Use `v-model:checked` to bind the checked state. `indeterminate` controls only the visual indeterminate state.

:::demo

```vue
<template>
	<dd-checkbox v-model:checked="checked" :indeterminate="indeterminate">
		Accept terms
	</dd-checkbox>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const checked = ref(false);
const indeterminate = ref(false);
</script>
```

:::

## Checkbox group

Use `options` to provide choices and `v-model:value` to bind the selected values.

:::demo

```vue
<template>
	<dd-checkbox-group v-model:value="checkedValues" :options="options" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const checkedValues = ref(['Apple']);
const options = [
	{ label: 'Apple', value: 'Apple' },
	{ label: 'Pear', value: 'Pear' },
	{ label: 'Orange', value: 'Orange', disabled: true },
];
</script>
```

:::

`options` can also be an array of strings or numbers, such as `['Apple', 'Pear']`. Option objects support `label`, `value`, `disabled`, `indeterminate`, and `onChange`. The `onChange` callback receives the option's new checked state.

## Check all

Use a standalone Checkbox to control a CheckboxGroup, and update the check-all and indeterminate states based on the number of selected options. The Checkbox `change` callback receives a boolean.

:::demo

```vue
<template>
	<dd-checkbox
		v-model:checked="checkAll"
		:indeterminate="indeterminate"
		@change="onCheckAllChange"
	>
		Check all
	</dd-checkbox>
	<dd-checkbox-group v-model:value="checkedList" :options="options" />
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';

const options = ['Apple', 'Pear', 'Orange'];
const checkedList = ref(['Apple', 'Orange']);
const checkAll = ref(false);
const indeterminate = ref(true);

const onCheckAllChange = (checked: boolean) => {
	checkedList.value = checked ? options : [];
	indeterminate.value = false;
};

watch(checkedList, (values) => {
	indeterminate.value = values.length > 0 && values.length < options.length;
	checkAll.value = values.length === options.length;
});
</script>
```

:::

## Checkbox API

### Checkbox Attributes

| Property      | Description                | Type             | Default |
| ------------- | -------------------------- | ---------------- | ------- |
| checked       | Checked state (v-model)    | `boolean`        | `false` |
| indeterminate | Visual indeterminate state | `boolean`        | `false` |
| value         | Checkbox value             | `string \| number` | —       |
| disabled      | Disable the checkbox       | `boolean`        | `false` |

| Event  | Description             | Callback parameter |
| ------ | ----------------------- | ------------------ |
| change | Checked state changes   | `boolean`          |


### Checkbox Group Attributes

| Property | Description               | Type                                                                             | Default |
| -------- | ------------------------- | -------------------------------------------------------------------------------- | ------- |
| value    | Selected values (v-model) | `(string \| number)[]`                                                           | `[]`    |
| options  | Checkbox options          | `(string \| number \| { label, value, disabled?, indeterminate?, onChange? })[]` | `[]`    |
| disabled | Disable the entire group  | `boolean`                                                                        | `false` |

| Event  | Description                 | Callback parameter               |
| ------ | --------------------------- | -------------------------------- |
| change | Triggered when values change | `(value: (string \| number)[])` |
