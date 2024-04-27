<template>
  <div id="app">
    <nav class="nav-container">
      <router-link to="/" class="nav-link">Home</router-link> | 
      <router-link to="/narudzbine" class="nav-link">Narudzbine</router-link> |
      <b-nav-item v-if="!token" to="/register">Register</b-nav-item>
      <b-nav-item v-if="!token" to="/login">Log In</b-nav-item>
      <b-nav-item v-else @click="logout()">Log Out</b-nav-item>

    </nav>
    <div class="logo-container">
      <img src="@/assets/logo.png" alt="Logo" class="logo">
    </div>
    <router-view/>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'App',
  computed: {
    ...mapState(['token']),
  },
  methods: {
    ...mapActions(['logout']),
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

.nav-container {
  background-color: #cecece;
  padding: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.nav-link {
  font-weight: bold;
  color: #333;
  margin: 0 10px;
  text-decoration: none;
  transition: color 0.3s ease;
}

.nav-link:hover {
  color: #42b983;
}

.logo-container {
  padding: 10px;
}

.logo {
  width: 150px;
  height: auto;
}
</style>
