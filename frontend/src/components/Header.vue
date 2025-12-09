<template>
  <header id="header">
    <div class="navBar">
      <div class="logo">
        <router-link to="/">
          <img src="/images/logo.png" alt="Logo">
        </router-link>
      </div>
      
      <div class="nav-right">
        <!-- Desktop Navigation -->
        <div class="navs-container">
          <router-link to="/" class="nav homeNav">首　　頁</router-link>
          <router-link to="/hall" class="nav hallNav">商會大廳</router-link>
          <router-link to="/wallet" class="nav walletNav">會員錢包</router-link>
          <router-link to="/account" class="nav mainNav">會員資訊</router-link>
        </div>
        
        <div class="actions">
          <router-link v-if="!isLogin" to="/login" class="registBtn">登入 / 註冊</router-link>
          <div v-else class="dropdown">
            <div class="registBtn" data-bs-toggle="dropdown" aria-expanded="false">
              {{ userData.mm_name || '會員' }}
            </div>
            <ul class="dropdown-menu text-center">
              <li><router-link to="/account" class="text-white dropdown-item">會員資訊</router-link></li>
              <li><div class="text-white my-2 dropdown-item" @click="logout" style="cursor: pointer;">登出</div></li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Mobile Hamburger Button -->
      <button class="hamburger" @click="toggleMobileNav(!isMobileNavOpen)" :class="{'is-open': isMobileNavOpen}" aria-label="Toggle menu">
        <span class="line"></span>
        <span class="line"></span>
        <span class="line"></span>
      </button>
    </div>

    <!-- Mobile Menu Overlay -->
    <div class="mobile-nav-container" :class="{ 'is-open': isMobileNavOpen }">
      <div class="mobile-nav">
        <router-link v-if="!isLogin" to="/login" class="nav registNav" @click="toggleMobileNav(false)">登入 ∕ 註冊</router-link>
        <router-link to="/" class="nav homeNav" @click="toggleMobileNav(false)">首　　頁</router-link>
        <router-link to="/hall" class="nav hallNav" @click="toggleMobileNav(false)">商會大廳</router-link>
        <router-link to="/wallet" class="nav walletNav" @click="toggleMobileNav(false)">會員錢包</router-link>
        <router-link to="/account" class="nav mainNav" @click="toggleMobileNav(false)">會員資訊</router-link>
        <div class="menuFooter text-en">Ping An Chamber of commerce</div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const userData = ref({});
const isLogin = ref(false);
const isMobileNavOpen = ref(false);

const toggleMobileNav = (open) => {
  isMobileNavOpen.value = open;
};

watch(isMobileNavOpen, (isOpen) => {
  document.body.classList.toggle('lock-body', isOpen);
});

const logout = () => {
  localStorage.removeItem("mm_user_data");
  isLogin.value = false;
  userData.value = {};
  router.push('/login');
};

const setVh = () => {
  document.documentElement.style.setProperty("--vh", `${window.innerHeight * 0.01}px`);
};

onMounted(() => {
  const storedUserData = JSON.parse(localStorage.getItem("mm_user_data"));
  if (storedUserData && storedUserData.accessToken) {
    isLogin.value = true;
    userData.value = storedUserData;
  }
  setVh();
  window.addEventListener('resize', setVh);
});

onUnmounted(() => {
  window.removeEventListener('resize', setVh);
});
</script>

<style lang="scss" scoped>
@use 'sass:color';
@use '../assets/scss/_variables.scss' as *;

#header {
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 999;
  background: white;
  box-shadow: 0px 3px 10px #71631C1A;
}

.navBar {
  display: flex;
  justify-content: space-between;
  align-items: stretch;
}

.logo {
  width: 160px;
  display: flex;
  align-items: center;
  padding-left: 20px;
  img { max-width: 100%; height: auto; }
}

.nav-right {
  display: flex;
  align-items: stretch;
  flex-grow: 1; /* Allow nav-right to take up remaining space */
}

.navs-container {
  display: flex;
  align-items: stretch;
  margin-inline: auto; /* Center the navigation links */
}

.nav {
  margin: 0 40px;
  font-size: 18px;
  color: $black;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  text-decoration: none;
  border-top: 5px solid transparent;
  transition: color 0.3s ease, border-color 0.3s ease;
  
  &.router-link-exact-active {
    border-top-color: $primary;
  }
  &:hover {
    color: color.adjust($black, $lightness: 20%);
  }
}

.actions {
  display: flex;
  align-items: stretch;
}

.registBtn {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 50px;
  background: $primary;
  color: white;
  border-radius: 25px 0 25px 0;
  cursor: pointer;
  text-decoration: none;
}

.dropdown .dropdown-menu {
  background: $primary;
  border-radius: 0;
  margin-top: 10px !important; // Ensure it's below the button
  border: none;
  li:hover { background: color.adjust($primary, $lightness: 5%); }
}

.hamburger { display: none; }
.mobile-nav-container { display: none; }

// --- Mobile Styles ---
@media #{$mobile} {
  #header { // The top-level header tag
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 60px; // Mobile header height
    background: #f5f5f5; // Mobile background
    box-shadow: none; // No shadow on mobile
  }

  .navBar { // The inner container on mobile
    height: 100%; // Fill the fixed header height
    padding: 0 1rem;
    justify-content: center; // Keep logo centered
  }
  
  .logo { width: 120px; padding: 0; }
  
  .nav-right { display: none; } // Hide desktop navs and actions
  
  .hamburger {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 1.5rem;   // Smaller size
    height: 1.5rem;  // Smaller size
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0;
    z-index: 10001; 
    position: absolute;
    right: 1rem; // Position on the right
    left: auto; // Reset left
    top: 50%;
    transform: translateY(-50%);

    .line {
      width: 100%;
      height: 0.1875rem;
      background: $primary;
      border-radius: 10px;
      transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
    }
    
    &.is-open .line:nth-child(1) {
      transform: rotate(45deg) translate(0.35rem, 0.35rem);
    }
    &.is-open .line:nth-child(2) {
      opacity: 0;
    }
    &.is-open .line:nth-child(3) {
      transform: rotate(-45deg) translate(0.35rem, -0.35rem);
    }
  }

  .mobile-nav-container {
    display: block; // Itself must be visible to be a container
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 10000;
    opacity: 0;
    transition: opacity 0.3s ease;
    
    .mobile-nav {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      background: white;
    }
    
    .nav {
      margin-bottom: 2rem;
      font-size: 1.5rem;
      border: none;
      &.router-link-active { color: $primary; }
    }

    .menuFooter {
      display: block;
      position: absolute;
      bottom: 1rem;
      font-size: 12px;
      color: $secondary;
    }
  }

  .mobile-nav-container.is-open {
    opacity: 1;
    pointer-events: auto;
  }
}

.lock-body {
  overflow: hidden;
}
</style>
