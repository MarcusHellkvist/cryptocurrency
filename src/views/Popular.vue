<template>
  <div class="popular-coins">
    <h1>Popular cryptocurrency</h1>
    <top-coins :numberOfCoins="10"></top-coins>
  </div>
</template>

<script>
  import TopCoins from '../components/TopCoins.vue'

  export default {
    components: {
      TopCoins
    }
  }
</script>
