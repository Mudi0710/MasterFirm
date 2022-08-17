<template>
  <q-page id="ProductView" class="column">
    <div id="myheader"></div>
    <div id="mycontent" class="col-12 column content-start">
      <!-- 麵包屑 -->
      <div class="q-mb-md">
        <q-breadcrumbs>
          <q-breadcrumbs-el label="首頁" icon="fa-solid fa-house" to="/" />
          <q-breadcrumbs-el label="開運小物" icon="fa-solid fa-store" to="/products" />
          <q-breadcrumbs-el icon="fa-solid fa-gift">&nbsp;{{ product.name }}</q-breadcrumbs-el>
        </q-breadcrumbs>
      </div>

      <!-- 頁面 Title -->
      <div class="col-1 col-xl-6 text-h3 spacing-h3 text-secondary q-mb-md indexTitle">開運小物</div>

      <!-- 商品內容區 -->
      <div class="row content-start">

        <!-- 輪播圖 -->
        <div id="ProductView-img" class="col-12 col-xl-6 q-pa-md">
          <q-responsive :ratio="3 / 2">
            <q-carousel animated infinite swipeable transition-prev="slide-right" transition-next="slide-left"
              :autoplay="autoplay" arrows navigation v-model="slide" @mouseenter="autoplay = false"
              @mouseleave="autoplay = true">
              <q-carousel-slide :name="1" img-src="https://cdn.quasar.dev/img/mountains.jpg" />
              <q-carousel-slide :name="2" img-src="https://cdn.quasar.dev/img/parallax1.jpg" />
              <q-carousel-slide :name="3" img-src="https://cdn.quasar.dev/img/parallax2.jpg" />
              <q-carousel-slide :name="4" img-src="https://cdn.quasar.dev/img/quasar.jpg" />
            </q-carousel>
          </q-responsive>
        </div>

        <div id="ProductView-content" class="col col-xl-6 q-pa-md row wrap justify-start content-start">
          <!-- 商品名稱 -->
          <div class="col-12 text-h3 spacing-h3 text-accent q-mb-xl">{{ product.name }}</div>
          <!-- 商品描述 -->
          <div class="col-12 text-h6 spacing-h6 text-secondary text-justify items-center q-mb-md" style="height: 45%;">
            {{ product.description }}</div>
          <!-- 商品價格 -->
          <div class="col-12 text-h4 spacing-h6 text-accent text-right" style="height: 10%;">$ {{ product.price }}</div>
          <!-- 商品訂購 -->
          <div class="q-mt-xl" style="width: 100%;">
            <!-- 訂購表單 -->
            <!-- <q-form class="row" v-model='valid' @submit.prevent='submit'> -->
            <q-form class="row" @submit.prevent='submit'>
              <div class="col-5 text-h6 spacing-h6 text-secondary text-center ">
                <div class="row items-center">
                  <div class="col-7 text-accent">訂購數量</div>
                  <q-input type="number" v-model="quantity" :rules='quantityRule' class="col-4" style="width: 50px;" />
                </div>
              </div>
              <!-- 送出訂購按鈕 -->
              <q-btn v-if='isLogin' square flat outline class="col-7 bg-secondary text-body1 text-dark"
                icon='fa-solid fa-cart-shopping' label="加入購物車" type="submit" />
                <!-- 未登入導回登入頁 -->
              <q-btn v-if='!isLogin' square flat outline class="col-7 bg-dark text-body1 text-secondary"
                label="登入以使用購物車" to='/login' />
            </q-form>

          </div>
        </div>

      </div>

    </div>
  </q-page>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { api } from '../../boot/axios'
import Swal from 'sweetalert2'
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'

const route = useRoute()
const router = useRouter()
const user = useUserStore()

// 輪播圖設定
const slide = ref(1)
const autoplay = ref(true)

// 擋未登入
const { isLogin } = storeToRefs(user)

const quantity = ref(0)
const quantityRule = reactive([
  v => v >= 1 || '數量錯誤'
])

// const valid = ref(false)

const product = reactive({
  _id: '',
  name: '',
  price: 0,
  category: '',
  sell: false,
  image: '',
  description: ''
})

const submit = () => {
  // if (!valid.value) return
  user.addCart({ product: product._id, quantity: quantity.value })
}

// 抓後台所有商品的資料
const init = async () => {
  try {
    const { data } = await api.get('/products/' + route.params.id)
    product._id = data.result._id
    product.name = data.result.name
    product.description = data.result.description
    product.inventory = data.result.inventory
    product.sell = data.result.sell
    product.price = data.result.price
    product.image = data.result.image
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: '失敗',
      text: '取得商品資料失敗'
    })
    // 丟回上一頁
    router.go(-1)
  }
}
init()

</script>
