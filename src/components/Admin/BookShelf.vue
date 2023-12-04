<script setup>
import request from '@/axios/request';
import Books from '@/components/Admin/BookShelf/BookList.vue'
import { MyConfirmElMessageBox, MyMessage } from '@/plugins/Message';
import { onMounted, provide, ref } from 'vue';
import { useStore } from 'vuex';

const store = useStore()

onMounted(() => {
    getMyShelfList()
})
//shelf
const myShelfList = ref([])
provide('myShelfList',myShelfList)
const nowShelf = ref({
    shelfId : 0,
})
const getMyShelfList = () => {
    request.get('/shelf/get', {
        params: {
            'uid': store.getters.getUserId
        }
    }).then(res => {
        myShelfList.value = res.data
    }).finally(()=>{
        options.value = myShelfList.value.map(shelf=>({
            'label': shelf.shelfName,
            'key': shelf.shelfId,
            
        }))
        console.log(options.value );
    })
}

const otherShelfList = ref([])

//delShelf
const delShelf=(shelfId)=>{
    MyConfirmElMessageBox('你确定删除这个书架吗', 'warning', () => {
        request.delete('/shelf/del',{
            params:{
                'shelfId' : shelfId
            }
        }).then(res=>{
            MyMessage('删除成功','success')
        }).catch(e=>{
            MyMessage('删除失败','error')
            console.log(e);
        }).finally(()=>{
            getMyShelfList()
            nowShelf.value.shelfId === 0
        })
        })
    
}
//dialog
const shelfDialog = ref(false)
const changeShelfDialog = (bool)=>{
    shelfDialog.value = bool
}

const options = ref()
</script>
<template>
    <div id="main">
        <div class="left">
            <Books :shelfId="nowShelf.shelfId"
            :options="options"
             v-if="nowShelf" 
             :key="nowShelf.shelfId"/>
        </div>
        <div class="right">
            <n-collapse>
                <n-collapse-item title="我的书架" name="1">
                    <div class="item" @click="nowShelf.shelfId = 0" :class="{
                        select : nowShelf.shelfId === 0
                    }">
                        <p>默认书架</p>
                    </div>
                    <div @click="nowShelf.shelfId = item.shelfId" v-for="(item, index) in myShelfList" class="item" :class="{
                        select : nowShelf.shelfId === item.shelfId
                    }"  >
                        <el-divider border-style="dashed" />
                        <div style="display: flex;justify-content: space-between;">
                            <p>{{ item.shelfName }}</p>
                        <svg @click="delShelf(item.shelfId)" t="1701669102893" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4222" width="30" height="30"><path d="M515.413333 168.675556a128.284444 128.284444 0 0 0-129.137777 125.724444H223.004444a34.133333 34.133333 0 0 0 0 67.982222h37.546667v367.217778c0 67.982222 47.502222 125.724444 105.244445 125.724444h295.822222c56.888889 0 105.244444-56.888889 105.244444-125.724444v-369.777778h34.133334a34.133333 34.133333 0 0 0 0-67.982222h-153.031112a135.964444 135.964444 0 0 0-132.551111-122.311111z m-67.982222 125.724444a69.688889 69.688889 0 0 1 67.982222-64.568889 67.413333 67.413333 0 0 1 67.982223 64.568889z m-81.635555 499.768889c-20.48 0-44.088889-28.444444-44.088889-64.568889v-369.777778h380.586666v366.364445c0 37.262222-23.608889 64.568889-44.088889 64.568889l-292.408888 3.413333z" fill="#999999" p-id="4223"></path><path d="M409.884444 709.12a31.288889 31.288889 0 0 0 28.444445-34.133333V483.555556a33.28 33.28 0 0 0-28.444445-33.848889 31.004444 31.004444 0 0 0-27.022222 33.848889v190.293333a31.288889 31.288889 0 0 0 27.022222 35.271111z m98.702223 0a31.288889 31.288889 0 0 0 28.444444-34.133333V483.555556a33.28 33.28 0 0 0-28.444444-33.848889 31.004444 31.004444 0 0 0-28.444445 33.848889v190.293333c1.137778 21.617778 11.377778 35.271111 28.444445 35.271111z m102.115555 0a31.288889 31.288889 0 0 0 28.444445-34.133333V483.555556a33.564444 33.564444 0 0 0-28.444445-33.848889 31.004444 31.004444 0 0 0-28.444444 33.848889v190.293333c1.137778 21.617778 11.377778 35.271111 28.444444 35.271111z" fill="#999999" p-id="4224"></path></svg>
                        </div>
                    </div>
                    <template #header-extra>
                        <svg @click="changeShelfDialog(true)" t="1701437172460" class="icon" viewBox="0 0 1024 1024" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" p-id="4221" width="20" height="20">
                            <path
                                d="M512 25.6C243.712 25.6 25.6 243.712 25.6 512s218.112 486.4 486.4 486.4 486.4-218.112 486.4-486.4-218.112-486.4-486.4-486.4z m0 896c-225.792 0-409.6-183.808-409.6-409.6s183.808-409.6 409.6-409.6 409.6 183.808 409.6 409.6-183.808 409.6-409.6 409.6z"
                                fill="#B2B2B2" p-id="4222"></path>
                            <path
                                d="M724.48 473.6h-175.104V298.496c0-20.992-17.408-38.4-38.4-38.4s-38.4 17.408-38.4 38.4v175.104H296.96c-20.992 0-38.4 17.408-38.4 38.4s17.408 38.4 38.4 38.4h175.104v175.104c0 20.992 17.408 38.4 38.4 38.4s38.4-17.408 38.4-38.4v-175.104h175.104c20.992 0 38.4-17.408 38.4-38.4 0.512-20.992-16.896-38.4-37.888-38.4z"
                                fill="#B2B2B2" p-id="4223"></path>
                        </svg>
                    </template>
                </n-collapse-item>
                <n-collapse-item title="收藏的书单" name="2">

                    
                </n-collapse-item>
            </n-collapse>

        </div>
    </div>
    <el-dialog 
    v-model="shelfDialog" 
    title="新增书架" 
    width="30%" 
    destroy-on-close
    >
        <ShelfDialog :changeShelfDialog="changeShelfDialog" />
    </el-dialog>
</template>
<style scoped>
#main {
    width: 1200px;
    margin: 10px auto;
    display: flex;
}

#main .left {
    width: 1000px;
    
}


#main .right {
    width: 200px;
    margin-top: 40px;
}

#main .right .item {
    cursor: pointer;
    color: #333;
}
#main .right .item .el-divider--horizontal{
    margin: 12px 0;
}
#main .right .item{
    color: #666;
    font-weight: 500;
    transition: all 0.3s ease;
}
#main .right .item:hover{
    color: rgb(174, 221, 136);
}
#main .right .item.select{
    color: rgb(136, 202, 82);
}


</style>