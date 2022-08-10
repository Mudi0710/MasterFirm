import { defineStore } from 'pinia'
import { api, apiAuth } from '@/boot/axios'
import Swal from 'sweetalert2'
/*
  import { useRouter } from 'vue-router'
  const router = userRouter()
  => 在 pinia 裡面不能這樣引入，會是 undefined，所以要這麼做
  => import router from '@/router'
  2022/07/11 1:35:14

  BUT!! 在 Quasar 寫法又不一樣
*/

export const useUserStore = defineStore({
  id: 'user',
  // 設定前台網頁初始狀態時，要儲存哪些使用者的資料
  state() {
    return {
      token: '',
      account: '',
      name: '',
      role: 0,
      cart: 0
    }
  },
  getters: {
    // 判斷是否登入
    isLogin() {
      return this.token.length !== 0
    },
    // 判斷是否為管理者
    isAdmin() {
      return this.role === 1
    },
    // 使用者大頭貼
    avatar() {
      return 'https://ui-avatars.com/api/?length=4&rounded=true&background=1E1918&color=CAB69E&size=128&font-size=0.22&bold=true&name=' + this.name
    }
  },
  // 登入動作
  actions: {
    async login(form) {
      try {
        const { data } = await api.post('/users/login', form)
        this.token = data.result.token
        this.account = data.result.account
        this.name = data.result.name
        this.role = data.result.role
        this.cart = data.result.cart
        await Swal.fire({
          icon: 'success',
          title: '登入成功',
          text: `【${this.name}】您好，歡迎回來！`
        })
        // Quasar 需要加 this
        this.router.push('/')
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: '登入失敗',
          text: (error.isAxiosError && error.response.data) ? error.response.data.message : '發生錯誤'
        })
      }
    },
    async logout () {
      try {
        // 設定新的 axios 實體，並加上 JWT
        await apiAuth.delete('/users/logout')
        this.router.push('/')
        Swal.fire({
          icon: 'success',
          title: '登出成功',
          text: `【${this.name}】再見，法師事務所隨時歡迎您回來！`
        })
      } catch (_) {
      }
      this.token = ''
      this.account = ''
      this.name = ''
      this.role = 0
      this.cart = 0
    }
  }
})
