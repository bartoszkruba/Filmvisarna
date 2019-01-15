<!-- INTE KOPPLAD MOT DATABAS -->

<template>
  <div class="Movie">

    <router-link class="router-link" to="/Movie?5c3c67130e6703180823a062" exact-active-class="menu-item-active">Movie1</router-link>
    <router-link class="router-link" to="/Movie?5c3c68990e6703180823a064" exact-active-class="menu-item-active">Movie 2</router-link>

    <section v-if="aMovie === null">
      <p>Något blev galet!</p>
      <router-link class="router-link" to="/moviesPage" exact-active-class="menu-item-active">Klicka här för att komma till alla filmer</router-link>

    </section>

    <section v-else>


      <b-jumbotron bg-variant="white">

        <!-- Title -->
        <template slot="header">
          {{aMovie.title}}
        </template>
        <!-- description -->
        <template slot="lead">
            <span v-html="aMovie.description"></span>
        </template>
        <b-btn variant="primary" href="#">Boka platser</b-btn>


        <hr class="my-4">
        <section class="trailer-view">
          <section class="trailer-video">
            <iframe width="100%" height="100%" src="https://www.youtube.com/embed/Z9AYPxH5NTM" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          </section>
          <section class="trailer-text">
            <ul>
              <li>Genre: {{aMovie.tenre}}</li>
              <li>Längd: {{aMovie.length}}</li>
              <li>År: {{aMovie.productionYear}}</li>
              <li>Land:<span v-for="c in aMovie.ProductionCountries"> {{c}}</span></li>
              <li>Språk: {{aMovie.language}}</li>
              <li>Undertexter: {{aMovie.subtitles}}</li>
              <li>Regisör: {{aMovie.director}}</li>
            </ul>
            <ul>
              <li>Skådespelare:</li>
              <li v-for="actor in aMovie.actors">{{actor}}</li>
            </ul>
          </section>
          <section class="trailer-text">
            <p>
              Quote
            </p>

          </section>
        </section>
        <hr class="my-4">


      </b-jumbotron>
    </section>
  </div>
</template>

<script>
import api from "@/services/Api.js";

export default {
  name: "Movie",
  data() {
    return {
      aMovie: null
    };
  },
  computed: {
    movieID: function(){
      if((window.location.hash.indexOf("?")+1) > 0)
        return window.location.hash.substr(window.location.hash.indexOf("?")+1);
      return null;
    }
  },
  methods: {
    async getMovieByID() {
      console.log(this.movieID);
      if(this.movieID !== null){
        const response = await api.getMovies({_id: this.movieID});
        if(response.data.movies.length > 0){
          this.aMovie = response.data.movies[0];
        }
      }
    }
  },
  mounted: function() {
    this.getMovieByID();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
*{
  box-sizing: border-box;
}
.trailer-view{
  display: flex;
  flex-direction: column;
}
.trailer-text{
  flex: 1;
  order: 2;
}
.trailer-video{
  display: flex;
  justify-content: space-around;
  flex: 1;
}

.combined-view{
  display: flex;
}
.combined-view > section{
  flex: 1;
}

li{
  list-style: none;
}

.movieposter{
  width: 100%;
}

@media screen and (min-width: 1024px) {
  .trailer-view{
    flex-direction: row;
  }
}

</style>
