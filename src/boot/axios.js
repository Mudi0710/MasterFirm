import { boot } from 'quasar/wrappers'

import axios from 'axios'
import { useUserStore } from '@/stores/user'

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)

// const api = axios.create({ baseURL: 'https://api.example.com' })
// export { api }
/*
  由於每個與 api 溝通的地方都要寫 import.meta.env.VITE_API，重複寫實在太麻煩
  因此換個寫法，自訂一個自己的預設 axios 設定
  建立一個新的 axios 實體，更改預設的設定 => baseURL 使用 API網址(process.env.VITE_API)
  2022/07/04 7:11:00
*/
export const api = axios.create({
  baseURL: import.meta.env.VITE_API
})

/*
  與上面的 post 相同，由於每個與 api 溝通的地方都要重複寫
  因此換個寫法，自訂一個自己的預設 axios 設定
  2022/07/11 2:45:30
*/
export const apiAuth = axios.create({
  baseURL: import.meta.env.VITE_API
})

/* axios ---> axios 攔截請求(req) --> API SERVER --> axios 攔截回應(res) --> 呼叫的地方 */

// axios 攔截請求，加上JWT
apiAuth.interceptors.request.use(config => {
  const user = useUserStore()
  config.headers.authorization = `Bearer ${user.token}`
  return config
})

// 2022/07/11 7:25:35、8:21:30 路徑說明
// axios 攔截回應，加上JWT
apiAuth.interceptors.response.use(res => {
  return res
}, error => {
  // 如果請求有回應
  if (error.response) {
    // 如果是 401，可能是 JWT 過期
    if (error.response.status === 401) {
      // 確認原始請求(error.config)的網址不是延長、也不是登出，才重新登入
      // 如果沒有加上這條判斷式，請求就會一直循環 401 出不來
      if (error.config.url !== '/users/extend' && error.config.url !== '/users/logout') {
        const user = useUserStore()
        // 傳送延長請求
        // post 後面一定要帶參數，這裡給他一個空物件，反正他不會去讀
        return apiAuth.post('/users/extend', {}).then(({ data }) => {
          // 更新 使用者的JWT
          user.token = data.result
          // 使用新的 JWT 再次嘗試原始請求(error.config)
          error.config.headers.authorization = `Bearer ${user.token}`
          // 用 axios 重新送一次請求
          return axios(error.config)
        }).catch(_ => {
          // 重新登入失敗，強制登出
          user.logout()
          // 回傳 延長登入請求的錯誤訊息 到呼叫的地方 (會傳到 AdminProductView.vue 的 SweetAlert)
          return Promise.reject(error)
        })
      }
    }
  }
  return Promise.reject(error)
})

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
})
