<template>
	<transition-group name="demoblock-fade-transition" tag="div" class="demoblock-messages">
		<template v-for="item in messages" :key="item.name">
			<div class="demoblock-message-wrap">
				<div
					:class="[
						'demoblock-message',
						{ [`demoblock-message--${item.type}`]: item.type },
					]"
				>
					<component :is="components[item.type]" class="demoblock-message-icon" />
					<div class="demoblock-message-content">{{ item.content }}</div>
				</div>
			</div>
		</template>
	</transition-group>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { createName } from '../../utils/index';
import FluentCheckmarkCircle16Filled from './icons/FluentCheckmarkCircle16Filled.vue';
import FluentDismissCircle16Filled from './icons/FluentDismissCircle16Filled.vue';
import FluentErrorCircle16Filled from './icons/FluentErrorCircle16Filled.vue';
export type messageType = {
	name: string;
	show: boolean;
	content: any;
	type: string;
};
defineOptions({
	name: createName('message'),
});
let seed = 0;
function getUuid() {
	return 'message_' + seed++;
}

const components = {
	info: FluentErrorCircle16Filled,
	success: FluentCheckmarkCircle16Filled,
	warning: FluentDismissCircle16Filled,
	error: FluentErrorCircle16Filled,
};

const messages = ref<messageType[]>([]);
function add(props: any) {
	const name = getUuid();
	const _message = { name, show: true, ...props };
	messages.value.push(_message);
	const duration = props.duration;
	setTimeout(() => {
		remove(name);
	}, duration * 1000);
}
function remove(name: string) {
	for (const [i, v] of messages.value.entries()) {
		if (v.name === name) {
			messages.value.splice(i, 1);
			break;
		}
	}
}
function hidden(name: string) {
	const message = messages.value.find((x) => x.name === name);
	if (message) message.show = false;
}

defineExpose({
	add,
	remove,
	hidden,
});
</script>

<style scoped>
@import './style/message.scss';
</style>
