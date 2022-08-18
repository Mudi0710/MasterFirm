<template>
  <q-page id="CartView" class="column">
    <div id="myheader"></div>
    <div id="mycontent" class="col-12 row content-start">
      <!-- 麵包屑 -->
      <div class="col-12 q-mb-md">
        <q-breadcrumbs>
          <q-breadcrumbs-el label="首頁" icon="fa-solid fa-house" to="/" />
          <q-breadcrumbs-el label="訂單查詢" icon="fa-solid fa-receipt" />
        </q-breadcrumbs>
      </div>

      <!-- 頁面 Title -->
      <div class="col-12 col-xl-6 text-h3 spacing-h3 text-secondary q-mb-md indexTitle">訂單查詢</div>

      <!-- <pre class="text-secondary">{{ orders }}</pre> -->
      <!-- 訂單表單區 -->
      <div class="col-12 q-pa-md" style="width: 100%;">
        <q-table :grid="$q.screen.lt.xl" :columns="columns" :rows="orders" row-key="name" square bordered wrap-cells
          binary-state-sort dense :loading="loading" :pagination="pagination" no-data-label="目前沒有任何訂單"
          rows-per-page-label="每頁顯示筆數">

          <!-- 商品圖片(頭像) -->
          <template #body-cell-date="date">
            <q-td :img="date" align="center" ellipsis>
              <!-- <pre>{{ date.value }}</pre> -->
              {{ new Date(date.value).toLocaleDateString() }}
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
            <div class="col-6 col-md-4 col-lg-3 q-pa-sm cursor-pointer">
              <q-card @click='openDialog(card.row._id, card.rowIndex)' square bordered class="bg-primary shadow">
                <div v-for="col in card.cols" :key="col.name" class="q-pa-sm">
                  <!-- <pre>{{ col }}</pre> -->
                  <!-- 商品圖片 -->
                  <q-responsive v-if="col.name == 'image'" :ratio="3 / 2">
                    <img :src="card.row.product.image" class="col" style="width: 100%;">
                  </q-responsive>
                  <!-- 商品資訊 -->
                  <div
                    v-else-if="col.name !== 'image' && col.name !== 'minus' && col.name !== 'quantity' && col.name !== 'add' && col.name !== 'edit'"
                    class="text-left q-mx-auto">
                    <div class="row justify-between">
                      <span class="text-accent">{{ col.label }}：</span>
                      <span class="text-secondary text-right">{{ col.value }}</span>
                    </div>
                  </div>
                  <!-- 商品數量 -->
                  <div v-else-if="col.name === 'quantity'" class="text-left q-mx-auto">
                    <div class="row justify-between items-center">
                      <span class="text-accent">{{ col.label }}：</span>
                      <!-- 商品 -1 -->
                      <q-btn class="col-auto text-secondary" style="font-size: xx-small; padding: 0px 8px;"
                        @click='updateCart(card.rowIndex, card.row.quantity - 1)' outline>-</q-btn>
                      <span class="text-secondary text-right">{{ col.value }}</span>
                      <!-- 商品 +1 -->
                      <q-btn class="col-auto text-secondary" style="font-size: xx-small; padding: 0px 8px;"
                        @click='updateCart(card.rowIndex, card.row.quantity + 1)' outline>+</q-btn>
                    </div>
                  </div>
                  <!-- 商品刪除 -->
                  <div v-else-if="col.name === 'edit'" class="text-left q-mx-auto">
                    <!-- <pre>{{ card }}</pre> -->
                    <div class="row justify-between">
                      <span class="text-accent">{{ col.label }}：</span>
                      <q-btn class="col-auto text-secondary" style="font-size: xx-small; padding: 0px 8px;"
                        @click='updateCart(card.rowIndex, 0)' outline>刪除商品</q-btn>
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

    </div>
  </q-page>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { apiAuth } from '@/boot/axios'
// import { useUserStore } from '@/stores/user'
import { useQuasar } from 'quasar'
import Swal from 'sweetalert2'

const orders = reactive([])

// 定義每列 title
const columns = [
  // { name: 'image', label: '商品圖片', field: row => row.product.image[0], required: true, align: 'center' },
  { name: 'date', label: '訂單日期', field: row => row.date, required: true, align: 'center' },
  { name: 'id', label: '訂單編號', field: row => row._id, required: true, align: 'center' },
  { name: 'totalPrice', label: '訂單金額', field: row => row.totalPrice, required: true, align: 'center' },
  { name: 'edit', label: '商品編輯', align: 'center' }
  // {
  //   name: 'name',
  //   label: '商品名稱',
  //   field: row => row.product.name,
  //   format: val => `${val}`,
  //   // 是否凍結窗格
  //   required: true,
  //   align: 'center'
  // },
  // { name: 'inventory', label: '商品狀態', field: row => row.product.inventory ? '有現貨' : '訂購後製作', align: 'center' },
  // { name: 'price', label: '商品單價', field: row => row.product.price, align: 'center' },
  // { name: 'minus', align: 'right' },
  // { name: 'quantity', label: '訂購數量', field: row => row.quantity, align: 'center' },
  // { name: 'add', align: 'left' },
  // { name: 'sum', label: '金額小計', field: row => (row.product.price * row.quantity), align: 'center' },
  // { name: 'edit', label: '商品編輯', align: 'center' }
]

// 抓使用者的訂單資料
const init = async () => {
  try {
    const { data } = await apiAuth.get('/orders')
    orders.push(...data.result.map(order => {
      order.totalPrice = order.products.reduce((a, b) => {
        return a + b.product.price * b.quantity
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
