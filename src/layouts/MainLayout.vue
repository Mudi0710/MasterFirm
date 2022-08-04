<template>
  <q-layout class="bg-dark">
    <q-header class="bg-primary text-secondary lt-xl q-px-sm">
      <q-toolbar>
        <q-toolbar-title>
          法師事務所
        </q-toolbar-title>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />
      </q-toolbar>
    </q-header>

    <q-drawer  v-model="leftDrawerOpen" side="left" :breakpoint="1213" show-if-above mini-to-overlay :width="150" class="bg-primary text-secondary text-center q-py-lg q-px-md column justify-center">
      <a href="#" class="col-2">
        <div class="text-h3 master">法師</div>
        <div class="text-h4">事務所</div>
      </a>
      <q-list class="col-6">
        <!-- v-ripple 點擊時有波紋特效 -->
        <q-item clickable v-ripple>
          <q-item-section>預約諮詢</q-item-section>
        </q-item>
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

      <q-list class="col-4 q-gutter-md text-h5 q-py-xl">
        <q-icon name="fa-brands fa-square-facebook" /><br>
        <q-icon name="fa-brands fa-instagram" /><br>
        <q-icon name="fa-brands fa-line" /><br>
        <q-icon name="fa-solid fa-user" /><br>
        <q-icon name="fa-solid fa-cart-shopping" />
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
