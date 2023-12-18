<script setup lang="ts">
import { watch, ref, nextTick, computed, watchEffect } from 'vue';
import { vOnClickOutside } from '@vueuse/components';
import {
	useResizeObserver,
	useWindowSize,
	useEventListener,
	useThrottleFn,
	useElementSize,
} from '@vueuse/core';
import { getOffset } from '@ddlazy/utils';

defineOptions({
	name: 'popover',
});

const props = withDefaults(
	defineProps<{
		visible: boolean;
		instance?: HTMLElement | null;
		arrow?: boolean;
		autoWidth?: boolean;
		padding?: number;
	}>(),
	{
		arrow: true,
		autoWidth: true,
		padding: 12,
	}
);
const emit = defineEmits<{
	'update:visible': [value: boolean];
	outSideClick: [value: boolean];
}>();

const insetStyle = ref('');
const popoverRef = ref<HTMLElement | null>(null);

const threshold = ref(30);
const popoverPlacement = ref('topLeft');
const { width: winWidth, height: winHeight } = useWindowSize();

const arrowGap = computed(() => (props.arrow ? 13 : 6));
const instanceWidth = ref(props.instance.getBoundingClientRect().width);

useResizeObserver(document.body, () => {
	setInset();
});
useEventListener(
	document,
	'scroll',
	useThrottleFn(() => {
		setInset();
	}, 150)
);

const instanceAttributes = computed(() => {
	const instance = props.instance.getBoundingClientRect();
	return {
		offsetTop: instance.top,
		offsetLeft: instance.left,
	};
});
const nodeAttributes = computed(() => {
	const instance = popoverRef.value.getBoundingClientRect();
	return {
		nodeHeight: instance.height,
		nodeWidth: instance.width,
	};
});

const setInset = async () => {
	if (!props.instance || !props.visible) return;
	const { top, left, width, height } = getOffset(props.instance);
	instanceWidth.value = width;
	let insetTop = top + height + arrowGap.value;
	let insetLeft = left;
	insetStyle.value = `${insetTop}px auto auto ${insetLeft}px`;
	popoverPlacement.value = 'topLeft';
	await nextTick();
	let insetBottom = 0;
	if (
		instanceAttributes.value.offsetTop +
			height +
			nodeAttributes.value.nodeHeight +
			threshold.value >
		winHeight.value
	) {
		insetBottom = winHeight.value - top + arrowGap.value;
		popoverPlacement.value = 'bottomLeft';
		insetStyle.value = `auto auto ${insetBottom}px ${insetLeft}px`;
	}
	let insetRight = 0;
	if (
		instanceAttributes.value.offsetLeft +
			width +
			nodeAttributes.value.nodeWidth +
			threshold.value >
		winWidth.value
	) {
		insetRight = winWidth.value - left - width;
		if (popoverPlacement.value.includes('bottom')) {
			insetStyle.value = `auto ${insetRight}px ${insetBottom}px auto`;
			popoverPlacement.value = 'bottomRight';
		} else {
			insetStyle.value = `${insetTop}px ${insetRight}px auto auto`;
			popoverPlacement.value = 'topRight';
		}
	}
};
const instanceAttribute = useElementSize(props.instance);

watch([() => instanceAttribute.width.value, () => instanceAttribute.height.value], () => {
	setInset();
});
const created = ref(false);

watchEffect(() => {
	if (props.visible) {
		created.value = true;
	}
	setInset();
});

const outSideClick = () => {
	emit('update:visible', false);
	emit('outSideClick', props.visible);
};
</script>

<template>
	<div v-if="created">
		<transition name="fade">
			<div
				class="dd-popover"
				:style="{ inset: insetStyle }"
				ref="popoverRef"
				v-show="visible"
				v-on-click-outside="[outSideClick, { ignore: [instance] }]"
			>
				<div :class="['dd-popover-arrow', popoverPlacement]" v-if="arrow" />
				<div
					class="dd-popover-content"
					:style="{ width: !autoWidth ? instanceWidth + 'px' : '' }"
				>
					<div class="dd-popover-inner" :style="{ padding: padding + 'px' }">
						<div class="dd-popover-inner-content">
							<slot />
						</div>
					</div>
				</div>
			</div>
		</transition>
	</div>
</template>

<style scoped>
@import './popover.less';
</style>
