<template>
  <div class="login-page-wrapper">
    <main>
      
      <div v-show="layoutType === 1" class="mainFrame loginFrame ">
        <div class="frameBody">
          <div class="social-login-section">
            <!-- 快速登入 -->
            <div class="frameTitle custom-title">
              <div class="title-zh">快速登入</div>
              <div class="title-en text-en">LOGIN</div>
            </div>
            <button class="line-login-btn" @click="handleLineLogin">
              <i class="bi bi-line"></i>
              <span>使用 LINE 帳號繼續</span>
            </button>
            <p class="social-login-title">推薦使用 LINE 快速登入/註冊</p>
          </div>

          <div class="divider">
            <span class="divider-text">或</span>
          </div>

          <div class="traditional-login-section">
            <a href="javascript:;" @click="showTraditionalLogin = !showTraditionalLogin" class="traditional-login-toggle">
              使用帳號密碼登入
              <i class="bi" :class="showTraditionalLogin ? 'bi-chevron-up' : 'bi-chevron-down'"></i>
            </a>

                        <div v-show="showTraditionalLogin" class="loginLayout-full-width">
                          <div class="text">會員登入</div>
                          <form @submit.prevent="login" id="login" class="loginForm">
                            <div class="login-input-group">
                              <label for="account_login" class="form-label" style="text-align: left;">帳號</label>
                              <input v-model="loginForm.account" minlength="4" maxlength="20" required type="text" class="form-control" id="account_login">
                            </div>
            
                            <div class="login-input-group" style="position: relative">
                              <label for="password_login" class="form-label" style="text-align: left;">密碼</label>
                              <input v-model="loginForm.pswd" minlength="4" maxlength="15" required :type="showPassword? 'text' : 'password'" class="form-control" id="password_login">
                              <span class="input-eye" @click="showPassword = !showPassword">
                                <i class="bi" :class="[showPassword? 'bi-eye' : 'bi-eye-slash']"></i>
                              </span>
                              <div @click="layoutType = 3" class="forget"><span>忘記密碼</span><i class="bi bi-question-circle"></i></div>
                            </div>
                            <div class="captcha-container">
                              <div class="valid-group login-input-group">
                                <label for="valid_login" class="form-label" style="text-align: left;">請輸入驗證碼</label>
                                <input v-model="loginForm.validCode" required type="text" class="form-control" id="valid_login" name="valid_login">
                              </div>
                              <div class="validCanvas"><canvas @click="drawCanvas" id="mycanvas" ref="myCanvasRef" width='160' height='40'></canvas></div>
                            </div>
            
                            <button class="submitBtn common-btn">
                              <div class="btn-zh w-100">登　　入</div>
                            </button>
                            <div class="secondary-register-link">
                              還沒有帳號嗎？<a href="javascript:;" @click="layoutType = 2">註冊會員</a>
                            </div>
                          </form>
                        </div>          </div>
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
            <div class="customLabel" style="text-align: left;">
              <div>
                <label for="account">帳號(手機號碼)<span class="required">*</span></label>
              </div>
              <div class="phone-group-input">
                <select v-model="registForm.areaCode" class="form-select" id="phone_code" required>
                  <option selected value="+886">台灣+886</option>
                </select>
                <div class="inputContainer"><input v-model="registForm.account" minlength="4" maxlength="25" id="account" name="account" type="text" required></div>
              </div>
              <div class="tip mt-0">台灣地區開頭不必填0</div>
            </div>
            <div class="customLabel" style="text-align: left;">
              <label for="password">密碼<span class="required">*</span></label>
              <div class="inputContainer"><input v-model="registForm.pswd" minlength="4" maxlength="15" id="password" name="password" type="password" required></div>
              <div class="tip">
                密碼設定長度至少為8個字元的字串。<br>
                至少有兩個大小寫之英文字母，並混和數字。<br>
              </div>
            </div>
            <div class="customLabel" style="text-align: left;">
              <label for="password_confirm">確認密碼<span class="required">*</span></label>
              <div class="inputContainer"><input v-model="registForm.pswd2" id="password_confirm" name="password_confirm" type="password" required></div>
            </div>
            <div class="customLabel" style="text-align: left;">
              <label for="referral">推薦人<span class="required">*</span></label>
              <div  class="inputContainer"><input id="referral" v-model="registForm.introducer" name="referral" type="text" required></div>
              <div class="tip mt-0">填寫完整電話號碼</div>
            </div>
            <div class="customLabel" style="text-align: left;">
              <label for="referral">安置碼<span class="required">*</span></label>
              <div  class="inputContainer"><input id="referral" v-model="registForm.invite" name="referral" type="text" required></div>
            </div>
            <div class="customLabel" style="text-align: left;">
              <label for="password2">二級密碼<span class="required">*</span></label>
              <div class="inputContainer"><input v-model="registForm.mm_2nd_pwd" minlength="4" maxlength="15" id="password2" name="password2" type="password" required></div>
            </div>
            <div class="customLabel" style="text-align: left;">
              <label for="mm_2nd_pwd2">確認密碼<span class="required">*</span></label>
              <div class="inputContainer"><input v-model="registForm.mm_2nd_pwd2" id="mm_2nd_pwd2" name="mm_2nd_pwd2" type="password" required></div>
            </div>
            <div class="form-check" style="text-align: left;">
              <input class="form-check-input" v-model="registForm.confirm" type="checkbox" name="check_terms" id="check_terms" required>
              <label class="form-check-label" for="check_terms">
                本人已清楚了解並同意<span @click="showTerms" class="termsBtn" style="color: #d4481c;cursor:pointer">平安商會條款內容</span>
              </label>
            </div>
            <button class="submitBtn common-btn">
              <div class="btn-zh w-100">確認註冊</div>
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

