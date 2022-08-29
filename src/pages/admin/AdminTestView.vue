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

      <!-- 跑馬文字管理區 -->
      <div class="q-pa-md">
        <!-- 跑馬文字跑馬文字跑馬文字跑馬文字跑馬文字跑馬文字跑馬文字跑馬文字跑馬文字跑馬文字跑馬文字跑馬文字跑馬文字跑馬文字跑馬文字跑馬文字 -->
        <div class="bg-accent text-h5 text-dark q-my-sm" style="height:1px;"></div>
        <div class="text-h5 text-accent q-my-sm" style="height:40px; line-height: 1.6em;">跑馬文字</div>
        <q-table :grid="$q.screen.lt.xl" :columns="columnsMarquee" :rows="marquee" row-key="title" separator="cell"
          square bordered wrap-cells binary-state-sort dense :filter="filter" :loading="loading"
          :pagination="paginationMarquee" rows-per-page-label="每頁顯示筆數" no-data-label="目前沒有新增任何跑馬燈"
          no-results-label="Oops...找不到該筆跑馬燈" class="bg-transparent">

          <!-- 新增跑馬燈按鈕 -->
          <template v-slot:top-left>
            <q-btn @click="openMarqueeDialog('', -1)" square flat :disable="marquee.length > 0"
              class='col-auto q-mr-xl bg-secondary text-dark text-body1 q-my-sm createBtn'>新增跑馬燈</q-btn>
          </template>

          <!-- 最新消息區 -->
          <template #body-cell-newsMarquee="newsMarquee">
            <q-td :newsMarquee="newsMarquee" class="text-wrap">
              {{ newsMarquee.row.newsMarquee }}
            </q-td>
          </template>

          <!-- 靈學知識區 -->
          <template #body-cell-knowledgesMarquee="knowledgesMarquee">
            <q-td :knowledgesMarquee="knowledgesMarquee" class="text-wrap">
              {{ knowledgesMarquee.row.knowledgesMarquee }}
            </q-td>
          </template>

          <!-- 案例分享區 -->
          <template #body-cell-casesMarquee="casesMarquee">
            <q-td :casesMarquee="casesMarquee" class="text-wrap">
              {{ casesMarquee.row.casesMarquee }}
            </q-td>
          </template>

          <!-- 編輯跑馬燈 -->
          <template #body-cell-edit="edit">
            <q-td :edit="edit" style="min-width: 150px;">
              <!-- <pre>{{ edit }}</pre> -->
              <div class="row justify-center">
                <q-btn class="col-auto q-mx-sm q-my-xs" @click='openMarqueeDialog(edit.row._id, edit.rowIndex)' outline>
                  修改跑馬燈</q-btn>
                <q-btn class="col-auto q-mx-sm q-my-xs" @click='openDeleteMarqueeDialog(edit.row._id, edit.row.title)'
                  outline>
                  刪除跑馬燈</q-btn>
              </div>
            </q-td>
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
              <q-card square bordered class="bg-primary shadow">
                <div v-for="col in card.cols" :key="col.name" class="q-pa-sm">
                  <!-- <pre>{{ col }}</pre> -->
                  <!-- 簡介標題、內容 -->
                  <div v-if="col.name !== 'edit'" class="row justify-between">
                    <span class="text-accent">{{ col.label }}：</span>
                    <span class="text-secondary ellipsis-3-lines">{{ col.value }}</span>
                  </div>
                  <!-- 簡介編輯 -->
                  <div v-if="col.name === 'edit'" class="row justify-start">
                    <!-- <pre>{{ card.rowIndex }}</pre> -->

                    <div class="col-12 row justify-between">
                      <span class="text-accent">{{ col.label }}：</span>

                      <q-btn class="col-auto text-secondary" style="font-size: small; padding: 0px 8px;"
                        @click='openMarqueeDialog(card.row._id, card.rowIndex)' outline>修改跑馬燈</q-btn>
                    </div>
                    <div class="col-12 row justify-end q-my-sm" style="height: 28.8px; ">
                      <q-btn class="col-auto text-secondary" style="font-size: small; padding: 0px 8px;"
                        @click='openDeleteMarqueeDialog(card.row._id, card.row.title)' outline>刪除跑馬燈</q-btn>
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

        <!-- 新增跑馬燈文章時的彈出視窗 -->
        <q-dialog v-model="marqueeForm.dialog" seamless>
          <q-card id="dialog" flat square bordered persistent v-if="marqueeForm.dialog"
            class="bg-info text-secondary shadow-white">
            <q-form @submit.prevent='submitMarqueeForm' class="q-pa-md">
              <!-- 最新消息區 -->
              <p class="text-h6 text-dark">最新消息區</p>
              <q-input v-model="marqueeForm.newsMarquee" :rules='[rules.required]' type='textarea' outlined square
                dense />
              <!-- 靈學知識區 -->
              <p class="text-h6 text-dark">靈學知識區</p>
              <q-input v-model="marqueeForm.knowledgesMarquee" :rules='[rules.required]' type='textarea' outlined square
                dense />
              <!-- 案例分享區 -->
              <p class="text-h6 text-dark">案例分享區</p>
              <q-input v-model="marqueeForm.casesMarquee" :rules='[rules.required]' type='textarea' outlined square
                dense />
              <!-- 商品描述 -->
              <!-- <p class="text-h6 text-dark">須知內容</p>
              <q-editor model="qeditor" v-model="marqueeForm.content" ref="editorRef" @paste="onPaste"
                :rules='[rules.required]' outlined square content-class="bg-dark" toolbar-bg="secondary"
                toolbar-text-color="dark" :dense="$q.screen.lt.lg" :toolbar="[
                  ['bold', 'italic', 'strike', 'underline', 'subscript', 'superscript'],
                  ['left', 'center', 'right', 'justify'],
                  ['token', 'hr', 'link', 'custom_btn'],
                  ['print', 'fullscreen'],
                  [
                    {
                      icon: $q.iconSet.editor.formatting,
                      fixedIcon: false,
                      list: 'no-icons',
                      options: [
                        'p',
                        'h1',
                        'h2',
                        'h3',
                        'h4',
                        'h5',
                        'h6',
                        'code'
                      ]
                    },
                    {
                      icon: $q.iconSet.editor.fontSize,
                      fixedIcon: false,
                      list: 'no-icons',
                      options: [
                        'size-1',
                        'size-2',
                        'size-3',
                        'size-4',
                        'size-5',
                        'size-6',
                        'size-7'
                      ]
                    },
                    {
                      icon: $q.iconSet.editor.font,
                      fixedIcon: true,
                      list: 'no-icons',
                      options: [
                        'default_font',
                        'arial',
                        'arial_black',
                        'comic_sans',
                        'courier_new',
                        'impact',
                        'lucida_grande',
                        'times_new_roman',
                        'verdana'
                      ]
                    },
                    'removeFormat'
                  ],
                  ['quote', 'unordered', 'ordered', 'outdent', 'indent'],
                  ['undo', 'redo'],
                  ['viewsource']
                ]" :fonts="{
  arial: 'Arial',
  arial_black: 'Arial Black',
  comic_sans: 'Comic Sans MS',
  courier_new: 'Courier New',
  impact: 'Impact',
  lucida_grande: 'Lucida Grande',
  times_new_roman: 'Times New Roman',
  verdana: 'Verdana'
}" /> -->
              <div class="row justify-around">
                <!-- 確定新增 -->
                <q-btn square flat type='submit' class="col-4 bg-secondary text-dark q-my-sm" label="送出編輯" />
                <!-- 取消新增 -->
                <q-btn square flat outline class="col-4 bg-dark text-secondary q-my-sm" label="取消"
                  @click='marqueeForm.dialog = false' />
              </div>
            </q-form>
          </q-card>
        </q-dialog>

        <!-- 刪除跑馬燈文章時的彈出視窗 -->
        <q-dialog v-model="deleteMarqueeDialog.dialog" seamless persistent>
          <q-card square class="row justify-center bg-info q-pa-lg">
            <div class="col-12 text-center text-h3 text-red q-pb-md">警告</div>
            <div class="col-12 text-center text-h6 text-dark q-pb-md">你確定要刪除跑馬燈嗎？<br>刪除跑馬燈將無法復原！
            </div>
            <div class="col-12 row justify-around">
              <!-- 確定刪除 -->
              <q-btn @click="deleteMarquee(delMarquee._id)" square flat class="col-4 bg-secondary text-dark q-my-sm"
                label="刪除" />
              <!-- 取消刪除 -->
              <q-btn square flat outline class="col-4 bg-dark text-secondary q-my-sm" label="取消"
                @click='deleteMarqueeDialog.dialog = false' />
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

