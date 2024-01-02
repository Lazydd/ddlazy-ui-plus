<script setup lang="ts">
import { createName } from '../../utils/index';
import { datePickerProps, type FormatType } from './types';

import { ref, computed, type Component, watchEffect, nextTick, watch } from 'vue';
import dayjs, { Dayjs } from 'dayjs';

import Popover from '../components/popover/popover.vue';
import DataInput from './date-input.vue';
import DateHeader from './date-header.vue';
import Date from './date.vue';
import Week from './week.vue';
import Month from './month.vue';
import Quarter from './quarter.vue';
import Year from './year.vue';
import Dacade from './dacade.vue';
import Time from '../time-picker/time.vue';

defineOptions({
	name: createName('datePicker'),
});
const props = defineProps(datePickerProps);
const showTimeConfig = {
	format: 'HH:mm:ss',
	valueFormat: 'HH:mm:ss',
	disabledTime: () => ({
		disabledHours: () => <number[]>[],
		disabledMinutes: (selectedHour: number) => <number[]>[],
		disabledSeconds: (selectedHour: number, selectedMinute: number) => <number[]>[],
	}),
	hideDisabledOptions: true,
	hourStep: 1,
	minuteStep: 1,
	secondStep: 1,
};
const emit = defineEmits<{
	'update:value': [value: string | number | Date | Dayjs];
	'update:open': [open: boolean];
	openChange: [open: boolean];
	change: [time: string | number | Date | Dayjs];
}>();
const showTimeInfo = { ...showTimeConfig, ...props.showTime };

const tempShow = ref();
const datePickerContainerShow = computed({
	get() {
		return tempShow.value;
	},
	set(value) {
		tempShow.value = value;
		emit('update:open', value);
	},
});
watchEffect(() => {
	tempShow.value = props.open;
});
const datePickerRef = ref<HTMLElement | null>();
const datePickerInputRef = ref<HTMLInputElement | null>();

const hourRef = ref<InstanceType<typeof Time> | null>();
const minuteRef = ref<InstanceType<typeof Time> | null>();
const secondRef = ref<InstanceType<typeof Time> | null>();

const datePickerClick = async () => {
	if (props.disabled) return;
	datePickerContainerShow.value = true;
	datePickerInputRef.value.focus();
	await nextTick();
	hourRef.value?.init();
	minuteRef.value?.init();
	secondRef.value?.init();
};

const conditionHideDatePickerContainerShow = () => {
	if (modeArr.value.length) return;
	if (props.showTime) return;
	datePickerContainerShow.value = false;
};

const format = (value) => {
	let formatType: FormatType;
	switch (value) {
		case 'date':
			formatType = 'YYYY-MM-DD';
			break;
		case 'week':
			formatType = 'YYYY-ww周';
			break;
		case 'month':
			formatType = 'YYYY-MM';
			break;
		case 'quarter':
			formatType = 'YYYY-Q';
			break;
		case 'year':
		case 'dacade':
			formatType = 'YYYY';
			break;
		default:
			console.warn('Invalid prop: custom validator check failed for prop "mode".');
	}
	return formatType;
};

const timeformatType = computed(() => props.showTime.format ?? 'HH:mm:ss');

