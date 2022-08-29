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
      <div class="col-12 text-h4 text-xl-h3 text-secondary q-mb-md q-pl-md" style="width: 100%;">服務項目</div>

      <!-- 麵包屑 -->
      <div class="col-12 q-mt-md q-pl-lg" style="width: 100%;">
        <q-breadcrumbs>
          <q-breadcrumbs-el label="首頁" icon="fa-solid fa-house" to="/" />
          <q-breadcrumbs-el label="服務項目" icon="fa-solid fa-hand-holding-heart" to="/services" />
          <q-breadcrumbs-el :label="service.name" :icon="service.icon" />
        </q-breadcrumbs>
      </div>

      <!-- 服務項目內容區 -->
      <div class="col-12 row justify-start content-center bg-secondary shadow-white q-mt-lg q-mb-lg q-pb-md"
        style="width: 100%;">

        <!-- 輪播圖 -->
        <div id="ServiceView-img" class="col-12 q-pa-md">
          <q-responsive :ratio="3 / 2">
            <q-carousel animated infinite swipeable v-model="slide" thumbnails :autoplay="autoplay"
              @mouseenter="autoplay = false" @mouseleave="autoplay = true" arrows ransition-prev="slide-right"
              transition-next="slide-left">
              <q-carousel-slide v-for="(image, idx) in service.image" :key="image" :name="idx + 1" :img-src="image" />
            </q-carousel>
          </q-responsive>
        </div>

        <!-- 服務項目資訊 -->
        <div id="ServiceView-content" class="col-12 q-px-md q-py-md row wrap justify-start content-between q-pr-lg-md">

          <div class="col-12 row wrap justify-start content-start q-pr-md">
            <!-- 諮詢項目 -->
            <div class="col-12 text-h4 spacing-h6 text-xl-h3 text-primary q-mb-lg">{{ service.name }}</div>
            <!-- 諮詢時間 -->
            <div class="col-12 text-body2 spacing-h6 text-accent text-justify items-center q-mb-md">
              <span class="bg-primary q-pa-xs">{{ service.time }}&nbsp;分鐘&nbsp;&frasl;&nbsp;人</span>
            </div>

            <!-- 服務描述 -->
            <div v-html="service.description"
              class="col-auto text-xl-h6 spacing-h6 text-grey-8 text-justify items-center q-pt-md q-mb-lg">
            </div>
          </div>

          <div class="col-auto row justify-end" style="width: 100%;">
            <!-- 諮詢費用 -->
            <div class="col-auto text-h6 text-xl-h4 spacing-h6 text-warning text-right q-mb-lg">NT$ {{ service.price.toLocaleString() }} </div>
            <!-- 服務項目訂購 -->
            <div class="col-auto row justify-end" style="width: 100%;height: 40px;">
              <q-btn square flat class="col-auto bg-dark text-body1 text-secondary" label="立即預約諮詢" to='/appointment' />
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { api } from '@/boot/axios'
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'
import Swal from 'sweetalert2'

const route = useRoute()
const router = useRouter()
const user = useUserStore()

// 輪播圖設定
const slide = ref(1)
const autoplay = ref(true)

const { logout } = user
// 擋未登入、管理者，購物車紅點
const { isLogin, isAdmin, cart } = storeToRefs(user)

// 定義單一服務項目模型
const service = reactive({
  _id: '',
  name: '',
  description: '',
  inventory: false,
  sell: false,
  price: 0,
  image: ''
})

// 抓後台單一服務項目的資料
const init = async () => {
  try {
    const { data } = await api.get('/services/' + route.params.id)
    service._id = data.result._id
    service.name = data.result.name
    service.description = data.result.description
    service.sell = data.result.sell
    service.price = data.result.price
    service.time = data.result.time
    service.icon = data.result.icon
    service.image = data.result.image
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: '失敗',
      text: '取得服務項目資料失敗'
    })
    // 丟回上一頁
    router.go(-1)
  }
}
init()

</script>
