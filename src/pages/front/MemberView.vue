<template>
  <q-page id="CartView" class="column">
    <div id="myheader" class="row justify-end items-center" style="width: 100%;">
      <q-list class='text-h5 text-secondary mobile-none'>
        <q-btn v-if='isLogin' round dense flat icon='fa-solid fa-address-card' to='/member' class="q-mx-xs">
          <q-tooltip transition-show='fade' transition-hide='fade' :offset='[0, 0]'>
            會員資料
          </q-tooltip>
        </q-btn>
        <q-btn v-if='isLogin' round dense flat icon='fa-regular fa-calendar-days' to='/booking' class="q-mx-xs">
          <q-tooltip transition-show='fade' transition-hide='fade' :offset='[0, 0]'>
            預約查詢
          </q-tooltip>
        </q-btn>
        <q-btn v-if='isLogin' round dense flat icon='fa-solid fa-receipt' to='/order' class="q-mx-xs">
          <q-tooltip transition-show='fade' transition-hide='fade' :offset='[0, 0]'>
            訂單查詢
          </q-tooltip>
        </q-btn>
        <q-btn v-if='isLogin' round dense flat icon='fa-solid fa-cart-shopping' to='/cart' class="q-mx-xs">
          <q-tooltip transition-show='fade' transition-hide='fade' :offset='[0, 0]'>
            購物車
          </q-tooltip>
          <q-badge v-if='cart.length > 0' floating color='red' rounded>{{ cart.length }}</q-badge>
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

    <div id="mycontent" class="col-12 row content-start">
      <!-- 頁面 Title -->
      <div class="col-12 text-h3 text-secondary q-mb-md" style="width: 100%;">會員資料</div>

      <!-- 麵包屑 -->
      <div class="col-12 q-my-md" style="width: 100%;">
        <q-breadcrumbs>
          <q-breadcrumbs-el label="首頁" icon="fa-solid fa-house" to="/" />
          <q-breadcrumbs-el label="會員資料" icon="fa-solid fa-address-card" />
        </q-breadcrumbs>
      </div>

      <!-- 會員資料區 -->
      <div class="col-12 q-pa-md bg" style="width: 100%;">
        <!-- 外框 -->
        <div class="row justify-center q-py-lg-lg" style="border: 1px solid #CAB69E;">
          <!-- 真正放內容的區塊，避免外框異常 -->
          <div class="row justify-start" style="width: 100%;">
            <!-- 會員圖片區 -->
            <div class="col-12 col-xl-5 row justify-center q-pa-lg bg">
              <!-- 再包一個 -->
              <q-avatar class="bg-info row justify-center" style="width: 20rem; height: 20rem;">
                <img src="https://joeschmoe.io/api/v1/admin" alt="">
              </q-avatar>
            </div>
            <!-- 會員資料區 -->
            <div class="col-12 col-xl-7 row justify-start content-around text-accent text-h6 text-lg-h5 q-pa-lg bg">
              <div class="col-12 row">
                <div class="col-3 col-xl-2">帳號：</div>
                <div class="col col-xl-10 text-secondary">{{ member.account }}</div>
              </div>
              <div class="col-12 col-xl-6 row">
                <div class="col-3 col-xl-4">姓名：</div>
                <div class="col col-xl-8 text-secondary">{{ member.name }}</div>
              </div>
              <div class="col-12 col-xl-6 row">
                <div class="col-3 col-xl-4">生日：</div>
                <div class="col col-xl-8 text-secondary">{{ new Date(member.birthday).toLocaleDateString() }}</div>
              </div>
              <div class="col-12 col-xl-6 row">
                <div class="col-3 col-xl-4">性別：</div>
                <div class="col col-xl-8 text-secondary">{{ (member.gender === 1) ? '男' : '女' }}</div>
              </div>
              <div class="col-12 col-xl-6 row">
                <div class="col-3 col-xl-4">電話：</div>
                <div class="col col-xl-8 text-secondary">{{ member.tel }}</div>
              </div>
              <div class="col-12 row">
                <div class="col-3 col-xl-2">信箱：</div>
                <div class="col col-xl-10 text-secondary">{{ member.email }}</div>
              </div>
              <div class="col-12 row">
                <div class="col-3 col-xl-2">住址：</div>
                <div class="col col-xl-10 text-secondary">{{ member.address }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </q-page>
</template>

<script setup>
import { reactive, computed } from 'vue'
import { apiAuth } from '@/boot/axios'
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'
import Swal from 'sweetalert2'

const user = useUserStore()
const { logout } = user
const { isLogin, isAdmin, cart } = storeToRefs(user)

// 定義 members 空陣列，讓後台抓資料推進去
const member = reactive({
  _id: '',
  account: '',
  name: '',
  gender: '',
  birthday: '',
  tel: '',
  email: '',
  address: '',
  avatar: ''
})

// 抓後台該會員的資料
const init = async () => {
  try {
    const { data } = await apiAuth.get('/users/')
    member._id = data.result._id
    member.account = data.result.account
    member.name = data.result.name
    member.gender = data.result.gender
    member.birthday = data.result.birthday
    member.tel = data.result.tel
    member.email = data.result.email
    member.address = data.result.address
    member.avatar = data.result.avatar
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: '失敗',
      text: error.isAxiosError ? error.response.data.message : error.message
    })
  }
}
init()
</script>
