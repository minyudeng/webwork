import { createRouter, createWebHistory } from 'vue-router'
import { MyMessage, MyNotification } from '@/plugins/Message'

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
      },{
        path: 'book-shelf',
        name: 'bookShelf',
        component: () => import('../components/Admin/BookShelf.vue')
      },
      {
        path: 'userlist',
        component: () => import('../components/Admin/UserList.vue'),
        meta: { isAuth: true },
        beforeEnter: (to, from, next) => {
          if (to.meta.isAuth) {
            let user = JSON.parse(sessionStorage.getItem("user"))
            if ( user == null) {
              MyMessage('请先登录再试','warning')
              next(from.path)
            }
            if (user.role == '管理员') {
              next()
            } else {
              MyMessage('抱歉，您没有权限查看！','warnning')
              next(from.path)
            }
          }
        }
      }, {
        path: 'applylist',
        component: () => import('../components/Admin/Apply.vue'),
        meta: { isAuth: true },
        beforeEnter: (to, from, next) => {
          if (to.meta.isAuth) {
            let user = JSON.parse(sessionStorage.getItem("user"))
            if ( user == null) {
              MyMessage('请先登录再试','warning')
              next(from.path)
            }
            if (user.role == '管理员') {
              next()
            } else {
              MyNotification('权限不足','抱歉，你没有权限查看!','warning')
              next(from.path)
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
            if ( user == null) {
              MyMessage('请先登录再试','warning')
              next(from.path)
            }
            if (user.role == '管理员'||user.role == '作者') {
              next()
            } else {
              MyNotification('权限不足','抱歉，你没有权限查看，请先成为作者','warning')
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
        if (user != null) {
          next()
        } else {
          MyMessage('请先登录再试','warning')
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
        if ( user != null) {
          next()
        } else {
          MyMessage('请先登录再试','warning')
          next(from.path)
        }
      }
    }
  },
  {//404设置
    path: '/404',
    name: '404',
    component: () => import('/src/components/Other/404.vue')
},
{
    path: '/:pathMatch(.*)',
    redirect: '/404'
}

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
