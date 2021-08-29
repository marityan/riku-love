<template>
  <div class="container">
    <div
      class="row d-flex flex-column align-items-center justify-content-center"
    >
      <div class="col-md-4">
        <div class="form-group text-left">
          <label for="email">メールアドレス：</label>
          <input type="text" class="form-control" id="email" v-model="email" />
        </div>
        <div class="form-group text-left">
          <label for="password">パスワード：</label>
          <input
            type="password"
            class="form-control"
            id="password"
            v-model="password"
          />
        </div>
      </div>
      <div class="col-md-4 text-right">
        <router-link to="/timeline"
          ><button @click="userSignin" class="btn btn-primary my-3">
            ログイン
          </button></router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase"
// import AfterSignIn from

export default {
  data() {
    return {}
  },
  methods: {
    googleSignin() {
      const provider = new firebase.auth.GoogleAuthProvider()
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(() => {
          this.$router.push("/afterSignIn")
        })
    },
  },
}
</script>
