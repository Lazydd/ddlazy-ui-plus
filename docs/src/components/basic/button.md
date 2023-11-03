# Button 按钮

## 基础用法

使用 `type`、`plain`、`round` 和 `circle` 来定义按钮的样式。

:::demo

```vue
<template>
	<div>
		<div class="mt1">
			<dd-button>默认按钮</dd-button>
			<dd-button type="primary">主要按钮</dd-button>
			<dd-button type="success">成功按钮</dd-button>
			<dd-button type="info">信息按钮</dd-button>
			<dd-button type="warning">警告按钮</dd-button>
			<dd-button type="danger">危险按钮</dd-button>
		</div>
		<div class="mt1">
			<dd-button plain>默认按钮</dd-button>
			<dd-button type="primary" plain>主要按钮</dd-button>
			<dd-button type="success" plain>成功按钮</dd-button>
			<dd-button type="info" plain>信息按钮</dd-button>
			<dd-button type="warning" plain>警告按钮</dd-button>
			<dd-button type="danger" plain>危险按钮</dd-button>
		</div>
		<div class="mt1">
			<dd-button round>默认按钮</dd-button>
			<dd-button type="primary" round>主要按钮</dd-button>
			<dd-button type="success" round>成功按钮</dd-button>
			<dd-button type="info" round>信息按钮</dd-button>
			<dd-button type="warning" round>警告按钮</dd-button>
			<dd-button type="danger" round>危险按钮</dd-button>
		</div>
		<div class="mt1">
			<dd-button icon="eletrical" circle />
			<dd-button icon="video1" type="primary" circle />
			<dd-button icon="electronics" type="success" circle />
			<dd-button icon="email" type="info" circle />
			<dd-button icon="furniture" type="warning" circle />
			<dd-button icon="gift1" type="danger" circle />
		</div>
	</div>
</template>

<style lang="less" scoped>
.dd-button + .dd-button {
	margin-left: 12px;
}
.mt1 + .mt1 {
	margin-top: 1em;
}
</style>
```

:::

你可以使用 `disabled` 属性来定义按钮是否被禁用。

## 禁用状态

:::demo

```vue
<template>
	<div>
		<dd-button disabled>默认按钮</dd-button>
		<dd-button type="primary" disabled>主要按钮</dd-button>
		<dd-button type="success" disabled>成功按钮</dd-button>
		<dd-button type="info" disabled>信息按钮</dd-button>
		<dd-button type="warning" disabled>警告按钮</dd-button>
		<dd-button type="danger" disabled>危险按钮</dd-button>
	</div>
</template>

<style lang="less" scoped>
.dd-button + .dd-button {
	margin-left: 12px;
}
</style>
```

:::

## 图标按钮

使用 `icon` 属性来为按钮添加图标。

:::demo

```vue
<template>
	<div>
		<dd-button type="primary" icon="auto" />
		<dd-button type="primary" icon="map" />
		<dd-button type="primary" icon="account" />
		<dd-button type="primary" icon="search">搜索</dd-button>
		<dd-button type="primary">搜索</dd-button>
		<dd-button type="primary">
			搜索
			<dd-icon icon="search" />
		</dd-button>
	</div>
</template>

<style lang="less" scoped>
.dd-button + .dd-button {
	margin-left: 12px;
}
</style>
```

:::

## 不同尺寸

使用 `size` 属性额外配置尺寸，可使用 `large`和`small`两种值。

:::demo

```vue
<template>
	<div>
		<dd-button type="primary" size="large">Large</dd-button>
		<dd-button type="primary">Default</dd-button>
		<dd-button type="primary" size="small">Small</dd-button>
	</div>
</template>

<style lang="less" scoped>
.dd-button + .dd-button {
	margin-left: 12px;
}
</style>
```

:::

## 链接按钮

通过设置 `link` 属性为 `true` 来显示链接按钮。

:::demo

```vue
<template>
	<div>
		<dd-button link>default</dd-button>
		<dd-button type="primary" link>primary</dd-button>
		<dd-button type="success" link>success</dd-button>
		<dd-button type="info" link>info</dd-button>
		<dd-button type="warning" link>warning</dd-button>
		<dd-button type="danger" link>danger</dd-button>
	</div>
</template>

<style lang="less" scoped>
.dd-button + .dd-button {
	margin-left: 12px;
}
</style>
```

:::

## 加载中

通过设置 `loading` 属性为 `true` 来显示加载中状态。

:::demo

```vue
<template>
	<div>
		<dd-button type="primary" loading>加载中</dd-button>
	</div>
</template>
```

:::

## Button API

### Button Attributes

| Name     | Description | Type                                                    | Default | Version |
| -------- | ----------- | ------------------------------------------------------- | ------- | ------- |
| size     | 尺寸        | `'large'\| 'small'`                                     | —       |
| type     | 类型        | `'primary'\| 'success'\| 'warning'\| 'danger'\| 'info'` | —       |
| plain    | 朴素按钮    | `boolean`                                               | false   |
| link     | 链接按钮    | `boolean`                                               | false   |         |
| round    | 圆角按钮    | `boolean`                                               | false   |
| circle   | 圆形按钮    | `boolean`                                               | false   |
| loading  | 加载中      | `boolean`                                               | false   |
| disabled | 禁用        | `boolean`                                               | false   |
| icon     | 图标组件    | `string` / `Component`                                  | —       |
