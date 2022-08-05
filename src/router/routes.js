import FrontLayout from '@/layouts/MainLayout.vue'
import FrontHomeView from '@/pages/front/IndexPage.vue'

const routes = [
  {
    path: '/',
    component: FrontLayout,
    children: [
      {
        path: '',
        name: 'home',
        component: FrontHomeView,
        meta: {
          title: '法師事務所',
          login: false,
          admin: false
        }
      },
      {
        path: 'register',
        name: 'register',
        component: () => import('@/pages/front/RegisterView.vue'),
        meta: {
          title: '法師事務所 | 註冊',
          login: false,
          admin: false
        }
      },
      {
        path: 'login',
        name: 'login',
        component: () => import('@/pages/front/LoginView.vue'),
        meta: {
          title: '法師事務所 | 登入',
          login: false,
          admin: false
        }
      },
      {
        path: 'cart',
        name: 'cart',
        component: () => import('@/layouts/CartLayout.vue'),
        meta: {
          title: '法師事務所 | 購物車',
          login: true,
          admin: false
        }
      }
    ]
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('layouts/MainLayout.vue')
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes

// 原始碼
// const routes = [
//   {
//     path: '/',
//     component: () => import('layouts/MainLayout.vue'),
//     children: [
//       { path: '', component: () => import('pages/IndexPage.vue') }
//     ]
//   },

//   // Always leave this as last one,
//   // but you can also remove it
//   {
//     path: '/:catchAll(.*)*',
//     component: () => import('pages/ErrorNotFound.vue')
//   }
// ]

// export default routes
