<template>
  <q-page id="ProductsView" class="column">
    <div id="myheader" class="bg-red"></div>
    <div id="mycontent" class="col column content-start">
      <!-- 麵包屑 -->
      <div class="q-mb-md">
        <q-breadcrumbs>
          <q-breadcrumbs-el label="首頁" icon="fa-solid fa-house" to="/" />
          <q-breadcrumbs-el label="開運小物" icon="fa-solid fa-store" />
        </q-breadcrumbs>
      </div>

      <!-- 頁面 Title -->
      <div class="col-1 col-xl-6 text-h3 spacing-h3 text-secondary q-mb-md indexTitle">開運小物</div>

      <!-- 商品 Card -->
      <div class="q-mt-md">
        <div v-if="products.length > 0" class="row">
          <div v-for='product in products' :key="product.id" class="col-6 col-md-4 col-xl-3 q-pa-xs">
            <q-card class="my-card" :product="product">
              <!-- 商品圖片 -->
              <q-img :src="product.image[0]" />
              <!-- 商品名稱 -->
              <q-card-section>
                <div class="col text-h6 ellipsis"> {{ product.name }} </div>
              </q-card-section>
              <!-- 商品描述 -->
              <q-card-section class="q-pt-none">
                <div class="text-caption text-grey">
                  {{ product.description }}
                </div>
              </q-card-section>
              <!-- 商品金額 -->
              <q-card-section class="q-pt-none">
                <div class="text-caption text-grey text-right">
                  $ {{ product.price }}
                </div>
              </q-card-section>

              <q-separator />
              <!-- 訂購按鈕 -->
              <q-card-actions>
                <q-btn flat round icon="event" />
                <q-btn flat color="primary">
                  Reserve
                </q-btn>
              </q-card-actions>
            </q-card>
          </div>
        </div>

        <div v-else class="text-h4 text-secondary q-mt-xl">很抱歉，目前沒有任何商品</div>
      </div>

    </div>
  </q-page>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { api } from '../../boot/axios'
import Swal from 'sweetalert2'

const products = reactive([])

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
