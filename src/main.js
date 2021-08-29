import Vue from "vue"
import App from "./App.vue"
import "./firebase.js"
import router from "./router"
import "bootstrap/dist/css/bootstrap.css" // 追加
import "bootstrap-vue/dist/bootstrap-vue.css" // 追加
import vuetify from "./plugins/vuetify"

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  render: (h) => h(App),
}).$mount("#app")
