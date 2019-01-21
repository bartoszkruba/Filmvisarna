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
    <h1 class="text-center mt-3" v-if="movies && movies.length === 0">Inga Sökträffar :(</h1>
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

          <div class="movietext">
            <div class="flex-col">
              <router-link
                class="router-link"
                :to="'/Movie?'+m._id"
                exact-active-class="menu-item-active"
              >
                <h2>{{m.title}}</h2>
              </router-link>

              <div class="flexbox ptaggar info-direction">
                <p>Längd: {{parseInt(m.length/60)}} timmar och {{m.length%60}} minuter</p>
                <p class="destop-only">|</p>
                <p>Genre: {{m.genre}}</p>
                <p class="destop-only">|</p>
                <p>Ålder: {{m.ageLimit}} år</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr>
    </div>
    <div class="mt-5 loading-logo" v-if="movies === null">
      <h1 class="text-center spinner">
        <font-awesome-icon icon="spinner"/>
      </h1>
      <h1 class="text-center">Loading</h1>
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
  mounted() {
    this.getMovies();
  },
  methods: {
    async getMovies() {
      if (window.location.hash.indexOf("?") > 0) {
        const response = await api.searchMovies(
          window.location.hash
            .substr(window.location.hash.indexOf("?") + 1)
            .replace("_", " ")
        );
        this.movies = response.data.movies;
        if (this.movies.length === 1) {
          this.$router.push(`/Movie?${this.movies[0]._id}`);
        }
      } else {
        const response = await api.getMovies();
        this.movies = response.data.movies;
      }
    }
  },
  watch: {
    $route(to, from) {
      this.getMovies();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.loading-logo {
  opacity: 1;
  animation: flickerAnimation 3s infinite;
  overflow: hidden;
}

@keyframes flickerAnimation {
  /* flame pulses */
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.spinner{
  -webkit-animation: spin 3s infinite linear;
}

@-webkit-keyframes spin {
    0%  {-webkit-transform: rotate(0deg);}
    100% {-webkit-transform: rotate(360deg);}   
}


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
  color: black;
  font-weight: bold;
  font-size: 3rem;
}
a:hover {
  text-decoration: none;
}
hr {
  border-color: rgb(124, 123, 123);
}
.posterpic {
  width: 20vmin;
  box-shadow: 2px 2px 5px black;
}
.images {
  margin: 0;
}
.info-direction {
  flex-direction: row;
}
.movietext {
  display: flex;
  align-items: center;
  justify-content: center;
}
@media screen and (min-width: 501px) and (max-width: 1500px) {
  h2 {
    font-size: 2rem;
  }
  p {
    font-size: 1.2rem;
    margin: 0;
    line-height: 0.5rem;
  }

  .info-direction {
    flex-direction: column;
  }
  .destop-only {
    display: none;
  }
}

@media screen and (max-width: 500px) {
  h2 {
    font-size: 1.5rem;
    margin-top: 0.8rem;
    margin-bottom: 0.5rem;
    text-align: center;
  }
  p {
    font-size: 0.7rem;
    padding: 0.1rem;
    line-height: 0.5rem;
  }
  .ptaggar {
    justify-content: center;
  }
  .flex-mobil {
    flex-direction: column;
  }
  .posterpic {
    width: 90vmin;
  }
  .info-direction {
    flex-direction: column;
    text-align: center;
  }
  .destop-only {
    display: none;
  }
}
</style>

