<script setup>
import request from '@/axios/request';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const store = useStore()
const router = useRouter()
const props = defineProps({
    shelfId: Number
})

onMounted(() => {
    if (props.shelfId === 0) {
        getCollectionBookList()
    } else {
        getBookList()
    }
})
//书籍部分
const shelfId = ref(props.shelfId)
const BookList = ref({})
const getBookList = () => {
    request.get(`/book-shelf/get/${shelfId.value}`)
        .then(res => {
            BookList.value = res.data
        })
}
const getCollectionBookList = () => {
    request.get('/shelf/get/collection', {
        params: {
            'uid': store.getters.getUserId
        }
    }).then(res => {
        BookList.value = res.data
    })
}
//按钮部分
const showBtn = ref(false)
const delBookList = ref([])
const changeShowBtn = () => {
    showBtn.value = showBtn.value === true
        ? false : true
}

const blankBook = (bid) => {
    let routeUrl = router.resolve({
        path: `/book/${bid}`,
        params: { id: bid },
    })
    window.open(routeUrl.href, '_blank')
}
</script>
<template>
    <div id="main">
        <div class="btn">
            <div style="margin-left: 30px;" @click="changeShowBtn">
                <n-button v-if="showBtn" round color="#0bafff">
                    完成
                </n-button>
                <n-button v-else round color="#0bafff">
                    编辑
                </n-button>
            </div>
            <div v-if="showBtn">
                <n-button round color="#0bafff">
                    全选
                </n-button>
                <n-button round color="#fa573e" style="margin-left: 20px;">
                    删除({{ delBookList.length }}本)
                </n-button>
            </div>
        </div>
        <div class="books">
            <div v-for="(item, index) in BookList" class="book">
                <div class="cover" @click="blankBook(item.bid)">
                    <img :src="item.cover" alt="">
                    <div class="status">
                        {{ item.status }}
                    </div>
                </div>
                <div class="name">
                    {{ item.bname }}
                </div>

            </div>
        </div>


    </div>
</template>
<style scoped>
#main {
    padding-top: 20px;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
}

.btn {
    width: 80%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 20px 0;
}

.btn .n-button {
    border-radius: 16px;
    height: 32px;
    line-height: 32px;
    padding: 0 12px;
    width: 80px;
    font-size: 14px;
}

#main .books {
    display: flex;
    flex-wrap: wrap;
    width: 80%
}

#main .books .book {
    cursor: pointer;
    flex-direction: column;
    padding: 16px 15px;
    width: 160px;
    margin: 5px calc((100% - 160px * 5)/5/2);
}

#main .books .book .cover {
    border: 1px solid rgba(0, 0, 0, .08);
    border-radius: 6px;
    height: 173px;
    margin-bottom: 12px;
    overflow: hidden;
    position: relative;
    width: 130px;
}

#main .books .book .cover img {
    vertical-align: middle;
    width: 100%;
    transition: all 0.3s ease;
}

#main .books .book .cover img:hover {
    transform: scale(1.1);
}

#main .books .book .name {
    font-size: 16px;
    font-weight: 500;
    line-height: 22px;
    margin-bottom: 12px;
    max-height: 44px;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-all;
}

#main .books .book .status {
    position: absolute;
    font-size: 12px;
    height: 16px;
    line-height: 16px;
    right: 8px;
    text-align: center;
    top: 0;
    width: 38px;
    border-radius: 0 0 6px 6px;
    background-color: red;
}
</style>