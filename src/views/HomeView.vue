<script setup>
import Carsousel from '@/components/Home/Carsousel.vue';
import { onMounted } from 'vue';
import { useStore } from 'vuex';

const store = useStore()
onMounted(()=>{
  store.dispatch("setIndex",'1')
})
</script>
<template>
    <div id="main">
      <Carsousel />
    </div>
</template>
<style scoped>
#main {
  display: flex;
  flex-direction: column;
}
</style>

