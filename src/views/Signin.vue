<template>
  <div class="container">
    <h2>ログイン</h2>
    <div
      class="row d-flex flex-column align-items-center justify-content-center"
    >
      <div class="col-md-4">
        <!-- ここからGoogle認証 -->
        <button
          @click="googleSignin"
          class="btn btn-block bg-danger text-white my-3"
        >
          googleアカウントでログイン
        </button>
        <div>
          <strong>or</strong>
        </div>
        <!-- ここまで -->
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
        <button @click="userSignin" class="btn btn-primary my-3">
          ログイン
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase"
export default {
  data() {
    return {
      email: "",
      password: "",
      errorMessage: "",
    }
  },
  methods: {
    googleSignin() {
      const provider = new firebase.auth.GoogleAuthProvider()
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(() => {
          alert("Signed In!")
        })
        .catch((err) => {
          console.log(err)
        })
    },
  },
}
</script>
