<template>
  <div>
    <main>
      <!-- 快速登入 -->
      <div v-show="layoutType === 1" class="mainFrame loginFrame ">
        <div class="frameTitle">
          <div class="title-zh">快速登入</div>
          <div class="title-en text-en">LOGIN</div>
          <!-- <div class="close"><i class="bi bi-x"></i></div> -->
        </div>
        <div class="frameBody d-flex flex-wrap">
          <div class="loginLayout">
            <div class="text">會員登入</div>
            <form @submit.prevent="login" id="login" class="loginForm">
              <div class="login-input-group">
                <label for="account_login" class="form-label">帳號</label>
                <input v-model="loginForm.account" minlength="4" maxlength="20" required type="text" class="form-control" id="account_login">
              </div>

              <div class="login-input-group" style="position: relative">
                <label for="password_login" class="form-label">密碼</label>
                <input v-model="loginForm.pswd" minlength="4" maxlength="15" required :type="showPassword? 'text' : 'password'" class="form-control" id="password_login">
                <span class="input-eye" @click="showPassword = !showPassword">
                  <i class="bi" :class="[showPassword? 'bi-eye' : 'bi-eye-slash']"></i>
                 </span>
                <div @click="layoutType = 3" class="forget"><span>忘記密碼</span><i class="bi bi-question-circle"></i></div>
              </div>
              <div class="d-block align-items-end d-lg-flex">
                <div class="valid-group login-input-group">
                  <label for="valid_login" class="form-label">請輸入驗證碼</label>
                  <input v-model="loginForm.validCode" required type="text" class="form-control" id="valid_login" name="valid_login">
                </div>
                <div class="validCanvas"><canvas @click="drawCanvas" id="mycanvas" ref="myCanvasRef" width='160' height='40'></canvas></div>
              </div>

              <button class="submitBtn common-btn">
                <div class="btn-zh w-100">登　　入</div>
                <div class="btn-en w-100 text-en">LOGIN</div>
              </button>
            </form>
          </div>
          <div class="toRegist">
            <div class="toRegistTextZh">註冊會員</div>
            <div class="toRegistTextEn text-en">REGISTED MEMBER</div>
            <div class="submitBtn common-btn" @click="layoutType = 2">
              <div class="btn-zh w-100 text-center">註冊會員</div>
            </div>
          </div>
        </div>
      </div>
        
      <!-- 註冊 -->
      <div v-show="layoutType === 2" class="mainFrame registFrame">
        <div class="frameTitle">
          <div class="title-zh">註冊帳號</div>
          <div class="title-en text-en">REGISTER ACCOUNT</div>
          <div @click="layoutType = 1" class="close"><i class="bi bi-x"></i></div>
        </div>
        <div class="frameBody">
          <form @submit.prevent="regist" class="registForm" id="regist">
            <div class="customLabel">
              <div>
                <label for="account">帳　　號<span class="required">*</span></label>
                <div style="color: #a11f1a" class="text-left">(手機號碼)</div>
              </div>
              <div class="phone-group-input">
                <select v-model="registForm.areaCode" class="form-select" id="phone_code" required>
                  <option selected value="+886">台灣+886</option>
                </select>
                <div class="inputContainer"><input v-model="registForm.account" minlength="4" maxlength="25" id="account" name="account" type="text" required></div>
              </div>
              <div class="tip mt-0">台灣地區開頭不必填0</div>
            </div>
            <div class="customLabel">
              <label for="password">密　　碼<span class="required">*</span></label>
              <div class="inputContainer"><input v-model="registForm.pswd" minlength="4" maxlength="15" id="password" name="password" type="password" required></div>
              <div class="tip">
                密碼設定長度至少為8個字元的字串。<br>
                至少有兩個大小寫之英文字母，並混和數字。<br>
              </div>
            </div>
            <div class="customLabel">
              <label for="password_confirm">確認密碼<span class="required">*</span></label>
              <div class="inputContainer"><input v-model="registForm.pswd2" id="password_confirm" name="password_confirm" type="password" required></div>
            </div>
            <div class="customLabel">
              <label for="referral" class="ps-0 ps-lg-3">推薦人<span class="required">*</span></label>
              <div  class="inputContainer"><input id="referral" v-model="registForm.introducer" name="referral" type="text" required></div>
              <div class="tip mt-0">填寫完整電話號碼</div>
            </div>
            <div class="customLabel">
              <label for="referral" class="ps-0 ps-lg-3">安置碼<span class="required">*</span></label>
              <div  class="inputContainer"><input id="referral" v-model="registForm.invite" name="referral" type="text" required></div>
            </div>
            <div class="customLabel">
              <label for="password2">二級密碼<span class="required">*</span></label>
              <div class="inputContainer"><input v-model="registForm.mm_2nd_pwd" minlength="4" maxlength="15" id="password2" name="password2" type="password" required></div>
            </div>
            <div class="customLabel">
              <label for="mm_2nd_pwd2">確認密碼<span class="required">*</span></label>
              <div class="inputContainer"><input v-model="registForm.mm_2nd_pwd2" id="mm_2nd_pwd2" name="mm_2nd_pwd2" type="password" required></div>
            </div>
            <div class="form-check">
              <input class="form-check-input" v-model="registForm.confirm" type="checkbox" name="check_terms" id="check_terms" required>
              <label class="form-check-label" for="check_terms">
                本人已清楚了解並同意<span @click="showTerms" class="termsBtn" style="color: #d4481c;cursor:pointer">平安商會條款內容</span>
              </label>
            </div>
            <button class="submitBtn common-btn">
              <div class="btn-zh w-100">確認註冊</div>
              <div class="btn-en w-100 text-en">CONFIRM REGISTRATION</div>
            </button>
          </form>
        </div>
      </div>

      <!-- 忘記密碼 -->
      <div v-show="layoutType === 3" class="mainFrame forgetFrame">
        <div class="frameTitle">
          <div class="title-zh">忘記密碼</div>
          <div class="title-en text-en">FORGET THE PASSWORD</div>
          <div @click="layoutType = 1" class="close"><i class="bi bi-x"></i></div>
        </div>
        <div class="frameBody forgetBody">
          <div @click="layoutType = 1" class="return">
            <i class="bi bi-arrow-return-left"></i>
            <span>返回快速登入</span>
          </div>
          <form action="" method="POST" class="registForm" id="forgetPassword">
            <div class="customLabel">
              <label for="cellphone_forget">手機號碼</label>
              <div class="cellphoneInput">
                <input id="cellphone_forget" name="cellphone_forget" type="tel" required>
                <div class="phoneCheck">
                  <span class="checkIcon"><i class="bi bi-check-circle"></i></span>
                  <span class="d-none d-lg-inline">可使用。</span>
                </div>
              </div>
              <div class="tip">請正確輸入，下一步將會進行手機簡訊驗證。</div>
            </div>
            <div class="customLabel">
              <label for="message_forget">簡訊驗證</label>
              <div class="messageInput"><input id="message_forget" name="message_forget" type="text" required></div>
              <div class="sendMsgBtn common-btn">寄送簡訊驗證</div>
            </div>
            <div class="customLabel">
              <label for="password_forget">新密碼　</label>
              <div class="inputContainer"><input id="password_forget" name="password_forget" type="password" required></div>
              <div class="tip">
                密碼設定長度至少為8個字元的字串。<br>
                至少有兩個英文字母，並混和數字。<br>
                避免使用重複、過於簡單且易於猜測或與帳號相同的字母或數字(例如：aaa、abc、123...)。<br>
                避免使用他人容易取得之資料設為密碼(例如：英文名、生日或電話…等)
              </div>
            </div>
            <div class="customLabel mb-5 mb-lg-0">
              <label for="password_forget_confirm">再次確認<br class="d-none d-lg-block">新密碼</label>
              <div><input id="password_forget_confirm" name="password_forget_confirm" type="password" required></div>
            </div>
            <button class="submitBtn common-btn" type="submit">
              <div class="btn-zh w-100">確認重置密碼</div>
              <div class="btn-en w-100 text-en">CONFIRM RESET PASSWORD</div>
            </button>
          </form>
        </div>
      </div>

      <!-- 條款 -->
      <div v-show="layoutType === 4" class="mainFrame termsFrame">
        <div class="frameTitle">
          <div class="title-zh">平安商會條款內容</div>
          <div class="title-en text-en">Chamber of Commerce Terms</div>
          <div @click="layoutType = 2" class="close"><i class="bi bi-x"></i></div>
        </div>
        <div class="frameBody terms">
          <div @click="layoutType = 2" class="return">
            <i class="bi bi-arrow-return-left"></i>
            <span>返回註冊</span>
          </div>
          <div class="content">條款內容條款內容條款內容條款內容,條款內容條款內容,條款內容條款內容條款內容條款內容,條款內容條款內容,條款內容條款內容</div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, nextTick } from 'vue';
