<template>
  <div class="login-container">
    <img src="/images/logo.png" alt="Logo" class="logo" />
    <div class="login-card">
      <Transition name="fade" mode="out-in">
        <!-- Step 1: Username and Password -->
        <div v-if="step === 1" class="login-step">
          <div class="card-header">
            <!-- <img src="/images/logo.png" alt="Logo" class="logo" /> -->
            <h1 class="title">管理後台登入</h1>
          </div>
          <form @submit.prevent="handleCredentialSubmit" class="login-form">
            <div class="form-field">
              <label for="username">帳號</label>
              <div class="input-wrapper">
                <input ref="usernameInput" type="text" id="username" v-model="credentials.username" required />
              </div>
            </div>
            <div class="form-field">
              <label for="password">密碼</label>
              <div class="input-wrapper">
                <input :type="showPassword ? 'text' : 'password'" id="password" v-model="credentials.password" required />
                <i class="bi eye-icon" :class="showPassword ? 'bi-eye-slash-fill' : 'bi-eye-fill'" @click="showPassword = !showPassword"></i>
              </div>
            </div>
            <div class="error-message-container">
              <div v-if="errorMsg" class="error-message">{{ errorMsg }}</div>
            </div>
            <button type="submit" class="submit-btn" :disabled="loading">
              <span v-if="!loading">下一步</span>
              <div v-else class="spinner"></div>
            </button>
          </form>
        </div>

        <!-- Step 2: Google Authenticator -->
        <div v-else-if="step === 2" class="login-step">
          <div class="card-header">
             <!-- <img src="/images/logo.png" alt="Logo" class="logo" /> -->
            <h2 class="title">兩步驟驗證</h2>
            <p class="subtitle">請輸入您 Google Authenticator 應用程式中的 6 位數驗證碼</p>
          </div>
          <form @submit.prevent="handleOtpSubmit" class="login-form">
             <div class="form-field">
              <label>驗證碼</label>
              <div class="otp-input-group" @paste="handleOtpPaste">
                <input
                  v-for="i in 6"
                  :key="i"
                  :ref="el => otpInputs[i-1] = el"
                  v-model="otp[i-1]"
                  type="text"
                  class="otp-input"
                  maxlength="1"
                  pattern="[0-9]"
                  required
                  @input="handleOtpInput($event, i-1)"
                  @keydown="handleOtpKeydown($event, i-1)"
                />
              </div>
            </div>
            <div class="error-message-container">
              <div v-if="errorMsg" class="error-message">{{ errorMsg }}</div>
            </div>
            <button type="submit" class="submit-btn" :disabled="loading">
              <span v-if="!loading">驗證並登入</span>
              <div v-else class="spinner"></div>
            </button>
            <button type="button" class="back-btn" @click="goBack" :disabled="loading">返回</button>
          </form>
        </div>
      </Transition>
    </div>
     <footer class="page-footer">
      <p>&copy;2026 Designed by 鈦敏科技</p>
    </footer>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, nextTick } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const step = ref(1);
const errorMsg = ref('');
const loading = ref(false);

// --- Step 1: Credentials ---
const credentials = reactive({
  username: '',
  password: '',
});
const showPassword = ref(false);
const usernameInput = ref(null);

const handleCredentialSubmit = async () => {
  errorMsg.value = '';
  loading.value = true;
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API call

  if (credentials.username === 'admin' && credentials.password === 'password') {
    step.value = 2;
    await nextTick();
    otpInputs.value[0]?.focus();
  } else {
    errorMsg.value = '帳號或密碼錯誤';
    usernameInput.value?.focus();
  }
  loading.value = false;
};

// --- Step 2: OTP ---
const otp = ref(Array(6).fill(''));
const otpInputs = ref([]);

const handleOtpInput = (e, index) => {
  const value = e.target.value;
  if (value && index < 5) {
    otpInputs.value[index + 1]?.focus();
  }
};

const handleOtpKeydown = (e, index) => {
  if (e.key === 'Backspace' && !otp.value[index] && index > 0) {
    otpInputs.value[index - 1]?.focus();
  }
};

const handleOtpPaste = (e) => {
  e.preventDefault();
  const pastedData = e.clipboardData.getData('text').slice(0, 6);
  if (/^\d{6}$/.test(pastedData)) {
    pastedData.split('').forEach((char, index) => {
      otp.value[index] = char;
    });
    otpInputs.value[5]?.focus();
  }
};

