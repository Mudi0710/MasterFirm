<template>
  <q-page id="adminHome" class="column">
    <div id="myheader" class="row justify-end items-center" style="width: 100%;">
      <q-list class='text-h5 text-secondary mobile-none'>
        <q-btn v-if='isLogin' round dense flat icon='fa-solid fa-house' to='/' class="q-mx-xs">
          <q-tooltip transition-show='fade' transition-hide='fade' :offset='[0, 0]'>
            回前台
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
    <div id="mycontent" class="col row justify-center items-center" style="width: 100%;">
      <div class="row justify-center text-secondary indexTitle desktop-none" style="width: 100%;">
        <div class="col-12 text-center q-my-lg">歡迎進入管理後台</div>
        <div class="col-12 text-center q-my-lg">請至右上方選擇管理項目</div>
      </div>
      <div class="row justify-center text-secondary text-h2 mobile-none" style="width: 100%;">
        <div class="col-12 text-center q-my-lg">歡迎進入管理後台</div>
        <div class="col-12 text-center q-my-lg">請於左側選擇管理項目</div>
      </div>
    </div>
    <!-- 原本的卡片區 -->
    <!-- <div id="adminHome" class="row justify-center text-secondary">
      <div id="adminHomeHeader">請選擇管理項目</div>
      <div class="adminHomeLayout q-pa-md row justify-center">
        <router-link to='/admin/adminMember'>
          <q-card square flat class="my-card col-6 col-sm-6 col-xl-4 text-center row"
            style="background: url('https://cdn.quasar.dev/img/quasar.jpg') no-repeat center center/cover;">
            <div class="col-12 self-center text-h3 title">會員<br class="br">管理</div>
          </q-card>
        </router-link>
        <router-link to='/admin/adminCase'>
          <q-card square flat class="my-card col-6 col-sm-6 col-xl-4 text-center row"
            style="background: url('https://cdn.quasar.dev/img/quasar.jpg') no-repeat center center/cover;">
            <div class="col-12 self-center text-h3 title">預約<br class="br">管理</div>
          </q-card>
        </router-link>
        <router-link to='/admin/adminProduct'>
          <q-card square flat class="my-card col-6 col-sm-6 col-xl-4 text-center row"
            style="background: url('https://cdn.quasar.dev/img/quasar.jpg') no-repeat center center/cover;">
            <div class="col-12 self-center text-h3 title">商品<br class="br">管理</div>
          </q-card>
        </router-link>
        <router-link to='/admin/adminOrder'>
          <q-card square flat class="my-card col-6 col-sm-6 col-xl-4 text-center row"
            style="background: url('https://cdn.quasar.dev/img/quasar.jpg') no-repeat center center/cover;">
            <div class="col-12 self-center text-h3 title">訂單<br class="br">管理</div>
          </q-card>
        </router-link>
        <router-link to='/admin/adminArticle'>
          <q-card square flat class="my-card col-6 col-sm-6 col-xl-4 text-center row"
            style="background: url('https://cdn.quasar.dev/img/quasar.jpg') no-repeat center center/cover;">
            <div class="col-12 self-center text-h3 title">文章<br class="br">管理</div>
          </q-card>
        </router-link>
        <router-link to='/admin/adminPromote'>
          <q-card square flat class="my-card col-6 col-sm-6 col-xl-4 text-center row"
            style="background: url('https://cdn.quasar.dev/img/quasar.jpg') no-repeat center center/cover;">
            <div class="col-12 self-center text-h3 title">推播<br class="br">管理</div>
          </q-card>
        </router-link>
      </div>
    </div> -->

  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/user'

const user = useUserStore()
const { logout } = user
const { isLogin } = storeToRefs(user)
</script>
