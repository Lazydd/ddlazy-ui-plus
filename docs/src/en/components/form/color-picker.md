# ColorPicker

## Basic usage

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

## Disabled

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

## Size

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

## Disabled Alpha

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

## Clear

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

## Custom Trigger

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

## Preset Colors

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

| Name           | Description                   | Type                        | Default | Version |
| -------------- | ----------------------------- | --------------------------- | ------- | ------- |
| allowClear     | Allow clearing color selected | `boolean`                   | `false` |
| disabled       | Disable ColorPicker           | `boolean`                   | `false` |
| disabledAlpha  | Disable Alpha                 | `boolean`                   | `false` |
| format         | Format of color               | `auto \| rgb \| hex \| hsl` | `auto`  |
| presets        | Preset colors                 | `string[]`                  | `[]`    |
| value(v-model) | Value of color                | `string`                    | —       |
| size           | Setting the trigger size      | `large \| default \| small` | —       |

### ColorPicker Events

| Name   | Description                      | Type                      |
| ------ | -------------------------------- | ------------------------- |
| change | Callback when `value` is changed | `(color: string) => void` |
| clear  | Called when clear                | `() => void`              |

### ColorPicker Slots

| Name    | Description    |
| ------- | -------------- |
| default | Custom Trigger |