import { useRouter, useRoute } from 'vue-router'; // Import useRouter and useRoute

const router = useRouter();
const route = useRoute();

// Reactive state
const layoutType = ref(1); // 1登入 2註冊 3忘記密碼 4條款
const showPassword = ref(false);
const img = ref(null); // For canvas background image
const validCode = ref(""); // Generated CAPTCHA code
const canvasWidth = 160;
const canvasHeight = 40;
const sColor = ["#B22222", "#F9F900", "#82D900", "#FFAF60"]; // 干擾線顏色
const fColor = ["#804040", "#5A5AAD", "#408080", "#8F4586"]; // 文字顏色
const loading = ref(false);

const loginForm = reactive({
  account: "",
  pswd: "",
  validCode: ""
});

const registForm = reactive({
  account: "",
  pswd: "",
  pswd2: "",
  invite: "",
  mm_2nd_pwd: '',
  mm_2nd_pwd2: '',
  confirm: false,
  gender: "1",
  identify: "",
  address: "",
  email: "",
  areaCode: "+886",
  introducer: ''
});

const myCanvasRef = ref(null); // Define template ref for canvas

// Methods
const initRegistForm = () => {
  registForm.account = "";
  registForm.pswd = "";
  registForm.pswd2 = "";
  registForm.invite = "";
  registForm.mm_2nd_pwd = '';
  registForm.mm_2nd_pwd2 = '';
  registForm.confirm = false;
  registForm.gender = "1";
  registForm.identify = "";
  registForm.address = "";
  registForm.email = "";
  registForm.areaCode = "+886";
  registForm.introducer = '';
};

