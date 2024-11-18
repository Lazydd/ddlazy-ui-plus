<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
import { useTime } from '../../utils/hook';
import dayjs, { Dayjs } from 'dayjs';

const {
	value,
	type,
	activeInput,
	step = 1,
	disabledTime = [],
	hideDisabledOptions = false,
} = defineProps<{
	value: any;
	type: string;
	step?: number;
	activeInput?: number;
	disabledTime?: number[];
	hideDisabledOptions?: boolean;
}>();
const emit = defineEmits<{
	click: [value: string, type: string];
}>();

const showTime = computed(() => {
	let str = undefined;
	if (Array.isArray(value)) {
		if (value[activeInput]) {
			str = dayjs(value[activeInput], formatTimeType.value.formatType);
		}
	} else if (value) {
		str = dayjs(value, formatTimeType.value.formatType);
	}
	if (!str) return;
	if (type === 'hour') {
		str = str.hour();
	} else if (type === 'minute') {
		str = str.minute();
	} else if (type === 'second') {
		str = str.second();
	}
	if (str || str == 0) str = str.toString().padStart(2, '0');
	return str;
});
const formatShowTime = computed(() => dayjs(showTime.value, formatTimeType.value.formatType));
const dateInfo = computed(() => {
	return useTime({
		type: type,
		step: step,
		disabledArr: disabledTime,
	}).value.filter((v) => (hideDisabledOptions ? !v.disabled : true));
});

const formatTimeType = computed(() => {
	let formatType = '',
		type = '';
	switch (type) {
		case 'hour':
			formatType = 'HH';
			type = 'h';
			break;
		case 'minute':
			formatType = 'mm';
			type = 'm';
			break;
		case 'second':
			formatType = 'ss';
			type = 's';
			break;
	}
	return {
		formatType,
		type,
	};
});

const timeRef = ref<HTMLElement[] | null>();
const timePanelRef = ref<HTMLElement | null>();
const timeValue = defineModel<Dayjs | Dayjs[]>('value');
const timeClick = (v: any, index: number, disabled: boolean) => {
	if (disabled) return;
	scrollTo(index);
	let time: Dayjs | Dayjs[];
	const newValue = Array.isArray(value) ? value[activeInput] : value;
	switch (type) {
		case 'hour':
			time = dayjs(newValue ?? undefined).hour(v);
			break;
		case 'minute':
			time = dayjs(newValue ?? undefined).minute(v);
			break;
		case 'second':
			time = dayjs(newValue ?? undefined).second(v);
			break;
	}
	if (Array.isArray(value)) {
		const temp = value;
		temp[activeInput] = time;
		time = temp as Dayjs[];
	}
	timeValue.value = time;
	emit('click', v, type);
};
onMounted(() => {
	init();
});
const init = (type: ScrollBehavior = 'auto') => {
	if (!showTime.value) return;
	const index = dateInfo.value.findIndex((v) => v.time === showTime.value);
	scrollTo(index, type);
};
const scrollTo = (index: number, behavior: ScrollBehavior = 'smooth') => {
	let top: number = timeRef.value?.[index]?.offsetTop;
	timePanelRef.value?.scrollTo({ behavior, top });
};
const same = (v: string) => {
	const t1 = dayjs(v, formatTimeType.value.formatType);
	if (type === 'hour') return t1.hour() === formatShowTime.value.hour();
	else if (type === 'minute') return t1.minute() === formatShowTime.value.minute();
	else if (type === 'second') return t1.second() === formatShowTime.value.second();
};
defineExpose({
	init,
	scrollTo,
});
</script>

<template>
	<ul class="dd-picker-time-panel-column" style="position: relative" ref="timePanelRef">
		<li
			:class="[
				'dd-picker-time-panel-cell',
				{
					'dd-picker-time-panel-cell-selected': same(time),
					'dd-picker-time-pannel-cell-disabled': disabled,
				},
			]"
			v-for="({ time, disabled }, i) in dateInfo"
			:key="time"
			ref="timeRef"
			@click="timeClick(time, i, disabled)"
		>
			<div class="dd-picker-time-panel-cell-inner">
				{{ time }}
			</div>
		</li>
	</ul>
</template>

<style lang="scss" scoped>
.dd-picker-time-panel-column {
	flex: 1 0 auto;
	width: 56px;
	margin: 4px 0;
	padding: 0;
	overflow-y: hidden;
	text-align: start;
	list-style: none;
	transition: background 0.2s;
	overflow-x: hidden;
	&:hover {
		overflow-y: overlay;
	}
	.dd-picker-time-panel-cell {
		margin-inline: 4px;
		.dd-picker-time-panel-cell-inner {
			display: block;
			width: 48px;
			height: 28px;
			margin: 0;
			padding-block: 0;
			padding-inline-end: 0;
			padding-inline-start: 14px;
			color: var(--dd-time-picker-color);
			line-height: 28px;
			border-radius: 4px;
			cursor: pointer;
			transition: background 0.2s;
			&:hover {
				background: var(--dd-time-picker-hover-background-color);
			}
		}
		&.dd-picker-time-panel-cell-selected {
			.dd-picker-time-panel-cell-inner {
				background-color: var(--dd-time-picker-active-background-color);
			}
		}
		&.dd-picker-time-pannel-cell-disabled {
			.dd-picker-time-panel-cell-inner {
				color: var(--dd-time-picker-disabled-color);
				background: transparent;
				cursor: not-allowed;
				&:hover {
					background: var(--dd-time-picker-hover-background-color);
				}
			}
		}
	}
	&::after {
		content: '';
		display: block;
		height: 188px;
	}
	&:not(:first-child) {
		border-inline-start: 1px solid var(--dd-time-picker-border-color);
	}
	&::-webkit-scrollbar {
		width: 6px;
		background-color: transparent;
	}
	&::-webkit-scrollbar-thumb {
		background-color: rgba(0, 0, 0, 0.5);
	}
}
</style>
