import { createApp, h, ref } from 'vue';
import modal from './modal.vue';
import { ModalProps } from './types';

type ModalConfig = {
    onOk?: () => void;
    onCancel?: () => void;
    content?: string;
} & Partial<Omit<ModalProps, 'content'>>;

const createModal = (config: ModalConfig) => {
    const container = document.createElement('div');

    const app = createApp({
        setup() {
            const open = ref(true);

            const handleOk = (e: MouseEvent) => {
                config.onOk?.();
                config.destroyOnClose && destroy();
            };

            const handleCancel = (e?: MouseEvent) => {
                config.onCancel?.();
                config.destroyOnClose && destroy();
            };

            const destroy = () => {
                open.value = false;
                setTimeout(() => {
                    app.unmount();
                }, 300);
            };

            return () => h(modal, {
                ...config,
                open: open.value,
                onOk: handleOk,
                onCancel: handleCancel,
            });
        },
    });

    app.mount(container);

    return {
        destroy: () => {
            app.unmount();
        },
    };
};

const Modal = {
    info: (config: ModalConfig) => createModal({ ...config, title: config.title || '信息' }),
    success: (config: ModalConfig) => createModal({ ...config, title: config.title || '成功' }),
    warning: (config: ModalConfig) => createModal({ ...config, title: config.title || '警告' }),
    error: (config: ModalConfig) => createModal({ ...config, title: config.title || '错误' }),
    confirm: (config: ModalConfig) => createModal({
        ...config,
        title: config.title || '确认',
        okText: config.okText || '确定',
        cancelText: config.cancelText || '取消',
    }),
    destroyAll: () => {
        const list = document.querySelectorAll('dialog.dd-modal')
        list.forEach(dialog => {
            dialog.remove()
        })
    }
};

export default Modal;
