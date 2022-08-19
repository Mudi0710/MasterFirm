<template>
  <q-page id="indexPage" class="row">
    <div id="myheader" class="row justify-end items-center" style="width: 100%;">
      <q-list class='text-h5 text-secondary'>
        <q-btn v-if='isLogin' round dense flat icon='fa-solid fa-address-card' to='member' class="q-mx-xs">
          <q-tooltip transition-show='fade' transition-hide='fade' :offset='[0, 0]'>
            會員資料
          </q-tooltip>
        </q-btn>
        <q-btn v-if='isLogin' round dense flat icon='fa-regular fa-calendar-days' to='booking' class="q-mx-xs">
          <q-tooltip transition-show='fade' transition-hide='fade' :offset='[0, 0]'>
            預約查詢
          </q-tooltip>
        </q-btn>
        <q-btn v-if='isLogin' round dense flat icon='fa-solid fa-receipt' to='order' class="q-mx-xs">
          <q-tooltip transition-show='fade' transition-hide='fade' :offset='[0, 0]'>
            訂單查詢
          </q-tooltip>
        </q-btn>
        <q-btn v-if='isLogin' round dense flat icon='fa-solid fa-cart-shopping' to='cart' class="q-mx-xs">
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
        <q-btn v-if='!isLogin' round dense flat icon='fa-solid fa-user-plus' to='register' class="q-mx-xs">
          <q-tooltip transition-show='fade' transition-hide='fade' :offset='[0, 0]'>
            註冊
          </q-tooltip>
        </q-btn>
        <q-btn v-if='!isLogin' round dense flat icon='fa-solid fa-right-to-bracket' to='login' class="q-ml-xs q-mr-lg">
          <q-tooltip transition-show='fade' transition-hide='fade' :offset='[0, 0]'>
            登入
          </q-tooltip>
        </q-btn>
        <q-btn v-if='isLogin' round dense flat icon='fa-solid fa-right-from-bracket' @click='logout'
          class="q-ml-xl q-mr-lg">
          <q-tooltip transition-show='fade' transition-hide='fade' :offset='[0, 0]'>
            登出
          </q-tooltip>
        </q-btn>
      </q-list>
    </div>

    <div id="mycontent" class="row content-start">
      <!-- 宣傳文字區 -->
      <div class="col-12 col-xl-7 q-pa-md column justify-end">
        <div class="col-1 col-xl-6 text-h3 spacing-h3 text-secondary q-my-sm indexTitle">法師事務所</div>
        <div class="col col-xl-6 text-h6 spacing-h6 text-secondary text-justify items-center q-my-xl indexContent">
          你有生成跟着，就好瀏覽一座，到來每年計算機適當臺灣因為內地對此你還不對，總算發現，一句話協會關於筆者營銷高雄成果原則和諧後果動漫，科學好像優點之家熱線安排配套簽名影響減少立即因而職業一位，報名集團顯示形勢看法公里體會郵箱天氣消除嚴重導致，一位我又，高級體。你有生成跟着，就好瀏覽一座，到來每年計算機適當臺灣因為內地對此你還不對，總算發現，一句話協會關於筆者營銷高雄成果原則和諧後果動漫，科學好像優點之家熱線安排配套簽名影響減少立即因而職業一位，報名集團顯示形勢看法公里體會郵箱天氣消除嚴重導致，一位我又，高級體。
        </div>
      </div>
      <!--  -->
      <div id="indexpage-img" class="col-12 col-xl-5 q-pa-md">
        <q-carousel animated infinite swipeable transition-prev="slide-right" transition-next="slide-left"
          :autoplay="autoplay" arrows navigation v-model="slide" @mouseenter="autoplay = false"
          @mouseleave="autoplay = true">
          <q-carousel-slide :name="1" img-src="https://cdn.quasar.dev/img/mountains.jpg" />
          <q-carousel-slide :name="2" img-src="https://cdn.quasar.dev/img/parallax1.jpg" />
          <q-carousel-slide :name="3" img-src="https://cdn.quasar.dev/img/parallax2.jpg" />
          <q-carousel-slide :name="4" img-src="https://cdn.quasar.dev/img/quasar.jpg" />
        </q-carousel>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/user'

const slide = ref(1)
const autoplay = ref(true)

const user = useUserStore()
const { logout } = user
const { isLogin, isAdmin, cart } = storeToRefs(user)
</script>
