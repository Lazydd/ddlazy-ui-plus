# Loading

## Basic usage

:::demo

```vue
<template>
	<dd-loading />
</template>
```

:::

## Size

Setting the `size` attribute to change the size. In addition to the default size, there are two other options: `large` and `small`

:::demo

```vue
<template>
	<dd-loading size="large" />
	<dd-loading />
	<dd-loading size="small" />
</template>
```

:::

## Custom description copy

Use the `tip` attribute to add a custom description copy.

:::demo

```vue
<template>
	<dd-loading tip="loading..." />
</template>
```

:::

## Color

Use `color` to change the color.

:::demo

```vue
<template>
	<dd-loading tip="loading..." color="red" />
</template>
```

:::

## Area loading

You can directly embed the content into `dd-loading`

:::demo

```vue
<template>
	<dd-loading tip="loading..." v-model:value="loading">
		<div style="width: 100%; height: 300px">content</div>
	</dd-loading>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const loading = ref(true);
</script>
```

:::

## Input API

### Input Attributes

| Name           | Description      | Type                           | Default | Version |
| -------------- | ---------------- | ------------------------------ | ------- | ------- |
| value(v-model) | binding value    | `boolean`                      | —       |
| size           | size of Loading  | `'large'\|'default'\| 'small'` | —       |
| tip            | color of Tip     | `string`                       | —       |
| color          | color of Loading | `string`                       | —       |

### Input Events

### Input Slots

| Name    | Description                         |
| ------- | ----------------------------------- |
| default | embed the content into `dd-loading` |

### Input Exposes
