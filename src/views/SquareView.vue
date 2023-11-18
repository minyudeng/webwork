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
    store.dispatch("setIndex",'3')
})
</script>
