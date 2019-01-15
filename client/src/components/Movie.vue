<!-- INTE KOPPLAD MOT DATABAS -->

<template>
  <div class="Movie">

    <section v-if="aMovie === null">
      <p>Något blev galet!</p>
      <router-link class="router-link" to="/moviesPage" exact-active-class="menu-item-active">Klicka här för att komma till alla filmer</router-link>

    </section>

    <section v-else>

      <b-jumbotron bg-variant="white">

        <!-- Title -->
        <section class="movieheader">
          <section class="movieheader_pic">
            <img class="movieposter" :src="require('../assets/'+this.aMovie.images[0])">
          </section>
          <section class="movieheader_text">
            <h1 class="movietitle">
              {{aMovie.title}}
            </h1>
            <!-- description -->
            <article>
              <span class="moviedescription" v-html="aMovie.description"></span>
            </article>
          </section>
        </section>

        <b-btn variant="primary" href="#">Boka platser</b-btn>


        <hr class="my-4">
        <section class="trailer-view">
          <section class="trailer-video">
            <iframe width="100%" height="100%" :src="'https://www.youtube.com/embed/'+this.aMovie.youtubeTrailers[0]" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          </section>
          <section class="trailer-text">
            <ul>
              <li>Genre: {{aMovie.genre}}</li>
              <li>Längd: {{parseInt(aMovie.length/60)}} timmar och {{aMovie.length%60}} minuter</li>
              <li>År: {{aMovie.productionYear}}</li>
              <li>Land:<span v-for="c in aMovie.productionCountries"> {{c}}</span></li>
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
  methods: {
    getImageUrl(){
      return { sample: require('../assets/'+this.aMovie.images[0]) };
    }
    ,
    async getMovieByID() {
      if(this.movieID() !== null){
        try{
          const response = await api.getMovies({_id: this.movieID()});
          if(response.data.movies.length > 0)
            this.aMovie = response.data.movies[0];

        } catch(error){
          this.aMovie = null;
        }
    } else {
      this.aMovie = null;
    }
  },
    movieID(){
      if(window.location.hash.indexOf("?") > 0)
        return window.location.hash.substr(window.location.hash.indexOf("?")+1);
      return null;
    }
  },
  mounted: function() {
    this.getMovieByID();
  },
  watch: {
    '$route': function() {
      this.getMovieByID();
    }
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

.movieheader{
  display: flex;
  flex-direction: column;
  padding-bottom: 5%;
}

.movieheader_pic{
  flex: 1;
}

.movieheader_text{
  flex: 5;
  padding: 0 2%;
}

.moviedescription{
  font-style: italic;
  font-size: 150%;
  color: rgb(85, 85, 85);
}

.movietitle{
  color: rgb(55, 55, 55);
  font-size: 300%;
  font-weight: bold;
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
  .movieheader{
    flex-direction: row;
  }
}

</style>
