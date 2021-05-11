<template>
  <div id="app">
    <my-navigation></my-navigation>
    <p class="network-paragraph">{{ networkStatus }}</p>
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

  .network-paragraph {
    margin-top: 50px;
  }
</style>
