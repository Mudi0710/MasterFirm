<template>
  <q-layout>
    <q-header class='bg-primary text-secondary q-px-md desktop-none shadow-10'>
      <q-toolbar>
        <!-- Logo Title -->
        <q-toolbar-title>
          <router-link to='/'>
            法師事務所
          </router-link>
        </q-toolbar-title>

        <!-- user 操作區(576px 以下) -->
        <q-list class='text-h5 text-secondary row xs-show'>
          <q-fab v-if='isLogin' flat unelevated padding="xs" icon="fa-solid fa-user" direction="down right">
            <q-fab-action v-if='isLogin' padding="sm" icon='fa-solid fa-address-card' to='/member' />
            <q-fab-action v-if='isLogin' padding="sm" color="primary" text-color="secondary"
              icon='fa-regular fa-calendar-days' to='/booking' />
            <q-fab-action v-if='isLogin' padding="sm" color="primary" text-color="secondary" icon='fa-solid fa-receipt'
              to='/order' />
          </q-fab>
          <q-btn v-if='isLogin' round dense flat icon='fa-solid fa-cart-shopping' to='/cart' class="q-mx-xs">
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
          <q-btn v-if='!isLogin' round dense flat icon='fa-solid fa-user-plus' to='/register' class="q-mx-xs">
            <q-tooltip transition-show='fade' transition-hide='fade' :offset='[0, 0]'>
              註冊
            </q-tooltip>
          </q-btn>
          <q-btn v-if='!isLogin' round dense flat icon='fa-solid fa-right-to-bracket' to='/login'
            class="q-ml-xs q-mr-lg">
            <q-tooltip transition-show='fade' transition-hide='fade' :offset='[0, 0]'>
              登入
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
          <q-btn v-if='isLogin' round dense flat size="md" icon='fa-solid fa-address-card' to='/member' class="q-mx-xs">
            <q-tooltip transition-show='fade' transition-hide='fade' :offset='[0, 0]'>
              會員資料
            </q-tooltip>
          </q-btn>
          <q-btn v-if='isLogin' round dense flat size="md" icon='fa-regular fa-calendar-days' to='/booking'
            class="q-mx-xs">
            <q-tooltip transition-show='fade' transition-hide='fade' :offset='[0, 0]'>
              預約查詢
            </q-tooltip>
          </q-btn>
          <q-btn v-if='isLogin' round dense flat size="md" icon='fa-solid fa-receipt' to='/order' class="q-mx-xs">
            <q-tooltip transition-show='fade' transition-hide='fade' :offset='[0, 0]'>
              訂單查詢
            </q-tooltip>
          </q-btn>
          <q-btn v-if='isLogin' round dense flat size="md" icon='fa-solid fa-cart-shopping' to='/cart' class="q-mx-xs">
            <q-tooltip transition-show='fade' transition-hide='fade' :offset='[0, 0]'>
              購物車
            </q-tooltip>
            <q-badge v-if='cart > 0' floating color='red' rounded>{{ cart }}</q-badge>
          </q-btn>
          <q-btn v-if='isLogin && isAdmin' round dense flat size="md" icon='fa-solid fa-user-gear' to='/admin' class="q-mx-xs">
            <q-tooltip transition-show='fade' transition-hide='fade' :offset='[0, 0]'>
              管理後台
            </q-tooltip>
          </q-btn>
          <q-btn v-if='!isLogin' round dense flat size="md" icon='fa-solid fa-user-plus' to='/register' class="q-mx-xs">
            <q-tooltip transition-show='fade' transition-hide='fade' :offset='[0, 0]'>
              註冊
            </q-tooltip>
          </q-btn>
          <q-btn v-if='!isLogin' round dense flat size="md" icon='fa-solid fa-right-to-bracket' to='/login'
            class="q-ml-xs q-mr-lg">
            <q-tooltip transition-show='fade' transition-hide='fade' :offset='[0, 0]'>
              登入
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
        <q-btn dense flat round icon="fa-solid fa-bars" style="transition: 0.5s;">
          <!-- menu -->
          <q-menu square auto-close transition-show="jump-down" transition-hide="jump-up" :offset="[0, 8]"
            class="bg-primary text-secondary text-center q-py-sm shadow-10">
            <q-list style="width: 150px">
              <q-item clickable v-ripple dense to='/appointment' class="q-py-xs text-h6">
                <q-item-section>預約諮詢</q-item-section>
              </q-item>
              <q-separator />
              <q-item clickable v-ripple dense to='/introduction' class="q-py-xs text-h6">
                <q-item-section>本所簡介</q-item-section>
              </q-item>
              <q-item clickable v-ripple dense to='/news' class="q-py-xs text-h6">
                <q-item-section>最新消息</q-item-section>
              </q-item>
              <q-item clickable v-ripple dense to='/services' class="q-py-xs text-h6">
                <q-item-section>服務項目</q-item-section>
              </q-item>
              <q-item clickable v-ripple dense to='/knowledges' class="q-py-xs text-h6">
                <q-item-section>靈學知識</q-item-section>
              </q-item>
              <q-item clickable v-ripple dense to='/cases' class="q-py-xs text-h6">
                <q-item-section>案例分享</q-item-section>
              </q-item>
              <q-item clickable v-ripple dense to='/products' class="q-py-xs text-h6">
                <q-item-section>開運小物</q-item-section>
              </q-item>
              <q-item clickable v-ripple dense to='/content' class="q-py-xs text-h6">
                <q-item-section>聯絡我們</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </q-toolbar>
    </q-header>

    <!-- SideBar -->
    <q-drawer elevated side='left' :breakpoint='1213' show-if-above no-swipe-open :width='250'
      class='bg-primary text-secondary text-center q-py-md q-px-md column justify-start' style='overflow: visible;'>
    <!-- <q-drawer elevated v-model='leftDrawerOpen' side='left' :breakpoint='1213' show-if-above :width='250'
      class='bg-primary text-secondary text-center q-py-md q-px-md column justify-start mobile-none' style='overflow: visible;'> -->

      <!-- Logo 區 -->
      <router-link to='/' class='col-2 q-pt-md q-mb-xl' style="height: auto;">
        <span class='master'>法師</span><br>
        <span class='firm'>事務所</span>
      </router-link>

      <!-- 選單區 -->
      <div class="col column q-mt-xs justify-between">
        <q-list class='col-auto list'>
          <!-- v-ripple 點擊時有波紋特效 -->
          <q-item clickable v-ripple dense to='/appointment' class="q-py-xs">
            <q-item-section>預約諮詢</q-item-section>
          </q-item>
          <q-separator />
          <q-item clickable v-ripple dense to='/introduction' class="q-py-xs">
            <q-item-section>本所簡介</q-item-section>
          </q-item>
          <q-item clickable v-ripple dense to='/news' class="q-py-xs">
            <q-item-section>最新消息</q-item-section>
          </q-item>
          <q-item clickable v-ripple dense to='/services' class="q-py-xs">
            <q-item-section>服務項目</q-item-section>
          </q-item>
          <q-expansion-item label='專欄文章' dense class="q-py-xs">
            <q-item clickable v-ripple dense class='bg-dark justify-center' to='/knowledges'>靈學知識</q-item>
            <q-item clickable v-ripple dense class='bg-dark justify-center' to='/cases'>案例分享</q-item>
          </q-expansion-item>
          <q-item clickable v-ripple dense to='/products' class="q-py-xs">
            <q-item-section>開運小物</q-item-section>
          </q-item>
          <q-item clickable v-ripple dense to='/content' class="q-py-xs">
            <q-item-section>聯絡我們</q-item-section>
          </q-item>
        </q-list>

        <!-- 社群區 -->
        <q-list class='col-auto row justify-center content-end q-px-md social'>
          <q-btn round dense flat icon='fa-brands fa-square-facebook' to='#'></q-btn>
          <q-btn round dense flat icon='fa-brands fa-instagram' to='#'></q-btn>
          <q-btn round dense flat icon='fa-brands fa-line' to='#'></q-btn>
        </q-list>

      </div>
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
import { ref, reactive, createApp } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/user'

const fabPos = ref([18, 18])
const draggingFab = ref(false)
const moveFab = reactive((touchstart) => {
  // draggingFab.value = ev.isFirst !== true && ev.isFinal !== true

  fabPos.value = [
    fabPos.value[0] - touchstart.delta.x,
    fabPos.value[1] - touchstart.delta.y
  ]
})

const user = useUserStore()
const { logout } = user
const { isLogin, isAdmin, cart } = storeToRefs(user)
</script>
