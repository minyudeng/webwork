<script setup>
import { defineAsyncComponent, onMounted, ref } from 'vue';
import request from '@/axios/request'
import { useStore } from 'vuex';
import matchFileType from '@/plugins/File.js'
import { MyMessage, MyNotification } from '@/plugins/Message';

const store = useStore()

onMounted(() => {
    getBooks()
    document.title = '作品管理'
})

//dialog部分
const dialogComponent = defineAsyncComponent(() => import('@/components/Author/AuthorZone/UpBookDialog.vue'))
const dialog = ref(false)
const changeDialog = (bealen, object) => {
    dialog.value = bealen
    thisBook.value = object
}

const handleClose = () => {

}
//如果是修改作品，传递作品参数
const thisBook = ref(null)

//获取作者作品
const books = ref([])
const getBooks = () => {
    request.get('/book/uid', {
        params: {
            uid: store.getters.getUserId
        }
    })
        .then(res => {
            books.value = res.data
        })
}
//更新封面
const file = ref(null)
const setImage = (event, bid) => {
    file.value = event.target.files[0];
    //判断类型
    if (matchFileType(file.value.name) !== 'image') {
        MyMessage('上传的文件必须是文件', 'warning')
        return
    }
    //判断大小
    if (file.value.size / 1024 / 1024 > 2) {
        MyMessage('图片大小必须在2MB内', 'warning')
        return
    }
    request.putForm('/book/updatecover', {
        file: file.value,
        bid: bid
    }).then(res => {
        MyMessage('更新成功', 'success')
        // location.reload()
    }).catch(error => {
        MyNotification('更新失败', '未知错误,请询问管理员', 'error')
    })

}
//更新状态
const setStatus=(status,bid)=>{
    console.log(status,bid)
    request.putForm('/book/update/status',{
        status : status,
        bid : bid
    }).then(res=>{
        MyMessage('完结撒花','success')
        location.reload
    }).catch(error=>{
        MyMessage('未知错误','error')
    })
}
</script>
<template>
    <div id="main">
        <div class="contain">
            <div class="title">
                <h4 style="padding-left: 10px;">我的作品</h4>
                <el-button @click="changeDialog(true, {})">
                    <el-icon>
                        <CirclePlus />
                    </el-icon>
                    新建作品
                </el-button>

            </div>
            <el-divider style="margin:0;background-color: #fff;" />
            <div class="body">
                <ul>
                    <li v-for="(item, index) in books" :key="index" >
                        <div>
                            <el-image :src="item.cover">
                                <template #error>
                                    <div class="image-slot">
                                        <el-icon color="#0067e5">
                                            <Picture />
                                        </el-icon>
                                    </div>
                                </template>
                            </el-image>
                            <input type="file" class="file-btn" required @change="setImage($event, item.bid)" />
                        </div>

                        <div style="
                        width: 100%;
                        display: inline-flex;
                        height: 148px;
                        min-height: 144px;
                        flex-direction: row;
                        justify-content: space-between;">
                            <div :span="16" style="display: inline-flex;
                            flex-direction: column;">
                                <h3>{{ item.bname }}</h3>
                                <p style="color: rgba(21,26,48,.5);margin-top: 30px;">{{ item.updateTime }}</p>
                                <p style="color: rgba(21,26,48,.5);margin-top: 30px;">收藏 {{ item.collection }}</p>
                            </div>
                            <div style="display: inline-flex;
                            flex-direction: column;
                            justify-content: space-between;">
                                <el-popover v-if="item.status === '连载中'" placement="top" trigger="click">
                                    <template #reference>
                                        <el-button>连载中</el-button>
                                    </template>
                                    <el-button style="width:120px;" type="warning" @click="setStatus('已完结',item.bid)">完结</el-button>
                                </el-popover>
                                <span v-else>{{ item.status }}</span>

                                <div style="display: flex; flex-direction: row;">
                                    <el-button @click="changeDialog(true, item)">作品设置</el-button>
                                    <el-button>去写作</el-button>
                                </div>
                            </div>
                        </div>
                        
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <el-dialog v-model="dialog" title="书籍信息" width="70%" :before-close="handleClose" draggable :show-close="false"
        :destroy-on-close="true">
        <dialogComponent :changeDialog="changeDialog" :thisBook="thisBook" />
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
    border-bottom: #69696a61 solid 1px;
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
    width: 80px;
}

.file-btn {
    position: absolute;
    width: 107px;
    height: 114px;
    top: 0;
    left: 0;
    outline: none;
    filter: alpha(opacity=0);
    -moz-opacity: 0;
    -khtml-opacity: 0;
    opacity: 0;
}
</style>