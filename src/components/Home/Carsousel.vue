<script setup>
import { onMounted, ref } from 'vue';
import request from '@/axios/request';

import ColorThief from 'colorthief'

const imgs = ref([
  require('../../../static/imgs/1679989834707_413772.png'),
  require('../../../static/imgs/1692934685326_289167.png')
])

onMounted(() => {

})

const colorThief = new ColorThief()
const changeColor = async (img) => {
  // 得到图片的前三种主要颜色
  let colors = await colorThief.getPalette(img, 3)
  //要改变颜色的区域
  let cars = document.getElementById('cars')
  // cars.style.background = `linear-gradient(to bottom,rgba(${colors[0]}),rgba(${colors[1]}),rgba(${colors[1]},0.5))`
  // 设置为单一颜色
  cars.style.background = `rgba(${colors[0]},0.6)`;
  cars.style.transition = 'all 1.5s ease-in-out'
}
const changeEnvent = (i) => {
  let img = document.querySelectorAll('.el-carousel__item img')
  changeColor(img[i])
}
</script>
<template>
  <div id="cars">
    <el-carousel @change="changeEnvent" trigger="click">
      <el-carousel-item v-for="(item, index) in imgs" :key="index" style="border-radius: 10px;">
        <img :src="item" class="img">
      </el-carousel-item>
    </el-carousel>
    <div class="new">
      <div class="first">
        <span>
          <div>最新</div>
          <div>资讯</div>
        </span>
      </div>
      <div v-for="i in 4">
        <div class="item">
          <el-text class="i1" truncated>
            小说名字哦哦哦哦哦哦
          </el-text>
          <el-text class="i2" line-clamp="2">
            啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦噢噢噢噢
          </el-text>
        </div>
      </div>
    </div>
  </div>
</template>
  
<style scoped>
#cars {
  height: 440px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
}

.el-carousel {
  height: 300px;
  margin-top: 10px;
  margin: auto auto;
  width: 1118px;
}

.img {
  background-size: cover;
  height: 300px;
  width: 100%;
}

.new {
  height: 100px;
  margin-top: auto;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  background-color: rgba(236, 244, 249, .6);
  border-radius: 20px;
  flex-direction: row;
}

.new .first {
  display: flex;
  width: 100px;
  justify-content: center;
  align-items: center;
}

.new .first span {
  display: flex;
  flex-direction: column;
  font-size: 22px;
  letter-spacing: 3px;
  text-shadow: 3px 3px 3px rgba(0, 0, 0, 0.5);
  width: 90px;
  height: 90px;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
  color: aliceblue;
  cursor: pointer;
  background: linear-gradient(45deg, #007bff, rgb(107,207,251), #007bff, rgb(107,207,251));
  /* 多个颜色停止点 */
  transition: background 0.2s ease-in-out;
  /* 添加渐变过渡效果 */
  animation: gradientAnimation 4s infinite; /* 添加动画 */
  background-size: 400% 400%; /* 添加 background-size 属性 */
}
@keyframes gradientAnimation {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.new .item {
  margin-right: 35px;
  width: 224px;
  cursor: pointer;
}

.new .item .i1 {
  font-weight: 500;
  color: #333;
  font-size: 16px;
  line-height: 2.5;
  letter-spacing: 1.2px;
  transition: all 0.3s ease-in-out;
}
.new .item .i1:hover{
  color: #0bafff
}

.new .item .i2 {
  color: #666;
  font-size: 12px;
  line-height: 18px;
  margin-top: 8px;
  letter-spacing: 1px;
}
</style>
  