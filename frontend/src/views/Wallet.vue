<template>
  <div>
    <main>
      <div class="walletContainer">
        <!-- menu選單 -->
        <div class="leftColumn">
          <div class="memberCard">
            <div class="memberId">
              <div class="color-secondary">會員編號</div>
              <div class="memberNum">{{ userData.mm_account }}</div>
            </div>
            <div class="balance">
              <div>
                <div>帳戶餘額</div>
                <div class="amount">{{ walletData.mw_stored || 0 }}</div>
              </div>
            </div>
          </div>
          <div class="walletNavs">
            <router-link to="/wallet?type=pay" class="nav pay" :class="{active: urlType == 'pay'}">
              轉入<br class="d-block d-lg-none">註冊點數
              <div class="text-en fs-12">TRANSFER</div>
            </router-link>
            <router-link to="/wallet?type=recharge" class="nav recharge" :class="{active: urlType == 'recharge'}">
              加值
              <div class="text-en fs-12">RECHARGE</div>
            </router-link>
            <router-link to="/wallet?type=withdraw" class="nav withdraw" :class="{active: urlType == 'withdraw'}">
              提領<br class="d-block d-lg-none">餘額
              <div class="text-en fs-12">WITHDRAW BALANCE</div>
            </router-link>
            <router-link to="/wallet?type=detail" class="nav detail" :class="{active: urlType == 'detail'}">
              金流<br class="d-block d-lg-none">明細
              <div class="text-en fs-12">CASH FLOW DETAILS</div>
            </router-link>
            <router-link to="/wallet?type=closing" class="nav closing" :class="{active: urlType == 'closing'}">
              死會<br class="d-block d-lg-none">明細
              <div class="text-en fs-12">CLOSING DUES</div>
            </router-link>
          </div>
        </div>

        <!-- 內容主體 -->
        <div class="walletBody">
          <!-- 錢包 -->
          <div class="memberCard">
            <div class="memberId">
              <span class="circle1 circle"></span>
              <span class="circle2 circle"></span>
              會員編號 <span class="text-en">{{ userData.mm_account || 0 }}</span>
            </div>
            <div class="memberWallet">
              <div class="balance">
                帳戶餘額 <span class="amount text-en ps-1">{{ walletData.mw_stored || 0 }}</span>
                <div class="tip">(可用點數) 可提領</div>
              </div>
              <div class="balance">
                平安點數 <span class="amount text-en ps-1">{{ walletData.mw_peace || 0 }}</span>
                <div class="tip">(得標金) 七天後轉到餘額</div>
              </div>
            </div>
            <div class="extra">
              <div class="bonus">
                <div class="mb-2">紅利點數<span class="amount text-en ps-1">{{ walletData.mw_reward || 0 }}</span></div>
                <div class="mb-2">商城點數<span class="amount text-en ps-1">{{ walletData.mw_mall || 0 }}</span></div>
              </div>
              <div class="bonus">
                <div class="mb-2">註冊點數<span class="amount text-en ps-1">{{ walletData.mw_registration || 0 }}</span></div>
                <div class="mb-2">累積獎勵<span class="amount text-en ps-1">{{ walletData.mw_accumulation || 0 }}</span></div>
              </div>
              <div class="bonus d-flex align-items-center">
                <div>死會會費 <span class="amount text-en ps-1">{{ walletData.mw_death || 0 }}</span></div>
                <div class="form-check mb-0 ms-2" style="min-height: auto;">
                  <input v-model="isAuto" class="form-check-input" id="isAuto" type="checkbox" @change="autoPay">
                  <label class="form-check-label" for="isAuto">自動續費</label>
                </div>
              </div>
              <div class="bonus">
                <div class="mb-2">當期繳交會費<span class="amount text-en ps-1">{{ walletData.current_bid_fee || 0 }}</span></div>
                <div class="mb-2">下期預估會費<span class="amount text-en ps-1">{{ walletData.next_bid_estimate || 0 }}</span></div>
              </div>
            </div>
          </div>
          <div class="memberInfo">
            <!-- 切換按鈕 -->
            <div class="buttons">
              <div class="leftButton">
                <div class="title">
                  錢包餘額　
                  <span class="text-en">{{ walletData.mw_stored || 0 }}</span>
                </div>
                <router-link to="/wallet?type=withdraw" class="common-btn withdraw nav" :class="{active: urlType == 'withdraw'}">提領餘額</router-link>
              </div>
              <div class="rightButton">
                <router-link to="/wallet?type=recharge" class="common-btn recharge nav" :class="{active: urlType == 'recharge'}">
                  <div class="w-100">加值</div>
                  <div class="text-en fs-12 color-secondary">RECHARGE</div>
                </router-link>
                <router-link to="/wallet?type=pay" class="common-btn pay nav" :class="{active: urlType == 'pay'}">
                  <div class="w-100">轉入註冊點數</div>
                  <div class="text-en fs-12 color-secondary">TRANSFER</div>
                </router-link>
              </div>
            </div>
          </div>

          <!-- 繳費表單 -->
          <form v-if="urlType == 'pay'" class="pay"  @submit.prevent="showConfirm">
            <div class="formTitle">
              轉入註冊點數
              <div class="text-en fs-12 color-secondary">TRANSFER</div>
            </div>
            <div class="form-input-groups">
              <div class="custom-input-group">
                <input type="text" v-model="registPoint" class="form-control mb-4" placeholder="請輸入轉入數量">
                <input type="text" v-model="registPointTarget" class="form-control" placeholder="將註冊點數進行贈送時，請輸入對方帳號">
              </div>
            </div>
            
            <button type="submit" class="common-btn">
              <div class="w-100">確認送出</div>
              <div class="text-en fs-12 color-secondary">CONFIRM</div>
            </button>
          </form>
          <div class="modal fade" id="confirmModal" tabindex="-1" ref="confirmModalRef">
            <div class="modal-dialog modal-dialog-centered">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title">系統提示</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  <p v-if="registPointTarget">即將贈送{{Number(registPoint)}}給{{registPointTarget}}</p>
                  <p v-else-if="registPoint">即將從餘額轉入{{Number(registPoint)}}至註冊點數</p>
                  <p>是否確定進行此操作?</p>
                  <p>若要繼續請輸入您的二級密碼後進行確定</p>
                  <div style="max-width: 100%; width: 300px">
                    <input v-model="mm_2nd_pwd" minlength="4" class="w-100" maxlength="15" id="password2" name="password2" type="password" required>
                  </div>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
                  <button type="button" class="btn btn-primary" :disabled="isLoading" @click="submitTransfer">確定</button>
                </div>
              </div>
            </div>
          </div>

          <!-- 加值表單 -->
          <form v-if="urlType == 'recharge'" @submit.prevent="doDeposit" class="recharge">
            <div class="formTitle">加值<div class="text-en fs-12 color-secondary">RECHARGE</div></div>
            <div class="form-input-groups">
              <div class="custom-input-group">
                <select v-model="rechargeMethod" class="form-select" id="recharge_method" name="recharge_method">
                  <option selected disabled value="">加值方式</option>
                  <option value="blockchain">區塊鏈錢包</option>
                  <option value="bank">銀行轉帳</option>
                </select>
              </div>
            </div>

            <!-- 區塊鏈錢包表單 -->
            <div class="blockchain-groups" v-if="rechargeMethod == 'blockchain'">
              <div class="divline2"></div>
              <div class="form-input-groups">
                <label>選擇幣種</label>
                <div class="custom-input-group">
                  <select v-model="blockchainForm.coinType" class="form-select" id="coin_type">
                    <option selected disabled value="">請選擇</option>
                    <option value="USDT">USDT</option>
                  </select>
                </div>
              </div>

              <div class="form-input-groups">
                <label for="money_blockchain">輸入金額</label>
                <div class="custom-input-group moneyInput">
                  <input v-model="blockchainForm.amount" class="form-control" type="text" id="money_blockchain">
                </div>
                <div class="refreshBtn"><i class="bi bi-check-lg"></i>刷新</div>
              </div>

              <div class="form-input-groups">
                <label for="money_blockchain">匯率</label>
                <div class="mb-3">{{ conf.deposit_rate }}</div>
              </div>
              
              <div class="form-input-groups">
                <label for="key_blockchain">付款憑證</label>
                <div class="custom-input-group">
                  <input v-model="blockchainForm.key" class="form-control" type="text" id="key_blockchain">
                </div>
              </div>
              <div class="form-input-groups">
                <label for="address_blockchain">虛擬幣地址</label>
                <div class="custom-input-group">
                  <input v-model="blockchainForm.address" class="form-control" type="text" id="address_blockchain">
                </div>
              </div>
              <div class="uploadLayout">
                <div class="qrcode-rows">
                  <div class="qrcode">QR CODE<br class="d-none d-lg-block">(二維碼)</div>
                  <div v-if="depositData.sps_picture" class="qrcodeImg"><img :src="`data:image/jpg;base64,${depositData.sps_picture}`" alt=""></div>
                </div>

                <div class="custom-upload-group">
                  <div class="name">上傳成功圖片</div>
                  <div class="uploadFrame">
                    <div class="tip1">將圖片拖曳到這裡</div>
                    <div class="tip2">或</div>
                    <label v-show="!file1.base64" for="depositFile1" class="common-btn">上傳圖片</label>
                    <div v-show="file1.base64" class="imgPreview"><img :src="file1.base64" alt=""></div>
                    <input type="file" @change="imgFileReader($event, file1)" id="depositFile1" name="depositFile1" required>
                  </div>
                </div>
              </div>
              <div class="checkRow">
                <input v-model="blockchainForm.confirm" class="form-check-input" type="checkbox" id="check_terms_blockchain">
                <label class="form-check-label" for="check_terms_blockchain">
                  本人已清楚了解<span class="termsBtn" style="color: #d4481c;cursor:pointer">注意事項</span>說明
                </label>
              </div>
            </div>

            <!-- 銀行轉帳表單 -->
            <div class="transfer-groups" v-if="rechargeMethod == 'bank'">
              <!-- <div class="form-input-groups ">
                <div class="custom-input-group">
                  <select class="form-select" id="transfer_method" name="transfer_method" required>
                    <option value="fillIn" selected>填入帳戶</option>
                    <option value="qrcode">QR Code(二維碼)</option>
                  </select>
                </div>
              </div> -->
              <!-- <div class="divline2"></div> -->
              <!-- 選擇填寫帳戶轉帳表單 -->
              <div class="accountForm">
                <!-- <div class="form-input-groups">
                  <label class="d-none d-lg-block" for="money_blockchain">選擇銀行</label>
                  <div class="custom-input-group">
                    <select class="form-select" id="transfer_bank" name="bank_id" required>
                      <option selected disabled value="">請選擇銀行</option>
                      <option value="1">台灣銀行</option>
                    </select>
                  </div>
                </div> -->
                <div class="form-input-groups">
                  <label>銀行代號</label>
                  <div class="mb-3">{{ conf.company_bank_code }}</div>
                </div>
                <div class="form-input-groups">
                  <label>銀行帳戶</label>
                  <div class="mb-3">{{ conf.company_bank_account }}</div>
                </div>
                <div class="form-input-groups">
                  <label>收受人</label>
                  <div class="mb-3">{{ conf.company_bank_account_name }}</div>
                </div>
                
                <!-- <div class="form-input-groups">
                  <label class="d-none d-lg-block" for="transfer_account">銀行帳戶</label>
                  <div class="custom-input-group">
                    <input placeholder="請輸入銀行帳戶" class="form-control" type="text" id="transfer_account" name="account">
                  </div>
                </div> -->

                <!-- <div class="form-input-groups">
                  <label for="card_date_mm">到期日</label>
                  <div class="custom-input-group shortInput">
                    <input placeholder="MM" class="form-control" type="text" id="card_date_mm" name="card_date_mm">
                  </div>
                  <span class="mx-4 mb-4" style="color: #9c9c9c;">/</span>
                  <div class="custom-input-group shortInput">
                    <input placeholder="YY" class="form-control" type="text" id="card_date_yy" name="card_date_yy">
                  </div>
                </div> -->

                <!-- <div class="form-input-groups">
                  <label for="valid_code">安全驗證碼</label>
                  <div class="custom-input-group mediumInput">
                    <input placeholder="請輸入" class="form-control" type="text" id="valid_code" name="valid_code">
                  </div>
                </div> -->

                <!-- <div class="divline2"></div> -->

                <!-- <div class="form-input-groups">
                  <label for="address">帳單地址</label>
                  <div class="custom-input-group">
                    <input placeholder="請輸入" class="form-control" type="text" id="address" name="address">
                  </div>
                </div>
                <div class="form-input-groups">
                  <label for="zip_code">郵遞區號</label>
                  <div class="custom-input-group mediumInput">
                    <input placeholder="請輸入" class="form-control" type="text" id="zip_code" name="zip_code">
                  </div>
                </div> -->

                <!-- <div class="divline2"></div> -->
              </div>

              <div class="form-input-groups mb-4 mb-lg-5">
                <label for="money_transfer">轉入金額</label>
                <div class="custom-input-group mediumInput">
                  <input placeholder="請輸入" v-model="bankForm.amount" class="form-control" type="text" id="money_transfer" name="money">
                </div>
              </div>
              <div class="uploadLayout" style="padding-left: 60px;">
                <div class="custom-upload-group">
                  <div class="name">上傳成功圖片</div>
                  <div class="uploadFrame">
                    <div class="tip1">將圖片拖曳到這裡</div>
                    <div class="tip2">或</div>
                    <label v-show="!file2.base64" for="depositFile2" class="common-btn">上傳圖片</label>
                    <div v-show="file2.base64" class="imgPreview"><img :src="file2.base64" alt=""></div>
                    <input type="file" @change="imgFileReader($event, file2)" id="depositFile2" name="depositFile2" required>
                  </div>
                </div>
              </div>
              <div class="checkRow">
                <input class="form-check-input" type="checkbox" value="1" name="check_terms" id="check_terms_transfer" required>
                <label class="form-check-label" for="check_terms_transfer">
                  本人已清楚了解<span class="termsBtn" style="color: #d4481c;cursor:pointer">注意事項</span>說明
                </label>
              </div>
              
            </div>
            
            <button type="submit" class="common-btn" :disabled="rechargeBtnDisabled">
              <div class="w-100">確認送出</div>
              <div class="text-en fs-12 color-secondary">CONFIRM REGISTRATION</div>
            </button>
            <div class="divLine"></div>
            <div class="formTitle">加值紀錄</div>
            <div class="detailTable">
              <template v-if="rechargeRecords.length">
                <div v-for="item, idx in rechargeRecords" :key="idx" class="tableRow">
                  <div class="leftRow">
                    <div class="date">{{ item.ad_url }}</div>
                    <div class="content">{{ item.ad_status }}</div>
                  </div>
                  <div class="rightRow">
                    <div class="type">{{ item.ad_status }}</div>
                    <div class="amount">{{ item.ad_amount }}</div>
                  </div>
                </div>
              </template>
              <div v-else class="text-center">查無資料</div>
            </div>
          </form>
          <!-- 提領表單 -->
          <form v-if="urlType == 'withdraw'" @submit.prevent="doWithdraw" class="withdraw">
            <div class="formTitle">
              提領餘額
              <div class="text-en fs-12 color-secondary">WITHDRAW BALANCE</div>
            </div>
            .
            <div class="withdraw-input-groups">
              <div class="custom-input-group">
                <select v-model="withdrawForm.bank" class="form-select mb-3" id="bankIdWithdraw" name="bank_id" required>
                  <option value="1">銀行代碼</option>
                  <option value="2">USDT地址</option>
                </select>
                <input type="text" v-model="withdrawForm.account" class="form-control" id="accountWithdraw" name="account" :placeholder="withdrawForm.bank == 1? '請輸入轉入帳號' : '請輸入TRX地址'" required>
              </div>
              <div class="custom-input-group">
                <div>
                  <input type="text" v-model="withdrawForm.amount" class="form-control" id="moneyWitjdraw" name="money" placeholder="請輸入金額" required>
                  <div class="balance">可用餘額 <span class="amount text-en">{{ walletData.mw_stored || 0 }}</span></div>
                </div>
                <div class="mt-1">匯率 {{ conf.withdraw_rate }}</div>
              </div>
            </div>
            
            <button type="submit" class="common-btn">
              <div class="w-100">確認送出</div>
              <div class="text-en fs-12 color-secondary">CONFIRM REGISTRATION</div>
            </button>
          </form>

          <!-- 金流明細 -->
          <form v-if="urlType == 'detail'" id="detailForm" class="detail">
            <div class="d-flex justify-content-between align-items-center">
              <div class="formTitle">
                金流明細
                <div class="text-en fs-12 color-secondary">CASH FLOW DETAILS</div>
              </div>
              <div class="d-flex align-items-center pe-4">
                <label class="mr-2">類別：</label>
                <select v-model="pointType" @change="changePointType" class="form-select" style="width: 160px" aria-label="Default select example">
                  <option :value="0">全部</option>
                  <option :value="11">儲值點數</option>
                  <option :value="12">紅利點數</option>
                  <option :value="13">平安點數</option>
                  <option :value="14">商城點數</option>
                  <option :value="15">註冊點數</option>
                </select>
              </div>
            </div>
            <div v-if="cashFlowData.length" class="detailTable">
              <div class="tableRow" v-for="data in cashFlowData">
                <div class="leftRow">
                  <div class="date">{{ data.mb_create_datetime.substr(0, 10) }}</div>
                  <div class="content">{{ data.mb_income_type_name }}</div>
                </div>
                <div class="rightRow">
                  <div class="type">{{ data.mb_tr_type_name }}</div>
                  <div class="amount">{{ data.mb_change_points }}</div>
                  <!-- <div class="toggleBtn"><i class="bi bi-chevron-up"></i></div> -->
                </div>
                <!-- <div class="detail">
                  <div class="detailRow">
                    <div class="bank"></div>
                    <div class="account"></div>
                  </div>
                  
                </div> -->
              </div>
            </div>
            <!-- 分頁切換 -->
            <div v-if="cashFlowData.length" class="paginations">
              <div class="page-prev" :class="{'disabled': pageIndex <= 1}" @click="changePage(pageIndex - 1)"><i class="bi bi-caret-left-fill"></i></div>
              <div v-if="hasPreGroup" @click="currentPageSizeGroup -= 1" class="page-ellipsis-prev">…</div>
              <div 
                class="page"
                v-for="n in cashFlowTotalPage"
                @click="changePage(n)"
                :class="{'active': pageIndex == n}"
                :style="{'display': isInCurrentPageGroup(n)? 'flex' : 'none'}"
                >{{ n }}
              </div>
              <div v-if="hasNextGroup" @click="currentPageSizeGroup += 1" class="page-ellipsis-next">…</div>
              <div class="page-next" :class="{'disabled': pageIndex >= cashFlowTotalPage}" @click="changePage(pageIndex + 1)"><i class="bi bi-caret-right-fill"></i></div>
            </div>
            <div v-else class="text-center">暫無資料</div>
          </form>

          <!-- 死會會費 -->
          <form v-if="urlType == 'closing'" id="closingForm" class="closing">
            <div class="closingTitle">
              <div class="formTitle">
                死會會費
                <div class="text-en fs-12 color-secondary">CLOSING DUES</div>
              </div>
              <div class="tip">(自動續繳)</div>
            </div>
            <div v-if="cashFlowData.length" class="detailTable">
              <div class="tableRow" v-for="data in cashFlowData">
                <div class="leftRow">
                  <div class="date">{{ data.mb_create_datetime.substr(0, 10) }}</div>
                  <div class="content">{{ data.mb_income_type_name }}</div>
                </div>
                <div class="rightRow">
                  <div class="type">{{ data.mb_tr_type_name }}</div>
                  <div class="amount">{{ data.mb_change_points }}</div>
                  <!-- <div class="toggleBtn"><i class="bi bi-chevron-up"></i></div> -->
                </div>
                <!-- <div class="detail">
                  <div class="detailRow">
                    <div class="bank"></div>
                    <div class="account"></div>
                  </div>
                  
                </div> -->
              </div>
            </div>
            <!-- 分頁切換 -->
            <div v-if="cashFlowData.length" class="paginations">
              <div class="page-prev" :class="{'disabled': pageIndex <= 1}" @click="changePage(pageIndex - 1)"><i class="bi bi-caret-left-fill"></i></div>
              <div v-if="hasPreGroup" @click="currentPageSizeGroup -= 1" class="page-ellipsis-prev">…</div>
              <div 
                class="page"
                v-for="n in cashFlowTotalPage"
                @click="changePage(n)"
                :class="{'active': pageIndex == n}"
                :style="{'display': isInCurrentPageGroup(n)? 'flex' : 'none'}"
                >{{ n }}
              </div>
              <div v-if="hasNextGroup" @click="currentPageSizeGroup += 1" class="page-ellipsis-next">…</div>
              <div class="page-next" :class="{'disabled': pageIndex >= cashFlowTotalPage}" @click="changePage(pageIndex + 1)"><i class="bi bi-caret-right-fill"></i></div>
            </div>
            <div v-else class="text-center">暫無資料</div>
          </form>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed, watch, nextTick } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import * as bootstrap from 'bootstrap'; // Import all of bootstrap's JS

