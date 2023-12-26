# TimePicker

## Basic usage

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

## Disabled

Set the value of `disabled` in `dd-time-picker` to `true` to disable this option.

:::demo

```vue
<template>
	<dd-time-picker disabled />
</template>
```

:::

## Size

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

## Interval Option

Show stepped options by `hourStep` `minuteStep` `secondStep`

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

## Addon

`renderExtraFooter` Slot

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

## Time Range Picker

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

## Bordered-less

Bordered-less style component.

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

| Name                | Description                                       | Type                                                                    | Default         | Version |
| ------------------- | ------------------------------------------------- | ----------------------------------------------------------------------- | --------------- | ------- |
| value(v-model)      | binding value                                     | [`dayjs`](https://day.js.org/)                                          | —               |
| open(v-model)       | Whether to popup panel                            | boolean                                                                 | `false`         |
| placeholder         | placeholder                                       | `string \| [string, string]`                                            | `Select a time` |
| disabled            | disabled                                          | `boolean`                                                               | `false`         |
| disabledTime        | disabledTime                                      | [`DisabledTime`](#disabledtime)                                         | —               |
| hideDisabledOptions | Whether hide the options that can not be selected | `boolean`                                                               | `false`         |
| size                | size                                              | `large \| default \| small`                                             | —               |
| clearable           | can be cleared                                    | `boolean`                                                               | `false`         |
| bordered            | Bordered-less                                     | `boolean`                                                               | `false`         |
| showNow             | Whether to show `Now` button on panel             | `boolean`                                                               | `true`          |
| format              | To set the time format                            | `string`                                                                | `HH:mm:ss`      |
| valueFormat         | format of binding value                           | `string` [`date formats`](https://day.js.org/docs/zh-CN/display/format) | `HH:mm:ss`      |
| hourStep            | Interval between hours in picker                  | `number`                                                                | `1`             |
| minuteStep          | Interval between minutes in picker                | `number`                                                                | `1`             |
| secondStep          | Interval between seconds in picker                | `number`                                                                | `1`             |

#### DisabledTime

```typescript
type DisabledTime = (now: Dayjs) => {
	disabledHours?: () => number[];
	disabledMinutes?: (selectedHour: number) => number[];
	disabledSeconds?: (selectedHour: number, selectedMinute: number) => number[];
};
```

### TimePicker Events

| Name       | Description                                                             | Type                              |
| ---------- | ----------------------------------------------------------------------- | --------------------------------- |
| change     | a callback function, can be executed when the selected time is changing | `(time: dayjs \| string) => void` |
| openChange | a callback function which will be called while panel opening/closing    | `(open: boolean) => void`         |

### TimePicker Slots

| Name              | Description                                                      |
| ----------------- | ---------------------------------------------------------------- |
| renderExtraFooter | Called from time picker panel to render some addon to its bottom |
| suffixIcon        | The custom suffix icon                                           |

## TimeRangePicker API

### TimeRangePicker Attributes

Same props from TimePicker. And includes additional props:

| Name  | Description              | Type      | Default | Version |
| ----- | ------------------------ | --------- | ------- | ------- |
| order | Order start and end time | `boolean` | true    |
