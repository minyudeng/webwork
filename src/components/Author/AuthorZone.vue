<script setup>
import { inject, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()
const changeactiveIndex = inject("changeactiveIndex")

onMounted(() => {
    changeactiveIndex('2')
})
//点击左侧逻辑
const actived = ref('1')
const selectd=(index)=>{
    actived.value = index
    index === '1' ? router.push('/admin/authorzone/manage') : router.push('/admin/authorzone/comment')
}

</script>
<template>
    <div id="main">
        <el-row>
            <el-col :span="6">
                <div class="left">
                    <span @click="selectd('1')">
                        <el-icon :class="{actived : actived==='1'}"><Memo /></el-icon>
                        作品管理  
                    </span>
                    <span @click="selectd('2')">
                        <el-icon :class="{actived : actived==='2'}"><ChatDotSquare /></el-icon>
                        互动管理
                    </span>
                </div>
            </el-col>
            <el-col :span="18">
                <RouterView></RouterView>
            </el-col>
        </el-row>
    </div>
</template>
<style scoped>
#main {
    background-color: rgb(245, 246, 247);
}
.el-row{
    background-color: rgb(245, 246, 247);
}
.left{
    position: relative;
    height: 100px;
    padding: 60px;
    display: flex;
    display: block;
    padding-right: 0;
    right: 0;
}
.left span{
    background-color: #ffffff;
    height: 50px;
    width: 170px;
    display: flex;
    text-align: center;
    font-size: 20px;
    align-items: center; 
    justify-content: center; 
    cursor: pointer;
    border-radius: 4px;
    border: 0 1px 4px rgba(21,26,48,.08);
}
.left span .el-icon.actived{
    color: #0067e5;
    position: relative;
}
.left span .el-icon.actived::before {
    position: absolute;
    content: "";
    left: -35px;
    width: 3px;
    height: 18px;
    background-color: #0067e5;
    transition:1s ease;
}
</style>