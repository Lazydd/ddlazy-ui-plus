# Input 输入框

## 基础用法

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

## 禁用状态

通过 `disabled` 属性指定是否禁用 `input` 组件

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

## 一键清空

使用 `allowClear` 属性即可得到一个可一键清空的输入框

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

## 密码框

使用 `type=password` 属性即可得到一个可切换显示隐藏的密码框

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

## 带图标的输入框

`prefix` 和 `suffix` 命名的插槽

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

## 文本域

用于输入多行文本信息可缩放的输入框。 添加 `type="textarea"` 属性来将 `input` 元素转换为原生的 `textarea` 元素。

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

## 自适应文本域

设置文字输入类型的 `rows` 属性使得根据内容自动调整的高度。

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

## 尺寸

使用 `size` 属性改变输入框大小。 除了默认大小外，还有另外两个选项： `large` , `small。`

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

## 输入长度限制

使用 `maxlength` 和 `minlength` 属性, 来控制输入内容的最大字数和最小字数。 "字符数"使用 `JavaScript` 字符串长度来衡量。 为文本或文本输入类型设置 `maxlength` `prop` 可以限制输入值的长度。 允许你通过设置 `showCount` 到 `true` 来显示剩余字数。

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

| Name           | Description                              | Type                                     | Default | Version |
| -------------- | ---------------------------------------- | ---------------------------------------- | ------- | ------- |
| type           | 类型                                     | `string`                                 | `text`  |
| value(v-model) | 绑定值                                   | `string`                                 | —       |
| maxlength      | 最大输入长度                             | `number`                                 | —       |         |
| showCount      | 是否显示统计字数                         | `boolean`                                | `false` |
| placeholder    | 输入框占位文本                           | `string`                                 | —       |
| disabled       | 禁用                                     | `boolean`                                | `false` |
| size           | 输入框尺寸                               | `large \| default \| small`              | —       |
| prefix         | 前缀图标                                 | `Component`                              | —       |
| suffix         | 后缀图标                                 | `Component`                              | —       |
| rows           | 输入框行数，仅 type 为 `textarea` 时有效 | `number`                                 | —       |
| readonly       | 原生 `readonly` 属性，是否只读           | `boolean`                                | `false` |
| resize         | 控制是否能被用户缩放                     | `none \| both \| horizontal \| vertical` | —       |

### Input Events

| Name   | Description                                   | Type                                |
| ------ | --------------------------------------------- | ----------------------------------- |
| change | 仅当 modelValue 改变时                        | `(value: string \| number) => void` |
| input  | 在 Input 值改变时触发                         | `(value: string \| number) => void` |
| clear  | 在点击由 `clearable` 属性生成的清空按钮时触发 | `() => void`                        |

### Input Slots

| Name   | Description                                   |
| ------ | --------------------------------------------- |
| prefix | 输入框头部内容，只对非 `type="textarea"` 有效 |
| suffix | 输入框尾部内容，只对非 `type="textarea"` 有效 |

### Input Exposes

| Name     | Description        | Type                       |
| -------- | ------------------ | -------------------------- |
| clear    | 清除 input 值      | () => void                 |
| input    | Input HTML 元素    | `Ref<HTMLInputElement>`    |
| textarea | HTML textarea 元素 | `Ref<HTMLTextAreaElement>` |
