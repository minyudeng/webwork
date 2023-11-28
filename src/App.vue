<template>
  <div class="dark" style="height: 100%;display: flex;
  flex-direction: column;">
      <div style="flex-shrink: 0;">
        <Top :toggleDark="toggleDark" :isDark="isDark"/>
      </div>
    <div style="flex-grow: 1; overflow: auto;">
      <RouterView />
    </div>
    <el-dialog  v-model="dialogVisible" width="80%" :before-close="handleClose">
      <LoginView />
    </el-dialog>
  </div>
</template>
<script setup>
import Top from './components/Top/Top.vue';
import LoginView from './views/LoginView.vue';
import { provide, ref, onMounted } from 'vue'
import { useStore } from 'vuex'

import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark()
const toggleDark = useToggle(isDark)


const store = useStore()
const dialogVisible = ref(false)
const handleClose = function (done) {
  ElMessageBox.confirm('是否确认关闭？')
    .then(() => {
      done()
    })
    .catch(() => {
    })
}
function changeDialogVisible(bl) {
  dialogVisible.value = bl
}
provide('changeDialogVisible', changeDialogVisible)
function login() {
  let user = sessionStorage.getItem("user")
  if (user) {
    store.commit("userStatus", JSON.parse(user))
  }
}
onMounted(() => {
  login()
})
</script>
<style>
@import url('./assets/font/font.css');
html.dark {
  /* 自定义深色背景颜色 */
  --af-bg-color: #000000;
}
* {
  padding: 0;
  margin: 0;
  caret-color: transparent;
  font-family: Arial;
  box-sizing: border-box;
}
.el-input__inner,.el-textarea__inner,input {
  caret-color: auto !important;
}

html, body {
  height: 100%;
}
a {
  text-decoration: none;
  
}
ul{
  list-style: none;
}
li{
  list-style: none;
}
.el-input{
  caret-color: black;
}
.caret{
  caret-color: black;
}
#app{
  height: 100vh;
}
</style>
