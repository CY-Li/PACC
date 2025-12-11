<template>
  <div class="modal fade" ref="modalRef" tabindex="-1" aria-labelledby="announcementModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="announcementModalLabel">{{ formTitle }}</h5>
          <button type="button" class="btn-close" @click="hide" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="handleSubmit">
            <div class="mb-3">
              <label for="announcementTitle" class="form-label">標題</label>
              <input type="text" class="form-control" id="announcementTitle" v-model="editableAnnouncement.title" required>
            </div>
            <div class="mb-3">
              <label for="announcementContent" class="form-label">內容</label>
              <textarea class="form-control" id="announcementContent" rows="5" v-model="editableAnnouncement.content"></textarea>
            </div>
            <div class="mb-3">
              <label for="announcementStatus" class="form-label">狀態</label>
              <select class="form-select" id="announcementStatus" v-model="editableAnnouncement.status">
                <option value="草稿">草稿</option>
                <option value="發佈中">發佈中</option>
                <option value="已封存">已封存</option>
              </select>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="hide">取消</button>
          <button type="button" class="btn btn-primary" @click="handleSubmit">儲存</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed, nextTick } from 'vue';
import { Modal } from 'bootstrap';

const props = defineProps({
  modelValue: { // For v-model binding
    type: Boolean,
    default: false,
  },
  announcement: { // Announcement data to edit
    type: Object,
    default: null,
  }
});

const emit = defineEmits(['update:modelValue', 'save']);

const modalRef = ref(null);
let modalInstance = null;

const editableAnnouncement = ref({});

const formTitle = computed(() => props.announcement ? '編輯公告' : '新增公告');

onMounted(() => {
  if (modalRef.value) {
    modalInstance = new Modal(modalRef.value);
  }
});

watch(() => props.modelValue, (show) => {
  if (show) {
    // Reset/populate form when modal is shown
    editableAnnouncement.value = props.announcement 
      ? { ...props.announcement } // Edit mode
      : { title: '', content: '', status: '草稿' }; // Add mode
    
    modalInstance?.show();
  } else {
    modalInstance?.hide();
  }
});

// Sync modal hide state with v-model
onMounted(() => {
    modalRef.value.addEventListener('hidden.bs.modal', () => {
        emit('update:modelValue', false);
    });
})

const hide = () => {
  emit('update:modelValue', false);
};

const handleSubmit = () => {
  // In a real app, you would add validation here
  const newAnnouncement = {
      ...editableAnnouncement.value,
      date: new Date().toISOString().split('T')[0], // Set current date
  };
  emit('save', newAnnouncement);
  hide();
};

// Expose hide method to parent
defineExpose({ hide });
</script>

<style lang="scss" scoped>
.form-label {
  text-align: left;
  width: 100%;
}
</style>
