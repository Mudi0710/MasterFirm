import { route } from 'quasar/wrappers'
import { useUserStore } from 'src/stores/user'
import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router'
import routes from './routes'

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory)

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE)
  })

  // 把網頁標題改成當前位置的 meta.title
  /*
    to => 從哪裡來
    from => 去哪裡
    next => 重新導向去哪裡
  */
  Router.afterEach((to, from) => {
    document.title = to.meta.title
  })

  // 設定路由守衛（依據狀態限制使用者瀏覽網頁的路徑）
  Router.beforeEach((to, from, next) => {
    const user = useUserStore()
    // 如果使用者目前有登入 且 他要去的路徑是註冊 或者 登入
    if (user.isLogin && (to.path === '/register' || to.path === '/login')) {
      // 把使用者導回首頁
      next('/')
      // 如果使用者要去的那一頁需要登入，而且使用者未登入
    } else if (to.meta.login && !user.isLogin) {
      // 把使用者導至登入頁
      next('/login')
      // 如果使用者要去的那一頁需要管理員身分，而且使用者身分並非管理員
    } else if (to.meta.admin && !user.isAdmin) {
      // 把使用者導回首頁
      next('/')
      // 如果以上皆非
    } else {
      // 就讓使用者去吧
      next()
    }
  })
  return Router
})
