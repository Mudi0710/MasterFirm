<template>
  <q-page class='column'>
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
    <div id='mycontent' class=''>
      <div class='row justify-between'>
        <div class='col-auto text-h3 text-secondary q-my-sm'>文章管理</div>
      </div>

      <!-- 輪播圖片管理區 -->
      <div class="q-pa-md">
        <!-- 輪播圖片輪播圖片輪播圖片輪播圖片輪播圖片輪播圖片輪播圖片輪播圖片輪播圖片輪播圖片輪播圖片輪播圖片輪播圖片輪播圖片輪播圖片輪播圖片 -->
        <div class="bg-accent text-h5 text-dark q-my-sm" style="height:1px;"></div>
        <div class="text-h5 text-accent q-my-sm" style="height:40px; line-height: 1.6em;">輪播圖片</div>
        <q-table :grid="$q.screen.lt.xl" :columns="columnsCarousels" :rows="carousels" row-key="date" separator="cell"
          square bordered wrap-cells dense :filter="filter" :loading="loading" :pagination="paginationCarousels"
          rows-per-page-label="每頁顯示筆數" no-data-label="目前沒有新增任何輪播圖片" no-results-label="Oops...找不到該筆輪播圖片"
          class="bg-transparent">

          <!-- 新增輪播圖片按鈕 -->
          <template v-slot:top-left>
            <q-btn @click="openCarouselsDialog('', -1)" square flat :disable="carousels.length > 0"
              class='col-auto q-mr-xl bg-secondary text-dark text-body1 q-my-sm createBtn'>新增輪播圖片</q-btn>
          </template>

          <!-- 輪播圖片搜尋 -->
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
              <!-- <div>
                <marquee class="text-subtitle1 spacing-h6 text-accent">歡迎來我們這一家，充滿歡樂的這一家</marquee>
              </div> -->
            </q-tr>
          </template>

          <!-- 自定義內容 -->
          <template v-slot:body="props">
            <!-- <pre>{{ props }}</pre> -->
            <q-tr :props="props" class="col-auto row" style="min-height: 130px;height: auto;">
              <!-- 操作區 -->
              <div class="col-12 row justify-end q-mb-md">
                <q-btn class="col-auto q-mx-sm q-my-xs" @click='openCarouselsDialog(props.row._id, props.rowIndex)'
                  outline>
                  修改圖片</q-btn>
                <q-btn class="col-auto q-mx-sm q-my-xs" @click='openDeleteCarouselsDialog(props.row._id)' outline>
                  刪除圖片</q-btn>
              </div>
              <!-- 首頁輪播圖（ 手機版 - 橫 ） -->
              <q-separator color="accent" inset />
              <div class="col-12 row">
                <div class="col-12 text-h6 text-accent q-mb-sm q-pl-sm">首頁輪播圖（ 手機版 - 橫 ）</div>
                <div v-for="(indexImageMobile, idx) in props.row.indexImageMobile" :key="indexImageMobile"
                  style="width: auto;">
                  <img :src="props.row.indexImageMobile[idx]" class="q-mx-md"
                    style="width: 200px;height: 150px; object-fit: cover;" :ratio="4 / 3">
                </div>
                <q-separator color="accent" inset />
              </div>
              <!-- 首頁輪播圖（ 手機版 - 橫 ） -->
              <div class="col-12 row">
                <div class="col-12 text-h6 text-accent q-mb-sm q-pl-sm">首頁輪播圖（ 電腦版 - 直 ）</div>
                <div v-for="(indexImageDesktop, idx) in props.row.indexImageDesktop" :key="indexImageDesktop"
                  style="width: auto;">
                  <img :src="props.row.indexImageDesktop[idx]" class="q-mx-md"
                    style="width: 150px;height: 200px; object-fit: cover;" :ratio="3 / 4">
                </div>
              </div>
              <!-- 最新消息輪播圖（ 手機版 - 橫 ） -->
              <q-separator color="accent" inset />
              <div class="col-12 row">
                <div class="col-12 text-h6 text-accent q-mb-sm q-pl-sm">最新消息輪播圖（ 手機版 - 橫 ）</div>
                <div v-for="(newsImageMobile, idx) in props.row.newsImageMobile" :key="newsImageMobile"
                  style="width: auto;">
                  <img :src="props.row.newsImageMobile[idx]" class="q-mx-md"
                    style="width: 200px;height: 150px; object-fit: cover;" :ratio="4 / 3">
                </div>
              </div>
              <!-- 最新消息輪播圖（ 手機版 - 橫 ） -->
              <q-separator color="accent" inset />
              <div class="col-12 row">
                <div class="col-12 text-h6 text-accent q-mb-sm q-pl-sm">最新消息輪播圖（ 電腦版 - 直 ）</div>
                <div v-for="(newsImageDesktop, idx) in props.row.newsImageDesktop" :key="newsImageDesktop"
                  style="width: auto;">
                  <img :src="props.row.newsImageDesktop[idx]" class="q-mx-md"
                    style="width: 150px;height: 200px; object-fit: cover;" :ratio="3 / 4">
                </div>
              </div>
              <!-- 靈學知識輪播圖（ 手機版 - 橫 ） -->
              <q-separator color="accent" inset />
              <div class="col-12 row">
                <div class="col-12 text-h6 text-accent q-mb-sm q-pl-sm">靈學知識輪播圖（ 手機版 - 橫 ）</div>
                <div v-for="(knowledgesImageMobile, idx) in props.row.knowledgesImageMobile"
                  :key="knowledgesImageMobile" style="width: auto;">
                  <img :src="props.row.knowledgesImageMobile[idx]" class="q-mx-md"
                    style="width: 200px;height: 150px; object-fit: cover;" :ratio="4 / 3">
                </div>
              </div>
              <!-- 靈學知識輪播圖（ 手機版 - 橫 ） -->
              <q-separator color="accent" inset />
              <div class="col-12 row">
                <div class="col-12 text-h6 text-accent q-mb-sm q-pl-sm">靈學知識輪播圖（ 電腦版 - 直 ）</div>
                <div v-for="(knowledgesImageDesktop, idx) in props.row.knowledgesImageDesktop"
                  :key="knowledgesImageDesktop" style="width: auto;">
                  <img :src="props.row.knowledgesImageDesktop[idx]" class="q-mx-md"
                    style="width: 150px;height: 200px; object-fit: cover;" :ratio="3 / 4">
                </div>
              </div>
              <!-- 案例分享輪播圖（ 手機版 - 橫 ） -->
              <q-separator color="accent" inset />
              <div class="col-12 row">
                <div class="col-12 text-h6 text-accent q-mb-sm q-pl-sm">案例分享輪播圖（ 手機版 - 橫 ）</div>
                <div v-for="(casesImageMobile, idx) in props.row.casesImageMobile" :key="casesImageMobile"
                  style="width: auto;">
                  <img :src="props.row.casesImageMobile[idx]" class="q-mx-md"
                    style="width: 200px;height: 150px; object-fit: cover;" :ratio="4 / 3">
                </div>
              </div>
              <!-- 案例分享輪播圖（ 手機版 - 橫 ） -->
              <q-separator color="accent" inset />
              <div class="col-12 row">
                <div class="col-12 text-h6 text-accent q-mb-sm q-pl-sm">案例分享輪播圖（ 電腦版 - 直 ）</div>
                <div v-for="(casesImageDesktop, idx) in props.row.casesImageDesktop" :key="casesImageDesktop"
                  style="width: auto;">
                  <img :src="props.row.casesImageDesktop[idx]" class="q-mx-md"
                    style="width: 150px;height: 200px; object-fit: cover;" :ratio="3 / 4">
                </div>
              </div>
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

          <!-- RWD 卡片 -->
          <template v-slot:item="card">
            <!-- <pre>{{ card }}</pre> -->
            <div class="col-12 q-pa-sm cursor-pointer ">
              <q-card square bordered class="bg-primary shadow" style="width: 100%;">
                <div v-for="col in card.cols" :key="col.name" class="q-pa-sm">
                  <!-- 圖片編輯 -->
                  <div v-if="col.name === 'edit'" class="row justify-start">
                    <!-- <pre>{{ card.rowIndex }}</pre> -->
                    <div class="col-12 row justify-between">
                      <span class="text-h6 text-accent q-pl-sm">{{ col.label }}：</span>
                      <q-btn class="col-auto text-secondary" style="font-size: xx-small; padding: 0px 8px;"
                        @click='openCarouselsDialog(card.row._id, card.rowIndex)' outline>修改圖片</q-btn>
                    </div>
                    <div class="col-12 row justify-end q-mt-sm">
                      <q-btn class="col-auto text-secondary" style="font-size: xx-small; padding: 0px 8px;"
                        @click='openDeleteCarouselsDialog(card.row._id)' outline>刪除圖片</q-btn>
                    </div>
                  </div>

                  <!-- 首頁輪播圖（ 手機版 - 橫 ） -->
                  <div v-if="col.name === 'indexImageMobile'" class="row justify-between">
                    <div class="col-12 row">
                      <div class="col-12 text-h6 text-accent q-mb-sm q-pl-sm">首頁輪播圖（ 手機版 - 橫 ）</div>
                      <div v-for="(value, idx) in col.value" :key="value" style="width: auto;">
                        <img :src="col.value[idx]" class="col-12 q-mx-md"
                          style="width: 200px;height: 150px; object-fit: cover;" :ratio="4 / 3">
                      </div>
                    </div>
                  </div>
                  <!-- 首頁輪播圖（ 電腦版 - 橫 ） -->
                  <div v-if="col.name === 'indexImageDesktop'" class="row justify-between">
                    <div class="col-12 row">
                      <div class="col-12 text-h6 text-accent q-mb-sm q-pl-sm">首頁輪播圖（ 手機版 - 橫 ）</div>
                      <div v-for="(value, idx) in col.value" :key="value" style="width: auto;">
                        <img :src="col.value[idx]" class="col-12 q-mx-md"
                          style="width: 150px;height: 200px; object-fit: cover;" :ratio="3 / 4">
                      </div>
                    </div>
                  </div>
                  <!-- 最新消息輪播圖（ 手機版 - 橫 ） -->
                  <div v-if="col.name === 'newsImageMobile'" class="row justify-between">
                    <div class="col-12 row">
                      <div class="col-12 text-h6 text-accent q-mb-sm q-pl-sm">最新消息輪播圖（ 手機版 - 橫 ）</div>
                      <div v-for="(value, idx) in col.value" :key="value" style="width: auto;">
                        <img :src="col.value[idx]" class="col-12 q-mx-md"
                          style="width: 200px;height: 150px; object-fit: cover;" :ratio="4 / 3">
                      </div>
                    </div>
                  </div>
                  <!-- 最新消息輪播圖（ 電腦版 - 橫 ） -->
                  <div v-if="col.name === 'newsImageDesktop'" class="row justify-between">
                    <div class="col-12 row">
                      <div class="col-12 text-h6 text-accent q-mb-sm q-pl-sm">最新消息輪播圖（ 手機版 - 橫 ）</div>
                      <div v-for="(value, idx) in col.value" :key="value" style="width: auto;">
                        <img :src="col.value[idx]" class="col-12 q-mx-md"
                          style="width: 150px;height: 200px; object-fit: cover;" :ratio="3 / 4">
                      </div>
                    </div>
                  </div>
                  <!-- 靈學知識輪播圖（ 手機版 - 橫 ） -->
                  <div v-if="col.name === 'knowledgesImageMobile'" class="row justify-between">
                    <div class="col-12 row">
                      <div class="col-12 text-h6 text-accent q-mb-sm q-pl-sm">靈學知識輪播圖（ 手機版 - 橫 ）</div>
                      <div v-for="(value, idx) in col.value" :key="value" style="width: auto;">
                        <img :src="col.value[idx]" class="col-12 q-mx-md"
                          style="width: 200px;height: 150px; object-fit: cover;" :ratio="4 / 3">
                      </div>
                    </div>
                  </div>
                  <!-- 靈學知識輪播圖（ 電腦版 - 橫 ） -->
                  <div v-if="col.name === 'knowledgesImageDesktop'" class="row justify-between">
                    <div class="col-12 row">
                      <div class="col-12 text-h6 text-accent q-mb-sm q-pl-sm">靈學知識輪播圖（ 手機版 - 橫 ）</div>
                      <div v-for="(value, idx) in col.value" :key="value" style="width: auto;">
                        <img :src="col.value[idx]" class="col-12 q-mx-md"
                          style="width: 150px;height: 200px; object-fit: cover;" :ratio="3 / 4">
                      </div>
                    </div>
                  </div>
                  <!-- 案例分享輪播圖（ 手機版 - 橫 ） -->
                  <div v-if="col.name === 'casesImageMobile'" class="row justify-between">
                    <div class="col-12 row">
                      <div class="col-12 text-h6 text-accent q-mb-sm q-pl-sm">案例分享輪播圖（ 手機版 - 橫 ）</div>
                      <div v-for="(value, idx) in col.value" :key="value" style="width: auto;">
                        <img :src="col.value[idx]" class="col-12 q-mx-md"
                          style="width: 200px;height: 150px; object-fit: cover;" :ratio="4 / 3">
                      </div>
                    </div>
                  </div>
                  <!-- 案例分享輪播圖（ 電腦版 - 橫 ） -->
                  <div v-if="col.name === 'casesImageDesktop'" class="row justify-between">
                    <div class="col-12 row">
                      <div class="col-12 text-h6 text-accent q-mb-sm q-pl-sm">案例分享輪播圖（ 手機版 - 橫 ）</div>
                      <div v-for="(value, idx) in col.value" :key="value" style="width: auto;">
                        <img :src="col.value[idx]" class="col-12 q-mx-md"
                          style="width: 150px;height: 200px; object-fit: cover;" :ratio="3 / 4">
                      </div>
                    </div>
                  </div>

                </div>
              </q-card>
            </div>
          </template>

          <!-- loading 效果 -->
          <!-- QInnerLoading必须是其父元素内部的最后一个元素，以便它可以显示在其他内容的顶部。 -->
          <template v-slot:loading>
            <q-inner-loading showing dark transition-show="fade" color="primary" />
          </template>
        </q-table>

        <!-- 新增輪播圖片時的彈出視窗 -->
        <q-dialog v-model="carouselForm.dialog" seamless>
          <q-card id="dialog" flat square bordered persistent v-if="carouselForm.dialog"
            class="bg-info text-secondary shadow-white">
            <q-form @submit.prevent='submitCarouselForm' class="q-pa-md">
              <!-- 首頁圖片(橫) -->
              <p class="text-h6 text-dark">首頁圖片（手機版-橫）</p>
              <q-file v-model='carouselForm.indexImageMobile' multiple :rules='[rules.size]' accept='image/*' filled
                bottom-slots counter>
                <!-- 上傳icon -->
                <template v-slot:prepend>
                  <q-icon name="cloud_upload" @click.stop.prevent />
                </template>
                <!-- 刪除icon -->
                <template v-slot:append>
                  <q-icon name="close" @click.stop.prevent="model = null" class="cursor-pointer" />
                </template>
                <template v-slot:hint>
                </template>
              </q-file>
              <!-- 首頁圖片(直) -->
              <p class="text-h6 text-dark">首頁圖片（電腦版-直）</p>
              <q-file v-model='carouselForm.indexImageDesktop' multiple :rules='[rules.size]' accept='image/*' filled
                bottom-slots counter>
                <!-- 上傳icon -->
                <template v-slot:prepend>
                  <q-icon name="cloud_upload" @click.stop.prevent />
                </template>
                <!-- 刪除icon -->
                <template v-slot:append>
                  <q-icon name="close" @click.stop.prevent="model = null" class="cursor-pointer" />
                </template>
                <template v-slot:hint>
                </template>
              </q-file>
              <!-- 最新消息圖片(橫) -->
              <p class="text-h6 text-dark">最新消息圖片（手機版-橫）</p>
              <q-file v-model='carouselForm.newsImageMobile' multiple :rules='[rules.size]' accept='image/*' filled
                bottom-slots counter>
                <!-- 上傳icon -->
                <template v-slot:prepend>
                  <q-icon name="cloud_upload" @click.stop.prevent />
                </template>
                <!-- 刪除icon -->
                <template v-slot:append>
                  <q-icon name="close" @click.stop.prevent="model = null" class="cursor-pointer" />
                </template>
                <template v-slot:hint>
                </template>
              </q-file>
              <!-- 最新消息圖片(直) -->
              <p class="text-h6 text-dark">最新消息圖片（電腦版-直）</p>
              <q-file v-model='carouselForm.newsImageDesktop' multiple :rules='[rules.size]' accept='image/*' filled
                bottom-slots counter>
                <!-- 上傳icon -->
                <template v-slot:prepend>
                  <q-icon name="cloud_upload" @click.stop.prevent />
                </template>
                <!-- 刪除icon -->
                <template v-slot:append>
                  <q-icon name="close" @click.stop.prevent="model = null" class="cursor-pointer" />
                </template>
                <template v-slot:hint>
                </template>
              </q-file>
              <!-- 靈學知識圖片(橫) -->
              <p class="text-h6 text-dark">靈學知識圖片（手機版-橫）</p>
              <q-file v-model='carouselForm.knowledgesImageMobile' multiple :rules='[rules.size]' accept='image/*'
                filled bottom-slots counter>
                <!-- 上傳icon -->
                <template v-slot:prepend>
                  <q-icon name="cloud_upload" @click.stop.prevent />
                </template>
                <!-- 刪除icon -->
                <template v-slot:append>
                  <q-icon name="close" @click.stop.prevent="model = null" class="cursor-pointer" />
                </template>
                <template v-slot:hint>
                </template>
              </q-file>
              <!-- 靈學知識圖片(直) -->
              <p class="text-h6 text-dark">靈學知識圖片（電腦版-直）</p>
              <q-file v-model='carouselForm.knowledgesImageDesktop' multiple :rules='[rules.size]' accept='image/*'
                filled bottom-slots counter>
                <!-- 上傳icon -->
                <template v-slot:prepend>
                  <q-icon name="cloud_upload" @click.stop.prevent />
                </template>
                <!-- 刪除icon -->
                <template v-slot:append>
                  <q-icon name="close" @click.stop.prevent="model = null" class="cursor-pointer" />
                </template>
                <template v-slot:hint>
                </template>
              </q-file>
              <!-- 案例分享圖片(橫) -->
              <p class="text-h6 text-dark">案例分享圖片（手機版-橫）</p>
              <q-file v-model='carouselForm.casesImageMobile' multiple :rules='[rules.size]' accept='image/*' filled
                bottom-slots counter>
                <!-- 上傳icon -->
                <template v-slot:prepend>
                  <q-icon name="cloud_upload" @click.stop.prevent />
                </template>
                <!-- 刪除icon -->
                <template v-slot:append>
                  <q-icon name="close" @click.stop.prevent="model = null" class="cursor-pointer" />
                </template>
                <template v-slot:hint>
                </template>
              </q-file>
              <!-- 案例分享圖片(直) -->
              <p class="text-h6 text-dark">案例分享圖片（電腦版-直）</p>
              <q-file v-model='carouselForm.casesImageDesktop' multiple :rules='[rules.size]' accept='image/*' filled
                bottom-slots counter>
                <!-- 上傳icon -->
                <template v-slot:prepend>
                  <q-icon name="cloud_upload" @click.stop.prevent />
                </template>
                <!-- 刪除icon -->
                <template v-slot:append>
                  <q-icon name="close" @click.stop.prevent="model = null" class="cursor-pointer" />
                </template>
                <template v-slot:hint>
                </template>
              </q-file>

              <div class="row justify-around">
                <!-- 確定新增 -->
                <q-btn square flat type='submit' class="col-4 bg-secondary text-dark q-my-sm" label="送出編輯" />
                <!-- 取消新增 -->
                <q-btn square flat outline class="col-4 bg-dark text-secondary q-my-sm" label="取消"
                  @click='carouselForm.dialog = false' />
              </div>
            </q-form>
          </q-card>
        </q-dialog>

        <!-- 刪除輪播圖片文章時的彈出視窗 -->
        <q-dialog v-model="deleteCarouselsDialog.dialog" seamless persistent>
          <q-card square class="row justify-center bg-info q-pa-lg">
            <div class="col-12 text-center text-h3 text-red q-pb-md">警告</div>
            <div class="col-12 text-center text-h6 text-dark q-pb-md">你確定要刪除輪播圖片嗎？<br>刪除輪播圖片將無法復原！</div>
            <div class="col-12 row justify-around">
              <!-- 確定刪除 -->
              <q-btn @click="deleteCarousels(delCarousels._id)" square flat class="col-4 bg-secondary text-dark q-my-sm"
                label="確定刪除" />
              <!-- 取消刪除 -->
              <q-btn square flat outline class="col-4 bg-dark text-secondary q-my-sm" label="取消"
                @click='deleteCarouselsDialog.dialog = false' />
            </div>
          </q-card>
        </q-dialog>

      </div>
    </div>
  </q-page>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { apiAuth } from '@/boot/axios'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/user'
