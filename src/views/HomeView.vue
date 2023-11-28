<script setup>
import request from '@/axios/request';
import Carsousel from '@/components/Home/Carsousel.vue';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const store = useStore()
const router = useRouter()
onMounted(() => {
  document.title = '首页'
  store.dispatch("setIndex", '1')
  getBookList()
})
const bookList = ref()
const getBookList = () => {
  request.get('/book/get', {
    params: {
      'pageNum': 1,
      'pageSize': 6,
      'orderBy': 'rating desc'
    }
  }).then(res => {
    bookList.value = res.data.list
  })
}
const blankBook = (bid) => {
  let routeUrl = router.resolve({
    path: `/book/${bid}`,
    params: { id: bid }
  })
  window.open(routeUrl.href, '_blank')
}
</script>
<template>
  <div id="main">
    <Carsousel />
  </div>
  <div class="contain">
    <span @click="router.push('/bookrank')" class="my-span">
      精选 >>
    </span>
    <div class="list">
      <div v-for="(item, index) in bookList">
        <div class="msg" @click="blankBook(item.bid)">
          <div class="book">
            <img :src="item.cover" alt="" srcset="">
          </div>
          <p class="name">{{ item.bname }}</p>
          <p class="intro name">
            {{ item.intro }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
#main {
  display: flex;
  flex-direction: column;
}

.contain {
  width: 80%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}

.my-span {
  align-items: center;
  cursor: pointer;
  display: flex;
  margin-bottom: 20px;
  font-size: 18px;
  color: #333;
  font-weight: 500;
  margin: 20px 0;
  transition: all 0.3s ease-in-out;
}

.my-span:hover {
  color: #0bafff;
}

.list {
  background-image: url('https://qqreader-site-1252317822.file.myqcloud.com/qq-pc/static/img/column-bg0.27fc556.png');
  width: 100%;
  background-repeat: no-repeat;
  background-size: 100% 174px;
  margin-top: 20px;
  padding: 36px 18px 40px;
  display: flex;
  justify-content: space-between;
  height: 351px;
}

.list .msg {
  cursor: pointer;
  width: 130px;
  overflow: hidden;
}

.list .msg.book {
  border: 1px solid rgba(51, 51, 51, .08);
  border-radius: 6px;
  height: 173px;
  overflow: hidden;
  position: relative;
  width: 130px;
  box-shadow: 0 4px 8px rgba(51, 51, 51, .08);
}

.list .msg .book img {
  vertical-align: middle;
  border-radius: 6px;
  height: 173px;
  width: 130px;
  transition: transform 0.5s ease-in-out;
}

.list .msg .book img:hover {
  transform: scale(1.1);
}

.list .msg .name {
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  display: -webkit-box;
  margin-top: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
  color: #333;
  font-weight: 500;
  line-height: 22px;
  max-height: 44px;
  transition: all 0.3s ease-in-out;
}

.list .msg .name:hover {
  color: #0bafff;
}

.list .msg .intro {
  color: #666;
  font-size: 12px;
  line-height: 16px;
  margin-bottom: 8px;
  max-height: 32px;
}
</style>

