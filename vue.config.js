module.exports = {
  pwa: {
    manifestOptions: {
      background_color: '#000000'
    },
    name: 'Cryptocurrency',
    themeColor: '#cc444b',
    workboxOptions: {
      runtimeCaching: [
        {
          handler: 'NetworkFirst',
          options: {
            networkTimeoutSeconds: 5
          },
          urlPattern:
            'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1sparkline=false'
        }
      ]
    }
  }
}
