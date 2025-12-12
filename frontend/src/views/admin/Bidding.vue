<template>
  <div>
    <AdminCrudLayout
      :items="filteredBiddings"
      :table-columns="['成組序號', '標會種類', '得標人', '標會狀態', '第一次開標時間', '最後開標時間', '操作']"
      @add-new="handleAddNew"
    >
      <!-- Filters Slot -->
      <template #filters>
        <div class="d-flex flex-column gap-3 mb-3">
          <div class="input-group">
            <span class="input-group-text"><i class="bi bi-search"></i></span>
            <input type="text" class="form-control" placeholder="搜尋標會序號或得標人..." v-model="searchQuery">
          </div>
          <div class="d-flex gap-3">
            <select class="form-select" v-model="statusFilter" style="max-width: 150px;">
              <option>全部狀態</option>
              <option>未成組</option>
              <option>已成組</option>
              <option>結束</option>
            </select>
            <select class="form-select" v-model="typeFilter" style="max-width: 150px;">
              <option>全部種類</option>
              <option>散會</option>
              <option>六會</option>
              <option>十二會</option>
              <option>二十四會</option>
            </select>
          </div>
        </div>
      </template>

      <!-- Card Item Slot -->
      <template #card-item="{ item }">
        <BiddingCard
          :bidding="item"
          @edit="handleEdit(item)"
          @delete="handleDelete(item.id)"
        />
      </template>

      <!-- Table Row Slot -->
      <template #table-row="{ item }">
        <td>{{ item.serial }}</td>
        <td>{{ item.type }}</td>
        <td>{{ item.winner }}</td>
        <td>
          <span class="badge" :class="{
            'bg-secondary': item.status === '未成組',
            'bg-success': item.status === '已成組',
            'bg-info text-dark': item.status === '結束'
          }">
            {{ item.status }}
          </span>
        </td>
        <td>{{ item.startTime }}</td>
        <td>{{ item.endTime }}</td>
        <td class="text-end" style="width: 120px;">
          <button class="btn btn-sm btn-outline-dark me-2" @click="handleEdit(item)">
            <i class="bi bi-pencil-fill"></i>
          </button>
          <button class="btn btn-sm btn-outline-danger" @click="handleDelete(item.id)">
            <i class="bi bi-trash-fill"></i>
          </button>
        </td>
      </template>
    </AdminCrudLayout>

    <!-- Modal for Add/Edit -->
    <BiddingModal
      v-model="showModal"
      :bidding="editingBidding"
      @save="handleSave"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import AdminCrudLayout from '@/layouts/AdminCrudLayout.vue';
import BiddingCard from '@/components/admin/bidding/BiddingCard.vue';
import BiddingModal from '@/components/admin/bidding/BiddingModal.vue';

const showModal = ref(false);
const editingBidding = ref(null);
const searchQuery = ref('');
const statusFilter = ref('全部狀態');
const typeFilter = ref('全部種類');

const biddings = ref([
  { id: 1, serial: 'A001', type: '六會', winner: '王小明', status: '已成組', startTime: '2025/12/01', endTime: '2026/05/01' },
  { id: 2, serial: 'A002', type: '十二會', winner: '陳大文', status: '已成組', startTime: '2025/11/15', endTime: '2026/10/15' },
  { id: 3, serial: 'B001', type: '散會', winner: '-', status: '未成組', startTime: '2025/12/20', endTime: '2025/12/20' },
  { id: 4, serial: 'C001', type: '二十四會', winner: '林阿姨', status: '結束', startTime: '2023/01/01', endTime: '2024/12/01' },
]);

const filteredBiddings = computed(() => {
  let filtered = biddings.value;

  // Apply status filter
  if (statusFilter.value !== '全部狀態') {
    filtered = filtered.filter(b => b.status === statusFilter.value);
  }

  // Apply type filter
  if (typeFilter.value !== '全部種類') {
    filtered = filtered.filter(b => b.type === typeFilter.value);
  }

  // Apply search query
  if (searchQuery.value) {
    const lowerCaseQuery = searchQuery.value.toLowerCase();
    filtered = filtered.filter(b =>
      b.serial.toLowerCase().includes(lowerCaseQuery) ||
      b.winner.toLowerCase().includes(lowerCaseQuery)
    );
  }

  return filtered;
});

const handleAddNew = () => {
  editingBidding.value = null;
  showModal.value = true;
};

const handleEdit = (bidding) => {
  editingBidding.value = bidding;
  showModal.value = true;
};

const handleDelete = (id) => {
  if (confirm('確定要刪除這個標會嗎？')) {
    biddings.value = biddings.value.filter(b => b.id !== id);
  }
};

const handleSave = (savedBidding) => {
  if (savedBidding.id) {
    // Edit existing
    const index = biddings.value.findIndex(b => b.id === savedBidding.id);
    if (index !== -1) {
      biddings.value[index] = savedBidding;
    }
  } else {
    // Add new
    const newId = biddings.value.length > 0 ? Math.max(...biddings.value.map(a => a.id)) + 1 : 1;
    biddings.value.unshift({ ...savedBidding, id: newId });
  }
  showModal.value = false;
};
</script>