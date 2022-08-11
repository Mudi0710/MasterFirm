import FrontLayout from '@/layouts/MainLayout.vue'
import FrontHomeView from '@/pages/front/IndexPage.vue'
import AdminLayout from '@/layouts/AdminLayout.vue'
import NotFoundView from '@/pages/ErrorNotFound.vue'

// import AdminHomeView from '@/pages/admin/AdminHomeView.vue'

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
        // path: '',
        // name: 'admin-home',
        // component: AdminHomeView,
        // meta: {
        //   title: '法師事務所 | 管理後台',
        //   login: false,
        //   admin: false
        // }
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
    component: () => import('layouts/AdminLayout.vue'),
    children: [
      {
        path: '',
        name: 'admin-home',
        component: () => import('@/pages/admin/AdminHomeView.vue'),
        meta: {
          title: '法師事務所 | 管理後台',
          login: true,
          admin: true
        }
      },
      {
        path: 'adminMember',
        name: 'admin-member',
        component: () => import('@/pages/admin/AdminMemberView.vue'),
        meta: {
          title: '法師事務所 | 會員管理',
          login: true,
          admin: true
        }
      },
      {
        path: 'adminCase',
        name: 'admin-case',
        component: () => import('@/pages/admin/AdminCaseView.vue'),
        meta: {
          title: '法師事務所 | 預約管理',
          login: true,
          admin: true
        }
      },
      {
        path: 'adminOrder',
        name: 'admin-order',
        component: () => import('@/pages/admin/AdminOrderView.vue'),
        meta: {
          title: '法師事務所 | 訂單管理',
          login: true,
          admin: true
        }
      },
      {
        path: 'adminArticle',
        name: 'admin-article',
        component: () => import('@/pages/admin/AdminArticleView.vue'),
        meta: {
          title: '法師事務所 | 文章管理',
          login: true,
          admin: true
        }
      },
      {
        path: 'adminPromote',
        name: 'admin-promote',
        component: () => import('@/pages/admin/AdminPromoteView.vue'),
        meta: {
          title: '法師事務所 | 推播管理',
          login: true,
          admin: true
        }
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/404',
    name: '404',
    component: NotFoundView,
    meta: {
      title: '法師事務所 | 404',
      login: false,
      admin: false
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'all',
    redirect: '/404'
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
