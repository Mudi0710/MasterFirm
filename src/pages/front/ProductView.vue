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
      <div class="col-12 q-my-md" style="width: 100%;">
        <q-breadcrumbs>
          <q-breadcrumbs-el label="首頁" icon="fa-solid fa-house" to="/" />
          <q-breadcrumbs-el label="開運小物" icon="fa-solid fa-store" to="/products" />
          <q-breadcrumbs-el icon="fa-solid fa-gift">&nbsp;{{ product.name }}</q-breadcrumbs-el>
        </q-breadcrumbs>
      </div>

      <!-- 商品內容區 -->
      <div class="col-12 row justify-start content-center bg-secondary shadow-white q-mb-lg" style="width: 100%;">

        <!-- 輪播圖 -->
        <div id="ProductView-img" class="col-12 q-pa-md">
          <q-responsive :ratio="3 / 2">
            <q-carousel animated infinite swipeable v-model="slide" thumbnails :autoplay="autoplay"
              @mouseenter="autoplay = false" @mouseleave="autoplay = true" arrows ransition-prev="slide-right"
              transition-next="slide-left">
              <q-carousel-slide v-for="(image, idx) in product.image" :key="image" :name="idx + 1" :img-src="image" />
            </q-carousel>
          </q-responsive>
        </div>

        <!-- 商品資訊 -->
        <div id="ProductView-content" class="col-12 q-pa-md column wrap justify-start content-start q-pr-lg-lg">
          <!-- 商品名稱 -->
          <div class="col-auto text-h3 text-primary spacing-h3 q-mb-lg">{{ product.name }}</div>
          <!-- 商品狀態 -->
          <div class="col-auto text-body2 spacing-h6 text-accent text-justify items-center q-mb-md">
            <span class="bg-primary q-pa-xs">{{ product.inventory ? '有現貨' : '訂購後製作' }}</span>
          </div>
          <!-- 商品描述 -->
          <div class="col-auto text-h6 spacing-h6 text-grey-8 text-justify items-center q-mb-lg">
            {{ product.description
            }}你有生成跟着，就好瀏覽一座，到來每年計算機適當臺灣因為內地對此你還不對，總算發現，一句話協會關於筆者營銷高雄成果原則和諧後果動漫，科學好像優點之家熱線安排配套簽名影響減少立即因而職業一位，報名集團顯示形勢看法公里體會郵箱天氣消除嚴重導致，一位我又，高級體。你有生成跟着，就好瀏覽一座，到來每年計算機適當臺灣因為內地對此你還不對，總算發現，一句話協會關於筆者營銷高雄成果原則和諧後果動漫，科學好像優點之家熱線安排配套簽名影響減少立即因而職業一位，報名集團顯示形勢看法公里體會郵箱天氣消除嚴重導致，一位我又，高級體。你有生成跟着，就好瀏覽一座，到來每年計算機適當臺灣因為內地對此你還不對，總算發現，一句話協會關於筆者營銷高雄成果原則和諧後果動漫，科學好像優點之家熱線安排配套簽名影響減少立即因而職業一位，報名集團顯示形勢看法公里體會郵箱天氣消除嚴重導致，一位我又，高級體。你有生成跟着，就好瀏覽一座，到來每年計算機適當臺灣因為內地對此你還不對，總算發現，一句話協會關於筆者營銷高雄成果原則和諧後果動漫，科學好像優點之家熱線安排配套簽名影響減少立即因而職業一位，報名集團顯示形勢看法公里體會郵箱天氣消除嚴重導致，一位我又，高級體。
          </div>
          <!-- 商品價格 -->
          <div class="col-auto text-h4 spacing-h6 text-warning text-right q-mb-lg">NT$ {{
            product.price.toLocaleString()
            }}
          </div>
          <!-- 商品訂購 -->
          <div class="col-auto">
            <!-- 訂購表單 -->
            <q-form class="row justify-between items-center" style="width: 100%;height: 40px;" @submit.prevent='submit'>
              <div class="col-auto text-h4 text-primary">訂購數量</div>
              <div v-if='isLogin' class="col-auto row">
                <q-btn outline square color="dark" icon="fa-solid fa-minus" @click="minus()" />
                <q-btn square flat class="col-7 bg-primary text-body1 text-secondary" style="width: auto; height: auto"
                  type="submit" v-model="quantity">{{ quantity }}，加入購物車</q-btn>
                <q-btn outline square color="dark" icon="fa-solid fa-plus" @click="quantity++" />
              </div>
              <q-btn v-if='!isLogin' square flat class="col-7 bg-dark text-body1 text-secondary" label="登入以使用購物車"
                to='/login' />
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
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'
import Swal from 'sweetalert2'

const route = useRoute()
const router = useRouter()
const user = useUserStore()

// 輪播圖設定
const slide = ref(1)
const autoplay = ref(true)

const { logout } = user
// 擋未登入、管理者，購物車紅點
const { isLogin, isAdmin, cart } = storeToRefs(user)

const quantity = ref(0)
const quantityRule = reactive([
  v => v >= 1 || '數量錯誤'
])

const product = reactive({
  _id: '',
  name: '',
  description: '',
  inventory: false,
  sell: false,
  price: 0,
  image: ''
})

const minus = () => {
  quantity.value--
  if (quantity.value < 0) {
    quantity.value = 0
  }
}

const submit = () => {
  user.addCart({ product: product._id, quantity: quantity.value })
}

// 抓後台單一商品的資料
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
