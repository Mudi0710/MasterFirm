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
      <div class="col-12 text-h4 text-xl-h3 text-secondary q-mb-md q-pl-md" style="width: 100%;">聯絡我們</div>

      <!-- 麵包屑 -->
      <div class="col-12 q-mt-md q-pl-lg" style="width: 100%;">
        <q-breadcrumbs>
          <q-breadcrumbs-el label="首頁" icon="fa-solid fa-house" to="/" />
          <q-breadcrumbs-el label="聯絡我們" icon="fa-solid fa-map-location-dot" />
        </q-breadcrumbs>
      </div>

      <div class="col-12 q-mt-md q-mb-xl q-px-md" style="width: 100%;">
        <!-- 聯絡資訊區 -->
        <div class="row q-mt-md">
          <!-- 左邊聯絡地圖 -->
          <div class="col-12 col-xl-6">
            <!-- <pre class="text-secondary">{{ localmap }}</pre> -->
            <q-responsive :ratio="1 / 1">
              <iframe :src="localmap.length > 0 ? localmap[0]?.localmap : ''"
                style="width: 100%; height: 100%;"></iframe>
            </q-responsive>
          </div>
          <!-- 右邊聯絡資訊 -->
          <div class="col-12 col-xl-6 row content-between">
            <!-- <pre class="text-secondary">{{ connections }}</pre> -->
            <div class="col-12 row justify-start" style="width: 100%;">
              <div v-for="connection in connections" :key="connection"
                class="col-12 row justify-start q-ml-xs q-ml-xl-lg q-my-xl-md" style="width: 100%;">
                <!-- icon -->
                <q-icon :name="connection.icon" color="secondary" class="col-1" style="font-size: calc(20px + 0.8vw);">
                </q-icon>
                <!-- 各項聯絡資訊 -->
                <div class="col-11 text-lg-h6 text-secondary text-wrap q-pl-md"
                  style="font-size: calc(16px + 4 * ((100vw - 360px) / 840)); line-height: 3rem;">
                  {{ connection.content }}</div>
              </div>
            </div>
            <div class="col-12 row justify-center q-mt-lg q-mt-xl-xs">
              <q-btn square flat class="bg-secondary text-dark" label="立即預約諮詢" to='/appointment'
                style="font-size: calc(16px + 4 * ((100vw - 360px) / 840));" />
            </div>
          </div>
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

// 聯絡地圖陣列
const localmap = reactive([])
const connections = reactive([])

// 抓資料庫聯絡地圖的資料
const initLocalmap = async () => {
  try {
    const { data } = await api.get('/localmap/')
    localmap.push(...data.result)
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: '失敗',
      text: error.isAxiosError ? error.response.data.message : error.message
    })
  }
}
initLocalmap()
// 抓資料庫聯絡地圖的資料
const initConnection = async () => {
  try {
    const { data } = await api.get('/connections/')
    connections.push(...data.result)
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: '失敗',
      text: error.isAxiosError ? error.response.data.message : error.message
    })
  }
}
initConnection()
</script>
