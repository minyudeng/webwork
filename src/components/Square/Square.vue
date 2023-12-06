<script setup>
import request from '@/axios/request';
import { useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import { MyMessage } from '@/plugins/Message';

const router = useRouter()
const store = useStore()

onMounted(() => {
    getShlefList()
})

const loading = ref(true)
const shelfList = ref(null)
const getShlefList = () => {
    request.get('/shelf/get',{params:{
        show : 1
    }})
        .then(res => {
            shelfList.value = res.data
        }).catch(e => {
            console.log(e)
        }).finally(() => {
            loading.value = false
        })
}

const collectionShelf = (shelfId1) => {
    request.putForm('/shelf/collection', {
        'shelfId': shelfId1,
        'uid': store.getters.getUserId
    }).then(res => {
        MyMessage(res.msg, 'success')
    }).catch(e => {
        console.log(e);
    }).finally(() => {
        getShlefList()
    })
}

const blankShelf = (shelfId) => {
    let routeUrl = router.resolve({
        path: `/shelf/${shelfId}`,
        params: { id: shelfId },
    })
    window.open(routeUrl.href, '_blank')
}
</script>

<template>
    <n-gradient-text class="title" gradient="linear-gradient(90deg, red 0%, green 50%, blue 100%)">
        书单广场
    </n-gradient-text>
    <p class="introduction">你想要的好书，一网打尽</p>
    <ul>
        <li class="shelf-list" v-for="(item, index) in shelfList" :key="index" @click="blankShelf(item.shelfId)">
            <n-card hoverable style="cursor:pointer;">
                <template #header>
                    <n-skeleton v-if="loading" text width="60%" />
                    <template v-else>
                        <div style="display: flex;justify-content: space-between;">
                            <div>{{ item.shelfName }}</div>
                            <p style="color: #666;font-size: 14px;">收藏: {{ item.collectionNum }}</p>
                        </div>
                    </template>
                </template>
                <n-skeleton v-if="loading" text :repeat="6" />
                <template v-else>
                    <div class="content">
                        <p>{{ item.intro }}</p>
                        <div @click.stop="collectionShelf(item.shelfId)">
                            <n-button v-if="item.isCollection" type="info">
                                取消收藏
                            </n-button>
                            <n-button v-else type="info">
                                收藏
                            </n-button>
                        </div>
                    </div>
                </template>
            </n-card>
        </li>
    </ul>
</template>

<style scope>
.title {
    font-family: '阿里妈妈东方大楷';
    font-weight: 300;
    margin: 10px 0;
    font-size: 24px;
    cursor: default;
}

.introduction {
    font-family: '阿里妈妈东方大楷';
    font-weight: 300;
    font-size: 18px;
    cursor: default;
}

.shelf-list {
    margin-bottom: 12px;
    padding: 12px 0;
}

.content {
    display: flex;
}

.content p {
    width: 70%;
    color: #666;
    white-space: pre-wrap;
}

.content .n-button {
    width: 100px;
}
</style>