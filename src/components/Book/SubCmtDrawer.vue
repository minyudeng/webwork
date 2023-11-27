<script setup>
import request from '@/axios/request';
import { MyMessage } from '@/plugins/Message';
import { onMounted, ref } from 'vue';
import { useStore } from 'vuex';

const props = defineProps({
    cid: Number
})
const store = useStore()
onMounted(() => {
    getsubCmtList()
})

const subCmtList = ref()
const getsubCmtList = () => {
    request.get(`/subcmt/get/${props.cid}`, {
        params: {
            likeUId: store.getters.getUserId
        }
    })
        .then(res => {
            subCmtList.value = res.data
        }).catch(error => {
            MyMessage('获取评论失败', 'error')

        })
}

const content = ref('')

const submitCmt = () => {
    if (content.value.length < 5) {
        MyMessage('书评至少五个字', 'warning')
        return
    }
    request.postForm('/subcmt/add', {
        'cid': props.cid,
        'uid': store.getters.getUserId,
        'content': content.value
    }).then((res) => {
        MyMessage(res.msg, 'success')
    }).catch(error => {
        MyMessage('未知错误', 'error')
    }).finally(()=>{
        getsubCmtList()
    })
}
const likeSubCmt = (subcmtId) => {
    request.putForm('subcmt/like', {
        'subcmtId': subcmtId,
        'uid': store.getters.getUserId
    }).then(res => {
        MyMessage(res.msg, 'success')
    }).catch(error => {
        MyMessage('未知错误', 'error')
    }).finally(()=>{
        getsubCmtList()
    })
}

</script>
<template>
    <div id="main">
        <div class="write">
            <el-input v-model="content" :autosize="{ minRows: 3, maxRows: 8 }" type="textarea" placeholder="请输入"
                show-word-limit maxlength="500" />
            <div>
                <div class="but">
                    <n-button type="primary" ghost @click="content = ''">清空内容</n-button>
                    <n-button type="info" ghost @click="submitCmt">提交评论</n-button>
                </div>
            </div>
        </div>
        <ul>
            <li v-for="(item, index) in subCmtList" class="book-li">
                <div class="user-detail">
                    <div class="avatar">
                        <img :src="item.avatar">
                    </div>
                    <div style="flex: 1;font-size: 14px;overflow: hidden;">
                        <div class="name">
                            {{ item.username }}
                        </div>
                        <div class="time">
                            {{ item.formatTime }}
                        </div>
                    </div>
                </div>
                <p style="white-space: pre-line;">{{ item.content }}</p>
                <div class="reply">
                    <span @click="likeSubCmt(item.subcmtId)">
                        <svg v-if="item.liked == false" t="1700839723805" class="icon" viewBox="0 0 1024 1024" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" p-id="2723" width="200" height="200">
                            <path
                                d="M885.9 533.7c16.8-22.2 26.1-49.4 26.1-77.7 0-44.9-25.1-87.4-65.5-111.1a67.67 67.67 0 0 0-34.3-9.3H572.4l6-122.9c1.4-29.7-9.1-57.9-29.5-79.4-20.5-21.5-48.1-33.4-77.9-33.4-52 0-98 35-111.8 85.1l-85.9 311H144c-17.7 0-32 14.3-32 32v364c0 17.7 14.3 32 32 32h601.3c9.2 0 18.2-1.8 26.5-5.4 47.6-20.3 78.3-66.8 78.3-118.4 0-12.6-1.8-25-5.4-37 16.8-22.2 26.1-49.4 26.1-77.7 0-12.6-1.8-25-5.4-37 16.8-22.2 26.1-49.4 26.1-77.7-0.2-12.6-2-25.1-5.6-37.1zM184 852V568h81v284h-81z m636.4-353l-21.9 19 13.9 25.4c4.6 8.4 6.9 17.6 6.9 27.3 0 16.5-7.2 32.2-19.6 43l-21.9 19 13.9 25.4c4.6 8.4 6.9 17.6 6.9 27.3 0 16.5-7.2 32.2-19.6 43l-21.9 19 13.9 25.4c4.6 8.4 6.9 17.6 6.9 27.3 0 22.4-13.2 42.6-33.6 51.8H329V564.8l99.5-360.5c5.2-18.9 22.5-32.2 42.2-32.3 7.6 0 15.1 2.2 21.1 6.7 9.9 7.4 15.2 18.6 14.6 30.5l-9.6 198.4h314.4C829 418.5 840 436.9 840 456c0 16.5-7.2 32.1-19.6 43z"
                                p-id="2724"></path>
                        </svg>
                        <svg v-else t="1700839866180" class="icon" viewBox="0 0 1024 1024" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" p-id="2862" width="200" height="200">
                            <path
                                d="M885.9 533.7c16.8-22.2 26.1-49.4 26.1-77.7 0-44.9-25.1-87.4-65.5-111.1a67.67 67.67 0 0 0-34.3-9.3H572.4l6-122.9c1.4-29.7-9.1-57.9-29.5-79.4-20.5-21.5-48.1-33.4-77.9-33.4-52 0-98 35-111.8 85.1l-85.9 311h-0.3v428h472.3c9.2 0 18.2-1.8 26.5-5.4 47.6-20.3 78.3-66.8 78.3-118.4 0-12.6-1.8-25-5.4-37 16.8-22.2 26.1-49.4 26.1-77.7 0-12.6-1.8-25-5.4-37 16.8-22.2 26.1-49.4 26.1-77.7-0.2-12.6-2-25.1-5.6-37.1zM112 528v364c0 17.7 14.3 32 32 32h65V496h-65c-17.7 0-32 14.3-32 32z"
                                p-id="2863"></path>
                        </svg>
                        点赞
                    </span>
                    <p style="margin-left: 10px;">{{ item.like }}</p>
                </div>
            </li>
        </ul>
    </div>
</template>
<style scoped>
#main {
    display: flex;
    flex-wrap: wrap;
}

.write {
    width: 100%;
}

.write el-input {
    width: 100%;
}

.write .but {
    display: flex;
    margin: 10px 4px;
    justify-content: space-around;
}

.book-li {
    border-bottom: 1px solid #f5f5f7;
    padding: 24px 0 12px;
    display: block;
}

.book-li .user-detail {
    align-items: center;
    display: flex;
    /* justify-content: center; */
    margin-bottom: 16px;
}

.book-li .user-detail .avatar {
    border-radius: 50%;
    cursor: pointer;
    height: 50px;
    margin-right: 6px;
    overflow: hidden;
    width: 50px;
}

.book-li .user-detail .avatar img {
    vertical-align: middle;
    height: 100%;
    width: 100%;
}

.book-li .user-detail .name {
    line-height: 1.2;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #333;
    cursor: pointer;
    margin-bottom: 6px;
}

.book-li .user-detail .time {
    color: #b2b2b2;
    overflow: hidden;
    text-overflow: ellipsis;
    cursor: pointer;
}

.book-li p {
    margin-left: 10px;
    font-size: 14px;
    line-height: 20px;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #666;
}

.book-li .reply {
    align-items: center;
    color: #b2b2b2;
    cursor: pointer;
    display: flex;
    font-size: 14px;
    height: 16px;
    justify-content: flex-end;
    margin-top: 16px;
}

.book-li .reply span {
    margin-right: 16px;
    font-size: 14px;
}

.book-li .reply .icon {
    margin-right: 4px;
    width: 15px;
    height: 15px;
}

.book-li ul {
    width: 100%;
}</style>