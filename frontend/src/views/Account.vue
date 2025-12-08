<template>
  <div>
    <main>
      <div class="accountContainer">
        <!-- menu選單 -->
        <div class="leftColumn">
          <div class="memberCard">
            <div class="memberId">
              <div class="mamberName">會員名稱</div>
              <div class="memberNum">{{ userData.mm_account }}</div>
            </div>
            <div class="memberDate">註冊日期：<span class="color-primary">{{ formatDate(userData.mm_create_datetime) }}</span></div>
            <div class="logoutBtn common-btn" @click="logout">會員登出</div>
          </div>
          <div class="myNavs">
            <router-link to="/account?type=profile" class="nav profile" :class="{active: currentType === 'profile'}">
              會員<br class="d-block d-lg-none">資料
              <div class="text-en fs-12">MEMBER PROFILE</div>
            </router-link>
            <router-link to="/account?type=tender" class="nav tender" :class="{active: currentType === 'tender'}">
              參與<br class="d-block d-lg-none">標案
              <div class="text-en fs-12">PARTICIPATE IN THE TENDER</div>
            </router-link>
            <router-link to="/account?type=invite" class="nav invite" :class="{active: currentType === 'invite'}">
              組織
              <div class="text-en fs-12">TEAMS</div>
            </router-link>
            <router-link to="/account?type=kyc" class="nav kyc" :class="{active: currentType === 'kyc'}">
              KYC
              <div class="text-en fs-12">KYC</div>
            </router-link>
            <a href="javascript:void(0)" @click="logout" class="nav logout d-none d-lg-block">
              會員<br class="d-block d-lg-none">登出
              <div class="text-en fs-12">MEMBER LOGOUT</div>
            </a>
          </div>
        </div>

        <div class="accountBody">
          <!-- Body content will be rendered based on 'currentType' -->
          <div v-if="currentType === 'profile'">
            <h2>會員資料</h2>
            <p>這裡是會員資料的內容。</p>
          </div>
          <div v-else-if="currentType === 'tender'">
            <h2>參與標案</h2>
            <p>這裡是參與標案的內容。</p>
          </div>
          <div v-else-if="currentType === 'invite'">
            <h2>組織</h2>
            <p>這裡是組織的內容。</p>
          </div>
           <div v-else-if="currentType === 'kyc'">
            <h2>KYC</h2>
            <p>這裡是KYC的內容。</p>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const userData = ref({});
const currentType = computed(() => route.query.type || 'profile');

const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  return new Date(dateString).toLocaleDateString();
};

const logout = () => {
  alert('會員登出 (示範)');
  router.push('/login');
};

onMounted(() => {
  userData.value = {
    mm_account: 'mock_user_123',
    mm_create_datetime: new Date().toISOString(),
  };
});
</script>

<style lang="scss" scoped>
@use '../assets/scss/account.scss';
</style>