import { useQuasar } from 'quasar'
import Swal from 'sweetalert2'

const user = useUserStore()
const { logout } = user
const { isLogin } = storeToRefs(user)

const filter = ref('')
const $q = useQuasar()
const loading = ref(false)

// 輪播圖片陣列
const carousels = reactive([])

// 輪播圖片分頁
const paginationCarousels = reactive({
  items: [], // table要顯示的資料
  page: 1, // 目前第幾頁
  rowsPerPage: 0 // 每頁幾筆，0 代表 All
})

// 輪播圖片表單預設格式
const carouselForm = reactive({
  _id: '',
  indexImageMobile: [],
  indexImageDesktop: [],
  newsImageMobile: [],
  newsImageDesktop: [],
  knowledgesImageMobile: [],
  knowledgesImageDesktop: [],
  casesImageMobile: [],
  casesImageDesktop: [],
  idx: -1,
  dialog: false
})

// 編輯器
const editorRef = ref(null)
const onPaste = (evt) => {
  // Let inputs do their thing, so we don't break pasting of links.
  if (evt.target.nodeName === 'INPUT') return
  let text, onPasteStripFormattingIEPaste
  evt.preventDefault()
  evt.stopPropagation()
  if (evt.originalEvent && evt.originalEvent.clipboardData.getData) {
    text = evt.originalEvent.clipboardData.getData('text/plain')
    editorRef.value.runCmd('insertText', text)
  } else if (evt.clipboardData && evt.clipboardData.getData) {
    text = evt.clipboardData.getData('text/plain')
    editorRef.value.runCmd('insertText', text)
  } else if (window.clipboardData && window.clipboardData.getData) {
    if (!onPasteStripFormattingIEPaste) {
      onPasteStripFormattingIEPaste = true
      editorRef.value.runCmd('ms-pasteTextOnly', text)
    }
    onPasteStripFormattingIEPaste = false
  }
}

