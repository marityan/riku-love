<template>
  <div>
    <div class="container1" id="container1">
      <div class="form-container sign-in-container">
        <form action="#">
          <!-- google認証ボタン -->

          <button
            @click="googleSignin"
            class="btn btn-outline-dark"
            href="/users/googleauth"
            role="button"
            style="text-transform:none"
          >
            <img
              width="20px"
              style="margin-bottom:3px; margin-right:5px"
              alt="Google sign-in"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
            />
            Login with Google
          </button>
        </form>
      </div>
      <div class="overlay-container">
        <div class="overlay">
          <div class="overlay-panel overlay-right">
            <h1>###へ<br />ようこそ！</h1>
            <p>
              ここは多くの就活生がお互いに<br />エントリーシートのFB・添削を行います😉
            </p>
          </div>
        </div>
      </div>

      <footer>まりちゃん</footer>
    </div>
  </div>
</template>

<script>
import firebase from "firebase"

export default {
  data() {
    return {
      uidArray: [],
      sign: true,
    }
  },
  methods: {
    googleSignin() {
      const provider = new firebase.auth.GoogleAuthProvider()
      // ログイン認証
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(() => {
          this.$router.push("/scroll")
        })
      // userコレクションにgoogleユーザー情報を追加
      for (const uid of this.uidArray) {
        if (uid === this.$auth.currentUser.uid) {
          this.sign = false
          alert("サインインしました。")
        }
      }
      if (this.sign) {
        alert("新規登録しました。")
        firebase
          .firestore()
          .collection("users")
          .add({ GoogleData: this.$auth.currentUser })
      }
    },
  },
  created() {
    firebase
      .firestore()
      .collection("users")
      .get()
      .then((query) => {
        query.forEach((doc) => {
          const d = doc.data()
          this.uidArray.push(d.GoogleData.uid)
        })
      })
      .catch((error) => {
        console.log(`データの取得に失敗しました (${error})`)
      })
  },
}
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Montserrat:400,800");

* {
  box-sizing: border-box;
}

body {
  background: #f6f5f7;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-family: "Montserrat", sans-serif;
  height: 100vh;
  margin: -20px 0 50px;
}

h1 {
  font-weight: bold;
  margin: 0;
}

h2 {
  text-align: center;
}

p {
  font-size: 14px;
  font-weight: 100;
  line-height: 20px;
  letter-spacing: 0.5px;
  margin: 20px 0 30px;
}

span {
  font-size: 12px;
}

a {
  color: #333;
  font-size: 14px;
  text-decoration: none;
  margin: 15px 0;
}

button {
  border-radius: 20px;

  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
}

button:focus {
  outline: none;
}

button.ghost {
  background-color: transparent;
  border-color: #ffffff;
}

form {
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 50px;
  height: 100%;
  text-align: center;
}

input {
  background-color: #eee;
  border: none;
  padding: 12px 15px;
  margin: 8px 0;
  width: 100%;
}

.container1 {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  position: relative;
  overflow: hidden;
  width: 768px;
  max-width: 100%;
  min-height: 480px;
}

.form-container {
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
}

.sign-in-container {
  left: 0;
  width: 50%;
  z-index: 2;
}

.sign-up-container {
  left: 0;
  width: 50%;
  opacity: 0;
  z-index: 1;
}

.container1.right-panel-active .sign-up-container {
  transform: translateX(100%);
  opacity: 1;
  z-index: 5;
  animation: show 0.6s;
}

@keyframes show {
  0%,
  49.99% {
    opacity: 0;
    z-index: 1;
  }

  50%,
  100% {
    opacity: 1;
    z-index: 5;
  }
}

.overlay-container {
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.6s ease-in-out;
  z-index: 100;
}

.overlay {
  background: #ff416c;
  background: -webkit-linear-gradient(to right, #0eb1f1, #dbe91a);
  background: linear-gradient(to right, #2428ee, #05c7f7);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 0 0;
  color: #ffffff;
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
}

.overlay-panel {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 40px;
  text-align: center;
  top: 0;
  height: 100%;
  width: 50%;
}

.overlay-right {
  right: 0;
  transform: translateX(0);
}

footer {
  background-color: #222;
  color: #fff;
  font-size: 14px;
  bottom: 0;
  position: fixed;
  left: 0;
  right: 0;
  text-align: center;
  z-index: 999;
}

footer p {
  margin: 10px 0;
}

footer i {
  color: red;
}

footer a {
  color: #3c97bf;
  text-decoration: none;
}
</style>
