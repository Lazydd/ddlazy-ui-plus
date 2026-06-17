<script setup lang="ts">
import { createName } from '../../utils/index';
import { modalProps, ModalProps } from './types';
import { useDraggable } from '@vueuse/core';
import { watch, ref, useTemplateRef, nextTick, onUnmounted, onMounted, computed } from 'vue';

import Close from './icon/close.vue';
import ddButton from '../button/index';
defineOptions({
	name: createName('modal'),
});
const { draggable, containerElement, maskClosable, destroyOnClose, getContainer } =
	defineProps(modalProps);

const emit = defineEmits<{
	cancel: [e?: MouseEvent];
	ok: [e: MouseEvent];
}>();

const dialogRef = useTemplateRef('dialog');
const modalHeader = useTemplateRef('modalHeader');
const tag = ref(false);

const showValue = defineModel<ModalProps['open']>('open');

const toContainer = computed(() => getContainer());
const initialPosition = ref({ x: 0, y: 0 });

const { x, y } = useDraggable(dialogRef, {
	initialValue: initialPosition.value,
	preventDefault: true,
	handle: modalHeader,
	disabled: !draggable,
	containerElement,
});

const handleBackdropClick = (e: Event) => {
	if (e.target === dialogRef.value) {
		showValue.value = false;
		emit('cancel');
	}
};
watch(showValue, (value) => {
	if (value) {
		showDialog();
	} else {
		dialogRef.value?.close();
		if (destroyOnClose) tag.value = false;
		maskClosable && dialogRef.value?.removeEventListener('click', handleBackdropClick);
	}
});

const cancel = (e?: MouseEvent) => {
	showValue.value = false;
	dialogRef.value?.close();
	if (destroyOnClose) tag.value = false;
	maskClosable && dialogRef.value?.removeEventListener('click', handleBackdropClick);
	emit('cancel', e);
};

const showDialog = () => {
	tag.value = true;
	nextTick(() => {
		dialogRef.value?.showModal();
		maskClosable && dialogRef.value?.addEventListener('click', handleBackdropClick);

		const dialogRect = dialogRef.value?.getBoundingClientRect();

		initialPosition.value.x = (window.innerWidth - dialogRect?.width) / 2;
		initialPosition.value.y = (window.innerHeight - dialogRect?.height) / 2;
	});
};

const ok = (e: MouseEvent) => {
	emit('ok', e);
};

onMounted(() => {
	if (showValue.value) {
		showDialog();
	}
});

onUnmounted(() => {
	dialogRef.value?.removeEventListener('click', handleBackdropClick);
});
</script>

<template>
	<Teleport :to="toContainer" v-if="toContainer">
		<dialog
			ref="dialog"
			v-if="tag"
			:class="['dd-modal', wrapClassName, { mask }]"
			:style="{
				width: width.toString().endsWith('px') ? width : width + 'px',
				left: x + 'px',
				top: y + 'px',
			}"
		>
			<div class="dd-modal-content">
				<div :class="['dd-modal-header', { draggable }]" ref="modalHeader">
					<slot name="header">
						<div class="dd-modal-title">{{ title }}</div>
					</slot>
					<div class="dd-modal-close" @click="cancel" v-if="closable">
						<slot name="closeIcon">
							<Close />
						</slot>
					</div>
				</div>
				<div class="dd-modal-body" :style="bodyStyle">
					<slot>
						{{ content }}
					</slot>
				</div>
				<div class="dd-modal-footer" v-if="footer !== null">
					<slot name="footer">
						<dd-button
							plain
							@click="(e: MouseEvent) => cancel(e)"
							v-bind="cancelButtonProps"
						>
							{{ cancelText }}
						</dd-button>
						<dd-button
							:type="okType"
							:loading="confirmLoading"
							@click="(e: MouseEvent) => ok(e)"
							v-bind="okButtonProps"
						>
							{{ okText }}
						</dd-button>
					</slot>
				</div>
			</div>
		</dialog>
	</Teleport>
</template>

<style>
@import './style/modal.scss';
</style>
