<script setup>
import SubCmt from '@/components/Book/SubCmtDrawer.vue'

import request from '@/axios/request';
import { MyMessage } from '@/plugins/Message';
import { onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import { MyConfirmElMessageBox } from '@/plugins/Message'

const props = defineProps({
    bid: String,
})
const store = useStore()
const commentList = ref()
const commentNumber = ref()
const commentExist = ref(false)
onMounted(() => {
    getComment()
})
const getComment = () => {
    request.get(`/comment/get/${props.bid}`, {
        params: {
            likeUid: store.getters.getUserId
        }
    })
        .then((res) => {
            commentList.value = res.data.comments
            commentNumber.value = res.data.number

            if (commentList.value.length > 0) {
                commentExist.value = true
            }

            setDrawer()
        })
}

const setDrawer = () => {
    commentList.value = commentList.value.map(e => {
        return { ...e, drawer: false }
    })
}
const content = ref('')
const rate = ref(5)

const submitCmt = () => {
    if (content.value.length < 5) {
        MyMessage('书评至少五个字', 'warning')
        return
    }
    let from = new FormData()
    from.append('bid', props.bid)
    from.append('uid', store.getters.getUserId)
    from.append('content', content.value)
    from.append('rating', rate.value * 2)
    request.post('/comment/add', from)
        .then(res => {
            MyMessage(res.msg, 'success')
            location.reload()
        }).catch(error => {
            MyMessage(error.data.msg, 'error')
        })
}
const cmtLike = (cid) => {
    request.postForm('/cmt-like/like', {
        'cid': cid,
        'uid': store.getters.getUserId
    }).then(res => {
        MyMessage(res.msg, 'success')
        getComment()
    }).catch(error => {
        MyMessage('未知错误', 'error')
    })
}

const handleClose = function (done) {
    MyConfirmElMessageBox('你确定要关闭评论区吗？', '', done)
}
</script>
<template>
    <div class="top">
        <div class="left">
            书友吧
        </div>
        <div>
            {{ commentNumber }} 条评论
        </div>
    </div>
    <div class="write">
        <n-input v-model:value="content" type="textarea" round placeholder="真实客观，多维描述，结构清晰，内容充实的书评，可以帮助到更多书友" clearable
            :maxlength="5000" show-count :autosize="{
                minRows: 2,
                maxRows: 20
            }" />
        <div>
            <div style="display: flex;flex-direction: column;margin-left: 50px;">
                <n-rate v-model:value="rate" allow-half :texts="['太差了', '不太好', '一般般', '还不错', '超精彩']" show-text
                    size="large" />
                <n-button color="#0bafff" @click="submitCmt">提交书评</n-button>
            </div>

        </div>
    </div>

    <ul v-if="commentExist">
        <li v-for="(item, index) in commentList" class="book-li">
            <div class="user-detail">
                <div class="avatar">
                    <img :src="item.avatar">
                </div>
                <div style="flex: 1;font-size: 14px;overflow: hidden;">
                    <div class="name">
                        {{ item.username }}
                    </div>
                    <div class="time">
                        {{ item.time }}
                    </div>
                </div>
                <div class="rating">
                    <n-rate readonly allow-half :value="item.rating / 2" />
                </div>
            </div>
            <p style="white-space: pre-line;">{{ item.content }}</p>
            <div class="reply">
                <span @click="item.drawer = true">
                    <svg t="1700839368673" class="icon" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="1730" width="200" height="200">
                        <path
                            d="M806.9 783.2H500.6c-13.3 0-24-10.7-24-24s10.7-24 24-24h306.3c37.6 0 68.1-34.1 68.1-76v-380c0-41.9-30.6-76-68.1-76H217.2c-37.6 0-68.1 34.1-68.1 76v380c0 41.9 30.6 76 68.1 76H344c13.3 0 24 10.7 24 24s-10.7 24-24 24H217.2c-64 0-116.1-55.6-116.1-124v-380c0-68.4 52.1-124 116.1-124h589.7c64 0 116.1 55.6 116.1 124v380c0 68.4-52.1 124-116.1 124z"
                            p-id="1731"></path>
                        <path
                            d="M336.6 910.2c-7.2 0-14.2-3.2-19-9.3-8.1-10.5-6.3-25.5 4.2-33.7l162-126c10.5-8.1 25.5-6.3 33.7 4.2 8.1 10.5 6.3 25.5-4.2 33.7l-162 126c-4.3 3.5-9.5 5.1-14.7 5.1z"
                            p-id="1732"></path>
                        <path d="M303 468.7m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" p-id="1733"></path>
                        <path d="M512 469.7m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" p-id="1734"></path>
                        <path d="M721 468.7m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" p-id="1735"></path>
                    </svg>
                    回复
                </span>
                <span @click="cmtLike(item.cid)">
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
            <div class="sub" v-if="item.subNum != 0" @click="item.drawer = true">
                查看全部<p>{{ item.subNum }}</p>条评论
            </div>
            <el-drawer class="drawer" v-model="item.drawer" title="" :with-header="false" :before-close="handleClose">
                <SubCmt :cid="item.cid" />
            </el-drawer>
        </li>
    </ul>
    <div v-else>
        <n-empty description="没有评论哦，快去发布评论吧！">
            <template #extra>
            </template>
        </n-empty>
    </div>
</template>
<style scoped>
.top {
    display: flex;
    height: 64px;
    align-items: center;
    justify-content: space-between;
    border-top: 1px solid #f2f2f2;
}

.top .left {
    color: #333;
    font-size: 22px;
    font-weight: 500;
    line-height: 32px;
    /* font-family: '青鸟华光'; */
}

.write {
    border-bottom: 1px solid #f5f5f7;
    border-top: 1px solid #f2f2f2;
    display: flex;

}

.write .n-input {
    width: 500px;
    background-color: transparent;

}

.write .n-button {
    width: 134px;
    margin-right: 20px;
    border-radius: 22px;
    font-size: 16px;
    height: 44px;
    line-height: 44px;
    padding: 0 20px;
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

.book-li .reply span:first-of-type {
    margin-right: 16px;
    font-size: 14px;
}

.book-li .reply .icon {
    margin-right: 4px;
    width: 15px;
    height: 15px;
}

.book-li .sub {
    display: flex;
    margin-top: 5px;
    margin-left: 20px;
    flex-wrap: nowrap;
    align-items: center;
    color: #666;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
}

.book-li .sub:hover {
    color: rgb(108, 118, 181);
}

.book-li .sub p {
    font-size: 14px;
    color: #b2b2b2;
    margin: 0 3px;
}</style>