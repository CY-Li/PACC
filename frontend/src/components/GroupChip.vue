<script setup>
defineProps(['item', 'key'])
</script>

<template>
  <div class="d-flex justify-content-center flex-wrap">
    <div class="dragItem" :class="{'active': !item.hideChildren}" @click="item.hideChildren = !item.hideChildren">
      <div class="w-100 mb-1" >F{{ item.mm_level }} {{item.mm_name}}({{item.mw_subscripts_count}})</div>
      <div class="w-100" >{{item.mm_account}}({{item.total_qty}})</div>
      <div v-if="key === 0" class="star"><i class="bi bi-star-fill"></i></div>
    </div>
    <div class="dragItems children" v-if="item.items && item.items.length" v-show="!item.hideChildren">
      <group-chip v-for="child in item.items" :item="child" :key="child.mm_account" />
    </div>
  </div>
</template>