import Vue from 'vue'
import Router from 'vue-router'
import login from '@/login'
import frame from '@/components/frame'
import nav1 from '@/components/nav1'
import nav2 from '@/components/nav2'
import nav3 from '@/components/nav3'
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
