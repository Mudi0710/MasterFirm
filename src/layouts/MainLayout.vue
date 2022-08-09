<template>
  <q-layout class="bg-dark">
    <q-header class="bg-primary text-secondary lt-xl q-px-md">
      <q-toolbar>
        <q-toolbar-title>
          <router-link to="/">
            法師事務所
          </router-link>
        </q-toolbar-title>
        <!-- 漢堡 -->
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" side="left" :breakpoint="1213" show-if-above :width="150"
      class="bg-primary text-secondary text-center q-py-lg q-px-md column justify-center" style="overflow: visible;">
      <router-link to="/" class="col-2">
        <div class="text-h3 master">法師</div>
        <div class="text-h4">事務所</div>
      </router-link>
      <q-list class="col-5">
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
        <q-expansion-item label="專欄文章" dense>
          <q-item clickable v-ripple dense class="bg-dark justify-center">靈學知識</q-item>
          <q-item clickable v-ripple dense class="bg-dark justify-center">案例分享</q-item>
        </q-expansion-item>
        <q-item clickable v-ripple dense>
          <q-item-section>開運小物</q-item-section>
        </q-item>
        <q-item clickable v-ripple dense>
          <q-item-section>聯絡我們</q-item-section>
        </q-item>
      </q-list>

      <q-list class="col-5 text-h5">
        <q-btn round flat icon="fa-brands fa-square-facebook">
          <q-tooltip transition-show="fade" transition-hide="fade" anchor="center right" self="center left" :offset="[-5, 0]">
            Facebook
          </q-tooltip>
        </q-btn>
        <br>
        <q-btn round flat icon="fa-brands fa-instagram">
          <q-tooltip transition-show="fade" transition-hide="fade" anchor="center right" self="center left" :offset="[-5, 0]">
            Instagram
          </q-tooltip>
        </q-btn>
        <br>
        <q-btn round flat icon="fa-brands fa-line">
          <q-tooltip transition-show="fade" transition-hide="fade" anchor="center right" self="center left" :offset="[-5, 0]">
            Line
          </q-tooltip>
        </q-btn>
        <br>
        <q-btn round flat icon="fa-solid fa-user-plus" to="register">
          <q-tooltip transition-show="fade" transition-hide="fade" anchor="center right" self="center left" :offset="[-5, 0]">
            註冊
          </q-tooltip>
        </q-btn>
        <br>
        <q-btn round flat icon="fa-solid fa-right-to-bracket" to="login">
          <q-tooltip transition-show="fade" transition-hide="fade" anchor="center right" self="center left" :offset="[-5, 0]">
            登入
          </q-tooltip>
        </q-btn>
        <br>
        <q-btn round flat icon="fa-solid fa-address-card" to="#">
          <q-tooltip transition-show="fade" transition-hide="fade" anchor="center right" self="center left" :offset="[-5, 0]">
            會員資料
          </q-tooltip>
        </q-btn>
        <br>
        <q-btn round flat icon="fa-regular fa-calendar-days" to="#">
          <q-tooltip transition-show="fade" transition-hide="fade" anchor="center right" self="center left" :offset="[-5, 0]">
            預約查詢
          </q-tooltip>
        </q-btn>
        <br>
        <q-btn round flat icon="fa-solid fa-receipt" to="#">
          <q-tooltip transition-show="fade" transition-hide="fade" anchor="center right" self="center left" :offset="[-5, 0]">
            訂單查詢
          </q-tooltip>
        </q-btn>
        <br>
        <q-btn round dense flat icon="fa-solid fa-cart-shopping">
          <q-tooltip transition-show="fade" transition-hide="fade" anchor="center right" self="center left" :offset="[-5, 0]">
            購物車
          </q-tooltip>
        </q-btn>
        <br>
        <q-btn round flat icon="fa-solid fa-right-from-bracket">
          <q-tooltip transition-show="fade" transition-hide="fade" anchor="center right" self="center left" :offset="[-5, 0]">
            登出
          </q-tooltip>
        </q-btn>
        <br>
        <!-- <q-fab v-model="fab2" icon="fa-solid fa-user" direction="right" flat q-gutter-lg>
          <q-fab-action flat external-label label-position="top" @click="onClick" icon="fa-solid fa-user-plus" label="註冊" to="register" label-style="background-color: rgba(0,0,0,0);" label-class="text-secondary text-subtitle1" />
          <q-fab-action flat external-label label-position="top" @click="onClick" icon="fa-solid fa-right-to-bracket" label="登入" to="login" label-style="background-color: rgba(0,0,0,0);" label-class="text-secondary text-subtitle1" />
          <q-fab-action flat external-label label-position="top" @click="onClick" icon="fa-solid fa-address-card" label="會員資料" to="#" label-style="background-color: rgba(0,0,0,0);" label-class="text-secondary text-subtitle1" />
          <q-fab-action flat external-label label-position="top" @click="onClick" icon="fa-regular fa-calendar-days" label="預約查詢" to="#" label-style="background-color: rgba(0,0,0,0);" label-class="text-secondary text-subtitle1" />
          <q-fab-action flat external-label label-position="top" @click="onClick" icon="fa-solid fa-receipt" label="訂單查詢" to="#" label-style="background-color: rgba(0,0,0,0);" label-class="text-secondary text-subtitle1" />
          <q-fab-action flat external-label label-position="top" @click="onClick" icon="fa-solid fa-right-from-bracket" label="登出" to="#" label-style="background-color: rgba(0,0,0,0);" label-class="text-secondary text-subtitle1" />
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

const leftDrawerOpen = ref(false)

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

// export default defineComponent({
//   name: 'MainLayout',

//   components: {
//     EssentialLink
//   },

//   setup () {
//     const leftDrawerOpen = ref(false)

//     return {
//       essentialLinks: linksList,
//       leftDrawerOpen,
//       toggleLeftDrawer () {
//         leftDrawerOpen.value = !leftDrawerOpen.value
//       }
//     }
//   }
// })
</script>

<!-- 原始檔 -->
<!-- <template>
  <q-layout>
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />漢堡

        <q-toolbar-title>
          我是標題
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }} 不需要</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
          Essential Links
        </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template> -->

<!-- <script>

import { defineComponent, ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'

const linksList = [
  {
    title: 'Docs',
    caption: 'quasar.dev',
    icon: 'school',
    link: 'https://quasar.dev'
  },
  {
    title: 'Github',
    caption: 'github.com/quasarframework',
    icon: 'code',
    link: 'https://github.com/quasarframework'
  },
  {
    title: 'Discord Chat Channel',
    caption: 'chat.quasar.dev',
    icon: 'chat',
    link: 'https://chat.quasar.dev'
  },
  {
    title: 'Forum',
    caption: 'forum.quasar.dev',
    icon: 'record_voice_over',
    link: 'https://forum.quasar.dev'
  },
  {
    title: 'Twitter',
    caption: '@quasarframework',
    icon: 'rss_feed',
    link: 'https://twitter.quasar.dev'
  },
  {
    title: 'Facebook',
    caption: '@QuasarFramework',
    icon: 'public',
    link: 'https://facebook.quasar.dev'
  },
  {
    title: 'Quasar Awesome',
    caption: 'Community Quasar projects',
    icon: 'favorite',
    link: 'https://awesome.quasar.dev'
  }
]

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  setup () {
    const leftDrawerOpen = ref(false)

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
})
</script> -->
