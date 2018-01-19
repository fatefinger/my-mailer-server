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
import store from './store/index.js'
import 'iview/dist/styles/iview.css'
import Vuex from 'vuex'
import VueQuillEditor from 'vue-quill-editor'

// // require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

Vue.use(VueQuillEditor)
Vue.use(Vuex)

// Vue.use(VueRouter);
Vue.use(iView)

// The routing configuration
// const RouterConfig = {
//   routes: Routers
// };
// const router = new VueRouter(RouterConfig);

new Vue({
  el: '#app',
  store,
  router: routers,
  render: h => h(App)
})
