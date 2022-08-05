<template>
  <q-page-container>
    <q-page class="window-height row wrap content-start items-center">
      <div class="col-12 col-xl-4 q-px-md">
        <div class="text-h3 text-secondary q-my-sm">法師事務所</div>
        <div class="text-h5 text-secondary q-my-lg">Lorem ipsum dolor sit amet consectetur adipisicing elit.Lorem ipsum dolor sit amet consectetur adipisicing elit.Lorem ipsum dolor sit amet consectetur adipisicing elit.</div>
      </div>

      <div class="col-12 col-xl-8 q-pa-md">
        <q-carousel
          animated
          infinite
          swipeable
          transition-prev="slide-right"
          transition-next="slide-left"
          :autoplay="autoplay"
          arrows
          navigation
          v-model="slide"
          @mouseenter="autoplay = false"
          @mouseleave="autoplay = true"
        >
          <q-carousel-slide :name="1" img-src="https://cdn.quasar.dev/img/mountains.jpg" />
          <q-carousel-slide :name="2" img-src="https://cdn.quasar.dev/img/parallax1.jpg" />
          <q-carousel-slide :name="3" img-src="https://cdn.quasar.dev/img/parallax2.jpg" />
          <q-carousel-slide :name="4" img-src="https://cdn.quasar.dev/img/quasar.jpg" />
        </q-carousel>
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
