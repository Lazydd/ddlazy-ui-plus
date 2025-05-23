<script setup lang="ts">
import { createName } from '../../utils/index';
import { timePickerProps, TimePickerFormatType } from './types';

import { ref, computed, nextTick, watch, useTemplateRef } from 'vue';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';

import Popover from '../components/popover/popover.vue';
import Time from './time.vue';
import TimeInput from './time-input.vue';

defineOptions({
	name: createName('time-picker'),
});
const props = defineProps(timePickerProps);
const emit = defineEmits<{
	change: [time: Dayjs | string];
	openChange: [boolean];
}>();

const timePickerRef = useTemplateRef('timePicker');
const timePickerInputRef = useTemplateRef<typeof TimeInput>('timePickerInput');

const hourRef = useTemplateRef<InstanceType<typeof Time> | null>('hour');
const minuteRef = useTemplateRef<InstanceType<typeof Time> | null>('minute');
const secondRef = useTemplateRef<InstanceType<typeof Time> | null>('second');

const timePickerContainerShow = defineModel<boolean>('open');

const formatValue = defineModel<Dayjs | undefined>('value', {
	get(value) {
		return value ? dayjs(value, props.valueFormat as string) : undefined;
	},
	set(value) {
		let newValue = undefined;
		let formatType: TimePickerFormatType;
		if (value) {
			formatType = props.valueFormat;
			newValue = dayjs(value).format(formatType as string);
		}
		return newValue;
	},
});
const formatShow = computed<string>(() => {
	let value = undefined;
	let formatType: TimePickerFormatType;
	if (tempValue.value ?? formatValue.value) {
		formatType = props.format;
		value = (tempValue.value ?? formatValue.value)?.format(formatType as string);
	}
	return value;
});

const tempValue = ref<Dayjs | undefined>();
const timeValue = computed({
	get() {
		return tempValue.value ?? formatValue.value;
	},
	set(value) {
		tempValue.value = value;
	},
});
const timePickerClick = async () => {
	if (props.disabled) return;
	timePickerContainerShow.value = true;
	timePickerInputRef.value.focus();
	await nextTick();
	hourRef.value?.init();
	minuteRef.value?.init();
	secondRef.value?.init();
};
const timeInfo = computed(() => ({
	hour: tempValue.value?.hour() ?? formatValue.value?.hour(),
	minute: tempValue.value?.minute() ?? formatValue.value?.minute(),
	second: tempValue.value?.second() ?? formatValue.value?.second(),
}));
const clearClick = () => {
	if (!props.allowClear) return;
	timePickerContainerShow.value = false;
	formatValue.value = undefined;
	tempValue.value = undefined;
};
const changeFormat = () => {
	if (!timePickerContainerShow.value) return;
	if (!props.value) {
		hourRef.value?.scrollTo(timeInfo.value.hour ?? dayjs().hour());
		minuteRef.value?.scrollTo(timeInfo.value.minute ?? dayjs().minute());
		secondRef.value?.scrollTo(timeInfo.value.second ?? dayjs().second());
	}
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
	timePickerContainerShow.value = false;
	tempValue.value = undefined;
	formatValue.value = dayjs();
};
const ok = () => {
	if (!timeValue.value) return;
	timePickerContainerShow.value = false;
	const temp = tempValue.value ?? timeValue.value;
	if (!formatValue.value?.isSame(dayjs(temp, 'HH:mm:ss'), 'second')) {
		emit('change', temp);
	}
	formatValue.value = temp;
	tempValue.value = undefined;
};
const {
	disabledHours = () => [],
	disabledMinutes = () => [],
	disabledSeconds = () => [],
} = computed(() => props.disabledTime(formatValue.value)).value;
const outSideClick = (visible: boolean) => {
	if (!visible) return;
	tempValue.value = undefined;
};
watch(
	() => timePickerContainerShow.value,
	() => {
		emit('openChange', timePickerContainerShow.value);
	}
);
</script>

<template>
	<div
		:class="[
			'dd-time-picker',
			size,
			{
				'dd-picker-focused': timePickerContainerShow,
				'dd-picker-disabled': disabled,
				'dd-picker-borderless': !bordered,
			},
		]"
		ref="timePicker"
		@click="timePickerClick"
	>
		<TimeInput
			ref="timePickerInput"
			:formatShow
			:formatValue
			:disabled
			:placeholder
			:allowClear
			:readonly
			@clearClick="clearClick"
		>
			<slot name="suffixIcon" v-if="$slots.suffixIcon" />
		</TimeInput>
		<Teleport to="body">
			<Popover
				v-if="timePickerRef"
				v-model:visible="timePickerContainerShow"
				:instance="timePickerRef"
				:arrow="false"
				:padding="0"
				@outSideClick="outSideClick"
			>
				<div class="dd-picker-panel">
					<div class="dd-picker-time-panel">
						<div class="dd-picker-content">
							<Time
								ref="hour"
								type="hour"
								:step="hourStep"
								v-model:value="timeValue"
								:disabled-time="disabledHours()"
								:hide-disabled-options
								@click="changeFormat"
							/>
							<Time
								ref="minute"
								type="minute"
								:step="minuteStep"
								v-model:value="timeValue"
								:disabled-time="disabledMinutes(timeInfo.hour)"
								:hide-disabled-options
								@click="changeFormat"
							/>
							<Time
								ref="second"
								type="second"
								:step="secondStep"
								v-model:value="timeValue"
								:disabled-time="disabledSeconds(timeInfo.hour, timeInfo.minute)"
								:hide-disabled-options
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
								<span
									:class="[
										'dd-picker-now-btn',
										{ 'dd-picker-now-btn-disabled': setNowDisabled },
									]"
									@click="setNow"
								>
									此刻
								</span>
							</li>
							<li class="dd-picker-ok">
								<dd-button
									type="primary"
									:disabled="!timeValue"
									size="small"
									@click="ok"
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
