# Radio 单选框

## 基础用法

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

## 禁用状态

`disabled` 属性可以用来控制单选框的禁用状态。

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

## 单选框组

结合 `dd-radio-group` 元素和子元素 `dd-radio` 可以实现单选组， 为 `dd-radio-group` 绑定 v-model。

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

## 按钮样式

你可以让单选框看起来像一个按钮一样。

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

## 带有边框

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

## 尺寸

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

| Name             | Description | Type                          | Default | Version |
| ---------------- | ----------- | ----------------------------- | ------- | ------- |
| checked(v-model) | 绑定值      | `boolean`                     | —       |
| value            | 值          | `string \| number \| boolean` | —       |
| disabled         | 禁用        | `boolean`                     | false   |
| size             | 输入框尺寸  | `large \| default \| small`   | —       |

### Radio Events

| Name   | Description            | Type                                           |
| ------ | ---------------------- | ---------------------------------------------- |
| change | 仅当 modelValue 改变时 | `(value: string \| number \| boolean) => void` |

### Radio Slots

| Name    | Description    |
| ------- | -------------- |
| default | 自定义默认内容 |

## RadioGroup API

### RadioGroup Attributes

| Name           | Description | Type                          | Default | Version |
| -------------- | ----------- | ----------------------------- | ------- | ------- |
| value(v-model) | 绑定值      | `string \| number \| boolean` | —       |
| disabled       | 禁用        | `boolean`                     | false   |
| size           | 输入框尺寸  | `large \| default \| small`   | —       |
| buttonStyle    | 风格样式    | `outline \| solid`            | outline |

### RadioGroup Events

| Name   | Description            | Type                                                                                  |
| ------ | ---------------------- | ------------------------------------------------------------------------------------- |
| change | 仅当 modelValue 改变时 | `(value: string \| number \| boolean, oldValue: string \| number \| boolean) => void` |

### RadioGroup Slots

| Name    | Description    |
| ------- | -------------- |
| default | 自定义默认内容 |
