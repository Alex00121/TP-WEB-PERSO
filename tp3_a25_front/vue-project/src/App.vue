<script setup>
import AppNavigation from "./components/AppNavigation.vue";
import { useRoute } from "vue-router";

const route = useRoute();
</script>

<template>
  <AppNavigation v-if="route.path !== '/login' && route.path !== '/signup'" />
  <RouterView />
</template>

<style scoped>
</style>
