<template>
  <q-page-container>
    <q-page class='row justify-center items-center'>
      <div class='row'>
        <div id='register-form' class='col-12 col-lg-6 column justify-center q-pa-lg bg-primary text-secondary'>
          <div class='col-auto text-h5 text-center q-mb-lg'>會員註冊</div>
          <q-form @submit.prevent='register'>
            <div class='col-auto'>帳號</div>
            <q-input name='account' type='text' v-model='form.account' :rules='rules.account' maxlength='20' placeholder='4 ~ 20 個字元' outlined
              square dense />
            <div class='col-auto'>密碼</div>
            <q-input name='password' :type="isPwd ? 'password' : 'text'" v-model='form.password' :rules='rules.password' maxlength='20' placeholder='4 ~ 20 個字元' outlined square dense>
              <template v-slot:append>
                <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer"
                  @click="isPwd = !isPwd" />
              </template>
            </q-input>
            <div class='col-auto'>姓名</div>
            <q-input name='name' type='text' v-model='form.name' :rules='rules.name' placeholder='至少 2 個中文字' outlined square dense />
            <div class='col-auto'>性別</div>
            <div class='row q-mt-sm q-mb-md'>
              <q-radio dense size='xs' v-model='form.gender' val='1' label='先生' class='q-mr-xl' />
              <q-radio dense size='xs' v-model='form.gender' val='2' label='小姐' class='q-ml-xl' />
            </div>
            <div class='col-auto'>信箱</div>
            <q-input name='email' type='email' v-model='form.email' :rules='rules.email' placeholder='xxx@xxx.com' outlined square dense />
            <div class='col-auto'>手機</div>
            <q-input name='tel' type='tel' v-model='form.tel' :rules='rules.tel' mask='####-###-###' maxlength='12'
            placeholder='共 10 碼' outlined square dense />
            <q-btn square label='註冊' type='submit' class='bg-secondary text-dark q-my-sm'
              style="width: 100%;"></q-btn>
          </q-form>
          <router-link to='login' class='text-center q-my-sm desktop-none'>已有帳號？</router-link>
        </div>
        <q-separator vertical class='mobile-none' />
        <div id='register-login' class='col-lg-6 column justify-center q-pa-lg bg-primary text-secondary mobile-none'>
          <div class='col-auto text-h5 text-center q-mb-xl'>已是會員？</div>
          <router-link to='login' class='text-center q-my-xl'>點此登入</router-link>
        </div>
      </div>
    </q-page>
  </q-page-container>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { isEmail } from 'validator'
import { api } from '@/boot/axios'
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'

const router = useRouter()
const loading = ref(false)
const isPwd = ref(true)

const form = reactive({
  account: '',
  password: '',
  name: '',
  gender: '',
  email: '',
  tel: ''
})

const rules = reactive({
  account: [
    v => !!v || '會員帳號為必填',
    v => (v.length >= 4 && v.length <= 20) || '會員帳號長度為 4 到 20 個字元',
    v => /^[a-z0-9]+$/.test(v) || '格式錯誤，只能由小寫英文及數字組成'
  ],
  password: [
    v => !!v || '會員密碼為必填',
    v => (v.length >= 4 && v.length <= 20) || '會員密碼長度為 4 到 20 個字元',
    v => /^(?=.*[a-z])(?=.*\d)[a-z\d]{4,20}$/.test(v) || '格式錯誤，至少包含一個小寫英文及數字'
  ],
  name: [
    v => !!v || '會員姓名為必填',
    v => (v.length >= 2) || '會員姓名至少 2 個字以上',
    v => /^[\u4e00-\u9fa5]{2,}$/.test(v) || '會員姓名格式錯誤，應為中文姓名'
  ],
  gender: [
    v => !!v || '會員性別為必填'
  ],
  email: [
    v => !!v || '連絡信箱為必填',
    v => isEmail(v) || '信箱格式錯誤'
  ],
  tel: [
    v => !!v || '手機號碼為必填',
    v => (v.length === 12) || '手機號碼為 10 個數字',
    v => /^09[0-9]{2}.[0-9]{3}.[0-9]{3}$/.test(v) || '手機號碼格式錯誤，應為 09 開頭'
  ]
})

const register = async () => {
  try {
    await api.post('/users', form)
    await Swal.fire({
      icon: 'success',
      title: '註冊成功',
      text: '您已成為法師事務所的會員！'
    })
    router.push('/')
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: '註冊失敗',
      text: (error.isAxiosError && error.response.data) ? error.response.data.message : '發生錯誤'
    })
  }
}
</script>
