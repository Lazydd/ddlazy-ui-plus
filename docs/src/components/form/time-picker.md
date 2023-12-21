# TimePicker 时间选择器

## 基础用法

:::demo

```vue
<template>
	<dd-time-picker v-model:value="time" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const time = ref();
</script>
```

:::

## 禁用状态

通过 `disabled` 属性指定是否禁用 `dd-time-picker` 组件

:::demo

```vue
<template>
	<dd-time-picker disabled />
</template>
```

:::

## 尺寸

使用 `size` 属性改变输入框大小。 除了默认大小外，还有另外两个选项： `large` , `small。`

:::demo

```vue
<template>
	<dd-time-picker v-model:value="time" size="large" />
	<dd-time-picker v-model:value="time" />
	<dd-time-picker v-model:value="time" size="small" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const time = ref();
</script>

<style>
.dd-time-picker + .dd-time-picker {
	margin-left: 20px;
}
</style>
```

:::

## 步长

使用 `hourStep` `minuteStep` `secondStep` 按步长展示可选的时分秒。

:::demo

```vue
<template>
	<dd-time-picker v-model:value="time" :hourStep="1" :minuteStep="15" :secondStep="10" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const time = ref();
</script>
```

:::

## 附加内容

使用 `renderExtraFooter` 插槽展示附加内容。

:::demo

```vue
<template>
	<dd-time-picker v-model:value="time">
		<template #renderExtraFooter>
			<dd-button>OK</dd-button>
		</template>
	</dd-time-picker>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const time = ref();
</script>
```

:::

## 范围选择器

:::demo

```vue
<template>
	<dd-time-range-picker v-model:value="time" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const time = ref();
</script>
```

:::

## 无边框

无边框样式。

:::demo

```vue
<template>
	<div>
		<dd-time-picker v-model:value="time" :bordered="false" />
	</div>
	<div style="margin-top: 20px">
		<dd-time-range-picker v-model:value="time2" :bordered="false" />
	</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const time = ref();
const time2 = ref();
</script>
```

:::

## TimePicker API

### TimePicker Attributes

| Name           | Description            | Type                                                                | Default      | Version |
| -------------- | ---------------------- | ------------------------------------------------------------------- | ------------ | ------- |
| value(v-model) | 绑定值                 | [`dayjs`](https://day.js.org/)                                      | —            |
| open(v-model)  | 面板是否打开           | boolean                                                             | `false`      |
| placeholder    | 没有值的时候显示的内容 | `string \| [string, string]`                                        | `请选择时间` |
| disabled       | 禁用                   | `boolean`                                                           | `false`      |
| disabledTime   | 不可选择的时间         | [`DisabledTime`](#disabledtime)                                     | —            |
| size           | 输入框尺寸             | `large \| default \| small`                                         | —            |
| clearable      | 是否可以清空选项       | `boolean`                                                           | `false`      |
| bordered       | 无边框样式             | `boolean`                                                           | `false`      |
| showNow        | 面板是否显示“此刻”按钮 | `boolean`                                                           | `true`       |
| format         | 展示的时间格式         | `string`                                                            | `HH:mm:ss`   |
| valueFormat    | 绑定值的格式           | `string` [`具体格式`](https://day.js.org/docs/zh-CN/display/format) | `HH:mm:ss`   |
| hourStep       | 小时选项间隔           | `number`                                                            | `1`          |
| minuteStep     | 分钟选项间隔           | `number`                                                            | `1`          |
| secondStep     | 秒选项间隔             | `number`                                                            | `1`          |

#### DisabledTime

```typescript
type DisabledTime = (now: Dayjs) => {
	disabledHours?: () => number[];
	disabledMinutes?: (selectedHour: number) => number[];
	disabledSeconds?: (selectedHour: number, selectedMinute: number) => number[];
};
```

### TimePicker Events

| Name       | Description           | Type                              |
| ---------- | --------------------- | --------------------------------- |
| change     | 时间发生变化的回调    | `(time: dayjs \| string) => void` |
| openChange | 面板打开/关闭时的回调 | `(open: boolean) => void`         |

### TimePicker Slots

| Name              | Description                |
| ----------------- | -------------------------- |
| renderExtraFooter | 选择框底部显示自定义的内容 |
| suffixIcon        | 自定义的选择框后缀图标     |

## TimeRangePicker API

### TimeRangePicker Attributes

属性与 TimePicker 相同。还包含以下属性：

| Name  | Description          | Type      | Default | Version |
| ----- | -------------------- | --------- | ------- | ------- |
| order | 始末时间是否自动排序 | `boolean` | true    |
