# DatePicker 日期选择器

## 基础用法

:::demo

```vue
<template>
	<div style="display: flex; flex-direction: column; gap: 20px">
		<dd-date-picker v-model:value="date" />
		<dd-date-picker v-model:value="date" mode="week" />
		<dd-date-picker v-model:value="date" mode="month" />
		<dd-date-picker v-model:value="date" mode="quarter" />
		<dd-date-picker v-model:value="date" mode="year" />
	</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const date = ref();
</script>
```

:::

## 日期时间选择

:::demo

```vue
<template>
	<dd-date-picker v-model:value="date" showTime />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const date = ref();
</script>
```

:::

## 无边框

:::demo

```vue
<template>
	<dd-date-picker v-model:value="date" :bordered="false" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const date = ref();
</script>
```

:::

## 禁用

:::demo

```vue
<template>
	<dd-date-picker v-model:value="date" disabled />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const date = ref();
</script>
```

:::

## 三种大小

:::demo

```vue
<template>
	<dd-radio-group v-model:value="size">
		<dd-radio-button value="large">Large</dd-radio-button>
		<dd-radio-button value="default">Default</dd-radio-button>
		<dd-radio-button value="small">Small</dd-radio-button>
	</dd-radio-group>
	<div style="margin-top: 20px">
		<dd-date-picker v-model:value="date" :size="size" />
	</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const date = ref();
const size = ref('default');
</script>
```

:::

## 额外的页脚

:::demo

```vue
<template>
	<dd-date-picker v-model:value="date">
		<template #renderExtraFooter>extra footer</template>
	</dd-date-picker>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const date = ref();
</script>
```

:::

## 后缀图标

:::demo

```vue
<template>
	<dd-date-picker v-model:value="date">
		<template #suffixIcon>ab</template>
	</dd-date-picker>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const date = ref();
</script>
```

:::

## DatePicker API

### DatePicker Attributes

| Name           | Description            | Type                                                                | Default                                                                    | Version |
| -------------- | ---------------------- | ------------------------------------------------------------------- | -------------------------------------------------------------------------- | ------- |
| value(v-model) | 绑定值                 | [`dayjs`](https://day.js.org/)                                      | —                                                                          |
| open(v-model)  | 面板是否打开           | boolean                                                             | `false`                                                                    |
| mode           | 设置选择器类型         | `date \| week \| month \| quarter \| year`                          | `false`                                                                    |
| placeholder    | 没有值的时候显示的内容 | `string \| [string, string]`                                        | `请选择时间`                                                               |
| disabled       | 禁用                   | `boolean`                                                           | `false`                                                                    |
| disabledDate   | 不可选择的日期         | `(currentDate: dayjs) => boolean`                                   | —                                                                          |
| size           | 输入框尺寸             | `large \| default \| small`                                         | —                                                                          |
| readonly       | 设置输入框为只读       | `boolean`                                                           | `false`                                                                    |
| allowClear     | 是否可以清空选项       | `boolean`                                                           | `false`                                                                    |
| bordered       | 无边框样式             | `boolean`                                                           | `false`                                                                    |
| showNow        | 面板是否显示“此刻”按钮 | `boolean`                                                           | `true`                                                                     |
| format         | 展示的日期格式         | `string`                                                            | `YYYY-MM-DD`                                                               |
| valueFormat    | 绑定值的格式           | `string` [`具体格式`](https://day.js.org/docs/zh-CN/display/format) | `YYYY-MM-DD`                                                               |
| showTime       | 增加时间选择功能       | `Object \| boolean`                                                 | [`TimePicker Options`](/components/form/time-picker#timepicker-attributes) |
| showToday      | 是否展示“今天”按钮     | `boolean`                                                           | `true`                                                                     |

### DatePicker Events

| Name       | Description           | Type                              |
| ---------- | --------------------- | --------------------------------- |
| change     | 日期发生变化的回调    | `(time: dayjs \| string) => void` |
| openChange | 面板打开/关闭时的回调 | `(open: boolean) => void`         |

### DatePicker Slots

| Name              | Description                |
| ----------------- | -------------------------- |
| renderExtraFooter | 选择框底部显示自定义的内容 |
| suffixIcon        | 自定义的选择框后缀图标     |
