# Quick Start

This section describes how to use ddlazy-ui-plus in your project.

## Import ddlazy-ui-plus

If you don't care about the bundle size so much, it's more convenient to use full import.

### Full Import

```js
import { createApp } from 'vue';
import ddlazyUi from 'ddlazy-ui-plus';
import 'ddlazy-ui-plus/lib/index.css';
import App from './App.vue';

const app = createApp(App);

app.use(ddlazyUi);
app.mount('#app');
```

### Auto import

```vue
<template>
	<dd-button>I am dd-button</dd-button>
</template>

<script setup lang="ts">
import { ddButton } from 'ddlazy-ui-plus';
</script>
```
