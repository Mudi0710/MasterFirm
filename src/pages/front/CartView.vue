<template>
  <q-page id="ProductView" class="column">
    <div id="myheader"></div>
    <div id="mycontent" class="col-12 column content-start">
      <!-- 麵包屑 -->
      <div class="q-mb-md">
        <q-breadcrumbs>
          <q-breadcrumbs-el label="首頁" icon="fa-solid fa-house" to="/" />
          <q-breadcrumbs-el label="購物車" icon="fa-solid fa-store" />
        </q-breadcrumbs>
      </div>

      <!-- 頁面 Title -->
      <div class="col-1 col-xl-6 text-h3 spacing-h3 text-secondary q-mb-md indexTitle">購物車</div>

      <!-- 商品內容區 -->
      <div class="q-pa-md" style="width: 100%;">
        <q-table :grid="$q.screen.lt.xl" :columns="columns" :rows="cart" row-key="name" square bordered wrap-cells
          binary-state-sort dense :loading="loading" :pagination="pagination" no-data-label="目前沒有選購任何商品"
          rows-per-page-label="每頁顯示筆數">

          <!-- 商品圖片(頭像) -->
          <template #body-cell-image="image">
            <q-td :img="image" align="center" ellipsis>
              <!-- <pre>{{ image.row.product }}</pre> -->
              <q-avatar square size="100px">
                <img :src="image.row.product.image" class="q-mb-xl" style="object-fit: cover;">
              </q-avatar>
            </q-td>
          </template>

          <!-- 商品編輯、刪除 -->
          <template #body-cell-edit="edit">
            <q-td :edit="edit">
              <!-- <pre>{{ edit }}</pre> -->
              <div class="row justify-center">
                <q-btn class="col-auto q-mx-sm" @click='openDialog(edit.row._id, edit.rowIndex)' outline>修改商品</q-btn>
                <q-btn class="col-auto q-mx-sm" @click='openDeleteDialog(edit.row._id)' outline>刪除商品</q-btn>
              </div>
            </q-td>
          </template>

          <!-- 表格底端分頁選項 -->
          <template v-slot:pagination="scope">
            <q-btn v-if="scope.pagesNumber > 1" icon="first_page" color="secondary" round dense flat
              :disable="scope.isFirstPage" @click="scope.firstPage" />

            <q-btn icon="chevron_left" color="secondary" round dense flat :disable="scope.isFirstPage"
              @click="scope.prevPage" />

            <q-btn icon="chevron_right" color="secondary" round dense flat :disable="scope.isLastPage"
              @click="scope.nextPage" />

            <q-btn v-if="scope.pagesNumber > 1" icon="last_page" color="secondary" round dense flat
              :disable="scope.isLastPage" @click="scope.lastPage" />
          </template>

          <!-- 找不到資料的訊息 -->
          <template v-slot:no-data="{ message }">
            <div class="full-width row flex-center text-accent q-gutter-sm">
              <span>
                {{ message }}
              </span>
            </div>
          </template>

          <!-- RWD 卡片 -->
          <template v-slot:item="card">
            <!-- <pre>{{ card.row.product.image }}</pre> -->
            <div class="col-6 col-md-4 col-lg-3 q-pa-sm cursor-pointer ">
              <q-card @click='openDialog(card.row._id, card.rowIndex)' square bordered class="bg-primary shadow">
                <div v-for="col in card.cols" :key="col.name" class="q-pa-sm">
                  <!-- <pre>{{ col }}</pre> -->
                  <!-- 商品圖片 -->
                  <q-responsive v-if="col.name == 'image'" :ratio="3 / 2">
                    <img :src="card.row.product.image" class="col" style="width: 100%;">
                  </q-responsive>
                  <!-- 商品資訊 -->
                  <div v-else-if="col.name !== 'image' && col.name !== 'edit'" class="text-left q-mx-auto">
                    <div class="row justify-between">
                      <span class="text-accent">{{ col.label }}：</span>
                      <span class="text-secondary text-right">{{ col.value }}</span>
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
import { useUserStore } from '@/stores/user'
import { useQuasar } from 'quasar'
import Swal from 'sweetalert2'

const user = useUserStore()

// 宣告購物車陣列
const cart = reactive([])

// 分頁
const pagination = reactive({
  items: [], // table要顯示的資料
  page: 1, // 目前第幾頁
  rowsPerPage: 0 // 每頁幾筆，代表 All
})

const totalPrice = computed(() => {
  return cart.reduce((a, b) => {
    return a + b.product.price * b.quantity
  }, 0)
})
const canCheckout = computed(() => {
  return cart.length > 0 && !cart.some(item => {
    return !item.product.sell
  })
})

const updateCart = async (idx, quantity) => {
  const result = await user.updateCart({ product: cart[idx].product._id, quantity })
  if (result) {
    if (quantity === 0) {
      cart.splice(idx, 1)
    } else {
      cart[idx].quantity = quantity
    }
  }
}

// 定義每列 title
const columns = [
  { name: 'image', label: '商品圖片', align: 'center', field: row => row.product.image[0] },
  {
    name: 'name',
    label: '商品名稱',
    field: row => row.product.name,
    format: val => `${val}`,
    // 是否凍結窗格
    required: true,
    align: 'center'
  },
  { name: 'inventory', label: '商品狀態', field: row => row.inventory ? '有現貨' : '訂購後製作', align: 'center' },
  { name: 'price', label: '商品單價', field: row => row.product.price, align: 'center' },
  { name: 'quantity', label: '訂購數量', field: row => row.quantity, align: 'center' },
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
