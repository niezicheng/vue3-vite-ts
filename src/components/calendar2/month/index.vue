<template>
  <div class="month">
    <!-- header -->
    <div class="month-week">
      <div
        v-for="(week, index) in weeks"
        :key="index"
        class="month-week-column"
      >
        {{ week }}
      </div>
    </div>
    <!-- body -->
    <div ref="bodyRef" class="month-body">
      <!-- 周 -->
      <div
        v-for="(week, weekIndex) in monthWeeks"
        :key="`week-${weekIndex}`"
        class="month-body-week"
      >
        <!-- 日 -->
        <div
          v-for="(date, dayIndex) in week"
          :key="dayIndex"
          :class="['month-body-day', isOffDay(date) ? 'off-day' : '']"
        >
          <div class="month-body-day-header">
            <span class="lunarDay">{{ getLunarDay(date) }}</span>
            <div
              :class="[
                dateIsSame(date, currentDate, 'M') && !isOffDay(date)
                  ? 'day'
                  : 'other-day'
              ]"
            >
              <span :class="[dateIsSame(date, dayjs()) ? 'today' : '']">{{
                getDay(date)
              }}</span>
              <span>日</span>
            </div>
          </div>
          <div v-for="(event, key) in eventsMap" :key="key">
            <template v-if="dateIsSame(date, event?.time)">
              <div
                v-for="(hour, index) in event?.workHours"
                :key="index"
                class="day-event"
                :style="[
                  {
                    top: event?.top,
                    backgroundColor: event?.bgColor,
                    width: `${measureRef?.width}px`,
                    left: `${measureRef?.width * (hour?.workId - 1)}px`
                  },
                  hour?.start
                    ? {
                        borderLeftWidth: '4px',
                        borderLeftColor: event?.prefixColor
                      }
                    : {}
                ]"
              >
                {{ hour?.start ? event?.name : '' }}
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
/* eslint-disable vue/require-default-prop */
import { ref, unref, watchEffect, withDefaults, toRefs, onMounted } from 'vue';
import { forEach, cloneDeep, sortBy } from 'lodash-es';
import dayjs, { Dayjs, ConfigType } from 'dayjs';
import {
  WEEKS,
  getMonthByDay,
  getDay,
  getLunarDay,
  dateIsSame,
  isOffDay
} from '../utils';
import {
  EventItem,
  WeekEvent,
  DayEvent,
  SortEventKey,
  EventsMapItem
} from '../interface';
import './style.scss';

interface Props {
  // 当前日期
  currentDate?: Dayjs | ConfigType;
  // 事件数组
  events: Array<EventItem>;
  // 事件展示排序
  sortEventKey?: SortEventKey;
}

const props = withDefaults(defineProps<Props>(), {
  sortEventKey: 'id'
});

const { events, sortEventKey } = toRefs(props);

// 星期数组
const weeks = ref(WEEKS || []);
// 获取当前月份周数组
const monthWeeks = ref(getMonthByDay(props?.currentDate));

// 日期容器实例
const bodyRef = ref<Element>();
// 尺寸对象
const measureRef = ref<{ width: number; height: number }>({
  width: 185 / 3, // 工时宽度
  height: 141 // 日期（天）容器高度
});

// 事件位置样式数组
const eventsMap = ref<Array<EventsMapItem>>([]);

onMounted(() => {
  const monthWeeksLength = monthWeeks.value?.length || 6;
  measureRef.value = {
    width: (unref(bodyRef)?.clientWidth || 1296) / 7 / 3,
    height: (unref(bodyRef)?.clientHeight || 846) / monthWeeksLength
  };
});

// 获取当前月份事件
const getMonthEvents = () => {
  // 展示事件排序
  const sortEvents = sortBy(
    events.value,
    (event: EventItem) => event?.[sortEventKey.value]
  );

  eventsMap.value = [];
  forEach(sortEvents, (event: EventItem, i: number) => {
    forEach(event?.monthWeeks, (weekEvent: WeekEvent, weekIndex: number) => {
      forEach(weekEvent?.weekDays, (dayEvent: DayEvent, dayIndex: number) => {
        const cloneDayEvent = cloneDeep(dayEvent);
        // 处理事件当月首个工时显示名称
        if (
          weekIndex === 0 &&
          dayIndex === 0 &&
          cloneDayEvent?.workHours &&
          cloneDayEvent?.workHours?.length
        ) {
          cloneDayEvent.workHours[0].start = true;
        }

        const top = `${(i + 1) * 16 + 22}px`;
        if ((i + 2) * 16 + 22 < measureRef.value.height) {
          eventsMap.value?.push({
            top,
            name: event?.name,
            bgColor: event?.bgColor,
            prefixColor: event?.prefixColor,
            ...cloneDayEvent
          });
        }
      });
    });
  });
};

watchEffect(() => {
  monthWeeks.value = getMonthByDay(props?.currentDate);
  getMonthEvents();
});
</script>
