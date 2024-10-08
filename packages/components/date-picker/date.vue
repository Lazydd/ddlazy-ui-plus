<script setup lang="ts">
import { computed } from 'vue';
import dayjs, { Dayjs } from 'dayjs';
import { useCalendar } from '../../utils/hook';

const {
	month = dayjs().month(),
	year = dayjs().year(),
	multiple = false,
	disabledDate,
	conditionHideDatePickerContainerShow,
} = defineProps<{
	month?: number;
	year?: number;
	multiple?: boolean;
	disabledDate: Function;
	conditionHideDatePickerContainerShow: Function;
}>();

const emit = defineEmits<{
	click: [value: Dayjs];
	'month-change': [value: number];
	mouseenter: [value: Dayjs];
}>();

const dateValue = defineModel<Dayjs>('value');

const dateInfo = computed(() => {
	return useCalendar({ year, month });
});

const dateClick = (date: Dayjs, isCurrMonth: boolean) => {
	dateValue.value = date;
	emit('click', date);
	if (!isCurrMonth) {
		const time = dayjs({ year, month });
		if (dayjs(date).isBefore(time, 'M')) {
			emit('month-change', -1);
		} else if (dayjs(date).isAfter(time, 'M')) {
			emit('month-change', 1);
		}
	}
	conditionHideDatePickerContainerShow();
};

const mouseenter = (date: Dayjs) => {
	emit('mouseenter', date);
};
</script>

<template>
	<table class="dd-picker-content">
		<thead>
			<tr>
				<th>一</th>
				<th>二</th>
				<th>三</th>
				<th>四</th>
				<th>五</th>
				<th>六</th>
				<th>日</th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="week in dateInfo.dates">
				<td
					:class="[
						'dd-picker-cell',
						{
							'dd-picker-cell-in-view': isCurrMonth,
							'dd-picker-cell-today': dayjs().isSame(date, 'D'),
							'dd-picker-cell-selected': dateValue
								? dayjs(dateValue).isSame(date, 'D')
								: false,
							'dd-picker-cell-disabled': disabledDate(date),
						},
					]"
					v-for="{ date, isCurrMonth } in week"
					:key="date as any"
					:title="dayjs(date).format('YYYY-MM-DD')"
					@click="dateClick(date, isCurrMonth)"
					@mouseenter="mouseenter(date)"
				>
					<div class="dd-picker-cell-inner">{{ dayjs(date).format('D') }}</div>
				</td>
			</tr>
		</tbody>
	</table>
</template>
