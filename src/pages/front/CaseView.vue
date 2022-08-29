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
      <div class="col-12 text-h4 text-xl-h3 text-secondary q-mb-md q-pl-md" style="width: 100%;">靈學知識</div>

      <!-- 麵包屑 -->
      <div class="col-12 q-mt-md q-pl-lg" style="width: 100%;">
        <q-breadcrumbs class="text-wrap">
          <q-breadcrumbs-el label="首頁" icon="fa-solid fa-house" to="/" />
          <q-breadcrumbs-el label="專欄文章" icon="fa-brands fa-readme" to="/cases" />
          <q-breadcrumbs-el label="案例分享" icon="fa-solid fa-people-group" to="/cases" />
          <q-breadcrumbs-el :label="cases.title" icon="fa-regular fa-newspaper" style="display: inline-block;" />
        </q-breadcrumbs>
      </div>

      <!-- 最新消息內容區 -->
      <div class="col-12 row justify-start q-mt-lg q-mb-xl q-pl-lg" style="width: 100%;">
        <!-- 標題區 -->
        <div class="col-12 row">
          <div class="col-auto row q-mt-md q-mr-lg">
            <div class="bg-accent" style="width: 10px;height: 70px;"></div>
          </div>
          <div class="col">
            <!-- 文章日期 -->
            <div class="text-secondary text-subtitle1 spacing-h6 q-my-sm">{{ new
              Date(cases.date).toLocaleString()
              }}
            </div>
            <!-- 文章標題 -->
            <div class="text-accent text-h6 text-xl-h5 spacing-h7 q-mt-md q-pr-lg text-wrap">{{ cases.title }}
            </div>
          </div>
        </div>
        <!-- 內文區 -->
        <div class="q-mt-lg" style="height: auto;">
          <!-- 文章內容 -->
          <p v-html="cases.content" class="col-12 col-xl-6 text-xl-h6 text-secondary text-justify q-mt-lg q-pr-lg">
          </p>
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
const { logout } = user
const { isLogin, isAdmin, cart } = storeToRefs(user)

// 輪播圖
const slide = ref(1)
const autoplay = ref(true)

// 定義單一案例分享模型
const cases = reactive({
  _id: '',
  title: '',
  content: '',
  date: '',
  image: []
})

// 抓後台單一商品的資料
const init = async () => {
  try {
    const { data } = await api.get('/cases/' + route.params.id)
    cases._id = data.result._id
    cases.title = data.result.title
    cases.content = data.result.content
    cases.date = data.result.date
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: '失敗',
      text: '取得案例分享失敗'
    })
    // 丟回上一頁
    router.go(-1)
  }
}
init()
</script>
