<template>
    <div>
        <el-container>
            <!-- <el-affix>
                <el-header style="border-bottom: solid 1px var(--el-menu-border-color);">
                    <el-row class="top">
                        <el-col :span="5">
                            <el-icon size="24">
                                <List />
                            </el-icon>
                            <span>申请列表</span>
                        </el-col>
                    </el-row>
                </el-header>
            </el-affix> -->
            <el-header style="border-bottom: solid 1px var(--el-menu-border-color);">
                <el-row class="top">
                    <el-col :span="5">
                        <el-icon size="24">
                            <List />
                        </el-icon>
                        <span>申请列表</span>
                    </el-col>
                </el-row>
            </el-header>

            <el-main>
                <div id="contain">
                    <div style="border-radius: 10px;border: 2px solid #d7d7d7;">
                        <el-row class="top" style="height: 50px;background-color: #ffffff;" j ustify="space-between">
                            <el-col :span="5" style="padding-left: 8px;">
                                <el-input :change=getLike() v-model="key" placeholder="输入关键词查询" clearable>
                                    <template #prefix>
                                        <el-icon>
                                            <search />
                                        </el-icon>
                                    </template>
                                </el-input>
                            </el-col>
                            <el-col :span="1" style="padding-left: 8px;">
                                <el-button>
                                    查询
                                </el-button>
                            </el-col>
                            <el-col :span="8">

                            </el-col>
                            <el-col :span="4" style="padding-left: 8px; right: 10px; cursor: pointer;">
                                <el-dropdown trigger="click">
                                    <span>
                                        状态: {{ status }}<el-icon class="el-icon--right"><arrow-down /></el-icon>
                                    </span>
                                    <template #dropdown>
                                        <el-dropdown-menu>
                                            <el-dropdown-item @click="setStatus('全部')">全部</el-dropdown-item>
                                            <el-dropdown-item @click="setStatus('待处理')">待处理</el-dropdown-item>
                                            <el-dropdown-item @click="setStatus('通过')">通过</el-dropdown-item>
                                            <el-dropdown-item @click="setStatus('拒绝')">拒绝</el-dropdown-item>
                                        </el-dropdown-menu>
                                    </template>
                                </el-dropdown>
                            </el-col>
                        </el-row>
                        <div style="background-color: #dee7e6;">
                            <div class="card" v-for="(data, index) in applyData">
                                <el-card shadow="hover">
                                    <el-row style="font-size: large;font-weight: 700;">
                                        <el-col :span="8">UID:{{ data.uid }}</el-col>
                                        <el-col :span="16">笔名：{{ data.aname }}</el-col>
                                    </el-row>
                                    <el-row style="padding-top: 10px;">
                                        <el-col :span=16>
                                            <el-avatar shape="square" :size="60" :src="data.avatar" />
                                        </el-col>

                                        <el-col :span="8" style="
                                    height: 60px;
                                    color: #3e606f;
                                    font-size: 30px;
                                    ">
                                            {{ data.username }}
                                        </el-col>
                                    </el-row>
                                    <el-row style="padding-top: 20px; text-indent: 2em;color: #193441;">
                                        {{ data.message }}
                                    </el-row>

                                    <div class="but" :class="{
                                        'refuse': data.audit === 0,
                                        'agree': data.audit === 1,
                                        'pending': data.audit === 2,
                                    }" v-if="data.audit === 2">
                                        <el-popover trigger="hover" placement="top" :width="160">
                                            <p>处理申请</p>
                                            <el-button @click="pendingApply(1, data.uid)"
                                                color="rgb(119, 231, 119)">同意</el-button>

                                            <el-button @click="pendingApply(0, data.uid)"
                                                color="rgb(231, 50, 50)">拒绝</el-button>
                                            <template #reference>
                                                <el-button color="#626aef" size="large">{{ applystatus(data.audit)
                                                }}</el-button>
                                            </template>
                                        </el-popover>
                                    </div>
                                    <div class="but" :class="{
                                            'refuse': data.audit === 0,
                                            'agree': data.audit === 1,
                                            'pending': data.audit === 2,
                                        }" v-else>
                                        <span>{{ applystatus(data.audit) }}</span>
                                    </div>
                                    <div style="position: absolute;
                                    bottom: 20px;right: 10px;color: #193441;">
                                        {{ data.time }}
                                    </div>
                                </el-card>
                            </div>
                        </div>
                    </div>
                </div>
            </el-main>
        </el-container>
    </div>
</template>
<script setup>
import { inject, onMounted, ref, watch } from 'vue';
import request from '@/axios/request';
import { MyMessage } from '@/plugins/Message.js'

const changeactiveIndex = inject("changeactiveIndex")
const key = ref('')
const statuscode = ref(null)
const status = ref('全部')
const setStatus = (value) => {
    status.value = value
}
watch(status, async (newv, old) => {
    if (newv == '全部') {
        statuscode.value = null
    }
    if (newv == '拒绝') {
        statuscode.value = 0
    }
    if (newv == '通过') {
        statuscode.value = 1
    }
    if (newv == '待处理') {
        statuscode.value = 2
    }


})
const applystatus = (i) => {
    switch (i) {
        case 0: return '拒绝'
        case 1: return '同意'
        case 2: return '待处理'
    }
}
const getLike = () => {
    request.get('/getApply', {
        params: {
            likename: key.value,
            audit: statuscode.value
        }
    }).then(res => {
        applyData.value = res.data
    })
}

onMounted(() => {
    document.title = '作者申请'
    changeactiveIndex('4')

})
const pendingApply = (audit, uid) => {
    request.put('/updateaudit', { audit, uid })
        .then(res => {
            MyMessage("更新成功", "success")
            getLike()
        }).catch(error => {
            MyMessage(error.data.msg, "error")
        })
}

const applyData = ref([])

</script>
<style scoped>
.card {
    display: inline-block;
    padding: 20px;
}

.el-card {
    position: relative;
    width: 300px;
    height: 400px;
    border-radius: 10px;
    background-color: #91aa9d44;
    color: #193441;
    cursor: pointer;
}

.el-card__body {
    padding: 0;
}

.el-header {
    font-size: 20px;
}

.el-main {
    padding: 0;
    background-color: #fcfff5;
    width: 100%;
    height: 100%;
}

#contain {
    padding: 40px;
}

.top.el-row {
    height: 100%;
    display: flex;
    align-items: center;
    text-align: center;
}

.el-col {
    display: flex;
    align-items: center;
}

.el-divider {
    margin: 0;
}

.refuse {
    position: absolute;
    bottom: 20px;
    left: 20px;
    width: 82px;
    height: 40px;
    border-radius: 5px;
    text-align: center;
    color: rgb(43, 42, 42);
    background-color: rgb(234, 75, 75);

}

.agree {
    position: relative;
    color: rgb(43, 42, 42);
    position: absolute;
    bottom: 20px;
    left: 20px;
    background-color: rgb(127, 255, 189);
    width: 82px;
    height: 40px;
    border-radius: 5px;
    text-align: center;

}

.agree span,
.refuse span {
    position: relative;
    top: 8px;
}

.pending {
    position: absolute;
    bottom: 20px;
    left: 20px;
}
</style>