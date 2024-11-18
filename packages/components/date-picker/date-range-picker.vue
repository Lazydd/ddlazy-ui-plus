<script setup lang="ts">
import { createName } from '../../utils/index';
import { dateRangePickerProps, type FormatType } from './types';

import { ref, computed, type Component, watchEffect, nextTick } from 'vue';
import dayjs, { Dayjs } from 'dayjs';

import Popover from '../components/popover/popover.vue';
import DateHeader from './date-header.vue';
import DataInput from './date-input.vue';
import Date from './date.vue';
import Week from './week.vue';
import Month from './month.vue';
import Quarter from './quarter.vue';
import Year from './year.vue';
import Dacade from './dacade.vue';
import Time from '../time-picker/time.vue';

defineOptions({
	name: createName('dateRangePicker'),
});
const props = defineProps(dateRangePickerProps);
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
	change: [time: string | number | Date | Dayjs];
}>();
const showTimeInfo = { ...showTimeConfig, ...props.showTime };

const datePickerContainerShow = ref(false);
const datePickerRef = ref<HTMLElement | null>();
const datePickerInputRef1 = ref<typeof DataInput>();
const datePickerInputRef2 = ref<typeof DataInput>();
const datePickerInputRef = ref<HTMLInputElement | null>();

const hourRef = ref<InstanceType<typeof Time> | null>();
const minuteRef = ref<InstanceType<typeof Time> | null>();
const secondRef = ref<InstanceType<typeof Time> | null>();

const width = computed(() => {
	return [datePickerInputRef1.value?.width, datePickerInputRef2.value?.width];
});

const datePickerClick = async () => {
	if (props.disabled) return;
	datePickerContainerShow.value = true;
	datePickerInputRef1.value.focus();
	await nextTick();
	hourRef.value?.init();
	minuteRef.value?.init();
	secondRef.value?.init();
};

