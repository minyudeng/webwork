<script setup>
import request from '@/axios/request';
import { onMounted, ref } from 'vue';
import TypeRank from '@/components/Types/TypeCpts/TypeRank.vue'

onMounted(() => {
    getTagList()
})
//书名
const bname = ref('')
//类型
const radioTag = ref(-1)
const radioTagList = ref()

const selectRadioTag = (index) => {
    radioTag.value = index
}

const getTagList = () => {
    request.get('/type/get')
        .then(res => {
            radioTagList.value = res.data
        })
}
//状态
const statusTag = ref('全部')
const selectStatusTag = (s) => {
    statusTag.value = s


}
//排序
const rankTag = ref('默认')
const selectRankTag = (s) => {
    rankTag.value = s


}


</script>
<template>
    <div class="top">
        <el-card shadow="always">
            <div class="body">
                <div class="types">
                    <h2>分类</h2>
                    <div class="type">
                        <span class="tag" @click="selectRadioTag(-1)" :class="{ active: radioTag === -1 }">
                            全部分类
                        </span>
                        <span class="tag" v-for="item in radioTagList" @click="selectRadioTag(item.typeId)"
                            :class="{ active: radioTag === item.typeId }">
                            {{ item.type }}
                        </span>
                    </div>
                </div>
                <el-divider border-style="dashed" />
            </div>
            <div class="status">
                <div class="types">
                    <h2>状态</h2>
                    <div class="type">
                        <span class="tag" :class="{
                            active: statusTag === '全部'
                        }" @click="selectStatusTag('全部')">
                            全部
                        </span>
                        <span class="tag" :class="{
                            active: statusTag === '连载中'
                        }" @click="selectStatusTag('连载中')">
                            连载中
                        </span>
                        <span class="tag" :class="{
                            active: statusTag === '已完结'
                        }" @click="selectStatusTag('已完结')">
                            已完结
                        </span>
                    </div>
                </div>
            </div>
            <el-divider border-style="dashed" />
            <div class="rank">
                <div class="types">
                    <h2>排序</h2>
                    <div class="type">
                        <span class="tag" :class="{
                            active: rankTag === '默认'
                        }" @click="selectRankTag('默认')">
                            默认
                        </span>
                        <span class="tag" :class="{
                            active: rankTag === '按评分'
                        }" @click="selectRankTag('按评分')">
                            按评分
                        </span>
                        <span class="tag" :class="{
                            active: rankTag === '按收藏'
                        }" @click="selectRankTag('按收藏')">
                            按收藏
                        </span>
                    </div>
                </div>
            </div>
        </el-card>
    </div>
    <div class="books">
        <TypeRank 
        :bname="bname "
        :radioTag="radioTag"
        :statusTag="statusTag"
        :rankTag="rankTag" />
    </div>
</template>
<style>
.top {
    margin: 0 auto;
    min-width: 1200px;
}

.top .el-card {
    background: linear-gradient(180deg, rgba(224, 226, 224, 0.673) 0%, rgba(255, 255, 255, 1) 100%);
}

.top .el-card .types {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
}

.top .el-card .types h2 {
    display: block;
    width: 60px;
    text-align: center;
    color: #666;
    font-weight: 400;
    margin-right: 10px;
    height: 100%;
    cursor: default;
}

.top .el-card .types .type {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: calc(100% - 40px);
}

.top .el-card .types .type .tag {
    display: flex;
    color: #9d9999;
    width: 75px;
    height: 25px;
    font-size: 14px;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border-radius: 5px;
    margin: 2px calc((100% - 75px * 12)/12/2);
    transition: all 0.3s ease-in-out;
}

.top .el-card .types .type .tag:hover {
    background-color: #038139;
}

.top .el-card .types .type .active {
    background-color: #038139;
    color: #fff;
}
.top .el-card .status .types {
    flex-wrap: nowrap;
    align-items: center;
}

.top .el-card .status .types h2 {
    width: 60px;
    font-size: 14px;
}

.top .el-card .rank .types {
    flex-wrap: nowrap;
    align-items: center;
}

.top .el-card .rank .types h2 {
    width: 60px;
    font-size: 14px;
}

.books {
    width: 100%;
}</style>