<script setup lang="ts">
import { createName } from '../../utils/index';
import { computed, defineEmits, defineProps, onMounted, ref, watch } from 'vue';
import { colorPickerProps } from './types';
import colorPanel from './color-panel.vue';
import Popover from '../components/popover/popover.vue';

import {
	isRgb,
	isHsl,
	isHex,
	rgbToHex,
	rgbToHsl,
	hexToRgb,
	hslToRgb,
	hexToRgba,
	rgbToRgba,
	hslToHsla,
	parseRgb,
	parseHsl,
} from './utils';

defineOptions({
	name: createName('color-picker'),
});

const props = defineProps(colorPickerProps);

const emit = defineEmits<{
	(e: 'update:value', value: string): void;
	(e: 'change', value: string): void;
}>();

const colorPickerRef = ref<HTMLElement | null>();

const colorPickerContainerShow = ref(false);

const alpha = ref(100);
const inputFormat = ref<'hex' | 'rgb' | 'hsl'>('hex');
const finalPresetColors = computed(() => props.presets);

const hexValue = computed(() => hexColor.value.replace('#', ''));

const rgbValues = computed(() => {
	const rgb = hexToRgb(hexColor.value!!);
	return rgb;
});

const hslValues = computed(() => {
	const rgb = hexToRgb(hexColor.value!!);
	return rgbToHsl(...rgb);
});

const displayColor = computed(() => {
	if (!props.value && !props.color) {
		return 'transparent';
	}
	const baseColor = props.value || props.color;

	if (isRgb(baseColor)) {
		const [r, g, b] = parseRgb(baseColor!!);
		return rgbToRgba(r, g, b, alpha.value);
	} else if (isHsl(baseColor)) {
		const [h, s, l] = parseHsl(baseColor!!);
		const [r, g, b] = hslToRgb(h, s, l);
		return rgbToRgba(r, g, b, alpha.value);
	} else if (isHex(baseColor)) {
		return hexToRgba(baseColor!!, alpha.value);
	}

	return 'transparent';
});

const hexColor = computed(() => {
	let str = '#000000';
	if (!props.value && !props.color) {
		str = '#000000';
	}
	const baseColor = props.value || props.color;

	if (isRgb(baseColor)) {
		const [r, g, b] = parseRgb(baseColor!!);
		str = rgbToHex(r, g, b);
	} else if (isHsl(baseColor)) {
		const [h, s, l] = parseHsl(baseColor!!);
		const [r, g, b] = hslToRgb(h, s, l);
		str = rgbToHex(r, g, b);
	} else if (isHex(baseColor)) {
		str = baseColor;
	}

	return str;
});

onMounted(() => {
	const initialColor = props.value || props.color;
	if (!initialColor) {
		return;
	}

	if (isRgb(initialColor)) {
		const match = initialColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
		if (match && match[4]) {
			alpha.value = Math.round(parseFloat(match[4]) * 100);
		}
	} else if (isHsl(initialColor)) {
		const match = initialColor.match(/hsla?\((\d+),\s*(\d+)%,\s*(\d+)%(?:,\s*([\d.]+))?\)/);
		if (match && match[4]) {
			alpha.value = Math.round(parseFloat(match[4]) * 100);
		}
	}
});

// Format output color based on specified format
// 根据指定格式输出颜色值
const formatOutputColor = (color: string, alphaValue: number): string => {
	let outputFormat = props.format;
	if (outputFormat === 'auto') {
		// Determine format based on input value
		// 根据输入值确定格式
		if (props.value) {
			if (isRgb(props.value)) {
				outputFormat = 'rgb';
			} else if (isHsl(props.value)) {
				outputFormat = 'hsl';
			} else {
				outputFormat = 'hex';
			}
		} else if (props.color) {
			if (isRgb(props.color)) {
				outputFormat = 'rgb';
			} else if (isHsl(props.color)) {
				outputFormat = 'hsl';
			} else {
				outputFormat = 'hex';
			}
		} else {
			outputFormat = 'hex';
		}
	}

	// Convert color to target format
	// 转换颜色到目标格式
	if (isHex(color)) {
		const [r, g, b] = hexToRgb(color);
		switch (outputFormat) {
			case 'rgb':
				return rgbToRgba(r, g, b, alphaValue);
			case 'hsl': {
				const [h, s, l] = rgbToHsl(r, g, b);
				return hslToHsla(h, s, l, alphaValue);
			}
			default:
				return color;
		}
	} else if (isRgb(color)) {
		const [r, g, b] = parseRgb(color);
		switch (outputFormat) {
			case 'hex':
				return rgbToHex(r, g, b);
			case 'hsl': {
				const [h, s, l] = rgbToHsl(r, g, b);
				return hslToHsla(h, s, l, alphaValue);
			}
			default:
				return rgbToRgba(r, g, b, alphaValue);
		}
	} else if (isHsl(color)) {
		const [h, s, l] = parseHsl(color);
		const [r, g, b] = hslToRgb(h, s, l);
		switch (outputFormat) {
			case 'hex':
				return rgbToHex(r, g, b);
			case 'rgb':
				return rgbToRgba(r, g, b, alphaValue);
			default:
				return hslToHsla(h, s, l, alphaValue);
		}
	}
	return color;
};

