<template>
  <header>
    <b-navbar toggleable="md" type="dark" class="navbar">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

      <b-navbar-brand class="router-link" style="color:white;" to="/">Filmvisarna</b-navbar-brand>

      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
          <b-nav-item class="router-link" to="/" exact-active-class="menu-item-active" exact>Hem</b-nav-item>
          <b-nav-item class="router-link" to="/moviesPage" exact-active-class="menu-item-active">Filmer</b-nav-item>
          <b-nav-item class="router-link" to="/kontaktSida" exact-active-class="menu-item-active">Kontakta Oss </b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-form>
            <b-form-input size="sm" class="mr-sm-2" type="text" placeholder="Sök Film"/>
            <b-button size="sm" class="my-2 my-sm-0 mr-3 search-button" type="submit">Sök</b-button>
          </b-nav-form>

          <b-navbar-nav right>
            <b-nav-item class="router-link" to="/LoggaIn" v-show="this.$store.state.showLoggaInButton" exact-active-class="menu-item-active">Logga In</b-nav-item>
            <b-nav-item class="router-link" to="/MinSida" v-show="this.$store.state.showMinaSidorButton" exact-active-class="menu-item-active">Min Sida</b-nav-item>
            <b-nav-item class="router-link" to="/" exact-active-class="menu-item-active" v-show="this.$store.state.showMinaSidorButton">Logga Ut</b-nav-item>
          </b-navbar-nav>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </header>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {};
  },
  methods: {
      signOut(){
      this.$store.commit('showMinaSidor');
      this.$router.push('/LoggaIn');
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.navbar{
  background-color: #cc0020;
}
.router-link {
  text-decoration: none;
  color:#ffb8c3;
}

.menu-item-active{
  color:white;
}

.search-button {
    color: white;
    background-color: #f0f3f500;
    border-color: white;
}
</style>
