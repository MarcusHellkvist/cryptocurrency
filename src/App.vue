<template>
  <div id="app">
    <my-navigation></my-navigation>
    <router-view />
  </div>
</template>

<script>
  import MyNavigation from '@/components/MyNavigation.vue'

  export default {
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
