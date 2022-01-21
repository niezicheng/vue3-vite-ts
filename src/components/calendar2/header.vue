<template>
  <div class="header">
    <NSpace align="center">
      <div class="header-date">{{ formatDate }}</div>
      <NButton @click="emits('update:date', dayjs(date).subtract(1, 'M'))"
        >&lt;</NButton
      >
      <NButton @click="emits('update:date', dayjs(date).add(1, 'M'))"
        >&gt;</NButton
      >
      <NButton @click="emits('update:date', dayjs())">今天</NButton>
    </NSpace>
  </div>
</template>

<script setup lang="ts">
/* eslint-disable vue/require-default-prop */
import { withDefaults, unref, computed } from 'vue';
import { NButton, NSpace } from 'naive-ui';
import dayjs, { Dayjs, ConfigType } from 'dayjs';

interface Props {
  date?: Dayjs | ConfigType;
}

const props = withDefaults(defineProps<Props>(), {});

const emits = defineEmits(['update:date']);

// 显示格式化日期
const formatDate = computed(() => {
  const year = dayjs(unref(props.date)).year();
  const month = dayjs(unref(props.date)).month() + 1;

  return `${year}年${month < 10 ? `0${month}` : month}月`;
});
</script>

<style scoped lang="scss">
.header {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  &-date {
    width: 90px;
    font-family: PingFangSC-Medium;
    font-size: 16px;
    color: #17181a;
    letter-spacing: 0;
  }
}
</style>
