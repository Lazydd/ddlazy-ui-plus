# Radio

## Basic usage

:::demo

```vue
<template>
	<dd-radio v-model:checked="radio">A</dd-radio>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const radio = ref(false);
</script>
```

:::

## Disabled

Disable the Radio with the `disabled` attribute.

:::demo

```vue
<template>
	<dd-radio v-model:checked="radio" disabled>A</dd-radio>
	<dd-radio v-model:checked="radio2" disabled>B</dd-radio>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const radio = ref(true);
const radio2 = ref(false);
</script>
```

:::

## Radio button group

Combine `dd-radio-group` with `dd-radio` to display a radio group. Bind a variable with v-model of `dd-radio-group`

:::demo

```vue
<template>
	<dd-radio-group v-model:value="radio">
		<dd-radio :value="1">A</dd-radio>
		<dd-radio :value="2">B</dd-radio>
		<dd-radio :value="3">C</dd-radio>
	</dd-radio-group>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const radio = ref(1);
</script>
```

:::

## Button style

Radio with button styles.

:::demo

```vue
<template>
	<dd-radio-group v-model:value="radio" button-style="solid">
		<dd-radio-button :value="1" :disabled="true">A</dd-radio-button>
		<dd-radio-button :value="2">B</dd-radio-button>
		<dd-radio-button :value="3">C</dd-radio-button>
	</dd-radio-group>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const radio = ref(1);
</script>
```

:::

## With borders

:::demo

```vue
<template>
	<dd-radio-group v-model:value="radio">
		<dd-radio-button :value="1" :disabled="true">A</dd-radio-button>
		<dd-radio-button :value="2">B</dd-radio-button>
		<dd-radio-button :value="3">C</dd-radio-button>
	</dd-radio-group>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const radio = ref(1);
</script>
```

:::

## Size

:::demo

```vue
<template>
	<dd-radio-group v-model:value="radio" size="large">
		<dd-radio-button :value="1" :disabled="true">A</dd-radio-button>
		<dd-radio-button :value="2">B</dd-radio-button>
		<dd-radio-button :value="3">C</dd-radio-button>
	</dd-radio-group>
	<dd-radio-group v-model:value="radio">
		<dd-radio-button :value="1" :disabled="true">A</dd-radio-button>
		<dd-radio-button :value="2">B</dd-radio-button>
		<dd-radio-button :value="3">C</dd-radio-button>
	</dd-radio-group>
	<dd-radio-group v-model:value="radio" size="small">
		<dd-radio-button :value="1" :disabled="true">A</dd-radio-button>
		<dd-radio-button :value="2">B</dd-radio-button>
		<dd-radio-button :value="3">C</dd-radio-button>
	</dd-radio-group>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const radio = ref(1);
</script>
<style scoped>
.dd-radio-group + .dd-radio-group {
	margin-left: 20px;
}
</style>
```

:::

## Radio API

### Radio Attributes

| Name             | Description   | Type                          | Default | Version |
| ---------------- | ------------- | ----------------------------- | ------- | ------- |
| checked(v-model) | binding value | `boolean`                     | —       |
| value            | value         | `string \| number \| boolean` | —       |
| disabled         | disabled      | `boolean`                     | `false` |
| size             | size          | `large \| default \| small`   | —       |

### Radio Events

| Name   | Description                        | Type                                           |
| ------ | ---------------------------------- | ---------------------------------------------- |
| change | only if the modelValue has changed | `(value: string \| number \| boolean) => void` |

### Radio Slots

| Name    | Description               |
| ------- | ------------------------- |
| default | customize default content |

## RadioGroup API

### RadioGroup Attributes

| Name           | Description   | Type                          | Default   | Version |
| -------------- | ------------- | ----------------------------- | --------- | ------- |
| value(v-model) | binding value | `string \| number \| boolean` | —         |
| disabled       | disabled      | `boolean`                     | `false`   |
| size           | size          | `large \| default \| small`   | —         |
| buttonStyle    | buttonStyle   | `outline \| solid`            | `outline` |

### RadioGroup Events

| Name   | Description                        | Type                                                                                  |
| ------ | ---------------------------------- | ------------------------------------------------------------------------------------- |
| change | only if the modelValue has changed | `(value: string \| number \| boolean, oldValue: string \| number \| boolean) => void` |

### RadioGroup Slots

| Name    | Description               |
| ------- | ------------------------- |
| default | customize default content |
