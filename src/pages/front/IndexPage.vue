<template>
  <q-page id="indexPage" class="row">
    <div id="myheader" class="row justify-end items-center" style="width: 100%;">
      <q-list class='text-h5 text-secondary mobile-none'>
        <q-btn v-if='isLogin' round dense flat icon='fa-solid fa-address-card' to='member' class="q-mx-xs">
          <q-tooltip transition-show='fade' transition-hide='fade' :offset='[0, 0]'>
            會員資料
          </q-tooltip>
        </q-btn>
        <q-btn v-if='isLogin' round dense flat icon='fa-regular fa-calendar-days' to='booking' class="q-mx-xs">
          <q-tooltip transition-show='fade' transition-hide='fade' :offset='[0, 0]'>
            預約查詢
          </q-tooltip>
        </q-btn>
        <q-btn v-if='isLogin' round dense flat icon='fa-solid fa-receipt' to='order' class="q-mx-xs">
          <q-tooltip transition-show='fade' transition-hide='fade' :offset='[0, 0]'>
            訂單查詢
          </q-tooltip>
        </q-btn>
        <q-btn v-if='isLogin' round dense flat icon='fa-solid fa-cart-shopping' to='cart' class="q-mx-xs">
          <q-tooltip transition-show='fade' transition-hide='fade' :offset='[0, 0]'>
            購物車
          </q-tooltip>
          <q-badge v-if='cart > 0' floating color='red' rounded>{{ cart }}</q-badge>
        </q-btn>
        <q-btn v-if='isLogin && isAdmin' round dense flat icon='fa-solid fa-user-gear' to='/admin' class="q-mx-xs">
          <q-tooltip transition-show='fade' transition-hide='fade' :offset='[0, 0]'>
            管理後台
          </q-tooltip>
        </q-btn>
        <q-btn v-if='!isLogin' round dense flat icon='fa-solid fa-user-plus' to='register' class="q-mx-xs">
          <q-tooltip transition-show='fade' transition-hide='fade' :offset='[0, 0]'>
            註冊
          </q-tooltip>
        </q-btn>
        <q-btn v-if='!isLogin' round dense flat icon='fa-solid fa-right-to-bracket' to='login' class="q-ml-xs q-mr-lg">
          <q-tooltip transition-show='fade' transition-hide='fade' :offset='[0, 0]'>
            登入
          </q-tooltip>
        </q-btn>
        <q-btn v-if='isLogin' round dense flat icon='fa-solid fa-right-from-bracket' @click='logout'
          class="q-ml-xl q-mr-lg">
          <q-tooltip transition-show='fade' transition-hide='fade' :offset='[0, 0]'>
            登出
          </q-tooltip>
        </q-btn>
      </q-list>
    </div>

    <div id="mycontent" class="row content-start" style="width: 100%;">
      <!-- 宣傳文字區 -->
      <div class="col-12 col-xl-7 q-pa-md column justify-between">
        <div class="col-auto q-mt-lg-xl q-pt-lg-xl q-mb-lg-lg">
          <!-- 主標題 -->
          <div class="col-auto text-h4 text-xl-h3 spacing-h6 text-secondary">{{ slogan.length > 0 ? slogan[0]?.title :
              ''
          }}</div>
          <!-- 副標題 -->
          <div class="col-auto text-h6 text-xl-h5 spacing-h5 text-secondary q-my-lg q-pr-xl-lg text-right">{{
              slogan.length > 0 ? slogan[0]?.subtitle : ''
          }}</div>
        </div>
        <!-- 內文 -->
        <div class="col-auto text-xl-h6 spacing-h6 text-secondary text-justify items-center q-pr-xl-lg line-height">{{
            slogan.length > 0 ? slogan[0]?.content : ''
        }}</div>
      </div>
      <!-- 輪播圖 -->
      <div id="indexpage-img" class="col-12 col-xl-5 q-pa-md q-pr-xl-lg">
        <q-carousel animated infinite swipeable transition-prev="slide-right" transition-next="slide-left"
          :autoplay="autoplay" arrows navigation v-model="slide" @mouseenter="autoplay = false"
          @mouseleave="autoplay = true">
          <q-carousel-slide v-for="(image, idx) in slogan.length > 0 ? slogan[0]?.image : ''" :key="image" :name="idx + 1" :img-src="image" />
          <!-- <q-carousel-slide :name="1" img-src="https://cdn.quasar.dev/img/mountains.jpg" />
          <q-carousel-slide :name="2" img-src="https://cdn.quasar.dev/img/parallax1.jpg" />
          <q-carousel-slide :name="3" img-src="https://cdn.quasar.dev/img/parallax2.jpg" />
          <q-carousel-slide :name="4" img-src="https://cdn.quasar.dev/img/quasar.jpg" /> -->
        </q-carousel>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { api } from '@/boot/axios'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/user'
import Swal from 'sweetalert2'

const slide = ref(1)
const autoplay = ref(true)

const user = useUserStore()
const { logout } = user
const { isLogin, isAdmin, cart } = storeToRefs(user)

// 簡介文章陣列
const slogan = reactive([])

// 抓資料庫本所簡介的資料
const initSlogan = async () => {
  try {
    const { data } = await api.get('/slogan/')
    slogan.push(...data.result)
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: '失敗',
      text: error.isAxiosError ? error.response.data.message : error.message
    })
  }
}
initSlogan()
</script>
