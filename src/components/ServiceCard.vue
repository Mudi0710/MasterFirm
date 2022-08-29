<template>
  <q-card class="row bg-info justify-center content-start no-shadow" style="border:none;border-radius: 0;"
    :service="service">
    <!-- <div class="bg-info shadow-10" style="width: auto;"> -->
      <!-- 服務 Icon -->
      <q-card-section class="row justify-center">
        <div class="row justify-center content-center"
          style="border: 5px solid #D09139; border-radius: 50%; width: 120px; height: 120px;">
          <q-icon :name="service.icon" size="90px" color="accent" />
        </div>
      </q-card-section>
      <!-- 服務名稱 -->
      <q-card-section class="col-12 row justify-center no-padding">
        <div class="text-h5 text-accent text-center q-py-xs">{{ service.name }} </div>
      </q-card-section>
      <!-- 諮詢時間 -->
      <q-card-section class="col-12 row justify-center no-padding">
        <div class="text-h6 q-py-xs"> {{ service.time }}&nbsp;分鐘 </div>
      </q-card-section>
      <!-- 諮詢費用 -->
      <q-card-section class="col-12 row justify-center no-padding">
        <div class="text-h6 text-warning text-right">
          NT$ {{ service.price.toLocaleString() }}
        </div>
      </q-card-section>
      <!-- 訂購按鈕 -->
      <q-card-actions class="col-12 row justify-center no-padding">
        <q-btn square flat class="text-h6 bg-secondary text-dark q-mt-sm" :to="'/service/' + service._id" style="width: 100%;">服務詳情</q-btn>
      </q-card-actions>
    <!-- </div> -->
  </q-card>
</template>

<script setup>
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'

const user = useUserStore()
const { isLogin } = storeToRefs(user)
const { addCart } = user

// 從外面傳 service 的資料進來
// 2022/07/12 3:22:54
// const props = defineProps(['service'])
defineProps(['service'])
</script>