const dataTemp = ref<Dayjs | null>();
const dataValue = computed({
	get() {
		return props.value ? dayjs(props.value) : null;
	},
	set(value: any) {
		emit('update:value', value);
		if (!dayjs(value)?.isSame(dayjs(dataValue.value), 'd')) {
			emit('change', dayjs(value));
		}
	},
});
const formatValue = computed({
	get() {
		return dataTemp.value ? dayjs(dataTemp.value) : dataValue.value;
	},
	set(value) {
		let newValue = null;
		let newTime = null;
		let formatType: FormatType;
		if (value) {
			if (props.valueFormat) {
				formatType = props.valueFormat;
			} else {
				switch (activeMode.value) {
					case 'date':
						formatType = 'YYYY-MM-DD';
						break;
					case 'month':
						formatType = 'YYYY-MM';
						break;
					case 'year':
						formatType = 'YYYY';
						break;
				}
			}
			if (props.showTime) {
				if (!timeValue.value) {
					tempTime.value = dayjs();
					changeFormat();
				}
				newTime = timeValue.value
					? dayjs(timeValue.value).format(timeformatType.value as string)
					: null;
			}
			newValue = dayjs(value).format(formatType as string);
			if (newTime) {
				if (activeMode.value === 'week' || activeMode.value === 'quarter') {
					const data = dayjs(timeValue.value);
					newValue = dayjs(newValue)
						.hour(data.hour())
						.minute(data.minute())
						.second(data.second());
				} else {
					newValue = newValue + ' ' + newTime;
				}
			}
		}
		if (!props.showTime) {
			emit('update:value', newValue);
			if (!formatValue.value?.isSame(dayjs(dataValue.value), 'd')) {
				emit('change', formatValue.value);
			}
			return;
		}
		dataTemp.value = newValue;
	},
});
const formatShow = computed(() => {
	let value = null;
	let formatType: FormatType;
	if (formatValue.value) {
		formatType = props.format ? props.format : format(activeMode.value);
		value = formatValue.value.format(formatType as string);
	}
	if (props.showTime) {
		let time = formatValue.value
			? dayjs(formatValue.value).format(timeformatType.value as string)
			: null;
		value = value && time ? value + ' ' + time : null;
	}
	return value;
});
const formatShow2 = computed(() => {
	let value: any = props.showTime ? formatValue.value : props.value ? dayjs(props.value) : null;
	let formatType: FormatType;
	if (value) {
		formatType = props.format ? props.format : format(props.mode);
		value =
			props.mode === 'quarter'
				? value.format(formatType as string)?.replace(/-(?!.*-)/, '-Q')
				: value.format(formatType as string);
	}
	if (props.showTime) {
		let time = formatValue.value && timeValue.value.format(timeformatType.value as string);
		if (time) value = value + ' ' + time;
	}
	return value;
});
const activeMode = ref(props.mode);

const inputTitle = computed(() =>
	props.mode === 'quarter' ? formatShow.value?.replace(/-(?!.*-)/, '-Q') : formatShow.value
);
const inputValue = ref(inputTitle.value);
const month = ref(formatValue.value?.month() ?? dayjs().month());
const year = ref(formatValue.value?.year() ?? dayjs().year());
watchEffect(() => {
	if (props.value) {
		month.value = formatValue.value?.month();
		year.value = formatValue.value?.year();
	}
});
const monthChange = (value: number) => {
	month.value += value;
	if (month.value > 11) {
		month.value = 0;
		year.value++;
	} else if (month.value < 0) {
		month.value = 11;
		year.value--;
	}
};
const yearChange = (value: number) => {
	year.value += value;
};
const setMonth = (value: number) => {
	month.value = value;
	if (modeArr.value.length) dateMode.value = modeArr.value.pop();
};
const setYear = (value: number) => {
	year.value = value;
	if (modeArr.value.length) dateMode.value = modeArr.value.pop();
};
const today = () => {
	formatValue.value = dayjs();
	year.value = dayjs().year();
	month.value = dayjs().month();
	if (props.showTime) {
		let data = null;
		let formatType: FormatType;
		if (formatValue.value) {
			formatType = props.format ? props.format : format(activeMode.value);
			data = formatValue.value.format(formatType as string);
		}
		let time = dayjs().format(timeformatType.value as string);
		dataValue.value = data + ' ' + time;
	}
	tempTime.value = null;
	dataTemp.value = null;
	datePickerContainerShow.value = false;
};

const clearClick = () => {
	if (!props.allowClear) return;
	formatValue.value = null;
	dataValue.value = null;
	timeValue.value = null;
};
const dateMode = computed({
	get() {
		let str: Component = Date;
		switch (activeMode.value) {
			case 'date':
				str = Date;
				break;
			case 'week':
				str = Week;
				break;
			case 'month':
				str = Month;
				break;
			case 'quarter':
				str = Quarter;
				break;
			case 'year':
				str = Year;
				break;
			case 'dacade':
				str = Dacade;
				break;
			default:
				console.warn('Invalid prop: custom validator check failed for prop "mode".');
		}
		return str;
	},
	set(value: any) {
		activeMode.value = value;
	},
});
const modeArr = ref<string[]>([]);
const activeModeChange = (value: string) => {
	if (dateMode.value === 'dacade') return;
	modeArr.value.push(activeMode.value);
	dateMode.value = value;
};

