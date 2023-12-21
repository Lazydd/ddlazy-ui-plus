import { ref, computed, type ComputedRef } from 'vue';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
import objectSupport from 'dayjs/plugin/objectSupport';
import updateLocale from 'dayjs/plugin/updateLocale';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import quarterOfYear from 'dayjs/plugin/quarterOfYear';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(advancedFormat);
dayjs.extend(weekOfYear);
dayjs.extend(objectSupport);
dayjs.extend(updateLocale);
dayjs.extend(quarterOfYear);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
dayjs.extend(customParseFormat);
dayjs.updateLocale('en', {
	weekStart: 1, //每周的开始为周一，默认为周日
});

export const useCalendar = ({
	year = dayjs().year(),
	month = dayjs().month(),
}): { now: Dayjs; dates: { isCurrMonth: boolean; date: Dayjs }[][] } => {
	// 当前日期
	const now = ref(dayjs({ year, month }));

	const lastDayOfPrevMonth = computed(() => {
		const prev = now.value.subtract(1, 'M');
		return {
			last: prev.endOf('M').day(),
			now: prev.daysInMonth(),
		};
	});
	// 日期数据
	const dates = computed<{ isCurrMonth: boolean; date: Dayjs }[][]>(() => {
		const dateArr = [];
		let year = now.value.subtract(1, 'M').year(),
			month = now.value.subtract(1, 'M').month();
		// 生成上月尾巴
		for (let i = lastDayOfPrevMonth.value.last; i > 0; i--) {
			dateArr.push({
				isCurrMonth: false,
				date: dayjs({
					year,
					month,
					day: lastDayOfPrevMonth.value.now - i + 1,
				}),
			});
		}

		// 生成本月数据
		const daysInMonth = now.value.daysInMonth();
		year = now.value.year();
		month = now.value.month();
		for (let i = 1; i <= daysInMonth; i++) {
			dateArr.push({
				isCurrMonth: true,
				date: dayjs({
					year,
					month,
					day: i,
				}),
			});
		}

		// 生成下月头部
		year = now.value.add(1, 'M').year();
		month = now.value.add(1, 'M').month();
		for (let i = 1; dateArr.length < 42; i++) {
			dateArr.push({
				isCurrMonth: false,
				date: dayjs({
					year,
					month,
					day: i,
				}),
			});
		}
		return chunk(dateArr, 7);
	});

	return {
		now: now.value,
		dates: dates.value,
	};
};

export const useTime = ({
	type,
	step = 1,
	disabledArr = <number[]>[],
}): ComputedRef<{ time: string; disabled: boolean }[]> => {
	return computed(() => {
		const length = Math.ceil((type === 'hour' ? 24 : 60) / step);
		return Array.from({ length }, (_, i) => {
			return {
				time:
					type === 'hour'
						? dayjs()
								.hour(i * step)
								.format('HH')
						: dayjs()
								.minute(i * step)
								.format('mm'),
				disabled: disabledArr.includes(i),
			};
		});
	});
};

const chunk = (arr: any[], size: number): { isCurrMonth: boolean; date: Dayjs }[][] => {
	let arr2 = [];
	for (let i = 0; i < arr.length; i += size) {
		arr2.push(arr.slice(i, i + size));
	}
	return arr2;
};
