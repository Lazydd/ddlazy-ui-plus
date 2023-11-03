import { createApp } from 'vue';
import App from './packages/App.vue';
import ddlazyUi from './packages/components';
import './packages/components/assets/main.css';
import './packages/components/assets/var.css';

createApp(App).use(ddlazyUi).mount('#app');
