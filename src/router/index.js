import Vue from 'vue'
import Router from 'vue-router'

import store from '../store'

import guest from './middleware/guest'
import auth from './middleware/auth'
import middlewarePipeline from './middleware/middlewarePipeline'

import Home from '../views/Home'
import Register from '../views/Register'
import Article from '../views/Article'
import CommunityIndex from '../views/Community/Index'
import CommunityStaff from '../views/Community/Staff'


Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    // Community routes

    {
      path: '/community/staff',
      name: 'staff',
      component: CommunityStaff
    },

    // Actions

    {
      path: '/logout',
      name: 'logout',
      meta: {
        middleware: [
          auth
        ]
      }
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: {
        middleware: [
          guest
        ]
      }
    },
    {
      path: '/hotel',
      name: 'hotel',
      meta: {
        middleware: [
          auth
        ]
      },
      beforeEnter: (to, from, next) => {
        if(!store.getters['client/loaded']) {
          store.dispatch('client/setClient', true)
        }
        next()
      }
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Home,
      meta: {
        middleware: [
          auth
        ]
      }
    },
    {
      path: '/articles/:id/:slug',
      name: 'article',
      component: Article
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (!to.meta.middleware) {
    let documentTitle = `${ process.env.VUE_APP_TITLE } - ${ to.name }`
    if(to.params.title) {
      documentTitle += ` - ${ to.params.title }`
    }
    document.title = documentTitle
    return next()
  }
  const middleware = to.meta.middleware

  const context = {
    to,
    from,
    next,
    store
  }


  return middleware[0]({
    ...context,
    next: middlewarePipeline(context, middleware, 1)
  })

})

export default router;