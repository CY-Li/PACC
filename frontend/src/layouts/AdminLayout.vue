<template>
  <div class="admin-layout" :class="{ 'sidebar-collapsed': isCollapsed }">
    <!-- Overlay for mobile menu -->
    <div class="sidebar-overlay" v-if="isMobileMenuOpen" @click="toggleMobileMenu"></div>

    <aside class="admin-sidebar" :class="{ 'mobile-open': isMobileMenuOpen }">
      <div class="sidebar-header">
        <img src="/images/logo-light.png" alt="Logo" class="logo-full" />
        <img src="/images/logo-light.png" alt="Logo" class="logo-mini" />
      </div>

      <nav class="sidebar-nav">
        <ul>
          <li v-for="menu in menus" :key="menu.name">
            <router-link v-if="!menu.children" :to="menu.to" @click="isMobileMenuOpen = false">
              <i :class="menu.icon"></i>
              <span>{{ menu.title }}</span>
            </router-link>
            <a v-else href="#" @click.prevent="toggleSubmenu(menu.name)" :class="{ 'open': openSubmenu === menu.name }">
              <i :class="menu.icon"></i>
              <span>{{ menu.title }}</span>
              <i class="bi bi-chevron-down submenu-indicator"></i>
            </a>
            <ul class="submenu" v-if="menu.children && openSubmenu === menu.name">
              <li v-for="child in menu.children" :key="child.name">
                <router-link :to="child.to" @click="isMobileMenuOpen = false">{{ child.title }}</router-link>
              </li>
            </ul>
          </li>
        </ul>
      </nav>

      <div class="sidebar-toggler" @click="toggleSidebarCollapse">
        <i class="bi" :class="isCollapsed ? 'bi-arrow-right-short' : 'bi-arrow-left-short'"></i>
      </div>
    </aside>

    <div class="main-content-wrapper">
      <header class="admin-header">
        <div class="header-left">
          <button class="hamburger-button" @click="toggleMobileMenu">
            <i class="bi bi-list"></i>
          </button>
          <span class="admin-title">管理後台</span>
        </div>
        <div class="user-info">
          <span>Admin</span>
          <button class="logout-button">登出</button>
        </div>
      </header>
      <main class="admin-main">
        <section class="admin-content">
          <router-view></router-view>
        </section>
      </main>
      <footer class="admin-footer">
        <p>&copy;2026 Designed by 鈦敏科技</p>
      </footer>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { RouterLink, RouterView } from 'vue-router';

// State for desktop collapsible sidebar
const isCollapsed = ref(false);
const openSubmenu = ref(null);

// State for mobile fly-out menu
const isMobileMenuOpen = ref(false);

const menus = ref([
  { name: 'dashboard', to: '/admin', title: '首頁', icon: 'bi bi-speedometer2' },
  { 
    name: 'content', 
    title: '內容管理', 
    icon: 'bi bi-file-earmark-text',
    children: [
      { name: 'announcements', to: '/admin/content/announcements', title: '公告設定' },
      { name: 'images', to: '/admin/content/images', title: '圖片設定' },
    ]
  },
  { name: 'bidding', to: '/admin/bidding', title: '標會管理', icon: 'bi bi-hammer' },
  { 
    name: 'members', 
    title: '會員管理', 
    icon: 'bi bi-people',
    children: [
      { name: 'info', to: '/admin/members/info', title: '會員資料' },
      { name: 'wallet', to: '/admin/members/wallet', title: '錢包資料' },
      { name: 'kyc', to: '/admin/members/kyc', title: 'KYC審核' },
    ]
  },
  { 
    name: 'accounting', 
    title: '帳務管理', 
    icon: 'bi bi-wallet2',
    children: [
      { name: 'deposit', to: '/admin/accounting/deposit', title: '儲值' },
      { name: 'withdraw', to: '/admin/accounting/withdraw', title: '提領' },
      { name: 'records', to: '/admin/accounting/records', title: '帳務紀錄' },
    ]
  },
]);

const toggleSidebarCollapse = () => {
  isCollapsed.value = !isCollapsed.value;
  if (isCollapsed.value) {
    openSubmenu.value = null;
  }
};

const toggleSubmenu = (menuName) => {
  if (isCollapsed.value) {
    isCollapsed.value = false;
  }
  openSubmenu.value = openSubmenu.value === menuName ? null : menuName;
};

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};
</script>

<style lang="scss" scoped>
@use "sass:color";
@use '@/assets/scss/variables' as *;

$sidebar-width: 250px;
$sidebar-width-collapsed: 80px;
$header-height: 60px;
$transition-speed: 0.3s;

.admin-layout {
  display: flex;
  background-color: #f0f2f5;
  min-height: 100vh;
}

.sidebar-overlay {
  display: none; // Hidden by default
}

