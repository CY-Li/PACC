<script setup>
import { ref, reactive, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import GroupChip from '@/components/GroupChip.vue';

// Assuming Panzoom is loaded globally for now
// import Panzoom from 'panzoom'; // This would be the ideal way if it were a module

const route = useRoute();
const router = useRouter();

const userData = ref({});
const newPswd = ref('');
const newPswdConfirm = ref('');
const mm_2nd_pwd = ref('');
const mm_2nd_pwdConfirm = ref('');

const uploads = reactive([
  {
    title: "本人身份證之正反面",
    subtitle: "(身分證或護照)",
    images: [
      { label: "正面", file: null, base64: '' },
      { label: "反面", file: null, base64: '' },
    ]
  },
]);

const groups = ref([]);
const referee = ref('');

const kycData = reactive({
  userName: '',
  gender: 0,
  id: '',
  address: '',
  email: '',
  bank_code: '',
  account: '',
  bankUserName: '',
  bankBranch: '',
  wallet_address: '',
  beneficiary: '',
  beneficiary_phone: '',
  relation: '',
});

const tenderTabType = ref(1);
const allTenders = ref([]);
const attendTenders = ref([]);
const tenderCount = ref({});
const tenderDetail = ref({});
const activeTab = ref('profile');

const tenders = computed(() => {
  return tenderTabType.value === 1 ? allTenders.value : attendTenders.value;
});

const formatDate = (dateString) => {
  if (!dateString) return '-';
  return dateString.substring(0, 10);
};

const formatName = (name) => {
  const length = name?.length;
  if (length === 2) {
      return name[0] + "O";
  } else if (length === 3) {
    return name[0] + "O" + name[2];
  } else if (length >= 4) {
    return name[0] + "OO" + name[length - 1];
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

const formatAddress = (address) => {
    if (!address) return ''
    return address.slice(0, 3) + "XXX"
};


const getUserData = () => {
  // Mocking user data as there is no API backend
  const mockUserData = {
      mm_account: 'testuser',
      mm_create_datetime: '2023-01-01T12:00:00Z',
      mm_phone_number: '0912345678',
      mm_name: '測試會員'
  };
  userData.value = mockUserData;
  const url = window.location.origin;
  referee.value = `${url}/login?referee=${mockUserData.mm_account}`;
};

const updateUserData = () => {
  if (newPswd.value && newPswd.value !== newPswdConfirm.value) {
    alert("密碼輸入錯誤");
    return;
  }
  if (mm_2nd_pwd.value && mm_2nd_pwd.value !== mm_2nd_pwdConfirm.value) {
    alert("二級密碼輸入錯誤");
    return;
  }
  alert("會員資料更新成功(mock)");
  router.go(0); // Reload
};

const imgFileReader = (event, img) => {
  const file = event.target.files[0];
  if (!file) {
    img.file = null;
    img.base64 = "";
    return;
  }
  const reader = new FileReader();
  reader.onload = (e) => {
    img.file = file;
    img.base64 = e.target.result;
  };
  reader.readAsDataURL(file);
};

const copyText = () => {
  navigator.clipboard.writeText(referee.value).then(() => {
    alert('邀請連結已複製!');
  });
};

const getGroup = () => {
    // Mock data
    const mockGroups = [
        { mm_level: 1, mm_name: '總召', mw_subscripts_count: 10, mm_account: 'A001', total_qty: 100, items: [
            { mm_level: 2, mm_name: '副召', mw_subscripts_count: 5, mm_account: 'B001', total_qty: 50, items: [] }
        ] }
    ];
    groups.value = mockGroups;
};

const logout = () => {
  localStorage.removeItem("mm_user_data");
  router.push('/login');
};

const getTenderCount = () => {
  tenderCount.value = { self_available_quantity: 5, all_quantity: 10, self_org_available_quantity: 20, self_org_quantity: 50 };
};

const getAttendTender = () => {
  attendTenders.value = [ { tm_type_name: '組織標會A', self_org_available_quantity: 1, self_org_all_quantity: 2, tm_sn: 1 }];
};

const getAllTender = () => {
  allTenders.value = [ { tm_type_name: '個人標會A', self_available_quantity: 1, self_all_quantity: 1, tm_sn: 2 }];
};

const kycSubmit = () => {
  if (!kycData.userName) {
    alert("請輸入姓名");
    return;
  }
  if (!kycData.gender) {
    alert("請選擇您的性別");
    return;
  }
  const front = uploads[0].images[0].base64;
  const back = uploads[0].images[1].base64;
  if (!front || !back) {
    alert("請上傳您的身分證正反面");
    return;
  }
  alert("KYC 申請已送出 (mock)");
};

const openDetail = (tender) => {
    const mockDetail = {
        ttr_title: "標會詳情",
        ttr_detail01: "詳情1",
        ttr_detail02: "詳情2",
        ttr_detail03: "詳情3",
        ttr_detail04: "詳情4",
        ttr_owner: "會首A",
        ttr_phone: "0987654321",
        ttr_tm_group_datetime: "2023-10-01",
        ttr_address: "地址地址地址",
        detailRows: [
            [{ td_sequence: 1, mm_name: '會員A', mm_phone_number: '0911111111', td_update_datetime: '2023-10-02' }, { td_sequence: 2, mm_name: '會員B', mm_phone_number: '0922222222', td_update_datetime: '2023-10-03' }]
        ]
    };
    tenderDetail.value = mockDetail;
    // This requires Bootstrap's modal instance. Assuming it's available.
    // In a real Vue app, you'd use a library like bootstrap-vue or a custom modal component.
    const modal = new bootstrap.Modal(document.getElementById('recordModal'));
    modal.show();
};

const printData = () => {
    const printArea = document.getElementById("print-area").innerHTML;
    const printWindow = window.open("", "", "width=800,height=600");
    printWindow.document.write(`<html><head><title>列印</title></head><body>${printArea}</body></html>`);
    printWindow.document.close();
    printWindow.print();
}

const setActiveTab = (tab) => {
    activeTab.value = tab;
    router.push({ query: { type: tab } })

    if (tab === 'invite') getGroup();
    if (tab === 'tender') {
        getAttendTender();
        getAllTender();
        getTenderCount();
    }
}

onMounted(() => {
  const queryType = route.query.type;
  if (['profile', 'tender', 'invite', 'kyc'].includes(queryType)) {
    activeTab.value = queryType;
  }

  getUserData();
  if (activeTab.value === 'invite') {
    getGroup();
  }
  if (activeTab.value === 'tender') {
    getAttendTender();
    getAllTender();
    getTenderCount();
  }

  const dragEl = document.getElementById('drag');
  if (dragEl) {
      const panzoom = Panzoom(dragEl, { canvas: true });
      const zoomInButton = document.getElementById('zoomIn');
      const zoomOutButton = document.getElementById('zoomOut');
      if (zoomInButton) zoomInButton.addEventListener('click', panzoom.zoomIn);
      if (zoomOutButton) zoomOutButton.addEventListener('click', panzoom.zoomOut);
  }
});

</script>

<template>
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
            <div @click="setActiveTab('profile')" :class="['nav', 'profile', { 'active': activeTab === 'profile' }]">
                變更<br class="d-block d-lg-none">密碼
                <div class="text-en fs-12">CHANGE PASSWORD</div>
            </div>
            <div @click="setActiveTab('tender')" :class="['nav', 'tender', { 'active': activeTab === 'tender' }]">
                參與<br class="d-block d-lg-none">標會
                <div class="text-en fs-12">PARTICIPATE IN THE TENDER</div>
            </div>
            <div @click="setActiveTab('invite')" :class="['nav', 'invite', { 'active': activeTab === 'invite' }]">
                組織
                <div class="text-en fs-12">TEAMS</div>
            </div>
            <div @click="setActiveTab('kyc')" :class="['nav', 'kyc', { 'active': activeTab === 'kyc' }]">
                KYC
                <div class="text-en fs-12">KYC</div>
            </div>
            <div @click="logout" class="nav logout d-none d-lg-block">
                會員<br class="d-block d-lg-none">登出
                <div class="text-en fs-12">MEMBER LOGOUT</div>
            </div>
        </div>
      </div>

      <div class="accountBody">
        <!-- 會員資料 -->
        <div v-if="activeTab === 'profile'" class="frame profile">
          <div class="frameTitle">
            <div class="title-zh">變更密碼</div>
            <div class="title-en text-en">CHANGE PASSWORD</div>
          </div>
          <div class="date">
            註冊日期　<span class="text-en">{{ formatDate(userData.mm_create_datetime) }}</span>
          </div>
          <form @submit.prevent="updateUserData" id="profileForm">
            <div class="formTitle"></div>
            <div class="formGroup">
              <div class="custom-input-group">
                <label for="profile_pswd">變更新密碼</label>
                <input v-model="newPswd" minlength="4" maxlength="15" type="password" class="form-control" id="profile_pswd">
              </div>
              <div class="custom-input-group">
                <label for="profile_pswd2">確認新密碼</label>
                <input v-model="newPswdConfirm" minlength="4" maxlength="15" type="password" class="form-control" id="profile_pswd2">
              </div>
              <div class="custom-input-group">
                <label></label>
                <div style="color: #e15b5b">無須變更請空白</div>
              </div>
            </div>
            <div class="formTitle"></div>
            <div class="formGroup">
              <div class="custom-input-group">
                <label for="mm_2nd_pwd">變更二級密碼</label>
                <input v-model="mm_2nd_pwd" minlength="4" maxlength="15" type="password" class="form-control" id="mm_2nd_pwd">
              </div>
              <div class="custom-input-group">
                <label for="mm_2nd_pwdConfirm">確認二級密碼</label>
                <input v-model="mm_2nd_pwdConfirm" minlength="4" maxlength="15" type="password" class="form-control" id="mm_2nd_pwdConfirm">
              </div>
              <div class="custom-input-group">
                <label></label>
                <div style="color: #e15b5b">無須變更請空白</div>
              </div>
            </div>
            <div class="tips" style="text-align: left;">
              <ul>
                <li>這邊可以放備註</li>
              </ul>
            </div>
            <div class="form-check formCheck" style="text-align: left;">
              <input class="form-check-input" type="checkbox" value="" name="check_terms" id="check_terms" required>
              <label class="form-check-label" for="check_terms">
                本人已清楚了解上列備註說明
              </label>
            </div>
            <button type="submit" class="common-btn">
              <div class="w-100">確認送出</div>
              <div class="text-en fs-12 color-secondary">CONFIRM REGISTRATION</div>
            </button>
          </form>
        </div>

        <!-- 參與標會 -->
        <div v-if="activeTab === 'tender'" class="frame tender">
            <div class="subtotal">
            <div class="child">
                <div class="name">進行中活會</div>
                <div class="amount text-en">{{ tenderCount.self_available_quantity || 0 }}</div>
            </div>
            <div class="child">
                <div class="name">已參與會數</div>
                <div class="amount text-en">{{ tenderCount.all_quantity || 0 }}</div>
            </div>
            <div class="child">
                <div class="name">組織總活會</div>
                <div class="amount text-en">{{ tenderCount.self_org_available_quantity || 0 }}</div>
            </div>
            <div class="child">
                <div class="name">組織總會數</div>
                <div class="amount text-en">{{ tenderCount.self_org_quantity || 0 }}</div>
            </div>
            </div>
            <div class="tenderBtns">
            <div class="tenderBtn" :class="{'active': tenderTabType == 1}" @click="tenderTabType = 1">進行中活會</div>
            <div class="tenderBtn" :class="{'active': tenderTabType == 2}" @click="tenderTabType = 2">組織總會數</div>
            </div>

            <div class="attendData">
            <div class="tenderChipRow">
                <div v-for="tender in tenders" :key="tender.tm_sn" class="tenderChip" @click="openDetail(tender)">
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
            <div class="modal fade" id="recordModal" tabindex="-1" aria-labelledby="recordModal" aria-hidden="true">
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
                        <tr v-for="(row, ind) in tenderDetail.detailRows" :key="`row-${ind}`">
                        <td>{{ row[0].td_sequence }}</td>
                        <td>{{ formatName(row[0].mm_name) }}</td>
                        <td>{{ formatPhone(row[0].mm_phone_number) }}</td>
                        <td>{{ formatDate( row[0].td_update_datetime) }}</td>
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
        </div>

        <!-- 組織 -->
        <div v-if="activeTab === 'invite'" class="frame subaccount invite">
            <div class="accountData">
            <!-- 主帳號資訊 -->
            <div class="mainAccountData">
                <div class="child">
                <div class="dataRow">
                    <div>
                    <div>帳號</div>
                    <div class="text-en">{{ userData.mm_phone_number }}</div>
                    </div>
                    <div class="inviteData">
                    <div>我的邀請代碼</div>
                    <div class="text-en">{{ userData.mm_account }}</div>
                    </div>
                </div>
                <div class="inviteTable">
                    <div class="label">分享邀請連結</div>
                    <div class="inviteInput">
                    <input type="text" id="invite_link" class="form-control" name="invite_link" disabled :value="referee">
                    <div class="copyBtn" @click="copyText">複製</div>
                    </div>
                </div>
                </div>
            </div>
            <div class="subaccountData">組織圖</div>
            <!-- 拖曳樹狀圖 -->
            <div class="dragContainer" style="position: relative;">
                <div class="tips">
                <div class="title">
                    <div>組織總覽</div>
                    <div class="text-en italic color-secondary fs-12">ORGANIZE</div>
                </div>
                <div>
                    <div class="tip">
                    <div class="arrows">
                        <span class="text-en italic fs-12 color-primary">
                        DRAG
                        <div class="arrow up"><img src="/images/arrow-up.svg" alt=""></div>
                        <div class="arrow right"><img src="/images/arrow-up.svg" alt=""></div>
                        <div class="arrow down"><img src="/images/arrow-up.svg" alt=""></div>
                        <div class="arrow left"><img src="/images/arrow-up.svg" alt=""></div>
                        </span>
                    </div>
                    <div class="text">
                        <div><span class="d-none d-md-inline">左鍵</span>按住畫面</div>
                        <div>可移動畫面</div>
                    </div>
                    
                    </div>
                    <div class="zooms">點擊<span id="zoomIn"><i class="bi bi-plus-circle"></i>放大</span>或<span id="zoomOut"><i class="bi bi-dash-circle"></i>縮小</span></div>
                </div>
                </div>
                <div id="drag" style="background-image:url(/images/home/panzoom.png)">
                <div class="dragBody d-flex flex-column justify-content-center align-items-center">
                    <div class="dragItems">
                    <group-chip v-for="(item, key) in groups" :item="item" :key="item.mm_account" />
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>

        <!-- KYC -->
        <div v-if="activeTab === 'kyc'" class="frame kyc">
            <div class="frameTitle">
                <div class="title-zh">審核驗證</div>
            </div>
            <!-- 表單 -->
            <form @submit.prevent="kycSubmit" id="kycForm">
                <div class="pt-4">
                <div class="formTitle" style="text-align: left;">申請者資料</div>
                <div class="formGroup">
                    <div class="custom-input-group">
                        <label for="kyc-name" class="require">姓名</label>
                        <input v-model="kycData.userName" type="text" class="form-control" id="kyc-name" required>
                    </div>
                    <div class="custom-input-group">
                        <label class="require">性別</label>
                        <div  class="d-flex align-items-center">
                        <div class="form-check me-2">
                            <input v-model="kycData.gender" :value="1" class="form-check-input" type="radio" name="gender" id="gender_male">
                            <label class="form-check-label" for="gender_male">男</label>
                        </div>
                        <div class="form-check">
                            <input v-model="kycData.gender" :value="2" class="form-check-input" type="radio" name="gender" id="gender_female">
                            <label class="form-check-label" for="gender_female">女</label>
                        </div>
                        </div>
                    </div>
                    <div class="custom-input-group">
                        <label for="identify" class="require">身分證字號</label>
                        <input v-model="kycData.id" minlength="10" maxlength="10" type="text" class="form-control" id="identify" required>
                    </div>
                    <div class="custom-input-group">
                        <label for="address" class="require">通訊地址</label>
                        <input v-model="kycData.address" type="text" class="form-control" id="address" required>
                    </div>
                    <div class="custom-input-group">
                        <label for="email" class="require">電子郵件</label>
                        <input v-model="kycData.email" type="email" class="form-control" id="email" required>
                    </div>
                    <div class="custom-input-group">
                        <label for="bank_account" class="require">銀行帳號</label>
                        <div class="d-flex flex-grow-1" style="max-width: 515px;">
                        <input v-model="kycData.bank_code" style="max-width: 90px;" placeholder="銀行代碼" type="text" class="form-control" id="bank_code" name="bank_code" required>
                        <input v-model="kycData.account" style="max-width: calc(100% - 90px)" placeholder="銀行帳號" type="text" class="form-control" id="bank_account" name="bank_account" required>
                        </div>
                    </div>
                    <div class="custom-input-group">
                        <label for="bank_user_name" class="require">戶名</label>
                        <input v-model="kycData.bankUserName" type="text" class="form-control" id="bank_user_name" name="bank_user_name" required>
                    </div>
                    <div class="custom-input-group">
                        <label for="bank_branch" class="require">分行</label>
                        <input v-model="kycData.bankBranch" type="text" class="form-control" id="bank_branch" name="bank_branch" required>
                    </div>
                    <div class="custom-input-group">
                        <label for="wallet-address" class="require">電子錢包地址</label>
                        <input v-model="kycData.wallet_address" type="text" class="form-control" id="wallet-address" name="wallet-address" required>
                    </div>
                </div>
                <div class="formTitle" style="text-align: left;">上傳身分證明</div>
                <div class="formGroup">
                    <div v-for="(upload, ind) in uploads" :key="ind" class="uploadLayout">
                    <div v-for="(img, idx) in upload.images" :key="`${ind}_${idx}`" class="custom-upload-group">
                        <div class="name">{{img.label}}</div>
                        <div class="uploadFrame">
                        <div class="tip1">將圖片拖曳到這裡</div>
                        <div class="tip2">或</div>
                        <label v-show="!img.base64" :for="`img${ind}_${idx}`" class="common-btn">上傳圖片</label>
                        <div v-show="img.base64" class="imgPreview"><img :src="img.base64" alt=""></div>
                        <input type="file" @change="imgFileReader($event, img)" :id="`img${ind}_${idx}`" :name="`img${ind}_${idx}`" required>
                        </div>
                    </div>
                    </div>
                </div>
                <div class="formTitle" style="text-align: left;">指定受益人</div>
                <div class="formGroup">
                    <div class="custom-input-group">
                    <label for="beneficiary">受益人</label>
                    <input v-model="kycData.beneficiary" type="text" class="form-control" id="beneficiary" name="beneficiary">
                    </div>
                    <div class="custom-input-group">
                    <label for="beneficiary_phone">聯絡電話</label>
                    <input v-model="kycData.beneficiary_phone" type="text" class="form-control" id="beneficiary_phone" name="beneficiary_phone">
                    </div>
                    <div class="custom-input-group">
                    <label for="relation">與本人關係</label>
                    <input v-model="kycData.relation" type="text" class="form-control" id="relation" name="relation">
                    </div>
                </div>
                </div>
                <button type="submit" class="common-btn">
                <div class="w-100">申請審核</div>
                <div class="text-en fs-12 color-secondary">CONFIRM</div>
                </button>
            </form>
        </div>
      </div>
    </div>
  </main>
</template>

<style lang="scss">
@use '../assets/scss/account.scss';
</style>