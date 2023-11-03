import type { App, Component } from 'vue';

const camelize = (str: string): string => str.replace(/-(\w)/g, (_, c) => c.toUpperCase());
const formatName = (str: string): string => str.replace(/([A-Z])/g, '-$1').toLowerCase();
const createName = (name: string) => {
	const prefixedName = `Dd${camelize(`-${name}`)}`;
	return prefixedName;
};

const install = <T extends Component>(component: T) => {
	(component as Record<string, unknown>).install = (app: App) => {
		const { name } = component;
		if (name) {
			app.component(name, component);
			// app.component(camelize(`-${name}`), component);
			// app.component(formatName(name), component);
		}
	};
	return component;
};

export { install, camelize, createName, formatName };
