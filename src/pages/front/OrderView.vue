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

          <!-- 商品金額 -->
          <template #body-cell-totalPrice="totalPrice">
            <q-td :totalPrice="totalPrice" align="center">
              <!-- <pre>{{ totalPrice.row.totalPrice }}</pre> -->
              NT$ {{ totalPrice.row.totalPrice.toLocaleString() }}
            </q-td>
          </template>

          <!-- 定義表頭 -->
          <template v-slot:header="header">
            <q-tr :header="header">
              <q-th>訂單詳情</q-th>
              <q-th v-for="col in header.cols" :key="col.name" :header="header">
                {{ col.label }}
              </q-th>
            </q-tr>
          </template>

          <!-- 訂單詳情 -->
          <template v-slot:body="detail">
            <q-tr v-if="detail.cols !== totalPrice" :detail="detail" class="text-center">
              <q-td>
                <q-btn size="sm" color="accent" round dense @click="detail.expand = !detail.expand"
                  :icon="detail.expand ? 'remove' : 'add'" />
              </q-td>
              <q-td v-for="col in detail.cols" :key="col.name" :detail="detail">
                <!-- <pre>{{ detail.cols.value }}</pre> -->
                {{ col.value }}
              </q-td>
            </q-tr>
            <q-tr v-show="detail.expand" :detail="detail">
              <q-td colspan="100%">
                <div class="text-left">This is expand slot for row above: {{ detail.row.name }}.</div>
              </q-td>
            </q-tr>
          </template>

          <!-- <template v-slot:body="detail">
            <q-td auto-width :detail="detail" align="center">
              <pre>{{ detail.row }}</pre>
              <q-btn size="sm" round @click="detail.expand = !detail.expand"
                :icon="detail.expand ? 'fa-solid fa-angle-up' : 'fa-solid fa-angle-down'" />
            </q-td>
            <q-td v-for="col in detail.cols" :key="col.name" :detail="detail">
              {{ col.value }}
            </q-td>
            <q-tr v-show="detail.expand" :detail="detail">
              <q-td colspan="100%">
                <div class="text-left">This is expand slot for row above: {{ detail.row.name }}.</div>
              </q-td>
            </q-tr>
          </template> -->

          <!-- <template v-slot:body="detail">
          <pre>{{ detail.row }}</pre>
            <q-tr :detail="detail">
              <q-td class="text-center">
                <q-btn size="sm" round @click="detail.expand = !detail.expand"
                  :icon="detail.expand ? 'fa-solid fa-angle-up' : 'fa-solid fa-angle-down'" />
              </q-td>
              <q-td v-for="col in detail.cols" :key="col.name" :detail="detail">
                {{ col.value }}
              </q-td>
            </q-tr>
            <q-tr v-show="detail.expand" :detail="detail">
              <q-td colspan="100%">
                <div class="text-left">This is expand slot for row above: {{ detail.row.name }}.</div>
              </q-td>
            </q-tr>
          </template> -->

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
  // { name: 'open', required: true, align: 'center' },
  { name: 'date', label: '訂單日期', field: row => row.date, required: true, align: 'center' },
  { name: 'id', label: '訂單編號', field: row => row._id, required: true, align: 'center' },
  { name: 'totalPrice', label: '訂單金額', field: row => row.totalPrice, align: 'center' }
  // { name: 'detail', label: '訂單詳情', align: 'center' }
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
