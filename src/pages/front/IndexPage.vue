<template>
  <q-page id="indexPage" class="row">
    <div id="myheader" class="col-12"></div>
    <div id="mycontent" class="row content-start">
      <div class="col-12 col-xl-7 q-pa-md column justify-end">
        <div class="col-1 col-xl-6 text-h3 spacing-h3 text-secondary q-my-sm indexTitle">法師事務所</div>
        <div class="col col-xl-6 text-h6 spacing-h6 text-secondary text-justify items-center q-my-xl indexContent">
          你有生成跟着，就好瀏覽一座，到來每年計算機適當臺灣因為內地對此你還不對，總算發現，一句話協會關於筆者營銷高雄成果原則和諧後果動漫，科學好像優點之家熱線安排配套簽名影響減少立即因而職業一位，報名集團顯示形勢看法公里體會郵箱天氣消除嚴重導致，一位我又，高級體。你有生成跟着，就好瀏覽一座，到來每年計算機適當臺灣因為內地對此你還不對，總算發現，一句話協會關於筆者營銷高雄成果原則和諧後果動漫，科學好像優點之家熱線安排配套簽名影響減少立即因而職業一位，報名集團顯示形勢看法公里體會郵箱天氣消除嚴重導致，一位我又，高級體。
        </div>
      </div>
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

const slide = ref(1)
const autoplay = ref(true)

</script>
