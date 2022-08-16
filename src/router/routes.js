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
        path: 'Appointment',
        name: 'Appointment',
        component: () => import('@/pages/front/AppointmentView.vue'),
        meta: {
          title: '法師事務所 | 預約諮詢',
          login: false,
          admin: false
        }
      },
      {
        path: 'Introduction',
        name: 'Introduction',
        component: () => import('@/pages/front/IntroductionView.vue'),
        meta: {
          title: '法師事務所 | 本所簡介',
          login: false,
          admin: false
        }
      },
      {
        path: 'News',
        name: 'News',
        component: () => import('@/pages/front/NewsView.vue'),
        meta: {
          title: '法師事務所 | 最新消息總覽',
          login: false,
          admin: false
        }
      },
      {
        path: 'New/:id',
        name: 'New',
        component: () => import('@/pages/front/NewView.vue'),
        meta: {
          title: '法師事務所 | 最新消息',
          login: false,
          admin: false
        }
      },
      {
        path: 'Services',
        name: 'Services',
        component: () => import('@/pages/front/ServicesView.vue'),
        meta: {
          title: '法師事務所 | 服務項目總覽',
          login: false,
          admin: false
        }
      },
      {
        path: 'Service/:id',
        name: 'Service',
        component: () => import('@/pages/front/ServiceView.vue'),
        meta: {
          title: '法師事務所 | 服務項目',
          login: false,
          admin: false
        }
      },
      {
        path: 'Knowledges',
        name: 'Knowledges',
        component: () => import('@/pages/front/KnowledgesView.vue'),
        meta: {
          title: '法師事務所 | 靈學知識總覽',
          login: false,
          admin: false
        }
      },
      {
        path: 'Knowledge/:id',
        name: 'Knowledge',
        component: () => import('@/pages/front/KnowledgeView.vue'),
        meta: {
          title: '法師事務所 | 靈學知識',
          login: false,
          admin: false
        }
      },
      {
        path: 'Cases',
        name: 'Cases',
        component: () => import('@/pages/front/CasesView.vue'),
        meta: {
          title: '法師事務所 | 案例分享總覽',
          login: false,
          admin: false
        }
      },
      {
        path: 'Case/:id',
        name: 'Case',
        component: () => import('@/pages/front/CaseView.vue'),
        meta: {
          title: '法師事務所 | 案例分享',
          login: false,
          admin: false
        }
      },
      {
        path: 'Products',
        name: 'Products',
        component: () => import('@/pages/front/ProductsView.vue'),
        meta: {
          title: '法師事務所 | 開運小物總覽',
          login: false,
          admin: false
        }
      },
      {
        path: 'Product/:id',
        name: 'Product',
        component: () => import('@/pages/front/ProductView.vue'),
        meta: {
          title: '法師事務所 | 開運小物',
          login: false,
          admin: false
        }
      },
      {
        path: 'Content',
        name: 'Content',
        component: () => import('@/pages/front/ContentView.vue'),
        meta: {
          title: '法師事務所 | 聯絡我們',
          login: false,
          admin: false
        }
      },
      {
        path: 'member',
        name: 'member',
        component: () => import('@/pages/front/MemberView.vue'),
        meta: {
          title: '法師事務所 | 會員資料',
          login: true,
          admin: false
        }
      },
      {
        path: 'booking',
        name: 'booking',
        component: () => import('@/pages/front/BookingView.vue'),
        meta: {
          title: '法師事務所 | 預約查詢',
          login: true,
          admin: false
        }
      },
      {
        path: 'order',
        name: 'order',
        component: () => import('@/pages/front/OrderView.vue'),
        meta: {
          title: '法師事務所 | 訂單查詢',
          login: true,
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
        path: 'adminProduct',
        name: 'admin-product',
        component: () => import('@/pages/admin/AdminProductView.vue'),
        meta: {
          title: '法師事務所 | 商品管理',
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
