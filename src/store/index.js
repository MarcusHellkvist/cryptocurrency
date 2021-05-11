import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    signedInUser: 'Guest',
    money: 100000,
    userWallet: []
  },
  mutations: {
    buy(state, data) {
      state.money = state.money - data.amount
      let coinAmount = data.amount / data.coinPrice
      let newCoin = {
        coinName: data.coinName,
        amountInUsd: data.amount,
        amountInCoin: coinAmount
      }
      state.userWallet.push(newCoin)
    }
  },
  actions: {},
  modules: {}
})
