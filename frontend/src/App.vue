<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';

const route = useRoute();
const showPublicLayout = computed(() => {
  return route.path !== '/login' && !route.path.startsWith('/admin');
});
</script>

<template>
  <Header v-if="showPublicLayout" />
  <main :class="{ 'public-main': showPublicLayout }">
    <router-view />
  </main>
  <Footer v-if="showPublicLayout" />
</template>

<style>
/* Global styles can go here */
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>

<style scoped>
main.public-main {
  /* This padding is now only for the public layout */
}

@media (max-width: 992px) {
  main.public-main {
    padding-top: 60px; /* Padding for mobile fixed header */
  }
}
</style>
