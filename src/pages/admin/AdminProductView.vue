<template>
  <q-page class='column'>
    <div id='myheader' class='bg-red'></div>
    <div id='mycontent' class='bg-blue'>
      <div class='row justify-between'>
        <div class='col-6 text-h3 text-secondary q-my-sm'>商品管理</div>
        <q-btn v-if='!form.dialog' @click="openDialog('', -1)" square flat label='新增商品'
          class='col-6 q-mr-xl bg-secondary text-dark text-h6 q-my-sm' style='width: 10%;'></q-btn>
      </div>

      <template>
        <div class='q-pa-md'>
          <!-- 商品總覽表格 -->
          <q-table :grid='$q.screen.xs' flat bordered :rows='rows' :columns='columns' row-key='name' :filter='filter'
            v-if='!form.dialog'>

            <!-- 搜尋列 -->
            <!-- <template v-slot:top-right>
              <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
                <template v-slot:append>
                  <q-icon name="search" />
                </template>
              </q-input>
            </template> -->

            <!-- 商品圖片(頭像) -->
            <!-- <template #body-cell-image="image">
              <q-td :img="img">
                <q-avatar square size="100px">
                  <img :src="image.row.image[0]" class="q-mb-xl">
                </q-avatar>
              </q-td>
            </template> -->

            <!-- 商品編輯 -->
            <!-- <template #body-cell-edit="edit">
              <q-td :edit="edit">
                <div class="column">
                  <q-btn class="q-mb-sm" @click='updateCart()' outline>修改</q-btn>
                </div>
              </q-td>
            </template> -->

          </q-table>
        </div>
      </template>

      <!-- 新增商品時的彈出視窗 -->
      <q-card id="productForm" flat square bordered v-if="form.dialog" class="bg-primary text-secondary">
        <q-form @submit.prevent='submitForm' class="q-pa-md" style="max-width: 400px">
          <!-- 商品名稱 -->
          <p>商品名稱：{{ form.name }}</p>
          <q-input v-model="form.name" :rules='[rules.required]' type='text' outlined square dense />
          <!-- 商品描述 -->
          <p>商品描述：{{ form.description }}</p>
          <q-input v-model="form.description" :rules='[rules.required]' type='text' outlined square dense />
          <!-- 庫存狀態 -->
          <p>庫存狀態：{{ form.inventory }}</p>
          <q-toggle v-model="form.inventory" :label="form.inventory ? '有現貨' : '沒現貨'" />
          <!-- 上架狀態 -->
          <p>上架狀態：{{ form.sell }}</p>
          <q-toggle v-model="form.sell" false-value="下架" true-value="上架" />
          <!-- 商品價格 -->
          <p>商品價格：{{ form.price }}</p>
          <q-input v-model.number="form.price" min='0' type='number' :rules='[rules.required, rules.price]' outlined
            square dense />
          <!-- 商品圖片 -->
          <p>商品圖片：{{ form.image }}</p>
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
          <!-- 確定新增 -->
          <q-btn square flat type='submit' class="bg-secondary text-dark q-my-sm" label="新增商品" />
          <!-- 取消新增 -->
          <q-btn square flat outline class="bg-dark text-secondary q-my-sm" label="取消" @click='form.dialog = false'
            :disabled='form.submitting' />
        </q-form>

      </q-card>
    </div>
  </q-page>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { apiAuth } from '../../boot/axios'
import Swal from 'sweetalert2'
import { useQuasar } from 'quasar'
const filter = ref('')
const $q = useQuasar()
const products = reactive([])

// 表單預設格式
const form = reactive({
  _id: '',
  name: '',
  description: '',
  inventory: 'false',
  sell: 'false',
  price: 0,
  image: [],
  idx: -1,
  dialog: false,
  valid: false,
  submitting: false
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
const submitForm = async (
) => {
  // 讓取消按鈕的 :disable = true
  form.submitting = true
  // 表單送出時，因為後端要收到的是 FormData 的資料型態，所以要建立一個 FormData 物件
  const fd = new FormData()
  // 要把東西放進去 FormData 要使用 .append(key, value)，例如：fd.append('name', form.name)
  // 可以一行一行寫，也可以一個 for 迴圈搞定
  for (const key in form) {
    if (['_id', 'idx', 'dialog', 'valid', 'submitting'].includes(key)) continue
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
      const { data } = await apiAuth.post('/product', fd)
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
  // 讓取消按鈕的 :disable = false
  form.submitting = false
}

// 清空表單
const openDialog = (_id, idx) => {
  form._id = _id
  if (idx > -1) {
    form.name = products[idx].name
    form.description = products[idx].description
    form.inventory = products[idx].inventory
    form.sell = products[idx].sell
    form.price = products[idx].price
  } else {
    form.name = ''
    form.description = ''
    form.inventory = false
    form.sell = false
    form.price = 0
  }
  form.image = []
  form.idx = idx
  form.dialog = true
  form.valid = false
  form.submitting = false
}

const rows = reactive([{
  name: 'Frozen Yogurt',
  description: 'Frozen Yogurt',
  inventory: true,
  sell: true,
  price: 400
}])
const columns = [
  {
    name: 'name',
    label: '商品名稱',
    field: row => row.name,
    // 是否凍結窗格
    required: true,
    align: 'left',
    // 是否可以排序(A-Z or Z-A)
    sortable: true
  },
  { name: 'description', label: '商品描述', field: row => row.description, align: 'left', sortable: true },
  { name: 'inventory', label: '庫存狀態', field: row => row.inventory, align: 'center', sortable: true },
  { name: 'sell', label: '上架狀態', field: row => row.sell, align: 'center', sortable: true },
  { name: 'price', label: '商品價格', field: row => row.price, align: 'right', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) }
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
