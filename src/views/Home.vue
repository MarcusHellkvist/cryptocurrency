<template>
  <div class="home">
    <h1>CryptoSearch</h1>
    <p>Probably the worst cryptocurrency search engine there is.</p>
    <crypto-search @data-fetched="onDataFetch"></crypto-search>
    <div class="alert alert-danger" role="alert" v-if="dataEvent === false">
      <strong>{{ dataQuery }} </strong>could not be found!
    </div>
    <auto-complete-input></auto-complete-input>
  </div>
</template>

<script>
  import AutoCompleteInput from '../components/AutoCompleteInput.vue'
  // @ is an alias to /src
  import CryptoSearch from '../components/CryptoSearch.vue'

  export default {
    data() {
      return {
        dataEvent: null,
        dataQuery: null
      }
    },
    name: 'Home',
    components: {
      CryptoSearch,
      AutoCompleteInput
    },
    methods: {
      onDataFetch: function(data, query) {
        if (data) {
          console.log('success!')
          this.dataEvent = data
          this.dataQuery = query
        } else {
          console.log('failed')
          this.dataEvent = data
          this.dataQuery = query
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  $font-stack: Helvetica, sans-serif;
  $primary-color: #1c6e8c;

  p {
    font: 100% $font-stack;
    color: $primary-color;
  }
</style>
