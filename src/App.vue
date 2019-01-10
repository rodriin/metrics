<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Metrics</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/profile">Profile</router-link>
    </div>
    <user/>
    <router-view />
  </div>
</template>

<script>
import User from "@/components/User";
import UserMixin from '@/mixins/user';

export default {
  mixins: [UserMixin],
  components: {
    User
  },
  created() {
    this.loadCurrentUser();
  },
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
