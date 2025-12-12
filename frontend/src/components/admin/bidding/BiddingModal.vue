<template>
  <div class="modal fade" :class="{ 'show': modelValue }" @click.self="$emit('update:modelValue', false)" style="display: block;" v-if="modelValue">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ isEditing ? '編輯標會' : '新增標會' }}</h5>
          <button type="button" class="btn-close" @click="$emit('update:modelValue', false)"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="save">
            <!-- 成組序號 (Group Serial Number) - only for editing, and disabled -->
            <div class="mb-3" v-if="isEditing">
              <label for="bidding-serial" class="form-label">成組序號</label>
              <input type="text" class="form-control" id="bidding-serial" v-model="form.serial" disabled>
            </div>

            <!-- 標會種類 (Bidding Type) - disabled for editing -->
            <div class="mb-3">
              <label for="bidding-type" class="form-label">標會種類</label>
              <select class="form-select" id="bidding-type" v-model="form.type" :disabled="isEditing">
                <option>散會</option>
                <option>六會</option>
                <option>十二會</option>
                <option>二十四會</option>
              </select>
            </div>

            <!-- 得標人 (Winner) - only for editing, and disabled -->
            <div class="mb-3" v-if="isEditing">
              <label for="bidding-winner" class="form-label">得標人</label>
              <input type="text" class="form-control" id="bidding-winner" v-model="form.winner" disabled>
            </div>
             
            <!-- 標會狀態 (Bidding Status) - only for editing, editable -->
            <div class="mb-3" v-if="isEditing">
              <label for="bidding-status" class="form-label">標會狀態</label>
              <select class="form-select" id="bidding-status" v-model="form.status">
                <option>未成組</option>
                <option>已成組</option>
                <option>結束</option>
              </select>
            </div>

            <!-- 第一次開標時間 (First Bidding Time) - always present, editable -->
            <div class="mb-3">
              <label for="bidding-startTime" class="form-label">第一次開標時間</label>
              <input type="date" class="form-control" id="bidding-startTime" v-model="form.startTime">
            </div>

            <!-- 最後開標時間 (Last Bidding Time) - always present, editable -->
            <div class="mb-3">
              <label for="bidding-endTime" class="form-label">最後開標時間</label>
              <input type="date" class="form-control" id="bidding-endTime" v-model="form.endTime">
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="$emit('update:modelValue', false)">關閉</button>
          <button type="button" class="btn btn-primary" @click="save">儲存</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';

const props = defineProps({
  modelValue: Boolean,
  bidding: Object,
});

const emit = defineEmits(['update:modelValue', 'save']);

const form = ref({});

const isEditing = computed(() => !!(props.bidding && props.bidding.id));

watch(() => props.bidding, (newVal) => {
  if (newVal) {
    form.value = { ...newVal };
     if(form.value.startTime) form.value.startTime = form.value.startTime.split('T')[0];
     if(form.value.endTime) form.value.endTime = form.value.endTime.split('T')[0];
  } else {
    form.value = {
      serial: '自動生成', // Placeholder for auto-generated serial number
      type: '散會',
      winner: '', // Should be set during the add process, or be a placeholder
      status: '未成組', // Default status for new bidding
      startTime: '',
      endTime: ''
    };
  }
}, { immediate: true });


const save = () => {
  emit('save', { ...form.value });
};
</script>

<style scoped>
.modal.show {
  background-color: rgba(0, 0, 0, 0.5);
}
.form-label {
  text-align: left;
  width: 100%;
}
</style>
