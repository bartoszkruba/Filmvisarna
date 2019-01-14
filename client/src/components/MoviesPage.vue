<template>



  <div class="hello">
    <h1>{{ msg }}</h1>
    <div v-for="m in movies">
      <h2>{{m.Title}}</h2>
      <p>{{m.ProductionCountries}}</p>
      <p>{{m.ProductionYear}}</p>
      <p>{{m.Length}}</p>
      <p>{{m.Genre}}</p>
      <p>{{m.Language}}</p>
      <p>{{m.Subtitle}}</p>
      <p>{{m.Director}}</p>
      <p v-for="actor in m.Actors">{{actor}}</p>
      <p>{{m.Description}}</p>
      <p>{{m.Age}}</p>
      <p> <img src="../assets/Insidious.jpg" alt=""></p>
    </div>
    <button @click="getMovies" class="btn btn-warning" >Get Movies</button>
  </div>
</template>

<script>
import api from "@/services/Api.js";

export default {
  name: "MoviesPage",
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

