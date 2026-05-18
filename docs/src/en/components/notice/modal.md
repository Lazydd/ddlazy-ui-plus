# Modal

## Basic usage

:::demo

```vue
<template>
	<div>
		<dd-button type="primary" @click="showModal">Open Modal</dd-button>
		<dd-modal v-model:open="open" title="Basic Modal">
			<p>Some contents...</p>
			<p>Some contents...</p>
			<p>Some contents...</p>
		</dd-modal>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const open = ref<boolean>(false);
const showModal = () => {
	open.value = true;
};
</script>
```

:::

## Draggable

设置 `draggable` 字段可以拖拽弹框。
Set the value of `draggable` in `dd-modal` to `true` to draggable this modal.

:::demo

```vue
<template>
	<div>
		<dd-button type="primary" @click="showModal">Open Modal</dd-button>
		<dd-modal v-model:open="open" title="Basic Modal" draggable>
			<p>Some contents...</p>
			<p>Some contents...</p>
			<p>Some contents...</p>
		</dd-modal>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const open = ref<boolean>(false);
const showModal = () => {
	open.value = true;
};
</script>
```

:::

## Customized Footer

A more complex example which define a customized footer button bar, the dialog will change to loading state after clicking submit button, when the loading is over, the modal dialog will be closed. You could set `footer` to `null` if you don't need default footer buttons.

:::demo

```vue
<template>
	<div>
		<dd-button type="primary" @click="showModal">Open Modal</dd-button>
		<dd-modal v-model:open="open" title="Basic Modal" @ok="handleOk">
			<template #footer>
				<dd-button key="back" @click="handleCancel">Return</dd-button>
				<dd-button key="submit" type="primary" :loading="loading" @click="handleOk">
					Submit
				</dd-button>
			</template>
			<p>Some contents...</p>
			<p>Some contents...</p>
			<p>Some contents...</p>
		</dd-modal>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const loading = ref<boolean>(false);
const open = ref<boolean>(false);
const showModal = () => {
	open.value = true;
};

const handleOk = () => {
	loading.value = true;
	setTimeout(() => {
		loading.value = false;
		open.value = false;
	}, 2000);
};

const handleCancel = () => {
	open.value = false;
};
</script>
```

:::

## Destroy confirmation modal dialog

`Modal.destroyAll()` could destroy all confirmation modal dialogs. Usually, you can use it in router change event to destroy confirm modal dialog automatically

:::demo

```vue
<template>
	<div>
		<dd-button type="primary" @click="showConfirm">Confirm</dd-button>
	</div>
</template>

<script setup lang="ts">
import { ddModal } from '@/lib/ddlazy-ui-plus.es.js';
const showConfirm = () => {
	for (let i = 0; i < 3; i += 1) {
		setTimeout(() => {
			ddModal.confirm({
				content: 'destroy all',
				onOk() {
					return new Promise((resolve, reject) => {
						setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
					}).catch(() => console.log('Oops errors!'));
				},
				cancelText: 'Click to destroy all',
				onCancel() {
					ddModal.destroyAll();
				},
			});
		}, i * 500);
	}
};
</script>
```

:::

## To customize the width of modal

Use `width` to set the width of the modal dialog

:::demo

```vue
<template>
	<div>
		<dd-button type="primary" @click="showModal">Open Modal</dd-button>
		<dd-modal v-model:open="open" title="Basic Modal" width="1000px">
			<p>Some contents...</p>
			<p>Some contents...</p>
			<p>Some contents...</p>
		</dd-modal>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const open = ref<boolean>(false);
const showModal = () => {
	open.value = true;
};
</script>
```

:::

## Customize footer buttons props

Passing `okButtonProps` and `cancelButtonProps` can customize the ok button and cancel button props.

:::demo

```vue
<template>
	<div>
		<dd-button type="primary" @click="showModal">Open Modal</dd-button>
		<dd-modal
			v-model:open="open"
			title="Basic Modal"
			@ok="handleOk"
			:ok-button-props="{ disabled: true }"
			:cancel-button-props="{ disabled: true }"
		>
			<p>Some contents...</p>
			<p>Some contents...</p>
			<p>Some contents...</p>
		</dd-modal>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const open = ref<boolean>(false);
const showModal = () => {
	open.value = true;
};

const handleOk = () => {
	open.value = false;
};

const handleCancel = () => {
	open.value = false;
};
</script>
```

