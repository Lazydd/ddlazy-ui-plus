<script setup lang="ts">
import { createName } from '../../utils/index';
import { carouselProps } from './types';

import { ref, computed, Fragment, Comment, watch, onMounted, onUnmounted } from 'vue';
import { useCycleList } from '@vueuse/core';

defineOptions({
	name: createName('carousel'),
});

const props = defineProps(carouselProps);
const emit = defineEmits<{
	change: [index: number];
	next: [index: number];
	prev: [index: number];
	'dot-click': [index: number];
}>();

const slot = defineSlots<{
	default: any;
	prevArrow: any;
	nextArrow: any;
	customPaging: any;
}>();

const slotLength = computed(() => {
	let len = 0;
	const children = slot.default().filter((i) => i.type !== Comment);
	children.forEach((vnode, i) => {
		if (vnode.type === Fragment) {
			len += vnode.children.length;
			return;
		}
		len++;
	});
	return len;
});
const slots = computed(() => {
	let arr = [];
	const children = slot.default().filter((i) => i.type !== Comment);
	children.forEach((vnode) => {
		if (vnode.type === Fragment) {
			arr.push(...vnode.children);
		} else {
			arr.push(vnode);
		}
	});
	return arr;
});

const { state, index, next, prev, go } = useCycleList(slots.value);

const nextClick = () => {
	if (slotLength.value <= 1) return;
	next();
	emit('next', index.value);
};
const prevClick = () => {
	if (slotLength.value <= 1) return;
	prev();
	emit('prev', index.value);
};
const dotClick = (index: number) => {
	go(index);
	emit('dot-click', index);
};

watch(
	() => index.value,
	() => emit('change', index.value)
);

const time = ref(null);
const initTime = () => {
	time.value = setInterval(() => {
		if (slotLength.value <= 1) return;
		next();
	}, props.interval);
};
onMounted(() => {
	if (props.autoplay) {
		initTime();
	}
});
onUnmounted(() => {
	if (time.value) clearInterval(time.value);
});

watch(
	() => props.autoplay,
	() => {
		if (time.value) clearInterval(time.value);
		if (props.autoplay) {
			initTime();
		}
	}
);
defineExpose({
	next,
	prev,
});
</script>

<template>
	<div :class="['dd-carousel']">
		<div class="slick-slide">
			<Transition name="fade" mode="out-in">
				<component :is="state" :key="state"></component>
			</Transition>
		</div>
		<div
			class="slick-arrow slick-prev"
			v-if="$slots.prevArrow"
			style="left: 10px"
			@click="prevClick()"
		>
			<slot name="prevArrow" />
		</div>
		<div
			class="slick-arrow slick-next"
			v-if="$slots.nextArrow"
			style="right: 10px"
			@click="nextClick()"
		>
			<slot name="nextArrow" />
		</div>
		<div class="slick-dots" v-if="dots">
			<slot name="customPaging" :index="index">
				<li
					v-for="(_, i) in slots"
					:ke="i"
					:class="{ 'slick-active': i == index }"
					@click="dotClick(i)"
				>
					<button>{{ i + 1 }}</button>
				</li>
			</slot>
		</div>
	</div>
</template>

<style scoped>
@import './style/carousel.scss';
</style>
