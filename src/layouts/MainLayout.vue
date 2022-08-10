<template>
  <q-layout class='bg-dark'>
    <q-header class='bg-primary text-secondary lt-xl q-px-md'>
      <q-toolbar>
        <q-toolbar-title>
          <router-link to='/'>
            法師事務所
          </router-link>
        </q-toolbar-title>
        <!-- 漢堡 -->
        <q-btn dense flat round icon='menu' @click='toggleLeftDrawer' />
      </q-toolbar>
    </q-header>

    <q-drawer v-model='leftDrawerOpen' side='left' :breakpoint='1213' show-if-above :width='150'
      class='bg-primary text-secondary text-center q-py-lg q-px-md column justify-center' style='overflow: visible;'>

      <router-link to='/' class='col-2'>
        <div class='text-h3 master'>法師</div>
        <div class='text-h4'>事務所</div>
      </router-link>

      <q-list class='col-3 q-mb-xl'>
        <!-- v-ripple 點擊時有波紋特效 -->
        <q-item clickable v-ripple dense>
          <q-item-section>預約諮詢</q-item-section>
        </q-item>
        <q-separator />
        <q-item clickable v-ripple dense>
          <q-item-section>本所簡介</q-item-section>
        </q-item>
        <q-item clickable v-ripple dense>
          <q-item-section>最新消息</q-item-section>
        </q-item>
        <q-item clickable v-ripple dense>
          <q-item-section>服務項目</q-item-section>
        </q-item>
        <q-expansion-item label='專欄文章' dense>
          <q-item clickable v-ripple dense class='bg-dark justify-center'>靈學知識</q-item>
          <q-item clickable v-ripple dense class='bg-dark justify-center'>案例分享</q-item>
        </q-expansion-item>
        <q-item clickable v-ripple dense>
          <q-item-section>開運小物</q-item-section>
        </q-item>
        <q-item clickable v-ripple dense>
          <q-item-section>聯絡我們</q-item-section>
        </q-item>
      </q-list>

      <q-list class='col-2 text-h5'>
        <q-btn round dense flat icon='fa-brands fa-square-facebook' to='#'>
          <q-tooltip transition-show='fade' transition-hide='fade' anchor='center right' self='center left'
            :offset='[-5, 0]'>
            Facebook
          </q-tooltip>
        </q-btn>
        <br>
        <q-btn round dense flat icon='fa-brands fa-instagram' to='#'>
          <q-tooltip transition-show='fade' transition-hide='fade' anchor='center right' self='center left'
            :offset='[-5, 0]'>
            Instagram
          </q-tooltip>
        </q-btn>
        <br>
        <q-btn round dense flat icon='fa-brands fa-line' to='#'>
          <q-tooltip transition-show='fade' transition-hide='fade' anchor='center right' self='center left'
            :offset='[-5, 0]'>
            Line
          </q-tooltip>
        </q-btn>
      </q-list>

      <q-list class='col-4 text-h5 q-mt-sm'>
        <q-btn v-if='isLogin' round dense flat icon='fa-solid fa-address-card' to='#'>
          <q-tooltip transition-show='fade' transition-hide='fade' anchor='center right' self='center left'
            :offset='[-5, 0]'>
            會員資料
          </q-tooltip>
        </q-btn>
        <br v-if='isLogin'>
        <q-btn v-if='isLogin' round dense flat icon='fa-regular fa-calendar-days' to='#'>
          <q-tooltip transition-show='fade' transition-hide='fade' anchor='center right' self='center left'
            :offset='[-5, 0]'>
            預約查詢
          </q-tooltip>
        </q-btn>
        <br v-if='isLogin'>
        <q-btn v-if='isLogin' round dense flat icon='fa-solid fa-receipt' to='#'>
          <q-tooltip transition-show='fade' transition-hide='fade' anchor='center right' self='center left'
            :offset='[-5, 0]'>
            訂單查詢
          </q-tooltip>
        </q-btn>
        <br v-if='isLogin'>
        <q-btn v-if='isLogin' round dense flat icon='fa-solid fa-cart-shopping'>
          <q-tooltip transition-show='fade' transition-hide='fade' anchor='center right' self='center left'
            :offset='[-5, 0]'>
            購物車
          </q-tooltip>
        </q-btn>
        <br v-if='isLogin'>
        <q-btn v-if='isLogin && isAdmin' round dense flat icon='fa-solid fa-wrench'>
          <q-tooltip transition-show='fade' transition-hide='fade' anchor='center right' self='center left'
            :offset='[-5, 0]'>
            管理後台
          </q-tooltip>
        </q-btn>
        <br v-if='isLogin && isAdmin'>
        <q-btn v-if='!isLogin' round dense flat icon='fa-solid fa-user-plus' to='register'>
          <q-tooltip transition-show='fade' transition-hide='fade' anchor='center right' self='center left'
            :offset='[-5, 0]'>
            註冊
          </q-tooltip>
        </q-btn>
        <br v-if='!isLogin'>
        <q-btn v-if='!isLogin' round dense flat icon='fa-solid fa-right-to-bracket' to='login'>
          <q-tooltip transition-show='fade' transition-hide='fade' anchor='center right' self='center left'
            :offset='[-5, 0]'>
            登入
          </q-tooltip>
        </q-btn>
        <br v-if='isLogin'>
        <q-btn v-if='isLogin' round dense flat icon='fa-solid fa-right-from-bracket'>
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
