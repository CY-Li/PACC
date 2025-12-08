<template>
  <div class="d-flex justify-content-center flex-wrap">
    <div class="dragItem" :class="{'active': !item.hideChildren}" @click="item.hideChildren = !item.hideChildren">
      <div class="w-100 mb-1" >F{{ item.mm_level }} {{item.mm_name}}({{item.mw_subscripts_count}})</div>
      <div class="w-100" >{{item.mm_account}}({{item.total_qty}})</div>
      <div v-if="isRoot" class="star"><i class="bi bi-star-fill"></i></div>
    </div>
    <div class="dragItems children" v-if="item.items && item.items.length" v-show="!item.hideChildren">
      <GroupChip v-for="child in item.items" :item="child" :key="child.mm_account" :isRoot="false" />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
  isRoot: {
    type: Boolean,
    default: false,
  }
});

// The 'key' prop is not directly used in the component's logic but for Vue's list rendering.
// So no need to define it here in defineProps if not directly accessed as props.

// Methods from original group-chip component (if any) go here.
// For this component, it's mostly about rendering and toggling children.
</script>

<style lang="scss" scoped>
/* GroupChip specific styles, potentially from account.scss if applicable */
.dragItem {
  // Styles for the individual chip
  cursor: pointer;
  border: 1px solid #ccc;
  padding: 5px;
  margin: 5px;
  text-align: center;
  border-radius: 5px;
  background-color: #f9f9f9;
}
.dragItem.active {
  // Styles for active state
  border-color: #007bff;
}
.dragItems.children {
  // Styles for children container
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
}
.star {
  color: gold;
  position: absolute; // Adjust positioning as needed
  top: 5px;
  right: 5px;
}
</style>
