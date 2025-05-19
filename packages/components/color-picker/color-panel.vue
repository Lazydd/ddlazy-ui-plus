<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch, useTemplateRef } from 'vue';
import { hsvToRgb, rgbToHsv } from './utils';

const props = defineProps<{
	modelValue: string;
	alpha: number;
	disabledAlpha: boolean;
}>();

const emit = defineEmits<{
	(e: 'update:modelValue', value: string): void;
	(e: 'change', value: string): void;
}>();

const hue = ref(0);
const alpha = defineModel<number>('alpha');
const saturation = ref(100);
const value = ref(100);

const saturationPanelRef = useTemplateRef('saturationPanel');
const hueSliderRef = useTemplateRef('hueSlider');
const alphaSliderRef = useTemplateRef('alphaSlider');

const isDraggingSaturation = ref(false);
const isDraggingHue = ref(false);
const isDraggingAlpha = ref(false);

// 像素拾取
const startEyeDropper = async () => {
	if (!('EyeDropper' in window)) {
		alert('Your browser does not support the EyeDropper API');
		return;
	}

	try {
		// @ts-ignore - EyeDropper API types not in all TypeScript versions
		const dropper = new window.EyeDropper();
		const result = await dropper.open();
		const color = result.sRGBHex;
		initColor(color);
		emitColor();
	} catch (e) {
		console.error('EyeDropper error:', e);
	}
};

const hexToRgb = (hex: string): [number, number, number] | null => {
	const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	return result
		? [
				parseInt(result[1], 16) / 255,
				parseInt(result[2], 16) / 255,
				parseInt(result[3], 16) / 255,
		  ]
		: null;
};

const initColor = (color: string) => {
	const rgb = hexToRgb(color);
	if (rgb) {
		const [h, s, v] = rgbToHsv(...rgb);
		hue.value = h;
		saturation.value = s;
		value.value = v;
	}
};

watch(
	() => props.modelValue,
	(newColor) => {
		if (newColor !== currentColorHex.value) {
			initColor(newColor);
		}
	}
);

const currentColor = computed(() => {
	return `hsl(${hue.value}, ${saturation.value}%, ${value.value}%)`;
});

const currentColorHex = computed(() => {
	const [r, g, b] = hsvToRgb(hue.value, saturation.value, value.value);
	return rgbToHex(r, g, b);
});