const router = useRouter();
const route = useRoute();

// --- Mock Data ---
const getMockUserData = () => ({ mm_account: 'MOCK_USER' });
const getMockWalletData = () => ({
  mw_stored: 10000,
  mw_peace: 5000,
  mw_reward: 800,
  mw_mall: 200,
  mw_registration: 1500,
  mw_accumulation: 300,
  mw_death: 100,
  current_bid_fee: 50,
  next_bid_estimate: 60,
});
const getMockConfig = () => ({
  deposit_rate: 30.5,
  withdraw_rate: 30.0,
  company_bank_code: '007',
  company_bank_account: '123-456-789012',
  company_bank_account_name: '模擬商會戶口',
  mm_kyc_id: 'KYC12345'
});
const getMockRechargeRecords = () => [
  { ad_url: '2025-01-10', ad_status: '完成', ad_amount: 500 },
  { ad_url: '2025-01-11', ad_status: '處理中', ad_amount: 1000 },
];
const getMockCashFlow = (type) => {
    if(type == 16) { // Closing dues
        return [
            { mb_create_datetime: '2025-01-15', mb_income_type_name: '死會費用A', mb_tr_type_name: '支出', mb_change_points: -100 },
            { mb_create_datetime: '2025-01-16', mb_income_type_name: '死會費用B', mb_tr_type_name: '支出', mb_change_points: -150 },
        ]
    }
    return [
        { mb_create_datetime: '2025-01-12', mb_income_type_name: '點數轉入', mb_tr_type_name: '收入', mb_change_points: 500 },
        { mb_create_datetime: '2025-01-13', mb_income_type_name: '提領', mb_tr_type_name: '支出', mb_change_points: -200 },
        { mb_create_datetime: '2025-01-14', mb_income_type_name: '紅利贈送', mb_tr_type_name: '收入', mb_change_points: 50 },
    ];
};

