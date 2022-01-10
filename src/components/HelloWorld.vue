<template>
  <div class="message">{{ msg }}</div>

  <NButton @click="increment">同步 count is: {{ store.state.count }}</NButton>
  <NButton @click="incrementAction">
    异步 count is: {{ store.state.count }}
  </NButton>
</template>

<script setup lang="ts">
import { useStore } from '../store';

defineProps<{ msg: string }>();

const store = useStore();

const increment = () => {
  store.commit('increment');
};

const incrementAction = () => {
  store.dispatch('incrementAction');
};
</script>

<style lang="scss" scoped>
$msg-size: 28px;

.message {
  font-size: $msg-size;
  font-weight: 700;
}
</style>
