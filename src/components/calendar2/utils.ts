import dayjs, { Dayjs, ConfigType } from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import solarLunar from 'solarLunar';
import { forEach, fill, map, get } from 'lodash-es';
import { EventItem } from './interface';

dayjs.extend(isSameOrBefore);

export const WEEKS = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];

// 获取指定格式日期
export const formatDate = (date: ConfigType, type: string = 'YYYY-MM-DD') =>
  dayjs(date).format(type);

// 获取日期 day（天）
export const getDay = (date: ConfigType): number => dayjs(date).date();

// 获取农历日期 day（天）
export const getLunarDay = (date: any): string => {
  const year = dayjs(date)?.year();
  const month = dayjs(date)?.month();
  const day = getDay(date);

  return solarLunar.solar2lunar(year, month + 1, day)?.dayCn;
};

// 是否为休息日
export const isOffDay = (date: ConfigType) =>
  dayjs(date).day() === 0 || dayjs(date).day() === 6;

// before 日期是否和 after 相同或在它之前
export const dateIsSameOrBefore = (
  before: Dayjs | ConfigType,
  after: Dayjs | ConfigType,
  type: string = 'd'
) => (dayjs(before) as any)?.isSameOrBefore(dayjs(after), type);

export const dateIsBefore = (
  before: Dayjs | ConfigType,
  after: Dayjs | ConfigType,
  type: string = 'd'
) => (dayjs(before) as any)?.isBefore(dayjs(after), type);

export const dateIsSame = (
  before: Dayjs | ConfigType,
  after: Dayjs | ConfigType,
  type: string = 'd'
) => (dayjs(before) as any)?.isSame(dayjs(after), type);

// 获取日期为当月的第几天
export const isWeekOfMonth = (date: Dayjs | ConfigType) => {
  const currentDate = dayjs(date);
  const saturday = currentDate.date() + (6 - currentDate.day());

  return Math.ceil(saturday / 7);
};

/**
 * 通过日期获取月份
 * @param date 日期
 * @param isSameWeeks 是否补全均为 6 周
 * @returns 日期所在的月份数组
 */
export const getMonthByDay = (
  date: ConfigType,
  isSameWeeks: boolean = false
) => {
  let weekIndex = 0;
  const monthWeeks: Array<Dayjs[]> = [];
  const currentYear = dayjs(date).year();
  const currentMonth = dayjs(date).month() + 1;
  // 当前月最大天数
  const currentMonthMaxDate = new Date(currentYear, currentMonth, 0).getDate();

  // 处理周分组
  forEach(fill(Array(currentMonthMaxDate), 0), (_, i) => {
    const day = i < 9 ? `0${i + 1}` : i + 1;
    const month = currentMonth < 10 ? `0${currentMonth}` : currentMonth;
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const date = dayjs(`${currentYear}-${month}-${day} 00:00:00`);
    monthWeeks[weekIndex] = [...(monthWeeks[weekIndex] || []), date];
    // 周六分下一组
    if (date.day() === 6) {
      weekIndex += 1;
    }
  });

  const firstWeek = monthWeeks[0];
  const lastWeek = monthWeeks[monthWeeks.length - 1];

  // 第一周不满 7 天的，向前补全 7 天
  if (firstWeek?.length < 7) {
    forEach(fill(Array(7 - (firstWeek?.length ?? 0)), 0), () => {
      firstWeek.unshift(dayjs(firstWeek[0]).day(6 - firstWeek.length));
    });
  }

  // 最后一周不满 7 天，向后补全 7 天
  if (lastWeek?.length < 7) {
    forEach(fill(Array(7 - (lastWeek?.length ?? 0)), 0), () => {
      lastWeek.push(dayjs(lastWeek[lastWeek.length - 1]).day(lastWeek.length));
    });
  }

  // 不足 6 行补全 6 行， 防止月份不同导致显示问题
  if (isSameWeeks && monthWeeks?.length < 6) {
    const lastWeekDay = lastWeek[6];

    // 多层循环（特殊情况：刚好 28 天占四行）
    const addWeeks = map(
      fill(Array(6 - monthWeeks.length), 0),
      (_: number, row: number) => {
        return map(fill(Array(7), 0), (__, i) => {
          return dayjs(lastWeekDay).add(7 * row + i + 1, 'dayjs');
        });
      }
    );

    monthWeeks.push(...addWeeks);
  }

  return monthWeeks;
};

/**
 * 获取指定事件 key 值
 * @param e 事件
 * @returns 指定事件 key 值
 */
export const getEventKey = (e: EventItem) => {
  const itemKey = e?.id || 'name';
  return `event_${get(e, itemKey)}`;
};
