<template>
  <header>
    <b-navbar toggleable="md" type="dark" class="navbar">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

      <b-navbar-brand class="router-link" style="color:white;" to="/Startsida">Filmvisarna</b-navbar-brand>

      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
          <b-nav-item class="router-link" to="/Startsida" exact-active-class="menu-item-active" exact>Hem</b-nav-item>
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
            <b-nav-item class="router-link" to="/LoggaIn" v-if="this.$store.state.showLoggaInButton" exact-active-class="menu-item-active">Logga In</b-nav-item>
            <b-nav-item class="router-link" to="/MinSida" v-if="this.$store.state.showMinaSidorButton" exact-active-class="menu-item-active"><font-awesome-icon style="margin-right: 5px" icon="user"/>{{this.$store.state.loggedInUser.name.split(' ')[0]}}</b-nav-item>
            <b-nav-item class="router-link" to="/adminPage" v-if="this.$store.state.showAdminButton" exact-active-class="menu-item-active">Admin Sida</b-nav-item>
            <b-nav-item class="router-link" @click="signOut" exact-active-class="menu-item-active" v-if="this.$store.state.showMinaSidorButton">Logga Ut</b-nav-item>
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
        if(this.$store.state.loggedInUser.admin){
          this.$store.commit('showAdminControls');
        }
      this.$store.commit('showMinaSidor');
      this.$store.commit('resetUserProperties');
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
