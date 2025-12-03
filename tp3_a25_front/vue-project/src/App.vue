<script setup>
import AppNavigation from "./components/AppNavigation.vue";
import { useRoute } from "vue-router";

const route = useRoute();
</script>

<template>
  <!-- On cache le menu sur /login et /signup -->
  <AppNavigation v-if="route.path !== '/login' && route.path !== '/signup'" />
  <RouterView />
</template>

<style scoped>
</style>
