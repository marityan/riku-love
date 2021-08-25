<template>
  <div>
    <div><router-link to="/signin">Signin</router-link></div>
    |
    <div><router-link to="/signup">Signup</router-link></div>
    |
    <div><router-link to="timeline">TimeLine</router-link></div>
    |
    <div><router-link to="scroll">Scroll</router-link></div>
    <router-view />
  </div>
</template>
