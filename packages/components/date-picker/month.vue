<script setup lang="ts">
import { computed } from 'vue';
import dayjs, { Dayjs } from 'dayjs';

const props = withDefaults(
	defineProps<{
		value: any;
		month?: number;
		year?: number;
		modeArr: string[];
		disabledDate: Function;
		conditionHideDatePickerContainerShow: Function;
	}>(),
	{
		month: dayjs().month(),
		year: dayjs().year(),
	}
);

const emit = defineEmits<{
	'update:value': [value: Dayjs];
	'set-month': [value: number];
	mouseenter: [value: Dayjs];
}>();

const dateInfo = computed(() => {
	return Array.from({ length: 12 }, (_, i) => ({
		date: dayjs({ year: props.year, month: i }),
	})).reduce((arr, item, index) => {
		if (index % 3 === 0) arr.push([item]);
		else arr[arr.length - 1].push(item);
		return arr;
	}, []);
});

const dateClick = (date: Dayjs) => {
	props.conditionHideDatePickerContainerShow();
	if (props.modeArr.length) {
		emit('set-month', date.month());
	} else {
		emit('update:value', date);
	}
};

const mouseenter = (date: Dayjs) => {
	emit('mouseenter', date);
};
</script>

<template>
	<table class="dd-picker-content">
		<tbody>
			<tr v-for="month in dateInfo">
				<td
					:class="[
						'dd-picker-cell',
						'dd-picker-cell-in-view',
						{
							'dd-picker-cell-selected': value
								? dayjs(value).isSame(dayjs(date), 'M')
								: false,
							'dd-picker-cell-disabled': disabledDate(date),
						},
					]"
					v-for="{ date } in month"
					:key="date"
					:title="dayjs(date).format('YYYY-MM')"
					@click="dateClick(date)"
					@mouseenter="mouseenter(date)"
				>
					<div class="dd-picker-cell-inner">{{ dayjs(date).format('M') }}月</div>
				</td>
			</tr>
		</tbody>
	</table>
</template>
