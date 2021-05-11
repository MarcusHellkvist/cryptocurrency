<template>
  <div class="container">
    <nav class="navbar navbar-expand-md navbar-light">
      <a class="navbar-brand" href="#">
        <img
          src="../assets/crypto-logo.svg"
          width="30"
          height="30"
          class="d-inline-block align-top"
          alt=""
        />
        Cryptocurrency
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#toggleMobileMenu"
        aria-controls="toggleMobileMenu"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="toggleMobileMenu">
        <ul class="navbar-nav">
          <li><router-link class="nav-link" to="/">Home</router-link></li>
          <li>
            <router-link class="nav-link" to="/popular"
              >Popular Coins</router-link
            >
          </li>
          <li>
            <router-link
              class="nav-link"
              :to="{
                name: 'Wallet',
                params: { userName: this.$store.state.signedInUser }
              }"
              >My Wallet</router-link
            >
          </li>
          <li class="nav-link">${{ $store.state.money }}</li>
        </ul>
      </div>
    </nav>
  </div>
</template>
