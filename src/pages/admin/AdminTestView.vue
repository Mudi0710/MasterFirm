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
        <div class='col-auto text-h3 text-secondary q-my-sm q-pl-md'>推播管理</div>
        <!-- <q-btn @click="openDialog('', -1)" square flat
          class='col-auto q-mr-xl bg-secondary text-dark text-h6 q-my-sm createBtn'>新增會員</q-btn> -->
      </div>

      <!-- 內容區 -->
      <div class="q-pa-md">
        <div class="bg-accent text-h5 text-dark q-my-sm" style="height:1px;"></div>
        <div class="text-h5 text-accent q-my-sm" style="height:40px; line-height: 1.6em;">聯絡地圖</div>
        <q-table :grid="$q.screen.lt.xl" :columns="columnsLocalmap" :rows="localmap" row-key="title" separator="cell"
          square bordered wrap-cells binary-state-sort dense :filter="filter" :loading="loading"
          :pagination="paginationLocalmap" rows-per-page-label="每頁顯示筆數" no-data-label="目前沒有新增任何聯絡地圖"
          no-results-label="Oops...找不到該筆宣傳聯絡地圖" class="bg-transparent">

          <!-- 新增聯絡地圖按鈕 -->
          <template v-slot:top-left>
            <q-btn @click="openLocalmapDialog('', -1)" square flat :disable="localmap.length > 0"
              class='col-auto q-mr-xl bg-secondary text-dark text-body1 q-my-sm createBtn'>新增聯絡地圖</q-btn>
          </template>

          <!-- 編輯聯絡資訊 -->
          <template #body-cell-localmap="localmap">
            <q-td :localmap="localmap" style="max-width: 150px;">
              <!-- <pre>{{ localmap }}</pre> -->
              <div class="ellipsis-3-lines">{{ localmap.row.localmap }}</div>
            </q-td>
          </template>

          <!-- 編輯聯絡資訊 -->
          <template #body-cell-edit="edit">
            <q-td :edit="edit" style="max-width: 150px;">
              <!-- <pre>{{ edit }}</pre> -->
              <div class="row justify-center">
                <q-btn class="col-auto q-mx-sm q-my-xs" @click='openLocalmapDialog(edit.row._id, edit.rowIndex)'
                  outline>
                  修改地圖</q-btn>
                <q-btn class="col-auto q-mx-sm q-my-xs" @click='openDeleteLocalmapDialog(edit.row._id)' outline>
                  刪除地圖</q-btn>
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
            <div class="col-12 col-lg-6 q-pa-sm cursor-pointer ">
              <q-card square bordered class="bg-primary shadow" style="width: 100%;height: 100%;">
                <div v-for="col in card.cols" :key="col.name" class="q-pa-sm">
                  <!-- <pre>{{ col }}</pre> -->
                  <!-- 聯絡地圖 -->
                  <div v-if="col.name === 'localmap'" class="row justify-between">
                    <span class="col-12 text-accent">{{ col.label }}：</span>
                    <span class="col-12 text-secondary ellipsis-3-lines" style="max-width: 300px;">{{ col.value
                      }}</span>
                  </div>
                  <!-- 聯絡資訊編輯 -->
                  <div v-if="col.name === 'edit'" class="row justify-start">
                    <!-- <pre>{{ card.rowIndex }}</pre> -->

                    <div class="col-12 row justify-between">
                      <span class="text-accent">{{ col.label }}：</span>

                      <q-btn class="col-auto text-secondary" style="font-size: xx-small; padding: 0px 8px;"
                        @click='openLocalmapDialog(card.row._id, card.rowIndex)' outline>修改地圖</q-btn>
                    </div>
                    <div class="col-12 row justify-end q-mt-sm">
                      <q-btn class="col-auto text-secondary" style="font-size: xx-small; padding: 0px 8px;"
                        @click='openDeleteLocalmapDialog(card.row._id)' outline>刪除地圖</q-btn>
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

        <!-- 新增聯絡資訊時的彈出視窗 -->
        <q-dialog v-model="localmapForm.dialog" seamless>
          <q-card id="dialog" flat square bordered persistent v-if="localmapForm.dialog"
            class="bg-info text-secondary shadow-white">
            <q-form @submit.prevent='submitLocalmapForm' class="q-pa-md">
              <!-- 聯絡地圖 -->
              <p class="text-h6 text-dark">聯絡地圖</p>
              <q-input v-model="localmapForm.localmap" :rules='[rules.required]' type='textarea' outlined square
                dense />

              <div class="row justify-around">
                <!-- 確定新增 -->
                <q-btn square flat type='submit' class="col-4 bg-secondary text-dark q-my-sm" label="送出編輯" />
                <!-- 取消新增 -->
                <q-btn square flat outline class="col-4 bg-dark text-secondary q-my-sm" label="取消"
                  @click='localmapForm.dialog = false' />
              </div>
            </q-form>
          </q-card>
        </q-dialog>

        <!-- 刪除首頁宣傳文章時的彈出視窗 -->
        <q-dialog v-model="deleteLocalmapDialog.dialog" seamless persistent>
          <q-card square class="row justify-center bg-info q-pa-lg">
            <div class="col-12 text-center text-h3 text-red q-pb-md">警告</div>
            <div class="col-12 text-center text-h6 text-dark q-pb-md">你確定要刪除聯絡地圖嗎？<br>刪除聯絡地圖將無法復原！</div>
            <div class="col-12 row justify-around">
              <!-- 確定刪除 -->
              <q-btn @click="deleteLocalmap(delLocalmap._id)" square flat class="col-4 bg-secondary text-dark q-my-sm"
                label="確定刪除" />
              <!-- 取消刪除 -->
              <q-btn square flat outline class="col-4 bg-dark text-secondary q-my-sm" label="取消"
                @click='deleteLocalmapDialog.dialog = false' />
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

