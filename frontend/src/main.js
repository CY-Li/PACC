import { createApp } from 'vue'
import App from './App.vue'
import router from './router';

// Global CSS imports
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap CSS
import 'bootstrap-icons/font/bootstrap-icons.css'; // Bootstrap Icons
import './assets/scss/main.scss'; // Project's main global SCSS

createApp(App).use(router).mount('#app');
