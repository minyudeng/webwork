<script setup>
import request from '@/axios/request';
import { onMounted, ref, watch } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { MyMessage } from '@/plugins/Message';

const store = useStore()
const router = useRouter()

onMounted(() => {
    getBookList()
})
//props
const props = defineProps({
    bname: String,
    radioTag: Number,
    statusTag: String,
    rankTag: String,
})
const radioTagRef = ref(props.radioTag);
const statusTagRef = ref(props.statusTag);
const rankTagRef = ref(props.rankTag);
//监听父亲的值
watch(props, () => {
    getBookList()
})
//分页
const pageNum = ref(1)
const pageSize = ref(5)
const pages = ref(1)
const total = ref(100)
const startRow = ref(1)
//得到书籍
const bookList = ref()
const getBookList = () => {
    let orderBy = ''
    if (props.rankTag === '按评分') {
        orderBy = 'rating desc'
    } else if (props.rankTag === '按收藏') {
        orderBy = 'numOfCollection desc'
    }
    let status = props.statusTag
    if (props.statusTag === '全部') {
        status = ''
    }
    request.get('/book/get', {
        params: {
            'pageNum': pageNum.value,
            'pageSize': pageSize.value,
            'orderBy': orderBy,
            'uid': store.getters.getUserId,
            'typeId': props.radioTag,
            'status': status
        }
    }).then(res => {
        bookList.value = res.data.list
        pages.value = res.data.pages
        total.value = res.data.total
        startRow.value = res.data.startRow
    }).catch(error => {

    }).finally(() => {
        bookList.value = bookList.value.map((e, i) => {
            return { ...e, rank: startRow.value + i }
        })
    })
}

const changeCollectionStatus = (bid) => {
    request.put('/book/collection', null, {
        params: {
            bid: bid,
            uid: store.getters.getUserId
        }
    }).then(res => {
        MyMessage(res.msg, 'success')
        getBookList()
    }).catch(error => {
        MyMessage(error.data.msg, 'success')
    })
}

const blankBook = (bid) => {
    let routeUrl = router.resolve({
        path: `/book/${bid}`,
        params: { id: bid }
    })
    window.open(routeUrl.href, '_blank')
}
</script>
<template>
    <div id="main">
        <el-card shadow="always">
            <ul>
        <li v-for="(item, index) in bookList">
            <el-divider />
            <div style="display: flex;height: 162px;align-items: center;">
                <div class="img-box" @click="blankBook(item.bid)">
                    <div class="rank-tag" :class="{
                        no1: item.rank === 1,
                        no2: item.rank === 2,
                        no3: item.rank === 3
                    }">
                        {{ item.rank }}
                    </div>
                    <n-image width="102" lazy :src="item.cover" />
                    <span class="rating">{{ item.rating }}</span>
                </div>
                <div class="mid">
                    <h2 @click="blankBook(item.bid)">{{ item.bname }}</h2>
                    <div class="tags">
                        <span class="aname">{{ item.aname }} 著</span>
                        <em>|</em>
                        <n-tag v-for="(type, index) in item.typeList" :bordered="false" size="small" type="warning">
                            {{ type.type }}
                        </n-tag>
                        <em>|</em>
                        <span class="aname">{{ item.status }}</span>
                    </div>
                    <n-ellipsis class="intro" :line-clamp="2" style="color: #666;cursor: pointer;">
                        {{ item.intro }}
                        <template #tooltip>
                            <div style="width: 400px;background-color: rgba(1, 1, 1, 0)">
                                {{ item.intro }}
                            </div>
                        </template>
                    </n-ellipsis>
                    <p class="update">
                        <span>最新更新</span>
                    <p>{{ item.updateTime }}</p>
                    </p>
                </div>
                <div class="right">
                    <p class="totle">{{ item.numOfCollection }} 收藏</p>
                    <div class="btn">
                        <n-button @click="blankBook(item.bid)" type="error">
                            书籍详情
                        </n-button>
                        <n-button @click="changeCollectionStatus(item.bid)" v-if="item.collection" type="info">
                            取消收藏
                        </n-button>
                        <n-button @click="changeCollectionStatus(item.bid)" v-else type="primary">
                            加入书架
                        </n-button>
                    </div>
                </div>
            </div>
        </li>
    </ul>
        </el-card>
        <div class="bottom">
        <el-pagination background v-model:current-page="pageNum" v-model:page-size="pageSize"
            :page-sizes="[5, 10, 15, 20, 50, 100]" :total="total" :background="background" layout="sizes, prev, pager, next"
            @size-change="getBookList" @current-change="getBookList" />
    </div>
    </div>
