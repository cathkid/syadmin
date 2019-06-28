import Vue from 'vue'
import Router from 'vue-router'
import login from '@/login'
import frame from '@/components/frame'
import nav1 from '@/components/nav1'
import nav2 from '@/components/nav2'
import nav3 from '@/components/nav3'
import nav4 from '@/components/nav4'
import nav5 from '@/components/nav5'
import newsadd from '@/components/newsadd'
import newsedit from '@/components/newsedit'
import enav1 from '@/components/enav1'
import enav2 from '@/components/enav2'
import enav3 from '@/components/enav3'
import enav4 from '@/components/enav4'
import enewsadd from '@/components/enewsadd'
import enewsedit from '@/components/enewsedit'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/frame',
      name: 'frame',
       component: frame,
       children: [
            {
                path: "nav1",
                component: nav1,
                meta: {
                  requiresAuth: true,
                }
            },
            {
                path: "nav2",
                component: nav2,
                meta: {
                  requiresAuth: true,
                }
            },
            {
                path: "nav3",
                component: nav3,
                meta: {
                  requiresAuth: true,
                }
            },
             {
               path: "newsedit",
               component: newsedit,
               meta: {
                 requiresAuth: true,
               }
             },
           {
             path: "newsadd",
             component: newsadd,
             meta: {
               requiresAuth: true,
             }
           },
           {
             path: "nav4",
             component: nav4,
             meta: {
               requiresAuth: true,
             }
           },
            {
             path: "nav5",
             component: nav5,
             meta: {
               requiresAuth: true,
             }
           },
           {
             path: "enav1",
             component: enav1,
             meta: {
               requiresAuth: true,
             }
           },
           {
             path: "enav2",
             component: enav2,
             meta: {
               requiresAuth: true,
             }
           },
           {
             path: "enav3",
             component: enav3,
             meta: {
               requiresAuth: true,
             }
           },
           {
             path: "enav4",
             component: enav4,
             meta: {
               requiresAuth: true,
             }
           },
           {
             path: "enewsadd",
             component: enewsadd,
             meta: {
               requiresAuth: true,
             }
           },
           {
             path: "enewsedit",
             component: enewsedit,
             meta: {
               requiresAuth: true,
             }
           }
       ]
    },
    {
    	path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/',
      name: 'frame',
      component: frame,
      meta: {
        requiresAuth: true,
      },
      children: [
        {
          path: "nav1",
          component: nav1,
          meta: {
            requiresAuth: true,
          }
        }
      ]
    }
  ]
})
