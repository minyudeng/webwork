<template>
    <div class="common-layout">
        <el-container>
            <el-aside width="50%">
                <el-row>
                    <img src="../assets/imgs/read.webp" style="width: 100%;">
                </el-row>
            </el-aside>
            <el-main style="padding: 0;">
                <el-row justify="center">
                    <el-button-group>
                        <el-button round :class="{ selected: isLogin === true }" @click="changeIsLogin()">
                            <el-icon>
                                <Document />
                            </el-icon>登录
                        </el-button>
                        <el-button round :class="{ selected: isLogin === false }" @click="changeIsLogin">
                            <el-icon>
                                <DocumentAdd />
                            </el-icon>注册
                        </el-button>
                    </el-button-group>
                </el-row>
                <el-row justify="center">
                    <div v-if="isLogin">
                        <Login :changeIsLogin="changeIsLogin"/>
                    </div>
                    <div v-else>
                        <SignUp :changeIsLogin="changeIsLogin"/>
                    </div>
                </el-row>
            </el-main>
        </el-container>
    </div>
</template>
<script setup>
import Login from '@/components/Login/Login.vue'
import SignUp from '@/components/Login/SignUp.vue'
import { ref } from 'vue';

let isLogin = ref(true)
const changeIsLogin = () =>{
    isLogin.value = isLogin.value === true ? false : true
}
</script>
<style>
.selected {
    color: #2c84dc !important;
    border-color: #255f9d !important;
    background-color: #9bbfe8 !important;
    outline: 0;
}</style>