// 驗證規則
const rules = reactive({
  required(v) {
    return !!v || '必填欄位'
  },
  size(v) {
    return !v || !v.length || (v[0]?.type?.includes('image') && v[0]?.size <= 1024 * 1024 * 2) || '檔案格式不符（須為圖片檔，且檔案大小 2 MB 以下）'
  }
})

// 輪播圖片送出表單
const submitCarouselForm = async () => {
  // 表單送出時，因為後端要收到的是 FormData 的資料型態，所以要建立一個 FormData 物件
  console.log(carouselForm)
  const fd = new FormData()
  // 要把東西放進去 FormData 要使用 .append(key, value)，例如：fd.append('name', form.name)
  // 可以一行一行寫，也可以一個 for 迴圈搞定
  for (const key in carouselForm) {
    if (['_id', 'idx', 'dialog'].includes(key)) continue
    else if (key === 'indexImageMobile') {
      for (const indexImageMobile of carouselForm.indexImageMobile) {
        fd.append(key, indexImageMobile)
      }
    } else if (key === 'indexImageDesktop') {
      for (const indexImageDesktop of carouselForm.indexImageDesktop) {
        fd.append(key, indexImageDesktop)
      }
    } else if (key === 'newsImageMobile') {
      for (const newsImageMobile of carouselForm.newsImageMobile) {
        fd.append(key, newsImageMobile)
      }
    } else if (key === 'newsImageDesktop') {
      for (const newsImageDesktop of carouselForm.newsImageDesktop) {
        fd.append(key, newsImageDesktop)
      }
    } else if (key === 'knowledgesImageMobile') {
      for (const knowledgesImageMobile of carouselForm.knowledgesImageMobile) {
        fd.append(key, knowledgesImageMobile)
      }
    } else if (key === 'knowledgesImageDesktop') {
      for (const knowledgesImageDesktop of carouselForm.knowledgesImageDesktop) {
        fd.append(key, knowledgesImageDesktop)
      }
    } else if (key === 'casesImageMobile') {
      for (const casesImageMobile of carouselForm.casesImageMobile) {
        fd.append(key, casesImageMobile)
      }
    } else if (key === 'casesImageDesktop') {
      for (const casesImageDesktop of carouselForm.casesImageDesktop) {
        fd.append(key, casesImageDesktop)
      }
    } else {
      fd.append(key, carouselForm[key])
    }
  }
  const object = {}
  fd.forEach((val, key) => {
    object[key] = val
  })
  console.log(object)
  try {
    if (carouselForm._id.length === 0) {
      const { data } = await apiAuth.post('/carousels', fd)
      carousels.push(data.result)
      Swal.fire({
        icon: 'success',
        title: '新增成功',
        text: '您已成功新增一筆輪播圖片！'
      })
      initCarousels()
    } else {
      const { data } = await apiAuth.patch('/carousels/' + carouselForm._id, fd)
      carousels[carouselForm.idx] = data.result
      Swal.fire({
        icon: 'success',
        title: '修改成功',
        text: '您已成功修改該筆輪播圖片！'
      })
      initCarousels()
    }
    carouselForm.dialog = false
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: '新增失敗',
      text: error.isAxiosError ? error.response.data.message : error.message
    })
  }
}

