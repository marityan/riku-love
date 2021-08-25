import Vue from "vue"
import App from "./App.vue"
import "./firebase.js"
import router from "./router"
import "bootstrap/dist/css/bootstrap.css" // 追加
import "bootstrap-vue/dist/bootstrap-vue.css" // 追加
import BootstrapVue from "bootstrap-vue"
import VueVirtualScroller from "vue-virtual-scroller"

Vue.use(BootstrapVue)
Vue.use(VueVirtualScroller)

Vue.config.productionTip = false

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app")
