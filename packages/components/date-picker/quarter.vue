<script setup lang="ts">
import { computed } from 'vue';
import dayjs, { Dayjs } from 'dayjs';

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
	'update:value': [value: Dayjs];
	mouseenter: [value: Dayjs];
}>();

const dateInfo = computed(() => {
	return [
		Array.from({ length: 4 }, (_, i) => ({
			date: dayjs({ year: props.year, month: i * 3 }),
		})),
	];
});

const dateClick = (date: Dayjs) => {
	emit('update:value', date);
	props.conditionHideDatePickerContainerShow();
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
							'dd-picker-cell-selected': value
								? dayjs(value).isSame(dayjs(date), 'Q')
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
