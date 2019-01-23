<template>
  <section class="hello">
    <section v-if="errorFromMongo" class="text-center mt-3">
      <h1>Något blev fel!</h1>
      <p>Vi hittade ingen film med det ID som angavs. Det kan bero på något av följande</p>
      <ul>
        <li>Antipiratbyrån har hackat oss</li>
        <li>Vår hemsida har tekniskt strul</li>
        <li>Du har klickat på en gammal länk</li>
      </ul>
      <router-link
        class="router-link"
        to="/filmsida"
        exact-active-class="menu-item-active"
      >Klicka här för att komma till alla filmer</router-link>
    </section>

    <section v-if="movies && sessions && theatres">
      
      <section class="main">
      <section class="flex-col wrapping">
        <section v-for="session in this.sessions.slice(0,articlesShown)">
          <div class="flexbox flex-mobil">
            <figure class="images">
              <router-link
                class="router-link"
                :to="'/film?movieID='+ session.movieID+'&sessionID='+session._id"
                exact-active-class="menu-item-active"
              >
                <img
                  class="posterpic"
                  :src="url + movies.find((cur)=>{
               return cur._id === session.movieID
               }).imagesLinks.poster"
                >
              </router-link>
            </figure>

            <div class="flex-col text">
              <h4>{{getWeekdayString(session.date.year,session.date.month,session.date.day)}} {{session.date.day.toString().padStart(2, "0")}}/{{session.date.month.toString().padStart(2, "0")}}-{{session.date.year}}</h4>

              <h5>
                {{movies.find((cur)=>{
                return cur._id === session.movieID
                }).title}}
              </h5>
              <div class="flexbox col-mob">
              <p>
                <span>tid:</span>
                {{session.date.time}}</p>
                <p class="desk-only">|</p>
               <p> <span>Lediga Platser:</span>
                {{session.freePlaces}}
              </p>
              <p class="desk-only">|</p>
              <p>
                {{theatres.find((cur)=>{
                return cur._id === session.movieTheatreID
                }).name}}
              </p>
              </div>

              <div class="flexbox buttons">
                <router-link
                  class="router-link"
                  :to="'/film?movieID='+ session.movieID+'&sessionID='+session._id"
                  exact-active-class="menu-item-active"
                >
                  <b-button>Läs mer</b-button>
                </router-link>
                  <b-button class="secound-button" @click="goToBooking(session)">Boka</b-button>
              </div>
            </div>
          </div>
          <hr>
        </section>
      </section>
      
      </section>
      <div class="showMoreButton">
        <b-button class="showMore" v-on:click="loadMore">Visa fler</b-button>
      </div>
    </section>
    <section v-else class="loading-logo mt-5">
      <h1 class="text-center spinner">
        <font-awesome-icon icon="spinner"/>
      </h1>
      <h1 class="text-center">Loading</h1>
    </section>
  </section>
</template>

<script>
import api from "@/services/Api.js";

export default {
  name: "Kalendarium",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      movies: null,
      sessions: null,
      theatres: null,
      errorFromMongo: false,
      clickedMovieSession: null,
      articlesShown: 5
    };
    
  },
  mounted() {
    this.errorFromMongo = false;
    this.getMovies();
    this.getSessions();
    this.getTheatres();
  },
  computed: {
    url: function(){
      return api.url
    }
  },
  methods: {
    //movies data
    loadMore(){console.log(this.articlesShown);
    
      this.articlesShown +=5;
      
      
      
    },
    async getMovies() {
      this.movies = null;
      try {
        const response = await api.getMovies();

        this.movies = response.data.movies;
      } catch (error) {}
      if (this.movies === null) this.errorFromMongo = true;
    },
    goToBooking(session){
      const sessionAndMovieID = {
        movieID: session.movieID,
        sessionID: session._id,
        redirect: true
      }
      if(!this.$store.getters.isUserSignedIn){
         this.$store.commit('toggleLoggaInWindow');
         this.$store.commit('setRoute', sessionAndMovieID)
      }else{
        this.$router.push('/BokningSida?movieID='+session.movieID+'&sessionID='+session._id);
      }
    },
    //moviesessions data
    async getSessions() {
      this.sessions = null;
      try {
        const response = await api.getMovieSessions();
        this.sessions = response.data.movie_sessions;
      } catch (error) {}
      if (this.sessions === null) this.errorFromMongo = true;
    },
    //movietheatres data
    async getTheatres() {
      // Sätt theatre till null för att testa om lyckas hämtning
      this.theatres = null;
      // Hämta salong om det finns ID

      try {
        const response = await api.getTheatres();
        this.theatres = response.data.movie_theatres;
      } catch (error) {}
      if (this.theatres === null) this.errorFromMongo = true;
    },
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
    }

  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.loading-logo {
  color: white;
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

.showMore{
  width: 60vw;
  text-align: center;
}
.showMoreButton{
  display: flex;
  justify-content: center;
  margin: 0 0vw 3vh 0vw;
}

.main{
  margin-top: 1rem;
  margin-left: 20vw;
  margin-right: 20vw;
  background-color: rgba(2, 2, 2, 0.4);
  color: white;
}
.flexbox {
  display: flex;
}
.flex-col {
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
}
.wrapping{
    margin-left: 1rem;
}
.jumbo {
  text-align: center;
  margin-bottom: 1rem;
}
hr {
  border-color: rgb(124, 123, 123);
}
.posterpic {
  width: 15vmin;
  box-shadow: 2px 2px 5px black;
  margin-top: 1rem;
  margin-bottom: 1rem;
}
.images {
  margin: 0;
}
.text {
  margin-left: 1rem;
}
h4,
h1 {
  font-weight: bold;
}
p {
  font-size: 1rem;
}
span {
  font-weight: 500;
}
.secound-button {
  margin-left: 1rem;
}
.desk-only{
  margin-left: 0.5rem;
  margin-right: 0.5rem;
}

@media screen and (min-width: 501px) and (max-width: 800px) {
  .main{
    margin-left: 10vw;
    margin-right: 10vw;
  }
  .showMore{
    width: 80vw;
  }

}

@media screen and (max-width: 500px) {
  .showMore{
    width: 100vw;
  }
  .main{
    margin: 0;
  }
  .desk-only{
    display: none;
  }
  .col-mob{
    flex-direction: column;
  }
  h1 {
    font-size: 2rem;
  }
  .flex-mobil {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
  }
  .wrapping {
    justify-content: center;
    align-content: center;
    text-align: center;
  }
  .buttons {
    justify-content: center;
  }
  .posterpic {
    width: 40vmin;
    box-shadow: 2px 2px 5px black;
  }
  h4{
      margin-top: 0.5rem;
  }
  .text{
    margin: 0;
  }
}
</style>