const conditionHideDatePickerContainerShow = () => {
	// if (modeArr.value.length) return;
	// if (props.showTime) return;
	// if (!sOpen.value || !eOpen.value) return;
	// datePickerContainerShow.value = false;
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

const formatTypeArr = computed<FormatType[]>(() =>
	Array.isArray(props.format)
		? props.format
		: (Array.from({ length: 2 }, () => props.format) as FormatType[])
);
const valueFormatArr = computed<FormatType[]>(() =>
	Array.isArray(props.valueFormat)
		? props.valueFormat
		: (Array.from({ length: 2 }, () => props.valueFormat) as FormatType[])
);
const activeInput = ref();

const timeformatType = computed(() => props.showTime.format ?? 'HH:mm:ss');
const dataTemp = ref<(Dayjs | null)[]>([]);
const dataValue = computed({
	get() {
		return props.value?.map((v) => (v ? dayjs(v) : undefined)) ?? Array.from({ length: 2 });
	},
	set(value: any) {
		console.log(value);

		emit('update:value', value);
		// if (!dayjs(value)?.isSame(dayjs(dataValue.value), 'd')) {
		// 	emit('change', dayjs(value));
		// }
	},
});
const startDate = ref(props.value?.[0] ? dayjs(props.value[0]) : null);
const endDate = ref(props.value?.[1] ? dayjs(props.value[1]) : null);
const formatValue = computed({
	get() {
		return dataTemp.value.length ? dataTemp.value.map((v) => dayjs(v)) : dataValue.value;
	},
	set(value: any[]) {
		let newValue = null;
		let formatType: FormatType | FormatType[];
		if (value) {
			switch (activeMode.value) {
				case 'date':
					formatType = Array.from({ length: 2 }, () => 'YYYY-MM-DD');
					break;
				case 'month':
					formatType = Array.from({ length: 2 }, () => 'YYYY-MM');
					break;
				case 'year':
					formatType = Array.from({ length: 2 }, () => 'YYYY');
					break;
			}
			if (props.valueFormat) {
				formatType = valueFormatArr.value;
			}
			// if (props.showTime) {
			// 	if (!timeValue.value) {
			// 		tempTime.value = dayjs();
			// 		changeFormat();
			// 	}
			// 	newTime = timeValue.value
			// 		? dayjs(timeValue.value).format(timeformatType.value as string)
			// 		: null;
			// }
			newValue = value.map((v, i) => dayjs(v).format(formatType[i] as string));
			// newValue = dayjs(value).format(formatType as string);
			// if (newTime) {
			// 	if (activeMode.value === 'week' || activeMode.value === 'quarter') {
			// 		const data = dayjs(timeValue.value);
			// 		newValue = dayjs(newValue)
			// 			.hour(data.hour())
			// 			.minute(data.minute())
			// 			.second(data.second());
			// 	} else {
			// 		newValue = newValue + ' ' + newTime;
			// 	}
			// }
		}
		console.log(newValue);

		if (!props.showTime) {
			emit('update:value', newValue);
			// if (!formatValue.value?.isSame(dayjs(dataValue.value), 'd')) {
			// 	emit('change', formatValue.value);
			// }
			return;
		}
		// dataTemp.value[activeInput.value] = newValue;
		// console.log(dataTemp.value);

		// const temp = [...dataTemp.value];

		// temp[activeInput.value] = newValue;
		// dataTemp.value = temp;
	},
});
const formatShow = computed(() => {
	let value = null;
	const formatType = props.format
		? formatTypeArr.value
		: Array.from({ length: 2 }, () => format(activeMode.value));
	value = formatValue.value?.map((v, i) => (v ? v?.format(formatType[i] as string) : null));
	if (props.showTime) {
		let time = dayjs(formatValue.value).format(timeformatType.value as string);
		value = value + ' ' + time;
	}
	console.log(value);

	return value;
});
const formatShow2 = computed(() => {
	let value: any = props.showTime
		? formatValue.value
		: props.value?.map((v) => (v ? dayjs(v) : null)) ?? Array.from({ length: 2 });
	const formatType = props.format
		? formatTypeArr.value
		: Array.from({ length: 2 }, () => format(props.mode));
	value =
		props.mode === 'quarter'
			? value.map((v, i) => v?.format(formatType[i] as string)?.replace(/-(?!.*-)/, '-Q'))
			: value.map((v, i) => v?.format(formatType[i] as string));
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

const month = ref(formatValue.value[activeInput.value]?.month() ?? dayjs().month());
const year = ref(formatValue.value[activeInput.value]?.year() ?? dayjs().year());
watchEffect(() => {
	if (props.value) {
		month.value = formatValue.value[activeInput.value]?.month();
		year.value = formatValue.value[activeInput.value]?.year();
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
	tempTime.value = null;
	if (props.showTime) {
		let data = null;
		let formatType: FormatType | FormatType[];
		if (formatValue.value) {
			formatType = format(activeMode.value);
			if (props.format) {
				formatType = formatTypeArr.value;
			}
			data = formatValue.value.format(formatType as string);
		}
		let time = dayjs().format(timeformatType.value as string);
		dataValue.value = data + ' ' + time;
	}
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
	let str: string[];
	str = Array.isArray(props.placeholder)
		? props.placeholder
		: Array.from({ length: 2 }, () => props.placeholder as string);
	if (!str[0] || !str[1])
		switch (props.mode) {
			case 'date':
				str[0] = str[0] ?? '请选择日期';
				str[1] = str[1] ?? '请选择日期';
				break;
			case 'week':
				str[0] = str[0] ?? '请选择周';
				str[1] = str[1] ?? '请选择周';
				break;
			case 'month':
				str[0] = str[0] ?? '请选择月份';
				str[1] = str[1] ?? '请选择月份';
				break;
			case 'quarter':
				str[0] = str[0] ?? '请选择季度';
				str[1] = str[1] ?? '请选择季度';
				break;
			case 'year':
			case 'dacade':
				str[0] = str[0] ?? '请选择年份';
				str[1] = str[1] ?? '请选择年份';
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
	dataValue.value = dataTemp.value[activeInput.value];
	props.onOk();
	datePickerContainerShow.value = false;
};

const changeFormat = () => {
	if (!datePickerContainerShow.value) return;
	if (!props.value) {
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
	const formatType = props.format
		? formatTypeArr.value
		: Array.from({ length: 2 }, () => format(props.mode));
	if (activeMode.value === 'week') value = dayjs(value).year(value.year()).week(value.week());
	else if (activeMode.value === 'month')
		value = dayjs(value).year(value.year()).month(value.month()).date(info.value.date);
	else if (activeMode.value === 'quarter')
		value = dayjs(value).year(info.value.year).quarter(value.quarter());
	else if (activeMode.value === 'year' || activeMode.value === 'dacade')
		value = dayjs(value).year(value.year()).month(info.value.month).date(info.value.date);
	const newValue = value.format(formatType[activeInput.value] as string);
	let temp = props.mode === 'quarter' ? newValue.replace(/-(?!.*-)/, '-Q') : newValue;
	if (props.showTime) {
		temp = temp + ' ' + (timeValue.value ?? dayjs())?.format(timeformatType.value as string);
	}
	inputValue.value[activeInput.value] = temp;
};
const isOutSide = ref(true);
const mouseleave = () => {
	isOutSide.value = true;
	if (!datePickerContainerShow.value) return;
	inputValue.value = formatShow2.value;
};
const dateClick = () => {
	setShow();
};
const outSideClick = (visible: boolean) => {
	if (!visible) return;
	tempTime.value = null;
	dataTemp.value = [];
};

const sOpen = ref(false);
const eOpen = ref(false);
const startClick = async () => {
	if (props.disabled) return;
	datePickerContainerShow.value = true;
	datePickerInputRef1.value.focus();
	activeInput.value = 0;
	sOpen.value = true;
	await nextTick();
	// timeScrollInit();
};
const endClick = async () => {
	if (props.disabled) return;
	datePickerContainerShow.value = true;
	datePickerInputRef2.value.focus();
	activeInput.value = 1;
	eOpen.value = true;
	await nextTick();
	// timeScrollInit();
};
const setShow = async () => {
	if (sOpen.value && eOpen.value) {
		datePickerContainerShow.value = false;
		sOpen.value = false;
		eOpen.value = false;
		// tempValue.value = [];
		formatValue.value = [startDate.value, endDate.value];
		activeInput.value = 0;
		return;
	}
	if (!sOpen.value) {
		activeInput.value = 0;
		sOpen.value = true;
	} else if (!eOpen.value) {
		activeInput.value = 1;
		eOpen.value = true;
	}
	await nextTick();
};
defineExpose({
	datePickerClick,
	conditionHideDatePickerContainerShow,
});
</script>

<template>
	<div
		:class="[
			'dd-date-picker dd-date-range-picker',
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
			ref="datePickerInputRef1"
			:format-show="isOutSide ? formatShow2[0] : inputValue[0]"
			:format-value="formatShow[0]"
			:disabled
			:placeholder="showPlaceholder[0]"
			:suffix="false"
			:showIcon="false"
			:allow-clear="false"
			:readonly
			@click.stop="startClick"
		/>
		<div class="dd-picker-range-separator">
			<span aria-label="to" class="dd-picker-separator">
				<svg
					viewBox="0 0 1024 1024"
					focusable="false"
					data-icon="swap-right"
					width="1em"
					height="1em"
					fill="currentColor"
					aria-hidden="true"
				>
					<path
						d="M873.1 596.2l-164-208A32 32 0 00684 376h-64.8c-6.7 0-10.4 7.7-6.3 13l144.3 183H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h695.9c26.8 0 41.7-30.8 25.2-51.8z"
					/>
				</svg>
			</span>
		</div>
		<DataInput
			ref="datePickerInputRef2"
			:format-show="isOutSide ? formatShow2[1] : inputValue[1]"
			:format-value="formatShow[1]"
			:disabled
			:placeholder="showPlaceholder[1]"
			:allow-clear="false"
			:show-icon="false"
			:readonly
			@click.stop="endClick"
		/>
		<span class="dd-picker-suffix">
			<slot name="suffixIcon">
				<span role="img" aria-label="calendar" class="anticon anticon-calendar">
					<svg
						focusable="false"
						data-icon="calendar"
						width="1em"
						height="1em"
						fill="currentColor"
						aria-hidden="true"
						viewBox="64 64 896 896"
					>
						<path
							d="M880 184H712v-64c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v64H384v-64c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v64H144c-17.7 0-32 14.3-32 32v664c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V216c0-17.7-14.3-32-32-32zm-40 656H184V460h656v380zM184 392V256h128v48c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-48h256v48c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-48h128v136H184z"
						/>
					</svg>
				</span>
			</slot>
		</span>
		<span
			class="dd-picker-clear"
			style="right: 11px"
			role="button"
			@click.stop="clearClick"
			v-if="allowClear && formatValue[0] && formatValue[1] && !disabled"
		>
			<svg
				focusable="false"
				data-icon="close-circle"
				width="1em"
				height="1em"
				fill="currentColor"
				aria-hidden="true"
				viewBox="64 64 896 896"
			>
				<path
					d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 01-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z"
				/>
			</svg>
		</span>
		<div
			class="dd-picker-active-bar"
			:style="{
				width: width[activeInput] + 'px',
				left:
					(activeInput === 0 ? activeInput * width[0] : activeInput * width[0] + 32) +
					'px',
			}"
		/>
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
							'dd-picker-date-panels',
							{
								'dd-picker-week-panel': activeMode === 'week',
								'dd-picker-month-panel': activeMode === 'month',
								'dd-picker-quarter-panel': activeMode === 'quarter',
								'dd-picker-year-panel': activeMode === 'year',
								'dd-picker-dacade-panel': activeMode === 'dacade',
							},
						]"
					>
						<div class="dd-picker-headers">
							<DateHeader
								:active-mode="activeMode"
								:year
								:month
								@active-mode-change="activeModeChange"
								@year-change="yearChange"
								@month-change="monthChange"
								:hidden-next="true"
							/>
							<DateHeader
								:active-mode
								:year="dayjs({ year, month }).add(1, 'M').year()"
								:month="dayjs({ year, month }).add(1, 'M').month()"
								@active-mode-change="activeModeChange"
								@year-change="yearChange"
								@month-change="monthChange"
								:hiddenPrev="true"
							/>
						</div>
						<div class="dd-range-picker-body">
							<div class="dd-picker-body">
								<Component
									:is="dateMode"
									v-model:value="startDate"
									:disabledDate
									multiple
									:month
									:year
									:mode-arr
									@month-change="monthChange"
									@set-month="setMonth"
									@set-year="setYear"
									@year-change="yearChange"
									@mouseenter="mouseenter"
									@mouseleave="mouseleave"
									@click="dateClick"
									:condition-hide-date-picker-container-show
								/>
							</div>
							<div class="dd-picker-body">
								<Component
									:is="dateMode"
									v-model:value="endDate"
									:disabledDate
									multiple
									:month="month + 1"
									:year
									:mode-arr
									@month-change="monthChange"
									@set-month="setMonth"
									@set-year="setYear"
									@year-change="yearChange"
									@mouseenter="mouseenter"
									@mouseleave="mouseleave"
									@click="dateClick"
									:condition-hide-date-picker-container-show
								/>
							</div>
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
			</Popover>
		</Teleport>
	</div>
</template>

<style scoped>
@import './style/date-picker.scss';
</style>
