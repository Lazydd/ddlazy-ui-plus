import path from 'path';

export const getLang = (ROOT, id: string) => {
	const lang = path.relative(ROOT, id).split(path.sep)[0];
	if (lang == 'components') return 'zh-CN';
	return lang;
};
