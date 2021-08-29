<template>
  <div id="app">
    <div id="nav">
      <router-link to="/Signin">ログインはこちら</router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
//import firebase from "firebase"
export default {
  methods: {
    // signIn() {
    //   const provider = new firebase.auth.GoogleAuthProvider()
    //   firebase.auth().signInWithRedirect(provider)
    // },
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}
#nav a {
  font-weight: bold;
  color: #2c3e50;
  padding: 0 1rem;
}
#nav a:hover {
  color: #2c3e502b;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
