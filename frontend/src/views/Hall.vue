<template>
  <div>
    <main>
      <div id="myCarousel" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-indicators">
          <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img src="/images/hall/carousel-1.png" alt="...">
          </div>
          <div class="carousel-item">
            <img src="/images/hall/carousel-1.png" alt="...">
          </div>
          <div class="carousel-item">
            <img src="/images/hall/carousel-1.png" alt="...">
          </div>
        </div>
      </div>

      <!-- 相關總計 -->
      <!-- <div class="subtotal">
        <div class="child">
          <div class="name">目前總計會數</div>
          <div class="amount text-en">{{ userData.participate_count || 0 }}</div>
        </div>
        <div class="child">
          <div class="name">參與總會數</div>
          <div class="amount text-en">{{ userData.mw_subscripts_count || 0 }}</div>
        </div>
      </div> -->
      
      <!-- 得標紀錄 -->
      <div class="recordsLayout">
        <div class="recordsTabs">
          <div class="recordsTab active">
            <div class="name-zh">台灣</div>
            <div class="name-en text-en italic">TAIWAN</div>
          </div>
          <div class="recordsTab">
            <div class="name-zh">國際 <span>(即將開放)</span></div>
            <div class="name-en text-en italic">INTERNATIONALITY</div>
          </div>
        </div>
        <div class="recordsNavs">
          <div v-for="item in caseTypes" :key="item.label" :class="{active: item.value == caseType.value}" class="recordsNav" @click="caseType = item">{{ item.name }}</div>
        </div>
        <div class="records">
          <div v-for="item in filteredCase1" :key="item.tm_id" class="record" >
            <div class="recordHeader justify-content-between">
              <div class="type">{{item.tm_type_name}}</div>
              <div v-if="item.has_participants > 0">您目前已下標: {{ item.has_participants }}</div>
            </div>
            <!-- <div class="recordName">{{item.tm_type_name}}</div> -->
            <div class="recordFooter align-items-center">
              <div>可下標數量：<span class="amount">{{item.tm_count}}</span></div>
              <!-- <div v-if="item.has_participants > 0" class="common-btn" style="width: 75px; padding: 4px 0">已下標</div> -->
              <div class="d-flex">
                
                <select v-if="item.bid_count >= 1 && item.tm_type != 'D'" v-model="item.qty" class="form-select" id="pay_method" name="pay_method">
                  <option selected disabled value=0>請選擇數量</option>
                  <option v-for="n in item.bid_count">{{ n }}</option>
                </select>
                <div @click="showConfirm(item)" class="common-btn me-2" style="min-width: 75px; padding: 4px 0; margin: 0 20px;">下標</div>
              </div>
            </div>
          </div>
        </div>
      </div>

        <!-- 進行中標案 -->
        <div class="inProgress">
          <div class="progressTitle">
            <div class="title-zh">參與標會</div>
            <div class="title-en text-en italic">IN PROGRESS</div>
          </div>

          <div class="tenderBtns">
            <div class="tenderBtn" :class="{'active': tenderTabType == 1}" @click="tenderTabType = 1">進行中活會</div>
            <div class="tenderBtn" :class="{'active': tenderTabType == 2}" @click="tenderTabType = 2">組織總會數</div>
          </div>

          <div class="attendData">
            <div class="tenderChipRow">
              <div v-for="tender in tenders" class="tenderChip" @click="openDetail(tender)">
                <div class="name">{{ tender.tm_type_name }}</div>
                <div v-if="tenderTabType == 1">
                  <div>進行中:{{tender.self_available_quantity }}</div>
                  <div>所有標會:{{tender.self_all_quantity }}</div>
                </div>
                <div v-if="tenderTabType == 2">
                  <div>進行中:{{tender.self_org_available_quantity }}</div>
                  <div>參與總會數:{{tender.self_org_all_quantity }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="modal fade" id="recordModal" tabindex="-1" aria-labelledby="recordModal" aria-hidden="true" ref="recordModalRef">
          <div class="modal-dialog modal-lg modal-dialog-scrollable modal-dialog-centered">
            <div class="modal-content" id="print-area">
              <div class="modal-header">
                <div class="title">{{tenderDetail.ttr_title}}</div>
                <div class="modalClose" data-bs-dismiss="modal" aria-label="Close"><i class="bi bi-x"></i></div>
              </div>
              <div class="info">
                <div class="mb-2">{{tenderDetail.ttr_detail01}}</div>
                <div class="mb-2">{{tenderDetail.ttr_detail02}}</div>
                <div class="mb-2">{{tenderDetail.ttr_detail03}}</div>
                <div >{{tenderDetail.ttr_detail04}}</div>
              </div>
              <div class="modal-body">
                <table>
                  <thead>
                    <tr>
                      <th>會首</th>
                      <th>{{ formatName(tenderDetail.ttr_owner) }}</th>
                      <th>{{ formatPhone(tenderDetail.ttr_phone) }}</th>
                      <th>{{ formatDate(tenderDetail.ttr_tm_group_datetime) }}</th>
                      <th colspan="4">{{ formatAddress(tenderDetail.ttr_address) }}</th>
                    </tr>
                    <tr>
                      <th>編號</th>
                      <th>姓名</th>
                      <th>聯絡電話</th>
                      <th>得標日期</th>
                      <th>編號</th>
                      <th>姓名</th>
                      <th>聯絡電話</th>
                      <th>得標日期</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="row, ind in tenderDetail.detailRows" :key="`row-${ind}`">
                      <td>{{ row[0].td_sequence }}</td>
                      <td>{{ formatName(row[0].mm_name) }}</td>
                      <td>{{ formatPhone(row[0].mm_phone_number) }}</td>
                      <td>{{formatDate( row[0].td_update_datetime) }}</td>
                      <td v-if="row[1]">{{ row[1].td_sequence }}</td>
                      <td v-if="row[1]">{{ formatName(row[1].mm_name) }}</td>
                      <td v-if="row[1]">{{ formatPhone(row[1].mm_phone_number) }}</td>
                      <td v-if="row[1]">{{ formatDate( row[1].td_update_datetime) }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="modal-footer">
                <div class="common-btn" style="width: 120px; height: 30px; margin: auto" @click="printData">列印</div>
              </div>
            </div>
          </div>
        </div>

        <div class="modal fade" id="confirmModal" tabindex="-1" ref="confirmModalRef">
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">系統提示</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <p>是否確定進行下標【{{subscriptItem.tm_type_name}}】?</p>
                <p>若要繼續請輸入您的二級密碼後進行確定</p>
                <div style="max-width: 100%; width: 300px"><input v-model="mm_2nd_pwd" minlength="4" class="w-100" maxlength="15" id="password2" name="password2" type="password" required></div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
                <button type="button" class="btn btn-primary" @click="subscriptCase">確定</button>
              </div>
            </div>
          </div>
        </div>

      </main>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed, nextTick } from 'vue';
import * as bootstrap from 'bootstrap';
import { useRouter } from 'vue-router'; // Import useRouter

const router = useRouter();

// Reactive state
const userData = ref({});
const caseType = ref({ label: '一般玩法(散會)', value: 'A', name: '散會' });
const caseTypes = ref([
  { label: '全部', value: 'ALL', name: '全部' },
  { label: '一般玩法(散會)', value: 'A', name: '散會' },
  { label: '4人玩法(六會)', value: 'B', name: '六會' },
  { label: '2人玩法(十二會)', value: 'C', name: '十二會' },
  { label: '1人玩法(二十四會)', value: 'D', name: '二十四會' },
]);
const caseList1 = ref([]);
const subscriptItem = reactive({});
const mm_2nd_pwd = ref('');
const tenderTabType = ref(1);
const allTenders = ref([]);
const attendTenders = ref([]);
const tenderDetail = reactive({});
const recordModalRef = ref(null);
const confirmModalRef = ref(null);
const loading = ref(false);

// Computed properties
const filteredCase1 = computed(() => {
  if (caseType.value.value === 'ALL') {
    return caseList1.value;
  }
  return caseList1.value.filter(item => item.tm_type === caseType.value.value);
});

const tenders = computed(() => {
  return tenderTabType.value === 1 ? allTenders.value : attendTenders.value;
});

// Mock Data Methods
const getMockUserData = () => {
  userData.value = {
    id: '12345',
    mm_account: 'testuser',
    participate_count: 5,
    mw_subscripts_count: 10,
  };
};

const getMockTenders = () => {
  caseList1.value = [
    { tm_id: 1, tm_type: 'A', tm_type_name: '散會', tm_count: 10, has_participants: 2, bid_count: 5, qty: 0 },
    { tm_id: 2, tm_type: 'B', tm_type_name: '六會', tm_count: 5, has_participants: 1, bid_count: 3, qty: 0 },
    { tm_id: 3, tm_type: 'C', tm_type_name: '十二會', tm_count: 12, has_participants: 0, bid_count: 10, qty: 0 },
    { tm_id: 4, tm_type: 'D', tm_type_name: '二十四會', tm_count: 24, has_participants: 5, bid_count: 1, qty: 1 },
  ];
};

const getMockAttendTenders = () => {
  allTenders.value = [
    { tm_sn: 'T001', tm_type_name: '進行中標會A', self_available_quantity: 2, self_all_quantity: 5 },
    { tm_sn: 'T002', tm_type_name: '進行中標會B', self_available_quantity: 1, self_all_quantity: 3 },
  ];
  attendTenders.value = [
    { tm_sn: 'T003', tm_type_name: '組織總會數C', self_org_available_quantity: 8, self_org_all_quantity: 10 },
    { tm_sn: 'T004', tm_type_name: '組織總會數D', self_org_available_quantity: 4, self_org_all_quantity: 5 },
  ];
};


// Methods
const showConfirm = (item) => {
  if (item.qty < 1 && item.tm_type !== 'D') {
    alert("請選擇下標數量");
    return;
  }
  Object.assign(subscriptItem, item);
  mm_2nd_pwd.value = '';
  if (confirmModalRef.value) {
    const modal = new bootstrap.Modal(confirmModalRef.value);
    modal.show();
  }
};

const subscriptCase = () => {
  if (loading.value) return;
  if (!mm_2nd_pwd.value) {
    alert('請輸入您的二級密碼');
    return;
  }
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
    alert('下標成功 (示範)');
    const modal = bootstrap.Modal.getInstance(confirmModalRef.value);
    if (modal) modal.hide();
  }, 500);
};

