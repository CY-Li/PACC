<template>
  <nav aria-label="breadcrumb" class="admin-breadcrumb">
    <!-- Desktop: Full Breadcrumb -->
    <ol class="breadcrumb mb-0 d-none d-md-flex">
      <li 
        v-for="(crumb, index) in breadcrumbs" 
        :key="index" 
        class="breadcrumb-item"
        :class="{ 'active': index === breadcrumbs.length - 1 }"
      >
        <router-link v-if="index < breadcrumbs.length - 1 && crumb.to" :to="crumb.to">{{ crumb.title }}</router-link>
        <span v-else>{{ crumb.title }}</span>
      </li>
    </ol>

    <!-- Mobile: Current Page Title Only -->
    <h1 class="mobile-title d-md-none mb-0">
      {{ currentTitle }}
    </h1>
  </nav>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const props = defineProps({
  menus: {
    type: Array,
    required: true,
  },
});

const route = useRoute();

const breadcrumbs = computed(() => {
  const path = route.path;
  const crumbs = [{ title: '管理後台', to: '/admin' }];

  if (path === '/admin' || path === '/admin/') {
    return crumbs;
  }
  
  const findMenuHierarchy = (currentPath, menuItems) => {
      for (const item of menuItems) {
          if (item.to === currentPath) {
              return [{ title: item.title, to: item.to }];
          }
          if (item.children) {
              const childPath = findMenuHierarchy(currentPath, item.children);
              if (childPath) {
                  return [{ title: item.title, to: item.to || '#' }, ...childPath];
              }
          }
      }
      return null;
  };

  const hierarchy = findMenuHierarchy(route.path, props.menus);
  
  if (hierarchy) {
    // Filter out top-level dashboard if it's not the only item
    const finalCrumbs = hierarchy.length > 1 && hierarchy[0].to === '/admin' 
      ? hierarchy.slice(1) 
      : hierarchy;
    return [...crumbs, ...finalCrumbs];
  }

  // Fallback for routes not in menu
  return [{ title: '管理後台', to: '/admin' }];
});

const currentTitle = computed(() => {
  if (breadcrumbs.value.length > 0) {
    return breadcrumbs.value[breadcrumbs.value.length - 1].title;
  }
  return '管理後台'; // Fallback title
});
</script>

<style lang="scss" scoped>
.admin-breadcrumb {
  // Desktop styles
  .breadcrumb {
    background-color: transparent;
    padding: 0;
    align-items: center;
  }
  .breadcrumb-item {
    font-size: 1.2rem;
    font-weight: bold;
    color: #6c757d;

    a {
      color: #6c757d;
      text-decoration: none;
      transition: color 0.2s;
      &:hover {
        color: #A11F1A;
      }
    }
    &.active {
      color: #343a40;
    }
    & + .breadcrumb-item::before {
      content: '/';
      color: #6c757d;
    }
  }

  // Mobile styles
  .mobile-title {
    font-size: 1.2rem; // Match breadcrumb font-size
    font-weight: bold;
    color: #343a40; // Match active breadcrumb color
  }
}
</style>
