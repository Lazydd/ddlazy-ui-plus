# Input Number

## Basic usage

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

## Disabled

The `disabled` attribute accepts a `boolean`, and if the value is `true`

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

## Max, Min

you can add `min` attribute to set the minimum value and `max` to set the maximum value.

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

## Step

Allows you to define incremental steps. Add `step` attribute to set the step.

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

## Borderless

:::demo

```vue
<template>
	<dd-input-number v-model:value="value" placeholder="Please input" :bordered="false" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const value = ref(10);
</script>
```

:::

## Precision

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

## Size

Use attribute `size` to set additional sizes with `large` or `small`.

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

| Name           | Description                 | Type                        | Default   | Version |
| -------------- | --------------------------- | --------------------------- | --------- | ------- |
| value(v-model) | binding value               | `string`                    | —         |
| max            | the maximum allowed value   | `number`                    | Infinity  |         |
| min            | the minimum allowed value   | `number`                    | -Infinity |
| step           | incremental step            | `number`                    | 1         |
| placeholder    | placeholder of Input Number | `string`                    | —         |
| disabled       | whether Input is disabled   | `boolean`                   | false     |
| size           | size of Input Number        | `large \| default \| small` | —         |
| precision      | precision of input value    | `number`                    | —         |
| bordered       | No border                   | `boolean`                   | false     |

### Input Number Events

| Name   | Description                     | Type                      |
| ------ | ------------------------------- | ------------------------- |
| change | triggers when the value changes | `(value: number) => void` |
