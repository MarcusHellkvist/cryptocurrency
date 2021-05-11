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
          urlPattern: /^https:\/\/api\.coingecko\.com\/api\/v3\/coins\/.*/
        },
        {
          handler: 'NetworkFirst',
          options: {
            networkTimeoutSeconds: 5
          },
          urlPattern: 'https://api.coingecko.com/api/v3/search/trending'
        }
      ]
    }
  }
}