// 跑馬燈陣列
const marquee = reactive([])

// 跑馬燈分頁
const paginationMarquee = reactive({
  items: [], // table要顯示的資料
  page: 1, // 目前第幾頁
  rowsPerPage: 0 // 每頁幾筆，0 代表 All
})

// 跑馬燈表單預設格式
const marqueeForm = reactive({
  newsMarquee: '',
  knowledgesMarquee: '',
  casesMarquee: '',
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
  }
})

// 跑馬燈送出表單
const submitMarqueeForm = async () => {
  try {
    if (marqueeForm._id.length === 0) {
      const { data } = await apiAuth.post('/marquees', marqueeForm)
      marquee.push(data.result)
      Swal.fire({
        icon: 'success',
        title: '新增成功',
        text: '您已成功新增一筆跑馬燈！'
      })
      initMarquee()
    } else {
      const { data } = await apiAuth.patch('/marquees/' + marqueeForm._id, marqueeForm)
      marquee[marqueeForm.idx] = data.result
      Swal.fire({
        icon: 'success',
        title: '修改成功',
        text: '您已成功修改該筆跑馬燈！'
      })
      initMarquee()
    }
    marqueeForm.dialog = false
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: '新增失敗',
      text: error.isAxiosError ? error.response.data.message : error.message
    })
  }
}

