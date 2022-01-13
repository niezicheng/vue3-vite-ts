<template>
  <div style="position: relative">
    <div v-if="ranking === 1" class="card-ranking">🏆</div>
    <div v-if="ranking === 2" class="card-ranking">🏆</div>
    <div v-if="ranking === 3" class="card-ranking">🏆</div>
    <NGrid class="card" v-bind="gridProps">
      <NGridItem class="card-left" :span="3" v-bind="leftGridItemProps">
        <NAvatar
          v-if="showAvatar && data?.avatar"
          round
          :src="data?.avatar"
          :size="72"
          v-bind="avatarProps"
        ></NAvatar>
        <NAvatar
          v-else-if="showAvatar"
          class="card-left-avatar"
          round
          :size="72"
          :color="data?.avatarColor || '#DFCFBC'"
          v-bind="avatarProps"
        >
          <slot name="avatar" v-bind="data">{{ avatar }}</slot>
        </NAvatar>
        <slot name="avatar" :data="data"></slot>
        <div class="card-left-name">{{ data?.name }}</div>
      </NGridItem>
      <NGridItem class="card-body" :span="17" v-bind="bodyGridItemProps">
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
            :style="bodyItemStyle(member, index)"
          >
            <span class="card-body-item-name">{{ member?.name }}</span>
            <span class="card-body-item-hours">{{ member?.workHours }}</span>
          </div>
        </template>
      </NGridItem>
      <NGridItem class="card-right" :span="4" v-bind="rightGridItemProps">
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
/* eslint-disable vue/require-default-prop */
import { withDefaults, toRefs, computed, unref, useSlots } from 'vue';
import type { GridProps, GridItemProps, AvatarProps } from 'naive-ui';
import { NGrid, NGridItem, NAvatar } from 'naive-ui';
import { CardDataItem, MemberType } from './interface';

type CardGrideItemProps = GridItemProps & { style?: any; class?: any };

type Props = {
  data: CardDataItem;
  totalTime: number;
  ranking?: number;
  showAvatar?: boolean;
  gridProps?: GridProps;
  leftGridItemProps?: CardGrideItemProps;
  bodyGridItemProps?: CardGrideItemProps;
  rightGridItemProps?: CardGrideItemProps;
  avatarProps?: AvatarProps;
};

const props = withDefaults(defineProps<Props>(), {
  ranking: 0,
  showAvatar: true
});

const { data, ranking } = toRefs(props);

const slots = useSlots();

const avatar = computed(() => props.data?.name.slice(0, 1).toUpperCase());

/**
 * 卡片 body 每项样式信息
 * @param member 成员信息
 * @param index 索引
 */
const bodyItemStyle = (member: MemberType, index?: number) => {
  const style = {
    marginTop: 12,
    width: `${(100 * (member?.workHours ?? 0)) / 15}%`
  };
  if (index === 0) {
    return { ...style, marginTop: 0 };
  }
  return style;
};

// 依据排行计算字体粗细
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
@use 'sass:math';
$padding: 24px;
$margin: 24px;
$text_size: 16px;

.card {
  padding: math.div($padding, 2) 16px;
  box-shadow: 0 4px math.div($padding, 2) 0 rgba(23, 24, 26, 0.16);
  font-family: PingFangSC-Medium;
  font-size: $text_size;
  color: #ffffff;
  box-sizing: border-box;

  &-left {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    &-avatar {
      font-size: 24px;
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
      margin: 0 $margin;
    }

    &-item {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 40px;
      border-radius: 20px;
      background-color: #8ebdf6;
      margin-top: math.div($margin, 2);
      padding: 0 $padding;

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
      font-size: $text_size * 2;
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
