<template>
  <q-page-container>
    <q-page class="row justify-center items-center">
      <div id="register" class="col-12 col-lg-6 column justify-center q-pa-lg bg-primary text-secondary">
        <div class="col-auto text-h5 text-center q-mb-lg">會員註冊</div>
        <q-form @submit="onSubmit">
          <div class="col-auto">帳號</div>
          <q-input
          name="account"
          type="text"
          v-model="form.account"
          :rules="rules.account"
          counter="20"
          maxlength="20"
          outlined
          square
          dense
          />
          <div class="col-auto">密碼</div>
          <q-input
          name="password"
          type="password"
          v-model="form.password"
          :rules="rules.password"
          counter="20"
          maxlength="20"
          outlined
          square
          dense
          />
          <div class="col-auto">姓名</div>
          <q-input
          name="name"
          type="text"
          v-model="form.name"
          :rules="rules.name"
          outlined
          square
          dense
          />
          <div class="col-auto">性別</div>
          <div class="q-mt-sm q-mb-md">
            <q-radio dense size="xs" v-model="form.gender" val="1" label="先生"/>
            <q-radio dense size="xs" v-model="form.gender" val="2" label="小姐" class="q-ml-lg" />
          </div>
          <div class="col-auto">信箱</div>
          <q-input
          name="email"
          type="email"
          v-model="form.email"
          :rules="rules.email"
          outlined
          square
          dense
          />
          <div class="col-auto">手機</div>
          <q-input
          name="tel"
          type="tel"
          v-model="form.tel"
          :rules="rules.tel"
          mask="####-###-###"
          counter="12"
          maxlength="12"
          outlined
          square
          dense
          />
        </q-form>
        <q-btn square class="bg-secondary text-dark q-my-sm">註冊</q-btn>
        <router-link to="login" class="text-center q-my-sm">已有帳號？</router-link>
      </div>
      <q-separator vertical dark />
      <div id="register-login" class="col-lg-6 column justify-center q-pa-lg bg-primary text-secondary"></div>
    </q-page>
  </q-page-container>
</template>

<script setup>
import { reactive } from 'vue'
import { isEmail } from 'validator'

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
    v => v.match(/^(?=.*[a-z])(?=.*\d)[a-z\d]{4,20}$/) || '格式錯誤，至少包含一個小寫英文及數字'
  ],
  password: [
    v => !!v || '會員密碼為必填',
    v => (v.length >= 4 && v.length <= 20) || '會員密碼長度為 4 到 20 個字元',
    v => v.match(/^(?=.*[a-z])(?=.*\d)[a-z\d]{4,20}$/) || '格式錯誤，至少包含一個小寫英文及數字'
  ],
  name: [
    v => !!v || '會員姓名為必填',
    v => (v.length >= 2) || '會員姓名至少 2 個字以上',
    v => v.match(/^[\u4e00-\u9fa5]{2,}$/) || '真實姓名格式錯誤，應為中文姓名'
  ],
  gender: '',
  email: [
    v => !!v || '連絡信箱為必填',
    v => isEmail(v) || '信箱格式錯誤'
  ],
  tel: [
    v => !!v || '手機號碼為必填',
    v => (v.length === 12) || '手機號碼為 10 個數字',
    v => v.match(/^09[0-9]{2}.[0-9]{3}.[0-9]{3}$/) || '手機號碼格式錯誤，應為 09 開頭'
  ]
})
</script>