// --- Reactive state ---
const userData = ref(getMockUserData());
const walletData = reactive(getMockWalletData());
const conf = reactive(getMockConfig());
const isAuto = ref(true);
const urlType = ref('pay');
const registPoint = ref(undefined);
const registPointTarget = ref('');
const mm_2nd_pwd = ref('');
const isLoading = ref(false);

const rechargeMethod = ref("");
const depositData = reactive({ sps_picture: '...' }); // Mock QR code data

const blockchainForm = reactive({ coinType: "USDT", amount: "", key: "", address: '', confirm: false });
const bankForm = reactive({ amount: "" });
const file1 = reactive({ base64: '', file: null });
const file2 = reactive({ base64: '', file: null });

const rechargeRecords = ref([]);
const withdrawForm = reactive({ bank: "1", account: '', amount: '' });

const pointType = ref(0);
const cashFlowData = ref([]);
const cashFlowTotalPage = ref(1);
const pageIndex = ref(1);
const pageSize = ref(10);
const pageGroupSize = ref(0);
const currentPageSizeGroup = ref(1);

const confirmModalRef = ref(null);

// --- Computed properties ---
const rechargeBtnDisabled = computed(() => {
  if (rechargeMethod.value === 'blockchain') {
    const { coinType, amount, key, confirm, address } = blockchainForm;
    return !key || !coinType || !address || !amount || parseFloat(amount) <= 0 || !confirm;
  } else if (rechargeMethod.value === 'bank') {
    return !bankForm.amount || parseFloat(bankForm.amount) <= 0 || !file2.file;
  }
  return true;
});
const hasPreGroup = computed(() => currentPageSizeGroup.value > 1);
const hasNextGroup = computed(() => currentPageSizeGroup.value < Math.ceil(cashFlowTotalPage.value / pageGroupSize.value));

