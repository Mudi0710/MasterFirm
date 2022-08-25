<template>
  <q-page>
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

    <div id="mycontent" class="col row justify-start">

      <!-- 頁面 Title -->
      <div class="col-12 text-h3 text-secondary q-mb-md" style="width: 100%;">開運小物</div>

      <!-- 麵包屑 -->
      <div class="col-12 q-mt-md" style="width: 100%;">
        <q-breadcrumbs>
          <q-breadcrumbs-el label="首頁" icon="fa-solid fa-house" to="/" />
          <q-breadcrumbs-el label="開運小物" icon="fa-solid fa-store" />
        </q-breadcrumbs>
      </div>

      <!-- 商品 Card -->
      <div class="col-12 q-mt-md" style="width: 100%;">
        <div v-if="products.length > 0" class="row justify-start items-center">
          <!-- <pre>{{ products }}</pre> -->
          <div v-for='product in products' :key="product.id" class="col-6 col-md-4 col-xl-3 q-px-xs q-py-sm">
            <ProductCard bordered class="my-card bg-info shadow-10" style="border-radius: 0; width: 100%;"
              :product="product">
            </ProductCard>

            <!-- <q-card bordered class="my-card bg-info shadow-10" style="border-radius: 0;" :product="product">
              商品圖片
              <q-responsive :ratio="3 / 2">
                <q-img :src="product.image[0]" />
              </q-responsive>
              商品名稱
              <q-card-section>
                .ellipsis => text 過多時以...代替
                <div class="col text-h5 text-accent ellipsis"> {{ product.name }} </div>
              </q-card-section>
              商品描述
              <q-card-section class="q-pt-none">
                <div class="text-subtitle1 text-dark ellipsis-3-lines">
                  {{ product.description }}
                </div>
              </q-card-section>
              商品金額
              <q-card-section class="q-pt-none">
                <div class="text-subtitle2 text-accent text-right">
                  $ {{ product.price }}
                </div>
              </q-card-section>

              <q-separator />
              訂購按鈕
              <q-card-actions>
                <q-btn flat round icon="event" />
                <q-btn flat color="primary">
                  Reserve
                </q-btn>
              </q-card-actions>
            </q-card> -->

          </div>
        </div>

        <div v-else class="text-h4 text-secondary q-mt-xl">很抱歉，目前沒有任何商品</div>
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
import ProductCard from '@/components/ProductCard.vue'

const products = reactive([])

const user = useUserStore()
const { logout } = user
const { isLogin, isAdmin, cart } = storeToRefs(user)

// 抓後台所有商品的資料
const init = async () => {
  try {
    const { data } = await api.get('/products')
    products.push(...data.result)
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
