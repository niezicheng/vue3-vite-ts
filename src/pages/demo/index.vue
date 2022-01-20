<template>
  <Checkbox :checked="checked" @update:checked="handleUpdate"> </Checkbox>
  <Checkbox
    v-model:checked="checked"
    avatar="http://pic1.zhimg.com/v2-cda469e0afc9b0376b4ce69d79601bbe_1440w.jpg"
  >
  </Checkbox>

  <CheckboxGroup
    :value="value"
    :options="options"
    :max="3"
    @update:value="updateValue"
  ></CheckboxGroup>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Checkbox from '@/components/checkbox/index.vue';
import CheckboxGroup from '@/components/checkbox-group/index.vue';

const checked = ref<boolean>(false);

const value = ref<Array<string | number>>(['1111']);

const handleUpdate = (val: boolean) => {
  console.log(val);
  checked.value = val;
};

const updateValue = (val: Array<string | number>) => {
  console.log(val);
  value.value = val;
};

const options = [
  {
    label: '1111'
  },
  {
    label: '22222'
  },
  {
    label: 'avatar',
    avatar:
      'http://pic1.zhimg.com/v2-cda469e0afc9b0376b4ce69d79601bbe_1440w.jpg'
  },
  {
    label: '3333'
  }
];
</script>
