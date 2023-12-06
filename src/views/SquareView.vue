<script setup>
import Square from '@/components/Square/Square.vue'
import { onMounted } from 'vue';
import { useStore } from 'vuex';
const store = useStore()
onMounted(()=>{
  document.title = '书单广场'
    store.dispatch("setIndex",'3')
})
</script>
<template>
  <div class="square">
    <Square />
  </div>
</template>
<style scoped>
.square{
  width: 1200px;
  min-width: 1200px;
  max-width: 1200px;
  margin: 20px auto;
}
</style>
