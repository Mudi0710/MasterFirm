<template>
  <q-layout>
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

    <q-drawer v-model='leftDrawerOpen' side='left' :breakpoint='1199' show-if-above :width='150'
      class='bg-primary text-secondary text-center q-py-md q-px-md column justify-center' style='overflow: visible;'>

      <router-link to='/' class='col-2'>
        <span class='text-h3 master'>法師</span>
        <span class='text-h4 firm'>事務所</span>
      </router-link>

      <q-list class='col-4 q-mb-xl'>
        <!-- v-ripple 點擊時有波紋特效 -->
        <q-item clickable v-ripple dense to='/appointment'>
          <q-item-section>預約諮詢</q-item-section>
        </q-item>
        <q-separator />
        <q-item clickable v-ripple dense to='/introduction'>
          <q-item-section>本所簡介</q-item-section>
        </q-item>
        <q-item clickable v-ripple dense to='/news'>
          <q-item-section>最新消息</q-item-section>
        </q-item>
        <q-item clickable v-ripple dense to='/services'>
          <q-item-section>服務項目</q-item-section>
        </q-item>
        <q-expansion-item label='專欄文章' dense>
          <q-item clickable v-ripple dense class='bg-dark justify-center' to='/knowledges'>靈學知識</q-item>
          <q-item clickable v-ripple dense class='bg-dark justify-center' to='/cases'>案例分享</q-item>
        </q-expansion-item>
        <!-- <q-expansion-item label='專欄文章' dense v-model='expanded' @mouseleave='hide' @mouseover='show' to=''>
          <q-item clickable v-ripple dense class='bg-dark justify-center' to=''>靈學知識</q-item>
          <q-item clickable v-ripple dense class='bg-dark justify-center' to=''>案例分享</q-item>
        </q-expansion-item> -->
        <q-item clickable v-ripple dense to='/products'>
          <q-item-section>開運小物</q-item-section>
        </q-item>
        <q-item clickable v-ripple dense to='/content'>
          <q-item-section>聯絡我們</q-item-section>
        </q-item>
      </q-list>

      <div class='col-5 row q-px-md'>
        <q-list class='col-6 text-h5'>
          <q-btn round dense flat icon='fa-brands fa-square-facebook' to='#'></q-btn>
          <br>
          <q-btn round dense flat icon='fa-brands fa-instagram' to='#'></q-btn>
          <br>
          <q-btn round dense flat icon='fa-brands fa-line' to='#'></q-btn>
        </q-list>

        <q-list class='col-6 text-h5'>
          <q-btn v-if='isLogin' round dense flat icon='fa-solid fa-address-card' to='member'>
            <q-tooltip transition-show='fade' transition-hide='fade' anchor='center right' self='center left'
              :offset='[-5, 0]'>
              會員資料
            </q-tooltip>
          </q-btn>
          <br v-if='isLogin'>
          <q-btn v-if='isLogin' round dense flat icon='fa-regular fa-calendar-days' to='booking'>
            <q-tooltip transition-show='fade' transition-hide='fade' anchor='center right' self='center left'
              :offset='[-5, 0]'>
              預約查詢
            </q-tooltip>
          </q-btn>
          <br v-if='isLogin'>
          <q-btn v-if='isLogin' round dense flat icon='fa-solid fa-receipt' to='order'>
            <q-tooltip transition-show='fade' transition-hide='fade' anchor='center right' self='center left'
              :offset='[-5, 0]'>
              訂單查詢
            </q-tooltip>
          </q-btn>
          <br v-if='isLogin'>
          <q-btn v-if='isLogin' round dense flat icon='fa-solid fa-cart-shopping' to='cart'>
            <q-tooltip transition-show='fade' transition-hide='fade' anchor='center right' self='center left'
              :offset='[-5, 0]'>
              購物車
            </q-tooltip>
            <q-badge v-if='cart > 0' floating color='red' rounded>{{ cart }}</q-badge>
          </q-btn>
          <br v-if='isLogin'>
          <q-btn v-if='isLogin && isAdmin' round dense flat icon='fa-solid fa-user-gear' to='/admin'>
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
import { ref, createApp } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/user'

const leftDrawerOpen = ref(false)
// const expanded = ref(false)

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

// const QExpansionItem = createApp({
//   el: '.q-expansion-item',
//   data: function () {
//     return {
//       expanded: false
//     }
//   },
//   methods: {
//     show: function () {
//       this.expanded = false
//     },
//     hide: function () {
//       this.expanded = false
//     }
//   }
// })
// https://www.itxst.com/ant-design-vue/ajf3uamq.html
// http://www.quasarchs.com/vue-components/expansion-item/

const user = useUserStore()
const { logout } = user
const { isLogin, isAdmin, cart } = storeToRefs(user)
</script>
