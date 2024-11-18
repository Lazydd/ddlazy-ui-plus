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
	month?: number;
	year?: number;
	modeArr: string[];
	disabledDate: Function;
	conditionHideDatePickerContainerShow: Function;
}>();

const emit = defineEmits<{
	'year-change': [value: number];
	'set-year': [value: number];
	mouseenter: [value: Dayjs];
}>();

const dateValue = defineModel<Dayjs>('value');

const dateInfo = computed(() => {
	const base = Math.floor(year / 10) * 10;
	const startYear = base - 1;
	const endYear = base + 10;
	return Array.from({ length: endYear - startYear + 1 }, (_, i) => {
		return {
			date: dayjs({ year: (startYear + i).toString().padStart(2, '0') }),
			isCurrYear: i !== 0 && i !== endYear - startYear,
			format: (startYear + i).toString().length <= 2 ? 'YY' : 'YYYY',
		};
	}).reduce((arr, item, index) => {
		if (index % 3 === 0) arr.push([item]);
		else arr[arr.length - 1].push(item);
		return arr;
	}, []);
});

const dateClick = (date: Dayjs, isCurrYear: boolean) => {
	conditionHideDatePickerContainerShow();
	if (modeArr.length) {
		emit('set-year', date.year());
	} else {
		if (!isCurrYear) {
			const time = dayjs({ year, month });
			if (dayjs(date).isBefore(time, 'y')) {
				emit('year-change', -10);
			} else if (dayjs(date).isAfter(time, 'y')) {
				emit('year-change', 10);
			}
		}
		dateValue.value = date;
	}
};

const mouseenter = (date: Dayjs) => {
	emit('mouseenter', date);
};
</script>

<template>
	<table class="dd-picker-content">
		<tbody>
			<tr v-for="year in dateInfo">
				<td
					:class="[
						'dd-picker-cell',

						{
							'dd-picker-cell-in-view': isCurrYear,
							'dd-picker-cell-selected': dateValue
								? dayjs(dateValue).isSame(dayjs(date), 'y')
								: false,
							'dd-picker-cell-disabled': disabledDate(date),
						},
					]"
					v-for="{ date, isCurrYear, format } in year"
					:key="date"
					:title="dayjs(date).format(format)"
					@click="dateClick(date, isCurrYear)"
					@mouseenter="mouseenter(date)"
				>
					<div class="dd-picker-cell-inner">
						{{ dayjs(date).format(format)?.replace(/^0+/, '') || 0 }}
						<!-- 此处需要去除开头的0 -->
					</div>
				</td>
			</tr>
		</tbody>
	</table>
</template>
