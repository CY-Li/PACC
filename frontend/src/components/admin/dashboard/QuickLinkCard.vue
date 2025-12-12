<template>
  <router-link :to="to" class="card quick-link-card h-100 text-decoration-none">
    <div class="card-body">
      <div class="d-flex flex-column justify-content-center align-items-center h-100">
        <div class="icon-container mb-2">
          <i :class="icon"></i>
        </div>
        <div class="title font-weight-bold text-center">{{ title }}</div>
      </div>
    </div>
  </router-link>
</template>

<script setup>
defineProps({
  title: String,
  icon: String,
  to: String,
});
</script>

<style lang="scss" scoped>
@use '@/assets/scss/variables' as *;

.quick-link-card {
  border: none; // Explicitly remove border
  border-radius: 12px;
  background: #fff;
  transition: all 0.3s ease;
  color: $black;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05); // Added box-shadow

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1); // Updated box-shadow for hover

    .icon-container {
      background-color: $primary;
      color: #fff;
    }
  }

  .card-body {
    padding: 1rem;
  }

  .icon-container {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f8f9fc;
    color: $primary;
    font-size: 1.5rem;
    transition: all 0.3s ease;
  }
  
  .title {
    font-size: 0.8rem;
  }
}
</style>