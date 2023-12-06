<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()

const chapter = ref(router.currentRoute._rawValue.params.chapter)

</script>
<template>
    <div class="chapter">
        <h1>{{ chapter }}</h1>
        <p>这里是章节内容。</p>
        <div class="navigation">
            <a>上一章</a>
            <a>下一章</a>
        </div>
    </div>
</template>
<style scoped>
.chapter {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f0f0f0;
    width: 60%;
    margin: 50px auto;
    padding: 20px;
    background-color: #fff;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

.chapter h1 {
    text-align: center;
    color: #333;
}

.chapter p {
    text-indent: 2em;
    color: #666;
    line-height: 1.6;
}

.navigation {
    text-align: center;
    margin-top: 20px;
}

.navigation a {
    margin: 0 10px;
    color: #00f;
    text-decoration: none;
}
</style>