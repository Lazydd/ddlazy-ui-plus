# Checkbox 复选框

## 单个复选框

使用 `v-model:checked` 绑定选中状态。`indeterminate` 只控制半选样式。

:::demo

```vue
<template>
    <dd-checkbox v-model:checked="checked" :indeterminate="indeterminate">
        同意条款
    </dd-checkbox>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const checked = ref(false);
const indeterminate = ref(false);
</script>
```

:::

## 复选框组

通过 `options` 设置选项，使用 `v-model:value` 绑定选中的值。

:::demo

```vue
<template>
    <dd-checkbox-group v-model:value="checkedValues" :options="options" />
</template>

<script lang="ts" setup>
import { ref } from "vue";

const checkedValues = ref(["Apple"]);
const options = [
    { label: "Apple", value: "Apple" },
    { label: "Pear", value: "Pear" },
    { label: "Orange", value: "Orange", disabled: true },
];
</script>
```

:::

`options` 也可以直接传入字符串或数字数组，例如 `['Apple', 'Pear']`。选项对象支持 `label`、`value`、`disabled`、`indeterminate` 和 `onChange`。`onChange` 接收当前选项新的选中状态。

## 全选

使用单个 Checkbox 控制 CheckboxGroup，并根据已选项数量更新全选框的选中和半选状态。Checkbox 的 `change` 回调参数是布尔值。

:::demo

```vue
<template>
    <dd-checkbox
        v-model:checked="checkAll"
        :indeterminate="indeterminate"
        @change="onCheckAllChange">
        Check all
    </dd-checkbox>
    <dd-checkbox-group v-model:value="checkedList" :options="options" />
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";

const options = ["Apple", "Pear", "Orange"];
const checkedList = ref(["Apple", "Orange"]);
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

| 属性          | 说明                    | 类型               | 默认值  |
| ------------- | ----------------------- | ------------------ | ------- |
| checked       | 当前是否选中（v-model） | `boolean`          | `false` |
| indeterminate | 半选状态，仅控制样式    | `boolean`          | `false` |
| value         | 复选框的值              | `string \| number` | —       |
| disabled      | 是否禁用                | `boolean`          | `false` |

| 事件   | 说明           | 回调参数  |
| ------ | -------------- | --------- |
| change | 选中状态变化时 | `boolean` |

### Checkbox Group Attributes

| 属性     | 说明                    | 类型                                                                             | 默认值  |
| -------- | ----------------------- | -------------------------------------------------------------------------------- | ------- |
| value    | 当前选中的值（v-model） | `(string \| number)[]`                                                           | `[]`    |
| options  | 复选框选项              | `(string \| number \| { label, value, disabled?, indeterminate?, onChange? })[]` | `[]`    |
| disabled | 是否禁用整个复选框组    | `boolean`                                                                        | `false` |

| 事件   | 说明         | 回调参数                        |
| ------ | ------------ | ------------------------------- |
| change | 选中值变化时 | `(value: (string \| number)[])` |
