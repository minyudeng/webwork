<script setup>
import Detail from '@/components/Book/Detail.vue'
import Comment from '@/components/Book/BookComment.vue';
import Other from '@/components/Book/Other.vue'
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
        <div id="cantain">
            <div style="width: 1200px;margin: 0 auto;display: flex;">
                <div class="left">
                    <Comment :bid="bid"/>
                </div>
                <div class="right">
                    <Other :bid="bid"/>
                </div>
            </div>
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
#cantain{
    padding: 30px 0;
    width: 100vw;
    min-width: 1200px;
    background: linear-gradient(180deg, rgba(236, 244, 249, 0) 0%, #ECF4F9 100%);
}
#cantain .left{
    margin-right: 40px;
    position: relative;
    width: 850px;
}
#cantain .right{
    width: 310px;
}
</style>