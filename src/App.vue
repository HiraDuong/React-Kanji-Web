<script setup>
import { RouterView } from "vue-router";
import Header from "./views/layouts/Header.vue";
</script>

<template>
    <Header />
    <div class="content">
        <RouterView />
    </div>
</template>

<style scoped>
.content {
    margin-top: 100px;
}
</style>
