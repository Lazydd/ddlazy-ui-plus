<script setup lang="ts">
import { createName } from '../../utils/index';
import { colorPickerProps } from './types';

import { ref } from 'vue';
import { useDraggable } from '@vueuse/core';

import DdSelect from '../select';
import Popover from '../components/popover/popover.vue';

defineOptions({
	name: createName('color-picker'),
});
const props = defineProps(colorPickerProps);

const colorPickerRef = ref<HTMLElement | null>();
const colorPickerPointRef = ref<HTMLElement | null>();

const paletteRef = ref<HTMLElement | null>();
const huePaletteRef = ref<HTMLElement | null>();
const alphaPaletteRef = ref<HTMLElement | null>();

const hueRef = ref<HTMLElement | null>();
const alphaRef = ref<HTMLElement | null>();

const colorPickerContainerShow = ref(false);

const { style } = useDraggable(colorPickerPointRef, {
	initialValue: { x: 0, y: 0 },
	containerElement: paletteRef,
});
const { style: style1 } = useDraggable(hueRef, {
	initialValue: { x: 0, y: -4 },
	containerElement: huePaletteRef,
});
const { style: style2 } = useDraggable(alphaRef, {
	initialValue: { x: 0, y: -4 },
	containerElement: alphaPaletteRef,
});
const selectTypeRef = ref<InstanceType<typeof DdSelect> | null>();
const type = ref(1);
const opcity = ref(1);
</script>

<template>
	<div
		:class="['dd-color-picker', size]"
		ref="colorPickerRef"
		@click="colorPickerContainerShow = !colorPickerContainerShow"
	>
		<div class="dd-color-picker-trigger">
			<div class="dd-color-picker-inner" style="background: red" />
		</div>
		<Teleport to="body">
			<Popover
				v-if="colorPickerRef"
				v-model:visible="colorPickerContainerShow"
				:instance="colorPickerRef"
			>
				<div class="dd-color-picker-inner-content">
					<div class="dd-color-picker-panel">
						<div class="dd-color-picker-select">
							<div class="dd-color-picker-palette" ref="paletteRef">
								<div
									ref="colorPickerPointRef"
									:style="style"
									style="position: absolute; z-index: 1"
								>
									<div class="dd-color-picker-handler"></div>
								</div>
								<div class="dd-color-picker-saturation"></div>
							</div>
						</div>
						<div class="dd-color-picker-slider-container">
							<div class="dd-color-picker-slider-group">
								<div class="dd-color-picker-slider dd-color-picker-slider-hue">
									<div class="dd-color-picker-palette" ref="huePaletteRef">
										<div
											ref="hueRef"
											:style="style1"
											style="position: absolute; z-index: 1"
											class="dd-color-picker-point"
										>
											<div class="dd-color-picker-handler" />
										</div>
										<div class="dd-color-picker-gradient" />
									</div>
								</div>
								<div class="dd-color-picker-slider dd-color-picker-slider-alpha">
									<div class="dd-color-picker-palette" ref="alphaPaletteRef">
										<div
											ref="alphaRef"
											:style="style2"
											style="position: absolute; z-index: 1"
											class="dd-color-picker-point"
										>
											<div class="dd-color-picker-handler" />
										</div>
										<div class="dd-color-picker-gradient" />
									</div>
								</div>
							</div>
							<div class="dd-color-picker-color-block">
								<div class="dd-color-picker-color-block-inner" />
							</div>
						</div>
					</div>
					<div class="dd-color-picker-input-container">
						<dd-select
							ref="selectTypeRef"
							v-model:value="type"
							:bordered="false"
							size="small"
							generate
							:options="[
								{ label: 'HEX', value: 1 },
								{ label: 'HSB', value: 2 },
								{ label: 'RGB', value: 3 },
							]"
						/>
						<div class="dd-color-picker-input">
							<dd-input :maxlength="6">
								<template #prefix>
									<div>#</div>
								</template>
							</dd-input>
						</div>
						<dd-input-number
							v-model:value="opcity"
							size="small"
							:max="1"
							:min="0"
							:step="0.01"
							:precision="2"
						/>
					</div>
				</div>
			</Popover>
		</Teleport>
	</div>
</template>

<style scoped>
@import './style/color-picker.scss';
</style>
