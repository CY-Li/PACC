<template>
  <div class="container-fluid p-4">
    <!-- Header Controls -->
    <div class="mb-4">
      <!-- Search Input and Add New Button -->
      <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-3 gap-3">
        <div class="input-group flex-grow-1">
          <span class="input-group-text"><i class="bi bi-search"></i></span>
          <input type="text" class="form-control" placeholder="搜尋標題..." v-model="searchQuery">
        </div>
        <div class="flex-shrink-0">
          <button class="btn btn-primary w-100" @click="handleAddNew">
            <i class="bi bi-plus-lg me-2"></i>
            <span>新增公告</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Announcements Display: Cards for mobile, Table for desktop -->


      <!-- Status and Date Filters -->
      <div class="d-flex justify-content-start gap-3" style="margin-top: 40px; margin-bottom: 20px;">
        <select class="form-select" v-model="statusFilter" style="max-width: 120px;">
          <option>全部狀態</option>
          <option>發佈中</option>
          <option>草稿</option>
          <option>已封存</option>
        </select>
        <VueDatePicker 
          v-model="dateRangeFilter"
          range 
          :time-config="{ enableTimePicker: false }"
          auto-apply
          placeholder="選擇日期範圍"
          :text-input="{ format: formatDateRange }"
          style="max-width: 260px;"
        />
      </div>
    <!-- Card View (for mobile) -->
    <div class="row g-4 d-md-none">
      <div v-for="announcement in filteredAnnouncements" :key="announcement.id" class="col-12">
        <AnnouncementCard 
          :announcement="announcement"
          @edit="handleEdit(announcement)"
          @delete="handleDelete(announcement.id)"
        />
      </div>
    </div>

    <!-- Table View (for desktop) -->
    <div class="card d-none d-md-block">
      <div class="card-body">
        <div class="table-responsive">
          <table class="table table-hover align-middle">
            <thead>
              <tr>
                <th scope="col" style="min-width: 300px;">標題</th>
                <th scope="col">狀態</th>
                <th scope="col">發布日期</th>
                <th scope="col" class="text-end">操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="filteredAnnouncements.length === 0">
                <td colspan="4" class="text-center text-muted py-4">
                  沒有符合條件的公告
                </td>
              </tr>
              <tr v-for="announcement in filteredAnnouncements" :key="`table-${announcement.id}`">
                <td>{{ announcement.title }}</td>
                <td>
                  <span class="badge" :class="{
                    'bg-success': announcement.status === '發佈中',
                    'bg-warning text-dark': announcement.status === '草稿',
                    'bg-secondary': announcement.status === '已封存'
                  }">
                    {{ announcement.status }}
                  </span>
                </td>
                <td>{{ announcement.date }}</td>
                <td class="text-end">
                  <button class="btn btn-sm btn-outline-dark me-2" @click="handleEdit(announcement)">
                    <i class="bi bi-pencil-fill"></i>
                  </button>
                  <button class="btn btn-sm btn-outline-danger" @click="handleDelete(announcement.id)">
                    <i class="bi bi-trash-fill"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Pagination -->
    <nav aria-label="Page navigation" class="mt-4 d-flex justify-content-center">
      <ul class="pagination">
        <li class="page-item disabled"><a class="page-link" href="#">上一頁</a></li>
        <li class="page-item active"><a class="page-link" href="#">1</a></li>
        <li class="page-item"><a class="page-link" href="#">2</a></li>
        <li class="page-item"><a class="page-link" href="#">3</a></li>
        <li class="page-item"><a class="page-link" href="#">下一頁</a></li>
      </ul>
    </nav>

    <!-- Modal for Add/Edit -->
    <AnnouncementModal 
      v-model="showModal"
      :announcement="editingAnnouncement"
      @save="handleSave"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import AnnouncementCard from '@/components/AnnouncementCard.vue';
import AnnouncementModal from '@/components/AnnouncementModal.vue';
import { VueDatePicker } from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

const showModal = ref(false);
const editingAnnouncement = ref(null);
const searchQuery = ref('');
const statusFilter = ref('全部狀態');
const dateRangeFilter = ref(null);

const announcements = ref([
  { id: 1, title: '系統維護通知', content: '詳細內容...', date: '2025-12-10', status: '發佈中' },
  { id: 2, title: '春節假期出金作業調整', content: '詳細內容...', date: '2025-12-09', status: '發佈中' },
  { id: 3, title: '【重要】帳戶安全升級提醒', content: '詳細內容...', date: '2025-12-05', status: '發佈中' },
  { id: 4, title: '新功能上線預告 (草稿)', content: '詳細內容...', date: '2025-12-15', status: '草稿' },
  { id: 5, title: '舊版 App 將於月底停止支援', content: '詳細內容...', date: '2025-11-20', status: '已封存' },
  { id: 6, title: '會員條款更新說明', content: '詳細內容...', date: '2025-11-15', status: '已封存' },
]);

// Custom format function for the date range picker input
const formatDateRange = (dates) => {
  if (!dates || dates.length !== 2) {
    return '';
  }
  const startDate = dates[0];
  const endDate = dates[1];

  const pad = (num) => num.toString().padStart(2, '0');

  const format = (date) => {
    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1);
    const day = pad(date.getDate());
    return `${year}/${month}/${day}`;
  };

  return `${format(startDate)} - ${format(endDate)}`;
}

const filteredAnnouncements = computed(() => {
  let filtered = announcements.value;

  // Apply status filter
  if (statusFilter.value !== '全部狀態') {
    filtered = filtered.filter(a => a.status === statusFilter.value);
  }

  // Apply search query
  if (searchQuery.value) {
    filtered = filtered.filter(a => 
      a.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  }

  // Apply date range filter
  if (dateRangeFilter.value && dateRangeFilter.value.length === 2) {
    const [startDate, endDate] = dateRangeFilter.value;
    if (startDate && endDate) {
      // Set time to the very beginning of the start day and very end of the end day
      const start = new Date(startDate);
      start.setHours(0, 0, 0, 0);

      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999);

      filtered = filtered.filter(a => {
        const announcementDate = new Date(a.date);
        return announcementDate >= start && announcementDate <= end;
      });
    }
  }

  return filtered;
});

const handleAddNew = () => {
  editingAnnouncement.value = null;
  showModal.value = true;
};

const handleEdit = (announcement) => {
  editingAnnouncement.value = announcement;
  showModal.value = true;
};

const handleDelete = (id) => {
  if (confirm('確定要刪除這則公告嗎？')) {
    announcements.value = announcements.value.filter(a => a.id !== id);
  }
};

const handleSave = (savedAnnouncement) => {
  if (savedAnnouncement.id) {
    // Edit existing
    const index = announcements.value.findIndex(a => a.id === savedAnnouncement.id);
    if (index !== -1) {
      announcements.value[index] = savedAnnouncement;
    }
  } else {
    // Add new
    const newId = announcements.value.length > 0 ? Math.max(...announcements.value.map(a => a.id)) + 1 : 1;
    announcements.value.unshift({ ...savedAnnouncement, id: newId });
  }
  showModal.value = false;
};
</script>

<style lang="scss">
// You can add page-specific styles here if needed.
// The main component styles are scoped in AnnouncementCard.vue
</style>