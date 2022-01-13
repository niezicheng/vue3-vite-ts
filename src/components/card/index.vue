<template>
  <div style="position: relative">
    <div v-if="ranking === 1" class="card-ranking">🏆</div>
    <div v-if="ranking === 2" class="card-ranking">🏆</div>
    <div v-if="ranking === 3" class="card-ranking">🏆</div>
    <NGrid id="grid-card" class="card">
      <NGridItem class="card-left" :span="mixed ? 1 : 3">
        <div v-if="!!!slots?.avatar" class="card-left-avatar">
          {{ avatar }}
        </div>
        <slot name="avatar" :data="data"></slot>
        <div class="card-left-name">{{ data?.name }}</div>
      </NGridItem>
      <NGridItem
        :class="['card-body', mixed ? 'card-body-mixed' : '']"
        :span="mixed ? 22 : 17"
      >
        <slot
          name="body"
          :members="data?.members"
          :totalTime="totalTime"
        ></slot>
        <template v-if="!!!slots?.body">
          <div
            v-for="(member, index) in data?.members"
            :key="index"
            class="card-body-item"
            :style="{
              marginTop: index === 0 ? 0 : 12,
              width: `${(100 * (member?.workHours ?? 0)) / 15}%`
            }"
          >
            <span class="card-body-item-name">{{ member?.name }}</span>
            <span class="card-body-item-hours">{{ member?.workHours }}</span>
          </div>
        </template>
      </NGridItem>
      <NGridItem
        class="card-right"
        :span="mixed ? 1 : 4"
        :style="{ alignItems: mixed ? 'center' : 'end' }"
      >
        <slot name="cardRight" :totalTime="totalTime"></slot>
        <span v-if="!!!slots?.cardRight" class="card-right-title"
          >{{ data?.name }} 消耗工时</span
        >
        <span v-if="!!!slots?.cardRight" class="card-right-hours-rate">{{
          `${data?.consumeTime}/${totalTime}`
        }}</span>
      </NGridItem>
    </NGrid>
  </div>
</template>

<script lang="ts" setup>
import { withDefaults, toRefs, computed, unref, useSlots } from 'vue';
import { NGrid, NGridItem } from 'naive-ui';
import { CardDataItem } from './interface';

type Props = {
  data: CardDataItem;
  totalTime: number;
  ranking?: number;
  mixed?: boolean;
};

const props = withDefaults(defineProps<Props>(), {
  mixed: false,
  ranking: 0
});

const { data, ranking } = toRefs(props);

const slots = useSlots();

const avatar = computed(() => props.data?.name.slice(0, 1).toUpperCase());

const hoursRateStyle = computed(() => {
  const style = { fontWeight: 200 };
  switch (unref(ranking)) {
    case 1:
      style.fontWeight = 700;
      break;
    case 2:
      style.fontWeight = 600;
      break;
    default:
      style.fontWeight = 400;
      break;
  }

  return style;
});
</script>

<style lang="scss" scoped>
.card {
  padding: 12px 16px;
  box-shadow: 0 4px 12px 0 rgba(23, 24, 26, 0.16);
  font-family: PingFangSC-Medium;
  font-size: 16px;
  color: #ffffff;
  box-sizing: border-box;

  &-left {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    &-avatar {
      width: 72px;
      height: 72px;
      line-height: 72px;
      background-color: #fed616;
      border-radius: 36px;
      font-size: 24px;
      letter-spacing: 0;
      text-align: center;
    }

    &-name {
      color: #000000;
      letter-spacing: 0;
      text-align: center;
    }
  }

  &-body {
    padding-left: 2px;
    &-mixed {
      display: flex;
      flex-direction: row;
      align-items: center;
      margin: 0 24px;
    }

    &-item {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 40px;
      border-radius: 20px;
      background-color: #8ebdf6;
      margin-top: 12px;
      padding: 0 24px;

      &-name {
        letter-spacing: 0;
        line-height: 24px;
      }
      &-hours {
        font-family: Roboto-BoldCondensedItalic;
        font-size: 24px;
        letter-spacing: 0;
        text-align: right;
        line-height: 28px;
      }
    }
  }

  &-right {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-end;

    &-title {
      font-family: PingFangSC-Regular;
      color: #515559;
      letter-spacing: 0;
      text-align: right;
      line-height: 24px;
    }

    &-hours-rate {
      font-family: Roboto-BoldCondensedItalic;
      font-size: 32px;
      color: #cd3812;
      letter-spacing: 0;
      text-align: right;
      font-weight: v-bind('hoursRateStyle.fontWeight');
    }
  }

  &-ranking {
    width: 20px;
    height: 20px;
    position: absolute;
    top: -10px;
    left: -10px;
  }
}
</style>
