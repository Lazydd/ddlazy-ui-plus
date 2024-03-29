<script setup lang="ts">
import { createName } from '../../utils/index';
import { timeRangePickerProps, TimePickerFormatType } from './types';

import Popover from '../components/popover/popover.vue';
import TimeInput from './time-input.vue';
import Time from './time.vue';

import { ref, computed, nextTick, watchEffect, watch } from 'vue';
import dayjs, { type Dayjs } from 'dayjs';

defineOptions({
	name: createName('time-range-picker'),
});
const props = defineProps(timeRangePickerProps);
const emit = defineEmits<{
	'update:value': [time: (Dayjs | string)[]];
	'update:open': [open: boolean];
	change: [time: Dayjs[] | string[]];
	openChange: [value: boolean];
}>();
const timeRangePickerRef = ref();
const timePickerInputRef1 = ref<typeof TimeInput>();
const timePickerInputRef2 = ref<typeof TimeInput>();

const hourRef = ref<InstanceType<typeof Time> | null>();
const minuteRef = ref<InstanceType<typeof Time> | null>();
const secondRef = ref<InstanceType<typeof Time> | null>();

const tempShow = ref();
const timeRangePickerContainerShow = computed({
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
const width = computed(() => {
	return [timePickerInputRef1.value?.width, timePickerInputRef2.value?.width];
});
const formatShow = computed(() => {
	let value = undefined;
	let formatType: TimePickerFormatType | TimePickerFormatType[];
	if (tempValue.value ?? formatValue.value) {
		formatType = Array.isArray(props.format)
			? props.format
			: (Array.from({ length: 2 }, () => props.format) as TimePickerFormatType[]);
		value = formatValue.value?.map((v, i) => v?.format(formatType[i] as string));
	}
	return value ?? Array.from({ length: 2 });
});
const formatValue = computed<Dayjs[]>({
	get() {
		return (
			props.value?.map((v) => (v ? dayjs(v, props.valueFormat as string) : undefined)) ??
			Array.from({ length: 2 })
		);
	},
	set(value) {
		let newValue: (string | undefined)[] = undefined;
		let formatType: TimePickerFormatType | TimePickerFormatType[];
		if (value) {
			formatType = Array.isArray(props.valueFormat)
				? props.valueFormat
				: (Array.from({ length: 2 }, () => props.valueFormat) as TimePickerFormatType[]);
			newValue = value.map((v, i) =>
				v ? dayjs(v).format(formatType[i] as string) : undefined
			);
		}
		if (props.order) {
			const [t1, t2] = newValue;
			newValue =
				t1 &&
				t2 &&
				dayjs(t2, props.valueFormat as string).isBefore(
					dayjs(t1, props.valueFormat as string)
				)
					? newValue.reverse()
					: newValue;
		}

		emit('update:value', newValue);
	},
});
const clearClick = () => {
	formatValue.value = [];
	timeValue.value = [];
};

const activeInput = ref();
const tempValue = ref<(Dayjs | undefined)[]>();
const timeValue = computed({
	get() {
		return [
			tempValue.value[0] ?? formatValue.value[0],
			tempValue.value[1] ?? formatValue.value[1],
		];
	},
	set(value) {
		tempValue.value = value;
	},
});
const timeRangePickerClick = async () => {
	if (props.disabled) return;
	timeRangePickerContainerShow.value = true;
	timePickerInputRef1.value.focus();
	activeInput.value = 0;
	await nextTick();
	hourRef.value?.init();
	minuteRef.value?.init();
	secondRef.value?.init();
};
const {
	disabledHours = () => [],
	disabledMinutes = () => [],
	disabledSeconds = () => [],
} = computed(() => props.disabledTime(formatValue.value[activeInput.value])).value;
const outSideClick = (visible: boolean) => {
	if (!visible) return;
	tempValue.value = [];
};
const timeInfo = computed(() => ({
	hour:
		tempValue.value?.[activeInput.value]?.hour() ??
		formatValue.value?.[activeInput.value]?.hour(),
	minute:
		tempValue.value?.[activeInput.value]?.minute() ??
		formatValue.value?.[activeInput.value]?.minute(),
	second:
		tempValue.value?.[activeInput.value]?.second() ??
		formatValue.value?.[activeInput.value]?.second(),
}));
const changeFormat = () => {
	if (!timeRangePickerContainerShow.value) return;
	hourRef.value?.scrollTo(timeInfo.value.hour ?? dayjs().hour());
	minuteRef.value?.scrollTo(timeInfo.value.minute ?? dayjs().minute());
	secondRef.value?.scrollTo(timeInfo.value.second ?? dayjs().second());
};
const setNowDisabled = computed(
	() =>
		disabledHours().includes(dayjs().hour()) ||
		disabledMinutes(timeInfo.value.hour).includes(dayjs().minute()) ||
		disabledSeconds(timeInfo.value.hour, timeInfo.value.minute).includes(dayjs().second())
);
const setNow = () => {
	if (setNowDisabled.value) {
		return;
	}
	const temp = timeValue.value;
	temp[activeInput.value] = dayjs();
	formatValue.value = temp;
	setShow();
};
const sOpen = ref(false);
const eOpen = ref(false);
const ok = () => {
	const [t1, t2] = formatValue.value;
	if (
		!t1?.isSame(dayjs(tempValue.value[0], 'HH:mm:ss'), 'second') ||
		!t2?.isSame(dayjs(tempValue.value[1], 'HH:mm:ss'), 'second')
	) {
		emit('change', tempValue.value);
	}
	formatValue.value = tempValue.value;
	setShow();
};

const setShow = async () => {
	if (sOpen.value && eOpen.value) {
		timeRangePickerContainerShow.value = false;
		sOpen.value = false;
		eOpen.value = false;
		tempValue.value = [];
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
	timeScrollInit();
};

const startClick = async () => {
	if (props.disabled) return;
	timeRangePickerContainerShow.value = true;
	timePickerInputRef1.value.focus();
	activeInput.value = 0;
	sOpen.value = true;
	await nextTick();
	timeScrollInit();
};
const endClick = async () => {
	if (props.disabled) return;
	timeRangePickerContainerShow.value = true;
	timePickerInputRef2.value.focus();
	activeInput.value = 1;
	eOpen.value = true;
	await nextTick();
	timeScrollInit();
};
const timeScrollInit = () => {
	hourRef.value?.init('smooth');
	minuteRef.value?.init('smooth');
	secondRef.value?.init('smooth');
};
watchEffect(() => {
	if (!sOpen.value && !eOpen.value) {
		tempValue.value = formatValue.value;
	}
});
watch(
	() => timeRangePickerContainerShow.value,
	() => {
		emit('openChange', timeRangePickerContainerShow.value);
	}
);
</script>

<template>
	<div
		:class="[
			'dd-time-picker dd-time-range-picker',
			size,
			{
				'dd-picker-focused': timeRangePickerContainerShow,
				'dd-picker-disabled': disabled,
				'dd-picker-borderless': !bordered,
			},
		]"
		ref="timeRangePickerRef"
		@click="timeRangePickerClick"
	>
		<TimeInput
			ref="timePickerInputRef1"
			:format-show="formatShow[0]"
			:format-value="formatValue[0]"
			:disabled
			:placeholder="placeholder[0]"
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
		<TimeInput
			ref="timePickerInputRef2"
			:format-show="formatShow[1]"
			:format-value="formatValue[1]"
			:disabled
			:placeholder="placeholder[1]"
			:allow-clear="false"
			:show-icon="false"
			:readonly
			@click.stop="endClick"
		/>
		<span class="dd-picker-suffix">
			<slot name="suffixIcon">
				<svg
					focusable="false"
					data-icon="clock-circle"
					width="1em"
					height="1em"
					fill="currentColor"
					aria-hidden="true"
					viewBox="64 64 896 896"
				>
					<path
						d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"
					/>
					<path
						d="M686.7 638.6L544.1 535.5V288c0-4.4-3.6-8-8-8H488c-4.4 0-8 3.6-8 8v275.4c0 2.6 1.2 5 3.3 6.5l165.4 120.6c3.6 2.6 8.6 1.8 11.2-1.7l28.6-39c2.6-3.7 1.8-8.7-1.8-11.2z"
					/>
				</svg>
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
				v-if="timeRangePickerRef"
				v-model:visible="timeRangePickerContainerShow"
				:instance="timeRangePickerRef"
				:padding="0"
				@outSideClick="outSideClick"
				:popup-arrow-class-name="{ arrowRight: activeInput === 1 }"
			>
				<div class="dd-picker-panel">
					<div class="dd-picker-time-panel">
						<div class="dd-picker-content">
							<Time
								ref="hourRef"
								type="hour"
								:step="hourStep"
								v-model:value="timeValue"
								:disabled-time="disabledHours()"
								:active-input
								@click="changeFormat"
							/>
							<Time
								ref="minuteRef"
								type="minute"
								:step="minuteStep"
								v-model:value="timeValue"
								:disabled-time="disabledMinutes(timeInfo.hour)"
								:active-input
								@click="changeFormat"
							/>
							<Time
								ref="secondRef"
								type="second"
								:step="secondStep"
								v-model:value="timeValue"
								:disabled-time="disabledSeconds(timeInfo.hour, timeInfo.minute)"
								:active-input
								@click="changeFormat"
							/>
						</div>
					</div>
					<div class="dd-picker-footer">
						<div class="dd-picker-footer-extra" v-if="$slots.renderExtraFooter">
							<slot name="renderExtraFooter" />
						</div>
						<ul class="dd-picker-ranges">
							<li class="dd-picker-now" v-if="showNow">
								<a
									:class="[
										'dd-picker-now-btn',
										{ 'dd-picker-now-btn-disabled': setNowDisabled },
									]"
									@click="setNow"
								>
									此刻
								</a>
							</li>
							<li class="dd-picker-ok">
								<dd-button
									type="primary"
									size="small"
									@click="ok"
									:disabled="!timeValue[activeInput]"
								>
									确定
								</dd-button>
							</li>
						</ul>
					</div>
				</div>
			</Popover>
		</Teleport>
	</div>
</template>

<style scoped>
@import './style/time-picker.scss';
</style>
