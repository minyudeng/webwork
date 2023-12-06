<script setup>
import TypesCmpt from '@/components/Types/TypesCpt.vue'
import { onMounted, ref } from 'vue';
import { useStore } from 'vuex';

const store = useStore()
onMounted(() => {
    document.title = '分类'
    store.dispatch("setIndex", '2')
})
</script>
<template>
    <div id="main" >
        <TypesCmpt />
    </div>
    <n-back-top :bottom="200" :visibility-height="10">
    <div
      style="
        width: 100px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        font-size: 14px;
        background-color: #ffffff93;
      "
    >
      回到顶部
    </div>
  </n-back-top>
</template>
<style scoped>
#main {
    width: 1200px;
    min-width: 1200px;
    margin: 40px auto;
    display: flex;
    flex-direction: column;
}
</style>
