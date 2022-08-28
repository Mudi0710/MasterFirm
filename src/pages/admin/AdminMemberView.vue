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
        <div class='col-auto text-h3 text-secondary q-my-sm q-pl-md'>會員管理</div>
        <!-- <q-btn @click="openDialog('', -1)" square flat
          class='col-auto q-mr-xl bg-secondary text-dark text-h6 q-my-sm createBtn'>新增會員</q-btn> -->
      </div>

      <!-- <pre class="text-secondary">{{ members }}</pre> -->
      <!-- 會員表格區 -->
      <div class="q-pa-md">
        <q-table :grid="$q.screen.lt.xl" :columns="columns" :rows="members" row-key="name" square bordered wrap-cells
          binary-state-sort dense :filter="filter" :loading="loading" :pagination="pagination"
          rows-per-page-label="每頁顯示筆數" no-data-label="目前沒有新增任何會員" no-results-label="Oops...找不到該會員">

          <!-- 會員圖片(頭像) -->
          <template #body-cell-image="image">
            <q-td :img="image" align="center" ellipsis>
              <!-- <pre>{{ image.row.name }}</pre> -->
              <!-- <pre>{{ image.row.gender }}</pre> -->
              <q-avatar square size="100px">

                <img :src="avatar((image.row.gender === 1) ? 'male' : 'female', image.row.account)" class="q-mb-xl"
                  style="object-fit: cover;">
              </q-avatar>
            </q-td>
          </template>

          <!-- 會員搜尋 -->
          <template v-slot:top-right>
            <q-input borderless dense debounce="300" v-model="filter" placeholder="&nbsp;Search" class="search">
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </template>

          <!-- 會員管理 -->
          <template #body-cell-control="control">
            <q-td :control="control">
              <!-- <pre>{{ control }}</pre> -->
              <div class="row justify-center">
                <!-- <q-btn class="col-auto q-mx-sm" @click='openDialog(control.row._id, control.rowIndex)' outline>會員詳情</q-btn> -->
                <q-btn class="col-auto q-mx-sm" @click='openDialog(control.row._id, control.rowIndex)' outline>編輯會員
                </q-btn>
                <q-btn class="col-auto q-mx-sm" @click='openDeleteDialog(control.row._id)' outline>刪除會員</q-btn>
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
                  <!-- 會員圖片 -->
                  <q-responsive v-if="col.name == 'image'" :ratio="1 / 1">
                    <img :src="avatar((card.row.gender === 1) ? 'male' : 'female', card.row.account)" class="q-mb-xl"
                      style="object-fit: cover;">
                  </q-responsive>
                  <!-- 會員資訊 -->
                  <div v-else-if="col.name !== 'image' && col.name !== 'control'" class="text-left q-mx-auto">
                    <div class="row justify-between">
                      <span class="text-accent">{{ col.label }}：</span>
                      <span class="text-secondary text-right">{{ col.value }}</span>
                    </div>
                  </div>
                  <!-- 會員編輯 -->
                  <div v-else-if="col.name === 'control'" class="text-left q-mx-auto">
                    <!-- <pre class="text-secondary">{{ card }}</pre> -->
                    <div class="row justify-between">
                      <span class="text-accent">{{ col.label }}：</span>
                      <q-btn class="col-auto text-secondary" style="font-size: xx-small; padding: 0px 8px;"
                        @click='openDialog(card.row._id, card.rowIndex)' outline>編輯會員</q-btn>
                    </div>
                    <div class="row justify-end q-mt-sm">
                      <q-btn class="col-auto text-secondary" style="font-size: xx-small; padding: 0px 8px;"
                        @click='openDeleteDialog(card.row._id)' outline>刪除會員</q-btn>
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

      <!-- 新增會員時的彈出視窗 -->
      <q-dialog v-model="form.dialog" seamless>
        <q-card id="dialog" flat square bordered persistent v-if="form.dialog"
          class="bg-info text-secondary shadow-white">
          <q-form @submit.prevent='submitForm' class="q-pa-md">
            <!-- 會員名稱 -->
            <p class="text-h6 text-dark">會員名稱</p>
            <q-input v-model="form.name" :rules='[rules.required]' type='text' outlined square dense />

            <!-- 會員性別 -->
            <div class="row col-6">
              <div class="col-12 text-h6 text-dark">會員性別</div>
              <div class="col-12 row content-center q-my-sm" style="height: 40px;">
                <q-radio dense size='xs' v-model='form.gender' :val=1 label='先生' class='text-dark q-mr-xl' />
                <q-radio dense size='xs' v-model='form.gender' :val=2 label='小姐' class='text-dark q-ml-xl' />
              </div>
            </div>

            <!-- 會員生日 -->
            <div class="col-6 q-mr-xs">
              <p class="text-h6 text-dark">會員生日</p>
              <!-- <q-input v-model="form.birthday" type='text' outlined square dense /> -->
              <q-input filled v-model="form.birthday" dense mask="date" :rules="[rules.date]">
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                      <q-date v-model="form.birthday" :title="form.name" subtitle="請選擇生日" class="bg-info">
                        <div class="row items-center justify-end">
                          <q-btn v-close-popup label="關閉" color="primary" flat />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>

            <!-- 會員手機 -->
            <p class="text-h6 text-dark">會員手機</p>
            <q-input v-model="form.tel" :rules='[rules.required]' mask='####-###-###' outlined square dense
              class="text-primary" />
            <!-- 會員信箱 -->
            <p class="text-h6 text-dark">會員信箱</p>
            <q-input v-model="form.email" :rules='[rules.required]' outlined square dense class="text-primary" />
            <!-- 會員住址 -->
            <p class="text-h6 text-dark">會員住址</p>
            <q-input v-model="form.address" outlined square dense class="text-primary" />
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

      <!-- 刪除會員時的彈出視窗 -->
      <q-dialog v-model="deleteDialog.dialog" seamless persistent>
        <q-card square class="row justify-center bg-info q-pa-lg">
          <div class="col-12 text-center text-h3 text-red q-pb-md">警告</div>
          <div class="col-12 text-center text-h6 text-dark q-pb-md">你確定要刪除會員嗎？<br>刪除會員將無法復原！</div>
          <div class="col-12 row justify-around">
            <!-- 確定刪除 -->
            <q-btn @click="deleteMember(del)" square flat class="col-4 bg-secondary text-dark q-my-sm" label="確定刪除會員" />
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
import { api, apiAuth } from '@/boot/axios'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/user'
import { useQuasar } from 'quasar'
import { isEmail } from 'validator'
// import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'