const showTerms = () => {
  layoutType.value = 4;
  nextTick(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
};

const randColor = () => {
  return Math.floor(Math.random() * sColor.length);
};

const lineX = () => {
  return Math.floor(Math.random() * canvasWidth);
};

const lineY = () => {
  return Math.floor(Math.random() * canvasHeight);
};

const drawCanvas = () => {
  const mycanvas = myCanvasRef.value;
  if (!mycanvas) return;
  const cxt = mycanvas.getContext('2d');
  const codes = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

  mycanvas.width = mycanvas.width;
  mycanvas.height = mycanvas.height;

  if (img.value) {
    cxt.drawImage(img.value, lineX(), lineY(), canvasWidth, canvasHeight, 0, 0, canvasWidth, canvasHeight);
  }

  for (let i = 0; i < 2; i++) {
    cxt.beginPath();
    cxt.strokeStyle = sColor[randColor()];
    cxt.moveTo(0, lineY());
    cxt.lineTo(canvasWidth, lineY());
    cxt.lineWidth = (Math.floor(Math.random() * (20 - 10 + 1)) + 10) / 10;
    cxt.stroke();
    cxt.closePath();
  }

  cxt.font = 'bold 40px Verdana';
  validCode.value = "";
  for (let i = 0; i < 4; i++) {
    const ind = Math.floor(Math.random() * codes.length);
    validCode.value += codes[ind];
    cxt.fillStyle = fColor[randColor()];
    cxt.fillText(validCode.value[i], 5 + (i * 38), 35);
  }
};

const login = () => {
  if (loading.value) return;
  const { validCode: enteredValidCode } = loginForm;
  if (validCode.value.toUpperCase() !== enteredValidCode.toUpperCase()) {
    alert("驗證碼輸入錯誤");
    drawCanvas();
    return;
  }
  
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
    alert("登入成功 (示範)");
    router.push('/');
  }, 500);
};

const regist = () => {
  if (loading.value) return;
  const { account, pswd, pswd2, invite, introducer, mm_2nd_pwd, mm_2nd_pwd2, confirm } = registForm;
  
  if (!account || !pswd || !pswd2 || !invite || !introducer || !mm_2nd_pwd || !mm_2nd_pwd2) {
      alert("請填寫所有必填欄位");
      return;
  }
    if (!/^\d+$/.test(account)) {
    alert("帳號格式錯誤，僅能為數字");
    return;
  }
  if (pswd !== pswd2) {
    alert("密碼輸入錯誤");
    return;
  }
  if (mm_2nd_pwd !== mm_2nd_pwd2) {
    alert("二級密碼輸入錯誤");
    return;
  }
  if (!confirm) {
      alert("請同意條款");
      return;
  }

  loading.value = true;
  setTimeout(() => {
      loading.value = false;
      alert("註冊成功 (示範)");
      initRegistForm();
      layoutType.value = 1;
  }, 500);
};

// Lifecycle hooks
initRegistForm();