// 預設 刪除輪播圖片的彈窗 為 false
const deleteCarouselsDialog = reactive({
  dialog: false
})
/*
  定義一個變數，用來將 form 裡面的 _id 帶入 deleteArtcle 的 function 裡
  又，因為開啟 刪除輪播圖片的彈窗 的按鈕放在 #body-cell-edit="edit" 裡
  所以才會寫 @click='openDeleteDialog(edit.row._id)'
*/
const delCarousels = reactive({
  _id: '',
  title: ''
})
/*
  開啟 刪除輪播圖片的彈窗，並帶入值
  此時 del.value = edit.row._id = carouselsId
*/
const openDeleteCarouselsDialog = (carouselsId) => {
  delCarousels._id = carouselsId
  deleteCarouselsDialog.dialog = true
}

/*
  刪除輪播圖片
  透過 deleteProduct(del) 將 最原始的 form._id 帶入 function
  form._id = edit.row._id = del.value = productId
*/
const deleteCarousels = async (carouselsId) => {
  deleteCarouselsDialog.dialog = false
  try {
    await apiAuth.delete('/carousels/' + carouselsId)
    await Swal.fire({
      icon: 'success',
      title: '刪除成功',
      text: '您已成功刪除該筆輪播圖片！'
    })
    initCarousels()
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: '刪除失敗',
      text: error.isAxiosError ? error.response.data.message : error.message
    })
  }
}

