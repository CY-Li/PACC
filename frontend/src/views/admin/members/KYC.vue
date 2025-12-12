<template>
  <div>
    <AdminCrudLayout
      :items="filteredApplications"
      :table-columns="['帳號', '申請人', '身分證字號', 'KYC狀態', '操作']"
      :hide-add-new-button="true"
    >
      <template #filters>
        <div class="d-flex flex-column gap-3 mb-3">
          <div class="input-group">
            <span class="input-group-text"><i class="bi bi-search"></i></span>
            <input type="text" class="form-control" placeholder="搜尋帳號、申請人或身分證字號..." v-model="searchQuery">
          </div>
          <div class="d-flex gap-3">
            <select class="form-select" v-model="statusFilter" style="max-width: 150px;">
              <option>全部狀態</option>
              <option>待審核</option>
              <option>通過</option>
              <option>駁回</option>
            </select>
          </div>
        </div>
      </template>

      <template #table-row="{ item }">
        <td>{{ item.account }}</td>
        <td>{{ item.applicant }}</td>
        <td>{{ item.idNumber }}</td>
        <td>
          <span class="badge" :class="{
            'bg-warning text-dark': item.status === '待審核',
            'bg-success': item.status === '通過',
            'bg-danger': item.status === '駁回'
          }">
            {{ item.status }}
          </span>
        </td>
        <td style="width: 150px;">
          <template v-if="item.status === '待審核'">
            <button class="btn btn-sm btn-success me-2" @click="approve(item.id)">通過</button>
            <button class="btn btn-sm btn-danger" @click="reject(item.id)">駁回</button>
          </template>
        </td>
      </template>
    </AdminCrudLayout>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import AdminCrudLayout from '@/layouts/AdminCrudLayout.vue';

const searchQuery = ref('');
const statusFilter = ref('全部狀態');

const kycApplications = ref([
  { id: 1, account: 'user001', applicant: '王大明', idNumber: 'A123456789', status: '待審核' },
  { id: 2, account: 'user002', applicant: '陳小美', idNumber: 'F210987654', status: '待審核' },
  { id: 3, account: 'user003', applicant: '林志強', idNumber: 'H112233445', status: '通過' },
  { id: 4, account: 'user004', applicant: '張麗華', idNumber: 'N223344556', status: '駁回' },
]);

const filteredApplications = computed(() => {
  let filtered = kycApplications.value;

  // Apply status filter
  if (statusFilter.value !== '全部狀態') {
    filtered = filtered.filter(app => app.status === statusFilter.value);
  }

  // Apply search query
  if (searchQuery.value) {
    const lowerCaseQuery = searchQuery.value.toLowerCase();
    filtered = filtered.filter(app =>
      app.account.toLowerCase().includes(lowerCaseQuery) ||
      app.applicant.toLowerCase().includes(lowerCaseQuery) ||
      app.idNumber.toLowerCase().includes(lowerCaseQuery)
    );
  }

  return filtered;
});

const approve = (id) => {
  const application = kycApplications.value.find(app => app.id === id);
  if (application) {
    application.status = '通過';
  }
};

const reject = (id) => {
  const application = kycApplications.value.find(app => app.id === id);
  if (application) {
    application.status = '駁回';
  }
};
</script>
