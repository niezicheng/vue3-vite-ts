import { Dayjs, ConfigType } from 'dayjs';

export interface WorkHour {
  // 工时标识
  workId: 1 | 2 | 3;
  // 项目（数组）名称
  project: string | Array<string>;
  // 产品（数组）名称
  pd: string | Array<string>;
  // 工时
  hour: 0 | 1;
  // 是否是事件当月开始工时
  start?: boolean;
}

export interface DayEvent {
  // 日
  time: Dayjs | ConfigType;
  // 工时数组
  workHours: Array<WorkHour>;
}

export interface WeekEvent {
  // 周
  time: [Dayjs | ConfigType, Dayjs | ConfigType];
  // 周天数组
  weekDays: Array<DayEvent>;
}

export interface EventItem {
  id: number;
  // 姓名
  name: string;
  // 背景
  bgColor?: string;
  // 前置颜色
  prefixColor?: string;
  // 月周数组
  monthWeeks: Array<WeekEvent>;
}

export type SortEventKey = Exclude<keyof EventItem, 'monthWeeks'>;

export interface EventsMapItem
  extends Pick<EventItem, 'name' | 'bgColor' | 'prefixColor'>,
    DayEvent {
  top: string;
}
