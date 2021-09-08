<template>
  <div>
    <h1>After Sign In Page</h1>
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

<script>
import firebase from "firebase"
import UserProfile from "@/components/UserProfile.vue"
export default {
  components: {
    UserProfile,
  },
  methods: {
    logOut() {
      firebase.auth().signOut()
      this.$router.push("/signin")
    },
  },
  computed: {
    user() {
      return this.$auth.currentUser
    },
  },
}
</script>
