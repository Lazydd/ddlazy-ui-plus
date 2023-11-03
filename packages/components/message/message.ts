import { createApp, h } from 'vue';
import Message from './message.vue';
import { MessageProps } from './types';
// newInstance
Message.newInstance = (props = {}) => {
	const container = document.createElement('div');

	const app = createApp({
		render() {
			return h(Message, {
				...props,
				ref: 'messageRef',
			});
		},
	});

	const instance = app.mount(container);
	const messageRef = <InstanceType<typeof Message>>instance.$refs.messageRef;
	document.body.appendChild(container.firstElementChild);

	return {
		add(messageProps: MessageProps) {
			messageRef.add(messageProps);
		},
		remove(name: string) {
			messageRef.remove(name);
		},
	};
};

// message
let messageInstance;

function getMessageInstance() {
	messageInstance = messageInstance || Message.newInstance();
	return messageInstance;
}

function message(content: any, options: any) {
	const { duration, type } = { duration: 3, type: 'info', ...options } as {
		duration: number;
		type: string;
	};
	const instance = getMessageInstance();
	instance.add({ content, duration, type });
}

['success', 'warning', 'info', 'error'].forEach((type) => {
	message[type] = (content: any, options?: any) => {
		return message(content, { ...options, type });
	};
});

export default message;
