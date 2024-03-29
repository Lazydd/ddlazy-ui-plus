<script setup lang="ts">
import { computed } from 'vue';
import dayjs, { Dayjs } from 'dayjs';
import { useCalendar } from '../../utils/hook';

const props = withDefaults(
	defineProps<{
		value: any;
		month?: number;
		year?: number;
		disabledDate: Function;
		conditionHideDatePickerContainerShow: Function;
	}>(),
	{
		month: dayjs().month(),
		year: dayjs().year(),
	}
);

const emit = defineEmits<{
	'month-change': [value: number];
	mouseenter: [value: Dayjs];
}>();

const dateValue = defineModel<Dayjs>('value');

const dateInfo = computed(() => {
	return useCalendar({ year: props.year, month: props.month });
});

const dateClick = (date: Dayjs, isCurrMonth: boolean) => {
	if (props.disabledDate(date)) return;
	dateValue.value = date;
	if (!isCurrMonth) {
		const time = dayjs({ year: props.year, month: props.month });
		if (dayjs(date).isBefore(time, 'M')) {
			emit('month-change', -1);
		} else if (dayjs(date).isAfter(time, 'M')) {
			emit('month-change', 1);
		}
	}
	props.conditionHideDatePickerContainerShow();
};

const mouseenter = (date: Dayjs) => {
	emit('mouseenter', date);
};
</script>

<template>
	<table class="dd-picker-content">
		<thead>
			<tr>
				<th></th>
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
			<tr
				v-for="week in dateInfo.dates"
				:class="[
					'dd-picker-week-panel-row',
					{
						'dd-picker-week-panel-row-selected': dateValue
							? dayjs(dateValue).isSame(week[0].date, 'w')
							: false,
					},
				]"
			>
				<td
					:class="['dd-picker-cell']"
					@click="dateClick(week[0].date, week[0].isCurrMonth)"
				>
					<div class="dd-picker-cell-inner">{{ dayjs(week[0].date).week() }}</div>
				</td>
				<td
					:class="[
						'dd-picker-cell',
						{
							'dd-picker-cell-in-view': isCurrMonth,
							'dd-picker-cell-today': dayjs().isSame(date, 'D'),
							'dd-picker-cell-disabled': disabledDate(date),
						},
					]"
					v-for="{ date, isCurrMonth } in week"
					:key="(date as any)"
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
