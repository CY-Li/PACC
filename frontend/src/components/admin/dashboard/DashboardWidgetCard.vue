<template>
  <div class="card dashboard-widget-card h-100">
    <div class="card-body">
      <div class="widget-icon-container mb-2" :style="{ color: iconColor }">
        <i class="widget-icon" :class="icon"></i>
      </div>
      <div class="widget-title">{{ title }}</div>
      <div class="widget-count">{{ count }}</div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  count: [Number, String],
  icon: String,
  iconColor: String, // New prop for icon color
});
</script>

<style lang="scss" scoped>
@use '@/assets/scss/variables' as *;

.dashboard-widget-card {
  border: none;
  border-radius: 12px;
  background: #fff;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  text-align: center;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  }

  .card-body {
    padding: 1rem;
  }

  .widget-icon-container {
    font-size: 1.8rem;
    line-height: 1;
  }

  .widget-title {
    font-size: 0.8rem;
    color: $black; // Changed to $black
  }

  .widget-count {
    font-size: 1.5rem;
    font-weight: 700;
    color: $black;
  }
}
</style>
