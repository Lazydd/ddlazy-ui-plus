<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue';
const props = withDefaults(
	defineProps<{
		content: string;
		maxWidth?: number | string;
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
const getWindow = () => {
	// 返回窗口宽高
	let width = document.documentElement.clientWidth || document.body.clientWidth;
	let height = document.documentElement.clientHeight || document.body.clientHeight;
	return { width, height };
};
const getOffset = (node: HTMLElement) => {
	let detail = node.getBoundingClientRect();
	let top =
		detail.top +
		(window.pageYOffset || document.documentElement.scrollTop) -
		(document.documentElement.clientTop || 0);
	let left =
		detail.left +
		(window.pageXOffset || document.documentElement.scrollLeft) -
		(document.documentElement.clientLeft || 0);
	let width = node.offsetWidth;
	let height = node.offsetHeight;
	return {
		top,
		left,
		width,
		height,
	};
};
const initNode = () => {
	let nodeElement = document.createElement('div');
	let windowWidth = getWindow().width;
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
	<div class="tooltip_main" @mouseenter="mouseenter" @mouseleave="mouseleave">
		<slot v-if="$slots.default" />
	</div>
</template>

<style lang="scss" scoped>
@keyframes tooltip {
	0% {
		opacity: 0;
	}
	100% {
		opacity: 1;
	}
}
.tooltip_main {
	position: relative;
	display: inline-flex;
}
.tooltip_box {
	position: absolute;
	z-index: 100;
	background: var(--vp-c-text-1);
	color: var(--vp-c-text-inverse-1);
	font-size: 12px;
	padding: 8px 12px;
	line-height: 20px;
	border-radius: 5px;
	animation: tooltip 1s;
	box-sizing: border-box;
	&:before {
		content: '';
		display: inline-block;
		border: 5px solid transparent;
		position: absolute;
	}
	&.top-left {
		&:before {
			left: 15px;
			bottom: -10px;
			border-top-color: var(--vp-c-text-1);
		}
	}
	&.top {
		&:before {
			left: 50%;
			bottom: -10px;
			margin-left: -5px;
			border-top-color: var(--vp-c-text-1);
		}
	}
	&.top-right {
		&:before {
			right: 15px;
			bottom: -10px;
			border-top-color: var(--vp-c-text-1);
		}
	}
	&.left {
		&:before {
			right: -10px;
			top: 50%;
			border-left-color: var(--vp-c-text-1);
			margin-top: -5px;
		}
	}
	&.right {
		&:before {
			left: -10px;
			top: 50%;
			border-right-color: var(--vp-c-text-1);
			margin-top: -5px;
		}
	}
	&.bottom-left {
		&:before {
			left: 15px;
			top: -10px;
			border-bottom-color: var(--vp-c-text-1);
		}
	}
	&.bottom {
		&:before {
			left: 50%;
			top: -10px;
			border-bottom-color: var(--vp-c-text-1);
			margin-left: -5px;
		}
	}
	&.bottom-right {
		&:before {
			right: 15px;
			top: -10px;
			border-bottom-color: var(--vp-c-text-1);
		}
	}
}
</style>
