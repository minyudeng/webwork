<script setup>

import request from '@/axios/request';
import { MyConfirmElMessageBox, MyMessage } from '@/plugins/Message';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import qs from 'qs'

const store = useStore()
const router = useRouter()
const props = defineProps({
    shelfId: Number,
    options: Object
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
        }).finally(() => {
            checkBid.value = BookList.value.map(book => book.shelfId)
        })
}
const getCollectionBookList = () => {
    request.get('/shelf/get/collection', {
        params: {
            'uid': store.getters.getUserId
        }
    }).then(res => {
        BookList.value = res.data
    }).finally(() => {
        allBid.value = BookList.value.map(book => book.bid)
    })
}
const delBooks = () => {
    if (checkBid.value.length === 0) {
        MyMessage('至少选择删除一本书', 'warning')
        return
    }
    MyConfirmElMessageBox('你确定要从书架中删除这些书吗', 'warning', () => {
        let list = new Array()
        checkBid.value.forEach((e, i) => list[i] = e)
        console.log(list);
        console.log(typeof (list));
        let param = {
            'shelfId': shelfId.value,
            'uid': store.getters.getUserId,
            'bidList': list
        };
        request.postForm('/book-shelf/del', param)
            .then(res => {
                MyMessage('删除成功', 'success')
                location.reload()
            }).catch(e => {
                console.log(e)
                MyMessage('删除失败', 'error')
            })

        // let queryString = qs.stringify(param, { arrayFormat: 'repeat' })
        // let queryString = JSON.stringify(param)
        // console.log(queryString);
        // request.delete(`/book-shell/del`,{params:param})
        // .then(res => {
        //     MyMessage('删除成功', 'success')
        //     location.reload()
        // }).catch(e => {
        //     console.log(e)
        //     MyMessage('删除失败', 'error')
        // })
    })

}
//按钮部分
const checkAll = ref(false)
const isIndeterminate = ref(true)
const allBid = ref([])
const checkBid = ref([])

const showBtn = ref(false)
const changeShowBtn = () => {
    showBtn.value = showBtn.value === true
        ? false : true
}
const handleCheckedChange = (value) => {
    const checkedCount = value.length
    checkAll.value = checkedCount === BookList.value.length
    isIndeterminate.value = checkedCount > 0 && checkedCount < BookList.value.length
}
const handleCheckAllChange = (val) => {
    checkBid.value = val ? allBid.value : []
    isIndeterminate.value = false
}
const blankBook = (bid) => {
    let routeUrl = router.resolve({
        path: `/book/${bid}`,
        params: { id: bid },
    })
    window.open(routeUrl.href, '_blank')
}
const clickCheck = () => {
    event.stopPropagation()
}
const handleSelect = (key)=>{
    console.log(key,checkBid.value)
    if (checkBid.value.length < 1) {
        MyMessage('至少加入一本书','warning')
        return
    }
    request.postForm('/book-shelf/add',{
        'shelfId' : key,
        'bidList' : checkBid.value
    }).then(res=>{
        MyMessage(res.msg,'success')
    }).catch(e=>{
        MyMessage('添加失败','error')
    })
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
            <div style="height: 32px;" v-if="showBtn">
                <n-dropdown trigger="click" :options="props.options" :show-arrow="true" @select="handleSelect">
                    <n-button round style="width: 100px;margin-right: 20px;">
                        加入到书单
                    </n-button>
                </n-dropdown>

                <n-button round color="#0bafff">
                    <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate" @change="handleCheckAllChange">
                        全选
                    </el-checkbox>
                </n-button>
                <n-button @click="delBooks" round color="#fa573e" style="margin-left: 20px;">
                    删除({{ checkBid.length }}本)
                </n-button>
            </div>
        </div>
        <div class="books">
            <el-checkbox-group style="display: flex;
            flex-wrap: wrap;
            width: 100%" v-model="checkBid" @change="handleCheckedChange">
                <div v-for="(item, index) in BookList" class="book">
                    <div class="cover" @click="blankBook(item.bid)">
                        <img :src="item.cover" alt="">
                        <div class="status">
                            {{ item.status }}
                        </div>
                        <el-checkbox v-if="showBtn" class="check" :label="item.bid" @click="clickCheck">
                            {{ }}
                        </el-checkbox>
                    </div>
                    <div class="name">
                        {{ item.bname }}
                    </div>

                </div>
            </el-checkbox-group>
        </div>
        <!-- <div class="books">
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
        </div> -->
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

#main .books .check {
    position: absolute;
    z-index: 20;
    right: 10px;
    bottom: 10px;
    border-radius: 50%;

}

.el-checkbox__inner {
    width: 20px !important;
    border-radius: 50%;
}
</style>