<template>
  <div class="month">
    <!-- operator -->
    <div class="month-operator">
      <NSpace align="center">
        <span>{{ formatShowMonthDate }}</span>
        <NButton @click="showMonthDate = dayjs(showMonthDate).subtract(1, 'M')"
          >&lt;</NButton
        >
        <NButton @click="showMonthDate = dayjs(showMonthDate).add(1, 'M')"
          >&gt;</NButton
        >
        <NButton @click="showMonthDate = dayjs()">今天</NButton>
      </NSpace>
    </div>
    <!-- header -->
    <div class="month-header">
      <div
        v-for="(week, index) in weeks"
        :key="index"
        class="month-header-column"
      >
        {{ week }}
      </div>
    </div>
    <!-- body -->
    <div ref="bodyRef" class="month-body">
      <div
        v-for="(week, index) in monthWeeks"
        :key="`week-${index}`"
        class="month-body-week"
      >
        <div
          v-for="(date, key) in week"
          :key="key"
          :class="['month-body-day', isOffDay(date) ? 'off-day' : '']"
        >
          <div class="month-body-day-header">
            <span class="lunarDay">{{ getLunarDay(date) }}</span>
            <div class="day">
              <span :class="[dateIsSame(date, dayjs()) ? 'today' : '']">{{
                getDay(date)
              }}</span>
              <span class="day">日</span>
            </div>
          </div>
        </div>
        <div
          v-for="(e, i) in monthWeekEvents[index]"
          :key="i"
          class="day-event-item"
          :style="[
            eventPositionMap[index][getEventKey(e)],
            { backgroundColor: e?.bgColor, borderColor: e?.prefixColor }
          ]"
        >
          {{ e.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
/* eslint-disable vue/require-default-prop */
import { ref, unref, computed, watchEffect, withDefaults, toRefs } from 'vue';
import { filter, forEach } from 'lodash-es';
import dayjs, { Dayjs, ConfigType } from 'dayjs';
import { NButton, NSpace } from 'naive-ui';
import {
  WEEKS,
  getMonthByDay,
  getDay,
  getLunarDay,
  dateIsSame,
  dateIsBefore,
  dateIsSameOrBefore,
  getEventKey,
  formatDate,
  isOffDay
} from './utils';
import { EventItemProps } from './interface';
import './style.scss';

interface Props {
  defaultDate?: Dayjs;
  events: Array<EventItemProps>;
}

const props = withDefaults(defineProps<Props>(), {});

const { defaultDate, events } = toRefs(props);

// 当前显示日期
const showMonthDate = ref<Dayjs | ConfigType>(unref(defaultDate) || dayjs());
// 星期数组
const weeks = ref(WEEKS || []);
// 获取当前月份周数组
const monthWeeks = ref(getMonthByDay(showMonthDate.value));

// 日期容器实例
const bodyRef = ref<Element>();
// 事件位置样式数组
const eventPositionMap = ref<{ [key: string]: any }[]>([]);
// 当前月份各周事件数组
const monthWeekEvents: any = ref([]);

// 显示格式化日期
const formatShowMonthDate = computed(() => {
  const year = dayjs(unref(showMonthDate)).year();
  const month = dayjs(unref(showMonthDate)).month() + 1;

  return `${year}年${month < 10 ? `0${month}` : month}月`;
});

// 获取当前月份事件
const getMonthEvents = () => {
  const bodyWidth = (unref(bodyRef)?.clientWidth || 364) / 7;
  const bodyHeight = (unref(bodyRef)?.clientHeight || 364) / 6;

  const monthEvents = filter(unref(events), (e: EventItemProps) => {
    /**
     * 日期范围当月内或当月在日期范围内
     * 1. startAt 在当月范围内
     * 2. endAt 在当月范围内
     * 3. 本月在 startAt - endAt 范围内
     */
    if (unref(monthWeeks)) {
      return (
        (dateIsSameOrBefore(unref(monthWeeks)[0][0], e?.startAt) &&
          dateIsSameOrBefore(e?.startAt, unref(monthWeeks)[5]?.[6])) ||
        (dateIsSameOrBefore(unref(monthWeeks)[0][0], e?.endAt) &&
          dateIsSameOrBefore(e?.endAt, unref(monthWeeks)[5]?.[6])) ||
        (dateIsSameOrBefore(e?.startAt, unref(monthWeeks)[0][0]) &&
          dateIsSameOrBefore(unref(monthWeeks)[5]?.[6], e?.endAt))
      );
    }
    return false;
  });

  forEach(unref(monthWeeks), (week, weekIndex) => {
    unref(monthWeekEvents)[weekIndex] = [];
    unref(eventPositionMap)[weekIndex] = {};

    /**
     * 过滤本周范围内的事件
     * 1. startAt 在本周范围内
     * 2. endAt 在本周范围内
     * 3. 本周在 startAt - endAt 范围内
     */
    const weekEvents = filter(monthEvents, (e: EventItemProps) => {
      return (
        (dateIsSameOrBefore(week[0], e?.startAt) &&
          dateIsSameOrBefore(e?.startAt, week[6])) ||
        (dateIsSameOrBefore(week[0], e?.endAt) &&
          dateIsSameOrBefore(e?.endAt, week[6])) ||
        (dateIsSameOrBefore(e?.startAt, week[0]) &&
          dateIsSameOrBefore(week[6], e?.endAt))
      );
    });

    const newEvents = [...weekEvents];

    forEach(week, (day, dayIndex) => {
      let eventIndex = 0;

      forEach(newEvents, (weekEvent: any, i: number) => {
        // 事件日期是否包含当前 day 日期
        if (
          dateIsSameOrBefore(weekEvent?.startAt, day) &&
          dateIsSameOrBefore(day, weekEvent?.endAt)
        ) {
          const key = getEventKey(weekEvent);

          const startAt = dateIsSameOrBefore(weekEvent?.startAt, week[0])
            ? dayjs(week[0])
            : dayjs(weekEvent?.startAt);
          const endAt = dateIsSameOrBefore(week[6], weekEvent?.endAt)
            ? dayjs(week[6])
            : dayjs(weekEvent?.endAt);

          // 时分可能导致 diff 计算问题
          const diff = dayjs(formatDate(endAt)).diff(
            dayjs(formatDate(startAt)),
            'd'
          );

          if (!unref(eventPositionMap)[weekIndex][key]) {
            unref(monthWeekEvents)[weekIndex].push(weekEvent);
          }

          const topCount = unref(monthWeekEvents)[weekIndex].reduce(
            (acc: number, e: EventItemProps) => {
              if (
                (dateIsBefore(e?.startAt, weekEvent.startAt, 'm') &&
                  dateIsSameOrBefore(weekEvent.startAt, e?.endAt)) ||
                (dateIsSameOrBefore(e?.startAt, weekEvent.startAt, 'm') &&
                  dateIsSame(e?.startAt, weekEvent.startAt, 'd')) ||
                (dateIsSameOrBefore(e?.startAt, weekEvent.startAt, 'm') &&
                  dateIsSameOrBefore(weekEvent.startAt, e?.endAt, 'm'))
              ) {
                // eslint-disable-next-line no-param-reassign
                acc += 1;
              }

              return acc;
            },
            0
          );

          const top = `${topCount * 16 + 22}px`;

          if (
            (topCount + 1) * 16 + 22 < bodyHeight &&
            !eventPositionMap.value[weekIndex][key]
          ) {
            eventPositionMap.value[weekIndex][key] = {
              width: `${bodyWidth * (diff + 1)}px`,
              height: '16px',
              left: `${bodyWidth * dayIndex - 1}px`,
              top
            };
          }

          weekEvents.splice(i - eventIndex, 1);
          eventIndex += 1;
        }
      });
    });
  });
};

watchEffect(() => {
  monthWeeks.value = getMonthByDay(showMonthDate.value);
  getMonthEvents();
});
</script>
