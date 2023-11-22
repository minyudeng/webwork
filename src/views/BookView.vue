<script setup>
import Detail from '@/components/Book/Detail.vue'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
onMounted(() => {

})

const bid = ref(router.currentRoute._rawValue.params.id)
</script>
<template>
    <div id="main">
        <div id="detail">
            <Detail :bid="bid" />
        </div>
        
    </div>
</template>
<style scoped>
#main {
    display: flex;
    flex-wrap: wrap;
}

#detail {
    padding-top: 20px;
    padding-bottom: 40px;
    width: 100vw;
    min-width: 1200px;
    background: linear-gradient(180deg, #ECF4F9 0%, rgba(236, 244, 249, 0) 100%);
}
</style>