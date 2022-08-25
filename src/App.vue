<template>
  <router-view />
</template>

<script setup>
// 儲存狀態並持久化儲存 step 3
import { useUserStore } from '@/stores/user'

useUserStore().getUser()

// 原本的
// import { defineComponent } from 'vue'
// export default defineComponent({
//   name: 'App'
// })

</script>
