import Vue from "vue"
import VueRouter from "vue-router"
import Signin from "@/views/Signin.vue"
import Mypage from "@/views/Mypage.vue"
import firebase from "firebase"

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    redirect: "/signin",
    component: Signin,
  },
  {
    path: "/signin",
    name: "Signin",
    component: Signin,
  },
  {
    path: "/mypage",
    name: "Mypage",
    component: Mypage,
  },
  {
    path: "/scroll",
    name: "scroll",
    component: () =>
      import(/* webpackChunkName: "scroll" */ "../views/scroll.vue"),
  },
  {
    path: "/comment/:docId",
    name: "comment",
    props: true,
    component: () =>
      import(/* webpackChunkName: "scroll" */ "../views/comment.vue"),
  },
  {
    path: "/sample",
    name: "sample",
    component: () =>
      import(/* webpackChunkName: "scroll" */ "../views/sample.vue"),
  },
  {
    path: "/chat",
    name: "chat",
    component: () =>
      import(/* webpackChunkName: "scroll" */ "../views/chat.vue"),
  },
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
})

const isSignedIn = async () => {
  // Promise を使って、onAuthStateChanged が完了するまで待つ
  return await new Promise((resolve, reject) => {
    const unsubscribe = firebase.auth().onAuthStateChanged(
      (user) => {
        if (user) {
          unsubscribe()
          resolve(true)
        } else {
          unsubscribe()
          resolve(false)
        }
      },
      (error) => {
        unsubscribe()
        reject(error)
      }
    )
  })
}

// Vue Router のグローバルガードで、ログインしてない場合は、Signinにしか行けなくする。

router.beforeEach(async (to, from, next) => {
  const auth = await isSignedIn()
  if (to.name !== "signin" && !auth) {
    next("/signin")
  } else {
    next()
  }
})

export default router
