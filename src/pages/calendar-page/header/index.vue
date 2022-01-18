<template>
  <div class="header">
    <div v-for="(member, index) in data" :key="index">
      <Avatar
        :name="member?.name"
        :avatar="member?.avatar"
        :checked="member?.checked"
        @change="val => emits('change', val)"
      ></Avatar>
    </div>
  </div>
</template>

<script setup lang="ts">
/* eslint-disable vue/require-default-prop */
import { withDefaults } from 'vue';
import Avatar from './Avatar.vue';
import './style.scss';

interface Member {
  name: string;
  checked?: boolean;
  avatar?: string;
}

type Props = {
  data: Array<Member>;
};

withDefaults(defineProps<Props>(), {});

const emits = defineEmits(['change']);
</script>