onMounted(() => {
  const referee = route.query.referee;
  if (referee) {
    layoutType.value = 2;
    registForm.introducer = referee;
  }

  const canvasImg = new Image();
  canvasImg.src = '/images/canvas.jpg';
  canvasImg.onload = () => {
    img.value = canvasImg;
    drawCanvas();
  };
});
</script>

<style lang="scss" scoped>
@use '../assets/scss/_variables.scss' as *;

.mainFrame {
  width: 80%;
  min-width: 950px;
  margin: 5% auto;
  background: white;
  border-radius: 0 60px 0 60px;
  @media #{$mobile} {
    width: 90%;
    min-width: 90%;
    border-radius: 8px;
  }
}

.frameTitle {
  width: 100%;
  text-align: center;
  background: transparent linear-gradient(180deg, transparent 30%, #F8F2F2 100%) 0% 0% no-repeat padding-box;
  padding: 20px;
  border-bottom: 1px solid #e5c0b5;
  position: relative;
  @media #{$mobile} {
    padding: 8px;
  }
  .title-zh {
    font-size: 25px;
    color: $minor;
    font-weight: bold;
    @media #{$mobile} {
      font-size: 18px;
    }
  }
  .title-en {
    font-size: 12px;
    color: $secondary;
  }
  .close {
    position: absolute;
    font-size: 40px;
    color: $minor;
    top: 50%;
    right: 40px;
    transform: translate(0, -50%);
    cursor: pointer;
    @media #{$mobile} {
      right: 10px;
    }
  }
}