// 聯絡地圖陣列
const localmap = reactive([])

// 聯絡地圖分頁
const paginationLocalmap = reactive({
  items: [], // table要顯示的資料
  page: 1, // 目前第幾頁
  rowsPerPage: 0 // 每頁幾筆，0 代表 All
})

// 聯絡地圖表單預設格式
const localmapForm = reactive({
  _id: '',
  localmap: '',
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

// 聯絡地圖送出表單
const submitLocalmapForm = async () => {
  try {
    if (localmapForm._id.length === 0) {
      const { data } = await apiAuth.post('/localmap', localmapForm)
      localmap.push(data.result)
      Swal.fire({
        icon: 'success',
        title: '新增成功',
        text: '您已成功新增一筆聯絡地圖！'
      })
      initLocalmap()
    } else {
      const { data } = await apiAuth.patch('/localmap/' + localmapForm._id, localmapForm)
      localmap[localmapForm.idx] = data.result
      Swal.fire({
        icon: 'success',
        title: '修改成功',
        text: '您已成功修改該筆聯絡地圖！'
      })
      initLocalmap()
    }
    localmapForm.dialog = false
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: '新增失敗',
      text: error.isAxiosError ? error.response.data.message : error.message
    })
  }
}

// 預設 刪除聯絡地圖的彈窗 為 false
const deleteLocalmapDialog = reactive({
  dialog: false
})
/*
  定義一個變數，用來將 form 裡面的 _id 帶入 deleteArtcle 的 function 裡
  又，因為開啟 刪除聯絡地圖的彈窗 的按鈕放在 #body-cell-edit="edit" 裡
  所以才會寫 @click='openDeleteDialog(edit.row._id)'
*/
const delLocalmap = reactive({
  _id: '',
  title: ''
})
/*
  開啟 刪除聯絡地圖的彈窗，並帶入值
  此時 del.value = edit.row._id = articleId
*/
const openDeleteLocalmapDialog = (localmapId) => {
  delLocalmap._id = localmapId
  deleteLocalmapDialog.dialog = true
}

/*
  刪除聯絡地圖
  透過 deleteProduct(del) 將 最原始的 form._id 帶入 function
  form._id = edit.row._id = del.value = productId
*/
const deleteLocalmap = async (localmapId) => {
  deleteLocalmapDialog.dialog = false
  try {
    await apiAuth.delete('/localmap/' + localmapId)
    await Swal.fire({
      icon: 'success',
      title: '刪除成功',
      text: '您已成功刪除該筆聯絡地圖！'
    })
    initLocalmap()
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: '刪除失敗',
      text: error.isAxiosError ? error.response.data.message : error.message
    })
  }
}

// 開啟聯絡地圖表單
const openLocalmapDialog = (_id, idx) => {
  localmapForm._id = _id
  // console.log(connection[idx])
  if (idx > -1) {
    // 有 id => 編輯
    localmapForm.localmap = localmap[idx].localmap
  } else {
    // 沒 id => 清空
    localmapForm.localmap = ''
  }
  localmapForm.idx = idx
  localmapForm.dialog = true
}

// 聯絡地圖表頭
const columnsLocalmap = [
  { name: 'localmap', label: '地圖', field: row => row.localmap, align: 'left' },
  { name: 'edit', label: '編輯', align: 'center' }
]

// 抓資料庫宣聯絡地圖的資料
const initLocalmap = async () => {
  try {
    const { data } = await apiAuth.get('/localmap/all')
    localmap.splice(0, localmap.length)
    localmap.push(...data.result)
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: '失敗',
      text: error.isAxiosError ? error.response.data.message : error.message
    })
  }
}
initLocalmap()

</script>
