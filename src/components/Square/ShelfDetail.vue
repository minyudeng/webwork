<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';


const router = useRouter()
const shelfId = ref(router.currentRoute._rawValue.params.id)
</script>
<template>
    {{ shelfId }}
</template>
<style>

</style>