<template>
    <el-form :model="user" :rules="rules" ref="loginRef">
        <el-form-item prop="username">
            <el-input prefix-icon="User" placeholder="请输入账号" v-model="user.username">

            </el-input>
        </el-form-item>
        <el-form-item prop="password">
            <el-input @keyup.enter="login" prefix-icon="Lock" type="password" placeholder="请输入密码" v-model="user.password">
            </el-input>
        </el-form-item>

        <el-form-item>
            <el-button @click="login" style="width: 100%;">
                登 录
            </el-button>
        </el-form-item>
        <div style="display: flex;cursor: default;">
            <div style="flex: 1;">
                <span @click="props.changeIsLogin()" style="color: aquamarine;cursor: 
                pointer;flex: 1;">点击注册</span>
            </div>
            <div style="flex: 1; 
            text-align: right;
            color: aquamarine;
            cursor: pointer;">
                忘记密码
            </div>
        </div>
    </el-form>
</template>
<script setup>
import request from '@/axios/request'
import { inject, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex'
import { MyNotification,MyMessage } from '@/plugins/Message.js'

const props = defineProps(["changeIsLogin"])
const changeDialogVisible = inject("changeDialogVisible")
const store = useStore()
const router = useRouter()

const user = ref({
    username: '',
    password: '',
});
const rules = {
    username: [
        { required: true, message: "请输入账号", trigger: "blur" },
        { min: 3, max: 100, message: '长度应该大于等于3', trigger: 'blur' },
    ],
    password: [
        { required: true, message: "请输入密码", trigger: "blur" },
        { min: 3, max: 100, message: '长度应该大于等于3', trigger: 'blur' },
    ],
}
const login = () => {
    if (user.value.username.length >= 3 && user.value.password.length >= 3) {
        request.post('/login', user.value)
            .then(res => {
                if (res.code == '200') {
                    console.log(res.data.role);
                    if (res.data.role == '封禁') {
                        getout()
                    } else {
                        sessionStorage.setItem("user", JSON.stringify(res.data))
                        sessionStorage.setItem("userToken", res.data.token)
                        store.dispatch("setUser", res.data)
                        store.dispatch("setToken", res.data.token);
                        changeDialogVisible(false)
                        router.push('/admin')
                        MyMessage('登录成功','success')
                    }

                } else {
                    MyMessage(res.msg,'error')
                }
            })
            .catch(error => {
                MyMessage(error.data.msg,'error')
                console.log(error);
            })
    } else {
        alert("请检查账号密码长度是否正确!")
    }
}
const getout = () =>{
    MyNotification('你已被封号！','error')
}
</script>