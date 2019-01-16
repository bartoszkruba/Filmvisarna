<!-- INTE KOPPLAD MOT DATABAS -->

<template>
<div class="Movie">

  <b-jumbotron bg-variant="white">
    <section v-if="aMovie === null">
      <h1>Något blev fel!</h1>
      <p>Vi hittade ingen film med det ID som angavs. Det kan bero på något av följande</p>
      <ul>
        <li>Antipiratbyrån har hackat oss</li>
        <li>Vår hemsida har tekniskt strul</li>
        <li>Du har klickat på en gammal länk</li>
      </ul>
      <router-link class="router-link" to="/moviesPage" exact-active-class="menu-item-active">Klicka här för att komma till alla filmer</router-link>

    </section>

    <section v-else>


      <!-- Title -->
      <section class="movieheader">

        <section class="movieheader_pic">
          <img class="movieposter" :src="require('../assets/'+this.aMovie.images[1])">
        </section>

        <section class="movieheader_text">
          <h1 class="movietitle">
            {{aMovie.title}}
          </h1>
          <!-- description -->
          <article>
            <span class="moviedescription" v-html="aMovie.description"></span>
          </article>
          <br>
          <!-- <router-link class="router-link" :to="'/BokningSida?'+aMovie._id" exact-active-class="menu-item-active"> -->
            <b-btn v-on:click="goToBooking" variant="danger">Boka biljetter</b-btn>
          <!-- </router-link> -->

            <b-dropdown id="ddown-buttons" text="Välj datum: " variant="danger" class="m-2">
              <b-dropdown-item-button v-on:click="changeSession" v-for="session in this.movieSessions" :value="session._id" :key="session._id"> {{session.date.day + '/' + session.date.month + ' ' + session.date.year + ' ' + session.date.time }}</b-dropdown-item-button>
            </b-dropdown>
        </section>
      </section>




      <hr class="my-4">
      <section class="trailer-view">
        <section class="trailer-video">
          <iframe class="videoplayer" :src="'https://www.youtube.com/embed/'+this.aMovie.youtubeTrailers[0]" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </section>
        <section class="trailer-text">
          <h5>Om filmen</h5>
          <p>
            <span v-if="aMovie.genre.length > 0">
              Genre: {{aMovie.genre}}<br>
            </span>
            <span v-if="aMovie.genre.length > 0">
              Längd: {{parseInt(aMovie.length/60)}} timmar och {{aMovie.length%60}} minuter<br>
            </span>
            <span v-if="aMovie.productionYear">
              År: {{aMovie.productionYear}}<br>
            </span>
            <span v-if="aMovie.productionCountries.length > 0">
              Land:<span v-for="c in aMovie.productionCountries"> {{c}}</span>
              <br>
            </span>
            <span v-if="aMovie.language.length > 0">
              Språk: {{aMovie.language}}<br>
            </span>
            <span v-if="aMovie.subtitles.length > 0">
              Undertexter: {{aMovie.subtitles}}<br>
            </span>
            <span v-if="aMovie.ageLimit">
              Åldersgräns: {{aMovie.ageLimit}} år<br>
            </span>
          </p>

          <p>
            <span v-if="aMovie.actors.length > 0">
              Regisör: {{aMovie.director}}<br>
            </span>
            <span v-if="aMovie.actors.length > 0">
              Skådespelare:
            </span>
            <span v-for="actor in aMovie.actors">
              <br>{{actor}}
            </span>
          </p>
        </section>
        <section class="trailer-text">
          <article v-for="review in aMovie.reviews">
            <p>
              <span class="reviewHead">{{review.source}}</span>
              <span class="star activeStar">{{starView(0, (review.stars/1))}}</span><span class="star inactiveStar">{{starView((review.stars/1), (review.max/1))}}</span>
              <br>
              <em>{{review.quote}}</em>
            </p>

          </article>


        </section>
      </section>
      <hr class="my-4">



    </section>
  </b-jumbotron>
</div>
</template>

<script>
import api from "@/services/Api.js";

export default {
  name: "Movie",
  data() {
    return {
      aMovie: null,
      movieSessions: null,
      sessionID: null
    };
  },
  methods: {
    changeSession(e){
      this.sessionID = e.target.value;
      console.log(this.sessionID);
    },
    goToBooking(){
      this.$router.push('/BokningSida?'+this.movieID()+'&'+this.sessionID);
    },
    starView(s, n) {
      let starPut = "";
      for (let i = s; i < n; i++)
        starPut += "*";
      return starPut;
    },
    async getMovieByID() {
      if (this.movieID() !== null) {
        try {
          const response = await api.getMovies({
            _id: this.movieID()
          });
          if (response.data.movies.length > 0)
            this.aMovie = response.data.movies[0];

        } catch (error) {
          this.aMovie = null;
        }
      } else {
        this.aMovie = null;
      }
    },
    async getMovieSessions(){
      if (this.movieID() !== null) {
        try {
          const response = await api.getMovieSessions({
            movieID: this.movieID()
          });
          this.movieSessions = response.data.movie_sessions;

        } catch (error) {
          this.movieSessions = null;
        }
      } else {
        this.movieSessions = null;
      }
    },
    movieID() {
      if (window.location.hash.indexOf("?") > 0)
        return window.location.hash.substr(window.location.hash.indexOf("?") + 1);
      return null;
    }
  },
  mounted: function() {
    this.getMovieByID();
    this.getMovieSessions();
  },
  watch: {
    '$route': function() {
      this.getMovieByID();
      this.getMovieSessions();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
* {
  box-sizing: border-box;
}

.trailer-view {
  display: flex;
  flex-direction: column;
}

.trailer-text {
  flex: 1;
  order: 2;
}

.trailer-video {
  text-align: center;
  flex: 1;
}

.videoplayer {
  height: 60vmin;
  width: 90vmin;
}


.movieheader {
  display: flex;
  flex-direction: column;
}

.movieheader_pic {
  padding: 0 2%;
  flex: 1;
  text-align: center;
}

.movieheader_text {
  flex: 5;
}

.moviedescription {
  font-style: italic;
  font-size: 100%;
  color: rgb(85, 85, 85);
}

.movietitle {
  color: rgb(55, 55, 55);
  font-size: 200%;
  font-weight: bold;
}

li {
  list-style: none;
}

.movieposter {
  width: 85vmin;
  height: auto;
}

.star {
  margin: 0;
  padding: 0;
  font-weight: bold;
  font-size: 180%;
  text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
}

.reviewHead {
  font-size: 200%;
}

.activeStar {
  color: rgb(233, 255, 0);
}

.inactiveStar {
  color: rgb(122, 122, 122);
}

@media screen and (min-width: 768px) {
  .moviedescription {
    font-size: 150%;
  }

  .movietitle {
    font-size: 300%;
  }

  .trailer-view {
    flex-direction: row;
  }

  .movieheader {
    flex-direction: row;
  }

  .movieposter {
    width: 30vmin;
    height: auto;
  }

  .trailer-video {
    margin-bottom: 0;
  }

  .videoplayer {
    height: 20vmax;
    width: 30vmax;
  }
}
</style>
