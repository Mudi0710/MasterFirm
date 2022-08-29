<template>
  <q-page>
    <div id="myheader" class="row justify-end items-center" style="width: 100%;">
      <q-list class='text-h5 text-secondary mobile-none'>
        <q-btn v-if='isLogin' round dense flat icon='fa-solid fa-address-card' to='/member' class="q-mx-xs">
          <q-tooltip transition-show='fade' transition-hide='fade' :offset='[0, 0]'>
            會員資料
          </q-tooltip>
        </q-btn>
        <!-- <q-btn v-if='isLogin' round dense flat icon='fa-regular fa-calendar-days' to='/booking' class="q-mx-xs">
          <q-tooltip transition-show='fade' transition-hide='fade' :offset='[0, 0]'>
            預約查詢
          </q-tooltip>
        </q-btn> -->
        <q-btn v-if='isLogin' round dense flat icon='fa-solid fa-receipt' to='/order' class="q-mx-xs">
          <q-tooltip transition-show='fade' transition-hide='fade' :offset='[0, 0]'>
            訂單查詢
          </q-tooltip>
        </q-btn>
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
        <q-btn v-if='!isLogin' round dense flat icon='fa-solid fa-right-to-bracket' to='/login' class="q-ml-xs q-mr-sm">
          <q-tooltip transition-show='fade' transition-hide='fade' :offset='[0, 0]'>
            登入
          </q-tooltip>
        </q-btn>
        <q-btn v-if='isLogin' round dense flat icon='fa-solid fa-right-from-bracket' @click='logout'
          class="q-ml-xl q-mr-md">
          <q-tooltip transition-show='fade' transition-hide='fade' :offset='[0, 0]'>
            登出
          </q-tooltip>
        </q-btn>
      </q-list>
    </div>

    <div id="mycontent" class="col row justify-start">

      <!-- 頁面 Title -->
      <div class="col-12 text-h4 text-xl-h3 text-secondary q-mb-md q-pl-md" style="width: 100%;">案例分享</div>

      <!-- 麵包屑 -->
      <div class="col-12 q-mt-md q-pl-lg" style="width: 100%;">
        <q-breadcrumbs>
          <q-breadcrumbs-el label="首頁" icon="fa-solid fa-house" to="/" />
          <q-breadcrumbs-el label="專欄文章" icon="fa-brands fa-readme" to="/cases" />
          <q-breadcrumbs-el label="案例分享" icon="fa-solid fa-people-group" />
        </q-breadcrumbs>
      </div>

      <!-- 靈學知識區 -->
      <div id="cases-content" class="col-12 row justify-between q-mt-md" style="height: auto;">

        <!-- 左邊圖片 -->
        <div id="cases-img" class="col-12 col-xl-5 q-pa-md" style="height: auto;">
          <q-carousel animated infinite swipeable transition-prev="slide-right" transition-next="slide-left"
            :autoplay="autoplay" arrows navigation v-model="slideMobile" @mouseenter="autoplay = false"
            @mouseleave="autoplay = true" class="desktop-none">
            <q-carousel-slide
              v-for="(casesImageMobile, idx) in carousels.length > 0 ? carousels[0]?.casesImageMobile : ''"
              :key="casesImageMobile" :name="idx + 1" :img-src="casesImageMobile" />
          </q-carousel>
          <q-carousel animated infinite swipeable transition-prev="slide-right" transition-next="slide-left"
            :autoplay="autoplay" arrows navigation v-model="slideDesktop" @mouseenter="autoplay = false"
            @mouseleave="autoplay = true" class="mobile-none">
            <q-carousel-slide
              v-for="(casesImageDesktop, idx) in carousels.length > 0 ? carousels[0]?.casesImageDesktop : ''"
              :key="casesImageDesktop" :name="idx + 1" :img-src="casesImageDesktop" />
          </q-carousel>
        </div>

        <!-- <pre class="text-secondary">{{ introduction[0].image }}</pre> -->
        <!-- 右邊表格 -->
        <div class="col-12 col-xl-7 q-pa-md">

          <q-table :columns="columns" :rows="cases" square dense wrap-cells :filter="filter" :loading="loading"
            :pagination="paginationCases" rows-per-page-label="每頁顯示筆數" no-data-label="目前沒有新增任何案例分享"
            no-results-label="Oops...找不到該筆案例分享" class="row bg-transparent no-shadow">

            <!-- 文章搜尋 -->
            <template v-slot:top-right>
              <q-input borderless dense debounce="300" v-model="filter" placeholder="&nbsp;Search" class="search">
                <template v-slot:append>
                  <q-icon name="search" />
                </template>
              </q-input>
            </template>

            <!-- 自定義表頭 -->
            <template v-slot:header="props">
              <q-tr :props="props" class="col-auto">
                <div>
                  <marquee class="text-subtitle1 spacing-h6 text-accent">{{ marquees.length > 0 ?
                  marquees[0]?.casesMarquee : ''
                  }}</marquee>
                </div>
              </q-tr>
            </template>

            <!-- 自定義表格內容 -->
            <template v-slot:body="props">
              <!-- <pre>{{ props.row.title }}</pre> -->
              <q-tr :props="props" class="col-auto row no-wrap q-mb-sm" style="min-height: 130px;height: auto;">
                <!-- 前端裝飾線 -->
                <div class="col-auto row q-mt-md q-mr-lg">
                  <div class="bg-accent" style="width: 10px;height: 70px;"></div>
                </div>
                <!-- 案例分享區 -->
                <div class="col">
                  <!-- 文章日期 -->
                  <div class="text-subtitle1 spacing-h6 q-my-sm">{{ new Date(props.row.date).toLocaleDateString() }}
                  </div>
                  <!-- 文章標題 -->
                  <div class="text-h6 spacing-h7 q-mt-md q-pr-lg text-wrap">{{
                  props.row.title
                  }}
                  </div>
                  <!-- 文章連結 -->
                  <div class="text-right q-pr-lg q-mb-sm">
                    <router-link class="spacing-h5" :to="'/case/' + props.row._id" :news="news">&lt;繼續閱讀&gt;
                    </router-link>
                  </div>
                  <q-separator color="accent" inset />
                </div>
                <!-- style="font-size: calc(14px + 0.1vw);" -->
                <!-- <div v-html="props.row.content"></div> -->
              </q-tr>
            </template>

            <!-- 表格底端分頁選項 -->
            <template v-slot:pagination="scope">
              <q-btn v-if="scope.pagesNumber > 1" icon="first_page" color="secondary" round dense flat
                :disable="scope.isFirstPage" @click="scope.firstPage" />

              <q-btn icon="chevron_left" color="secondary" round dense flat :disable="scope.isFirstPage"
                @click="scope.prevPage" />

              <q-btn icon="chevron_right" color="secondary" round dense flat :disable="scope.isLastPage"
                @click="scope.nextPage" />

              <q-btn v-if="scope.pagesNumber > 1" icon="last_page" color="secondary" round dense flat
                :disable="scope.isLastPage" @click="scope.lastPage" />
            </template>

            <!-- 找不到資料的訊息 -->
            <template v-slot:no-data="{ message }">
              <div class="full-width row flex-center text-accent q-gutter-sm">
                <span>
                  {{ message }}
                </span>
              </div>
            </template>

            <!-- loading 效果 -->
            <!-- QInnerLoading必须是其父元素内部的最后一个元素，以便它可以显示在其他内容的顶部。 -->
            <template v-slot:loading>
              <q-inner-loading showing dark transition-show="fade" color="primary" />
            </template>

          </q-table>
        </div>

      </div>

    </div>
  </q-page>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { api } from '@/boot/axios'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/user'
