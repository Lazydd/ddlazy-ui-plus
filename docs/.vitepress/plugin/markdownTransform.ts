import { relative, resolve } from 'node:path';
import type { Plugin } from 'vite';
import { includes } from '../meta';
import { getLang } from '../utils/lang';
export function MarkdownTransform(): Plugin {
	const ROOT = resolve(__dirname, '../../src');
	const ROOTEN = resolve(__dirname, '../../src/en');
	return {
		name: 'vueuse-md-transform',
		enforce: 'pre',
		async transform(code, id) {
			if (!id.endsWith('.md')) return null;
			const lang = getLang(ROOT, id);

			const ids = relative(ROOT, id);
			const idsEn = relative(ROOTEN, id);
			const [pkg, name, i] = id.split('/').slice(-3);

			if (
				ids
					.replace(/\\/g, '/')
					.replace('.md', '/.md')
					.match(RegExp(`^(${includes.join('|')})\\/`)) ||
				idsEn
					.replace(/\\/g, '/')
					.replace('.md', '/.md')
					.match(RegExp(`^(${includes.join('|')})\\/`))
			) {
				// 对index.md进行处理
				// 使用拼接字符串的方式拼接Demo,贡献者信息和更新日志
				const { footer } = await getFunctionMarkdown(pkg, name, lang);

				code = `${code}\n\n${footer}`;
			}
			return code;
		},
	};
}

export async function getFunctionMarkdown(kg: string, name: string, language?: string) {
	const contributorsSection = `
  ## ${language === 'en' ? 'Contributors' : '贡献者'}
  
  <Contributors fn="${name}"/>
  `;

	const changelogSection = `
  ## ${language === 'en' ? 'ChangeLog' : '变更记录'}
  
  <Changelog fn="${name}"/>
  `;
	const footer = `${contributorsSection}\n${changelogSection}\n`;

	return {
		footer,
	};
}
