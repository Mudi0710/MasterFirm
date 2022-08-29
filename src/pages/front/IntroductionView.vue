<template>
  <q-page>
    <div id="myheader" class="row justify-end items-center" style="width: 100%;">
      <q-list class='text-h5 text-secondary mobile-none'>
        <q-btn v-if='isLogin' round dense flat icon='fa-solid fa-address-card' to='/member' class="q-mx-xs">
          <q-tooltip transition-show='fade' transition-hide='fade' :offset='[0, 0]'>
            會員資料
          </q-tooltip>
        </q-btn>
        <!-- <q-btn v-if='isLogin' round dense flat icon='fa-regular fa-calendar-days' to='/booking' class="q-mx-xs">
          <q-tooltip transition-show='fade' transition-hide='fade' :offset='[0, 0]'>
            預約查詢
          </q-tooltip>
        </q-btn> -->
        <q-btn v-if='isLogin' round dense flat icon='fa-solid fa-receipt' to='/order' class="q-mx-xs">
          <q-tooltip transition-show='fade' transition-hide='fade' :offset='[0, 0]'>
            訂單查詢
          </q-tooltip>
        </q-btn>
        <q-btn v-if='isLogin' round dense flat icon='fa-solid fa-cart-shopping' to='/cart' class="q-mx-xs">
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
        <q-btn v-if='!isLogin' round dense flat icon='fa-solid fa-user-plus' to='/register' class="q-mx-xs">
          <q-tooltip transition-show='fade' transition-hide='fade' :offset='[0, 0]'>
            註冊
          </q-tooltip>
        </q-btn>
        <q-btn v-if='!isLogin' round dense flat icon='fa-solid fa-right-to-bracket' to='/login' class="q-ml-xs q-mr-sm">
          <q-tooltip transition-show='fade' transition-hide='fade' :offset='[0, 0]'>
            登入
          </q-tooltip>
        </q-btn>
        <q-btn v-if='isLogin' round dense flat icon='fa-solid fa-right-from-bracket' @click='logout'
          class="q-ml-xl q-mr-md">
          <q-tooltip transition-show='fade' transition-hide='fade' :offset='[0, 0]'>
            登出
          </q-tooltip>
        </q-btn>
      </q-list>
    </div>

    <div id="mycontent" class="col row justify-start">

      <!-- 頁面 Title -->
      <div class="col-12 text-h4 text-xl-h3 text-secondary q-mb-md q-pl-md" style="width: 100%;">本所簡介</div>

      <!-- 麵包屑 -->
      <div class="col-12 q-mt-md q-pl-lg" style="width: 100%;">
        <q-breadcrumbs>
          <q-breadcrumbs-el label="首頁" icon="fa-solid fa-house" to="/" />
          <q-breadcrumbs-el label="本所簡介" icon="fa-solid fa-building-columns" />
        </q-breadcrumbs>
      </div>

      <div id="introduction-content" class="col-12 row q-mt-md q-mb-lg" style="width: 100%;">
        <!-- 本所簡介區 -->

        <!-- <pre class="text-secondary">{{ introduction[0].image }}</pre> -->
        <!-- 右邊文字 -->
        <div class="myorder col-12 col-xl-7 q-pa-md row justify-start content-start">
          <div class="col-12 text-h5 text-xl-h4 spacing-h4 text-secondary q-my-sm">{{ introduction.length > 0 ? introduction[0]?.title : '目前沒有簡介標題' }}</div>
          <div v-html="introduction.length > 0 ? introduction[0]?.content : '目前沒有簡介內容'"
            class="col-12 text-xl-h6 spacing-h6 line-height-h6 text-secondary text-justify q-my-xl q-pr-xl-lg"></div>
        </div>
        <!-- 左邊圖片 -->
        <div id="introduction-img" class="myorder col-12 col-xl-5 q-pa-md" style="height: auto;">
          <q-responsive :ratio="4 / 5">
            <q-carousel animated infinite swipeable transition-prev="slide-right" transition-next="slide-left"
              :autoplay="autoplay" arrows navigation v-model="slide" @mouseenter="autoplay = false"
              @mouseleave="autoplay = true">
              <q-carousel-slide v-for="(image, idx) in introduction.length > 0 ? introduction[0]?.image : '目前沒有簡介圖片' " :key="image" :name="idx + 1"
                :img-src="image" />
            </q-carousel>
          </q-responsive>
        </div>
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

const user = useUserStore()
const { logout } = user
const { isLogin, isAdmin, cart } = storeToRefs(user)

const slide = ref(1)
const autoplay = ref(true)

// 簡介文章陣列
const introduction = reactive([])

// 抓資料庫本所簡介的資料
const initIntroduction = async () => {
  try {
    const { data } = await api.get('/introduction')
    introduction.push(...data.result)
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: '失敗',
      text: error.isAxiosError ? error.response.data.message : error.message
    })
  }
}
initIntroduction()
</script>
