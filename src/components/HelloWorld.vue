<template>
  <h1>{{ msg }}</h1>

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

<style scoped>
</style>
