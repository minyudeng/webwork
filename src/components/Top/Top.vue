<template>
    <div>
        <el-menu :default-active="store.getters.getIndex" style="background-color: rgba(245,245,247,.8);" mode="horizontal"
            :ellipsis="false">
            <span style="width: 200px;"></span>
            <el-menu-item index="1" @click="router.push('/home')">
                首页
            </el-menu-item>
            <span style="width: 30px;"></span>
            <el-menu-item index="2" @click="router.push('/types')">
                分类
            </el-menu-item>
            <span style="width: 30px;"></span>
            <el-menu-item index="3" @click="router.push('/square')">
                书单广场
            </el-menu-item>
            <el-menu-item index="4" @click="router.push('/bookrank')">
                排行榜
            </el-menu-item>
            <div class="flex-grow" />
            <el-menu-item index="5" @click="router.push('/author')">
                作者专区
            </el-menu-item>
            <el-menu-item v-if="!this.$store.state.isLogin" index="6" @click="changeDialogVisible(true)">
                注册 | 登录
            </el-menu-item>
            <el-sub-menu v-else index="6">
                <template #title>欢迎您: {{ store.state.user.nickname }}</template>
                <el-menu-item @click="go" index="61">
                    <RouterLink to="/admin">后台</RouterLink>
                </el-menu-item>
                <el-menu-item index="6-2" @click="logOut">登出</el-menu-item>
            </el-sub-menu>
        </el-menu>
    </div>
</template>
<script setup>
import { inject, nextTick } from 'vue';
import { useRouter } from 'vue-router'
import { useStore } from 'vuex';
import { MyMessage } from '@/plugins/Message';
const router = useRouter()
const store = useStore()

const changeDialogVisible = inject('changeDialogVisible')
const go = () => {
    router.push("/admin");
}

const logOut = () => {
    router.push("/").then(() => {
        // 在路由跳转完成后执行其他操作
        store.commit("userStatus", null);
        document.cookie = null;
        MyMessage('登出成功', 'success');
    });
    
}
</script>
<style scoped>
.flex-grow {
    flex-grow: 1;
}

.el-menu--horizontal>.el-menu-item.is-active {
    border-bottom: 1px solid rgb(11, 175, 255);
    color: var(--el-menu-active-color) !important;
    background: linear-gradient(90deg, rgba(11, 174, 255, 0.373) 50%, transparent 50%);
    /* 渐变边框 */
    background-size: 200% 100%;
    /* 设置渐变宽度 */
    background-position: 100%;
    /* 设置渐变位置 */
    transition: background-position 0.8s;
    /* 添加过渡效果 */
}

.el-menu--horizontal .el-menu-item:not(.is-disabled):focus,
.el-menu--horizontal .el-menu-item:not(.is-disabled):hover {
    outline: 0;
    color: var(--el-menu-hover-text-color);
    background-color: rgb(240, 245, 249);
}

.el-menu--horizontal>.el-sub-menu .el-sub-menu__title:hover {
    background-color: rgb(240, 245, 249);
}</style>