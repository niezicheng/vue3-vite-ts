<template>
  <PageHeader sub-title="Design department" separate="-">
    <template #title>Working hours</template>
  </PageHeader>
  <div style="padding: 12px">
    <Header v-model:dateValue="range" :total-time="cardData?.totalTime">
      <template #headerLeft>
        <n-select
          v-model:value="select"
          :options="options"
          style="width: 273px; margin-left: 24px"
        />
      </template>
    </Header>
    <NSpace vertical :size="32">
      <Card
        v-for="(card, index) in cardData?.data"
        :key="index"
        :data="card"
        :total-time="cardData?.totalTime"
        mixed
      >
        <template #avatar></template>
        <template #body="{ members = [], totalTime }">
          <div
            v-for="(member, key) in members"
            :key="key"
            class="card-body-item"
            :style="{
              backgroundColor: member?.color,
              width: `${(
                ((member?.occupyHours ?? 0) * 100) /
                totalTime
              ).toFixed(2)}%`,
              borderBottomLeftRadius: key === 0 ? '24px' : 0,
              borderTopRightRadius: key === members?.length - 1 ? '24px' : 0
            }"
          >
            <div
              v-if="key === 0"
              class="card-body-item-radius"
              :style="{
                backgroundColor: member?.color,
                left: '-10px'
              }"
            ></div>
            <div
              v-if="key === members?.length - 1"
              class="card-body-item-radius"
              :style="{
                backgroundColor: member?.color,
                right: '-10px'
              }"
            ></div>
            <div :style="{ transform: 'skewX(30deg)' }">
              {{ member?.name }}
            </div>
            <div :style="{ transform: 'skewX(30deg)' }">
              {{ member?.occupyHours }}
            </div>
          </div>
        </template>
        <template #cardRight="{ totalTime }">
          <div class="total-time">{{ totalTime }}</div>
        </template>
      </Card>
    </NSpace>
  </div>
</template>

<script setup lang="ts">
import { ref, unref, watchEffect } from 'vue';
import { NSpace, NSelect } from 'naive-ui';
import Card from '@/components/card/index.vue';
import Header from '@/components/header/index.vue';
import PageHeader from '@/components/pageHeader/index.vue';
import { cardData } from './data';

const range = ref();
const select = ref();

const options = ref([
  {
    label: 'PD',
    value: 'pd'
  },
  {
    label: 'Project',
    value: 'project'
  }
]);

watchEffect(() => {
  console.log('range', unref(range));
});
</script>

<style lang="scss" scoped>
.total-time {
  font-family: Roboto-BoldCondensedItalic;
  font-size: 32px;
  color: #cd3812;
  letter-spacing: 0;
  text-align: right;
  font-weight: 700;
}

.card-body-item {
  position: relative;
  height: 40px;
  padding: 0 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transform: skewX(-30deg);
  box-sizing: border-box;

  &-radius {
    position: absolute;
    top: 0;
    width: 48px;
    height: 40px;
    border-radius: 50%;
    transform: skewX(30deg);
  }
}
</style>
