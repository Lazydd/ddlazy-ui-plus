<script setup lang="ts">
import { computed } from 'vue';
import dayjs, { Dayjs } from 'dayjs';

const {
	year = dayjs().year(),
	disabledDate,
	conditionHideDatePickerContainerShow,
} = defineProps<{
	year?: number;
	disabledDate: Function;
	conditionHideDatePickerContainerShow: Function;
}>();

const emit = defineEmits<{
	mouseenter: [value: Dayjs];
}>();

const dateValue = defineModel<Dayjs>('value');

const dateInfo = computed(() => {
	return [
		Array.from({ length: 4 }, (_, i) => ({
			date: dayjs({ year, month: i * 3 }),
		})),
	];
});

const dateClick = (date: Dayjs) => {
	dateValue.value = date;
	conditionHideDatePickerContainerShow();
};

const mouseenter = (date: Dayjs) => {
	emit('mouseenter', date);
};
</script>

<template>
	<table class="dd-picker-content">
		<tbody>
			<tr v-for="quarter in dateInfo">
				<td
					:class="[
						'dd-picker-cell',
						'dd-picker-cell-in-view',
						{
							'dd-picker-cell-selected': dateValue
								? dayjs(dateValue).isSame(dayjs(date), 'Q')
								: false,
							'dd-picker-cell-disabled': disabledDate(date),
						},
					]"
					v-for="({ date }, i) in quarter"
					:key="i"
					:title="
						dayjs(date)
							.format('YYYY-Q')
							.replace(/-(?!.*-)/, '-Q')
					"
					@click="dateClick(date)"
					@mouseenter="mouseenter(date)"
				>
					<div class="dd-picker-cell-inner">Q{{ dayjs(date).format('Q') }}</div>
				</td>
			</tr>
		</tbody>
	</table>
</template>