// --- Methods ---
const doDeposit = () => alert("儲值申請已送出 (示範)");
const doWithdraw = () => alert("提領申請已送出 (示範)");
const submitTransfer = () => {
    if (!mm_2nd_pwd.value) return alert('請輸入二級密碼');
    alert("轉點成功 (示範)");
    const modal = bootstrap.Modal.getInstance(confirmModalRef.value);
    if (modal) modal.hide();
};

const showConfirm = () => {
  if (!registPoint.value || isNaN(Number(registPoint.value)) || Number(registPoint.value) <= 0) {
    alert('請輸入正確的轉入點數數量');
    return;
  }
  if (confirmModalRef.value) {
    mm_2nd_pwd.value = '';
    const modal = new bootstrap.Modal(confirmModalRef.value);
    modal.show();
  }
};

const imgFileReader = (event, fileTarget) => {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
      fileTarget.file = file;
      fileTarget.base64 = e.target.result;
  };
  reader.readAsDataURL(file);
};

const getMemberBalance = () => {
    cashFlowData.value = getMockCashFlow(urlType.value === 'closing' ? 16 : pointType.value);
    cashFlowTotalPage.value = 1; // Mock total pages
};

const changePointType = () => {
  pageIndex.value = 1;
  getMemberBalance();
};

