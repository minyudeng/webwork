<script setup>
import TypesCmpt from '@/components/Types/TypesCpt.vue'
import { onMounted } from 'vue';
import { useStore } from 'vuex';

const store = useStore()
onMounted(() => {
    document.title = '分类'
    store.dispatch("setIndex", '2')
})

</script>
<template>
    <div id="main">
        <TypesCmpt />
    </div>
</template>
<style scoped>
#main {
    width: 1200px;
    min-width: 1200px;
    margin: 40px auto;
    display: flex;
    flex-direction: row;
}
</style>
