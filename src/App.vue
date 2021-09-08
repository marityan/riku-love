<template>
  <div>
    
    <header id="header">
      <nav id="header-nav">
        
      <ul>
        <div><router-link to="/signin">Signin</router-link></div>
        <div><router-link to="/signup">Signup</router-link></div>
        <div><router-link to="timeline">TimeLine</router-link></div>
        <div><router-link to="scroll">Scroll</router-link></div>
        <!-- <router-link tag="li" id="home-nav" to="/" exact><a>ホーム</a></router-link>
        <router-link tag="li" id="game-nav" to="/game"><a>ゲーム</a></router-link>
        <router-link tag="li" id="info-nav" to="/info"><a>情報</a></router-link> -->
        <!-- <router-link tag="li" id="gift-nav" to="/gift"><a>お土産</a></router-link> -->
      </ul>
      </nav>
    </header>

    <router-view />
  </div>
</template>

<script>
//import firebase from "firebase"
export default {
  methods: {},
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
