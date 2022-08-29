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
        <div class='col-auto text-h3 text-secondary q-my-sm q-pl-md'>商品管理</div>
        <q-btn @click="openDialog('', -1)" square flat
          class='col-auto q-mr-xl bg-secondary text-dark text-h6 q-my-sm createBtn'>新增商品</q-btn>
      </div>

      <!-- 商品管理區 -->
      <div class="q-pa-md">
        <q-table :grid="$q.screen.lt.xl" :columns="columns" :rows="products" row-key="name" square bordered wrap-cells
          binary-state-sort dense :filter="filter" :loading="loading" :pagination="pagination"
          rows-per-page-label="每頁顯示筆數" no-data-label="目前沒有新增任何商品" no-results-label="Oops...找不到該筆商品">

          <!-- 商品搜尋 -->
          <template v-slot:top-right>
            <q-input borderless dense debounce="300" v-model="filter" placeholder="&nbsp;Search" class="search">
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </template>

          <!-- 商品圖片(頭像) -->
          <template #body-cell-image="image">
            <q-td :img="image" align="center" ellipsis>
              <!-- <pre>{{ image.row }}</pre> -->
              <q-avatar square size="100px">
                <img :src="image.row.image[0]" class="q-mb-xl" style="object-fit: cover;">
              </q-avatar>
            </q-td>
          </template>

          <!-- 商品金額 -->
          <template #body-cell-price="price">
            <q-td :img="price" align="center">
              <!-- <pre>{{ price.row }}</pre> -->
              NT$ {{ price.row.price.toLocaleString() }}
            </q-td>
          </template>

          <!-- 商品編輯、刪除 -->
          <template #body-cell-edit="edit">
            <q-td :edit="edit">
              <!-- <pre>{{ edit }}</pre> -->
              <div class="row justify-center">
                <q-btn class="col-auto q-mx-sm q-my-xs" @click='openDialog(edit.row._id, edit.rowIndex)' outline>修改商品
                </q-btn>
                <q-btn class="col-auto q-mx-sm q-my-xs" @click='openDeleteDialog(edit.row._id, edit.row.name)' outline>
                  刪除商品
                </q-btn>
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
            <div class="col-12 col-sm-6 col-md-4 col-lg-3 q-pa-sm cursor-pointer ">
              <q-card square bordered class="bg-primary shadow">
                <div v-for="col in card.cols" :key="col.name" class="q-pa-sm">
                  <!-- <pre>{{ col }}</pre> -->
                  <!-- 商品圖片 -->
                  <q-responsive v-if="col.name == 'image'" :ratio="3 / 2">
                    <img :src="card.row[col.name][0]" class="col" style="width: 100%; object-fit: cover;">
                  </q-responsive>
                  <!-- 商品資訊 -->
                  <div v-if="col.name === 'price'" class="text-left q-mx-auto">
                    <div class="row justify-between">
                      <span class="text-accent">{{ col.label }}：</span>
                      <span class="text-secondary text-right">NT$ {{ col.value.toLocaleString() }}</span>
                    </div>
                  </div>
                  <!-- 商品金額 -->
                  <div v-else-if="col.name !== 'image' && col.name !== 'price' && col.name !== 'edit'"
                    class="text-left q-mx-auto">
                    <div class="row justify-between">
                      <span class="text-accent">{{ col.label }}：</span>
                      <span class="text-secondary text-right">{{ col.value }}</span>
                    </div>
                  </div>
                  <!-- 商品編輯 -->
                  <div v-else-if="col.name === 'edit'" class="text-left q-mx-auto">
                    <!-- <pre>{{ card.rowIndex }}</pre> -->

                    <div class="row justify-between">
                      <span class="text-accent">{{ col.label }}：</span>
                      <q-btn class="col-auto text-secondary" style="font-size: small; padding: 0px 8px;"
                        @click='openDialog(card.row._id, card.rowIndex)' outline>修改商品</q-btn>
                    </div>
                    <div class="row justify-end q-mt-sm" style="height: 28.8px;">
                      <q-btn class="col-auto text-secondary" style="font-size: small; padding: 0px 8px;"
                        @click='openDeleteDialog(card.row._id, card.row.name)' outline>刪除商品</q-btn>
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
      </div>

      <!-- 新增商品時的彈出視窗 -->
      <q-dialog v-model="form.dialog" seamless>
        <q-card id="dialog" flat square bordered persistent v-if="form.dialog"
          class="bg-info text-secondary shadow-white">
          <q-form @submit.prevent='submitForm' class="q-pa-md">
            <!-- 商品名稱 -->
            <p class="text-h6 text-dark">商品名稱</p>
            <q-input v-model="form.name" :rules='[rules.required]' type='text' outlined square dense />
            <!-- 商品描述 -->
            <p class="text-h6 text-dark">商品描述</p>
            <q-editor model="qeditor" v-model="form.description" ref="editorRef" @paste="onPaste"
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
            <div class="row q-mb-sm">
              <!-- 庫存狀態 -->
              <div class="column col-6">
                <div class="col-6 text-h6 text-dark">庫存狀態</div>
                <q-toggle class="col-6 text-dark" v-model="form.inventory" :label="form.inventory ? '有現貨' : '沒現貨'" />
              </div>
              <!-- 上架狀態 -->
              <div class="column col-6">
                <div class="col-6 text-h6 text-dark">上架狀態</div>
                <q-toggle class="col-6 text-dark" v-model="form.sell" :label="form.sell ? '上架' : '下架'" />
              </div>
            </div>
            <!-- 商品價格 -->
            <p class="text-h6 text-dark">商品價格</p>
            <q-input v-model.number="form.price" min='0' :rules='[rules.required, rules.price]' outlined square dense
              class="text-primary" />
            <!-- 商品圖片 -->
            <p class="text-h6 text-dark">商品圖片</p>
            <q-file v-model='form.image' multiple :rules='[rules.size]' accept='image/*' filled bottom-slots counter>
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
                @click='form.dialog = false' />
            </div>
          </q-form>
        </q-card>
      </q-dialog>

      <!-- 刪除商品時的彈出視窗 -->
      <q-dialog v-model="deleteDialog.dialog" seamless persistent>
        <q-card square class="row justify-center bg-info q-pa-lg">
          <div class="col-12 text-center text-h3 text-red q-pb-md">警告</div>
          <div class="col-12 text-center text-h6 text-dark q-pb-md">你確定要刪除<br>【{{ del.name }}】嗎？<br>刪除將無法復原！</div>
          <div class="col-12 row justify-around">
            <!-- 確定刪除 -->
            <q-btn @click="deleteProduct(del._id)" square flat class="col-4 bg-secondary text-dark q-my-sm"
              label="刪除" />
            <!-- 取消刪除 -->
            <q-btn square flat outline class="col-4 bg-dark text-secondary q-my-sm" label="取消"
              @click='deleteDialog.dialog = false' />
          </div>
        </q-card>
      </q-dialog>

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
const products = reactive([])

