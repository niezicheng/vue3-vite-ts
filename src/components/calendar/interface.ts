import { Dayjs, ConfigType } from 'dayjs';

export interface EventItemProps {
  /**
   * 时间标识 id
   */
  id: number | string;
  /**
   * 时间名称
   */
  name?: string;
  /**
   * 起始时间
   */
  startAt?: Dayjs | ConfigType;
  /**
   * 结束时间
   */
  endAt?: Dayjs | ConfigType;

  /**
   * 背景填充色
   */
  bgColor?: string;

  /**
   * 前置填充色
   */
  prefixColor?: string;

  /**
   * 事件 key 值
   */
  eventItemKey?: string;
}