const showTraditionalLogin = ref(false);

const handleLineLogin = () => {
  // 後續步驟：
  // 1. 從後端獲取 LINE 登入 URL。
  // 2. 將用戶重定向到該 URL。
  alert("準備串接 LINE 登入...");
};

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

.login-page-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f8f9fa;
  padding: 20px 0;
}

.mainFrame {
  width: 90%;
  max-width: 800px;
  min-width: 500px;
  margin: 20px;
  background: white;
  border-radius: 24px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  flex-shrink: 0;

  @media #{$mobile} {
    width: 300px !important;
    min-width: 300px !important;
  }
}

.custom-title {
  margin-bottom: 20px;
}

.frameTitle {
  text-align: center;
  padding: 30px 30px 20px 30px;
  position: relative;

  @media #{$mobile} {
    padding: 24px 24px 16px 24px;
  }

  .title-zh {
    font-size: 28px;
    color: $primary;
    font-weight: bold;
    @media #{$mobile} {
      font-size: 22px;
    }
  }

  .title-en {
    font-size: 14px;
    color: $secondary;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .close {
    position: absolute;
    font-size: 32px;
    color: $secondary;
    top: 20px;
    right: 20px;
    cursor: pointer;
    transition: color 0.3s;
    &:hover {
      color: $primary;
    }
    @media #{$mobile} {
      font-size: 28px;
      top: 15px;
      right: 15px;
    }
  }
}

.frameBody {
  padding: 10px 50px 40px 50px;
  position: relative;
  @media #{$mobile} {
    padding: 10px 24px 30px 24px;
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

  .registForm, .loginForm {
    width: 100%;
    margin: auto;
  }

  .customLabel {
    display: flex;
    flex-direction: column;
    margin-bottom: 24px;

    label {
      color: $primary;
      font-weight: 500;
      margin-bottom: 8px;
    }

    .required {
      color: $minor;
      margin-left: 4px;
    }

    input:not([type=radio]), select {
      border: 1px solid #ddd;
      border-radius: 8px;
      height: 48px;
      width: 100%;
      outline: 0;
      padding: 0 1em;
      transition: box-shadow 0.2s;
      background-color: #fdfdfd;

      &:focus {
        box-shadow: 0 0 0 3px rgba(222,172,156,.25);
        border-color: $secondary;
      }
    }
    
    .tip {
      width: 100%;
      color: $secondary;
      margin-top: 8px;
      font-size: 13px;
      line-height: 1.5;
    }

    .phone-group-input {
      display: flex;
      select {
        width: 120px;
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
        border-right: 0;
      }
      .inputContainer {
        width: calc(100% - 120px);
        input {
          border-top-left-radius: 0;
          border-bottom-left-radius: 0;
        }
      }
    }
  }
}