const rgbToHex = (r: number, g: number, b: number): string => {
	const toHex = (n: number) =>
		Math.round(n * 255)
			.toString(16)
			.padStart(2, '0');
	return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

const updateSaturationValue = (e: MouseEvent | TouchEvent) => {
	if (!saturationPanelRef.value) {
		return;
	}

	const rect = saturationPanelRef.value.getBoundingClientRect();
	const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
	const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

	let x = ((clientX - rect.left) / rect.width) * 100;
	let y = ((clientY - rect.top) / rect.height) * 100;

	x = Math.max(0, Math.min(100, x));
	y = Math.max(0, Math.min(100, y));

	saturation.value = x;
	value.value = 100 - y;

	emitColor();
};

const updateHue = (e: MouseEvent | TouchEvent) => {
	if (!hueSliderRef.value) {
		return;
	}

	const rect = hueSliderRef.value.getBoundingClientRect();
	const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;

	let x = ((clientX - rect.left) / rect.width) * 360;
	x = Math.max(0, Math.min(360, x));

	hue.value = x;
	emitColor();
};

const updateSaturationValueAlpha = (e: MouseEvent | TouchEvent) => {
	if (!saturationPanelRef.value) {
		return;
	}

	const rect = saturationPanelRef.value.getBoundingClientRect();
	const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
	const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

	let x = ((clientX - rect.left) / rect.width) * 100;
	let y = ((clientY - rect.top) / rect.height) * 100;

	x = Math.max(0, Math.min(100, x));
	y = Math.max(0, Math.min(100, y));

	saturation.value = x;
	value.value = 100 - y;

	emitColor();
};

const updateAlpha = (e: MouseEvent | TouchEvent) => {
	if (!alphaSliderRef.value) {
		return;
	}

	const rect = alphaSliderRef.value.getBoundingClientRect();
	const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;

	let x = ((clientX - rect.left) / rect.width) * 100;
	x = Math.max(0, Math.min(100, x));

	alpha.value = Number(x.toFixed(0));
	emitColor();
};

const startDraggingSaturation = (e: MouseEvent | TouchEvent) => {
	isDraggingSaturation.value = true;
	updateSaturationValue(e);
	document.addEventListener('mousemove', handleMouseMove);
	document.addEventListener('touchmove', handleMouseMove);
	document.addEventListener('mouseup', stopDragging);
	document.addEventListener('touchend', stopDragging);
};

const startDraggingHue = (e: MouseEvent | TouchEvent) => {
	isDraggingHue.value = true;
	updateHue(e);
	document.addEventListener('mousemove', handleMouseMove);
	document.addEventListener('touchmove', handleMouseMove);
	document.addEventListener('mouseup', stopDragging);
	document.addEventListener('touchend', stopDragging);
};

const startDraggingAlpha = (e: MouseEvent | TouchEvent) => {
	isDraggingAlpha.value = true;
	updateAlpha(e);
	document.addEventListener('mousemove', handleMouseMoveAlpha);
	document.addEventListener('touchmove', handleMouseMoveAlpha);
	document.addEventListener('mouseup', stopDraggingAlpha);
	document.addEventListener('touchend', stopDraggingAlpha);
};

const handleMouseMove = (e: MouseEvent | TouchEvent) => {
	if (isDraggingSaturation.value) {
		updateSaturationValue(e);
	} else if (isDraggingHue.value) {
		updateHue(e);
	}
};

const handleMouseMoveAlpha = (e: MouseEvent | TouchEvent) => {
	if (isDraggingSaturation.value) {
		updateSaturationValueAlpha(e);
	} else if (isDraggingAlpha.value) {
		updateAlpha(e);
	}
};

const stopDragging = () => {
	isDraggingSaturation.value = false;
	isDraggingHue.value = false;
	document.removeEventListener('mousemove', handleMouseMove);
	document.removeEventListener('touchmove', handleMouseMove);
	document.removeEventListener('mouseup', stopDragging);
	document.removeEventListener('touchend', stopDragging);
};

const stopDraggingAlpha = () => {
	isDraggingSaturation.value = false;
	isDraggingAlpha.value = false;
	document.removeEventListener('mousemove', handleMouseMoveAlpha);
	document.removeEventListener('touchmove', handleMouseMoveAlpha);
	document.removeEventListener('mouseup', stopDraggingAlpha);
	document.removeEventListener('touchend', stopDraggingAlpha);
};

const emitColor = () => {
	emit('update:modelValue', currentColorHex.value);
	emit('change', currentColorHex.value);
};

onMounted(() => {
	if (props.modelValue) {
		initColor(props.modelValue);
	}
});

onUnmounted(() => {
	stopDragging();
});
</script>

<template>
	<div class="color-panel">
		<!-- <button class="abc" @click="startEyeDropper" title="Color Picker">
			<Icon icon="Pipette" class="w-4 h-4" />
		</button> -->
		<div
			ref="saturationPanel"
			class="dd-color-picker-panel"
			role="slider"
			aria-label="Color saturation and brightness"
			:style="{
				backgroundColor: `hsl(${hue}, 100%, 50%)`,
				backgroundImage:
					'linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, transparent)',
			}"
			@mousedown="startDraggingSaturation"
			@touchstart="startDraggingSaturation"
		>
			<div
				class="dd-color-picker-handler"
				:style="{
					left: `${saturation}%`,
					top: `${100 - value}%`,
				}"
			></div>
		</div>

		<div class="dd-color-picker-slider-container">
			<div class="dd-color-picker-slider-group">
				<div class="dd-color-picker-slider-hue dd-color-picker-slider">
					<div
						ref="hueSlider"
						class="dd-color-picker-palette"
						role="slider"
						aria-label="Color hue"
						:style="{
							backgroundImage:
								'linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%)',
						}"
						@mousedown="startDraggingHue"
						@touchstart="startDraggingHue"
					>
						<div
							class="dd-color-picker-point"
							:style="{
								left: `${(hue / 360) * 100}%`,
							}"
						/>
					</div>
				</div>

				<div
					class="dd-color-picker-slider-alpha dd-color-picker-slider"
					v-if="!disabledAlpha"
				>
					<div
						ref="alphaSlider"
						class="dd-color-picker-palette"
						role="slider"
						aria-label="Color alpha"
						:style="{
							backgroundImage: `linear-gradient(to right, rgba(255, 0, 4, 0), ${currentColorHex})`,
						}"
						@mousedown="startDraggingAlpha"
						@touchstart="startDraggingAlpha"
					>
						<div
							class="dd-color-picker-point"
							:style="{
								left: `${alpha}%`,
							}"
						/>
					</div>
				</div>
			</div>
			<div class="dd-color-picker-color-block">
				<div
					class="dd-color-picker-color-block-inner"
					:style="{ backgroundColor: currentColorHex, opacity: alpha / 100 }"
				/>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.color-panel {
	display: flex;
	flex-direction: column;
	gap: 12px;
	.dd-color-picker-panel {
		position: relative;
		border-radius: 4px;
		width: 100%;
		min-height: 160px;
		overflow: hidden;
		cursor: pointer;
		.dd-color-picker-handler {
			position: absolute;
			width: 16px;
			height: 16px;
			border: 2px solid var(--dd-color-picker-handler-color);
			border-radius: 50%;
			box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
			transform: translate(-50%, -50%);
		}
	}
	.dd-color-picker-slider-container {
		display: flex;
		align-items: center;
		gap: 12px;
		.dd-color-picker-slider-group {
			flex: 1;
			.dd-color-picker-slider + .dd-color-picker-slider {
				margin-top: 12px;
			}
		}
		.dd-color-picker-color-block {
			position: relative;
			border-radius: 4px;
			width: 28px;
			height: 28px;
			box-shadow: inset 0 0 1px 0 rgba(0, 0, 0, 0.25);
			background-image: conic-gradient(
				rgba(0, 0, 0, 0.06) 0 25%,
				transparent 0 50%,
				rgba(0, 0, 0, 0.06) 0 75%,
				transparent 0
			);
			background-size: 50% 50%;
			.dd-color-picker-color-block-inner {
				width: 100%;
				height: 100%;
				border: 1px solid rgba(0, 0, 0, 0.06);
				border-radius: inherit;
			}
		}
	}
	.dd-color-picker-point {
		position: absolute;
		top: 0;
		width: 12px;
		height: 12px;
		border: 2px solid var(--dd-color-picker-handler-color);
		border-radius: 50%;
		transform: translate(-6px, -2px);
		box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
	}
	.dd-color-picker-slider-hue {
		position: relative;
		border-radius: 4px;
		width: 100%;
		height: 8px;
		cursor: pointer;
	}
	.dd-color-picker-palette {
		border-radius: 4px;
		width: 100%;
		height: 8px;
	}
	.dd-color-picker-slider-alpha {
		position: relative;
		background-image: conic-gradient(
			rgba(0, 0, 0, 0.06) 0 25%,
			transparent 0 50%,
			rgba(0, 0, 0, 0.06) 0 75%,
			transparent 0
		);
		background-size: 8px 8px;
		cursor: pointer;
	}
}
</style>
