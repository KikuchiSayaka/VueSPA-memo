import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false


// VueRouterを使用
  import VueRouter from 'vue-router'
	// Vue.useはプラグインを追加する際に使用する
  Vue.use(VueRouter)


  const router = new VueRouter({
	//  URLを/区切りで管理する"history"モード
    mode: 'history',
    routes : [
      // 基本的にはpathでURLを、componentでそれに対応するコンポーネントを定義する
      {
        path: '/main',
        component: () => import('./components/MainPage.vue')
      },
      {
        path: '/study/binding',
        component: () => import('./components/study/BindingPage.vue')
      },
      {
        path: '/study/directive',
        component: () => import('./components/study/DirectivePage.vue')
      },
      {
        path: '/study/event',
        component: () => import('./components/study/EventPage.vue')
      },
      {
        path: '/*',
        redirect: '/main',
      }
    ]
  })


new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
