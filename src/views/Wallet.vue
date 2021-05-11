<template>
  <div class="wallet">
    <h1>{{ username }} bought history</h1>
    <user-wallet></user-wallet>
  </div>
</template>

<script>
  import UserWallet from '../components/UserWallet.vue'

  export default {
    data() {
      return {
        username: this.$route.params.userName
      }
    },
    components: {
      UserWallet
    }
  }
</script>
