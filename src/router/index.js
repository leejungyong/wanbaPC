import Vue from 'vue'
import Router from 'vue-router'
import routes from './routers'
import store from '@/store'
import iView from 'iview'
import { setToken, getToken, canTurnTo, setTitle } from '@/libs/util'
import config from '@/config'
import Cookie from 'js-cookie'
const { homeName } = config

Vue.use(Router)
const router = new Router({
  routes,
  // mode: 'history'
  mode: 'hash'
})
const LOGIN_PAGE_NAME = 'login'
const POIS = 'pois', TOPB = 'topboard', ALBUM = 'album', Heart = 'heart'

// const turnTo = (to, access, next) => {
//   if (canTurnTo(to.name, access, routes)) next() // 有权限，可访问
//   else next({ replace: true, name: 'error_401' }) // 无权限，重定向到401页面
// }
const turnTo = (to, access, next) => {
  if (canTurnTo(to.name, access, store.state.app.routers.concat(routes))) next() // 有权限，可访问 
  else next({ replace: true, name: 'error_401' }) // 无权限，重定向到401页面 
}
let routersDuplicated = true
router.beforeEach((to, from, next) => {
  iView.LoadingBar.start()
  const token = getToken()
  if (token == undefined) {
    token = ''
  }
  if (to.name != POIS && to.name != TOPB && to.name != ALBUM && to.name != Heart) {

    if (!token && to.name !== LOGIN_PAGE_NAME) {
      // 未登录且要跳转的页面不是登录页
      console.log('1')
      next(
        {
          name: LOGIN_PAGE_NAME // 跳转到登录页
        }
      )
    } else if (!token && to.name === LOGIN_PAGE_NAME) {
      // 未登陆且要跳转的页面是登录页
      console.log('2')
      next() // 跳转
    } else if (token && to.name === LOGIN_PAGE_NAME) {
      // 已登录且要跳转的页面是登录页
      console.log('3')
      next({
        name: homeName // 跳转到homeName页
      })
    } else {
      console.log('4')
      console.log(store.state.app.hasGetRouter)
      if (store.state.user.hasGetInfo && store.state.app.hasGetRouter) {

        // turnTo(to, store.state.user.access, next)
        console.log('4-1')
        next()
      } else {
        // 加载用户信息
        // store.dispatch('getUserInfo').then(user => {
        //   console.log(user)
        // 加载用户菜单

        // let uid=store.state.user.userId
        console.log('4-2')
        let uid = Cookie.get('uid')
        let token = store.state.user.token
        if (routersDuplicated) {
          store.dispatch('getRouters', { uid: uid, token: token }).then(routers => {
            // commonRoutes需要追加到路由解析最后的404，把原先的routers.js中的404删掉即可
            routersDuplicated = false
            router.addRoutes(routers.concat([
              {
                path: '*',
                name: 'error_404',
                meta: {
                  hideInMenu: true
                },
                component: () => import('@/view/error-page/404.vue')
              }
            ]))
            // next({ ...to })
          })
        }
        next()
      }
    }
  } else {

    next()
  }

})

router.afterEach(to => {
  setTitle(to, router.app)
  iView.LoadingBar.finish()
  window.scrollTo(0, 0)
})
export default router