const handleOtpSubmit = async () => {
  errorMsg.value = '';
  loading.value = true;
  const fullOtp = otp.value.join('');
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API call
  
  if (fullOtp === '123456') {
    router.push('/admin');
  } else {
    errorMsg.value = '驗證碼錯誤或已過期';
    otp.value = Array(6).fill('');
    otpInputs.value[0]?.focus();
  }
  loading.value = false;
};

// --- General ---
const goBack = () => {
  step.value = 1;
  errorMsg.value = '';
  otp.value = Array(6).fill('');
};

onMounted(() => {
  usernameInput.value?.focus();
});
</script>

<style scoped>
/* --- Mobile First Base Styles --- */
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  width: 100%;
  background-color: #f5f7fa;
  padding: 20px;
  box-sizing: border-box;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
}

.login-card {
  width: 100%;
  max-width: 420px;
  background: #ffffff;
  padding: 40px 32px;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
  box-sizing: border-box;
  overflow: hidden;
}

.card-header {
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* Changed to flex-start */
  margin-bottom: 40px;
}

.logo {
  max-width: 180px;
  margin-bottom: 24px;
  align-self: center; /* Ensure logo remains centered */
}

.title {
  font-size: 26px;
  color: #303133;
  font-weight: 700;
  margin: 0;
  width: 100%; /* Ensure it takes full width */
}

.subtitle {
  margin-top: 12px;
  font-size: 15px;
  color: #909399;
  line-height: 1.6;
  text-align: left; /* Changed to left */
  width: 100%; /* Ensure it takes full width */
}

.login-form {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.form-field {
  margin-bottom: 20px;
}

.form-field label {
  display: block;
  margin-bottom: 8px;
  color: #606266;
  font-size: 14px;
  font-weight: 600;
  text-align: left;
}

.input-wrapper {
  position: relative;
}

.input-wrapper input,
.otp-input {
  width: 100%;
  height: 50px;
  padding: 0 18px;
  border: 1px solid #dcdfe6;
  border-radius: 8px;
  font-size: 16px;
  color: #303133;
  transition: border-color 0.2s, box-shadow 0.2s;
  box-sizing: border-box;
  line-height: 1;
}

#password {
  padding-right: 45px;
}

.input-wrapper input:focus,
.otp-input:focus {
  outline: none;
  border-color: #a11f1a; /* Adjusted to Bootstrap primary color */
  box-shadow: 0 0 0 3px rgba(161, 31, 26, 0.15); /* Adjusted shadow color */
}

.eye-icon {
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #909399;
  cursor: pointer;
}

.otp-input-group {
  display: flex;
  justify-content: space-between;
  gap: 12px;
}

.otp-input {
  height: 56px;
  text-align: center;
  font-size: 22px;
  padding: 0;
}

.error-message-container {
  min-height: 32px;
  margin-bottom: 16px;
}

.error-message {
  color: #c0392b;
  background-color: rgba(192, 57, 43, 0.08);
  border-radius: 6px;
  padding: 8px 12px;
  font-size: 14px;
  text-align: center;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.submit-btn {
  width: 100%;
  height: 50px;
  background-color: #a11f1a; /* Adjusted to Bootstrap primary color */
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 18px; /* Consistent horizontal padding */
  margin-top: 24px;
}

.submit-btn:hover:not(:disabled) {
  background-color: #8e1c18; /* Darker shade of Bootstrap primary color */
}

.submit-btn:disabled {
  background-color: #bdc3c7;
  cursor: not-allowed;
}

.spinner {
  width: 22px;
  height: 22px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: #fff;
  animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.back-btn {
  width: 100%;
  height: 50px;
  padding: 0 18px; /* Consistent horizontal padding */
  background-color: transparent;
  color: #606266;
  border: none;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  margin-top: 12px;
  transition: background-color 0.2s;
}

.back-btn:hover:not(:disabled) {
  background-color: #f0f2f5;
}

.back-btn:disabled {
  color: #bdc3c7;
  cursor: not-allowed;
}

.page-footer {
  margin-top: 40px; /* Adjusted margin */
  color: #909399;
  font-size: 13px;
  text-align: center;
}

/* Vue Transition styles */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* --- RWD for Desktop --- */
@media (min-width: 768px) {
  .login-container {
    padding: 60px; /* Increased breathing room on desktop */
  }
  .login-card {
    padding: 48px;
  }
  .title {
    font-size: 28px;
  }
}
</style>
