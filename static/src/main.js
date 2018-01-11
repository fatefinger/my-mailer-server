// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import Vue from 'vue'
// import App from './App'
// import router from './router'
//
// Vue.config.productionTip = false
//
// /* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   router,
//   template: '<App/>',
//   components: { App }
// })
import Vue from 'vue'
// import VueRouter from 'vue-router'
import routers from './router'
import App from './App'
import iView from 'iview'
import 'iview/dist/styles/iview.css'

// Vue.use(VueRouter);
Vue.use(iView)

// The routing configuration
// const RouterConfig = {
//   routes: Routers
// };
// const router = new VueRouter(RouterConfig);

new Vue({
  el: '#app',
  router: routers,
  render: h => h(App)
})
