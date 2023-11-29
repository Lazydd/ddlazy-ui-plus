# Switch

## Basic usage

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

Adding the disabled attribute disables Switch.

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

## Text description

You can add `checkedChildren` and `unCheckedChildren` attribute to show texts.

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

## Size

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

## Loading

Setting the `loading` attribute to `true` indicates a loading state on the Switch.

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

| Name              | Description    | Type               | Default | Version |
| ----------------- | -------------- | ------------------ | ------- | ------- |
| value(v-model)    | 绑定值         | `boolean`          | —       |
| disabled          | 禁用           | `boolean`          | false   |
| loading           | 禁用           | `boolean`          | false   |
| size              | 输入框尺寸     | `default \| small` | default |
| checkedChildren   | 选中时的内容   | `string`           | —       |
| unCheckedChildren | 非选中时的内容 | `string`           | —       |

### Select Events

| Name   | Description              | Type                 |
| ------ | ------------------------ | -------------------- |
| change | 仅当 `modelValue` 改变时 | `(value, e) => void` |
