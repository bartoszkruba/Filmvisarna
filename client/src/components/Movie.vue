
<template>
<div class="Movie">

  <b-jumbotron bg-variant="white">
    <section v-if="errorFromMongo">
      <h1>Något blev fel!</h1>
      <p>Vi hittade ingen film med det ID som angavs. Det kan bero på något av följande</p>
      <ul>
        <li>Antipiratbyrån har hackat oss</li>
        <li>Vår hemsida har tekniskt strul</li>
        <li>Du har klickat på en gammal länk</li>
      </ul>
      <router-link class="router-link" to="/moviesPage" exact-active-class="menu-item-active">Klicka här för att komma till alla filmer</router-link>
    </section>

    <section v-if="aMovie && movieSessions">


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
          <div v-if="movieSessions.length">

          <!-- <router-link class="router-link" :to="'/BokningSida?'+aMovie._id" exact-active-class="menu-item-active"> -->
            <b-btn v-on:click="goToBooking" variant="danger">Boka biljetter</b-btn>
          <!-- </router-link> -->

            <b-dropdown id="ddown-buttons" text="Ändra visningsdatum: " variant="danger" class="m-2">
              <b-dropdown-item-button v-on:click="changeSession" v-for="session in this.movieSessions" :value="session._id" :key="session._id">{{getWeekdayString(session.date.year,session.date.month,session.date.day).slice(0,-3)}} {{session.date.day + '/' + session.date.month + ' ' + session.date.year + ' ' + session.date.time }}</b-dropdown-item-button>
            </b-dropdown>
            <h3><br>
              Vald visning: {{targetSessionDisplay}}
            </h3>
          </div>
          <div v-else>
            <p>Det finns inga visningar publicerade för {{aMovie.title}}</p>
          </div>
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
    <section v-else class="loading-logo">
      <h1 class="text-center spinner">
        <font-awesome-icon icon="spinner"/>
      </h1>
      <h1 class="text-center">Loading</h1>
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
      errorFromMongo: false,
      aMovie: null,
      movieSessions: null,
      sessionID: null,
      targetSessionDisplay: null,
      loggaInButtonPressed: this.$store.state.loggaInButtonPressed,
      urlQuery: {}
    };
  },
  methods: {
    getWeekdayString(y, m, d){
      let stringDate = `${y}-${m}-${d}`;
      let date = new Date(stringDate);
      let weekday = date.getDay();
      let output;
      switch (weekday) {
        case 0:
          output = "Söndag";
          break;
        case 1:
          output = "Måndag";
          break;
        case 2:
          output = "Tisdag";
          break;
        case 3:
          output = "Onsdag";
          break;
        case 4:
          output = "Torsdag";
          break;
        case 5:
          output = "Fredag";
          break;
        case 6:
          output = "Lördag";
          break;
        default:
          output = "Ingen dag alls"
      }
      return output;
    },
    changeSession(e){
      /*
        This function changes the sessionID for pushing route to booking
        It also updates the text in the HTML
      */
      let target = e.target.innerHTML;
      let weekday;

      // Split string
      target = target.split(" ");
      target.shift(); // First in array is empty

      target[0] = target[0].split("/"); // Split day/month
      // Padding for month and day
      target[0][0] = target[0][0].padStart(2, "0");
      target[0][1] = target[0][1].padStart(2, "0");
      // Get string with day of week
      weekday = this.getWeekdayString(target[1], target[0][1], target[0][0]);

      // Join arrays to string again. Add "kl:" before time is displayed
      target[0] = target[0].join("/");
      target.splice(2, 0, "kl:");
      target = target.join(" ");

      this.targetSessionDisplay = weekday + " " + target;
      this.sessionID = e.target.value;
    },
    goToBooking(){
      if(!this.$store.getters.isUserSignedIn){
         this.$store.commit('toggleLoggaInWindow');
      }else{
        this.$router.push('/BokningSida?movieID='+this.urlQuery.movieID+'&sessionID='+this.sessionID);
      }
    },
    starView(s, n) {
      let starPut = "";
      for (let i = s; i < n; i++)
        starPut += "*";
      return starPut;
    },
    async getMovieByID() {
      this.aMovie = null;
      if (this.urlQuery.movieID !== undefined) {
        try {
          const response = await api.getMovies({
            _id: this.urlQuery.movieID
          });
          if (response.data.movies.length > 0)
            this.aMovie = response.data.movies[0];

        } catch (error) {
        }
      }
      if(this.aMovie === null)
        this.errorFromMongo = true;
    },
    async getMovieSessions(){
      this.movieSessions = null;
      if (this.urlQuery.movieID !== undefined) {
        try {
          const response = await api.getMovieSessions({
            movieID: this.urlQuery.movieID
          });
          this.movieSessions = response.data.movie_sessions;
          if(this.movieSessions.length > 0){
            let targetSession = null;
            if(this.urlQuery.sessionID){
              targetSession = this.movieSessions.find((cur)=>{
                return cur._id === this.urlQuery.sessionID
              });
            }
            if(targetSession){
              this.sessionID = this.urlQuery.sessionID;
              this.targetSessionDisplay = `${this.getWeekdayString(targetSession.date.year,targetSession.date.month,targetSession.date.day)} ${targetSession.date.day}/${targetSession.date.month} ${targetSession.date.year} kl: ${targetSession.date.time}`;
            } else {
              this.sessionID = this.movieSessions[0]._id;
              this.targetSessionDisplay = `${this.getWeekdayString(this.movieSessions[0].date.year,this.movieSessions[0].date.month,this.movieSessions[0].date.day)} ${this.movieSessions[0].date.day}/${this.movieSessions[0].date.month} ${this.movieSessions[0].date.year} kl: ${this.movieSessions[0].date.time}`;
            }
          }
        } catch (error) {
        }
      }
      if(this.movieSessions === null)
        this.errorFromMongo = true
    },
    getUrlQuery() {
      this.urlQuery = {};
      let searchIndex = window.location.href.indexOf("?")+1;
      let url = window.location.href;
      let output = {};

      if(searchIndex > 0) {
        url = url.substr(searchIndex).split("&");
        for(let i = 0; i < url.length; i++){
          url[i] = url[i].split("=");
          if(url[i][1].length > 0)
            this.urlQuery[url[i][0]] = url[i][1];
        }
      }
    }
  },
  mounted: function() {
    this.getUrlQuery();
    this.getMovieByID();
    this.getMovieSessions();
  },
  watch: {
    '$route': function() {
      this.getUrlQuery();
      this.getMovieByID();
      this.getMovieSessions();
    },
     '$store.state.loggaInButtonPressed': function() {
        this.$router.push('/BokningSida?movieID='+this.urlQuery.movieID+'&sessionID='+this.sessionID);
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
* {
  box-sizing: border-box;
}

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
