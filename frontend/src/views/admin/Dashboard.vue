<template>
  <div class="admin-dashboard p-3">
    <!-- Page Heading -->
    <h4 class="mb-4 text-gray-800" style="text-align: left; padding-left: 12px;">常用功能</h4>

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
          title="帳務紀錄" <!-- Changed from "帳務管理" -->
          icon="bi bi-cash-stack"
          to="/admin/accounting/records" <!-- Changed from "/admin/accounting/deposit" -->
        />
      </div>
    </div>
    
    <!-- Page Heading -->
    <h4 class="mb-4 text-gray-800" style="text-align: left; padding-left: 12px;">待審核案件</h4>

    <!-- Pending Cases Row -->
    <div class="row">
      <!-- KYC Card -->
      <div class="col-4 mb-4">
        <DashboardWidgetCard
          title="KYC"
          :count="pendingCases.kyc"
          icon="bi bi-person-check-fill"
          gradient="linear-gradient(45deg, #a11f1a, #c24e4a)"
        />
      </div>

      <!-- Deposit Card -->
      <div class="col-4 mb-4">
        <DashboardWidgetCard
          title="儲值"
          :count="pendingCases.deposit"
          icon="bi bi-box-arrow-in-down"
          gradient="linear-gradient(45deg, #c24e4a, #deac9c)"
        />
      </div>

      <!-- Withdrawal Card -->
      <div class="col-4 mb-4">
        <DashboardWidgetCard
          title="提領"
          :count="pendingCases.withdrawal"
          icon="bi bi-box-arrow-up"
          gradient="linear-gradient(45deg, #deac9c, #e8c7b9)"
        />
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
