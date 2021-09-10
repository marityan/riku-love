<template>
  <div>
    <h1>マイページ</h1>
    <UserProfile />
    <div
      class="row d-flex flex-column align-items-center justify-content-center"
    >
      <div class="col-md-2">
        <!-- ここからGoogle認証 -->
        <button @click="logOut" class="btn btn-block bg-danger text-white my-3">
          ログアウト
        </button>
      </div>
    </div>
  </div>
</template>

<script scoped>
import firebase from "firebase"
import UserProfile from "@/components/UserProfile.vue"
export default {
  components: {
    UserProfile,
  },
  methods: {
    logOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          console.log("ログアウトしました")
          this.$router.push("/")
        })
        .catch((error) => {
          console.log(`ログアウト時にエラーが発生しました (${error})`)
        })
    },
    computed: {
      user() {
        return this.$auth.currentUser
      },
    },
  },
}
</script>