const showPlaceholder = computed(() => {
	let str: string;
	if (props.placeholder) str = props.placeholder;
	else
		switch (props.mode) {
			case 'date':
				str = '请选择日期';
				break;
			case 'week':
				str = '请选择周';
				break;
			case 'month':
				str = '请选择月份';
				break;
			case 'quarter':
				str = '请选择季度';
				break;
			case 'year':
			case 'dacade':
				str = '请选择年份';
				break;
			default:
				console.warn('Invalid prop: custom validator check failed for prop "mode".');
		}
	return str;
});

const timeAttr = computed(() => props.showTime);

const tempTime = ref<Dayjs | null>();
const timeValue = computed({
	get() {
		return tempTime.value ?? formatValue.value;
	},
	set(value) {
		tempTime.value = value;
	},
});

const ok = () => {
	formatValue.value = dayjs(info.value);
	dataValue.value = dataTemp.value;
	props.onOk();
	datePickerContainerShow.value = false;
};

const changeFormat = () => {
	if (!datePickerContainerShow.value) return;
	if (!props.value) {
		formatValue.value = dayjs();
		hourRef.value?.scrollTo(info.value.hour);
		minuteRef.value?.scrollTo(info.value.minute);
		secondRef.value?.scrollTo(info.value.second);
	}
};
const info = computed(() => {
	return {
		year: formatValue.value?.year() ?? dayjs().year(),
		month: formatValue.value?.month() ?? dayjs().month(),
		date: formatValue.value?.date() ?? dayjs().date(),
		hour: formatValue.value?.hour() ?? dayjs().hour(),
		minute: formatValue.value?.minute() ?? dayjs().minute(),
		second: formatValue.value?.second() ?? dayjs().second(),
	};
});
const timeInfo = computed(() => ({
	hour: tempTime.value?.hour() ?? formatValue.value?.hour(),
	minute: tempTime.value?.minute() ?? formatValue.value?.minute(),
	second: tempTime.value?.second() ?? formatValue.value?.second(),
}));
const {
	disabledHours = () => [],
	disabledMinutes = () => [],
	disabledSeconds = () => [],
} = computed(() => showTimeInfo?.disabledTime?.(formatValue.value)).value;
const mouseenter = (value: Dayjs) => {
	isOutSide.value = false;
	if (!datePickerContainerShow.value) return;
	let formatType: FormatType;
	formatType = format(props.mode);
	if (props.format) formatType = props.format;
	if (activeMode.value === 'week') value = dayjs(value).year(value.year()).week(value.week());
	else if (activeMode.value === 'month')
		value = dayjs(value).year(value.year()).month(value.month()).date(info.value.date);
	else if (activeMode.value === 'quarter')
		value = dayjs(value).year(info.value.year).quarter(value.quarter());
	else if (activeMode.value === 'year' || activeMode.value === 'dacade')
		value = dayjs(value).year(value.year()).month(info.value.month).date(info.value.date);

	const newValue = value.format(formatType as string);
	let temp = props.mode === 'quarter' ? newValue.replace(/-(?!.*-)/, '-Q') : newValue;
	if (props.showTime) {
		temp = temp + ' ' + (timeValue.value ?? dayjs())?.format(timeformatType.value as string);
	}
	inputValue.value = temp;
};
const isOutSide = ref(true);
const mouseleave = () => {
	isOutSide.value = true;
	if (!datePickerContainerShow.value) return;
	inputValue.value = formatShow2.value;
};

const outSideClick = (visible: boolean) => {
	if (!visible) return;
	tempTime.value = null;
	dataTemp.value = null;
};

watch(
	() => datePickerContainerShow.value,
	() => {
		emit('openChange', datePickerContainerShow.value);
	}
);
defineExpose({
	datePickerClick,
	conditionHideDatePickerContainerShow,
});
</script>