// 開啟輪播圖片表單
const openCarouselsDialog = (_id, idx) => {
  carouselForm._id = _id
  // console.log(carousels[idx])
  if (idx > -1) {
    // 有 id => 編輯
    // carouselForm.indexImageMobile = carousels[idx].indexImageMobile
    // carouselForm.indexImageDesktop = carousels[idx].indexImageDesktop
    // carouselForm.newsImageMobile = carousels[idx].newsImageMobile
    // carouselForm.newsImageDesktop = carousels[idx].newsImageDesktop
    // carouselForm.knowledgesImageMobile = carousels[idx].knowledgesImageMobile
    // carouselForm.knowledgesImageDesktop = carousels[idx].knowledgesImageDesktop
    // carouselForm.casesImageMobile = carousels[idx].casesImageMobile
    // carouselForm.casesImageDesktop = carousels[idx].casesImageDesktop
  } else {
    // 沒 id => 清空
  }
  carouselForm.indexImageMobile = []
  carouselForm.indexImageDesktop = []
  carouselForm.newsImageMobile = []
  carouselForm.newsImageDesktop = []
  carouselForm.knowledgesImageMobile = []
  carouselForm.knowledgesImageDesktop = []
  carouselForm.casesImageMobile = []
  carouselForm.casesImageDesktop = []
  carouselForm.idx = idx
  carouselForm.dialog = true
}