const selectColor = (color: string) => {
	const outputColor = formatOutputColor(color, alpha.value);
	emit('update:value', outputColor);
	emit('change', outputColor);
};

// Event handlers for different input formats
// 不同输入格式的事件处理器
const onHexInput = (input: string) => {
	if (/^#[0-9A-Fa-f]{6}$/.test(input)) {
		const outputColor = formatOutputColor(input, alpha.value);
		emit('update:value', outputColor);
		emit('change', outputColor);
	}
};

const onRgbInput = (index: number, newValue: number) => {
	if (isNaN(newValue) || newValue < 0 || newValue > 255) {
		return;
	}

	const rgb = [...rgbValues.value];
	rgb[index] = newValue;
	const hex = rgbToHex(...(rgb as [number, number, number]));
	const outputColor = formatOutputColor(hex, alpha.value);
	emit('update:value', outputColor);
	emit('change', outputColor);
};

const onHslInput = (index: number, newValue: number) => {
	const max = index === 0 ? 360 : 100;
	if (isNaN(newValue) || newValue < 0 || newValue > max) {
		return;
	}

	const hsl = [...hslValues.value];
	hsl[index] = newValue;
	const rgb = hslToRgb(...(hsl as [number, number, number]));
	const hex = rgbToHex(...rgb);
	const outputColor = formatOutputColor(hex, alpha.value);
	emit('update:value', outputColor);
	emit('change', outputColor);
};

const onColorChange = (color: string) => {
	if (clearable.value) {
		clearable.value = false;
		alpha.value = 100;
	}
	const outputColor = formatOutputColor(color, alpha.value);
	emit('update:value', outputColor);
	emit('change', outputColor);
};
const clearable = ref(false);

const clear = () => {
	alpha.value = 0;
	clearable.value = true;
	const outputColor = formatOutputColor(displayColor.value, 0);
	emit('update:value', outputColor);
	emit('change', outputColor);
	colorPickerContainerShow.value = false;
};

const colorClick = () => {
	if (props.disabled) {
		return;
	}
	colorPickerContainerShow.value = !colorPickerContainerShow.value;
};
</script>

<template>
	<div
		:class="[size, 'dd-color-picker-container']"
		:style="{ cursor: disabled ? 'not-allowed' : 'pointer' }"
		ref="colorPickerRef"
		@click="colorClick"
	>
		<div class="dd-color-picker-operation" v-if="clearable">
			<div class="dd-color-picker-clear" />
		</div>
		<template v-else>
			<slot>
				<div class="dd-color-picker">
					<div class="dd-color-picker-trigger">
						<div
							class="dd-color-picker-inner"
							:style="{ background: displayColor, opacity: Number(alpha) / 100 }"
						/>
					</div>
				</div>
			</slot>
		</template>
		<Teleport to="body">
			<Popover
				v-if="colorPickerRef"
				v-model:visible="colorPickerContainerShow"
				:instance="colorPickerRef"
			>
				<div class="dd-color-picker-inner-content">
					<div class="dd-color-picker-operation" v-if="allowClear">
						<div class="dd-color-picker-clear" @click="clear" />
					</div>
					<color-panel
						v-model:alpha="alpha"
						:model-value="value"
						:disabledAlpha
						@change="onColorChange"
					/>
					<div class="dd-color-picker-input-container">
						<dd-select
							ref="selectTypeRef"
							v-model:value="inputFormat"
							:bordered="false"
							size="small"
							generate
							autoWidth
							:popover-width="68"
							:options="[
								{ label: 'HEX', value: 'hex' },
								{ label: 'HSL', value: 'hsl' },
								{ label: 'RGB', value: 'rgb' },
							]"
						/>

						<div class="dd-color-picker-input" v-if="inputFormat === 'hex'">
							<dd-input
								:maxlength="6"
								v-model:value="hexValue"
								size="small"
								@change="onHexInput"
							>
								<template #prefix>
									<div>#</div>
								</template>
							</dd-input>
						</div>

						<template v-if="inputFormat === 'rgb'">
							<template v-for="(value, index) in rgbValues" :key="index">
								<dd-input-number
									:max="359"
									:min="0"
									:step="1"
									:value="value"
									size="small"
									@change="onRgbInput(index, $event)"
								/>
							</template>
						</template>

						<template v-if="inputFormat === 'hsl'">
							<dd-input-number
								:max="360"
								:min="0"
								:step="1"
								:value="hslValues[0]"
								size="small"
								@change="onHslInput(0, $event)"
							/>
							<dd-input-number
								:max="100"
								:min="0"
								:step="1"
								:value="hslValues[1]"
								size="small"
								@change="onHslInput(1, $event)"
							/>
							<dd-input-number
								:max="100"
								:min="0"
								:step="1"
								:value="hslValues[2]"
								size="small"
								@change="onHslInput(2, $event)"
							/>
						</template>
						<dd-input-number
							v-model:value="alpha"
							size="small"
							:max="100"
							:min="0"
							:step="1"
							:precision="2"
						/>
					</div>
				</div>
				<div class="dd-color-picker-presets-color">
					<div
						v-for="color in finalPresetColors"
						class="dd-color-picker-color-block-inner"
						:key="color"
						:style="{ backgroundColor: color }"
						@click="selectColor(color)"
					/>
				</div>
			</Popover>
		</Teleport>
	</div>
</template>

<style scoped>
@import './style/color-picker.scss';
</style>
