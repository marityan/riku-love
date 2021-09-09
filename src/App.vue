<template>
  <div class="main">
    <div><router-link to="/signin">Signin</router-link></div>
    <div><router-link to="/signup">Signup</router-link></div>
    <div><router-link to="/scroll">Scroll</router-link></div>
    <div><router-link to="/chat">Chat</router-link></div>
    <router-view />
  </div>
</template>

<script>
export default {
  methods: {},
}
</script>

<style>
.main {
  width: 100%;
  height: auto;
}
/* #app {
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
} */
</style>