const isInCurrentPageGroup = (page) => {
  return page > (currentPageSizeGroup.value - 1) * pageGroupSize.value && page <= currentPageSizeGroup.value * pageGroupSize.value;
};

const changePage = (page) => {
  if (page === pageIndex.value || page < 1 || page > cashFlowTotalPage.value) return;
  pageIndex.value = page;
  getMemberBalance();
};

const autoPay = () => {
  nextTick(() => {
    isAuto.value = true;
    alert("請聯絡客服開啟自動續費功能");
  });
};

watch(() => route.query.type, (newType) => {
  urlType.value = newType || 'pay';
  pageIndex.value = 1;
  if (urlType.value === 'recharge') rechargeRecords.value = getMockRechargeRecords();
  if (urlType.value === 'detail' || urlType.value === 'closing') getMemberBalance();
}, { immediate: true });

watch(pointType, () => {
  if (urlType.value === 'detail' || urlType.value === 'closing') {
    pageIndex.value = 1;
    getMemberBalance();
  }
});

onMounted(() => {
  pageGroupSize.value = window.innerWidth > 992 ? 8 : 3;
  // Initial data is already set, or fetched by the watcher.
});

</script>

<style lang="scss" scoped>
@use '../assets/scss/_variables.scss' as *;

main {
  background: white;
}
.walletContainer {
  display: flex;
  padding: 60px 40px;
  align-items: start;
  @media #{$mobile} {
    display: block;
    padding: 20px 0;
  }
  .leftColumn {
    width: 320px;
    border: 3px solid #F8F2F2;
    background: white;
    border-radius: 0 50px 0 50px;
    padding-bottom: 35px;
    margin-right: 80px;
    @media #{$mobile} {
      width: 90%;
      margin-right: auto;
      margin-left: auto;
      border: none;
      padding-bottom: 20px;
    }
    .memberCard {
      background: transparent linear-gradient(180deg, #C2674A 0%, #B7553E 4%, #A83F2E 14%, #952219 46%, #880f0b 100%) 0% 0% no-repeat padding-box;
      border-radius: 0 50px 0 50px;
      padding: 24px 0;
      margin-bottom: 40px;
      @media #{$mobile} {
        margin-bottom: 20px;
      }
    }
    .memberId {
      text-align: center;
      padding-bottom: 12px;
      position: relative;
      margin-bottom: 30px;
      @media #{$mobile} {
        margin-bottom: 20px;
      }
      .memberNum {
        color: $secondary;
        font-size: 20px;
        @media #{$mobile} {
          font-size: 18px;
        }
      }
      &::before {
        display: block;
        width: 24px;
        height: 1px;
        background: $secondary;
        content: "";
        position: absolute;
        top: 100%;
        left: calc(50% - 12px);
      }
    }
    .balance {
      display: flex;
      justify-content: center;
      text-align: center;
      color: white;
      &>div {
        width: 100px;
      }
      .amount {
        font-size: 20px;
        @media #{$mobile} {
          font-size: 18px;
        }
      }
    }
    .walletNavs {
      width: 280px;
      margin: auto;
      @media #{$mobile} {
        width: 100%;
        display: flex;
        justify-content: space-between;
      }
      .nav {
        background: #fcfbfb;
        border-radius: 50px;
        color: $primary;
        text-align: center;
        padding: 10px 0;
        margin-bottom: 10px;
        display: block;
        @media #{$mobile} {
          border-radius: 4px;
          margin-bottom: 0px;
          width: 60px;
          height: 60px;
          justify-content: center;
          align-items: center;
          font-size: 14px;
          display: flex;
        }
        .text-en {
          color: #d4481c;
          @media #{$mobile} {
            display: none;
          }
        }
        &.active {
          background: $primary;
          color: white;
          .text-en {
            color: $secondary;
          }
        }
      }
    }
  }
  .walletBody {
    flex-grow: 1;
    @media #{$mobile} {
      width: 90%;
      margin: auto;
    }
    .memberCard {
      background: transparent linear-gradient(119deg, #C2674A 0%, #880F0B 100%) 0% 0% no-repeat padding-box;
      padding: 30px 20px;
      border-radius: 14px;
      margin-bottom: 24px;
      @media #{$mobile} {
        margin: auto auto  20px;
        padding: 20px;
      }
      .memberId {
        position: relative;
        padding-left: 100px;
        color: $secondary;
        font-size: 18px;
        margin-bottom: 40px;
        @media #{$mobile} {
          padding-left: 75px;
          margin-bottom: 20px;
        }
        .circle {
          position: absolute;
          width: 46px;
          height: 46px;
          border-radius: 50%;
          top: calc(50% - 23px);
          @media #{$mobile} {
            width: 30px;
            height: 30px;
            top: calc(50% - 15px);
          }
          &.circle1 {
            background: transparent linear-gradient(-15deg, #E6E5CE00 0%, #F8F2F2 100%) 0% 0% no-repeat padding-box;
            left: 0;
          }
          &.circle2 {
            background: transparent linear-gradient(115deg, #E6E5CE00 0%, #F8F2F2 100%) 0% 0% no-repeat padding-box;
            left: 32px;
            @media #{$mobile} {
              left: 22px;
            }
          }
        }
      }
      .memberWallet {
        padding: 20px 0;
        display: flex;
        margin-bottom: 10px;
        @media #{$mobile} {
          padding: 0;
        }
        .balance {
          font-size: 18px;
          color: #f8f2f2;
          width: 50%;
          padding: 0 6%;
          @media #{$mobile} {
            font-size: 12px;
            padding: 0 12px;
          }
          .amount {
            color: white;
            font-size: 30px;
            @media #{$mobile} {
              font-size: 14px;
            }
          }
          .tip {
            font-size: 12px;
            color: $secondary;
          }
          &:first-child {
            border-right: 1px solid $secondary;
          }
        }
      }
      .extra {
        padding: 16px 0;
        display: flex;
        flex-wrap: wrap;
        @media #{$mobile} {
          padding: 0;
        }
        .bonus {
          font-size: 16px;
          color: #f8f2f2;
          width: 50%;
          padding: 0 6%;
          @media #{$mobile} {
            font-size: 12px;
            padding: 0 12px;
          }
          .amount {
            color: white;
            font-size: 20px;
            @media #{$mobile} {
              font-size: 14px;
            }
          }
        }
      }
      input {
        &:focus {
          box-shadow: 0 0 0 0.25rem rgba(222,172,156,.25);
        }
        &:checked {
          background-color: #d4481c;
          border-color: #d4481c;
        }
      }
    }
    .memberInfo {
      background: $primary;
      border-radius: 14px;
      overflow: hidden;
      margin-bottom: 16px;
      .balanceInfo {
        background: #fcfbfb;
        padding: 20px;
        .bonusTitle {
          color: $primary;
          font-size: 18px;
          margin-bottom: 40px;
          @media #{$mobile} {
            margin-bottom: 16px;
          }
        }
        .bonusRow {
          display: flex;
          align-items: center;
          @media #{$mobile} {
            flex-wrap: wrap;
            flex-direction: column-reverse;
          }
          &>div {
            width: 50%;
            @media #{$mobile} {
              width: 100%;
            }
          }
        }
        .bonusContents {
          display: flex;
          padding-left: 30px;
          flex-wrap: wrap;
          @media #{$mobile} {
            padding: 0 20px;
          }
          .bonusContent {
            width: 40%;
            margin-bottom: 28px;
            color: $primary;
            line-height: 24px;
            position: relative;
            padding-left: 8px;
            @media #{$mobile} {
              width: 30%;
              font-size: 12px;
              margin-right: 3%;
            }
            .amount {
              font-size: 24px;
              font-weight: bold;
              font-size: 16px;
            }
            &::before {
              content: "";
              width: 3px;
              height: 80%;
              display: block;
              position: absolute;
              top: 50%;
              transform: translate(0, -50%);
              left: 0;
              border-radius: 4px;
              @media #{$mobile} {
                background: $secondary !important;
              }
            }
            &:nth-child(1)::before {
              background: $secondary;
            }
            &:nth-child(2)::before {
              background: #f5f5f5;
            }
            &:nth-child(3)::before {
              background: $primary;
            }
            &:nth-child(4)::before {
              background: #880f0b;
            }
            &:nth-child(5)::before {
              background: white;
            }
          }
        }
        #pie {
          width: 200px;
          height: 200px;
          background: #deac9c;
          border-radius: 50%;
          background-image: linear-gradient(to right, transparent 50%, #d4481c 0%);
          position: relative;
          margin: auto;
          @media #{$mobile} {
            margin-bottom: 20px;
          }
          .pieInner {
            margin-left: 50%;
            height: 100%;
            border-radius: 0 100% 100% 0 / 50%;
            transform-origin: left;
            background-color: inherit;
          }
          .circle {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: white;
            border-radius: 50%;
            width: 130px;
            height: 130px;
          }
        }
      }
      .buttons {
        display: flex;
        padding: 20px 0;
      }
      .leftButton {
        display: flex;
        flex-wrap: wrap;
        border-right: 1px solid $secondary;
        justify-content: center;
        align-items: center;
        width: 35%;
        @media #{$mobile} {
          width: 50%;
          border-right: 0;
        }
        .title {
          color: #f8f2f2;
          margin-bottom: 18px;
          width: 100%;
          text-align: center;
          @media #{$mobile} {
            font-size: 14px;
            margin-bottom: 12px;
          }
          .text-en {
            color: white;
            font-size: 30px;
            font-weight: bold;
            @media #{$mobile} {
              font-size: 16px;
            }
          }
        }
        .common-btn {
          width: 206px;
          height: 34px;
          max-width: 90%;
          @media #{$mobile} {
            font-size: 14px;
            width: 120px;
            height: 26px;
          }
        }
      }
      .rightButton {
        width: 65%;
        display: flex;
        justify-content: center;
        align-items: center;
        @media #{$mobile} {
          width: 50%;
          flex-wrap: wrap;
        }
        .common-btn {
          width: 230px;
          height: 63px;
          text-align: center;
          max-width: calc((100% - 16px) * .45);
          @media #{$mobile} {
            font-size: 14px;
            width: 120px;
            height: 26px;
            margin: auto;
            max-width: 180px;
            .text-en {
              display: none;
            }
          }
          &:first-child {
            margin-right: 16px;
            @media #{$mobile} {
              margin-right: auto;
              margin-bottom: 12px;
            }
          }
        }
      }
      .common-btn {
        border: 1px solid white;
        font-size: 18px;
        flex-wrap: wrap;
        &.active {
          color: $primary;
          background: white;
        }
      }
    }
  }
  form {
    background: #fcfbfb;
    border-radius: 14px;
    padding-bottom: 40px;
    .formTitle {
      font-size: 20px;
      color: $primary;
      padding: 30px;
      @media #{$mobile} {
        font-size: 16px;
        padding: 20px;
      }
    }
    .form-input-groups {
      display: flex;
      padding: 0 60px;
      align-items: center;
      @media #{$mobile} {
        flex-wrap: wrap;
        padding: 0 20px;
      }
      .custom-input-group {
        flex-grow: 1;
        margin-bottom: 16px;
      }
      .amount {
        width: 300px;
        min-width: 300px;
        margin-left: 40px;
        @media #{$mobile} {
          width: 100%;
          min-width: 100%;
          margin-left: 0;
          text-align: center;
          font-size: 14px;
        }
        &>div:first-child {
          margin-bottom: 16px;
          @media #{$mobile} {
            margin-bottom: 4px;
          }
        }
        .text-en {
          color: $primary;
          font-size: 25px;
          font-weight: bold;
          margin: 0 20px;
          @media #{$mobile} {
            font-size: 16px;
            margin: 0 8px;
          }
        }
      }
      label {
        width: 5em;
        min-width: 5em;
        margin-right: 12px;
        white-space: nowrap;
        font-size: 18px;
        text-align: right;
        margin-bottom: 16px;
        @media #{$mobile} {
          width: 100%;
          margin-right: 0;
          margin-bottom: 4px;
          text-align: left;
          font-size: 14px;
        }
      }
      .moneyInput {
        margin-bottom: 16px;
        position: relative;
        @media #{$mobile} {
          width: calc(100% - 107px);
        }
        input {
          padding-right: 80px;
          @media #{$mobile} {
            padding-right: 4px;;
          }
        }
        &::after {
          position: absolute;
          display: block;
          color: $secondary;
          border-left: 1px solid $secondary;
          padding: 0 20px;
          top: 50%;
          content: "TRX";
          right: 0;
          transform: translate(0, -50%);
          @media #{$mobile} {
            display: none;;
          }
        }
      }
      .shortInput {
        width: 100px;
        flex-grow: 0;
        @media #{$mobile} {
          width: 75px;
        }
      }
      .mediumInput {
        width: 254px;
        flex-grow: 0;
        @media #{$mobile} {
          width: 204px;
        }
      }
      .refreshBtn {
        width: 137px;
        height: 44px;
        display: flex;
        border-radius: 50px;
        background: #88c858;
        margin-bottom: 16px;
        margin-left: 20px;
        cursor: pointer;
        font-size: 18px;
        color: white;
        justify-content: center;
        align-items: center;
        @media #{$mobile} {
          width: 99px;
          margin-left: 8px;
          font-size: 14px;
          height: 35px;
        }
        i {
          margin-right: 8px;
          font-size: 22px;
          @media #{$mobile} {
            font-size: 16px;
          }
        }
      }
    }
    .withdraw-input-groups {
      display: flex;
      padding: 0 60px;
      justify-content: space-between;
      @media #{$mobile} {
        flex-wrap: wrap;
        padding: 0 20px;
      }
      .custom-input-group {
        width: 45%;
        @media #{$mobile} {
          width: 100%;
          margin-bottom: 16px;
        }
      }
      .balance {
        font-size: 14px;
        color: $primary;
        .amount {
          font-size: 16px;
        }
      }

    }
    .uploadLayout {
      display: flex;
      flex-wrap: wrap;
      .title {
        width: 100%;
        padding-left: 200px;
        margin-bottom: 20px;
        @media #{$mobile} {
          padding-left: 20px;
          font-size: 14px;
        }
        .tip {
          padding-left: 18px;
          color: $minor;
          font-size: 16px;
          @media #{$mobile} {
            font-size: 12px;
          }
        }
      }
      .custom-upload-group {
        margin-right: 20px;
        margin-bottom: 30px;
        @media #{$mobile} {
          margin: 0 0 30px 0;
          padding: 0 10px;
        }
        .name {
          text-align: center;
          margin-bottom: 8px;
          color: $gray;
          @media #{$mobile} {
            font-size: 12px;
            text-align: left;
          }
        }
        .uploadFrame {
          width: 300px;
          height: 190px;
          display: flex;
          justify-content: center;
          align-content: center;
          align-items: center;
          flex-wrap: wrap;
          text-align: center;
          background: #fcfbfb;
          border: 2px solid #f8f2f2;
          border-radius: 14px;
          position: relative;
          overflow: hidden;
        }
        .tip1 {
          width: 100%;
          font-size: 18px;
          @media #{$mobile} {
            display: none;
          }
        }
        .tip2 {
          width: 100%;
          font-size: 15px;
          color: $gray;
          margin: 8px 0;
          @media #{$mobile} {
            display: none;
          }
        }
        label.common-btn {
          background: white;
          border: 1px solid $minor;
          color: $minor;
          width: 164px;
          height: 36px;
          position: relative;
          z-index: 2;
          @media #{$mobile} {
            width: 120px;
            height: 28px;
            font-size: 14px;
          }
        }
        input {
          position: absolute;
          width: 100%;
          height: 100%;
          z-index: 1;
          top: 0;
          left: 0;
          opacity: 0;
        }
        .imgPreview {
          position: absolute;
          width: 100%;
          height: 100%;
          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }
      }
    }
    .form-select, .form-control {
      height: 44px;
      outline: 0;
      border: none;
      border-bottom: 1px solid $secondary;
      border-radius: 0;
      @media #{$mobile} {
        height: 35px;
        font-size: 14px;
      }
    }
    .common-btn {
      border: 0;
      flex-wrap: wrap;
      width: 280px;
      height: 63px;
      margin: 40px auto;
      text-align: center;
      font-size: 18px;
      @media #{$mobile} {
        width: 200px;
        height: 56px;
        font-size: 14px;
        margin: 20px auto;
      }
    }
    .divLine {
      height: 45px;
      background: $primary;
      @media #{$mobile} {
        height: 20px;
      }
    }
    .divline2 {
      height: 1px;
      background: $secondary;
      width: 160px;
      margin-top: 40px;
      margin-bottom: 30px;
      @media #{$mobile} {
        margin-top: 20px;
        margin-bottom: 20px;
      }
    }
    .checkGroups {
      padding: 40px;
      background: white;
      width: 96%;
      margin: auto;
      @media #{$mobile} {
        padding: 20px;
      }
      .custom-check-group {
        margin-bottom: 40px;
        font-size: 18px;
        display: flex;
        align-items: center;
        @media #{$mobile} {
          margin-bottom: 20px;
          font-size: 14px;
        }
        .form-check-input {
          width: 23px;
          height: 23px;
          border-color: $gray;
          border-radius: 0;
          margin-right: 40px;
          min-width: 23px;
          background: white;
          padding: 4px;
          @media #{$mobile} {
            width: 15px;
            height: 15px;
            margin-right: 10px;
            min-width: 15px;
            padding: 2px;
          }
          &:checked {
            background: $gray;
            background-clip: content-box;
          }
        }
        label {
          display: flex;
          justify-content: space-between;
          flex-grow: 1;
          align-items: center;
          .name {
            flex-grow: 1;
          }
          .text-en {
            color: $primary;
            width: 100px;
            min-width: 100px;
            @media #{$mobile} {
              width: 60px;
              min-width: 60px;
            }
          }
        }
      }
    }
    .qrcode-rows {
      display: flex;
      padding: 0 60px;
      margin-bottom: 40px;
      @media #{$mobile} {
        padding: 0 20px;
        margin-top: 16px;
        display: block;
      }
      .qrcode {
        width: 80px;
        font-size: 18px;
        margin-right: 12px;
        @media #{$mobile} {
          width: 100%;
          margin-right: 0;
          font-size: 14px;
          margin-bottom: 4px;
        }
      }
      .qrcodeImg {
        width: 220px;
        padding: 15px;
        background: white;
      }
    }
    .checkRow {
      padding: 0 60px;
      @media #{$mobile} {
        padding: 0 20px;
        font-size: 12px;
      }
      .form-check-input {
        border-color: #d4481c;
        &:checked {
          background-color: #d4481c;
          border-color: #d4481c;
        }
      }
    }
    .detailTable {
      .tableRow {
        display: flex;
        padding: 20px;
        flex-wrap: wrap;
        align-items: center;
        background: white;
        @media #{$mobile} {
          font-size: 14px;
          padding: 10px;
          margin: 0 10px 12px 10px;
        }
        .leftRow {
          display: flex;
          width: calc(100% - 240px);
          @media #{$mobile} {
            display: block;
            width: calc(100% - 100px);
          }
          .date {
            width: 150px;
            min-width: 150px;
            color: $gray;
            padding-left: 20px;
            @media #{$mobile} {
              padding-left: 0;
              font-size: 12px;
              margin-bottom: 4px;
            }
          }
          .content {
            flex-grow: 1;
          }
        }
        .rightRow {
          display: flex;
          width: 240px;
          @media #{$mobile} {
            display: block;
            width: 100px;
            text-align: right;
          }
          .type {
            width: 100px;
            min-width: 100px;
            text-align: center;
            color: $primary;
            @media #{$mobile} {
              font-size: 12px;
              margin-bottom: 4px;
              text-align: right;
            }
            &.transfer {
              color: #88c858;
            }
          }
          .amount {
            width: 100px;
            min-width: 100px;
            text-align: center;
            @media #{$mobile} {
              text-align: right;
            }
          }
          .toggleBtn {
            width: 20px;
            min-width: 20px;
            color: #707070;
            cursor: pointer;
            transform: rotate(0deg);
            transition: transform .3s ease;
            &.open {
              transform: rotate(180deg);
            }
            @media #{$mobile} {
              display: none;
            }
          }
        }
        .detail {
          display: none;
          width: 100%;
          @media #{$mobile} {
            display: block !important;
          }
          .detailRow {
            padding: 20px 16px;
            background: #fcfbfb;
            display: flex;
            margin: 20px 0;
            @media #{$mobile} {
              padding: 8px;
              display: block;
              margin-bottom: 8px;
              font-size: 12px;
            }
            .bank {
              margin-right: 30px;
              color: $gray;
            }
          }
        }
      }
    }
    .paginations {
      margin: auto;
      display: flex;
      color: $primary;
      justify-content: center;
      align-items: center;
      font-size: 15px;
      padding: 30px 0;
      &>div {
        cursor: pointer;
      }
      .page-prev, .page-next {
        font-size: 20px;
        &.disabled {
          color: #9f9494;
          cursor: unset;
        }
      }
      .page-prev {
        margin-right: 30px;
      }
      .page-ellipsis-prev {
        margin-right: 20px;
      }
      .page-next {
        margin-left: 30px;
      }
      .page-ellipsis-next {
        margin-left: 20px;
      }
      .page {
        margin: 0 5px;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        &.active {
          background: $primary;
          color: white;
        }
      }
    }
    .closingTitle {
      display: block;
      padding: 30px;
      @media #{$mobile} {
        display: flex;
        align-items: end;
        justify-content: space-between;
        padding: 20px;
      }
      .formTitle {
        padding: 0;
      }
      .tip {
        font-size: 12px;
        color: $gray;
        text-align: right;
        padding-right: 30px;
        @media #{$mobile} {
          padding-right: 0;
        }
      }

    }
    .closingTable {
      .tableRow {
        display: flex;
        align-items: center;
        padding: 20px 60px;
        font-size: 18px;
        background: white;
        margin: 0 8px;
        @media #{$mobile} {
          padding: 20px;
          font-size: 14px;
          margin: 0 10px 12px 10px;
        }
        .name {
          width: calc(100% - 100px);
          word-break: break-all;
          @media #{$mobile} {
            width: calc(100% - 80px);
          }
        }
        .amount {
          color: $minor;
          width: 100px;
          text-align: right;
          @media #{$mobile} {
            width: 80px;
          }
        }
      }
    }
  }
}
</style>
