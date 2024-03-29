<script setup lang="ts">
import { computed } from 'vue';
import dayjs, { Dayjs } from 'dayjs';

const props = withDefaults(
	defineProps<{
		value: any;
		month?: number;
		year?: number;
		modeArr: string[];
		conditionHideDatePickerContainerShow: Function;
	}>(),
	{
		month: dayjs().month(),
		year: dayjs().year(),
	}
);

const emit = defineEmits<{
	'year-change': [value: number];
	'set-year': [value: number];
	mouseenter: [value: Dayjs];
}>();

const dateValue = defineModel<Dayjs>('value');

const dateInfo = computed(() => {
	const base = Math.floor(props.year / 100) * 100;
	const startYear = base - 1;
	const endYear = base + 10;
	return Array.from({ length: endYear - startYear + 1 }, (_, i) => ({
		date: dayjs().year(startYear + 10 * i - 9),
		isCurrYear: i !== 0 && i !== endYear - startYear,
	})).reduce((arr, item, index) => {
		if (index % 3 === 0) arr.push([item]);
		else arr[arr.length - 1].push(item);
		return arr;
	}, []);
});
const dateClick = (date: Dayjs, isCurrYear: boolean) => {
	props.conditionHideDatePickerContainerShow();
	if (props.modeArr.length) {
		emit('set-year', date.year());
	} else {
		if (!isCurrYear) {
			const time = dayjs({ year: props.year, month: props.month });
			if (dayjs(date).isBefore(time, 'y')) {
				emit('year-change', -100);
			} else if (dayjs(date).isAfter(time, 'y')) {
				emit('year-change', 100);
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
								? dayjs(dateValue).isSameOrAfter(dayjs(date), 'y') &&
								  dayjs(dateValue).isSameOrBefore(dayjs(date).add(9, 'y'), 'y')
								: false,
						},
					]"
					v-for="{ date, isCurrYear } in year"
					:key="date"
					@click="dateClick(date, isCurrYear)"
					@mouseenter="mouseenter(date)"
				>
					<div class="dd-picker-cell-inner">
						{{ dayjs(date).format('YYYY').replace(/^0+/, '') || 0 }}-{{
							dayjs(date).add(9, 'y').format('YYYY').replace(/^0+/, '') || 0
						}}
					</div>
				</td>
			</tr>
		</tbody>
	</table>
</template>
