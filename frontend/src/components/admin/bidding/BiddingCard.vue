<template>
  <div class="card bidding-card h-100" @click="$emit('edit', bidding)">
    <div class="card-body">
      <div class="d-flex justify-content-between align-items-start mb-2">
        <h5 class="card-title mb-0 me-3">{{ bidding.serial }}</h5>
        <button class="btn btn-link delete-btn p-0" type="button" @click.stop="$emit('delete', bidding.id)" aria-label="刪除標會">
          <i class="bi bi-trash"></i>
        </button>
      </div>
      <div class="d-flex justify-content-between align-items-center">
        <span class="card-subtitle text-muted">{{ bidding.type }}</span>
        <span class="badge" :class="statusClass">{{ bidding.status }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  bidding: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['edit', 'delete']); // Added 'edit' action

const statusClass = computed(() => {
  switch (props.bidding.status) {
    case '未成組':
      return 'bg-secondary';
    case '已成組':
      return 'bg-success';
    case '結束':
      return 'bg-info text-dark'; // Use text-dark for better contrast with bg-info
    default:
      return 'bg-light text-dark';
  }
});
</script>

<style lang="scss" scoped>
@use '@/assets/scss/variables' as *;

.bidding-card {
  transition: all 0.3s ease;
  cursor: pointer; // Keep cursor pointer even if there's no edit click for consistency

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  .card-title {
    font-weight: 600;
  }

  .card-subtitle {
    font-size: 0.85rem;
  }

  .delete-btn {
    font-size: 1.1rem;
    color: $gray;
    text-decoration: none;
    z-index: 2; // Ensure it's clickable above the card's click handler
    
    &:hover, &:focus {
      color: $primary;
    }
  }
}
</style>