// 輪播圖片表頭
const columnsCarousels = [
  { name: 'edit', label: '圖片編輯', align: 'center' },
  { name: 'indexImageMobile', label: '首頁圖片(橫)', field: row => row.indexImageMobile, align: 'left' },
  { name: 'indexImageDesktop', label: '首頁圖片(直)', field: row => row.indexImageDesktop, align: 'left' },
  { name: 'newsImageMobile', label: '最新消息圖片(橫)', field: row => row.newsImageMobile, align: 'left' },
  { name: 'newsImageDesktop', label: '最新消息圖片(直)', field: row => row.newsImageDesktop, align: 'left' },
  { name: 'knowledgesImageMobile', label: '靈學知識圖片(橫)', field: row => row.knowledgesImageMobile, align: 'left' },
  { name: 'knowledgesImageDesktop', label: '靈學知識圖片(直)', field: row => row.knowledgesImageDesktop, align: 'left' },
  { name: 'casesImageMobile', label: '案例分享圖片(橫)', field: row => row.casesImageMobile, align: 'left' },
  { name: 'casesImageDesktop', label: '案例分享圖片(直)', field: row => row.casesImageDesktop, align: 'left' }
]

// 抓資料庫輪播圖片的資料
const initCarousels = async () => {
  try {
    const { data } = await apiAuth.get('/carousels/all')
    carousels.splice(0, carousels.length)
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

</script>