const pagination = reactive({
  items: [], // table要顯示的資料
  page: 1, // 目前第幾頁
  rowsPerPage: 5 // 每頁幾筆，0 代表 All
})

// 表單預設格式
const form = reactive({
  _id: '',
  name: '',
  description: '',
  inventory: false,
  sell: false,
  price: 0,
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
  price(v) {
    return (v > -1) || '價格必須大於或等於 0'
  },
  size(v) {
    return !v || !v.length || (v[0]?.type?.includes('image') && v[0]?.size <= 1024 * 1024 * 2) || '檔案格式不符（須為圖片檔，且檔案大小 2 MB 以下）'
  }
})

// 送出表單
const submitForm = async () => {
  // 表單送出時，因為後端要收到的是 FormData 的資料型態，所以要建立一個 FormData 物件
  const fd = new FormData()
  // 要把東西放進去 FormData 要使用 .append(key, value)，例如：fd.append('name', form.name)
  // 可以一行一行寫，也可以一個 for 迴圈搞定
  for (const key in form) {
    if (['_id', 'idx', 'dialog'].includes(key)) continue
    else if (key === 'image') {
      for (const image of form.image) {
        fd.append(key, image)
      }
    } else {
      fd.append(key, form[key])
    }
  }
  try {
    if (form._id.length === 0) {
      const { data } = await apiAuth.post('/products', fd)
      products.push(data.result)
      Swal.fire({
        icon: 'success',
        title: '新增成功',
        text: '您已成功新增一筆商品！'
      })
      init()
    } else {
      const { data } = await apiAuth.patch('/products/' + form._id, fd)
      products[form.idx] = data.result
      Swal.fire({
        icon: 'success',
        title: '修改成功',
        text: '您已成功修改該筆商品！'
      })
      init()
    }
    form.dialog = false
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: '新增失敗',
      text: error.isAxiosError ? error.response.data.message : error.message
    })
  }
}