.admin-sidebar {
  width: $sidebar-width;
  background-color: #0d1a2e;
  color: #a6b0cf;
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  flex-shrink: 0;
  transition: width $transition-speed ease;
  z-index: 1001;
  overflow-x: hidden;

  .sidebar-header {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 1rem;
    height: $header-height;
    
    .logo-full {
      max-height: 40px;
      width: 100%;
      height: auto;
      object-fit: contain;
      display: block;
    }
    .logo-mini {
      max-height: 35px;
      display: none;
    }
  }

  .sidebar-nav {
    flex-grow: 1;
    overflow: hidden;
    padding: 1rem 0;
    
    ul { list-style: none; padding: 0; margin: 0; }

    a {
      display: flex;
      align-items: center;
      padding: 12px 25px;
      color: #a6b0cf;
      text-decoration: none;
      transition: background-color 0.2s, color 0.2s;
      white-space: nowrap;
      position: relative;
      
      i {
        font-size: 1.2rem;
        margin-right: 15px;
        width: 30px;
        text-align: center;
        transition: margin $transition-speed ease;
      }
      span { opacity: 1; transition: opacity 0.2s; }

      &:hover, &.router-link-exact-active {
        background-color: rgba(255, 255, 255, 0.05);
        color: $white;
      }
      &.router-link-exact-active { background-color: $minor; }
    }
    
    .submenu-indicator {
      position: absolute;
      right: 20px;
      font-size: 0.8rem;
      transition: transform 0.2s ease, opacity 0.2s;
    }
    a.open .submenu-indicator { transform: rotate(180deg); }

    .submenu {
      background-color: rgba(0,0,0,0.2);
      padding-left: 0;
      overflow: hidden;
      a {
        padding-left: 70px;
        font-size: 0.9em;
        &.router-link-exact-active { color: $minor; background-color: transparent; }
        &:hover { background-color: rgba(255, 255, 255, 0.05); }
      }
    }
  }

  .sidebar-toggler {
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    cursor: pointer;
    font-size: 1.5rem;
    &:hover {
      background-color: rgba(255, 255, 255, 0.05);
      color: $white;
    }
  }
}

.admin-layout:not(.sidebar-collapsed) .admin-sidebar .sidebar-nav {
  overflow-y: auto;
}

.admin-layout.sidebar-collapsed {
  .admin-sidebar {
    width: $sidebar-width-collapsed;
    .sidebar-header {
      .logo-full { display: none; }
      .logo-mini { display: block; }
    }
    .sidebar-nav a {
      padding: 12px 0;
      justify-content: center;
      i { margin-right: 0; }
      span, .submenu-indicator { opacity: 0; width: 0; overflow: hidden; }
    }
  }
  .main-content-wrapper {
    margin-left: $sidebar-width-collapsed;
    width: calc(100% - #{$sidebar-width-collapsed});
  }
}

.main-content-wrapper {
  margin-left: $sidebar-width;
  width: calc(100% - #{$sidebar-width});
  transition: margin-left $transition-speed ease, width $transition-speed ease;
  display: flex;
  flex-direction: column;
}

.admin-header {
  background-color: $white;
  height: $header-height;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #dee2e6;
  position: sticky;
  top: 0;
  z-index: 1000;

  .header-left {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  .hamburger-button { display: none; }
  .admin-title { font-size: 1.4rem; font-weight: bold; }
  .user-info {
    display: flex;
    align-items: center;
    gap: 1rem;
    .logout-button {
      background-color: $primary;
      color: $white;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      cursor: pointer;
      transition: background-color 0.2s ease;
      &:hover { background-color: color.adjust($primary, $lightness: -10%); }
    }
  }
}

.admin-main { flex-grow: 1; padding: 1.5rem; }
.admin-content {
  background-color: $white;
  padding: 1.5rem;
  border-radius: 8px;
}
.admin-footer {
  background-color: #f0f2f5;
  color: #6c757d;
  height: 50px; /* Fixed height to match sidebar toggler */
  display: flex; /* Enable flexbox */
  align-items: center; /* Center content vertically */
  justify-content: center; /* Center content horizontally */
  padding: 0 2rem; /* Keep horizontal padding, vertical handled by flexbox and height */
  text-align: center;
  p { margin: 0; font-size: 0.9rem; }
}

// RWD for mobile
@media (max-width: 768px) {
  .admin-sidebar {
    width: $sidebar-width; // Fly-out menu is always full width
    transform: translateX(-100%);
    transition: transform $transition-speed ease;
    z-index: 1010;

    &.mobile-open {
      transform: translateX(0);
    }
    
    // Hide desktop features on mobile
    &.collapsed { width: $sidebar-width; }
    .sidebar-toggler { display: none; }
    .sidebar-header .logo-mini { display: none; }
    .sidebar-header .logo-full { display: block; }
  }

  .sidebar-overlay {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.5);
    z-index: 1005;
  }

  .main-content-wrapper {
    margin-left: 0 !important;
    width: 100% !important;
  }

  .admin-header {
    padding: 0 1rem;
    .hamburger-button {
      display: block;
      background: none;
      border: none;
      font-size: 1.8rem;
      cursor: pointer;
      padding: 0;
      color: $black;
    }
  }

  // When mobile menu is closed, desktop collapsed styles should not apply
  .admin-layout.sidebar-collapsed {
    .main-content-wrapper {
      margin-left: 0 !important;
      width: 100% !important;
    }
  }
}
</style>
