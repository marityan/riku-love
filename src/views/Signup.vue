<template>
  <div class="container">
    <h2>新規会員登録</h2>
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
        <div class="form-group text-left">
          <label for="confirm-password">確認用パスワード：</label>
          <input
            type="password"
            class="form-control"
            id="confirm-password"
            v-model="confirmPassword"
          />
        </div>
      </div>
      <div class="col-md-4 text-right">
        <button @click="userSignup" class="btn btn-primary my-3">登録</button>
      </div>
      <div class="col-md-4 text-center text-danger">
        {{ errorMessage }}
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
      confirmPassword: "",
      errorMessage: "",
      isDisabeld: true,
    }
  },
  methods: {
    checkPassword() {
      if (this.password !== this.confirmPassword) {
        this.errorMessage = "パスワードが一致しません"
        this.isDisabeld = true
      } else {
        this.errorMessage = ""
        this.isDisabeld = false
      }
    },
    userSignup() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(() => {
          this.$router.push("/") //認証完了後のリダイレクト先を指定
        })
        .catch((e) => (this.errorMessage = e.message)) //エラーメッセージを格納
    },
  },
}
</script>
<style scoped></style>