</template>
<style scoped>
#main {
    margin: 20px 0;
}

#main .el-card {
    background: linear-gradient(180deg, rgba(224, 226, 224, 0.673) 0%, rgba(255, 255, 255, 1) 100%);
}
ul {
    display: flex;
    flex-direction: column;
}

ul li {
    flex: 1;
    justify-content: space-between;
}

ul li .img-box {
    height: 136px;
    margin-right: 16px;
    position: relative;
    width: 102px;
}

ul li .img-box .rank-tag {
    left: 2px;
    position: absolute;
    z-index: 2;
    background: rgba(0, 0, 0, .6);
    color: #fff;
    height: 22px;
    min-width: 14px;
    padding: 0 4px;
    text-align: center;
    top: 0;
}

ul li .img-box .no1 {
    background: #bf2c2481;
}

ul li .img-box .no2 {
    background: #e6722584;
}

ul li .img-box .no3 {
    background: #e6bf257a;
}

ul li .img-box .n-image {
    box-shadow: 0 1px 6px rgba(0, 0, 0, .35);
    display: block;
    height: 136px;
    transition: all 0.3s ease;
    overflow: hidden;
}

ul li .img-box .rating {
    right: 2px;
    position: absolute;
    z-index: 2;
    background: rgba(228, 127, 55, 0.6);
    color: yellow;
    height: 22px;
    min-width: 14px;
    padding: 0 4px;
    text-align: center;
    bottom: 0;
}

ul li .img-box .n-image:hover {
    transform: scale(1.1);
}

ul li .mid {
    margin-top: 5px;
    width: 542px;
    /* float: left; */
}

ul li .mid h2 {
    height: 24px;
    margin-bottom: 8px;
    overflow: hidden;
    font-size: 18px;
    font-weight: 400;
    font-family: '青鸟华光';
    cursor: pointer;
}

ul li .mid .aname {
    color: #a6a6a6;
    float: left;
    line-height: 16px;
    cursor: pointer;
}

ul li .mid .tags {
    height: 22px;
    display: flex;
    align-items: center;
}

ul li .mid .tags em {
    color: #e6e6e6;
    margin: 1px 8px 0;
}

ul li .mid .n-tag {
    margin: 0 2px;
    cursor: pointer;
    transition: all 0.3s ease;
}

ul li .mid .n-tag:hover {
    background-color: #d8911e6d;
}

ul li .mid .intro {
    font-size: 14px;
    height: 48px;
    line-height: 24px;
    margin-bottom: 8px;
}

ul li .mid .update {
    line-height: 22px;
}

ul li .mid .update span {
    color: #3f5a93;
    display: inline-block;
    max-width: 150px;
    overflow: hidden;
    text-overflow: ellipsis;
    cursor: pointer;
    vertical-align: middle;
}

ul li .mid .update p {
    color: #b5b5b5;
    display: inline-block;
    vertical-align: middle;
    margin-left: 10px;
    cursor: pointer;
}

ul li .right {
    height: 136px;
    margin-top: 5px;
    position: relative;
    width: 224px;
}
ul li .right .totle {
    text-align: right;
    color: #666;
    font: 12px;
    margin-bottom: 6px;
    cursor: default;
}

ul li .right .btn {
    width: 100%;
    position: absolute;
    bottom: 4px;
    display: flex;
    justify-content: space-around;
}
</style>