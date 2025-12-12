<template>
  <div class="page-container">
    <!-- 頁面標頭 -->
    <div class="d-flex align-items-center mb-4">
      <h1 v-if="title" class="h3 mb-0 text-gray-800">{{ title }}</h1>
      <button class="btn btn-primary ms-auto" @click="$emit('add-new')">
        <i class="bi bi-plus-lg me-2"></i>
        <span>新增</span>
      </button>
    </div>

    <!-- 篩選區塊 (未來擴充用) -->
    <div class="mb-4">
      <slot name="filters"></slot>
    </div>

    <!-- 內容區 -->
    <div class="card shadow mb-4">
      <div class="card-body">
        <!-- 電腦版：表格 -->
        <div class="d-none d-lg-block">
          <div class="table-responsive">
            <table class="table table-hover" width="100%" cellspacing="0">
              <thead>
                <tr>
                  <th v-for="column in tableColumns" :key="column">{{ column }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in items" :key="item.id">
                  <slot name="table-row" :item="item"></slot>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- 手機版：卡片 -->
        <div class="d-block d-lg-none">
          <div v-if="items.length > 0">
            <div v-for="item in items" :key="item.id" class="mb-3">
              <slot name="card-item" :item="item"></slot>
            </div>
          </div>
          <div v-else class="text-center">
            <p>沒有資料</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 分頁 (未來擴充用) -->
    <div class="d-flex justify-content-end">
      <slot name="pagination"></slot>
    </div>

    <!-- Modal 內容 -->
    <slot name="modal-form"></slot>

  </div>
</template>

<script setup>


defineProps({
  title: {
    type: String,
    required: false, // Changed to false
  },
  items: {
    type: Array,
    required: true,
  },
  tableColumns: {
    type: Array,
    default: () => [],
  },
});

defineEmits(['add-new', 'page-change']);
</script>

<style scoped>
.page-container {
  padding: 2rem;
}
.table-hover tbody tr:hover {
  background-color: #f8f9fc;
}
</style>
