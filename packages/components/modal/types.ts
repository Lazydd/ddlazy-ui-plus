import type { ExtractPropTypes, PropType } from 'vue';
import type { ButtonProps } from '../button/types'
import type { ButtonType } from '../button/types';

export const modalProps = {
	open: {
		type: Boolean,
		default: false,
	},
	title: {
		type: String,
		default: '',
	},
	closable: {
		type: Boolean,
		default: true,
	},
	footer: {
		type: null,
	},
	destroyOnClose: {
		type: Boolean,
		default: false,
	},
	mask: {
		type: Boolean,
		default: true,
	},
	draggable: {
		type: Boolean,
		default: false,
	},
	maskClosable: {
		type: Boolean,
		default: true,
	},
	confirmLoading: {
		type: Boolean,
	},
	cancelText: {
		type: String,
		default: '取消'
	},
	okText: {
		type: String,
		default: '确定'
	},
	okType: {
		type: String as PropType<ButtonType>,
		default: 'primary'
	},
	width: {
		type: [String, Number] as PropType<string | number>,
		default: 520,
	},
	wrapClassName: {
		type: String,
		default: ''
	},
	bodyStyle: {
		type: Object,
		default: () => ({})
	},
	okButtonProps: {
		type: Object as PropType<Partial<ButtonProps>>,
	},
	cancelButtonProps: {
		type: Object as PropType<Partial<ButtonProps>>,
	},
	content: {
		type: String
	},
	containerElement: {
		type: Function as PropType<() => HTMLElement>,
		default: () => document.body
	},
	getContainer: {
		type: Function as PropType<() => HTMLElement>,
		default: () => document.body
	}
} as const;

export type ModalProps = ExtractPropTypes<typeof modalProps>;
