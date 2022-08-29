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
    <div id='mycontent'>
      <div class='row justify-between'>
        <div class='col-auto text-h3 text-secondary q-my-sm q-pl-md'>預約管理</div>
        <!-- <q-btn @click="openDialog('', -1)" square flat
          class='col-auto q-mr-xl bg-secondary text-dark text-h6 q-my-sm createBtn'>新增會員</q-btn> -->
      </div>

      <!-- 預約須知區 -->
      <div class="q-pa-md">
        <div class="bg-accent text-h5 text-dark q-my-sm" style="height:1px;"></div>
        <div class="text-h5 text-accent q-my-sm" style="height:40px; line-height: 1.6em;">預約須知</div>
        <q-table :grid="$q.screen.lt.xl" :columns="columnsNotice" :rows="notice" row-key="title"
          separator="cell" square bordered wrap-cells binary-state-sort dense :filter="filter" :loading="loading"
          :pagination="paginationNotice" rows-per-page-label="每頁顯示筆數" no-data-label="目前沒有新增任何預約須知"
          no-results-label="Oops...找不到該筆預約須知" class="bg-transparent">

          <!-- 新增預約須知按鈕 -->
          <template v-slot:top-left>
            <q-btn @click="openNoticeDialog('', -1)" square flat :disable="notice.length > 0"
              class='col-auto q-mr-xl bg-secondary text-dark text-body1 q-my-sm createBtn'>新增預約須知</q-btn>
          </template>

          <!-- 須知標題 -->
          <template #body-cell-title="title">
            <!-- <pre>{{ title.row.title }}</pre> -->
            <q-td :title="title" class="ellipsis" style="max-width: 150px;">
              {{ title.row.title }}
            </q-td>
          </template>

          <!-- 須知內容 -->
          <template #body-cell-content="content">
            <!-- <pre>{{ content.row.content }}</pre> -->
            <q-td :content="content" class="ellipsis" style="max-width: 400px;">{{ content.row.content }}
            </q-td>
          </template>

          <!-- 編輯須知 -->
          <template #body-cell-edit="edit">
            <q-td :edit="edit" style="max-width: 150px;">
              <!-- <pre>{{ edit }}</pre> -->
              <div class="row justify-center">
                <q-btn class="col-auto q-mx-sm q-my-xs" @click='openNoticeDialog(edit.row._id, edit.rowIndex)'
                  outline>
                  修改須知</q-btn>
                <q-btn class="col-auto q-mx-sm q-my-xs"
                  @click='openDeleteNoticeDialog(edit.row._id, edit.row.title)' outline>
                  刪除須知</q-btn>
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
                        @click='openNoticeDialog(card.row._id, card.rowIndex)' outline>修改須知</q-btn>
                    </div>
                    <div class="col-12 row justify-end q-my-sm" style="height: 28.8px; ">
                      <q-btn class="col-auto text-secondary" style="font-size: small; padding: 0px 8px;"
                        @click='openDeleteNoticeDialog(card.row._id, card.row.title)' outline>刪除須知</q-btn>
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

        <!-- 新增預約須知文章時的彈出視窗 -->
        <q-dialog v-model="noticeForm.dialog" seamless>
          <q-card id="dialog" flat square bordered persistent v-if="noticeForm.dialog"
            class="bg-info text-secondary shadow-white">
            <q-form @submit.prevent='submitNoticeForm' class="q-pa-md">
              <!-- 商品名稱 -->
              <p class="text-h6 text-dark">須知標題</p>
              <q-input v-model="noticeForm.title" :rules='[rules.required]' type='text' outlined square dense />
              <!-- 商品描述 -->
              <p class="text-h6 text-dark">須知內容</p>
              <q-editor model="qeditor" v-model="noticeForm.content" ref="editorRef" @paste="onPaste"
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
}" />
              <!-- 須知圖片 -->
              <p class="text-h6 text-dark">須知圖片</p>
              <q-file v-model='noticeForm.image' multiple :rules='[rules.size]' accept='image/*' filled
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
                  @click='noticeForm.dialog = false' />
              </div>
            </q-form>
          </q-card>
        </q-dialog>

        <!-- 刪除預約須知文章時的彈出視窗 -->
        <q-dialog v-model="deleteNoticeDialog.dialog" seamless persistent>
          <q-card square class="row justify-center bg-info q-pa-lg">
            <div class="col-12 text-center text-h3 text-red q-pb-md">警告</div>
            <div class="col-12 text-center text-h6 text-dark q-pb-md">你確定要刪除<br>【{{ delNotice.title }}】嗎？<br>刪除將無法復原！</div>
            <div class="col-12 row justify-around">
              <!-- 確定刪除 -->
              <q-btn @click="deleteNotice(delNotice._id)" square flat
                class="col-4 bg-secondary text-dark q-my-sm" label="刪除" />
              <!-- 取消刪除 -->
              <q-btn square flat outline class="col-4 bg-dark text-secondary q-my-sm" label="取消"
                @click='deleteNoticeDialog.dialog = false' />
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

