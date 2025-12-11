import { createApp } from 'vue'
import App from './App.vue'
import router from './router';

// Global CSS imports
// import 'bootstrap/dist/css/bootstrap.min.css'; // This is replaced by the import in main.scss
import 'bootstrap-icons/font/bootstrap-icons.css'; // Bootstrap Icons
import './assets/scss/main.scss'; // Project's main global SCSS

// Import Bootstrap's JavaScript bundle
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

createApp(App).use(router).mount('#app');
