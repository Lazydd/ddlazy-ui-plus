# Input Number 数字输入框

## 基础用法

:::demo

```vue
<template>
	<dd-input-number v-model:value="value" placeholder="Please input" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const value = ref(10);
</script>
```

:::

## 禁用状态

`disabled` 属性接受一个 `Boolean` ，设置为 `true` 即可禁用整个组件。

:::demo

```vue
<template>
	<dd-input-number v-model:value="value" placeholder="Please input" disabled />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const value = ref(10);
</script>
```

:::

## 最大最小

如果你只需要控制数值在某一范围内，可以设置 `min` 属性和 `max` 属性

:::demo

```vue
<template>
	<dd-input-number v-model:value="value" placeholder="Please input" :max="11" :min="8" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const value = ref(10);
</script>
```

:::

## 步进

允许定义递增递减的步进控制，设置 `step` 属性可以控制步长。

:::demo

```vue
<template>
	<dd-input-number v-model:value="value" placeholder="Please input" :step="2" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const value = ref(10);
</script>
```

:::

## 无边框

:::demo

```vue
<template>
	<dd-input-number v-model:value="value" placeholder="Please input" bordered />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const value = ref(10);
</script>
```

:::

## 精度

:::demo

```vue
<template>
	<dd-input-number v-model:value="value" placeholder="Please input" :precision="2" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const value = ref(10);
</script>
```

:::

## 尺寸

使用 `size` 属性额外配置尺寸，可选的尺寸大小为：`large` 或 `small`

:::demo

```vue
<template>
	<dd-input-number v-model:value="value" placeholder="Please input" size="large" />
	<dd-input-number v-model:value="value" placeholder="Please input" />
	<dd-input-number v-model:value="value" placeholder="Please input" size="small" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const value = ref(10);
</script>
<style>
.dd-input-number + .dd-input-number {
	margin-left: 20px;
}
</style>
```

:::

## Input Number API

### Input Number Attributes

| Name           | Description            | Type                           | Default   | Version |
| -------------- | ---------------------- | ------------------------------ | --------- | ------- |
| value(v-model) | 绑定值                 | `string`                       | —         |
| max            | 设置计数器允许的最大值 | `number`                       | Infinity  |         |
| min            | 设置计数器允许的最小值 | `number`                       | -Infinity |
| step           | 计数器步长             | `number`                       | 1         |
| placeholder    | 输入框占位文本         | `string`                       | —         |
| disabled       | 禁用                   | `boolean`                      | false     |
| size           | 输入框尺寸             | `'large'\|'default'\| 'small'` | —         |
| precision      | 数值精度               | `'number'`                     | —         |
| bordered       | 无边框样式             | `'boolean'`                    | false     |

### Input Number Events

| Name   | Description            | Type                      |
| ------ | ---------------------- | ------------------------- |
| change | 仅当 modelValue 改变时 | `(value: number) => void` |
