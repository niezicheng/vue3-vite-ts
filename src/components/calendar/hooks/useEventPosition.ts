import { ref, onMounted } from 'vue';

export default () => {
  const bodyRef = ref(null);

  onMounted(() => {
    console.log(bodyRef.value, '-------');
  });

  return {
    bodyRef
  };
};
