<template>
  <div class="main">

      <b-jumbotron class="white-text" style="background-image: url(http://le13emecri.com/wp-content/uploads/2014/01/rideau-rouge.jpg)">
        <template slot="header" class="white-text welcome-text">
          <h1 class="white-text welcome-text">Välkommen till Filmvisarna!</h1>
        </template>
      </b-jumbotron>
    <div v-if="movies && sessions">
      <div class="box">
        <div>
          <b-container fluid class="startposter">
            <b-row>
              <b-col>
                <figure class="imgbox">
                  <router-link
                    class="router-link"
                    :to="'/Movie?movieID='+this.movies[0]._id"
                    exact-active-class="menu-item-active"
                  >
                    <img class="poster" :src="require('../assets/'+this.movies[0].images[1])">
                  </router-link>
                  <h3>{{movies[0].title}}</h3>
                  <router-link
                    class="router-link"
                    :to="'/Movie?movieID='+this.movies[0]._id"
                    exact-active-class="menu-item-active"
                  >
                    <b-button>Läs mer</b-button>
                  </router-link>
                    <b-button v-on:click="goToBooking(0)">Snabb boka</b-button>
                </figure>
              </b-col>
              <b-col>
                <figure class="imgbox">
                  <router-link
                    class="router-link"
                    :to="'/Movie?movieID='+this.movies[1]._id"
                    exact-active-class="menu-item-active"
                  >
                    <img class="poster" :src="require('../assets/'+this.movies[1].images[1])">
                  </router-link>
                  <h3>{{movies[1].title}}</h3>
                  <router-link
                    class="router-link"
                    :to="'/Movie?movieID='+this.movies[1]._id"
                    exact-active-class="menu-item-active"
                  >
                    <b-button>Läs mer</b-button>
                  </router-link>
                   <b-button v-on:click="goToBooking(1)">Snabb boka</b-button>
                </figure>
              </b-col>
              <b-col>
                <figure class="imgbox">
                  <router-link
                    class="router-link"
                    :to="'/Movie?movieID'+this.movies[2]._id"
                    exact-active-class="menu-item-active"
                  >
                    <img class="poster" :src="require('../assets/'+this.movies[2].images[1])">
                  </router-link>
                  <h3>{{movies[2].title}}</h3>
                  <router-link
                    class="router-link"
                    :to="'/Movie?movieID='+this.movies[2]._id"
                    exact-active-class="menu-item-active"
                  >
                    <b-button>Läs mer</b-button>
                  </router-link>
                    <b-button v-on:click="goToBooking(2)">Snabb boka</b-button>
                </figure>
              </b-col>
            </b-row>
          </b-container>
        </div>

        <b-carousel
          id="carousel1"
          controls
          indicators
          :interval="4000"
          @sliding-start="onSlideStart"
          @sliding-end="onSlideEnd"
          class="calusel"
        >
          <b-carousel-slide>
            <img
              @click="linkToMovePage"
              slot="img"
              class="d-block img-fluid b-carousel-slide poster"
              :src="require('../assets/'+this.movies[0].images[1])"
              :value="movies[0]._id"
            >
            <ul class="schadow-text">
              <h3>{{movies[0].title}}</h3>
              <li>Visnings tid: {{parseInt(movies[1].length/60)}} timmar och {{movies[1].length%60}} minuter</li>
              <li>Åldersgräns {{movies[0].ageLimit}}år</li>
            </ul>
            <router-link
              class="router-link"
              :to="'/Movie?movieID='+this.movies[0]._id"
              exact-active-class="menu-item-active"
            >
              <b-button>Läs mer</b-button>
            </router-link>
              <b-button v-on:click="goToBooking(0)">Snabb boka</b-button>
          </b-carousel-slide>
          <b-carousel-slide>
            <img
              @click="linkToMovePage"
              slot="img"
              class="d-block img-fluid b-carousel-slide poster"
              :src="require('../assets/'+this.movies[1].images[1])"
              :value="movies[1]._id"
            >
            <ul class="schadow-text">
              <h3>{{movies[1].title}}</h3>
              <li>Visnings tid: {{parseInt(movies[1].length/60)}} timmar och {{movies[1].length%60}} minuter</li>
              <li>Åldersgräns {{movies[1].ageLimit}}år</li>
            </ul>
            <router-link
              class="router-link"
              :to="'/Movie?movieID='+this.movies[1]._id"
              exact-active-class="menu-item-active"
            >
              <b-button>Läs mer</b-button>
            </router-link>
              <b-button v-on:click="goToBooking(1)">Snabb boka</b-button>
          </b-carousel-slide>
          <b-carousel-slide>
            <img
              @click="linkToMovePage"
              slot="img"
              class="d-block img-fluid b-carousel-slide poster"
              :src="require('../assets/'+this.movies[2].images[1])"
              :value="movies[2]._id"
            >
            <ul class="schadow-text">
              <h3>{{movies[2].title}}</h3>
              <li>Visnings tid: {{parseInt(movies[2].length/60)}} timmar och {{movies[2].length%60}} minuter</li>
              <li>Åldersgräns {{movies[2].ageLimit}}år</li>
            </ul>
            <router-link
              class="router-link"
              :to="'/Movie?movieID='+this.movies[2]._id"
              exact-active-class="menu-item-active"
            >
              <b-button>Läs mer</b-button>
            </router-link>
              <b-button v-on:click="goToBooking(2)">Snabb boka</b-button>
          </b-carousel-slide>
        </b-carousel>
      </div>
    </div>
    <div v-else class="loading-logo">
      <h1 class="text-center spinner">
        <font-awesome-icon icon="spinner"/>
      </h1>
      <h1 class="text-center">Loading</h1>
    </div>
    <b-jumbotron class="white-text" style="background-image: url(http://le13emecri.com/wp-content/uploads/2014/01/rideau-rouge.jpg)">
        <template slot="header" class="white-text">Senaste nytt</template>
        <h1 class="white-text">Vi har nu öppnat, Välkomna</h1>
        <h2 class="white-text">På plats säljer vi:</h2>
        <ul class="white-text">
          <li>Popcorn,</li>
          <li>Läsk,</li>
          <li>Chips,</li>
          <li>Godis,</li>
          <li>m.m.</li>
        </ul>
      </b-jumbotron>
  </div>
