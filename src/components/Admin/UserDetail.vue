<template>
    <div style="background-color: #fff; padding: 40px;">
        <div style="background-color: rgb(251, 253, 255);height: 100%;border: solid 1px var(--el-menu-border-color);">
            <el-row>
                <el-col :span="3" style="padding-top: 10px;">
                    <el-upload action="http://localhost:8081/avatarUpload" :show-file-list="false" :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload"
                        :headers="{'Token': getToken()}">
                        <el-avatar v-if="user.avatar" :size="80">
                            <img :src=user.avatar />
                        </el-avatar>
                        <el-avatar v-else :size="80" src="" @error="errorHandler">
                            <img src="../../assets//imgs/verror.png" />
                        </el-avatar>
                    </el-upload>
                </el-col>
                <el-col :span="17">
                    <h2>个人资料</h2>
                </el-col>
                <el-col :span="3">
                    <div style="text-align: center; padding-top: 20px;">
                        <el-button size="large" @click="dialogVisible = true">
                            <el-icon>
                                <Edit />
                            </el-icon>编辑
                        </el-button>
                    </div>
                </el-col>
                <el-col :span="1"></el-col>
            </el-row>
            <el-divider />
            <el-row class="row">
                <el-col :span="4">用户名</el-col>
                <el-col :span="20">{{ user.username }}</el-col>
            </el-row>
            <el-divider />
            <el-row>
                <el-col :span="4">昵称</el-col>
                <el-col :span="20">{{ user.nickname || '无名氏' }}</el-col>
            </el-row>
            <el-divider />
            <el-row>
                <el-col :span="4">邮箱</el-col>
                <el-col :span="20">{{ user.email }}</el-col>
            </el-row>
            <el-divider />
            <el-row>
                <el-col :span="4">签名</el-col>
                <el-col :span="20">{{ user.signature || '这个人很懒，没有签名' }}</el-col>
            </el-row>
            <el-divider />
            <el-row>
                <el-col :span="4">角色</el-col>
                <el-col :span="20">{{ user.role }}</el-col>
            </el-row>
            <el-divider />
            <el-dialog v-model="dialogVisible" width="40%" :before-close="handleClose" title="编辑信息">
                <UserEdit :changeDialogVisible="changeDialogVisible" :updateUser="updateUser" />
            </el-dialog>
        </div>
    </div>
</template>
<script setup>
import UserEdit from '@/components/Admin/USerEdit.vue'
import { inject, onBeforeMount, ref } from 'vue';
import { ElMessage,ElMessageBox } from 'element-plus'
import { useStore } from 'vuex';

const store = useStore()

const errorHandler = () => true
const user = ref(null)
const dialogVisible = ref(false)
const changeDialogVisible = (beal) => {
    dialogVisible.value = beal
}

const handleClose = (done) => {
    ElMessageBox.confirm('是否确认关闭？')
        .then(() => {
            done()
        })
        .catch(() => {
        })
}

const changeactiveIndex = inject("changeactiveIndex")
onBeforeMount(() => {
    user.value = JSON.parse(sessionStorage.getItem("user"))
    document.title = '个人资料'
    changeactiveIndex('1')
})
const updateUser = () => {
    user.value = JSON.parse(sessionStorage.getItem("user"))
}

const beforeAvatarUpload = (rawFile) => {
    if (rawFile.size / 1024 / 1024 > 2) {
        ElMessage.error('头像大小不能超过2MB!')
        return false
    }
    return true
}

const handleAvatarSuccess = (resp) => {
    user.value.avatar = resp.data.avatar
    sessionStorage.setItem("user", JSON.stringify(user.value))
    store.dispatch("setUser", user.value)
    updateUser()
}

const getToken = () =>{
    return sessionStorage.getItem("userToken")
}
</script>

<style scoped>
.el-row {
    padding-left: 10px;
    align-items: center;
    text-align: center;
}
.el-row :hover{
    background-color: #fff ; 
    transition: background-color 0.2s;
}
.el-row:not(:first-child) {
    height: 60px;
}
.el-upload__input{
    z-index: 999;
}
.el-divider{
    margin: 0;
}
</style>