// 預設 刪除跑馬燈的彈窗 為 false
const deleteMarqueeDialog = reactive({
  dialog: false
})
/*
  定義一個變數，用來將 form 裡面的 _id 帶入 deleteArtcle 的 function 裡
  又，因為開啟 刪除簡介的彈窗 的按鈕放在 #body-cell-edit="edit" 裡
  所以才會寫 @click='openDeleteDialog(edit.row._id)'
*/
const delMarquee = reactive({
  _id: '',
  title: ''
})
/*
  開啟 刪除跑馬燈的彈窗，並帶入值
  此時 del.value = edit.row._id = marqueeId
*/
const openDeleteMarqueeDialog = (marqueeId, marqueeTitle) => {
  delMarquee._id = marqueeId
  delMarquee.title = marqueeTitle
  deleteMarqueeDialog.dialog = true
}

/*
  刪除跑馬燈
  透過 deleteProduct(del) 將 最原始的 form._id 帶入 function
  form._id = edit.row._id = del.value = productId
*/
const deleteMarquee = async (marqueeId) => {
  deleteMarqueeDialog.dialog = false
  try {
    await apiAuth.delete('/marquees/' + marqueeId)
    await Swal.fire({
      icon: 'success',
      title: '刪除成功',
      text: '您已成功刪除該筆跑馬燈！'
    })
    initMarquee()
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: '刪除失敗',
      text: error.isAxiosError ? error.response.data.message : error.message
    })
  }
}

// 開啟跑馬燈表單
const openMarqueeDialog = (_id, idx) => {
  marqueeForm._id = _id
  // console.log(marquee[idx])
  if (idx > -1) {
    // 有 id => 編輯
    marqueeForm.newsMarquee = marquee[idx].newsMarquee
    marqueeForm.knowledgesMarquee = marquee[idx].knowledgesMarquee
    marqueeForm.casesMarquee = marquee[idx].casesMarquee
  } else {
    // 沒 id => 清空
    marqueeForm.newsMarquee = ''
    marqueeForm.knowledgesMarquee = ''
    marqueeForm.casesMarquee = ''
  }
  marqueeForm.idx = idx
  marqueeForm.dialog = true
}

// 跑馬燈表頭
const columnsMarquee = [
  { name: 'newsMarquee', label: '最新消息', field: row => row.newsMarquee, align: 'left' },
  { name: 'knowledgesMarquee', label: '靈學知識', field: row => row.knowledgesMarquee, align: 'left' },
  { name: 'casesMarquee', label: '案例分享', field: row => row.casesMarquee, align: 'left' },
  { name: 'edit', label: '編輯跑馬燈', align: 'center' }
]

// 抓資料庫跑馬燈的資料
const initMarquee = async () => {
  try {
    const { data } = await apiAuth.get('/marquees/all')
    marquee.splice(0, marquee.length)
    marquee.push(...data.result)
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: '失敗',
      text: error.isAxiosError ? error.response.data.message : error.message
    })
  }
}
initMarquee()

</script>
