<template>
  <div class="container">
    <b-table striped hover :items="wallet"></b-table>
    <p v-if="wallet.length === 0">
      You don't have any cryptocurrencies right now. Head over to the
      <router-link to="/">Homepage</router-link>
      and buy some.
    </p>
  </div>
</template>

<script>
  export default {
    created() {
      this.getWallet()
    },
    data() {
      return {
        wallet: []
      }
    },
    computed: {
      getUserWalletValue() {
        return this.$store.state.userWallet
      }
    },
    methods: {
      getWallet: function() {
        this.wallet = this.$store.state.userWallet
      }
    }
  }
</script>
