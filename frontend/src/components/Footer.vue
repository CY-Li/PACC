<template>
  <div class="myFooter">
    <div class="circleBg">
      <img src="/images/footerCircle.svg" alt="Footer Circle">
      <div class="goTop" @click="scrollToTop">
        <div class="topCircle">
          <div class="topBtn">
            <img src="/images/top.svg" alt="Go Top">
          </div>
        </div>
        <div class="text">回到最上層</div>
      </div>
      
    </div>
    <div class="logo"><img src="/images/logo-light.png" alt="Logo"></div>
    <div class="footerNavs">
      <router-link to="/" class="nav homeNav">
        <div>首　　頁</div>
        <div class="text-en">TOP</div>
      </router-link>
      <router-link to="/hall" class="nav hallNav">
        <div>商會大廳</div>
        <div class="text-en">CHAMBER OF COMMERCE</div>
      </router-link>
      <router-link to="/wallet" class="nav walletNav">
        <div>會員錢包</div>
        <div class="text-en">WALLET</div>
      </router-link>
      <!-- <router-link to="/account?type=subaccount" class="nav childNav">
        <div>子帳戶管理</div>
        <div class="text-en">SUBACCOUNT MANAGEMENT</div>
      </router-link> -->
      <router-link to="/account" class="nav mainNav">
        <div>會員資訊</div>
        <div class="text-en">BACK TO MAIN ACCOUNT</div>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};
</script>

<style lang="scss" scoped>
@use '../assets/scss/_variables.scss' as *;

.myFooter {
  width: 100%;
  position: relative;
  display: flex;
  background: $primary;
  padding: 60px 30px;
  align-items: center;
  @media #{$mobile} {
    justify-content: center;
    padding: 20px 0;
  }
}
.circleBg {
  position: absolute;
  top: 0;
  width: 350px;
  right: 0;
  transform: translate(0, -64%);
  @media #{$mobile} {
    display: none;
  }
  .goTop {
    position: absolute;
    width: 100px;
    top: 50px;
    left: 53%;
    transform: translate(-50%, 0);
    cursor: pointer;
  }
  .topCircle {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 2px solid white;
    padding-top: 20px;
    cursor: pointer;
    .topBtn {
      width: 60px;
      margin: auto;
    }
  }
  .text {
    color: #f8f2f2;
    writing-mode: vertical-lr;
    margin: 12px auto 0 auto;
    font-size: 14px;
  }
}
.logo {
  width: 200px;
}
.footerNavs {
  display: flex;
  margin-left: 60px;
  text-align: center;
  @media #{$mobile} {
    display: none;
  }
  .nav {
    color: #f9f9f9;
    margin-right: 20px;
    display: block;
  }
  .text-en {
    font-size: 12px;
    color: $secondary;
    transform: scale(.8);
  }
}
</style>
