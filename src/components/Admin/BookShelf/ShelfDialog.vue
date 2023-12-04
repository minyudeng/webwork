<script setup>
import request from '@/axios/request';
import { MyMessage } from '@/plugins/Message';
import { reactive, ref } from 'vue';
import { useStore } from 'vuex';

const store = useStore()
const props = defineProps({
    changeShelfDialog: Function
})

const shelfForm = reactive({
    uid: store.getters.getUserId,
    shelfName: '',
    intro: ''
})
//表单回滚检查
const rules = {
    shelfName: [
        { required: true, message: "请输入书架名", trigger: "blur" },
        { min: 1, max: 20, message: '长度应在1-20', trigger: 'blur' },
    ],
    intro: [
        { required: true, message: "请输入简介", trigger: "blur" },
        { min: 5, max: 500, message: '长度应在5-500', trigger: 'blur' },
    ]
}
//提交表单
const submit = ()=>{
    if(shelfForm.shelfName.length < 1 || shelfForm.shelfName.length > 20){
        MyMessage('书架名长度不符','warning')
        return
    }
    if(shelfForm.intro.length < 5 || shelfForm.intro.length > 500){
        MyMessage('简介长度不符','warning')
        return
    }
    console.log(shelfForm);
    request.postForm('/shelf/add',shelfForm)
    .then(res=>{
        MyMessage('添加成功','success')
        location.reload()
    }).catch(e=>{
        MyMessage('添加失败','error')
        console.log(e);
    })
}
</script>
<template>
    <div>
        <el-form label-width="80px" :model="shelfForm" :rules="rules">
            <el-form-item label="书架名" prop="shelfName">
                <el-input v-model="shelfForm.shelfName" placeholder="请输入书架名" maxlength="20" show-word-limit />
            </el-form-item>
            <el-form-item label="简介" prop="intro">
                <el-input v-model="shelfForm.intro" type="textarea" placeholder="请输入简介"
                    :autosize="{ minRows: 2, maxRows: 5 }" maxlength="500" show-word-limit />
            </el-form-item>
        </el-form>
        <div style="display: flex; justify-content: space-around;">
            <n-button @click="changeShelfDialog(false)">
                取消
            </n-button>
            <n-button type="info" @click="submit">
                提交
            </n-button>
        </div>
    </div>
</template>
<style scoped></style>