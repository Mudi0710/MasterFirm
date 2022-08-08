<template>
  <q-page-container>
    <q-page class="column">
      <div id="myheader"></div>
      <div id="mycontent" class="row content-start items-center">
        <div class="col-12 col-xl-5 q-px-lg self-start">
          <div class="text-h3 text-secondary q-my-sm">法師事務所</div>
          <div class="text-h5 text-secondary q-my-lg">
            你有生成跟着，就好瀏覽一座，到來每年計算機適當臺灣因為內地對此你還不對，總算發現，一句話協會關於筆者營銷高雄成果原則和諧後果動漫，科學好像優點之家熱線安排配套簽名影響減少立即因而職業一位，報名集團顯示形勢看法公里體會郵箱天氣消除嚴重導致，一位我又，高級體。
          </div>
        </div>
        <div id="indexpage-img" class="col-12 col-xl-7 q-pa-md">
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
  </q-page-container>
</template>

<script setup>

import { ref } from 'vue'

const slide = ref(1)
const autoplay = ref(true)

</script>

<!-- 原始碼 -->
<!-- <template>
  <q-page class="flex flex-center">
    <img
      alt="Quasar logo"
      src="~assets/quasar-logo-vertical.svg"
      style="width: 200px; height: 200px"
    >
    <br>
    我在 pages/IndexPage.vue
  </q-page>
</template> -->

<!-- defineComponent 是 Vue2 的，可以直接刪光光 -->
<!-- <script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'IndexPage'
})
</script> -->
