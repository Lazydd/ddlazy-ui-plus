# Button

## Basic usage

Use `type`, `plain`, `round` and `circle` to define Button's style.

:::demo

```vue
<template>
	<div>
		<div class="mt1">
			<dd-button>Default</dd-button>
			<dd-button type="primary">Primary</dd-button>
			<dd-button type="success">Success</dd-button>
			<dd-button type="info">Info</dd-button>
			<dd-button type="warning">Warning</dd-button>
			<dd-button type="danger">Danger</dd-button>
		</div>
		<div class="mt1">
			<dd-button plain>Default</dd-button>
			<dd-button type="primary" plain>Primary</dd-button>
			<dd-button type="success" plain>Success</dd-button>
			<dd-button type="info" plain>Info</dd-button>
			<dd-button type="warning" plain>Warning</dd-button>
			<dd-button type="danger" plain>Danger</dd-button>
		</div>
		<div class="mt1">
			<dd-button round>Default</dd-button>
			<dd-button type="primary" round>Primary</dd-button>
			<dd-button type="success" round>Success</dd-button>
			<dd-button type="info" round>Info</dd-button>
			<dd-button type="warning" round>Warning</dd-button>
			<dd-button type="danger" round>Danger</dd-button>
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

<style lang="scss" scoped>
.dd-button + .dd-button {
	margin-left: 12px;
}
.mt1 + .mt1 {
	margin-top: 1em;
}
</style>
```

:::

## Disabled Button

The `disabled` attribute determines if the button is disabled.

:::demo

```vue
<template>
	<div>
		<dd-button disabled>Default</dd-button>
		<dd-button type="primary" disabled>Primary</dd-button>
		<dd-button type="success" disabled>Success</dd-button>
		<dd-button type="info" disabled>Info</dd-button>
		<dd-button type="warning" disabled>Warning</dd-button>
		<dd-button type="danger" disabled>Danger</dd-button>
	</div>
</template>

<style lang="scss" scoped>
.dd-button + .dd-button {
	margin-left: 12px;
}
</style>
```

:::

## Icon Button

Use the `icon` attribute to add icon.

:::demo

```vue
<template>
	<div>
		<dd-button type="primary" icon="auto" />
		<dd-button type="primary" icon="map" />
		<dd-button type="primary" icon="account" />
		<dd-button type="primary" icon="search">Search</dd-button>
		<dd-button type="primary">搜索</dd-button>
		<dd-button type="primary">
			Search
			<dd-icon icon="search" />
		</dd-button>
	</div>
</template>

<style lang="scss" scoped>
.dd-button + .dd-button {
	margin-left: 12px;
}
</style>
```

:::

## Sizes

Use attribute `size` to set additional sizes with `large`, `small`.

:::demo

```vue
<template>
	<div>
		<dd-button type="primary" size="large">Large</dd-button>
		<dd-button type="primary">Default</dd-button>
		<dd-button type="primary" size="small">Small</dd-button>
	</div>
</template>

<style lang="scss" scoped>
.dd-button + .dd-button {
	margin-left: 12px;
}
</style>
```

:::

## Link

Set `link` attribute to `true` to display link state.

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

<style lang="scss" scoped>
.dd-button + .dd-button {
	margin-left: 12px;
}
</style>
```

:::

## Loading Button

Set `loading` attribute to `true` to display loading state.

:::demo

```vue
<template>
	<div>
		<dd-button type="primary" loading>Loading</dd-button>
	</div>
</template>
```

:::

## Button API

### Button Attributes

| Name     | Description | Type                                              | Default | version |
| -------- | ----------- | ------------------------------------------------- | ------- | ------- |
| size     | size        | `large \| default \| small`                       | —       |
| type     | type        | `primary \| success \| warning \| danger \| info` | —       |
| plain    | plain       | `boolean`                                         | `false` |
| link     | link        | `boolean`                                         | `false` |         |
| round    | round       | `boolean`                                         | `false` |
| circle   | circle      | `boolean`                                         | `false` |
| loading  | loading     | `boolean`                                         | `false` |
| disabled | disabled    | `boolean`                                         | `false` |
| icon     | icon        | `string` / `Component`                            | —       |
