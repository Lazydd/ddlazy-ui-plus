# Loading 加载

## 基础用法

:::demo

```vue
<template>
	<dd-loading />
</template>
```

:::

## 尺寸

使用 `size` 属性改变大小。 除了默认大小外，还有另外两个选项： `large` , `small` 。

:::demo

```vue
<template>
	<dd-loading size="large" />
	<dd-loading />
	<dd-loading size="small" />
</template>
```

:::

## 加载文案

使用 `tip` 属性添加自定义描述文案。

:::demo

```vue
<template>
	<dd-loading tip="加载中..." />
</template>
```

:::

## 颜色

使用 `color` 改变颜色。

:::demo

```vue
<template>
	<dd-loading tip="加载中..." color="red" />
</template>
```

:::

## 区域加载

可以直接把内容内嵌到 `dd-loading`

:::demo

```vue
<template>
	<dd-loading tip="加载中..." v-model:value="loading">
		<div style="width: 100%; height: 300px">内容</div>
	</dd-loading>
	<dd-switch v-model:value="loading" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const loading = ref(true);
</script>
```

:::

## Input API

### Input Attributes

| Name           | Description | Type                           | Default | Version |
| -------------- | ----------- | ------------------------------ | ------- | ------- |
| value(v-model) | 绑定值      | `boolean`                      | —       |
| size           | 尺寸        | `'large'\|'default'\| 'small'` | —       |
| tip            | 提示文案    | `string`                       | —       |
| color          | 颜色        | `string`                       | —       |

### Input Events

### Input Slots

| Name    | Description                |
| ------- | -------------------------- |
| default | 在 `dd-loading` 中嵌入内容 |

### Input Exposes
