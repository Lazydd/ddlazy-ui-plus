# Input

## Basic usage

:::demo

```vue
<template>
	<dd-input v-model:value="input" placeholder="Please input" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const input = ref('');
</script>
```

:::

## Disabled

Disable the Input with the `disabled` attribute.

:::demo

```vue
<template>
	<dd-input v-model:value="input" disabled placeholder="Please input" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const input = ref('');
</script>
```

:::

## AllowClear

Make the Input allowClear with the `allowClear` attribute.

:::demo

```vue
<template>
	<dd-input v-model:value="input" allowClear placeholder="Please input" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const input = ref('');
</script>
```

:::

## Password box

Setting the `type=password` attribute to obtain a password box that can be toggled between displaying and hiding

:::demo

```vue
<template>
	<dd-input v-model:value="input" type="password" placeholder="Please input" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const input = ref('');
</script>
```

:::

## Input with icon

`prefix` and `suffix` named slots

:::demo

```vue
<template>
	<dd-input v-model:value="input" placeholder="Please input">
		<template #prefix>
			<div>prefix</div>
		</template>
		<template #suffix>
			<div>suffix</div>
		</template>
	</dd-input>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const input = ref('');
</script>
```

:::

## Textarea

Resizable for entering multiple lines of text information. Add attribute `type="textarea"` to change `input` into native `textarea`.

:::demo

```vue
<template>
	<dd-input v-model:value="input" placeholder="Please input" type="textarea" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const input = ref('');
</script>
```

:::

## Autosize Textarea

Setting the `rows` prop for a textarea type of Input makes the height to automatically adjust based on the content.

:::demo

```vue
<template>
	<dd-input v-model:value="input" placeholder="Please input" type="textarea" :rows="12" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const input = ref('');
</script>
```

:::

## Size

Setting the `size` attribute to change the size of the input box. In addition to the default size, there are two other options: `large` and `small`

:::demo

```vue
<template>
	<div style="display: flex; flex-direction: column; gap: 20px;">
		<dd-input v-model:value="input" placeholder="Please input" size="large" />
		<dd-input v-model:value="input" placeholder="Please input" />
		<dd-input v-model:value="input" placeholder="Please input" size="small" />
	</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const input = ref('');
</script>
```

:::

## Limit length

`maxlength` and `minlength` attributes of input, they declare a limit on the number of characters a user can input. The "number of characters" is measured using JavaScript string length.Setting the `maxlength` prop for a text or textarea type of Input can limit the length of input value, allows you to show word count by setting `showCount` to true at the same time.

:::demo

```vue
<template>
	<div style="display: flex; flex-direction: column; gap: 20px;">
		<dd-input v-model:value="input" placeholder="Please input" showCount :maxlength="20" />
		<dd-input
			v-model:value="input"
			placeholder="Please input"
			showCount
			:maxlength="20"
			type="textarea"
		/>
	</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const input = ref('');
</script>
```

:::

## Input API

### Input Attributes

| Name           | Description                                                      | Type                                     | Default | Version |
| -------------- | ---------------------------------------------------------------- | ---------------------------------------- | ------- | ------- |
| type           | type of input                                                    | `string`                                 | text    |
| value(v-model) | binding value                                                    | `string`                                 | —       |
| maxlength      | the max length                                                   | `number`                                 | —       |         |
| showCount      | whether show word count                                          | `boolean`                                | false   |
| placeholder    | placeholder of Input                                             | `string`                                 | —       |
| disabled       | whether Input is disabled                                        | `boolean`                                | false   |
| size           | size of Input, works when `type` is not `textarea`               | `large \| default \| small`              | —       |
| prefix         | prefix icon component                                            | `Component`                              | —       |
| suffix         | suffix icon component                                            | `Component`                              | —       |
| rows           | number of rows of textarea, only works when `type` is `textarea` | `number`                                 | —       |
| readonly       | same as `readonly` in native input                               | `boolean`                                | false   |
| resize         | control the resizability                                         | `none \| both \| horizontal \| vertical` | —       |

### Input Events

| Name   | Description                                                                                           | Type                                                    |
| ------ | ----------------------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| change | triggers when the input box loses focus or the user presses Enter, only if the modelValue has changed | `(value: string \| number) => void`                     |
| input  | triggers when the Input value change                                                                  | `(value: string                     \| number) => void` |
| clear  | triggers when the Input is cleared by clicking the clear button                                       | `() => void`                                            |

### Input Slots

| Name   | Description                                                       |
| ------ | ----------------------------------------------------------------- |
| prefix | content as Input prefix, only works when `type` is not `textarea` |
| suffix | content as Input suffix, only works when `type` is not `textarea` |

### Input Exposes

| Name     | Description           | Type                       |
| -------- | --------------------- | -------------------------- |
| clear    | clear input value     | () => void                 |
| input    | HTML input element    | `Ref<HTMLInputElement>`    |
| textarea | HTML textarea element | `Ref<HTMLTextAreaElement>` |
