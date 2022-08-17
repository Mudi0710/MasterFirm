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
  => 不需要引入 router，直接在 function 將 router 前面加上 this. 就可以了
*/
// import router from '@/router'

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
    async logout() {
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
    },
    async addCart(data) {
      if (this.token.length === 0) {
        Swal.fire({
          icon: 'error',
          title: '加入失敗',
          text: '請先登入會員，再使用購物車功能。'
        })
        this.router.push('/login')
        return
      }
      if (data.quantity <= 0) {
        Swal.fire({
          icon: 'error',
          title: '加入失敗',
          text: '訂購數量必須大於 0'
        })
        return
      }
      try {
        const { data: resData } = await apiAuth.post('/users/cart', data)
        this.cart = resData.result
        Swal.fire({
          icon: 'success',
          title: '加入成功',
          text: '商品已加入購物車！'
        })
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: '加入失敗',
          text: '商品無法加入購物車！'
        })
      }
    },
    async updateCart(data) {
      try {
        await apiAuth.patch('/users/cart', data)
        return true
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: '失敗',
          text: '更新購物車失敗！'
        })
        return false
      }
    },
    async checkout() {
      try {
        await apiAuth.post('/orders')
        this.cart = 0
        Swal.fire({
          icon: 'success',
          title: '成功',
          text: '結帳成功，謝謝您的購買！'
        })
        this.router.push('/order')
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: '失敗',
          text: '結帳失敗，請稍後再嘗試。'
        })
      }
    },
    async getUser() {
      if (this.token.length === 0) return
      try {
        const { data } = await apiAuth.get('/users')
        this.account = data.result.account
        this.role = data.result.role
        this.cart = data.result.cart
      } catch (error) {
        this.logout()
      }
    }
  },
  persist: {
    key: 'vite-shop',
    paths: ['token']
  }
})
