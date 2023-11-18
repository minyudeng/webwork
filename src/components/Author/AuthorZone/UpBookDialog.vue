<script setup>
import request from '@/axios/request';
import { onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import { MyNotification, MyMessage } from '@/plugins/Message.js';
import {  useRouter } from 'vue-router';

const store = useStore()
const router = useRouter()
//是否是创建书籍
const isCreate = ref(true)
const book = ref({
    bname: null,
    uid: store.getters.getUserId,
    intro: null,
    cover: null,
    types: null,
    bid: null
})
//prop
const props = defineProps({
    changeDialog: Function,
    thisBook: Object,
})

onMounted(() => {
    //修改pre操作
    let oldBook = props.thisBook
    if (Object.keys(oldBook).length != 0) {
        isCreate.value = false
        book.value.bname = oldBook.bname
        book.value.intro = oldBook.intro
        book.value.cover = oldBook.cover
        book.value.types = oldBook.types
        book.value.bid = oldBook.bid
        book.value.aid = oldBook.aid

        book.value.types.forEach(e => {
            myTypeList.value.push(e.typeId)
        })
    }
    //获得类型列表
    request.get('/book/typelist')
        .then(res => {
            typeList.value = res.data
        })
})

//处理上传图片
const fileInput = ref(null)
const backgroundImageUrl = ref(null)
const file = ref(null)
const fileInputClick = () => {
    fileInput.value.click()
}
const handleFileChange = (event) => {
    file.value = event.target.files[0];
    if (file) {
        // 通过URL.createObjectURL创建一个临时URL
        book.value.cover = URL.createObjectURL(file.value)
    }
}
//end
//类型选择
const typeList = ref([])
const myTypeList = ref([])
//表单回滚检查
const rules = {
    bname: [
        { required: true, message: "请输入书名", trigger: "blur" },
        { min: 1, max: 20, message: '长度应在1-20', trigger: 'blur' },
    ],
    intro: [
        { required: true, message: "请输入简介", trigger: "blur" },
        { min: 5, max: 200, message: '长度应在5-200', trigger: 'blur' },
    ]
}
//提交
const submit = () => {
    if (book.value.bname == null) {
        MyNotification("书名长度不符", '书名长度应在1-20!', 'error')
        return
    }
    if (book.value.intro == null || book.value.intro.length < 5 || book.value.intro > 200) {
        MyNotification("简介长度不符", '简介长度应在1-20!', 'error')
        return
    }
    if (myTypeList.value.length == 0) {
        MyNotification("类型不能为空", '请至少选择一个类型！', 'error')
        return
    }
    //新建
    if (isCreate.value) {
        if (file.value == null) {
            MyNotification("请上传封面", '请上传封面!', 'error')
            return
        } else {
            request.postForm('/book/add', {
                bname: book.value.bname,
                uid: book.value.uid,
                intro: book.value.intro,
                cover: file.value,
                typeId: myTypeList.value
            }).then(res => {
                MyMessage('创建成功', 'success')
                location.reload()
            }).catch(error => {
                MyMessage(error.msg, 'error')
            }).finally({

            })
        }
    } else {
        //修改
        const form = new FormData()
        form.append('aid', book.value.aid)
        form.append('bname', book.value.bname)
        form.append('intro', book.value.intro)
        form.append('typeId', myTypeList.value)
        form.append('bid', book.value.bid)

        request.put('/book/update', form)
            .then(res => {
                MyMessage('更改成功', 'success')
                location.reload()
            })
            .catch(error => {
                MyMessage('???', 'error')
            })
    }
}
</script>
<template>
    <el-form :rules="rules" ref="Refs" :model="book">
        <el-row>
            <el-col :span="6">
                <el-form-item>
                    <div class="update" @click="fileInputClick" :style="{ backgroundImage: backgroundImageUrl }">
                        <el-image :src="book.cover">
                            <template #error>
                                <div class="image-slot">
                                    <el-icon color="#0067e5">
                                        <Picture />
                                    </el-icon>
                                </div>
                            </template>
                        </el-image>
                        <i>
                            <input type="file" ref="fileInput" @change="handleFileChange">
                        </i>
                    </div>
                </el-form-item>
            </el-col>
            <el-col :span="18" class="content">
                <div v-if="isCreate" class="tip">
                    <span>
                        <el-icon>
                            <WarningFilled />
                        </el-icon>
                        以下内容可在作品设置中修改
                    </span>
                </div>
                <el-form-item label="书名:" prop="bname">
                    <el-input v-model="book.bname" placeholder="" minlength="1" maxlength="20" show-word-limit>
                    </el-input>
                </el-form-item>
                <el-form-item label="简介:" prop="intro">
                    <el-input v-model="book.intro" type="textarea" placeholder="" :autosize="{ minRows: 4, maxRows: 6 }"
                        maxlength="200" show-word-limit>
                    </el-input>
                </el-form-item>
                <el-form-item label="类型" prop="">
                    <el-checkbox-group v-model="myTypeList" :min="1" :max="5">
                        <el-checkbox v-for="(type) in typeList" :key="type" :label="type.typeId">
                            {{ type.type }}
                        </el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
            </el-col>
        </el-row>
    </el-form>
    <span class="dialog-footer">
        <el-button @click="changeDialog(false)">取消</el-button>
        <el-button type="primary" @click="submit">
            提交
        </el-button>
    </span>
</template>
<style scoped>
.el-row .el-col {
    position: relative;
}

.update {
    width: 104px;
    height: 144px;
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
    justify-content: center;
    align-items: center;
    cursor: pointer;
    outline: none;
    background-size: cover;
}

.tip {
    display: flex;
    width: 80%;
    background-color: rgba(0, 103, 229, .08);
    height: 40px;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
}


input {
    font-size: 100%;
    line-height: 1.15;
    margin: 0;
    touch-action: manipulation;
    overflow: hidden;
    opacity: 0;
}

.dialog-footer {

    right: 40px;
    margin-bottom: 50px;
}

.dialog-footer .el-button {
    width: 100px;
}

.content {
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.content .el-input {
    width: 250px;
    padding-bottom: 20px;
}
</style>