<template>
	<div
		:class="[
			'dd-date-picker',
			size,
			{
				'dd-picker-focused': datePickerContainerShow,
				'dd-picker-disabled': disabled,
				'dd-picker-borderless': !bordered,
			},
		]"
		ref="datePickerRef"
		@click="datePickerClick"
	>
		<DataInput
			ref="datePickerInputRef"
			:format-show="isOutSide ? formatShow2 : inputValue"
			:format-value="formatShow"
			:disabled="disabled"
			:allow-clear="allowClear"
			:placeholder="showPlaceholder"
			:readonly="readonly"
			:show-time="showTime"
			@clearClick="clearClick"
		>
			<slot name="suffixIcon" v-if="$slots.suffixIcon" />
		</DataInput>
		<Teleport to="body">
			<Popover
				v-if="datePickerRef"
				v-model:visible="datePickerContainerShow"
				:instance="datePickerRef"
				:arrow="false"
				:padding="0"
				@outSideClick="outSideClick"
			>
				<div
					:class="[
						'dd-picker-datetime-panel',
						{ 'dd-week-time': activeMode === 'week' },
						{ 'dd-week-quarter': activeMode === 'quarter' },
					]"
				>
					<div
						:class="[
							'dd-picker-date-panel',
							{
								'dd-picker-week-panel': activeMode === 'week',
								'dd-picker-month-panel': activeMode === 'month',
								'dd-picker-quarter-panel': activeMode === 'quarter',
								'dd-picker-year-panel': activeMode === 'year',
								'dd-picker-dacade-panel': activeMode === 'dacade',
							},
						]"
					>
						<DateHeader
							:active-mode="activeMode"
							:year="year"
							:month="month"
							@active-mode-change="activeModeChange"
							@year-change="yearChange"
							@month-change="monthChange"
						/>
						<div class="dd-picker-body">
							<Component
								:is="dateMode"
								v-model:value="formatValue"
								:disabledDate="disabledDate"
								:month="month"
								:year="year"
								:mode-arr="modeArr"
								@month-change="monthChange"
								@set-month="setMonth"
								@set-year="setYear"
								@year-change="yearChange"
								@mouseenter="mouseenter"
								@mouseleave="mouseleave"
								:condition-hide-date-picker-container-show="
									conditionHideDatePickerContainerShow
								"
							/>
						</div>
					</div>
					<div class="dd-picker-time-panel" v-if="showTime">
						<div class="dd-picker-header">
							<div class="dd-picker-header-view">
								{{ timeValue?.format(timeformatType as string) ?? '&nbsp;' }}
							</div>
						</div>
						<div class="dd-picker-content">
							<Time
								ref="hourRef"
								type="hour"
								:step="timeAttr.hourStep"
								v-model:value="timeValue"
								:disabled-time="disabledHours()"
								:hide-disabled-options="showTimeInfo?.hideDisabledOptions"
								@click="changeFormat"
							/>
							<Time
								ref="minuteRef"
								type="minute"
								:step="timeAttr.minuteStep"
								v-model:value="timeValue"
								:disabled-time="disabledMinutes(timeInfo.hour)"
								:hide-disabled-options="showTimeInfo?.hideDisabledOptions"
								@click="changeFormat"
							/>
							<Time
								ref="secondRef"
								type="second"
								:step="timeAttr.secondStep"
								v-model:value="timeValue"
								:disabled-time="disabledSeconds(timeInfo.hour, timeInfo.minute)"
								:hide-disabled-options="showTimeInfo?.hideDisabledOptions"
								@click="changeFormat"
							/>
						</div>
					</div>
				</div>
				<div
					:class="['dd-picker-footer', { 'dd-picker-ranges': showTime }]"
					v-if="showTime || activeMode === 'date'"
				>
					<div class="dd-picker-footer-extra" v-if="$slots.renderExtraFooter">
						<slot name="renderExtraFooter" />
					</div>
					<a class="dd-picker-today-btn" @click="today" v-if="showToday">
						{{ showTime ? '此刻' : '今天' }}
					</a>
					<dd-button v-if="showTime" type="primary" size="small" @click="ok">
						确定
					</dd-button>
				</div>
			</Popover>
		</Teleport>
	</div>
</template>

<style scoped>
@import './style/date-picker.less';
</style>
