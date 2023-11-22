<script setup>
import request from '@/axios/request';
import { onMounted, ref } from 'vue';
import { MyMessage } from '@/plugins/Message';

const props = defineProps({
    bid: String,
})
const bid = ref(props.bid)
const book = ref({
    cover: null,
})

onMounted(() => {
    getBookData()
})

const getBookData = () => {
    request.get(`/book/${bid.value}`)
        .then(res => {
            book.value = res.data
        }).catch(error => {
            MyMessage(error.data.msg, 'error')
        })
}
</script>
<template>
    <div id="main">
        <div class="cover">
            <img :src="book.cover" alt="" srcset="">
        </div>
        <div class="info">
            <div class="titie">
                <h1>
                    {{ book.bname }}
                </h1>
            </div>
            <div class="book-meta">
                <span>{{ book.aname }} 著</span>
                <p>更新时间：{{ book.updateTime }}</p>
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
                    {{ book.intro }}
                </template>
            </n-ellipsis>
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
}

#main .info {
    flex: 1;
    flex: 1;
    font-size: 14px;
    line-height: 20px;
    overflow: hidden;
    position: relative;
}

#main .info h1 {
    color: #333;
    font-size: 26px;
    font-weight: 500;
    line-height: 36px;
    margin: 0 12px 12px 0;
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
}

#main .info .book-last-chapter {
    color: #666;
    font-size: 16px;
    margin-bottom: 20px;
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
.n-ellipsis.n-ellipsis--cursor-pointer::after{
    background-color: #fff;
    bottom: 0;
    color: #0bafff;
    content: attr(data-txt);
    position: absolute;
    right: 0;
    width: 30px;
}
</style>