const openDetail = (tender) => {
  const mockDetail = {
    ttr_title: '模擬標會詳情',
    ttr_detail01: '這是標會的詳細說明第一行。',
    ttr_detail02: '這是標會的詳細說明第二行。',
    ttr_detail03: '這是標會的詳細說明第三行。',
    ttr_detail04: '這是標會的詳細說明第四行。',
    ttr_owner: '會首姓名',
    ttr_phone: '0912345678',
    ttr_tm_group_datetime: '2025-01-01',
    ttr_address: '範例地址範例地址',
    detailRows: [
      [
        { td_sequence: 1, mm_name: '會員A', mm_phone_number: '0911111111', td_update_datetime: '2025-01-10' },
        { td_sequence: 2, mm_name: '會員B', mm_phone_number: '0922222222', td_update_datetime: '2025-01-11' }
      ],
      [
        { td_sequence: 3, mm_name: '會員C', mm_phone_number: '0933333333', td_update_datetime: '2025-01-12' },
        null
      ]
    ]
  };
  Object.assign(tenderDetail, mockDetail);
  if (recordModalRef.value) {
    const modal = new bootstrap.Modal(recordModalRef.value);
    modal.show();
  }
};

const splitIntoPairs = (arr) => {
  const pairs = [];
  for (let i = 0; i < arr.length; i += 2) {
    pairs.push([arr[i], arr[i + 1] || null]);
  }
  return pairs;
};