</template>
<script>
import api from "@/services/Api.js";
export default {
  //Hämta data från server
  data() {
    return {
      movies: null,
      sessions: null,
      movieIndex: null,
    };
  },
  created() {
    this.getMovies();
    this.getSessions();
  },
  methods: {
    onSlideStart(slide) {
      this.sliding = true;
    },
    onSlideEnd(slide) {
      this.sliding = false;
    },
    async getMovies() {
      const response = await api.getMovies();
      this.movies = response.data.movies;
    },
    async getSessions() {
      const response = await api.getMovieSessions();
      this.sessions = response.data.movie_sessions;
    },
    linkToMovePage(e) {
      return this.$router.push("/Movie?movieID=" + e.srcElement.attributes.value.value);
    },

    goToBooking(movieIndex){
      this.movieIndex = movieIndex;
      if(!this.$store.getters.isUserSignedIn){
         this.$store.commit('toggleLoggaInWindow');
      }else{
        this.$router.push('/BokningSida?movieID'+this.movies[movieIndex]._id+'&sessionID'+this.sessions.find((cur)=>{
                    return cur.movieID === this.movies[movieIndex]._id})._id);
      }
    },
  },
   watch: {
     '$store.state.loggaInButtonPressed': function() {
       this.$router.push('/BokningSida?movieID='+this.movies[this.movieIndex]._id+'&sessionID='+this.sessions.find((cur)=>{ 
                    return cur.movieID === this.movies[this.movieIndex]._id})._id);
    },

  }
};
</script>
<style scoped>

.loading-logo {
  height: 70vh;
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

h1 {
  text-align: center;
}
h2 {
  text-align: center;
}
h3 {
  text-align: center;
}
li {
  text-align: center;
  list-style-type: none;
}
ul{
  margin: 0;
  padding: 0;
}
.calusel {
  display: none;
}
.poster {
  height: auto;
  width: 20vw;
}
.imgbox {
  text-align: center;
}
.flex-row {
  display: flex;
  flex-direction: row;
}
.startposter {
  padding-top: 2vh;
}

.white-text{
  color: white;
  text-shadow: 20px 20px 20px 20px black;
}

.welcome-text{
  font-size: 130%;
}

@media only screen and (max-device-width: 560px) {

  .welcome-text{
    font-size: 70%;
  }

  .b-carousel-slide {
    width: 100%;
  }
  .schadow-text {
    color: white;
    font-weight: bold;
    text-shadow: 2px 2px 5px black;
  }
  .startposter {
    display: none;
  }
  .calusel {
    display: inline;
  }
  .poster {
    height: 90vmax;
    width: 100vmin;
  }
}
</style>
