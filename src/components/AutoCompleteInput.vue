<template>
  <div>
    <div class="pl-1 pb-2 pt-3">
      Selected user: <span v-if="selecteduser">{{ selecteduser.login }}</span>
    </div>
    <vue-typeahead-bootstrap
      class="mb-4"
      v-model="query"
      :ieCloseFix="false"
      :data="users"
      :serializer="(item) => item.login"
      @hit="selecteduser = $event"
      :disabledValues="selecteduser ? [selecteduser.login] : []"
      placeholder="Search Github Users"
      @input="lookupUser"
    />
  </div>
</template>

<script>
  import { debounce } from 'lodash'

  export default {
    data() {
      return {
        query: '',
        selecteduser: null,
        users: []
      }
    },

    methods: {
      lookupUser: debounce(function() {
        // in practice this action should be debounced
        //https://api.coingecko.com/api/v3/coins/${this.query}
        // https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin&order=market_cap_desc&per_page=10&page=1&sparkline=false
        // https://api.github.com/search/users?q=${this.query}
        fetch(`https://api.github.com/search/users?q=${this.query}`)
          .then((response) => {
            return response.json()
          })
          .then((data) => {
            this.users = data.items
          })
      }, 500)
    }
  }
</script>
