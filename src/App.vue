<template>
  <div class="main">
    <div class="header">
      <h1>
        <a href="/">りくらぶ</a>
      </h1>
      <nav class="pc-nav">
        <ul>
          <li>
            <a href="#"><router-link to="/signin">Signin</router-link></a>
          </li>
          <li>
            <a href="#"><router-link to="/scroll">Scroll</router-link></a>
          </li>
          <li>
            <a href="#"><router-link to="/chat">Chat</router-link></a>
          </li>
          <li>
            <a href="#"><router-link to="/mypage">Mypage</router-link></a>
          </li>
        
        </ul>
      </nav>
    </div>

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
.header {
  width: 100%;
  padding: 30px 4% 10px;
  /* background-color: #efff0a; */
  background: -webkit-linear-gradient(to right, #0eb1f1, #dbe91a);
  background: linear-gradient(to right, #24ee71, #05c7f7);
  /* position: fixed; */
  top: 0;
  display: flex;
  align-items: center;
}
h1 {
  margin: 0;
  padding: 0;
  font-size: 20px;
}
a {
  text-decoration: none;
  color: #4b4b4b;
}
ul {
  list-style: none;
  margin: 0;
  display: flex;
}
li {
  margin: 0 0 0 15px;
  font-size: 14px;
}
nav {
  margin: 0 0 0 auto;
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
