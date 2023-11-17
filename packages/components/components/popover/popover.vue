<script setup lang="ts">
import { watch, ref, nextTick, computed } from 'vue';
import { vOnClickOutside } from '@vueuse/components';
import {
	useResizeObserver,
	useWindowSize,
	useEventListener,
	useThrottleFn,
	useElementSize,
	useElementBounding,
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
	}>(),
	{
		arrow: true,
		autoWidth: true,
	}
);
const emit = defineEmits(['update:visible']);

const insetStyle = ref('');
const popoverRef = ref<HTMLElement | null>(null);

const threshold = ref(30);
const popoverPlacement = ref('topLeft');
const { width: windoWidth, height: windoHeight } = useWindowSize();

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

const setInset = async () => {
	if (!props.instance || !props.visible) return;
	const { top, left, width, height } = getOffset(props.instance);
	instanceWidth.value = width;
	let insetTop = top + height + arrowGap.value;
	let insetLeft = left;
	insetStyle.value = `${insetTop}px auto auto ${insetLeft}px`;
	popoverPlacement.value = 'topLeft';
	let offsetTop = (props.instance.getBoundingClientRect() as DOMRect).top;
	let offsetLeft = (props.instance.getBoundingClientRect() as DOMRect).left;
	await nextTick();
	let nodeHeight = (popoverRef.value.getBoundingClientRect() as DOMRect).height;
	let nodeWidth = (popoverRef.value.getBoundingClientRect() as DOMRect).width;

	let insetBottom = 0;
	if (offsetTop + height + nodeHeight + threshold.value > windoHeight.value) {
		insetBottom = windoHeight.value - top + arrowGap.value;
		popoverPlacement.value = 'bottomLeft';
		insetStyle.value = `auto auto ${insetBottom}px ${insetLeft}px`;
	}
	let insetRight = 0;
	if (offsetLeft + width + nodeWidth + threshold.value > windoWidth.value) {
		insetRight = windoWidth.value - left - width;
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
const aaaa = useElementBounding(props.instance);

watch([() => instanceAttribute.width.value, () => instanceAttribute.height.value], () => {
	setInset();
});
watch([() => aaaa.x], () => {
	console.log(aaaa.x.value);
	setInset();
});
watch(
	() => props.visible,
	() => {
		if (props.visible) {
			created.value = true;
			instanceWidth.value = props.instance.getBoundingClientRect().width;
		}
		setInset();
	}
);
const created = ref(false);
</script>

<template>
	<div v-if="created">
		<transition name="fade">
			<div
				class="dd-popover"
				:style="{ inset: insetStyle }"
				ref="popoverRef"
				v-show="visible"
				v-on-click-outside="[() => emit('update:visible', false), { ignore: [instance] }]"
			>
				<div :class="['dd-popover-arrow', popoverPlacement]" v-if="arrow" />
				<div
					class="dd-popover-content"
					:style="{ width: !autoWidth ? instanceWidth + 'px' : '' }"
				>
					<div class="dd-popover-inner">
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
