<template>
  <q-page class='column'>
    <div id='myheader' class=''></div>
    <div id='mycontent' class=''>
      <div class='row justify-between'>
        <div class='col-auto text-h3 text-secondary q-my-sm'>商品管理</div>
        <q-btn @click="openDialog('', -1)" square flat
          class='col-auto q-mr-xl bg-secondary text-dark text-h6 q-my-sm createBtn'>新增商品</q-btn>
      </div>

      <div class="q-pa-md">
        <q-table :grid="$q.screen.lt.xl" :columns="columns" :rows="products" row-key="name" square bordered wrap-cells binary-state-sort dense :filter="filter" :loading="loading" :pagination="pagination" rows-per-page-label="每頁顯示筆數" no-results-label="Oops...找不到該筆資料">
          <!-- 搜尋列 -->
          <template v-slot:top-right>
            <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
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
                <img :src="image.row.image" class="q-mb-xl" style="object-fit: cover;">
              </q-avatar>
            </q-td>
          </template>
          <!-- 商品編輯 -->
          <template #body-cell-edit="edit">
            <q-td :edit="edit">
              <!-- <pre>{{ edit }}</pre> -->
              <div class="row justify-center">
                <q-btn class="col-auto" @click='openDialog(edit.row._id, edit.rowIndex)' outline>修改商品</q-btn>
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
          <!-- loading 效果 -->
          <!-- QInnerLoading必须是其父元素内部的最后一个元素，以便它可以显示在其他内容的顶部。 -->
          <template v-slot:loading>
            <q-inner-loading showing dark transition-show="fade" color="primary" />
          </template>
        </q-table>
      </div>

      <!-- 新增商品時的彈出視窗 -->
      <q-dialog v-model="form.dialog" persistent>
        <q-card id="productForm" flat square bordered persistent v-if="form.dialog" class="bg-primary text-secondary">
          <q-form @submit.prevent='submitForm' class="q-pa-md">
            <!-- 商品名稱 -->
            <p class="text-h6 text-accent">商品名稱</p>
            <q-input v-model="form.name" :rules='[rules.required]' type='text' outlined square dense />
            <!-- 商品描述 -->
            <p class="text-h6 text-accent">商品描述</p>
            <q-input v-model="form.description" :rules='[rules.required]' type='text' outlined square dense />
            <div class="row q-mb-sm">
              <!-- 庫存狀態 -->
              <div class="column col-6">
                <div class="col-6 text-h6 text-accent">庫存狀態</div>
                <q-toggle class="col-6" v-model="form.inventory" :label="form.inventory ? '有現貨' : '沒現貨'" />
              </div>
              <!-- 上架狀態 -->
              <div class="column col-6">
                <div class="col-6 text-h6 text-accent">上架狀態</div>
                <q-toggle class="col-6" v-model="form.sell" :label="form.sell ? '上架' : '下架'" />
              </div>
            </div>
            <!-- 商品價格 -->
            <p class="text-h6 text-accent">商品價格</p>
            <q-input v-model.number="form.price" min='0' :rules='[rules.required, rules.price]' outlined square dense />
            <!-- 商品圖片 -->
            <p class="text-h6 text-accent">商品圖片</p>
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
    </div>
  </q-page>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { apiAuth } from '../../boot/axios'
import { useQuasar } from 'quasar'
import Swal from 'sweetalert2'

const filter = ref('')
const $q = useQuasar()
const loading = ref(false)
const products = reactive([])

const pagination = reactive({
  items: [], // table要顯示的資料
  page: 1, // 目前第幾頁
  rowsPerPage: 5 // 每頁幾筆
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
        text: '您已成功新增商品！'
      })
    } else {
      const { data } = await apiAuth.patch('/products/' + form._id, fd)
      products[form.idx] = data.result
      Swal.fire({
        icon: 'success',
        title: '修改成功',
        text: '您已成功修改商品！'
      })
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

// 開啟表單
const openDialog = (_id, idx) => {
  form._id = _id
  console.log(products[idx])
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
  // { name: 'description', label: '商品描述', field: row => row.description, align: 'left' },
  { name: 'inventory', label: '庫存狀態', field: row => row.inventory ? '有現貨' : '需預訂', align: 'center', sortable: true },
  { name: 'sell', label: '上架狀態', field: row => row.sell ? '上架' : '下架', align: 'center', sortable: true },
  { name: 'price', label: '商品價格', field: row => row.price, align: 'center', sortable: true },
  { name: 'edit', label: '商品編輯', align: 'center' }
]

// 抓後台所有商品的資料
const init = async () => {
  try {
    const { data } = await apiAuth.get('/products/all')
    products.push(...data.result)
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
