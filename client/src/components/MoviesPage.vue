<template>
 <section class="hello">

<section>
  <b-navbar type="dark" variant="danger" toggleable>
    <b-navbar-toggle target="nav_dropdown_collapse"></b-navbar-toggle>
    <b-collapse is-nav id="nav_dropdown_collapse">
      <b-navbar-nav>
        <b-nav-item href="#">Home</b-nav-item>
        <b-nav-item href="#">Link</b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</section>

 
    <div v-for="m in movies">
      <div class="flexbox main-placing">
      <img src="../assets/Insidious.jpg" alt="">
       
       <div class="flex-col ">
      <h2>{{m.title}}</h2>
      <div class="flexbox placing">
      <p>Längd: {{m.length}}</p>
      <p>Genre: {{m.genre}}</p>
      <p>Ålder: {{m.ageLimit}}</p>
      </div>
       </div>
     </div>
    </div>
 
  </section>
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
  created(){
    this.getMovies();
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
.flexbox{
  display: flex;
}
.flex-col{
  display: flex;
  flex-direction: column;
}
.main-placing{
  margin: 1rem;
}
.placing{
  margin: 1rem;
}
p{
  padding: 1rem;
}
</style>

