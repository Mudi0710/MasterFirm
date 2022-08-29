<template>
  <q-page id="CartView" class="column">
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
    <div id="mycontent" class="col-12 row content-start">
      <!-- 頁面 Title -->
      <div class="col-12 text-h4 text-xl-h3 text-secondary q-mb-md q-pl-md" style="width: 100%;">訂單查詢</div>

      <!-- 麵包屑 -->
      <div class="col-12 q-mt-md q-pl-lg" style="width: 100%;">
        <q-breadcrumbs>
          <q-breadcrumbs-el label="首頁" icon="fa-solid fa-house" to="/" />
          <q-breadcrumbs-el label="訂單查詢" icon="fa-solid fa-receipt" />
        </q-breadcrumbs>
      </div>

      <!-- <pre class="text-secondary">{{ orders }}</pre> -->
      <!-- 訂單表單區 -->
      <div class="col-12 q-pa-md" style="width: 100%;">
        <q-table :grid="$q.screen.lt.xl" :columns="columns" :rows="orders" row-key="name" square bordered wrap-cells
          binary-state-sort dense :filter="filter" :loading="loading" :pagination="pagination" no-data-label="目前沒有任何訂單"
          rows-per-page-label="每頁顯示筆數" no-results-label="Oops...找不到該筆訂單">

          <!-- 訂單搜尋 -->
          <template v-slot:top-right>
            <q-input borderless dense debounce="300" v-model="filter" placeholder="&nbsp;Search" class="search">
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </template>

          <!-- 訂單日期 -->
          <template #body-cell-date="date">
            <q-td :img="date" align="center">
              <!-- <pre>{{ date.value }}</pre> -->
              {{ new Date(date.value).toLocaleString() }}
            </q-td>
          </template>

          <!-- 訂單金額 -->
          <template #body-cell-totalPrice="totalPrice">
            <q-td :totalPrice="totalPrice" align="center">
              <!-- <pre>{{ totalPrice.row.totalPrice }}</pre> -->
              NT$ {{ totalPrice.row.totalPrice.toLocaleString() }}
            </q-td>
          </template>

          <!-- 訂單詳情 -->
          <template #body-cell-detail="detail">
            <q-td :detail="detail">
              <div class="row justify-center">
                <!-- <pre>{{ detail.row._id }}</pre> -->
                <q-btn class="col-auto q-mx-sm" @click='openDetailDialog(detail)' outline>訂單詳情</q-btn>
              </div>
            </q-td>
          </template>

          <!-- 找不到資料的訊息 -->
          <template v-slot:no-data="{ message }">
            <div class="full-width row flex-center text-accent text-h5 q-gutter-sm">
              <span>
                {{ message }}
              </span>
            </div>
          </template>

          <!-- RWD 卡片 -->
          <template v-slot:item="card">
            <!-- <pre>{{ card.row.product.image }}</pre> -->
            <div class="col-12 col-sm-6  col-md-4 col-lg-3 q-pa-sm cursor-pointer">
              <q-card @click='openDialog(card.row._id, card.rowIndex)' square bordered class="bg-primary shadow"
                style="100%">
                <div v-for="col in card.cols" :key="col.name" class="q-pa-sm">
                  <!-- <pre>{{ col }}</pre> -->
                  <!-- 訂單日期 -->
                  <div v-if="col.name === 'date'" class="text-left q-mx-auto">
                    <div class="row justify-between items-center">
                      <span class="text-accent">{{ col.label }}：</span>
                      <span class="text-secondary text-body2 text-right ellipsis-3-lines">{{ new
                        Date(col.value).toLocaleString()
                        }}</span>
                    </div>
                  </div>
                  <!-- 訂單id -->
                  <div v-if="col.name === 'id'" class="text-left q-mx-auto">
                    <div class="row justify-between">
                      <span class="text-accent">{{ col.label }}：</span>
                      <span class="text-secondary text-body2 text-right text-wrap">{{ col.value }}</span>
                    </div>
                  </div>
                  <!-- 訂單金額 -->
                  <div v-if="col.name === 'totalPrice'" class="text-left q-mx-auto">
                    <div class="row justify-between">
                      <span class="text-accent">{{ col.label }}：</span>
                      <span class="text-secondary text-right ellipsis-3-lines">NT$ {{ col.value.toLocaleString()
                        }}</span>
                    </div>
                  </div>
                  <!-- 訂單詳情 -->
                  <div v-if="col.name === 'detail'" class="text-left q-mx-auto">
                    <div class="row justify-between">
                      <span class="text-accent">{{ col.label }}：</span>
                      <!-- <pre>{{ card }}</pre> -->
                      <q-btn class="col-auto text-secondary" style="font-size: xx-small; padding: 0px 8px;"
                        @click='openDetailDialog(card)' outline>訂單詳情</q-btn>
                    </div>
                  </div>

                </div>
              </q-card>
            </div>
          </template>

          <!-- loading 效果 -->
          <!-- QInnerLoading必须是其父元素内部的最后一个元素，以便它可以显示在其他内容的顶部。 -->
          <template v-slot:loading>
            <q-inner-loading showing dark transition-show="fade" color="primary" />
          </template>
        </q-table>
      </div>

      <!-- 訂單詳情的彈出視窗 -->
      <q-dialog v-model="detailDialog.dialog" seamless style="width: auto;">
        <q-card square class="row justify-center bg-info q-pa-lg" style="width: 100%;">
          <div class="col-12 text-center text-h3 text-accent q-pb-md">訂單詳情</div>
          <!-- 包一個框框 -->
          <div class="row q-pa-md" style="width: 100%; border: 1px solid #1E1918;">

            <!-- 訂單編號 -->
            <div class="col-12 row">
              <div class="col-12 col-sm-auto text-h6 text-accent">訂單編號：</div>
              <div class="col-12 col-sm-auto text-sm-h6 text-dark">{{ detail.row._id }}</div>
            </div>
            <!-- 訂單日期 -->
            <div class="col-12 row">
              <div class="col-12 col-sm-auto text-h6 text-accent">訂單日期：</div>
              <div class="col-12 col-sm-auto text-sm-h6 text-dark">{{ new Date(detail.row.date).toLocaleString() }}
              </div>
            </div>

            <!-- 分隔線 -->
            <q-separator class="bg-dark text-center q-mx-auto q-my-sm" style="width: 95%; " />

            <!-- 訂單詳情 -->
            <div v-for="product in detail.row.products" :key="product._id" class="col-12 text-accent">
              <!-- <pre>{{ detail.row.products}}</pre> -->
              <div class="row">
                <!-- 單一商品圖片 -->
                <div class="col-12 col-lg-3">
                  <q-responsive :ratio="3 / 2">
                    <q-img :src="product.product.image[0]" />
                  </q-responsive>
                </div>
                <!-- 單一商品內容 -->
                <div class="col-12 col-lg-9 row q-px-lg-lg">
                  <div class="col-12 row">
                    <div class="col-12 col-sm-auto text-h6 text-accent">商品名稱：&nbsp;</div>
                    <div class="col-12 col-sm text-sm-h6 text-dark">{{ product.product.name }}</div>
                  </div>
                  <div class="col-12 row">
                    <div class="col-12 col-sm-auto text-h6 text-accent">商品金額：&nbsp; </div>
                    <div class="col-12 col-sm text-sm-h6 text-dark">NT$ {{ product.price.toLocaleString() }}
                    </div>
                  </div>
                  <div class="col-12 row">
                    <div class="col-12 col-sm-auto text-h6 text-accent">訂購數量：&nbsp;</div>
                    <div class="col-12 col-sm text-sm-h6 text-dark">{{ product.quantity }}</div>
                  </div>
                  <div class="col-12 text-h6 text-accent text-right">小計：&nbsp;<span class="text-dark">NT$
                      {{ (product.price * product.quantity).toLocaleString() }}</span>
                  </div>
                </div>
              </div>
              <q-separator class="bg-dark text-center q-mx-auto q-my-sm" style="width: 95%; " />
              <!-- <pre>{{ product }}</pre> -->
            </div>
            <!-- <pre>{{ detail.row.products }}</pre> -->
            <!-- 商品總金額 -->
            <div class="col-12 row justify-end q-px-lg-lg">
              <div class="col-12 col-lg-auto text-h4 text-accent q-my-sm">訂單金額：</div>
              <div class="col-12 col-lg-auto text-h4 text-warning text-right q-my-sm">NT$ {{
                detail.row.totalPrice.toLocaleString()
                }}</div>
            </div>
          </div>
          <!-- 關閉按鈕 -->
          <div class="col-12 row justify-around">
            <q-btn square flat outline class="col-4 bg-dark text-secondary q-my-sm" label="關閉"
              @click='detailDialog.dialog = false' />
          </div>
        </q-card>
      </q-dialog>

    </div>
  </q-page>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { apiAuth } from '@/boot/axios'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/user'
