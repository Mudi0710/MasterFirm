<template>
  <q-layout class='bg-dark'>
    <q-header class='bg-primary text-secondary lt-xl q-px-md'>
      <q-toolbar>
        <q-toolbar-title>
          <router-link to='/admin'>
            法師事務所
          </router-link>
        </q-toolbar-title>
        <!-- 漢堡 -->
        <q-btn dense flat round icon='menu' @click='toggleLeftDrawer' />
      </q-toolbar>
    </q-header>

    <q-drawer v-model='leftDrawerOpen' side='left' :breakpoint='1199' show-if-above :width='150'
      class='bg-primary text-secondary text-center q-py-md q-px-md column justify-center' style='overflow: visible;'>

      <router-link to='/admin' class='col-2'>
        <span class='text-h3 master'>法師</span>
        <span class='text-h4'>事務所</span>
      </router-link>

      <q-list class='col-4 q-mb-xl'>
        <!-- v-ripple 點擊時有波紋特效 -->
        <router-link to='/admin'>
          <p class='text-h5'>管理後台</p>
        </router-link>
        <q-separator class='q-mb-lg' />
        <q-item clickable v-ripple dense to='/admin/adminMember'>
          <q-item-section>會員管理</q-item-section>
        </q-item>
        <q-item clickable v-ripple dense to='/admin/adminCase'>
          <q-item-section>預約管理</q-item-section>
        </q-item>
        <q-item clickable v-ripple dense to='/admin/adminProduct'>
          <q-item-section>商品管理</q-item-section>
        </q-item>
        <q-item clickable v-ripple dense to='/admin/adminOrder'>
          <q-item-section>訂單管理</q-item-section>
        </q-item>
        <q-item clickable v-ripple dense to='/admin/adminArticle'>
          <q-item-section>文章管理</q-item-section>
        </q-item>
        <q-item clickable v-ripple dense to='/admin/adminPromote'>
          <q-item-section>推播管理</q-item-section>
        </q-item>
      </q-list>

      <q-list class='col-3 text-h5'>
        <q-btn v-if='isLogin && isAdmin' round dense flat icon='fa-solid fa-house' to='/'>
          <q-tooltip transition-show='fade' transition-hide='fade' anchor='center right' self='center left'
            :offset='[-5, 0]'>
            回前台
          </q-tooltip>
        </q-btn>
      </q-list>
      <q-list class='col-2 text-h5'>
        <q-btn v-if='isLogin' round dense flat icon='fa-solid fa-right-from-bracket' @click='logout'>
          <q-tooltip transition-show='fade' transition-hide='fade' anchor='center right' self='center left'
            :offset='[-5, 0]'>
            登出
          </q-tooltip>
        </q-btn>
        <!-- <q-fab v-model='fab2' icon='fa-solid fa-user' direction='right' flat q-gutter-lg>
          <q-fab-action flat external-label label-position='top' @click='onClick' icon='fa-solid fa-user-plus' label='註冊' to='register' label-style='background-color: rgba(0,0,0,0);' label-class='text-secondary text-subtitle1' />
          <q-fab-action flat external-label label-position='top' @click='onClick' icon='fa-solid fa-right-to-bracket' label='登入' to='login' label-style='background-color: rgba(0,0,0,0);' label-class='text-secondary text-subtitle1' />
          <q-fab-action flat external-label label-position='top' @click='onClick' icon='fa-solid fa-address-card' label='會員資料' to='#' label-style='background-color: rgba(0,0,0,0);' label-class='text-secondary text-subtitle1' />
          <q-fab-action flat external-label label-position='top' @click='onClick' icon='fa-regular fa-calendar-days' label='預約查詢' to='#' label-style='background-color: rgba(0,0,0,0);' label-class='text-secondary text-subtitle1' />
          <q-fab-action flat external-label label-position='top' @click='onClick' icon='fa-solid fa-receipt' label='訂單查詢' to='#' label-style='background-color: rgba(0,0,0,0);' label-class='text-secondary text-subtitle1' />
          <q-fab-action flat external-label label-position='top' @click='onClick' icon='fa-solid fa-right-from-bracket' label='登出' to='#' label-style='background-color: rgba(0,0,0,0);' label-class='text-secondary text-subtitle1' />
        </q-fab><br> -->
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/user'

const leftDrawerOpen = ref(false)

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

const user = useUserStore()
const { logout } = user
const { isLogin, isAdmin, cart } = storeToRefs(user)
</script>
