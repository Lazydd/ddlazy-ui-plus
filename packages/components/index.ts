import { type App, Component } from 'vue';
import './index.css';
import './assets/var.css';
import './assets/main.css';

const modulesFiles = import.meta.glob('./**/index.ts', { import: 'default', eager: true });

export * from './button';
export * from './icon';
export * from './message';
export * from './transition';
export * from './tooltip';
export * from './input';
export * from './empty';
export * from './select';
export * from './loading';
export * from './switch';
export * from './input-number';
export * from './carousel';

export default {
	install(app: App) {
		for (const path in modulesFiles) {
			const mode: Component = modulesFiles[path]!;
			app.component(mode.name!, mode);
		}
	},
};
