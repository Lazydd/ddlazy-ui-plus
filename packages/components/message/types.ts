import type { ExtractPropTypes, PropType } from 'vue';

export type MessageType = 'success' | 'info' | 'warning' | 'danger';

export const messageProps = {
	type: {
		type: String as PropType<MessageType>,
		default: '',
	},
	name: {
		type: String,
	},
	show: {
		type: Boolean,
	},
	content: {
		type: String,
	},
} as const;

export type MessageProps = ExtractPropTypes<typeof messageProps>;
