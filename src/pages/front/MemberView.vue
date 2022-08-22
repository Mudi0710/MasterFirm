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
      <div class="col-12 q-pa-md bg-red" style="width: 100%;">

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
const { isLogin, isAdmin } = storeToRefs(user)

// 宣告購物車陣列
const cart = reactive([])

// 結帳總金額
// computed 運算
const totalPrice = computed(() => {
  // reduce 累加器，a => 目前累計多少，b => 下一個要累加的值(目前迴圈跑到的參數)
  return cart.reduce((a, b) => {
    return a + b.product.price * b.quantity
    // 0 => a 的初始值
  }, 0)
})

// 更新購物車(商品數量+1、-1、刪除)
const updateCart = async (idx, quantity) => {
  const result = await user.updateCart({ product: cart[idx].product._id, quantity })
  if (result) {
    // 如果商品數量為 0
    if (quantity === 0) {
      // 刪除商品
      cart.splice(idx, 1)
      // 如果商品數量不為 0
    } else {
      // 修改商品數量
      cart[idx].quantity = quantity
    }
  }
}

// 結帳功能
const canCheckout = computed(() => {
  // 如果 購物車長度 > 0 且 不包含下架商品，就可以結帳
  return cart.length > 0 && !cart.some(item => {
    return !item.product.sell
  })
})

// 定義每列 title
const columns = [
  { name: 'image', label: '商品圖片', field: row => row.product.image[0], required: true, align: 'center' },
  {
    name: 'name',
    label: '商品名稱',
    field: row => row.product.name,
    format: val => `${val}`,
    // 是否凍結窗格
    required: true,
    align: 'center'
  },
  { name: 'inventory', label: '商品狀態', field: row => row.product.inventory ? '有現貨' : '訂購後製作', align: 'center' },
  { name: 'price', label: '商品單價', field: row => row.product.price, align: 'center' },
  { name: 'minus', align: 'right' },
  { name: 'quantity', label: '訂購數量', field: row => row.quantity, align: 'center' },
  { name: 'add', align: 'left' },
  { name: 'sum', label: '金額小計', field: row => (row.product.price * row.quantity), align: 'center' },
  { name: 'edit', label: '商品編輯', align: 'center' }
]

// 抓購物車的資料
const init = async () => {
  try {
    const { data } = await apiAuth.get('/users/cart')
    cart.push(...data.result)
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: '失敗',
      text: '伺服器錯誤'
    })
  }
}
init()
</script>