.frameBody {
  padding: 75px 0;
  position: relative;
  @media #{$mobile} {
    padding: 0 16px;
  }
  .return {
    position: absolute;
    display: flex;
    align-items: center;
    cursor: pointer;
    top: 20px;
    left: 20px;
    color: $minor;
    i {
      margin-right: 8px;
    }
  }
  .registForm {
    width: 85%;
    min-width: 920px;
    margin: auto;
    @media #{$mobile} {
      width: 100%;
      min-width: 100%;
      padding: 30px 0;
    }
  }
  .customLabel {
    display: flex;
    align-items: center;
    word-break: keep-all;
    margin-bottom: 20px;
    flex-wrap: wrap;
    label {
      margin-right: 12px;
      display: flex;
      color: $primary;
      @media #{$mobile} {
        margin-bottom: 8px;
        width: 100%;
        font-size: 14px;
      }
    }
    .required {
      color: $minor;
      margin-left: 16px;
      @media #{$mobile} {
        margin-left: 8px;
      }
    }
    input:not([type=radio]) {
      border: 1px solid $secondary;
      border-radius: 8px;
      height: 46px;
      width: 445px;
      outline: 0;
      padding-left: 1em;
      &:focus {
        box-shadow: 0 0 0 0.25rem rgba(222,172,156,.25);
      }
      @media #{$mobile} {
        width: 100%;
        height: 36px;
        font-size: 14px;
      }
    }
    .tip {
      width: 100%;
      color: $secondary;
      margin-top: 10px;
      padding-left: 6.5em;
      word-break: break-all;
      @media #{$mobile} {
        padding-left: 0;
        font-size: 12px;
      }
    }
    .phoneCheck {
      position: absolute;
      top: 50%;
      left: calc(100% + 20px);
      transform: translate(0, -50%);
      display: flex;
      align-items: center;
      @media #{$mobile} {
        left: auto;
        right: 4px;
      }
      .checkIcon {
        color: #88c858;
        margin-right: 8px;
        font-size: 32px;
        @media #{$mobile} {
          font-size: 26px;
        }
      }
    }
    .messageInput {
      @media #{$mobile} {
        width: calc(100% - 120px);
        input {
          border-radius: 8px 0 0 8px;
        }
      }
    }
    .sendMsgBtn {
      width: 180px;
      height: 46px;
      margin-left: 20px;
      @media #{$mobile} {
        width: 120px;
        margin-left: 0;
        border-radius: 0 8px 8px 0;
        height: 36px;
        font-size: 14px;
      }
    }
    .password-valid {
      height: 46px;
      margin-left: 20px;
      display: flex;
      padding-bottom: 4px;
      align-items: flex-end;
      @media #{$mobile} {
        margin-left: 0;
        height: 30px;
      }
      .levels {
        display: flex;
        align-items: flex-end;
        height: 100%;
        margin-right: 8px;
        @media #{$mobile} {
          padding-bottom: 2px;
        }
        .level {
          border: 1px solid #88c858;
          height: 7px;
          width: 27px;
          margin-right: 4px;
          &.valid {
            background: #88c858;
          }
        }
      }
      .msg {
        @media #{$mobile} {
          font-size: 12px;
        }
      }
    }
    .inputContainer {
      @media #{$mobile} {
        width: 100%;
      }
    }
    .phone-group-input {
      display: flex;
      select {
        width: 120px;
      }
      .inputContainer {
        width: 325px;
        input {
          width: 100%;
        }
        @media #{$mobile} {
          width: calc(100% - 120px);
        }
      }
    }
  }

  .cellphoneInput {
    position: relative;
    &::before {
      display: flex;
      content: "+886";
      width: 5em;
      justify-content: center;
      position: absolute;
      height: 80%;
      align-items: center;
      top: 50%;
      left: 0;
      transform: translate(0, -50%);
      border-right: 1px solid $secondary;
      @media #{$mobile} {
        width: 4em;
        font-size: 14px;
      }
    }
    input {
      padding-left: 6em !important;
      @media #{$mobile} {
        padding-left: 4.5em !important;
        padding-right: 40px !important;
      }
    }
  }
  .form-check {
    @media #{$mobile} {
      font-size: 12px;
      margin-bottom: 30px;
    }
    .form-check-input {
      border-color: #d4481c;
      &:focus {
        box-shadow: 0 0 0 0.25rem rgba(222,172,156,.25);
      }
      &:checked {
        background-color: #d4481c;
        border-color: #d4481c;
      }
    }
  }
  .submitBtn {
    outline: 0;
    border: none;
    width: 280px;
    height: 63px;
    margin: 40px auto;
    flex-wrap: wrap;
    @media #{$mobile} {
      width: 240px;
      height: 55px;
      margin: 10px auto;
    }
    .btn-zh {
      color: white;
      font-weight: bold;
      font-size: 18px;
      @media #{$mobile} {
        font-size: 14px;
      }
    }
    .btn-en {
      color: $secondary;
      font-size: 12px;
    }
  }
  .loginLayout {
    width: 50%;
    padding: 12px 5%;
    border-right: 1px solid #b8b8b8;
    @media #{$mobile} {
      width: 100%;
      border-right: none;
      border-bottom: 1px dashed #b8b8b8;
      padding: 30px 0;
    }
    .text {
      display: none;
      @media #{$mobile} {
        color: $primary;
        display: block;
        text-align: center;
        margin-bottom: 12px;
        font-size: 14px;
      }
    }
    .login-input-group {
      width: 100%;
      margin-bottom: 8px;
      @media #{$mobile} {
        margin-bottom: 16px;
      }
      label {
        color: $primary;
        text-align: center;
        width: 100%;
        @media #{$mobile} {
          text-align: left;
          font-size: 14px;
        }
      }
      input {
        border-radius: 25px;
        border: 1px solid $secondary;
        outline: 0;
        padding-left: 1em;
        height: 40px;
        &:focus {
          box-shadow: 0 0 0 0.25rem rgba(222,172,156,.25);
        }
        @media #{$mobile} {
          height: 36px;
        }
      }
      &.valid-group {
        width: 50%;
        @media #{$mobile} {
          width: 160px;
          margin-bottom: 8px;
        }
      }
      .input-eye {
        position: absolute;
        top: calc(50% + 4px);
        right: 12px;
        transform: translate(0, -50%);
        cursor: pointer;
      }
    }
    .forget {
      color: $primary;
      font-size: 12px;
      text-align: right;
      margin-top: 4px;
      span, i {
        cursor: pointer;
      }
      i {
        margin-left: 4px;
      }
    }
    .validCanvas {
      width: fit-content;
      margin-left: auto;
      margin-bottom: 8px;
      cursor: pointer;
      @media #{$mobile} {
        margin-bottom: 30px;
        margin-left: 0;
      }
    }
  }
  .toRegist {
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: center;
    flex-wrap: wrap;
    text-align: center;
    @media #{$mobile} {
      padding: 30px 0;
      width: 100%;
    }
    .toRegistTextZh {
      color: #880f0b;
      font-weight: bold;
      font-size: 40px;
      width: 100%;
      @media #{$mobile} {
        font-size: 16px;
        font-weight: normal;
      }

    }
    .toRegistTextEn {
      font-size: 13px;
      width: 100%;
      color: $secondary;
      @media #{$mobile} {
        display: none;
      }
    }
  }
  &.terms {
    padding: 75px 3em;
    @media #{$mobile} {
      padding: 75px 16px 40px 16px;
    }
  }
  &.forgetBody {
    @media #{$mobile} {
      padding: 40px 16px 40px 16px;
    }
  }
}
</style>
