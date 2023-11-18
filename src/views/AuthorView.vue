<template>
    <div v-if="store.getters.getIsLogin === true">
        <div>
            <NotAuthor />
        </div>
    </div>
</template>
<script setup>
import NotAuthor from '@/components/Author/NotAuthor.vue'

import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { MyMessage } from '@/plugins/Message.js'

const router = useRouter()
const store = useStore()
onMounted(() => {
    document.title = '作者专区'
    store.dispatch("setIndex", '5')

    if(store.getters.getIsLogin === false){
        router.push('/home')
        MyMessage('你还没有登录，请先登录账号','error')
    }else if(store.getters.getUserRole== '作者'){
        router.push('admin/bookmanage')
    }
    
})
</script>