<template>
  <div class="card announcement-card h-100" @click="emit('edit')">
    <div class="card-body">
      <div class="d-flex justify-content-between align-items-start mb-2">
        <h5 class="card-title mb-0 me-3">{{ announcement.title }}</h5>
        <button class="btn btn-link delete-btn p-0" type="button" @click.stop="emit('delete')" aria-label="刪除公告">
          <i class="bi bi-trash"></i>
        </button>
      </div>
      <div class="d-flex justify-content-between align-items-center">
        <span class="card-subtitle text-muted">{{ announcement.date }}</span>
        <span class="badge" :class="statusClass">{{ announcement.status }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  announcement: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['edit', 'delete']);

const statusClass = computed(() => {
  switch (props.announcement.status) {
    case '發佈中':
      return 'bg-success';
    case '草稿':
      return 'bg-warning text-dark';
    case '已封存':
      return 'bg-secondary';
    default:
      return 'bg-light text-dark';
  }
});
</script>

<style lang="scss" scoped>
@use '@/assets/scss/variables' as *;

.announcement-card {
  transition: all 0.3s ease;
  cursor: pointer;

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
