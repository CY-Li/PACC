<template>
  <div class="admin-dashboard p-3">
    <!-- Page Heading -->
    <h5 class="text-gray-800" style="text-align: left; padding: 12px;">常用功能</h5>

    <!-- Common Functions Row -->
    <div class="row">
      <div class="col-4 mb-4">
        <QuickLinkCard
          title="標會管理"
          icon="bi bi-collection-fill"
          to="/admin/bidding"
        />
      </div>
      <div class="col-4 mb-4">
        <QuickLinkCard
          title="會員資料"
          icon="bi bi-people-fill"
          to="/admin/members/info"
        />
      </div>
      <div class="col-4 mb-4">
        <QuickLinkCard
          title="帳務紀錄"
          icon="bi bi-cash-stack"
          to="/admin/accounting/records"
        />
      </div>
    </div>
    
    <!-- Page Heading -->
    <h5 class="text-gray-800" style="text-align: left; padding: 12px;">待審核案件</h5>

    <!-- Pending Cases Row -->
    <div class="row">
      <!-- KYC Card -->
      <div class="col-4 mb-4">
        <router-link to="/admin/members/kyc" class="text-decoration-none">
          <DashboardWidgetCard
            title="KYC"
            :count="pendingCases.kyc"
            icon="bi bi-person-check-fill"
            iconColor="#a11f1a"
          />
        </router-link>
      </div>

      <!-- Deposit Card -->
      <div class="col-4 mb-4">
        <router-link to="/admin/accounting/deposit" class="text-decoration-none">
          <DashboardWidgetCard
            title="儲值"
            :count="pendingCases.deposit"
            icon="bi bi-box-arrow-in-down"
            iconColor="#a11f1a"
          />
        </router-link>
      </div>

      <!-- Withdrawal Card -->
      <div class="col-4 mb-4">
        <router-link to="/admin/accounting/withdraw" class="text-decoration-none">
          <DashboardWidgetCard
            title="提領"
            :count="pendingCases.withdrawal"
            icon="bi bi-box-arrow-up"
            iconColor="#a11f1a"
          />
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import DashboardWidgetCard from '@/components/admin/dashboard/DashboardWidgetCard.vue';
import QuickLinkCard from '@/components/admin/dashboard/QuickLinkCard.vue';

const pendingCases = ref({
  kyc: 12,
  deposit: 5,
  withdrawal: 3,
});
</script>

<style scoped>
/* Scoped styles can be added here if needed */
.text-gray-800 {
  color: #5a5c69 !important;
}
</style>
