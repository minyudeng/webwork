<script setup>
import request from '@/axios/request';
import Books from '@/components/Admin/BookShelf/BookList.vue'
import { onMounted, ref } from 'vue';
import { useStore } from 'vuex';

const store = useStore()

onMounted(() => {
    getMyShelfList()
})

const myShelfList = ref([])
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
    })
}

const otherShelfList = ref([])
</script>
<template>
    <div id="main">
        <div class="left">
            <Books :shelfId="nowShelf.shelfId" v-if="nowShelf" :key="nowShelf.shelfId"/>
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
                        <p>{{ item.shelfName }}</p>
                    </div>
                    <template #header-extra>
                        <svg t="1701437172460" class="icon" viewBox="0 0 1024 1024" version="1.1"
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

                    <template #header-extra>
                        <svg t="1701437172460" class="icon" viewBox="0 0 1024 1024" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" p-id="4221" width="20" height="20">
                            <path
                                d="M512 25.6C243.712 25.6 25.6 243.712 25.6 512s218.112 486.4 486.4 486.4 486.4-218.112 486.4-486.4-218.112-486.4-486.4-486.4z m0 896c-225.792 0-409.6-183.808-409.6-409.6s183.808-409.6 409.6-409.6 409.6 183.808 409.6 409.6-183.808 409.6-409.6 409.6z"
                                fill="#B2B2B2"  p-id="4222"></path>
                            <path
                                d="M724.48 473.6h-175.104V298.496c0-20.992-17.408-38.4-38.4-38.4s-38.4 17.408-38.4 38.4v175.104H296.96c-20.992 0-38.4 17.408-38.4 38.4s17.408 38.4 38.4 38.4h175.104v175.104c0 20.992 17.408 38.4 38.4 38.4s38.4-17.408 38.4-38.4v-175.104h175.104c20.992 0 38.4-17.408 38.4-38.4 0.512-20.992-16.896-38.4-37.888-38.4z"
                                fill="#B2B2B2" p-id="4223"></path>
                        </svg>
                    </template>
                </n-collapse-item>
            </n-collapse>

        </div>
    </div>
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