:::

## Modal API

### Modal Attributes

| Name              | Description                                                                         | Type                                                        | Default               | Version |
| ----------------- | ----------------------------------------------------------------------------------- | ----------------------------------------------------------- | --------------------- | ------- |
| bodyStyle         | Body style for modal body element. Such as height, padding etc.                     | `object`                                                    | `{}`                  |
| cancelButtonProps | The cancel button props                                                             | [`ButtonProps`](/components/basic/button#button-attributes) | —                     |
| cancelText        | Text of the Cancel button                                                           | `string \| slot`                                            | `取消`                |
| closable          | Whether a close (x) button is visible on top right of the modal dialog or not       | `boolean`                                                   | `true`                |
| closeIcon         | Custom close icon                                                                   | `VNode \| slot`                                             | —                     |
| confirmLoading    | Whether to apply `loading` visual effect for OK button or not                       | `boolean`                                                   | —                     |
| destroyOnClose    | Whether to unmount child components on onClose                                      | `boolean`                                                   | `false`               |
| footer            | Footer content, set as `:footer="null"` when you don't need default buttons         | `string \| slot`                                            | `确定取消按钮`        |
| getContainer      | Return the mount node for `Modal`                                                   | `(): HTMLElement`                                           | `() => document.body` |
| mask              | Whether show mask or not.                                                           | `boolean`                                                   | `true`                |
| maskClosable      | Whether to close the modal dialog when the mask (area outside the modal) is clicked | `boolean`                                                   | `true`                |
| okButtonProps     | The ok button props                                                                 | [`ButtonProps`](/components/basic/button#button-attributes) | —                     |
| okText            | Text of the OK button                                                               | `string \| slot`                                            | `确定`                |
| okType            | Button type of the OK button                                                        | `string`                                                    | `primary`             |
| title             | The modal dialog's title                                                            | `string \| slot`                                            | —                     |
| open(v-model)     | Whether the modal dialog is visible or not                                          | `boolean`                                                   | —                     |
| width             | Width of the modal dialog                                                           | `string \| number`                                          | `520`                 |
| wrapClassName     | The class name of the container of the modal dialog                                 | `string`                                                    | —                     |

### Modal Events

| Name   | Description                                                                                                | Type                       |
| ------ | ---------------------------------------------------------------------------------------------------------- | -------------------------- |
| cancel | Specify a function that will be called when a user clicks mask, close button on top right or Cancel button | `(e?: MouseEvent) => void` |
| ok     | Specify a function that will be called when a user clicks the OK button                                    | `(e: MouseEvent) => void`  |

### Modal Slots

| Name      | Description                  |
| --------- | ---------------------------- |
| default   | Custom default content       |
| header    | Customize the top content    |
| closeIcon | Custom close icon            |
| footer    | Customize the bottom content |

### Modal Method

| Name       | Description |
| ---------- | ----------- |
| info       | info        |
| success    | success     |
| warning    | warning     |
| error      | error       |
| confirm    | confirm     |
| destroyAll | destroyAll  |

#### Modal Method Attributes

属性与 `Modal` 相同。还包含以下属性：

| Name     | Description                                                                                                                                                                                                                                                                              | Type       | Default | Version |
| -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- | ------- | ------- |
| onOk     | Specify a function that will be called when the user clicks the OK button. The parameter of this function is a function whose execution should include closing the dialog. You can also just return a promise and when the promise is resolved, the modal dialog will also be closed     | `function` | —       |
| onCancel | Specify a function that will be called when the user clicks the Cancel button. The parameter of this function is a function whose execution should include closing the dialog. You can also just return a promise and when the promise is resolved, the modal dialog will also be closed | `function` | —       |
| content  | Content                                                                                                                                                                                                                                                                                  | `string`   | —       |
