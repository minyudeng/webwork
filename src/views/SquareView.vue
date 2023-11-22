<template>
  <div class="square">
    <h1>This is an SquareView page</h1>
  </div>
</template>
<script setup>
import { onMounted } from 'vue';
import { useStore } from 'vuex';
const store = useStore()
onMounted(()=>{
  document.title = '书单广场'
    store.dispatch("setIndex",'3')
})
</script>
