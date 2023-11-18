<script setup>
import { inject, onMounted, ref } from 'vue';
import request from '@/axios/request';
import { MyNotification } from '@/plugins/Message.js'

const userkey = ref('')

const changeactiveIndex = inject("changeactiveIndex")
onMounted(() => {
    document.title = '用户管理'
    changeactiveIndex('3')
})

const userList = ref([])
const setUserList = (list) => {
    userList.value = list
}

const selectRole = ref('全部')
const setSelectRole = (value) => {
    selectRole.value = value
}

const getLike = () => {
    request.get('/getByLikeName', {
        params: {
            likename: userkey.value,
            role: selectRole.value,
        }
    })
        .then(res => {
            setUserList(res.data)
        })
}

const setRole = (username, role) => {
    request.post('/updaterole', { username, role })
        .then((res) => {
            setRoleSuccess(username)
            getLike()
        })
}

const setRoleSuccess = (username) => {
    MyNotification('修改成功', '用户{' + username + '}权限修改成功', 'success')
}
</script>

<template>
    <div class="common-layout">
        <el-container>
            <el-header style="border-bottom: solid 1px var(--el-menu-border-color);">
                <el-row class="top">
                    <el-col :span="5">
                        <el-icon size="24">
                            <List />
                        </el-icon>
                        <span>用户列表</span>
                    </el-col>
                </el-row>
            </el-header>
            <el-main>
                <div id="contain">
                    <div style="border-radius: 10px;border: 2px solid #d7d7d7;">
                        <el-row class="top" style="height: 50px;background-color: rgb(249,250,251);" j
                            ustify="space-between">
                            <el-col :span="5" style="padding-left: 8px;">
                                <el-input v-model="userkey" :change=getLike() placeholder="输入关键词查询" clearable>
                                    <template #prefix>
                                        <el-icon>
                                            <search />
                                        </el-icon>
                                    </template>
                                </el-input>
                            </el-col>
                            <el-col :span="1" style="padding-left: 8px;">
                                <el-button type="primary">查询</el-button>
                            </el-col>
                            <el-col :span="8">

                            </el-col>
                            <el-col :span="4" style="padding-left: 8px; right: 10px; cursor: pointer;">
                                <el-dropdown trigger="click">
                                    <span>
                                        角色:{{ selectRole }}<el-icon class="el-icon--right"><arrow-down /></el-icon>
                                    </span>
                                    <template #dropdown>
                                        <el-dropdown-menu>
                                            <el-dropdown-item @click="setSelectRole('全部')">全部</el-dropdown-item>
                                            <el-dropdown-item @click="setSelectRole('用户')">用户</el-dropdown-item>
                                            <el-dropdown-item @click="setSelectRole('作者')">作者</el-dropdown-item>
                                            <el-dropdown-item @click="setSelectRole('管理员')">管理员</el-dropdown-item>
                                            <el-dropdown-item @click="setSelectRole('封禁')">封禁</el-dropdown-item>
                                        </el-dropdown-menu>
                                    </template>
                                </el-dropdown>
                            </el-col>
                        </el-row>
                        <el-row style="padding-left: 10px;height: 50px;background-color: #fff;">
                            <el-col :span="2">UID</el-col>
                            <el-col :span="2">头像</el-col>
                            <el-col :span="4">用户名</el-col>
                            <el-col :span="4">昵称</el-col>
                            <el-col :span="10">邮箱</el-col>
                            <el-col :span="2">角色</el-col>
                        </el-row>
                        <div v-for="(usr, index) in userList" :key="index">
                            <el-divider />
                            <el-row class="myrow">
                                <el-col :span="2">{{ usr.uid }}</el-col>
                                <el-col :span="2">
                                    <el-avatar shape="square" :src="usr.avatar" />
                                </el-col>
                                <el-col :span="4">{{ usr.username }}</el-col>
                                <el-col :span="4">{{ usr.nickname }}</el-col>
                                <el-col :span="10">{{ usr.email }}</el-col>
                                <el-col :span="2">
                                    <div v-if="usr.role != '管理员' && usr.role != '作者'">
                                        <el-dropdown trigger="click">
                                            <span :class="{
                                                'user-role': usr.role === '用户',
                                                'author-role': usr.role === '作者',
                                                'blocked-role': usr.role === '封禁'
                                            }">
                                                {{ usr.role }}<el-icon class="el-icon--right"><arrow-down /></el-icon>
                                            </span>
                                            <template #dropdown>
                                                <el-dropdown-menu>
                                                    <el-dropdown-item
                                                        @click="setRole(usr.username, '用户')">用户</el-dropdown-item>
                                                    <el-dropdown-item
                                                        @click="setRole(usr.username, '封禁')">封禁</el-dropdown-item>
                                                </el-dropdown-menu>
                                            </template>
                                        </el-dropdown>
                                    </div>
                                    <div v-else-if="usr.role == '管理员'" style="color: darkorange;">
                                        {{ usr.role }}
                                    </div>
                                    <div v-else class="author-role">
                                        {{ usr.role }}
                                    </div>
                                </el-col>
                            </el-row>
                        </div>
                    </div>
                </div>
            </el-main>
        </el-container>
    </div>
</template>
<style scoped>
.el-header {
    font-size: 20px;
}

.el-main {
    padding: 0;
    background-color: rgb(250, 255, 255);
    width: 100%;
    height: 100%;
}

#contain {
    padding: 40px;
}

.top.el-row {
    height: 100%;
    display: flex;
    align-items: center;
    text-align: center;
}

.el-col {
    display: flex;
    align-items: center;
}

.el-divider {
    margin: 0;
}

.myrow {
    padding-left: 10px;
    height: 50px;
    background-color: #fff;
}

.myrow:hover {
    background-color: rgb(249, 250, 251);
}

.user-role {
    color: #121111;
}

.author-role {
    color: rgb(95, 170, 20);
}

.blocked-role {
    color: crimson;
}
</style>
