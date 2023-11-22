<script setup>
import Carsousel from '@/components/Home/Carsousel.vue';
import { onMounted } from 'vue';
import { useStore } from 'vuex';

const store = useStore()
onMounted(() => {
  store.dispatch("setIndex", '1')
})
</script>
<template>
  <div id="main">
    <Carsousel />
  </div>
  <div class="contain">
    <span class="my-span">
      精选 >>
    </span>
    <div class="list">
      <div v-for="i in 6">
        <a href="">
          <div class="book">
            <img src="" alt="" srcset="">
          </div>
          <p class="name">书名书名</p>
          <p class="intro name">
            简介简介斤斤计较急急急急急急急急急急急急急
            急急急急急急急急急急急急急急急急急急急急急急急急急急
          </p>
        </a>
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

.list a {
  cursor: pointer;
  width: 130px;
}

.list a .book {
  border: 1px solid rgba(51, 51, 51, .08);
  border-radius: 6px;
  height: 173px;
  overflow: hidden;
  position: relative;
  width: 130px;
  box-shadow: 0 4px 8px rgba(51, 51, 51, .08);
}

.list a .name {
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
.list a .name:hover{
  color: #0bafff;
}
.list a .intro {
  color: #666;
  font-size: 12px;
  line-height: 16px;
  margin-bottom: 8px;
  max-height: 32px;
}
</style>

