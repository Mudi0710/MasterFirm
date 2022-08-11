<template>
  <q-page>
    <div id="adminHome" class="text-secondary">
      <div id="adminHomeHeader"></div>
      <div class="adminHomeLayout q-pa-md row justify-center">
        <q-card square flat class="my-card col-6 col-sm-6 col-xl-4 bg-primary text-center row">
          <div class="col-12 self-center text-h3 title">管理<br class="br">後台</div>
        </q-card>
        <q-card square flat class="my-card col-6 col-sm-6 col-xl-4 bg-primary text-center row">
          <div class="col-12 self-center text-h3 title">會員<br class="br">管理</div>
        </q-card>
        <q-card square flat class="my-card col-6 col-sm-6 col-xl-4 bg-primary text-center row">
          <div class="col-12 self-center text-h3 title">預約<br class="br">管理</div>
        </q-card>
        <q-card square flat class="my-card col-6 col-sm-6 col-xl-4 bg-primary text-center row">
          <div class="col-12 self-center text-h3 title">訂單<br class="br">管理</div>
        </q-card>
        <q-card square flat class="my-card col-6 col-sm-6 col-xl-4 bg-primary text-center row">
          <div class="col-12 self-center text-h3 title">文章<br class="br">管理</div>
        </q-card>
        <q-card square flat class="my-card col-6 col-sm-6 col-xl-4 bg-primary text-center row">
          <div class="col-12 self-center text-h3 title">推播<br class="br">管理</div>
        </q-card>
      </div>

    </div>
  </q-page>
</template>

<script setup>

import { ref } from 'vue'

const slide = ref(1)
const autoplay = ref(true)

</script>
