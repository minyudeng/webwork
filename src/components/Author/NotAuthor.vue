<script setup>
import { onMounted, ref } from 'vue';
import request from '@/axios/request'
import { useStore } from 'vuex';
import { MyNotification } from '@/plugins/Message.js'

const store = useStore()

const aname = ref('')
const message = ref('')

const submit = (aname, message) => {
    if (aname.length == 0) {
        MyNotification("笔名长度不符", "笔名不能为空啊！","error")
        if (message.length <= 10) {
            MyNotification("申请信息太短！", "怎么也得十个字吧？","error")
        }
    } else {
        request.post('/apply/add', {"uid": store.state.user.uid, aname, message })
            .then((res) => {
                MyNotification("申请成功","请等待管理员审核","success")
            }).catch(error=>{
                MyNotification("申请失败",error.data.msg,"error")
            })

            
    }
onMounted(()=>{
    document.title = '作者申请'
})

}
</script>
<template>
    <div id="main">
        <div style="background-color: rgba(255, 252, 240, 0.762);
        position: relative;
        height: 600px;
        width: 500px;
        left: 100px;
        transform: translateY(8%);
        border-radius: 20px;
        text-align: center;">
            <h2 class="font" style="padding-top: 20px;">申请成为作者</h2>
            <br />
            <p class="font" style="display: flex; padding-left: 20px;">在下方填写申请</p>
            <el-divider />
            <div style="text-align:left;padding-left: 20px;">
                <el-input class="caret" v-model="aname" placeholder="请输入你的笔名" clearable maxlength="10" color="red" />
                <el-input v-model="message" :autosize="{ minRows: 7, maxRows: 10 }" type="textarea" placeholder="请输入申请信息" />

                <button @click="submit(aname, message)">提交申请</button>
            </div>
        </div>
    </div>
</template>
<style scoped>
#main {
    background-image: url("../../assets//imgs//R.jpg");
    width: 100%;
    height: 100%;
    position: fixed;
    background-size: 100% 100%;
}

.font {
    color: rgb(236, 155, 50);
    cursor: default;
}

.el-input__wrapper {
    background-color: transparent;
    border-radius: 10px;
}

.el-input {
    padding-top: 60px;
    width: 200px;
    --el-input-focus-border-color: rgb(255, 111, 0);
    caret-color: #000000;
}

.el-input__inner {
    color: rgb(236, 155, 50);
}

.el-textarea__inner {
    color: rgb(236, 155, 50);
    background-color: transparent;
    border-radius: 10px;
}

.el-textarea {
    padding-top: 20px;
    width: 400px;
    --el-input-focus-border-color: rgb(255, 111, 0);
}

button {
    width: 200px;
    position: relative;
    top: 40px;
    height: 40px;
    left: 120px;
    background-image: linear-gradient(to right, rgba(233, 211, 71, 0.5) 0%, rgba(228, 209, 7, 0.5) 50%, rgba(233, 212, 71, 0.5)100%);
    border: 1px solid #bb7007;
    border-radius: 10px;
    cursor: pointer;
    transition: 1s;
    color: rgb(236, 118, 50);
}

button:hover {
    background-image: linear-gradient(to right, rgb(233, 212, 71) 0%, rgb(228, 209, 7) 50%, rgb(233, 212, 71)100%);
    border: 1px solid #f3a63b;
}
</style>