import { useQuasar } from 'quasar'
import Swal from 'sweetalert2'

const user = useUserStore()

// 擋未登入、管理者，購物車紅點
const { logout } = user
const { isLogin, isAdmin, cart } = storeToRefs(user)

const filter = ref('')
const $q = useQuasar()

const pagination = reactive({
  items: [], // table要顯示的資料
  page: 1, // 目前第幾頁
  rowsPerPage: 0 // 每頁幾筆，代表 All
})

const orders = reactive([])

// 預設 訂單詳情的彈窗 為 false
const detailDialog = reactive({
  dialog: false
})

const detail = ref('')

/*
  開啟 訂單詳情的彈窗，並帶入值
  此時 detail.value = detail / card = orderId
*/
const openDetailDialog = (orderId) => {
  detail.value = orderId
  detailDialog.dialog = true
}

// 定義每列 title
const columns = [
  { name: 'date', label: '訂單日期', field: row => row.date, required: true, align: 'center' },
  { name: 'id', label: '訂單編號', field: row => row._id, required: true, align: 'center' },
  { name: 'totalPrice', label: '訂單金額', field: row => row.totalPrice, align: 'center' },
  { name: 'detail', label: '訂單詳情', align: 'center' }
]

// 抓使用者的訂單資料
const init = async () => {
  try {
    const { data } = await apiAuth.get('/orders')
    orders.push(...data.result.map(order => {
      order.totalPrice = order.products.reduce((a, b) => {
        return a + b.price * b.quantity
      }, 0)
      return order
    }))
  } catch (error) {
    console.log(error)
    Swal.fire({
      icon: 'error',
      title: '失敗',
      text: '無法取得訂單'
    })
  }
}
init()
</script>
