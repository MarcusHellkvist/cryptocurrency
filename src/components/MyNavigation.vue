<template>
  <div>
    <b-navbar toggleable="sm" type="light" variant="light">
      <b-navbar-toggle target="nav-text-collapse"></b-navbar-toggle>

      <b-navbar-brand to="/"
        ><img
          src="../assets/crypto-logo.svg"
          class="d-inline-block align-top"
          alt="Logo"
          width="30"
          height="30"
        />
        Cryptocurrency</b-navbar-brand
      >

      <b-collapse id="nav-text-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item to="/">Home</b-nav-item>
          <b-nav-item to="/popular">Popular Coins</b-nav-item>
          <b-nav-item :to="$store.state.signedInUser">Wallet</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item> ${{ $store.state.money }} USD </b-nav-item>
          <b-nav-text>
            <img
              :src="networkStatus.url"
              class="d-inline-block
          align-center"
              alt="Network Status"
              width="12"
              height="12"
              :title="networkStatus.title"
            />
          </b-nav-text>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
  import greenCircle from '../assets/green-circle.svg'
  import redCircle from '../assets/red-circle.svg'

  export default {
    computed: {
      networkStatus() {
        return this.isOnline
          ? { url: greenCircle, title: 'Online' }
          : { url: redCircle, title: 'Offline' }
      }
    }
  }
</script>
