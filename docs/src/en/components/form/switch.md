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

## Disabled

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

| Name              | Description                                     | Type                          | Default   | Version |
| ----------------- | ----------------------------------------------- | ----------------------------- | --------- | ------- |
| value(v-model)    | binding value                                   | `boolean`                     | —         |
| disabled          | disabled                                        | `boolean`                     | `false`   |
| loading           | loading                                         | `boolean`                     | `false`   |
| size              | size                                            | `default \| small`            | `default` |
| checkedChildren   | content to be shown when the state is checked   | `string`                      | —         |
| unCheckedChildren | content to be shown when the state is unchecked | `string`                      | —         |
| checkedValue      | value for checked state                         | `boolean \| string \| number` | `true`    |
| unCheckedValue    | value for unchecked state                       | `boolean \| string \| number` | `false`   |

### Select Events

| Name   | Description              | Type                 |
| ------ | ------------------------ | -------------------- |
| change | 仅当 `modelValue` 改变时 | `(value, e) => void` |