import Swal from 'sweetalert2'

const user = useUserStore()
const { logout } = user
const { isLogin, isAdmin, cart } = storeToRefs(user)

// 輪播圖
const slideMobile = ref(1)
const slideDesktop = ref(1)
const autoplay = ref(true)

// 最新消息陣列
const cases = reactive([])
// 輪播圖片陣列
const carousels = reactive([])
// 跑馬燈陣列
const marquees = reactive([])

// 分頁選項
const paginationCases = reactive({
  items: [], // table要顯示的資料
  page: 1, // 目前第幾頁
  rowsPerPage: 5 // 每頁幾筆，0 代表 All
})

const loading = ref(false)

const columns = [
  { name: 'date', label: '發布日期', field: row => row.date, align: 'center' },
  { name: 'title', label: '消息標題', field: row => row.title, align: 'center' },
  { name: 'content', label: '消息內容', field: row => row.content, align: 'left' }
]

// 抓資料庫本所簡介的資料
const initCases = async () => {
  try {
    const { data } = await api.get('/cases')
    cases.push(...data.result)
    cases.reverse()
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: '失敗',
      text: error.isAxiosError ? error.response.data.message : error.message
    })
  }
}
initCases()
// 抓資料庫輪播圖的資料
const initCarousels = async () => {
  try {
    const { data } = await api.get('/carousels/')
    carousels.push(...data.result)
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: '失敗',
      text: error.isAxiosError ? error.response.data.message : error.message
    })
  }
}
initCarousels()
// 抓資料庫跑馬燈的資料
const initmarquees = async () => {
  try {
    const { data } = await api.get('/marquees/')
    marquees.push(...data.result)
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: '失敗',
      text: error.isAxiosError ? error.response.data.message : error.message
    })
  }
}
initmarquees()

</script>
