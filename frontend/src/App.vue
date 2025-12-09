<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';

const route = useRoute();
const showFooter = computed(() => route.path !== '/login');
</script>

<template>
  <Header />
  <main>
    <router-view />
  </main>
  <Footer v-if="showFooter" />
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
main {
  /* padding-top: 80px; Default padding for desktop header */
}

@media (max-width: 992px) {
  main {
    padding-top: 60px; /* Padding for mobile fixed header */
  }
}
</style>