// 預設 刪除商品的彈窗 為 false
const deleteDialog = reactive({
  dialog: false
})

/*
  定義一個變數，用來將 form 裡面的 _id 帶入 deleteProduct 的 function 裡
  又，因為開啟 刪除商品的彈窗 的按鈕放在 #body-cell-edit="edit" 裡
  所以才會寫 @click='openDeleteDialog(edit.row._id)'
*/
const del = reactive({
  _id: '',
  name: ''
})

/*
  開啟 刪除商品的彈窗，並帶入值
  此時 del.value = edit.row._id = productId
*/
const openDeleteDialog = (productId, productName) => {
  del._id = productId
  del.name = productName
  deleteDialog.dialog = true
}

/*
  刪除商品
  透過 deleteProduct(del) 將 最原始的 form._id 帶入 function
  form._id = edit.row._id = del.value = productId
*/
const deleteProduct = async (productId) => {
  deleteDialog.dialog = false
  try {
    await apiAuth.delete('/products/' + productId)
    await Swal.fire({
      icon: 'success',
      title: '刪除成功',
      text: '您已成功刪除該筆商品！'
    })
    init()
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: '刪除失敗',
      text: error.isAxiosError ? error.response.data.message : error.message
    })
  }
}

// 開啟表單
const openDialog = (_id, idx) => {
  form._id = _id
  // console.log(products[idx])
  if (idx > -1) {
    // 有 id => 編輯
    form.name = products[idx].name
    form.description = products[idx].description
    form.inventory = products[idx].inventory
    form.sell = products[idx].sell
    form.price = products[idx].price
  } else {
    // 沒 id => 清空
    form.name = ''
    form.description = ''
    form.inventory = false
    form.sell = false
    form.price = 0
  }
  form.image = []
  form.idx = idx
  form.dialog = true
}

const columns = [
  { name: 'image', label: '商品圖片', align: 'center', field: row => row.image[0] },
  {
    name: 'name',
    label: '商品名稱',
    field: row => row.name,
    format: val => `${val}`,
    // 是否凍結窗格
    required: true,
    align: 'center',
    // 是否可以排序(A-Z or Z-A)
    sortable: true
  },
  { name: 'inventory', label: '庫存狀態', field: row => row.inventory ? '有現貨' : '需預訂', align: 'center', sortable: true },
  { name: 'sell', label: '上架狀態', field: row => row.sell ? '上架' : '下架', align: 'center', sortable: true },
  { name: 'price', label: '商品價格', field: row => row.price, align: 'center', sortable: true },
  { name: 'edit', label: '商品編輯', align: 'center' }
]

// 抓後台所有商品的資料
const init = async () => {
  try {
    const { data } = await apiAuth.get('/products/all')
    products.splice(0, products.length)
    products.push(...data.result)
    products.reverse()
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: '失敗',
      text: error.isAxiosError ? error.response.data.message : error.message
    })
  }
}
init()

</script>
