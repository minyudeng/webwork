<script setup>
import { defineAsyncComponent, onMounted, ref } from 'vue';
import request from '@/axios/request'
import { useStore } from 'vuex';

const store = useStore()

onMounted(()=>{
    getBooks()
})

//dialog部分
const dialogComponent = defineAsyncComponent(()=>import('@/components/Author/AuthorZone/UpBookDialog.vue'))
const dialog = ref(false)
const changeDialog=(bealen,object)=> {
    dialog.value = bealen
    thisBook.value = object
}

const handleClose=()=>{
    
}
//如果是修改作品，传递作品参数
const thisBook = ref(null)

//获取作者作品
const books = ref([])
const getBooks =() => {
    request.get('/book/uid',{params:{
        uid : store.getters.getUserId
    }})
    .then(res=>{
        books.value = res.data
    })
}
</script>
<template>
    <div id="main">
        <div class="contain">
            <div class="title">
                <h4 style="padding-left: 10px;">我的作品</h4>
                <el-button @click="changeDialog(true,{})">
                    <el-icon>
                        <CirclePlus />
                    </el-icon>
                    新建作品
                </el-button>

            </div>
            <el-divider style="margin:0;background-color: #fff;" />
            <div class="body">
                <ul>
                    <li v-for="(item,index) in books" :key="index">
                        <el-image :src="item.cover">
                            <template #error>
                                <div class="image-slot">
                                    <el-icon color="#0067e5">
                                        <Picture />
                                    </el-icon>
                                </div>
                            </template>
                        </el-image>
                        <el-row style="width: 80%;">
                            <el-col :span="18">
                                <div style="height: 10px;"></div>
                                <h3>{{ item.bname }}</h3>
                                <div style="width: 50%;">
                                    <div style="height: 40px;"></div>
                                    <p style="color: rgba(21,26,48,.5);">{{ item.updateTime }}</p>
                                    <div style="height:20px;"></div>
                                    <p style="color: rgba(21,26,48,.5);">收藏 {{ item.collection }}</p>
                                </div>
                            </el-col>
                            <el-col :span="6">
                                <div style="width: 100%;height: 30px;">
                                    <span style="width: 100%;height: 20px;">{{ item.status }}</span>
                                </div>
                                <el-button @click="changeDialog(true,item)">作品设置</el-button>
                                <el-button>去写作</el-button>
                            </el-col>
                        </el-row>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <el-dialog v-model="dialog" title="书籍信息" width="70%" :before-close="handleClose" draggable :show-close="false" :destroy-on-close="true">
        <dialogComponent :changeDialog="changeDialog" :thisBook="thisBook"/>
    </el-dialog>
</template>
<style scoped>
* {
    color: #303133;
}

#main {
    padding: 40px 20px 0 0;
}

.contain {
    align-items: center;
    justify-content: center;
    background-color: #fff;
}

.title {
    position: relative;
    display: flex;
    height: 61px;
    align-items: center;
    border-radius: 5px 5px 0 0;
}

.title h3 {
    padding-left: 20px;
}

.title .el-button {
    position: absolute;
    right: 20px;
    width: 90px;
    border: transparent;
    color: #0067e5;
    background-color: #fff;
}

.title .el-button:hover {
    color: rgb(0, 170, 255);
}

.body {
    padding-top: 10px;
}

.body ul {
    margin-bottom: 12px;
}

.body ul li {
    display: flex;
    min-height: 144px;
    margin-left: 24px;
    margin-right: 24px;
    position: relative;
    border-color: rgba(21, 26, 48, .08);
    margin-bottom: 18px;
}

.el-image {
    width: 107px;
    height: 144px;
    cursor: pointer;
    margin-right: 10px;
}

.image-slot {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background: var(--el-fill-color-light);
    color: var(--el-text-color-secondary);
    font-size: 30px;
}

.body ul li .el-button {
    margin-top: 80px;
    width: 80px;
}
</style>