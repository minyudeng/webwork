<template>
    <div id="main">
        <el-row class="tac">
            <el-col :span="4" id="leftcol">
                <el-affix :offset="60">
                    <div>
                        <h1 style="background-color: rgb(243, 244, 246);">
                        <el-icon>
                            <Cpu />
                        </el-icon> 功能列表
                    </h1>
                    <el-menu :default-active="activeIndex" @select="handleSelect">
                        <el-menu-item index="1" @click="router.push('/admin/detail')">
                            <el-icon><user /></el-icon>
                            <span>个人资料</span>
                        </el-menu-item>
                        <el-menu-item v-if="store.getters.getUserRole === '管理员'||store.getters.getUserRole === '作者'" @click="router.push('/admin/authorzone/manage')" index="2">
                            <el-icon><EditPen /></el-icon>
                            <span>书籍管理</span>
                        </el-menu-item>
                        <el-menu-item v-if="store.getters.getUserRole === '管理员'" index="3"
                            @click="router.push('/admin/userlist')">
                            <el-icon><UserFilled /></el-icon>
                            <span>用户列表</span>
                        </el-menu-item>
                        <el-menu-item v-if="store.getters.getUserRole === '管理员'" index="4"
                            @click="router.push('/admin/applylist')">
                            <el-icon>
                                <Tickets />
                            </el-icon>
                            <span>作者申请</span>
                        </el-menu-item>

                    </el-menu>
                    </div>
                </el-affix>

            </el-col>
            <el-col :span="20" style="border-left: solid 1px var(--el-menu-border-color);">
                <RouterView />
            </el-col>
        </el-row>
    </div>
</template>
<script setup>
import { onMounted, provide, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const store = useStore()
const router = useRouter()
const activeIndex = ref('1')

const changeactiveIndex = (index) => {
    activeIndex.value = index
}
provide("changeactiveIndex", changeactiveIndex)

const handleSelect = (key, keyPath) => {
    //   console.log(key, keyPath)

}
onMounted(() => {
    document.title = '后台'
    store.dispatch("setIndex", '6')
})
</script>
<style scoped>
#main{
}
.el-menu-item{
    background-color: rgb(243, 244, 246);
}
.el-menu-item.is-active {
    background-color: #ccd0cf;
    color: rgb(51, 51, 51);
}

.el-menu-item:hover {
    background-color: #ccd0cf;
}


#leftcol{
    background-color: rgb(243, 244, 246);
    height: 100vh;
}

</style>