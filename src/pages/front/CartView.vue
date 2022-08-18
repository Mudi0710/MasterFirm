<template>
  <q-page id="CartView" class="column">
    <div id="myheader"></div>
    <div id="mycontent" class="col-12 row content-start">
      <!-- 麵包屑 -->
      <div class="col-12 q-mb-md">
        <q-breadcrumbs>
          <q-breadcrumbs-el label="首頁" icon="fa-solid fa-house" to="/" />
          <q-breadcrumbs-el label="購物車" icon="fa-solid fa-store" />
        </q-breadcrumbs>
      </div>

      <!-- 頁面 Title -->
      <div class="col-12 col-xl-6 text-h3 spacing-h3 text-secondary q-mb-md indexTitle">購物車</div>

      <!-- 商品內容區 -->
      <div class="col-12 q-pa-md" style="width: 100%;">
        <q-table :grid="$q.screen.lt.xl" :columns="columns" :rows="cart" row-key="name" square bordered wrap-cells
          binary-state-sort dense :loading="loading" no-data-label="目前沒有選購任何商品" rows-per-page-label="每頁顯示筆數">

          <!-- 商品圖片(頭像) -->
          <template #body-cell-image="image">
            <q-td :img="image" align="center" ellipsis>
              <!-- <pre>{{ image.row.product }}</pre> -->
              <q-avatar square size="100px">
                <img :src="image.row.product.image" class="q-mb-xl" style="object-fit: cover;">
              </q-avatar>
            </q-td>
          </template>

          <!-- 商品數量 -1 -->
          <template #body-cell-minus="minus">
            <q-td :minus="minus">
              <!-- <pre>{{ minus.rowIndex }}</pre> -->
              <div class="row justify-end">
                <q-btn class="col-auto" style="font-size: xx-small; padding: 0px 8px;"
                  @click='updateCart(minus.rowIndex, minus.row.quantity - 1)' outline>-</q-btn>
              </div>
            </q-td>
          </template>

          <!-- 商品數量 +1 -->
          <template #body-cell-add="add">
            <q-td :add="add">
              <!-- <pre>{{ add.rowIndex }}</pre> -->
              <div class="row justify-start">
                <q-btn class="col-auto" style="font-size: xx-small; padding: 0px 8px;"
                  @click='updateCart(add.rowIndex, add.row.quantity + 1)' outline>+</q-btn>
              </div>
            </q-td>
          </template>

          <!-- 商品編輯、刪除 -->
          <template #body-cell-edit="edit">
            <q-td :edit="edit">
              <!-- <pre>{{ edit }}</pre> -->
              <div class="row justify-center">
                <q-btn class="col-auto q-mx-sm" @click='updateCart(edit.rowIndex, 0)' outline>刪除商品</q-btn>
              </div>
            </q-td>
          </template>

          <!-- 總金額、結帳 -->
          <template v-slot:bottom>
            <div class="row justify-end content-end items-end q-mt-md" style="width:100%;">
              <div class="text-h4 text-accent" style="width:200px;">總金額：</div>
              <div class="text-h4">{{ totalPrice }}</div>
            </div>
            <div class="col-12 row justify-end q-my-md">
              <!-- @click='user.checkout' 的 checkout 是從 /stores/user.js 來的 -->
              <q-btn square class="bg-secondary text-dark text-h6 " style="width:270px;" @click='user.checkout'
                :disabled='!canCheckout'>結帳
              </q-btn>
            </div>
          </template>

          <!-- <template v-slot:body>

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
import { useUserStore } from '@/stores/user'
import { useQuasar } from 'quasar'
import Swal from 'sweetalert2'

const user = useUserStore()

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
