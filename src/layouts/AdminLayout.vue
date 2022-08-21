<template>
  <q-layout>
    <q-header class='bg-primary text-secondary q-px-md desktop-none shadow-10'>
      <q-toolbar>
        <!-- Logo Title -->
        <q-toolbar-title>
          <router-link to='/admin'>
            法師事務所
          </router-link>
        </q-toolbar-title>

        <!-- user 操作區(576px 以下) -->
        <q-list class='text-h5 text-secondary row xs-show'>
          <q-btn v-if='isLogin && isAdmin' round dense flat icon='fa-solid fa-house' to='/' class="q-mx-xs">
            <q-tooltip transition-show='fade' transition-hide='fade' :offset='[0, 0]'>
              回前台
            </q-tooltip>
          </q-btn>
          <q-btn v-if='isLogin' round dense flat icon='fa-solid fa-right-from-bracket' @click='logout'
            class="q-ml-xs q-mr-sm">
            <q-tooltip transition-show='fade' transition-hide='fade' :offset='[0, 0]'>
              登出
            </q-tooltip>
          </q-btn>
        </q-list>

        <!-- user 操作區(576px 以上) -->
        <q-list class='text-h5 text-secondary md-show'>
          <q-btn v-if='isLogin && isAdmin' round dense flat icon='fa-solid fa-house' to='/' class="q-mx-xs">
            <q-tooltip transition-show='fade' transition-hide='fade' :offset='[0, 0]'>
              回前台
            </q-tooltip>
          </q-btn>
          <q-btn v-if='isLogin' round dense size="md" flat icon='fa-solid fa-right-from-bracket' @click='logout'
            class="q-ml-lg q-mr-lg">
            <q-tooltip transition-show='fade' transition-hide='fade' :offset='[0, 0]'>
              登出
            </q-tooltip>
          </q-btn>
        </q-list>

        <!-- 漢堡 -->
        <q-btn dense flat round @click="burger = !burger" :icon="burger ? 'fa-solid fa-xmark' : 'fa-solid fa-bars'"
          style="transition: 0.5s;">
          <!-- menu -->
          <q-menu square persistent transition-show="jump-down" transition-hide="jump-up" :offset="[0, 8]"
            class="bg-primary text-secondary text-center q-py-sm shadow-10">
            <q-list style="width: 150px">
              <q-item clickable v-ripple dense to='/admin' class="q-py-xs text-h6">
                <q-item-section>管理後台</q-item-section>
              </q-item>
              <q-separator />
              <q-item clickable v-ripple dense to='/admin/adminMember' class="q-py-xs text-h6">
                <q-item-section>會員管理</q-item-section>
              </q-item>
              <q-item clickable v-ripple dense to='/admin/adminCase' class="q-py-xs text-h6">
                <q-item-section>預約管理</q-item-section>
              </q-item>
              <q-item clickable v-ripple dense to='/admin/adminProduct' class="q-py-xs text-h6">
                <q-item-section>商品管理</q-item-section>
              </q-item>
              <q-item clickable v-ripple dense to='/admin/adminOrder' class="q-py-xs text-h6">
                <q-item-section>訂單管理</q-item-section>
              </q-item>
              <q-item clickable v-ripple dense to='/admin/adminArticle' class="q-py-xs text-h6">
                <q-item-section>文章管理</q-item-section>
              </q-item>
              <q-item clickable v-ripple dense to='/admin/adminPromote' class="q-py-xs text-h6">
                <q-item-section>推播管理</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </q-toolbar>
    </q-header>

    <!-- SideBar -->
    <q-drawer elevated v-model='leftDrawerOpen' side='left' :breakpoint='1199' show-if-above :width='250'
      class='bg-primary text-secondary text-center q-py-md q-px-md column justify-center' style='overflow: visible;'>

      <router-link to='/admin' class='col-2 q-pt-lg'>
        <span class='text-h3 master'>法師</span><br>
        <span class='text-h4 firm'>事務所</span>
      </router-link>

      <q-list class='col-4 q-mb-xl'>
        <!-- v-ripple 點擊時有波紋特效 -->
        <q-item clickable v-ripple dense to='/admin' class="q-py-xs text-h5">
          <q-item-section>管理後台</q-item-section>
        </q-item>
        <q-separator class='q-my-lg' />
        <q-item clickable v-ripple dense to='/admin/adminMember' class="q-py-xs text-h6">
          <q-item-section>會員管理</q-item-section>
        </q-item>
        <q-item clickable v-ripple dense to='/admin/adminCase' class="q-py-xs text-h6">
          <q-item-section>預約管理</q-item-section>
        </q-item>
        <q-item clickable v-ripple dense to='/admin/adminProduct' class="q-py-xs text-h6">
          <q-item-section>商品管理</q-item-section>
        </q-item>
        <q-item clickable v-ripple dense to='/admin/adminOrder' class="q-py-xs text-h6">
          <q-item-section>訂單管理</q-item-section>
        </q-item>
        <q-item clickable v-ripple dense to='/admin/adminArticle' class="q-py-xs text-h6">
          <q-item-section>文章管理</q-item-section>
        </q-item>
        <q-item clickable v-ripple dense to='/admin/adminPromote' class="q-py-xs text-h6">
          <q-item-section>推播管理</q-item-section>
        </q-item>
      </q-list>

      <!-- 留白區 -->
      <div class='col-5 justify-end column q-px-md'>
      </div>
      <!-- <q-list class='col-3 text-h5'>
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
      </q-list> -->
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>

  <!-- <q-layout class="text-h1 text-secondary q-pt-xl">
    footer
  </q-layout> -->
</template>

<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/user'

// 漢堡開關
const burger = ref(false)

const leftDrawerOpen = ref(false)

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

const user = useUserStore()
const { logout } = user
const { isLogin, isAdmin, cart } = storeToRefs(user)
</script>
