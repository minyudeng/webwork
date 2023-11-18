<script setup>
import { onMounted, ref } from 'vue';
import request from '@/axios/request';

import ColorThief from 'colorthief'

const imgs = ref([
  require('../../../static/imgs/1679989834707_413772.png'),
  require('../../../static/imgs/1692934685326_289167.png')
])

onMounted(()=> {
  
})

const colorThief = new ColorThief()
const changeColor = async(img) =>{
  // 得到图片的前三种主要颜色
  let colors = await colorThief.getPalette(img, 3)
  //要改变颜色的区域
  let cars = document.getElementById('cars')
  cars.style.background = `linear-gradient(to bottom,rgba(${colors[0]}),rgba(${colors[1]}),rgba(${colors[1]},0.5))`
  cars.style.transition = 'all 2s'
}
const changeEnvent = (i) =>{
  let img = document.querySelectorAll('.el-carousel__item img')
  changeColor(img[i])
}
let img0 = document.querySelectorAll('.el-carousel__item img')
changeColor[img0[0]]
</script>
<template>
    <div id="cars"
    style="height: 500px;  
    width: 100%;">
      <el-carousel @change="changeEnvent"
      trigger="click" 
      style="height: 300px;
      width: 80%;
      padding-top: 50px;
      padding-left: 9%;
      ">
        <el-carousel-item  v-for="(item,index) in imgs" :key="index" style="border-radius: 10px;">
          <img :src="item" style="background-size: cover;height: 300px;width: 1500px;">
        </el-carousel-item>
      </el-carousel>
    </div>
  </template>
  
  <style scoped>

  </style>
  