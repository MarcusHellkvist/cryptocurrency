<template>
  <div class="container">
    <div class="row">
      <div class="col-12 p-2" v-for="coin in coins" :key="coin.id">
        <div class="row">
          <div class="col-sm-4">
            <img class="img-thumbnail" :src="coin.image" alt="coin image" />
          </div>
          <div class="col-sm-8">
            <ul class="list-group text-left">
              <li class="list-group-item list-group-item-primary">
                <strong>{{ coin.name }}</strong> ({{ coin.symbol }})
              </li>
              <li class="list-group-item">${{ coin.current_price }}</li>
              <li class="list-group-item">
                ${{ coin.ath }} // ${{ coin.atl }}
              </li>
              <li class="list-group-item">{{ coin.last_updated }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="spinner-border text-primary" role="status" v-if="loading">
      <span class="sr-only">Loading...</span>
    </div>
  </div>
</template>

<script>
  export default {
    created() {
      this.getPopularCoins()
    },
    data() {
      return {
        coins: null,
        loading: false
      }
    },
    methods: {
      getPopularCoins: function() {
        this.loading = true
        this.axios
          .get(
            `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${this.numberOfCoins}&page=1sparkline=false`
          )
          .then((response) => {
            // handle success
            console.log(response.data)
            this.coins = response.data
          })
          .catch((error) => {
            // handle error
            console.log(error)
          })
          .finally(() => {
            this.loading = false
          })
      },
      addToWallet: function(coin) {
        if (this.$store.state.wallet >= coin.current_price) {
          this.$store.commit('addCoinToWallet', coin)
          // this.$store.commit('updateWallet', coin.current_price)
        } else {
          console.log('you cannot afford that right now.')
        }
      }
    },
    props: {
      numberOfCoins: Number
    }
  }
</script>
