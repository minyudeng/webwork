<script setup>
import request from '@/axios/request';
import { onMounted, ref } from 'vue';
import { MyMessage } from '@/plugins/Message';
import { useStore } from 'vuex';

const props = defineProps({
    bid: String,
})
const store = useStore()
const bid = ref(props.bid)
const isCollection = ref()
const book = ref({
    cover: null,
})

onMounted(() => {
    getBookData()
    getCollectionStatus()
})
const getBookData = () => {
    request.get(`/book/${bid.value}`)
        .then(res => {
            book.value = res.data
            document.title = book.value.bname
        }).catch(error => {
            MyMessage(error.data.msg, 'error')
        })
}
const getCollectionStatus = () => {
    request.get('/book/is-collection', {
        params: {
            bid: bid.value,
            uid: store.getters.getUserId
        }
    }).then(res => {
        isCollection.value = res.data
    }).catch(error => {
    })
}
const changeCollectionStatus = () => {
    request.put('/book/collection', null, {
        params: {
            bid: bid.value,
            uid: store.getters.getUserId
        }
    }).then(res => {
        MyMessage(res.msg, 'success')
        getCollectionStatus()
        getBookData()
    }).catch(error => {
        MyMessage(error.data.msg, 'success')
    })
}
</script>
<template>
    <div id="main">
        <div class="cover">
            <img :src="book.cover" alt="" srcset="">
            <div class="status" :class="{
                'ing': book.status === '连载中',
                'end': book.status === '已完结'
            }">
                {{ book.status }}
            </div>
        </div>
        <div class="info">
            <div class="titie">
                <h1>
                    {{ book.bname }}
                </h1>
                <n-rate readonly :value="book.rating/2" allow-half/>
                <p>{{ book.rating }}</p>
            </div>
            <div class="book-meta">
                <span>{{ book.aname }} 著</span>
                <p>更新时间：{{ book.updateTime }}</p>
                <p>收藏：{{ book.numOfCollection }}</p>
            </div>
            <div class="book-last-chapter">
                <span>最新章节：</span>
            </div>
            <div class="book-types">
                <span class="type" v-for="(item, index) in book.typeList" :key="index">
                    {{ item.type }}
                </span>
            </div>
            <n-ellipsis data-txt="展开" expand-trigger="click" line-clamp="2" :tooltip="false">
                <template #default>
                    <p style="white-space: pre-line;">{{ book.intro }}</p>
                </template>
            </n-ellipsis>
            <div class="btns">
                <n-button v-if="isCollection" @click="changeCollectionStatus" color="rgba(11,175,255,.1)">
                    取消收藏
                </n-button>
                <n-button v-else @click="changeCollectionStatus" color="rgba(11,175,255,.1)">
                    加入书架
                </n-button>
                <n-button color="#0bafff">
                    开始阅读
                </n-button>
            </div>
        </div>
    </div>
</template>
<style scoped>
#main {
    position: relative;
    width: 1200px;
    margin: 0px auto;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
}

#main .cover {
    background: #f5f5f7;
    border: 1px solid rgba(0, 0, 0, .08);
    border-radius: 6px;
    height: 228px;
    margin-right: 40px;
    overflow: hidden;
    position: relative;
    width: 170px;
}

#main .cover img {
    vertical-align: middle;
    width: 100%;
    transition: transform 0.5s ease-in-out;
}
#main .cover img:hover{
    transform: scale(1.1); 
}

#main .cover .status {
    border-radius: 0 0 6px 0;
    font-size: 12px;
    font-weight: 500;
    height: 18px;
    left: 0;
    line-height: 18px;
    padding: 0 4px;
    position: absolute;
    text-align: center;
    top: 0;
}

#main .cover .ing {
    background-color: rgba(128, 198, 242, 0.5);
}

#main .cover .end {
    background-color: #57595a83;
}

#main .info {
    flex: 1;
    font-size: 14px;
    line-height: 20px;
    overflow: hidden;
    position: relative;
}
#main .info .titie{
    display: flex;
    align-items: center;
}
#main .info .titie .n-rate{
    margin-left: 150px;
    margin-right: 10px;
}
#main .info .titie p{
    margin-top: 3px;
    color: #334;
    font-size: 20px;
    cursor: default;
}

#main .info h1 {
    color: #333;
    font-size: 26px;
    font-weight: 500;
    line-height: 36px;
    margin: 0 12px 12px 0;
    cursor: default;
}

#main .info .book-meta {
    display: flex;
    margin-bottom: 12px;
}

#main .info .book-meta span {
    color: #0bafff;
    margin-right: 12px;
    cursor: pointer;
}

#main .info .book-meta p {
    color: #666;
    margin-right: 12px;
    cursor: default;
}

#main .info .book-last-chapter {
    color: #666;
    font-size: 16px;
    margin-bottom: 20px;
    cursor: default;
}

#main .info .book-types {
    display: flex;
    font-size: 12px;
    line-height: 16px;
    margin-bottom: 15px;
}

#main .info .book-types .type {
    background: rgba(51, 51, 51, .06);
    border-radius: 4px;
    color: #666;
    margin-right: 6px;
    padding: 6px;
    cursor: pointer;
}

.n-ellipsis.n-ellipsis--cursor-pointer {
    position: relative;
    font-size: 14px;
    line-height: 24px;
    width: 640px;
}

.n-ellipsis.n-ellipsis--cursor-pointer::after {
    background-color: #fff;
    bottom: 0;
    color: #0bafff;
    content: attr(data-txt);
    position: absolute;
    right: 0;
    width: 30px;
}

#main .info .btns {
    display: flex;
    margin-top: 14px;
}

#main .info .btns .n-button {
    width: 134px;
    margin-right: 20px;
    border-radius: 22px;
    font-size: 16px;
    height: 44px;
    line-height: 44px;
    padding: 0 20px;
}

#main .info .btns .n-button:first-of-type {
    color: #0bafff;
}

#main .info .btns .n-button:last-of-type {
    color: #fff;
}</style>