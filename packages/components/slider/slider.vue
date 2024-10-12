<script setup lang="ts">
import { createName } from '../../utils/index';
import { sliderProps } from './types';

import { ref, computed } from 'vue';

defineOptions({
	name: createName('slider'),
});

const props = defineProps(sliderProps);
const emit = defineEmits<{
	'update:value': [value: number];
	change: [index: number];
	next: [index: number];
	prev: [index: number];
	'dot-click': [index: number];
}>();

const sliderRef = ref<HTMLElement | null>();
const sliderPointRef = ref<HTMLElement | null>();
const sliderBarRef = ref<HTMLElement | null>();

const x = ref(0);
const barWidth = computed(() => sliderPointRef.value?.offsetWidth);
const positionValue = ref(Math.round((props.value / barWidth.value) * 100));
// const positionValue = computed(() => Math.round((props.value / barWidth.value) * 100))
const ModelValue = computed(() => Math.round((positionValue.value / barWidth.value) * 100));
const stepProportion = computed(() => barWidth.value * (props.step / 100));
const isDragging = ref(false);
console.log(barWidth.value);

const mousedown = (e: MouseEvent) => {
	x.value = e.clientX;
	document.addEventListener('mousemove', drag);
	document.addEventListener('mouseup', stopDrag);
};
const drag = (e: MouseEvent) => {
	isDragging.value = true;
	let flag = e.clientX < x.value ? 'left' : 'right';
	const { left: barOffsetLeft, width: barWidth } = sliderPointRef.value!.getBoundingClientRect();
	const isbarRefClientInner = e.clientX >= barOffsetLeft && e.clientX - barOffsetLeft <= barWidth;
	console.log(isbarRefClientInner);

	const isDragAndValidPosition =
		isDragging.value &&
		(isbarRefClientInner ||
			(flag === 'left' && ModelValue.value > 0) ||
			(flag === 'right' && ModelValue.value < 100));
	if (isDragAndValidPosition) {
		const moveX = e.clientX - x.value;
		const currentPosition = sliderPointRef.value!.offsetLeft;
		const newPosition = currentPosition + moveX;
		if (Math.abs(newPosition - currentPosition) >= barWidth * (props.step / 100)) {
			const pval = Math.min(Math.max(newPosition, 0), barWidth);
			positionValue.value = findNearestDivisible(pval, stepProportion.value);
			sliderPointRef.value!.style.left = positionValue.value + 'px';
			sliderBarRef.value!.style.width = positionValue.value + 'px';
			x.value = e.clientX;
		}
	}
};
const findNearestDivisible = (number: number, divisor: number) => {
	const remainder = number % divisor;
	if (remainder === 0) {
		return number; // 当前数已经可以被取模数整除
	} else {
		const lowerBound = number - remainder; // 下界
		const upperBound = lowerBound + divisor; // 上界
		// 找到最近的一个能被取模数整除的数
		if (number - lowerBound <= upperBound - number) {
			return lowerBound;
		} else {
			return upperBound;
		}
	}
};
const stopDrag = () => {
	isDragging.value = false;
	document.removeEventListener('mousemove', drag);
	document.removeEventListener('mouseup', stopDrag);
};
</script>

<template>
	<div class="dd-slider dd-slider-horizontal" ref="sliderRef">
		<div class="dd-slider-rail" />
		<div class="dd-slider-track" ref="sliderBarRef" :style="{ left: '0%' }"></div>
		<div class="dd-slider-handle" ref="sliderPointRef" @mousedown.stop.prevent="mousedown"></div>
	</div>
</template>

<style scoped>
@import './style/slider.scss';
</style>
