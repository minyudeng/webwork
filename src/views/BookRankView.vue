<script setup>
import CollectionRank from '@/components/BankRank/CollectionRank.vue'
import RateRank from '@/components/BankRank/RateRank.vue';
import { onMounted, ref } from 'vue';
import { useStore } from 'vuex';

const store = useStore()
onMounted(() => {
    document.title = '排行榜'
    store.dispatch("setIndex", '4')
})
//index
const activeIndex = ref(1)
const selectIndex = (index) => {
    activeIndex.value = index
}

</script>
<template>
    <div id="main">
        <div class="left">
            <p>排行榜</p>
            <span :class="{ active: activeIndex == 1 }" @click="selectIndex(1)">
                收藏榜
            </span>
            <span :class="{ active: activeIndex == 2 }" @click="selectIndex(2)">
                评分榜
            </span>
        </div>
        <div class="right">
            <div v-if="activeIndex === 1">
                <CollectionRank />
            </div>
            <div v-if="activeIndex === 2">
                <RateRank />
            </div>
        </div>
    </div>
</template>
<style scoped>
#main {
    width: 1200px;
    height: 100px;
    margin: 0 auto;
    margin-top: 64px;
    display: flex;
}

#main .left {
    margin-right: 48px;
    position: fixed;
    font-size: 14px;
    width: 160px;
    text-align: center;
    border-right: .5px solid hsla(0, 0%, 85%, .5);
}

#main .left p {
    font-weight: 500;
    line-height: 40px;
}

#main .left span {
    color: #b2b2b2;
    display: block;
    line-height: 40px;
    transition: all 0.3s ease-in-out;
    cursor: pointer;
}

#main .left span.active {
    background-color: rgba(11, 175, 255, .1);
    border-right: 2px solid #0bafff;
    color: #0bafff;
    display: block;
    line-height: 40px;
}
#main .right{
    margin-bottom: 40px;
    margin-left: 208px;
    width: calc(100% - 208px);
}
</style>