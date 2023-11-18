<template>
    排行榜
</template>
<script setup>
import { onMounted } from 'vue';
import { useStore } from 'vuex';

const store = useStore()
onMounted(() =>{
    document.title = '排行榜'
    store.dispatch("setIndex",'4')
})
</script>