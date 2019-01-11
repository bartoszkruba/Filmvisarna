<template>
  <div class="hello">
    <h1>Filmer</h1>
  </div>
</template>

<script>
import api from "@/services/Api.js";

export default {
  name: "FilmPage",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      movies: null
    };
  },
  methods: {
    async getMovies() {
      const response = await api.getMovies();
      this.movies = response.data.movies;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
