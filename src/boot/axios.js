import { boot } from 'quasar/wrappers'
import axios from 'axios'

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

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
})
