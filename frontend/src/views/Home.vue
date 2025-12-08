<template>
  <div>
    <main>
      <!-- 頂部banner -->
      <div class="banner">
        <div class="bannerImg">
          <div class="swiper mySwiper homeSwiper">
            <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="img, index in banners" :key="index"><img :src="img" alt=""></div>
            </div>
            <div class="swiper-pagination"></div>
            <div class="swiper-button-next"></div>
            <div class="swiper-button-prev"></div>
          </div>
        </div>
        <div class="newsList">
          <div class="newsTitle">
            <div class="title">近期公告 <span class="text-en italic">News</span></div>
            <div class="newsDate">下標開標日期 2020/02/02</div>
          </div>
          <!-- Desktop news list -->
          <div class="news-desktop">
            <div class="news" v-for="newsItem in notice" :key="newsItem.ab_datetime" @click="showNews(newsItem)">
              <div class="date">{{ formatDate(newsItem.ab_datetime) }}</div>
              <div class="content">{{ newsItem.ab_title }}</div>
              <div style="text-align: right;">
                <span class="more">view more</span>
              </div>
            </div>
          </div>
          <!-- Mobile news swiper -->
          <div class="swiperLayout">
            <div class="swiper mySwiper newsSwiper">
              <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="newsItem in notice" :key="newsItem.ab_datetime">
                  <div class="news">
                    <div class="date">{{ formatDate(newsItem.ab_datetime) }}</div>
                    <div class="content">{{ newsItem.ab_title }}</div>
                    <div style="text-align: right;">
                      <span class="more" @click="showNews(newsItem)">view more</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="swiper-pagination"></div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 加入會員 -->
      <div class="joinMember">
        <div class="memberImgs">
          <div class="memberImg-2"><img src="/images/home/member2.png" alt=""></div>
        </div>
        <div class="toJoin">
          <div class="title">
            <div>加入會員</div>
            <div class="text-en italic">BID RECORD</div>
          </div>
          <div class="content">
            這邊填寫加入會員的Slogan
          </div>
          <router-link to="/login" class="joinBtn">立即註冊！
            <span class="chevronRight"><i class="bi bi-chevron-right"></i></span>
          </router-link>
        </div>
      </div>

      <!-- News Detail Modal -->
      <div class="modal fade" id="newsDetailModal" tabindex="-1" ref="newsDetailModalRef">
        <div class="modal-dialog modal-lg modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">{{ news.ab_title }}</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body"><img :src="news.ab_image_url" alt=""></div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">關閉</button>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue';
import Swiper from 'swiper';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import * as bootstrap from 'bootstrap';

const banners = ref([]);
const notice = ref([]);
const news = ref({});
const newsDetailModalRef = ref(null);

const initSwipers = () => {
  new Swiper('.homeSwiper', {
    modules: [Pagination, Navigation],
    slidesPerView: 1,
    spaceBetween: 10,
    loop: true,
    pagination: { el: '.swiper-pagination', clickable: true },
    navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
  });

  new Swiper('.newsSwiper', {
    modules: [Pagination],
    slidesPerView: 1.2,
    spaceBetween: 15,
    centeredSlides: true,
    pagination: { el: '.swiper-pagination', clickable: true },
  });
};

const loadData = () => {
  banners.value = [
    '/images/home/member1.png',
    '/images/home/member1.png',
    '/images/home/member1.png',
  ];
  notice.value = [
    { ab_datetime: '2025-01-01', ab_title: '【公告】系統維護通知', ab_image_url: '/images/home/panzoom.png' },
    { ab_datetime: '2025-01-02', ab_title: '【活動】新春開戶好禮大放送', ab_image_url: '/images/home/panzoom.png' },
    { ab_datetime: '2025-01-03', ab_title: '【重要】請更新您的個人資料', ab_image_url: '/images/home/panzoom.png' },
  ];
  nextTick(initSwipers);
};

const formatDate = (dateString) => dateString ? dateString.substring(0, 10) : '';

const showNews = (item) => {
  news.value = item;
  if (newsDetailModalRef.value) {
    new bootstrap.Modal(newsDetailModalRef.value).show();
  }
};

onMounted(loadData);
</script>

<style lang="scss" scoped>
@use '../assets/scss/_variables.scss' as *;

// --- Utility & Common ---
* {
  box-sizing: border-box;
}

main {
  padding: 1rem;
  max-width: 1600px;
  margin: 0 auto;
}

img {
  max-width: 100%;
  height: auto;
  display: block;
}

// --- Base Mobile Styles ---

.banner, .joinMember {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.banner {
  margin-bottom: 2rem;
  .bannerImg {
    border-radius: 14px;
    overflow: hidden; // Constrain the image
    img {
      width: 100%;
      height: 100%;
      object-fit: cover; // Ensure image covers the area without distortion
    }
  }
  .news-desktop { display: none; }
  .swiperLayout { display: block; }
}

.joinMember {
  background: #fcfbfb;
  padding: 2rem 1rem;
  align-items: center;

  .toJoin {
    text-align: center;
    .title {
        font-size: 1.25rem;
        color: $primary;
        .text-en {
            color: $secondary;
            font-size: 0.875rem;
        }
    }
    .content { margin: 1.5rem 0; }
  }
}

.newsTitle {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  text-align: center;
  gap: 1rem;
  margin-bottom: 1rem;
  
  .title { font-size: 1.25rem; color: $primary; }
  .newsDate { 
    color: white; 
    background: $primary; 
    padding: 0.25rem 1rem; 
    border-radius: 50px; 
    font-size: 0.875rem; 
    white-space: nowrap;
  }
}

.news {
  background: #fdfdfd;
  padding: 1rem;
  border-radius: 14px;
  margin-bottom: 1rem;
  border: 1px solid #eee;

  .date { font-size: 0.875rem; margin-bottom: 0.5rem; color: #555; }
  .content { font-size: 1.1rem; margin-bottom: 0.5rem; color: #333; }
  .more { font-size: 0.8rem; color: $minor; text-align: right; display: block; }
}

// --- Desktop Overrides ---
@media (min-width: 992px) {
  .banner {
    flex-direction: row;
    align-items: flex-start;

    .bannerImg { 
      flex: 2; 
      max-height: 400px; // Add max-height to control size on desktop
    }
    .newsList { flex: 1; }

    .news-desktop { display: block; }
    .swiperLayout { display: none; }
  }

  .joinMember {
    flex-direction: row-reverse;
    justify-content: center;
    padding: 5%;
    gap: 2rem;
    
    .memberImgs, .toJoin {
      flex: 1;
      max-width: 600px;
    }

    .toJoin {
      text-align: left;
      align-items: flex-start;
    }
    
    .memberImgs {
      .memberImg-1 { display: block; }
      .memberImg-2 { display: block; }
    }
  }
}

.joinBtn {
  cursor: pointer;
  font-size: 1.1rem;
  display: inline-flex;
  align-items: center;
  padding: 0.5rem 1.5rem;
  color: $secondary;
  border: 1px solid $secondary;
  border-radius: 50px;
  transition: all 0.3s ease;
  text-decoration: none;

  .chevronRight { margin-left: 0.5rem; }
  
  &:hover {
    background: $secondary;
    color: white;
  }
}
</style>