// 簡介文章陣列
const notice = reactive([])

// 簡介分頁
const paginationNotice = reactive({
  items: [], // table要顯示的資料
  page: 1, // 目前第幾頁
  rowsPerPage: 0 // 每頁幾筆，0 代表 All
})

// 簡介表單預設格式
const noticeForm = reactive({
  _id: '',
  title: '',
  content: '',
  image: [],
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

// 簡介送出表單
const submitNoticeForm = async () => {
  // 表單送出時，因為後端要收到的是 FormData 的資料型態，所以要建立一個 FormData 物件
  const fd = new FormData()
  // 要把東西放進去 FormData 要使用 .append(key, value)，例如：fd.append('name', form.name)
  // 可以一行一行寫，也可以一個 for 迴圈搞定
  for (const key in noticeForm) {
    if (['_id', 'idx', 'dialog'].includes(key)) continue
    else if (key === 'image') {
      for (const image of noticeForm.image) {
        fd.append(key, image)
      }
    } else {
      fd.append(key, noticeForm[key])
    }
  }
  try {
    if (noticeForm._id.length === 0) {
      const { data } = await apiAuth.post('/notice', fd)
      notice.push(data.result)
      Swal.fire({
        icon: 'success',
        title: '新增成功',
        text: '您已成功新增一筆預約須知！'
      })
      initNotice()
    } else {
      const { data } = await apiAuth.patch('/notice/' + noticeForm._id, fd)
      notice[noticeForm.idx] = data.result
      Swal.fire({
        icon: 'success',
        title: '修改成功',
        text: '您已成功修改該筆預約須知！'
      })
      initNotice()
    }
    noticeForm.dialog = false
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: '新增失敗',
      text: error.isAxiosError ? error.response.data.message : error.message
    })
  }
}

// 預設 刪除簡介文章的彈窗 為 false
const deleteNoticeDialog = reactive({
  dialog: false
})
/*
  定義一個變數，用來將 form 裡面的 _id 帶入 deleteArtcle 的 function 裡
  又，因為開啟 刪除簡介的彈窗 的按鈕放在 #body-cell-edit="edit" 裡
  所以才會寫 @click='openDeleteDialog(edit.row._id)'
*/
const delNotice = reactive({
  _id: '',
  title: ''
})
/*
  開啟 刪除簡介文章的彈窗，並帶入值
  此時 del.value = edit.row._id = articleId
*/
const openDeleteNoticeDialog = (articleId, articleTitle) => {
  delNotice._id = articleId
  delNotice.title = articleTitle
  deleteNoticeDialog.dialog = true
}

/*
  刪除簡介
  透過 deleteProduct(del) 將 最原始的 form._id 帶入 function
  form._id = edit.row._id = del.value = productId
*/
const deleteNotice = async (articleId) => {
  deleteNoticeDialog.dialog = false
  try {
    await apiAuth.delete('/notice/' + articleId)
    await Swal.fire({
      icon: 'success',
      title: '刪除成功',
      text: '您已成功刪除該筆預約須知！'
    })
    initNotice()
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: '刪除失敗',
      text: error.isAxiosError ? error.response.data.message : error.message
    })
  }
}

// 開啟簡介表單
const openNoticeDialog = (_id, idx) => {
  noticeForm._id = _id
  // console.log(notice[idx])
  if (idx > -1) {
    // 有 id => 編輯
    noticeForm.title = notice[idx].title
    noticeForm.content = notice[idx].content
  } else {
    // 沒 id => 清空
    noticeForm.title = ''
    noticeForm.content = ''
  }
  noticeForm.image = []
  noticeForm.idx = idx
  noticeForm.dialog = true
}

// 簡介表頭
const columnsNotice = [
  { name: 'title', label: '須知標題', field: row => row.title, align: 'center' },
  { name: 'content', label: '須知內容', field: row => row.content, align: 'left' },
  { name: 'edit', label: '須知編輯', align: 'center' }
]

// 抓資料庫預約須知的資料
const initNotice = async () => {
  try {
    const { data } = await apiAuth.get('/notice/all')
    notice.splice(0, notice.length)
    notice.push(...data.result)
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: '失敗',
      text: error.isAxiosError ? error.response.data.message : error.message
    })
  }
}
initNotice()

</script>
