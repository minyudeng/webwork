<template>
    这是分类
</template>
<script setup>
import { inject, onBeforeMount, onMounted } from 'vue';
import { useStore } from 'vuex';

const store = useStore()
onMounted(()=>{
    store.dispatch("setIndex",'2')
})
</script>