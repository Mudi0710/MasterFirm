<template>
  <q-card bordered class="my-card bg-info shadow-10" style="border-radius: 0;" :product="product">
    <!-- 商品圖片 -->
    <!-- <router-link :to="'/product/' + product._id"> -->
    <q-responsive :ratio="3 / 2">
      <q-img :src="product.image[0]" />
    </q-responsive>
    <!-- 商品名稱 -->
    <q-card-section>
      <!-- .ellipsis => text 過多時以...代替 -->
      <div class="col text-h5 text-accent ellipsis"> {{ product.name }} </div>
    </q-card-section>
    <!-- 商品描述 -->
    <q-card-section class="q-pt-none">
      <div class="text-subtitle1 text-dark ellipsis-3-lines">
        {{ product.description }}
      </div>
    </q-card-section>
    <!-- 商品金額 -->
    <q-card-section class="q-pt-none">
      <div class="text-h6 text-warning text-right">
        NT$ {{ product.price.toLocaleString() }}
      </div>
    </q-card-section>
    <!-- </router-link> -->
    <q-separator />
    <!-- 訂購按鈕 -->
    <q-card-actions class="row justify-between">
      <q-btn square flat class="col-4 text-caption bg-secondary text-dark q-my-sm" label="商品詳情"
        :to="'/product/' + product._id" />
      <q-btn v-if='isLogin' square flat outline class="col-7 bg-dark text-caption text-secondary q-my-sm"
        icon='fa-solid fa-cart-shopping' label="加入購物車" @click='addCart({ product: product._id, quantity: 1 })' />
      <q-btn v-if='!isLogin' square flat outline class="col-7 bg-dark text-caption text-secondary q-my-sm"
        label="登入以使用購物車" to='login' />
    </q-card-actions>
  </q-card>
</template>

<script setup>
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'

const user = useUserStore()
const { isLogin } = storeToRefs(user)
const { addCart } = user

// 從外面傳 product 的資料進來
// 2022/07/12 3:22:54
// const props = defineProps(['product'])
defineProps(['product'])
</script>
