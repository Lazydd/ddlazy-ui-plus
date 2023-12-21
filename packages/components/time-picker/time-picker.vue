<script setup lang="ts">
import { createName } from '../../utils/index';
import { timePickerProps, TimePickerFormatType } from './types';

import { ref, computed, nextTick, watch, watchEffect } from 'vue';
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
	'update:value': [time: string | number | Date | Dayjs | undefined];
	'update:open': [open: boolean];
	change: [time: Dayjs | string];
	openChange: [boolean];
}>();

const timePickerRef = ref<HTMLElement | null>();
const timePickerInputRef = ref<typeof TimeInput>();

const hourRef = ref<InstanceType<typeof Time> | null>();
const minuteRef = ref<InstanceType<typeof Time> | null>();
const secondRef = ref<InstanceType<typeof Time> | null>();

const tempShow = ref();
const timePickerContainerShow = computed({
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
const formatValue = computed({
	get() {
		return props.value ? dayjs(props.value, props.valueFormat as string) : undefined;
	},
	set(value) {
		let newValue = undefined;
		let formatType: TimePickerFormatType;
		if (value) {
			formatType = props.valueFormat;
			newValue = dayjs(value).format(formatType as string);
		}
		emit('update:value', newValue);
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
		if (!props.value) {
			if (
				disabledHours().includes(value.hour()) ||
				disabledMinutes(timeInfo.value.hour).includes(value.minute()) ||
				disabledSeconds(timeInfo.value.hour, timeInfo.value.minute).includes(value.second())
			) {
				return;
			}
		}
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
		ref="timePickerRef"
		@click="timePickerClick"
	>
		<TimeInput
			ref="timePickerInputRef"
			:formatShow="formatShow"
			:formatValue="formatValue"
			:disabled="disabled"
			:placeholder="placeholder"
			:allowClear="allowClear"
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
								ref="hourRef"
								type="hour"
								:step="hourStep"
								v-model:value="timeValue"
								:disabled-time="disabledHours()"
								@click="changeFormat"
							/>
							<Time
								ref="minuteRef"
								type="minute"
								:step="minuteStep"
								v-model:value="timeValue"
								:disabled-time="disabledMinutes(timeInfo.hour)"
								@click="changeFormat"
							/>
							<Time
								ref="secondRef"
								type="second"
								:step="secondStep"
								v-model:value="timeValue"
								:disabled-time="disabledSeconds(timeInfo.hour, timeInfo.minute)"
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
@import './style/time-picker.less';
</style>
