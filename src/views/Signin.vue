<template>
  <div class="container">
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
