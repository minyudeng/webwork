import { createRouter, createWebHistory } from 'vue-router'
import { MyMessage } from '@/plugins/Message'

const routes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/HomeView.vue')
  },
  {
    path: '/types',
    name: 'types',
    component: () => import('../views/TypesView.vue')
  },
  {
    path: '/square',
    name: 'square',
    component: () => import('../views/SquareView.vue')
  },
  {
    path: '/bookrank',
    component: () => import('../views/BookRankView.vue')
  }, {
    path: "/author",
    component: () => import('../views/AuthorView.vue')
  },
  {
    path: '/admin',
    name: 'admin',
    redirect: '/admin/detail',
    component: () => import('../views/AdminView.vue'),
    children: [
      {
        path: 'detail',
        component: () => import('../components/Admin/UserDetail.vue')
      },
      {
        path: 'userlist',
        component: () => import('../components/Admin/UserList.vue'),
        meta: { isAuth: true },
        beforeEnter: (to, from, next) => {
          if (to.meta.isAuth) {
            let user = JSON.parse(sessionStorage.getItem("user"))
            if (user.role == '管理员') {
              next()
            } else {
              MyMessage('抱歉，您没有权限查看！','warnning')
              alert('抱歉，您没有权限查看！')
              next('/home')
            }
          } else {
            next()
          }
        }
      }, {
        path: 'applylist',
        component: () => import('../components/Admin/Apply.vue'),
        meta: { isAuth: true },
        beforeEnter: (to, from, next) => {
          if (to.meta.isAuth) {
            let user = JSON.parse(sessionStorage.getItem("user"))
            if (user.role == '管理员') {
              next()
            } else {
              next('/home')
            }
          } else {
            next()
          }
        }
      },{
        path: 'authorzone',
        component: () => import('../components/Author/AuthorZone.vue'),
        meta: { isAuth: true },
        beforeEnter: (to, from, next) => {
          if (to.meta.isAuth) {
            let user = JSON.parse(sessionStorage.getItem("user"))
            if (user.role == '管理员'||user.role == '作者') {
              next()
            } else {
              alert('抱歉，您没有权限查看！')
            }
          } else {
            next()
          }
        }
        ,children:[
          {
            path: 'manage',
            component:()=>import('@/components/Author/AuthorZone/BookManage.vue')
          },
          {
            path: 'comment',
            component:()=>import('@/components/Author/AuthorZone/CommentManage.vue')
          }
        ]
      }
    ],
    meta: { isAuth: true },
    beforeEnter: (to, from, next) => {
      if (to.meta.isAuth) { 
        let user = JSON.parse(sessionStorage.getItem("user"))
        if (user.role == '用户'
          || user.role == '作者'
          || user.role == '管理员') {
          next()
        } else {
          alert('抱歉，您没有权限查看！')
          next('/home')
        }
      } else {
        next()
      }
    },

  },{
    path:'/book/:id(\\d+)',
    name:'book',
    component: ()=>import('@/views/BookView.vue'),
    meta: { isAuth: true },
    beforeEnter: (to, from, next) => {
      if (to.meta.isAuth) {
        let user = JSON.parse(sessionStorage.getItem("user"))
        if (user.role === '管理员'||user.role === '作者'||user.role === '用户') {
          next()
        } else {
          alert('抱歉，您没有权限查看！')
          next('/home')
        }
      } else {
        next()
      }
    }
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
