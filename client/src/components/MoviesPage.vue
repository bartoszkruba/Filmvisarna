<template>
  <section class="hello">
    <!--<section>
  <b-navbar type="dark" variant="danger" toggleable>
    <b-navbar-toggle target="nav_dropdown_collapse"></b-navbar-toggle>
    <b-collapse is-nav id="nav_dropdown_collapse">
      <b-navbar-nav>
        <b-nav-item href="#">Home</b-nav-item>
        <b-nav-item href="#">Link</b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
    </section>-->
    <div v-for="m in movies">
      <div class="flexbox main-placing">
        <div class="flex-mobil">
          <figure class="images">
            <router-link
              class="router-link"
              :to="'/Movie?'+m._id"
              exact-active-class="menu-item-active"
            >
              <img :src="require('../assets/'+m.images[1])" class="posterpic">
            </router-link>
          </figure>

          <div class="flex-col">
            <router-link
              class="router-link"
              :to="'/Movie?'+m._id"
              exact-active-class="menu-item-active"
            >
              <h2>{{m.title}}</h2>
            </router-link>

            <div class="flexbox ptaggar">
              <p>Längd: {{m.length}} minuter</p>
              <p>|</p>
              <p>Genre: {{m.genre}}</p>
              <p>|</p>
              <p>Ålder: {{m.ageLimit}} år</p>
            </div>
          </div>
        </div>
      </div>
      <hr>
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
  created() {
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
.flexbox {
  display: flex;
}
.flex-col {
  display: flex;
  flex-direction: column;
}
.flex-mobil {
  display: flex;
}
.main-placing {
  margin: 1rem;
}
p {
  padding: 0.5rem;
  padding-left: 1rem;
}
h2 {
  margin-left: 1rem;
  margin-bottom: 0;
  margin-top: 5rem;
  color: black;
  font-weight: bold;
  font-size: 3rem;
}
a:hover {
  text-decoration: none;
}
hr {
  border-color: black;
}
.posterpic {
  width: 20vmin;
  box-shadow: 2px 2px 5px black;  
}
.images {
  margin: 0;
}
@media screen and (min-width: 501px) and (max-width: 1500px) {
 h2{
   font-size: 2rem;
 }
 p{
   font-size: 1.2rem;
 }
  
  
}

@media screen and (max-width: 500px) {
  h2 {
    font-size: 1.5rem;
    margin-top: 0.5rem;
    text-align: center;
  }
  p {
    font-size: 0.7rem;
    padding: 0.1rem;
    
  }
  .ptaggar{
   justify-content: center;
   
  }
  .flex-mobil{
    flex-direction: column;
  }
  .posterpic{
    width: 90vmin;
   
  }
}
</style>