.submitBtn {
  outline: 0;
  border: none;
  width: 100%;
  height: 55px;
  margin: 20px auto 0 auto;
  @media #{$mobile} {
    height: 50px;
  }
  .btn-zh {
    color: white;
    font-weight: bold;
    font-size: 16px;
  }
  .btn-en {
    color: $secondary;
    font-size: 12px;
  }
}

.loginLayout-full-width {
    width: 100%;
    padding: 15px 0;

    .text {
      display: none; // No longer needed
    }
}

.login-input-group {
  margin-bottom: 20px;
  label {
    display: block;
    color: $primary;
    margin-bottom: 8px;
  }
  input {
    width: 100%;
    border-radius: 8px;
    border: 1px solid #ddd;
    outline: 0;
    padding: 0 1em;
    height: 48px;
    transition: box-shadow 0.2s;
     &:focus {
      box-shadow: 0 0 0 3px rgba(222,172,156,.25);
      border-color: $secondary;
    }
  }

      &.valid-group {

        width: calc(100% - 180px);

        @media #{$mobile} {

          width: 100%;

          margin-bottom: 15px;

        }

      }

      .input-eye {

        position: absolute;

        top: 50%;

        right: 12px;

        transform: translateY(-50%);

        cursor: pointer;

        color: #aaa;

      }

    }

    

    .forget {

      color: $primary;

      font-size: 13px;

      text-align: right;

      margin-top: 8px;

      span, i {

        cursor: pointer;

        &:hover {

          color: $minor;

        }

      }

      i {

        margin-left: 4px;

      }

    }

    

    .captcha-container {

      display: flex;

      justify-content: space-between;

      align-items: center;

    

      @media #{$mobile} {

        flex-direction: column;

      }

    }

    

    .validCanvas {

      width: 160px;

      height: 48px;

      cursor: pointer;

      border-radius: 8px;

      overflow: hidden;

      canvas {

        width: 100%;

        height: 100%;

      }

    }

.secondary-register-link {
  margin-top: 25px;
  text-align: center;
  font-size: 14px;
  color: $primary;
  a {
    color: $minor;
    text-decoration: none;
    font-weight: 500;
    cursor: pointer;
    margin-left: 5px;
    &:hover {
      text-decoration: underline;
    }
  }
}

.social-login-section {
  text-align: center;
  padding: 10px 0 20px 0;
  .social-login-title {
    color: $primary;
    font-size: 16px;
    margin-bottom: 16px;
  }

  .line-login-btn {
    background-color: #06C755;
    color: white;
    border: none;
    border-radius: 12px;
    padding: 12px 24px;
    font-size: 18px;
    font-weight: 500;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: 350px;
    transition: background-color 0.3s;
    &:hover {
      background-color: #05a545;
    }
    i {
      font-size: 24px;
      margin-right: 12px;
    }
  }
}

.divider {
  display: flex;
  align-items: center;
  text-align: center;
  color: #ccc;
  margin: 15px 0 25px 0;
  &::before, &::after {
    content: '';
    flex: 1;
    border-bottom: 1px solid #eee;
  }
  .divider-text {
    padding: 0 1em;
    font-size: 12px;
  }
}

.traditional-login-section {
  text-align: center;
  .traditional-login-toggle {
    color: $primary;
    text-decoration: none;
    font-size: 15px;
    cursor: pointer;
    &:hover {
      color: $minor;
    }
  }
  .loginLayout-full-width {
    margin-top: 25px;
  }
}

// Forget & Terms specific styles
.forgetBody, .terms {
  .return {
    margin-bottom: 20px;
  }
}

.form-check {
  margin: 20px 0;
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

.cellphoneInput {
  position: relative;
  input {
    padding-left: 6em !important;
  }
  &::before {
    content: "+886";
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    display: flex;
    align-items: center;
    padding: 0 1em;
    border-right: 1px solid #ddd;
    color: $secondary;
  }
}

.messageInput {
  width: calc(100% - 150px);
  display: inline-block;
  input {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
}
.sendMsgBtn {
  width: 140px;
  height: 48px;
  margin-left: -5px;
  border-radius: 0 8px 8px 0;
  display: inline-block;
}

</style>
