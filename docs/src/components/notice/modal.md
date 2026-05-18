# Modal 对话框

## 基础用法

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

## 拖拽

设置 `draggable` 字段可以拖拽弹框。

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

## 自定义页脚

更复杂的例子，自定义了页脚的按钮，点击提交后进入 `loading` 状态，完成后关闭。 不需要默认确定取消按钮时，你可以把 `footer` 设为 `null。`

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

## 销毁确认对话框

使用 `Modal.destroyAll()` 可以销毁弹出的确认窗。通常用于路由监听当中，处理路由前进、后退不能销毁确认对话框的问题。

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

## 自定义模态的宽度

使用 `width` 来设置模态对话框的宽度

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

## 自定义页脚按钮属性

传入 `okButtonProps` 和 `cancelButtonProps` 可分别自定义确定按钮和取消按钮的 `props`。

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

| Name              | Description                                                 | Type                                                        | Default               | Version |
| ----------------- | ----------------------------------------------------------- | ----------------------------------------------------------- | --------------------- | ------- |
| bodyStyle         | Modal body 样式                                             | `object`                                                    | `{}`                  |
| cancelButtonProps | cancel 按钮 props                                           | [`ButtonProps`](/components/basic/button#button-attributes) | —                     |
| cancelText        | 取消按钮文字                                                | `string \| slot`                                            | `取消`                |
| closable          | 是否显示右上角的关闭按钮                                    | `boolean`                                                   | `true`                |
| closeIcon         | 自定义关闭图标                                              | `VNode \| slot`                                             | —                     |
| confirmLoading    | 确定按钮 `loading`                                          | `boolean`                                                   | —                     |
| destroyOnClose    | 关闭时销毁 `Modal` 里的子元素                               | `boolean`                                                   | `false`               |
| footer            | 底部内容，当不需要默认底部按钮时，可以设为 `:footer="null"` | `string \| slot`                                            | `确定取消按钮`        |
| getContainer      | 指定 `Modal` 挂载的 `HTML` 节点                             | `(): HTMLElement`                                           | `() => document.body` |
| mask              | 是否展示遮罩                                                | `boolean`                                                   | `true`                |
| maskClosable      | 点击蒙层是否允许关闭                                        | `boolean`                                                   | `true`                |
| okButtonProps     | ok 按钮 props                                               | [`ButtonProps`](/components/basic/button#button-attributes) | —                     |
| okText            | 确认按钮文字                                                | `string \| slot`                                            | `确定`                |
| okType            | 确认按钮类型                                                | `string`                                                    | `primary`             |
| title             | 标题                                                        | `string \| slot`                                            | —                     |
| open(v-model)     | 对话框是否可见                                              | `boolean`                                                   | —                     |
| width             | 宽度                                                        | `string \| number`                                          | `520`                 |
| wrapClassName     | 对话框外层容器的类名                                        | `string`                                                    | —                     |

### Modal Events

| Name   | Description                          | Type                       |
| ------ | ------------------------------------ | -------------------------- |
| cancel | 点击遮罩层或右上角叉或取消按钮的回调 | `(e?: MouseEvent) => void` |
| ok     | 点击确定回调                         | `(e: MouseEvent) => void`  |

### Modal Slots

| Name      | Description    |
| --------- | -------------- |
| default   | 自定义默认内容 |
| header    | 自定义顶部内容 |
| closeIcon | 自定义关闭图标 |
| footer    | 自定义底部内容 |

### Modal Method

| Name       | Description      |
| ---------- | ---------------- |
| info       | 信息             |
| success    | 成功             |
| warning    | 警告             |
| error      | 错误             |
| confirm    | 确认             |
| destroyAll | 销毁弹出的确认窗 |

#### Modal Method Attributes

属性与 `Modal` 相同。还包含以下属性：

| Name     | Description                  | Type       | Default | Version |
| -------- | ---------------------------- | ---------- | ------- | ------- |
| onOk     | 点击确定回调，参数为关闭函数 | `function` | —       |
| onCancel | 取消回调，参数为关闭函数     | `function` | —       |
| content  | 内容                         | `string`   | —       |
