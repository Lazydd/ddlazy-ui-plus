# 快速上手

本节将介绍如何在项目中使用 ddlazy-ui-plus

## 引入 ddlazy-ui-plus

如果你对打包后的文件大小不是很在乎，那么使用完整导入会更方便。

### 完整引入

```js
import { createApp } from 'vue';
import ddlazyUi from 'ddlazy-ui-plus';
import 'ddlazy-ui-plus/lib/index.css';
import App from './App.vue';

const app = createApp(App);

app.use(ddlazyUi);
app.mount('#app');
```

### 按需引入

```vue
<template>
	<dd-button>I am dd-button</dd-button>
</template>

<script setup lang="ts">
import { ddButton } from 'ddlazy-ui-plus';
</script>
```