const user = useUserStore()
const { logout } = user
const { isLogin } = storeToRefs(user)

// 定義會員圖片變數
const avatar = (gender, account) => {
  return 'https://joeschmoe.io/api/v1/' + '/' + gender + '/' + account
}

// const router = useRouter()
const isPwd = ref(true)

// 表格篩選功能
const filter = ref('')
const $q = useQuasar()
const loading = ref(false)

// 定義 members 空陣列，讓後台抓資料推進去
const members = reactive([])

const pagination = reactive({
  items: [], // table要顯示的資料
  page: 1, // 目前第幾頁
  rowsPerPage: 20 // 每頁幾筆，代表 All
})

// 表單預設格式
const form = reactive({
  _id: '',
  name: '',
  gender: 1,
  birthday: '',
  email: '',
  tel: '',
  address: '',
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
  date(v) {
    return v => /^-?[\d]+\/[0-1]\d\/[0-3]\d$/.test(v)
  },
  size(v) {
    return !v || !v.length || (v[0]?.type?.includes('image') && v[0]?.size <= 1024 * 1024 * 2) || '檔案格式不符（須為圖片檔，且檔案大小 2 MB 以下）'
  }
})

// 送出表單
const submitForm = async () => {
  // // 表單送出時，因為後端要收到的是 FormData 的資料型態，所以要建立一個 FormData 物件
  // const fd = new FormData()
  // // 要把東西放進去 FormData 要使用 .append(key, value)，例如：fd.append('name', form.name)
  // // 可以一行一行寫，也可以一個 for 迴圈搞定
  // for (const key in form) {
  //   if (['_id', 'idx', 'dialog'].includes(key)) continue
  //   else if (key === 'image') {
  //     for (const image of form.image) {
  //       fd.append(key, image)
  //     }
  //   } else {
  //     fd.append(key, form[key])
  //   }
  // }
  // console.log(form)
  try {
    if (form._id.length === 0) {
      const { data } = await apiAuth.post('/users', form)
      members.push(data.result)
      Swal.fire({
        icon: 'success',
        title: '新增成功',
        text: '您已成功新增一名會員！'
      })
      init()
    } else {
      // console.log('進了')
      const { data } = await apiAuth.patch('/users/' + form._id, form)
      // console.log(data.result)
      members[form.idx] = data.result
      Swal.fire({
        icon: 'success',
        title: '修改成功',
        text: '您已成功修改該名會員！'
      })
    }
    form.dialog = false
    init()
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: '新增失敗',
      text: error.isAxiosError ? error.response.data.message : error.message
    })
  }
}

// 預設 刪除會員的彈窗 為 false
const deleteDialog = reactive({
  dialog: false
})

/*
  定義一個變數，用來將 form 裡面的 _id 帶入 deleteMember 的 function 裡
  又，因為開啟 刪除會員的彈窗 的按鈕放在 #body-cell-edit="edit" 裡
  所以才會寫 @click='openDeleteDialog(edit.row._id)'
*/
const del = ref('')

/*
  開啟 刪除會員的彈窗，並帶入值
  此時 del.value = edit.row._id = memberId
*/
const openDeleteDialog = (memberId) => {
  del.value = memberId
  deleteDialog.dialog = true
}

/*
  刪除會員
  透過 deleteMember(del) 將 最原始的 form._id 帶入 function
  form._id = edit.row._id = del.value = memberId
*/
const deleteMember = async (memberId) => {
  deleteDialog.dialog = false
  try {
    await apiAuth.delete('/users/' + memberId)
    await Swal.fire({
      icon: 'success',
      title: '刪除成功',
      text: '您已成功刪除該名會員！'
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
  // console.log(members[idx])
  if (idx > -1) {
    // 有 id => 編輯
    form.name = members[idx].name
    form.gender = members[idx].gender
    form.birthday = members[idx].birthday
    form.email = members[idx].email
    form.tel = members[idx].tel
    form.address = members[idx].address
  } else {
    // 沒 id => 清空
    form.name = ''
    form.gender = ''
    form.birthday = ''
    form.email = ''
    form.tel = ''
    form.address = ''
  }
  form.image = []
  form.idx = idx
  form.dialog = true
}

const columns = [
  { name: 'image', label: '會員照片', align: 'center' },
  { name: 'account', label: '會員帳號', align: 'center', field: row => row.account },
  { name: 'role', label: '會員身份', align: 'center', field: row => (row.role === 1) ? '管理者' : '一般會員' },
  { name: 'name', label: '會員姓名', align: 'center', field: row => row.name },
  { name: 'tel', label: '會員手機', align: 'center', field: row => row.tel },
  { name: 'email', label: '會員信箱', align: 'center', field: row => row.email },
  { name: 'control', label: '會員管理', align: 'center' }
]

// 抓後台所有會員的資料
const init = async () => {
  try {
    const { data } = await apiAuth.get('/users/all')
    members.splice(0, members.length)
    members.push(...data.result)
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
