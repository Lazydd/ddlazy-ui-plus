# Switch 开关

## 基础用法

:::demo

```vue
<template>
	<dd-switch v-model:value="checked" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const checked = ref(true);
</script>
```

:::

## 禁用状态

设置 `disabled` 属性，接受一个 `Boolean` ，设置 `true` 即可禁用。

:::demo

```vue
<template>
	<dd-switch v-model:value="checked" disabled />
	<dd-switch v-model:value="checked2" disabled />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const checked = ref(true);
const checked2 = ref(false);
</script>
```

:::

## 文字描述

使用 `checkedChildren` 属性与 `unCheckedChildren` 属性来设置开关的文字描述。

:::demo

```vue
<template>
	<dd-switch v-model:value="checked" checkedChildren="开" unCheckedChildren="关" />
	<dd-switch v-model:value="checked" checkedChildren="1" unCheckedChildren="0" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const checked = ref(true);
</script>
```

:::

## 尺寸

:::demo

```vue
<template>
	<dd-switch v-model:value="checked" size="small" />
	<dd-switch v-model:value="checked" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const checked = ref(true);
</script>
```

:::

## 加载状态

设置 `loading` 属性，接受一个 `Boolean` ，设置 `true` 即加载中状态。

:::demo

```vue
<template>
	<dd-switch v-model:value="checked" size="small" loading />
	<dd-switch v-model:value="checked2" size="small" loading />
	<dd-switch v-model:value="checked" loading />
	<dd-switch v-model:value="checked2" loading />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const checked = ref(true);
const checked2 = ref(false);
</script>
```

:::

## Select API

### Select Attributes

| Name              | Description    | Type                  | Default   | Version |
| ----------------- | -------------- | --------------------- | --------- | ------- |
| value(v-model)    | 绑定值         | `'boolean'`           | —         |
| disabled          | 禁用           | `boolean`             | false     |
| loading           | 禁用           | `boolean`             | false     |
| size              | 输入框尺寸     | `'default'\| 'small'` | 'default' |
| checkedChildren   | 选中时的内容   | `'string'`            | —         |
| unCheckedChildren | 非选中时的内容 | `'string'`            | —         |

### Select Events

| Name   | Description              | Type                 |
| ------ | ------------------------ | -------------------- |
| change | 仅当 `modelValue` 改变时 | `(value, e) => void` |
