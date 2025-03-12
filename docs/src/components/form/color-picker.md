# ColorPicker 颜色选择器

## 基础用法

:::demo

```vue
<template>
	<dd-color-picker v-model:value="color" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const color = ref('#1677ff');
</script>
```

:::

## 禁用

:::demo

```vue
<template>
	<dd-color-picker v-model:value="color" disabled />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const color = ref('#1677ff');
</script>
```

:::

## 三种大小

:::demo

```vue
<template>
	<div style="display: flex; gap: 10px">
		<dd-color-picker v-model:value="color" size="small" />
		<dd-color-picker v-model:value="color" />
		<dd-color-picker v-model:value="color" size="large" />
	</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const color = ref('#1677ff');
</script>
```

:::

## 禁用透明度

:::demo

```vue
<template>
	<dd-color-picker v-model:value="color" disabledAlpha />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const color = ref('#1677ff');
</script>
```

:::

## 清除颜色

:::demo

```vue
<template>
	<dd-color-picker v-model:value="color" allowClear />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const color = ref('#1677ff');
</script>
```

:::

## 自定义触发器

:::demo

```vue
<template>
	<dd-color-picker v-model:value="color">
		<dd-button>open</dd-button>
	</dd-color-picker>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const color = ref('#1677ff');
</script>
```

:::

## 预设颜色

:::demo

```vue
<template>
	<dd-color-picker v-model:value="color" :presets="['#ff0000']" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const color = ref('#1677ff');
</script>
```

:::

## ColorPicker API

### ColorPicker Attributes

| Name           | Description        | Type                        | Default | Version |
| -------------- | ------------------ | --------------------------- | ------- | ------- |
| allowClear     | 允许清除选择的颜色 | `boolean`                   | `false` |
| disabled       | 禁用颜色选择器     | `boolean`                   | `false` |
| disabledAlpha  | 禁用透明度         | `boolean`                   | `false` |
| format         | 颜色格式           | `auto \| rgb \| hex \| hsl` | `auto`  |
| presets        | 预设的颜色         | `string[]`                  | `[]`    |
| value(v-model) | 颜色的值           | `string`                    | —       |
| size           | 输入框尺寸         | `large \| default \| small` | —       |

### ColorPicker Events

| Name   | Description    | Type                      |
| ------ | -------------- | ------------------------- |
| change | 颜色变化的回调 | `(color: string) => void` |
| clear  | 清除的回调     | `() => void`              |

### ColorPicker Slots

| Name    | Description  |
| ------- | ------------ |
| default | 自定义触发器 |
