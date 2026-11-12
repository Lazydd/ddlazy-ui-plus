<script setup lang="ts">
import { computed } from 'vue';
import dayjs, { Dayjs } from 'dayjs';

const {
	month = dayjs().month(),
	year = dayjs().year(),
	modeArr,
	disabledDate,
	conditionHideDatePickerContainerShow,
} = defineProps<{
	value: any;
	month?: number;
	year?: number;
	modeArr: string[];
	disabledDate: Function;
	conditionHideDatePickerContainerShow: Function;
}>();

const emit = defineEmits<{
	'set-month': [value: number];
	mouseenter: [value: Dayjs];
}>();

const dateValue = defineModel<Dayjs>('value');

const dateInfo = computed<{ date: Dayjs }[][]>(() => {
	return Array.from({ length: 12 }, (_, i) => ({
		date: dayjs({ year, month: i }),
	})).reduce((arr, item, index) => {
		if (index % 3 === 0) arr.push([item]);
		else arr[arr.length - 1].push(item);
		return arr;
	}, []);
});

const dateClick = (date: Dayjs) => {
	conditionHideDatePickerContainerShow();
	if (modeArr.length) {
		emit('set-month', date.month());
	} else dateValue.value = date;
};

const mouseenter = (date: Dayjs) => {
	emit('mouseenter', date);
};
</script>

<template>
	<table class="dd-picker-content">
		<tbody>
			<tr v-for="(month, i) in dateInfo" :key="i">
				<td
					:class="[
						'dd-picker-cell',
						'dd-picker-cell-in-view',
						{
							'dd-picker-cell-selected': dateValue
								? dateValue.isSame(date, 'M')
								: false,
							'dd-picker-cell-disabled': disabledDate(date),
						},
					]"
					v-for="{ date } in month"
					:key="date.day()"
					:title="date.format('YYYY-MM')"
					@click="dateClick(date)"
					@mouseenter="mouseenter(date)"
				>
					<div class="dd-picker-cell-inner">{{ date.format('M') }}月</div>
				</td>
			</tr>
		</tbody>
	</table>
</template>
