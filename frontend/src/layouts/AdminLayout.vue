<template>
  <div class="admin-layout">
    <header class="admin-header">
      <div class="header-left">
        <button class="hamburger-button" @click="toggleSidebar">
          &#9776; <!-- Hamburger Icon -->
        </button>
        <span class="admin-title">管理後台</span>
      </div>
      <div class="user-info">
        <span>Admin</span>
        <button class="logout-button">登出</button>
      </div>
    </header>
    <div class="sidebar-overlay" v-if="isSidebarOpen" @click="toggleSidebar"></div>
    <main class="admin-main">
      <aside class="admin-sidebar" :class="{ 'is-open': isSidebarOpen }">
        <!-- Reverted to the simple, original sidebar list -->
        <ul>
          <li><router-link to="/admin">儀表板</router-link></li>
          <li><router-link to="/admin/users">使用者管理</router-link></li>
        </ul>
      </aside>
      <section class="admin-content">
        <router-view></router-view>
      </section>
    </main>
    <footer class="admin-footer">
      <div class="footer-logo">
        <img src="/images/logo-footer.png" alt="Footer Logo" class="logo">
      </div>
      <p>&copy;2026 Designed by 鈦敏科技</p>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { RouterLink, RouterView } from 'vue-router';

const isSidebarOpen = ref(false);

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};
</script>

<style lang="scss" scoped>
@use "sass:color";
@use '@/assets/scss/variables' as *;

.admin-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f0f2f5;
}

.admin-header {
  background-color: $white;
  color: $black;
  padding: 0.5rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #dee2e6;
  position: sticky;
  top: 0;
  z-index: 1020;

  .header-left {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .hamburger-button {
    display: none; // Hidden by default
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
  }

  .admin-title {
    font-size: 1.4rem;
    font-weight: bold;
  }

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

      &:hover {
        background-color: color.adjust($primary, $lightness: -10%);
      }
    }
  }
}

.sidebar-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1030;
  display: none;
}

.admin-main {
  flex: 1;
  display: flex;
  padding: 1rem;
}

.admin-sidebar {
  background-color: $white;
  width: 220px;
  flex-shrink: 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  margin-right: 1rem;
  transition: transform 0.3s ease;
  padding: 1rem;

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    margin-bottom: 0.5rem;
  }

  a {
    display: block;
    padding: 0.75rem 1rem;
    color: $black;
    text-decoration: none;
    border-radius: 4px;
    transition: background-color 0.2s ease, color 0.2s ease;

    &:hover {
      background-color: color.adjust($secondary, $lightness: 10%);
    }

    &.router-link-exact-active {
      background-color: $minor;
      color: $white;
    }
  }
}

.admin-content {
  flex-grow: 1;
  background-color: $white;
  padding: 1.5rem;
  border-radius: 8px;
}

.admin-footer {
  background-color: $primary;
  color: $white;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .logo {
    height: 30px;
  }
  p {
    margin: 0;
    font-size: 0.9rem;
  }
}

// RWD Styles
@media #{$mobile} {
  .admin-layout {
    .admin-header {
      padding: 0.5rem 1rem;
      .hamburger-button {
        display: block; // Show on mobile
      }
    }

    .sidebar-overlay {
      display: block;
    }

    .admin-main {
      padding: 0.5rem;
    }

    .admin-sidebar {
      position: fixed;
      top: 0;
      left: 0;
      height: 100%;
      margin-right: 0;
      border-radius: 0;
      z-index: 1040;
      transform: translateX(-100%);

      &.is-open {
        transform: translateX(0);
      }
    }

    .admin-content {
      width: 100%;
    }
    
    .admin-footer {
      p {
        font-size: 0.8rem;
      }
    }
  }
}
</style>
