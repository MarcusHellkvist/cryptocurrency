<template>
  <div id="app">
    <my-navigation></my-navigation>
    <p v-if="isOnline">You are currently: ONLINE</p>
    <p v-if="isOffline">You are currently OFFLINE</p>
    <router-view />
  </div>
</template>

<script>
  import MyNavigation from '@/components/MyNavigation.vue'

  export default {
    computed: {
      networkStatus() {
        return this.isOnline ? 'My network is fine' : 'I am offline'
      }
    },
    components: {
      MyNavigation
    }
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
</style>
