<template>
  <q-page id="CartView" class="column">
    <div id="myheader" class="row justify-end items-center" style="width: 100%;">
      <q-list class='text-h5 text-secondary mobile-none'>
        <q-btn v-if='isLogin' round dense flat icon='fa-solid fa-address-card' to='/member' class="q-mx-xs">
          <q-tooltip transition-show='fade' transition-hide='fade' :offset='[0, 0]'>
            會員資料
          </q-tooltip>
        </q-btn>
        <q-btn v-if='isLogin' round dense flat icon='fa-regular fa-calendar-days' to='/booking' class="q-mx-xs">
          <q-tooltip transition-show='fade' transition-hide='fade' :offset='[0, 0]'>
            預約查詢
          </q-tooltip>
        </q-btn>
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

    <div id="mycontent" class="col-12 row content-start">
      <!-- 頁面 Title -->
      <div class="col-12 text-h4 text-xl-h3 text-secondary q-mb-md q-pl-md" style="width: 100%;">會員資料</div>

      <!-- 麵包屑 -->
      <div class="col-12 q-mt-md q-pl-lg" style="width: 100%;">
        <q-breadcrumbs>
          <q-breadcrumbs-el label="首頁" icon="fa-solid fa-house" to="/" />
          <q-breadcrumbs-el label="會員資料" icon="fa-solid fa-address-card" />
        </q-breadcrumbs>
      </div>

      <!-- 會員資料區 -->
      <div class="col-12 q-pa-md bg" style="width: 100%;">
        <!-- 外框 -->
        <div class="row justify-center q-py-lg-lg" style="border: 1px solid #CAB69E;">
          <!-- 真正放內容的區塊，避免外框異常 -->
          <div class="row justify-start" style="width: 100%;">
            <!-- 會員圖片區 -->
            <div class="col-12 col-xl-5 row justify-center q-pa-lg bg">
              <!-- 再包一個 -->
              <q-avatar class="bg-info row justify-center" style="width: 20rem; height: 20rem;">
                <img :src="avatar((member.gender === 1) ? 'male' : 'female', member.account)" class="q-mb-xl"
                  style="object-fit: cover;">
              </q-avatar>
            </div>
            <!-- 會員資料區 -->
            <div class="col-12 col-xl-7 row justify-start content-around text-accent text-h6 text-lg-h5 q-pa-lg bg">
              <div class="col-12 row justify-end q-pr-md">
                <q-btn class="col-auto text-secondary" style="font-size: medium; padding: 0px 8px;"
                  @click='openDialog(member._id)' outline>編輯資料</q-btn>
              </div>
              <div class="col-12 row">
                <div class="col-3 col-xl-2">帳號：</div>
                <div class="col col-xl-10 text-secondary">{{ member.account }}</div>
              </div>
              <div class="col-12 col-xl-6 row">
                <div class="col-3 col-xl-4">姓名：</div>
                <div class="col col-xl-8 text-secondary">{{ member.name }}</div>
              </div>
              <div class="col-12 col-xl-6 row">
                <div class="col-3 col-xl-4">生日：</div>
                <div class="col col-xl-8 text-secondary">{{ new Date(member.birthday).toLocaleDateString() }}</div>
              </div>
              <div class="col-12 col-xl-6 row">
                <div class="col-3 col-xl-4">性別：</div>
                <div class="col col-xl-8 text-secondary">{{ (member.gender === 1) ? '男' : '女' }}</div>
              </div>
              <div class="col-12 col-xl-6 row">
                <div class="col-3 col-xl-4">電話：</div>
                <div class="col col-xl-8 text-secondary">{{ member.tel }}</div>
              </div>
              <div class="col-12 row">
                <div class="col-3 col-xl-2">信箱：</div>
                <div class="col col-xl-10 text-secondary">{{ member.email }}</div>
              </div>
              <div class="col-12 row">
                <div class="col-3 col-xl-2">住址：</div>
                <div class="col col-xl-10 text-secondary">{{ member.address }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 編輯資料時的彈出視窗 -->
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

    </div>
  </q-page>
</template>

<script setup>
import { reactive, computed } from 'vue'
import { apiAuth } from '@/boot/axios'
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'
import Swal from 'sweetalert2'

const user = useUserStore()
const { logout } = user
const { isLogin, isAdmin, cart } = storeToRefs(user)

// 定義會員圖片變數
const avatar = (gender, account) => {
  return 'https://joeschmoe.io/api/v1/' + '/' + gender + '/' + account
}

// 定義 members 空陣列，讓後台抓資料推進去
const member = reactive({
  _id: '',
  account: '',
  name: '',
  gender: '',
  birthday: '',
  tel: '',
  email: '',
  address: '',
  avatar: ''
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
  date(v) {
    return v => /^-?[\d]+\/[0-1]\d\/[0-3]\d$/.test(v)
  }
})

// 開啟會員資料表單
const openDialog = (_id) => {
  form._id = _id
  // 有 id => 編輯
  form.name = member.name
  form.gender = member.gender
  form.birthday = member.birthday
  form.email = member.email
  form.tel = member.tel
  form.address = member.address
  form.dialog = true
}

// 送出表單
const submitForm = async () => {
  try {
    if (form._id.length === 0) {
      const { data } = await apiAuth.post('/users', form)
      member.push(data.result)
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
      member[form.idx] = data.result
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

// 抓後台該會員的資料
const init = async () => {
  try {
    const { data } = await apiAuth.get('/users/')
    member._id = data.result._id
    member.account = data.result.account
    member.name = data.result.name
    member.gender = data.result.gender
    member.birthday = data.result.birthday
    member.tel = data.result.tel
    member.email = data.result.email
    member.address = data.result.address
    member.avatar = data.result.avatar
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
