<template>
  <div>
    <el-affix target="#app">
      <div>
        <Top/>
      </div>
    </el-affix>
    <RouterView />
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
import { ElNotification, ElMessageBox } from 'element-plus'
import { ElMessage } from 'element-plus'

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
const notify = (newtitle, newmessage,newtype) => {
    ElNotification({
        title: newtitle,
        message:newmessage,
        type: newtype,
        duration: 2000
    })
}
provide("notify",notify)

const message =(newmessage,newtype)=>{
  ElMessage({
    message: newmessage,
    type: newtype,
    duration: 2000,
    showClose: true
  })
}
provide("message",message)
</script>
<style>
@import url('/src/common/font/font.css');
* {
  padding: 0;
  margin: 0;
  caret-color: transparent;
  font-family: Arial;
  box-sizing: border-box;
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
</style>
