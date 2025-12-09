<template>
  <div class="admin-dashboard">
    <h2>儀表板</h2>
    <p>歡迎來到管理後台！</p>
    <!-- 未來可以在這裡添加各種統計數據、快捷操作等 -->
    <div class="dashboard-widgets">
      <div class="widget">
        <h3>使用者統計</h3>
        <p>總使用者數：1234</p>
      </div>
      <div class="widget">
        <h3>最新訂單</h3>
        <ul>
          <li>訂單 #1001</li>
          <li>訂單 #1002</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
// 儀表板的邏輯，例如數據載入
</script>

<style scoped>
.admin-dashboard {
  /* 儀表板的樣式 */
}

.dashboard-widgets {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin-top: 1.5rem;
}

.widget {
  background-color: #f9f9f9;
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
}

.widget h3 {
  margin-top: 0;
  color: #333;
}
</style>