const printData = () => {
  alert('此為示範列印功能');
};

const formatName = (name) => {
  if (name && name.length > 1) {
    if (name.length === 2) {
      return name[0] + "O";
    } else if (name.length >= 3) {
      return name[0] + "O" + name.substring(2);
    }
  }
  return name;
};

const formatPhone = (phone) => {
  if (!phone) return '';
  const length = phone.length;
  if (length <= 3) return phone;
  const midIndex = Math.floor(length / 2) - 1;
  return phone.slice(0, midIndex) + "XXX" + phone.slice(midIndex + 3);
};

const formatDate = (dateString) => {
  if (!dateString) return '-';
  return dateString.substring(0, 10);
};

const formatAddress = (address) => {
  if (!address) return '';
  if (address.length > 5) {
    return address.substring(0, 4) + 'O' + address.substring(5);
  }
  return address;
};

// Lifecycle hooks
onMounted(() => {
  getMockUserData();
  getMockTenders();
  getMockAttendTenders();

  // Initialize Bootstrap carousel
  nextTick(() => {
    const myCarouselElement = document.getElementById('myCarousel');
    if (myCarouselElement) {
      new bootstrap.Carousel(myCarouselElement, {
        interval: 2000,
        touch: true
      });
    }
  });
});
</script>

<style lang="scss" scoped>
/* Hall page specific styles */
@use '../assets/scss/hall.scss';
</style>
