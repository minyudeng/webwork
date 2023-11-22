<template>
    这是分类
</template>
<script setup>
import { inject, onBeforeMount, onMounted } from 'vue';
import { useStore } from 'vuex';

const store = useStore()
onMounted(()=>{
    document.title = '分类'
    store.dispatch("setIndex",'2')
})
</script>