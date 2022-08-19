<template>
  <q-page class='row justify-center items-center'>
    <div class='row shadow'>
      <div id='login-register' class='col-lg-6 column justify-center q-pa-lg bg-primary text-secondary mobile-none'>
        <div class='col-auto text-h5 text-center q-mb-xl'>不是會員？</div>
        <router-link to='register' class='text-center q-my-xl'>點此註冊</router-link>
      </div>
      <q-separator vertical class='mobile-none' />
      <div id='login-form' class='col-12 col-lg-6 column justify-center q-pa-lg bg-primary text-secondary'>
        <div class='col-auto text-h5 text-center q-mb-lg'>會員登入</div>
        <q-form @submit.prevent='login'>
          <div class='col-auto'>帳號</div>
          <q-input name='account' type='text' v-model='form.account' :rules='rules.account' maxlength='20' outlined
            square dense />
          <div class='col-auto'>密碼</div>
          <q-input name='password' :type="isPwd ? 'password' : 'text'" v-model='form.password' :rules='rules.password'
            maxlength='20' outlined square dense>
            <template v-slot:append>
              <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPwd = !isPwd" />
            </template>
          </q-input>
          <q-btn square flat label='登入' type='submit' class='bg-secondary text-dark q-my-sm' style="width: 100%;">
          </q-btn>
        </q-form>
        <router-link to='register' class='text-center q-my-sm desktop-none'>沒有帳號？</router-link>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useUserStore } from '@/stores/user'

const user = useUserStore()
const isPwd = ref(true)

const form = reactive({
  account: '',
  password: ''
})

const rules = reactive({
  account: [
    v => !!v || '會員帳號為必填',
    v => (v.length >= 4 && v.length <= 20) || '會員帳號長度為 4 到 20 個字元',
    v => /^[a-z0-9]+$/.test(v) || '格式錯誤，至少包含一個小寫英文及數字'
  ],
  password: [
    v => !!v || '會員密碼為必填',
    v => (v.length >= 4 && v.length <= 20) || '會員密碼長度為 4 到 20 個字元',
    v => /^(?=.*[a-z])(?=.*\d)[a-z\d]{4,20}$/.test(v) || '格式錯誤，至少包含一個小寫英文及數字'
  ]
})

const login = () => {
  user.login(form)
}
</script>
