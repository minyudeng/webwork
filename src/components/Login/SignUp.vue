<template>
    <el-form :model="user" :rules="rules" ref="signUpRef">
        <el-form-item prop="username">
            <el-input prefix-icon="User" placeholder="请输入账号" v-model="user.username">

            </el-input>
        </el-form-item>
        <el-form-item prop="password">
            <el-input prefix-icon="Lock" type="password" placeholder="请输入密码" v-model="user.password">
            </el-input>
        </el-form-item>
        <el-form-item prop="confirmPw">
            <el-input prefix-icon="Lock" type="password" placeholder="请确认密码" v-model="user.confirmPw">
            </el-input>
        </el-form-item>
        <el-form-item prop="email">
            <el-input prefix-icon="Lock" placeholder="请输入邮箱" v-model="user.email">
            </el-input>
        </el-form-item>
        <el-form-item>
      <el-button type="primary" @click="signUp(user)"
      style="width: 100%;"
        >注册</el-button
      >
    </el-form-item>
    </el-form>
</template>
<script setup>
import { ref } from 'vue';
import request from '@/axios/request'
const props = defineProps(["changeIsLogin"])
import { MyNotification,MyMessage } from '@/plugins/Message.js'

const user = ref({
    username: '',
    password: '',
    email: '',
});

const validatePass = (rule, confirmPw, callback) => {
    if (confirmPw === '') {
        callback(new Error('请再次输入密码'))
    } else if (confirmPw != user.value.password) {
        callback(new Error("两次密码不一致！"))
    } else {
        callback()
    }
}
const rules = {
    username: [
        { required: true, message: "请输入账号", trigger: "blur" },
        { min: 5, max: 20, message: '长度应该大于等于5', trigger: 'blur' },
    ],
    password: [
        { required: true, message: "请输入密码", trigger: "blur" },
        { min: 5, max: 20, message: '长度应该大于等于5', trigger: 'blur' },
    ],
    confirmPw: [
        { validator: validatePass, trigger: 'blur' },
    ],
    email: [
        { required: true, message: "请输入邮箱", trigger: "blur" },
        {
            type: 'email',
            message: '请输入合法的邮箱地址',
            trigger: ['blur'],
        }
    ]
}

const signUp = (user) =>{
    if (user.username.length < 5 || user.username.length > 20) {
        MyNotification('用户名格式错误','用户名长度应该在5-20之间','error')
        return
    }
    if(user.password != user.confirmPw){
        MyNotification('请检查密码','两次输入密码不一致','error')
        return
    }
    if (user.password.length < 5 || user.password.length > 20) {
        MyNotification('密码格式错误','密码长度应该在5-20之间','error')
        return
    }
    if(user.email.length == 0){
        MyNotification('请输入邮箱','请输入邮箱','error')
        return
    }
    const reges = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if(!reges.test(user.email)){
        MyNotification('邮箱格式错误','请输入合法的邮箱地址','error')
        return
    }
    request.post("/signup",user)
    .then(res =>{
        if(res.code === '200'){
            MyMessage("注册成功，去登录吧！",'success')
            props.changeIsLogin()
        }else{
            alert(res.msg)
        }
    })
    .catch(error =>{
        MyNotification('错误',error.message,'error')
    })
}

</script>