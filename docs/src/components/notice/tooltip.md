# Tooltip 文字提示

## 基础用法

使用 `content` 属性来决定 `hover` 时的提示信息。 由 `placement` 属性决定展示效果： `placement` 属性值为：[方向]；四个方向：`top`、`left`、`right`、`bottom` 。

:::demo

```vue
<template>
	<div style="display: flex; flex-direction: column; gap: 20px;">
		<div style="display: flex; justify-content: space-between;">
			<dd-tooltip content="Top Left prompts info" placement="top-left">
				<dd-button>top-left</dd-button>
			</dd-tooltip>
			<dd-tooltip content="Top Center prompts info" placement="top">
				<dd-button>top</dd-button>
			</dd-tooltip>
			<dd-tooltip content="Top Right prompts info" placement="top-right">
				<dd-button>top-right</dd-button>
			</dd-tooltip>
		</div>
		<div style="display: flex; justify-content: space-between;">
			<dd-tooltip content="Left prompts info" placement="left">
				<dd-button>left</dd-button>
			</dd-tooltip>
			<dd-tooltip content="Right prompts info" placement="right">
				<dd-button>right</dd-button>
			</dd-tooltip>
		</div>
		<div style="display: flex; justify-content: space-between;">
			<dd-tooltip content="Bottom Left prompts info" placement="bottom-left">
				<dd-button>bottom-left</dd-button>
			</dd-tooltip>
			<dd-tooltip content="Bottom Center prompts info" placement="bottom">
				<dd-button>bottom</dd-button>
			</dd-tooltip>
			<dd-tooltip content="Bottom Right prompts info" placement="bottom-right">
				<dd-button>bottom-right</dd-button>
			</dd-tooltip>
		</div>
	</div>
</template>
```

:::

## 更多内容的文字提示

使用 `maxWidth` 属性来决定 `Tooltip` 的自动换行宽度 。

:::demo

```vue
<template>
	<dd-tooltip
		content="啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊"
		placement="top-left"
	>
		<dd-button>top-left</dd-button>
	</dd-tooltip>
</template>
```

:::

## API

### Options

| Name      | Description                    | Type                                                                                    | Default | Version |
| --------- | ------------------------------ | --------------------------------------------------------------------------------------- | ------- | ------- |
| content   | 显示的内容，也可被 `slot` 覆盖 | `string`                                                                                |         |
| placement | `Tooltip` 组件出现的位置       | `top-left \|top \| top-right \| left \| right \| bottom-left \| bottom \| bottom-right` | `top`   |
| maxWidth  | 最大宽度，内容超出则换行       | `number`                                                                                | `500`   |
| space     | `Tooltip` 组件与出发内容的距离 | `number`                                                                                | `8`     |
