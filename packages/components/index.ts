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

export default {
	install(app: App) {
		for (const path in modulesFiles) {
			const mode: Component = modulesFiles[path]!;
			app.component(mode.name!, mode);
		}
	},
};
