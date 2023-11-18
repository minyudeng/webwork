<template>
    <div>
        <el-form :model="user" :rules="rules" ref="myRef" label-width="auto" :label-position="labelPosition">
            <el-form-item label="用户名">
                <el-input v-model="user.username" disabled />
            </el-form-item>
            <el-form-item label="昵称" prop="nickname">
                <el-input v-model="user.nickname"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
                <el-input v-model="user.email"></el-input>
            </el-form-item>
            <el-form-item label="签名">
                <el-input v-model="user.signature"></el-input>
            </el-form-item>
            <span>
                <el-button @click="props.changeDialogVisible(false)" size="large">取消</el-button>
                <el-button type="primary" @click="submit" size="large">
                    提交
                </el-button>
            </span>
        </el-form>
    </div>
</template>
<script setup>
import request from '@/axios/request';
import { onBeforeMount, ref } from 'vue';
import { useStore } from 'vuex'
import { MyMessage } from '@/plugins/Message.js'

const store = useStore()

const props = defineProps({
    changeDialogVisible: Function,
    updateUser : Function,
})
const labelPosition = ref('top')
const user = ref(null)
const rules = {
    nickname: [
        { required: true, message: "请输入昵称", trigger: "blur" },
        { min: 1, max: 20, message: '长度应该大于等于1', trigger: 'blur' },
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
onBeforeMount(() => {
    user.value = JSON.parse(sessionStorage.getItem("user"))
})

const submit = () => {
    request.post('/update', user.value)
        .then((res) => {
            sessionStorage.setItem("user", JSON.stringify(res.data))
            sessionStorage.setItem("userToken", res.data.token)

            store.dispatch("setUser", res.data)
            store.dispatch("setToken", res.data.token);
            user.value = JSON.parse(sessionStorage.getItem("user"))
            props.updateUser()
            
            MyMessage("更新成功",'success')
            props.changeDialogVisible(false)

        })
        .catch((res)=>{
            alert(res.msg)
            console.log(res);
        })
}
</script>