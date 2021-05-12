<template>
  <div class="container">
    <div class="input-group mb-1">
      <input
        type="text"
        class="form-control"
        placeholder="Search for any cryptocurrency e.g. Bitcoin"
        aria-describedby="basic-addon2"
        v-model="query"
      />
      <div class="input-group-append">
        <button
          class="btn btn-outline-primary"
          type="button"
          @click="onSearchCoin"
        >
          Search
        </button>
      </div>
    </div>
    <p class="small-text"><strong>Trending</strong>: {{ showTrending }}</p>
    <div class="card text-left" v-if="coin !== null">
      <div class="card-body">
        <div class="row mb-2">
          <div class="col-sm-auto">
            <img :src="coin.image.thumb" alt="..." class="img-thumbnail" />
          </div>
          <div class="col-sm-auto">
            <h5 class="card-title">{{ coin.name }} ({{ coin.symbol }})</h5>
          </div>
          <div class="col-sm-auto">
            ${{ coin.market_data.current_price.usd }}
          </div>
        </div>
        <p class="card-text">{{ trimDescString }}</p>
        <h6>Important links</h6>
        <p
          class="card-text"
          v-for="link in coin.links.blockchain_site"
          :key="link.id"
        >
          <a :href="link" target="_blank">{{ link }}</a>
        </p>
        <h6>Price changes last 24hr</h6>
        <chart
          :chartdata="chartData"
          :options="options"
          v-if="hasLoaded"
        ></chart>
        <p class="card-text">Last updated: {{ trimTimeString }}</p>
        <form class="needs-validation">
          <div class="form-group p-2 col">
            <label for="buyInput">I want to buy {{ coin.id }} for</label>
            <input
              type="number"
              class="form-control"
              id="buyInput"
              placeholder="USD"
              v-model="buyAmount"
            />
            <small id="buyHelp" class="form-text text-muted mb-2">{{
              converter
            }}</small>

            <button
              type="button"
              @click="buy"
              class="btn btn-primary"
              :disabled="isDisable"
            >
              Buy
            </button>
          </div>
        </form>
        <b-alert v-model="showSuccessAlert" variant="success" dismissible
          >You successfully bought {{ coin.name }} for ${{ this.buyAmount }}
        </b-alert>
        <b-alert v-model="showWarningAlert" variant="warning" dismissible
          >You can't afford that right now!</b-alert
        >
      </div>
    </div>
    <div class="spinner-border text-primary" role="status" v-if="loading">
      <span class="sr-only">Loading...</span>
    </div>
  </div>
</template>

<script>
  import Chart from '../components/Chart.vue'

  export default {
    computed: {
      converter() {
        let coinValue = this.coin.market_data.current_price.usd
        if (this.buyAmount === null || this.buyAmount === '') {
          return '1 ' + this.coin.symbol + ' ≈ ' + coinValue + ' USD'
        } else {
          return '≈ ' + this.buyAmount / coinValue + ' ' + this.coin.symbol
        }
      },
      trimDescString() {
        let findCharacter = this.coin.description.en.indexOf('.')
        return this.coin.description.en.slice(0, findCharacter) + '.'
      },
      trimTimeString() {
        let trimmedString = this.coin.last_updated.replace('T', ' ')
        return trimmedString.slice(0, -5)
      },
      isDisable() {
        return (
          this.buyAmount === null ||
          this.buyAmount === '' ||
          this.buyAmount === 0
        )
      },
      showTrending() {
        let trendString = ''
        this.trending.forEach((element) => {
          trendString += element.item.id + ', '
        })
        return trendString.slice(0, -2)
      }
    },
    created() {
      this.query = this.$route.params.coin
      this.getTreding()
    },
    components: {
      Chart
    },
    data() {
      return {
        showSuccessAlert: false,
        showWarningAlert: false,
        usdCurrency: 0,
        cryptoCurrency: 0,
        loading: false,
        query: null,
        coin: null,
        buyAmount: '',
        trending: [],
        hasLoaded: false,
        chartData: {
          labels: [],
          datasets: [
            {
              label: '',
              backgroundColor: '#f87979',
              data: [],
              fill: false,
              borderColor: '#cc444b',
              tension: 0.1
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false
        }
      }
    },
    methods: {
      onSearchCoin: function() {
        this.loading = true
        this.coin = null
        this.axios
          .get('https://api.coingecko.com/api/v3/coins/' + this.query)
          .then((response) => {
            // handle success
            console.log(response.data)
            this.coin = response.data
            this.$emit('data-fetched', true, this.query)
            this.getPriceChanges()
          })
          .catch((error) => {
            // handle error
            this.$emit('data-fetched', false, this.query)
            console.log(error)
          })
          .finally(() => {
            this.loading = false
          })
      },
      getPriceChanges() {
        this.flushPrices()
        this.axios
          .get(
            `https://api.coingecko.com/api/v3/coins/${this.query}/market_chart?vs_currency=usd&days=1&interval=hourly`
          )
          .then((response) => {
            // handle success
            console.log(response.data.prices)
            this.chartData.datasets[0].label = this.coin.name
            response.data.prices.forEach((element) => {
              this.chartData.labels.push(element[0].toString())
              this.chartData.datasets[0].data.push(element[1])
            })
            this.hasLoaded = true
          })
          .catch((error) => {
            // handle error
            console.log(error)
          })
      },
      flushPrices() {
        this.hasLoaded = false
        this.chartData.labels = []
        this.chartData.datasets[0].data = []
      },
      getTreding() {
        this.axios
          .get('https://api.coingecko.com/api/v3/search/trending')
          .then((response) => {
            // handle success
            console.log(response.data.coins)
            this.trending = response.data.coins
          })
          .catch((error) => {
            // handle error
            console.log(error)
          })
      },
      buy: function() {
        // CAN WE AFFORD IT
        if (this.$store.state.money >= this.buyAmount) {
          this.showSuccessAlert = 2
          this.$store.commit('buy', {
            amount: this.buyAmount,
            coinName: this.coin.name,
            coinPrice: this.coin.market_data.current_price.usd
          })
        } else {
          this.showWarningAlert = 2
        }
      }
    },
    watch: {
      query(newValue, oldValue) {
        console.log(`old: ${oldValue} - new: ${newValue}`)
        //this.onSearchCoin() -- skulle kunna användas för real-time search
      }
    }
  }
</script>

<style scoped lang="scss">
  $small-font-size: small;

  .small-text {
    font-size: $small-font-size;
  }
</style>
