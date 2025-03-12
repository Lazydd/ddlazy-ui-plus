export const isRgb = (color?: string): boolean => {
	if (!color) {
		return false;
	}
	return color.startsWith('rgb');
};

export const isHsl = (color?: string): boolean => {
	if (!color) {
		return false;
	}
	return color.startsWith('hsl');
};

export const isHex = (color?: string): boolean => {
	if (!color) {
		return false;
	}
	return color.startsWith('#');
};

export const hexToRgb = (hex: string): [number, number, number] => {
	const r = parseInt(hex.slice(1, 3), 16);
	const g = parseInt(hex.slice(3, 5), 16);
	const b = parseInt(hex.slice(5, 7), 16);
	return [r, g, b];
};

export const rgbToHsv = (r: number, g: number, b: number): [number, number, number] => {
	const max = Math.max(r, g, b);
	const min = Math.min(r, g, b);
	const d = max - min;
	let h = 0;

	if (d === 0) {
		h = 0;
	} else if (max === r) {
		h = ((g - b) / d) % 6;
	} else if (max === g) {
		h = (b - r) / d + 2;
	} else if (max === b) {
		h = (r - g) / d + 4;
	}

	h = Math.round(h * 60);
	if (h < 0) {
		h += 360;
	}

	const s = max === 0 ? 0 : (d / max) * 100;
	const v = max * 100;

	return [h, s, v];
};

export const Rgb2hex = (r, g, b) => {
	var hex = '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
	return hex;
};

export const rgbToHsl = (r: number, g: number, b: number): [number, number, number] => {
	r /= 255;
	g /= 255;
	b /= 255;
	const max = Math.max(r, g, b);
	const min = Math.min(r, g, b);
	let h = 0,
		s,
		l = (max + min) / 2;

	if (max === min) {
		h = s = 0;
	} else {
		const d = max - min;
		s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
		switch (max) {
			case r:
				h = (g - b) / d + (g < b ? 6 : 0);
				break;
			case g:
				h = (b - r) / d + 2;
				break;
			case b:
				h = (r - g) / d + 4;
				break;
		}
		h /= 6;
	}

	return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
};

export const hslToRgb = (h: number, s: number, l: number): [number, number, number] => {
	h = h % 360;
	s = Math.max(0, Math.min(100, s)) / 100;
	l = Math.max(0, Math.min(100, l)) / 100;

	if (s === 0) {
		const value = Math.round(l * 255);
		return [value, value, value];
	}

	const hue2rgb = (p: number, q: number, t: number) => {
		if (t < 0) {
			t += 1;
		}
		if (t > 1) {
			t -= 1;
		}
		if (t < 1 / 6) {
			return p + (q - p) * 6 * t;
		}
		if (t < 1 / 2) {
			return q;
		}
		if (t < 2 / 3) {
			return p + (q - p) * (2 / 3 - t) * 6;
		}
		return p;
	};

	const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
	const p = 2 * l - q;
	const r = hue2rgb(p, q, h / 360 + 1 / 3);
	const g = hue2rgb(p, q, h / 360);
	const b = hue2rgb(p, q, h / 360 - 1 / 3);

	return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
};

export const hsvToRgb = (h: number, s: number, v: number): [number, number, number] => {
	s = s / 100;
	v = v / 100;
	const i = Math.floor(h / 60);
	const f = h / 60 - i;
	const p = v * (1 - s);
	const q = v * (1 - f * s);
	const t = v * (1 - (1 - f) * s);

	switch (i % 6) {
		case 0:
			return [v, t, p];
		case 1:
			return [q, v, p];
		case 2:
			return [p, v, t];
		case 3:
			return [p, q, v];
		case 4:
			return [t, p, v];
		case 5:
			return [v, p, q];
		default:
			return [0, 0, 0];
	}
};

export const rgbToHex = (r: number, g: number, b: number): string => {
	return (
		'#' +
		[r, g, b]
			.map((x) => {
				const hex = x.toString(16);
				return hex.length === 1 ? '0' + hex : hex;
			})
			.join('')
	);
};

export const parseRgb = (color: string): [number, number, number] => {
	const match = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
	if (!match) {
		return [0, 0, 0];
	}
	return [parseInt(match[1]), parseInt(match[2]), parseInt(match[3])];
};

export const parseHsl = (color: string): [number, number, number] => {
	const match = color.match(/hsla?\((\d+),\s*(\d+)%,\s*(\d+)%/);
	if (!match) {
		return [0, 0, 0];
	}
	return [parseInt(match[1]), parseInt(match[2]), parseInt(match[3])];
};

export const hexToRgba = (hex: string, alpha: number): string => {
	const [r, g, b] = hexToRgb(hex);
	return `rgba(${r}, ${g}, ${b}, ${alpha / 100})`;
};

// Convert RGB to RGBA
// 将 RGB 转换为 RGBA
export const rgbToRgba = (r: number, g: number, b: number, alpha: number): string => {
	return `rgba(${r}, ${g}, ${b}, ${alpha / 100})`;
};

// Convert HSL to HSLA
// 将 HSL 转换为 HSLA
export const hslToHsla = (h: number, s: number, l: number, alpha: number): string => {
	return `hsla(${h}, ${s}%, ${l}%, ${alpha / 100})`;
};