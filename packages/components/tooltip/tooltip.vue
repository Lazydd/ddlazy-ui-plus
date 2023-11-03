<script setup lang="ts">
import { createName } from '../../utils/index';

import { ref, getCurrentInstance } from 'vue';
import { useWindowSize } from '@vueuse/core';
import { getOffset } from '@ddlazy/utils';

defineOptions({
	name: createName('tooltip'),
});
const props = withDefaults(
	defineProps<{
		content: string;
		maxWidth?: number;
		placement?: string;
		space?: number;
	}>(),
	{
		maxWidth: 500,
		placement: 'top',
		space: 8,
	}
);
const instance = getCurrentInstance();

const isShow = ref(false);
const node = ref();

const remove = () => {
	if (isShow.value) document.body.removeChild(node.value);
};
const mouseenter = () => {
	initNode();
	isShow.value = true;
};
const mouseleave = () => {
	remove();
	isShow.value = false;
};

const initNode = () => {
	let nodeElement = document.createElement('div');
	let windowWidth = useWindowSize().width.value;
	let { top, left, width, height } = getOffset(instance?.proxy?.$el);
	nodeElement.innerHTML = props.content;
	nodeElement.className = `tooltip_box ${props.placement}`;
	nodeElement.style.maxWidth = props.maxWidth + 'px';
	node.value = nodeElement;
	document.body.appendChild(node.value);
	switch (props.placement) {
		case 'top-left':
			nodeElement.style.left = left + 'px';
			nodeElement.style.top = top - node.value.offsetHeight - props.space + 'px';
			break;
		case 'top':
			nodeElement.style.transform = 'translateX(-50%)';
			nodeElement.style.left = left + width / 2 + 'px';
			nodeElement.style.top = top - node.value.offsetHeight - props.space + 'px';
			break;
		case 'top-right':
			nodeElement.style.left = left + width - nodeElement.offsetWidth + 'px';
			nodeElement.style.top = top - node.value.offsetHeight - props.space + 'px';
			break;
		case 'left':
			nodeElement.style.transform = 'translateY(-50%)';
			nodeElement.style.right = windowWidth - left + props.space + 5 + 'px';
			nodeElement.style.top = top + height / 2 + 'px';
			break;
		case 'right':
			nodeElement.style.transform = 'translateY(-50%)';
			nodeElement.style.left = width + left + props.space + 5 + 'px';
			nodeElement.style.top = top + height / 2 + 'px';
			break;
		case 'bottom-left':
			nodeElement.style.left = left + 'px';
			nodeElement.style.top = top + height + props.space + 5 + 'px';
			break;
		case 'bottom':
			nodeElement.style.transform = 'translateX(-50%)';
			nodeElement.style.left = left + width / 2 + 'px';
			nodeElement.style.top = top + height + props.space + 5 + 'px';
			break;
		case 'bottom-right':
			nodeElement.style.left = left + width - nodeElement.offsetWidth + 'px';
			nodeElement.style.top = top + height + props.space + 5 + 'px';
			break;
	}
};
</script>

<template>
	<div class="dd-tooltip" @mouseenter="mouseenter" @mouseleave="mouseleave">
		<slot v-if="$slots.default" />
	</div>
</template>

<style>
@import './style/tooltip.less';
</style>
