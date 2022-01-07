<template>
  <div class="message">{{ msg }}</div>

  <button type="button" @click="increment">同步 count is: {{ store.state.count }}</button>
  <button type="button" @click="incrementAction">异步 count is: {{ store.state.count }}</button>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useStore } from '../store';

defineProps<{ msg: string }>();

const store = useStore();

const increment = () => {
  store.commit('increment');
}

const incrementAction = () => {
  store.dispatch('incrementAction');
}

const count = ref(0);
</script>

<style lang="scss" scoped>
  $msg-size: 28px;

  .message {
    font-size: $msg-size;
    font-weight: 700;
  }
</style>
