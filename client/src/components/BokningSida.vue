<template>
  <main>
    <section v-if="errorFromMongo">
      <h1>Något blev fel!</h1>
      <p>Vi hittade ingen film med det ID som angavs. Det kan bero på något av följande</p>
      <ul>
        <li>Antipiratbyrån har hackat oss</li>
        <li>Vår hemsida har tekniskt strul</li>
        <li>Du har klickat på en gammal länk</li>
      </ul>
      <router-link
        class="router-link"
        to="/filmSida"
        exact-active-class="menu-item-active"
      >Klicka här för att komma till alla filmer</router-link>
    </section>

    <section v-if="movie && session && theatre">
      <div>
        <img :src="require('../assets/'+this.movie.images[0])" class="img">
        <div class="papillon">
          <h1 class="title">{{movie.title}}</h1>

          <div class="antal-bilijetter"></div>
        </div>
      </div>

      <div class="text">
        <div class="location">
          <h4>Salong: {{this.theatre.name}}</h4>
          <h4>|</h4>
          <h4>Tid: {{this.session.date.day+'/'+this.session.date.month+' '+this.session.date.year +' '+ this.session.date.time}}</h4>
        </div>
        <b-dropdown id="ddown-buttons" text="Ändra visningsdatum: " variant="danger" class="m-2">
          <b-dropdown-item-button
            v-on:click="changeSession"
            v-for="session in sessions"
            :value="session._id"
            :key="session._id"
          >{{getWeekdayString(session.date.year,session.date.month,session.date.day).slice(0,-3)}} {{session.date.day + '/' + session.date.month + ' ' + session.date.year + ' ' + session.date.time }}</b-dropdown-item-button>
        </b-dropdown>

        <h4>Antal biljetter:</h4>
        <p>
          <strong>Ordinarie</strong>
        </p>
        <div class="antal">
          <button
            v-on:click="minus"
            type="button"
            class="btn btn-dark"
            :disabled="this.antal === 0"
          >-</button>
          <h5 class="hej">{{antal}} st / {{pris}}kr per st</h5>
          <button
            v-on:click="plus"
            type="button"
            class="btn btn-dark"
            :disabled="this.ledigaPlatserISal === 0"
          >+</button>
        </div>
        <p>
          <strong>Pensionär</strong>
        </p>
        <div class="antal">
          <button
            v-on:click="minusPensionar"
            type="button"
            class="btn btn-dark"
            :disabled="this.antalPensionar === 0"
          >-</button>
          <h5 class="hej">{{antalPensionar}} st / {{prisPensionar}}kr per st</h5>
          <button
            v-on:click="plusPensionar"
            type="button"
            class="btn btn-dark"
            :disabled="this.ledigaPlatserISal === 0"
          >+</button>
        </div>

        <div v-if="movie.ageLimit<15">
          <p class="barn">
            <strong>Barn</strong>
          </p>
          <div class="antal">
            <button
              v-on:click="minusBarn"
              type="button"
              class="btn btn-dark"
              :disabled="this.antalBarn === 0"
            >-</button>
            <h5 class="hej">{{antalBarn}} st / {{prisBarn}}kr per st</h5>
            <button
              v-on:click="plusBarn"
              type="button"
              class="btn btn-dark"
              :disabled="this.ledigaPlatserISal === 0"
            >+</button>
          </div>
        </div>
        <p class="ledigaPlatser">
          <em>
            <strong>OBS!</strong>
            Lediga platser: {{this.ledigaPlatserISal}} av {{this.theatre.seats}}
          </em>
        </p>
        <section class="movieTheatre mt-5">
          <MovieSaloon
            :theatreID="theatreID"
            :sessionID="this.urlQuery.sessionID"
            :mySeats="totalSeats"
            @checkAllSeatsChoosen="checkAllSeatsChoosen"
          ></MovieSaloon>
        </section>
        <div class="kostnad" v-if="totalt>=65">
          <h3>Kostnad</h3>
          <p class="totalt">totalt: {{totalt}}kr</p>
        </div>
        <div class="slutför btn">
          <b-btn v-on:click="visaFelMedellande" v-b-modal.modal1>Slutför bokning</b-btn>
          <p class="felMedellande" v-if="visaMedellande">Du måste välja minst en biljett</p>
        </div>
        <!-- Modal Component -->

        <b-modal id="modal1" v-if="totalt>=65 && this.allSeatsSelected" title="Bekräftelse" @ok="goHem" ok-only>
          <p>Film:
            <strong>{{movie.title}}</strong>
          </p>
          <p>Datum:
            <strong>{{this.session.date.day+'/'+this.session.date.month+' '+this.session.date.year }}</strong>
          </p>
          <p>Tid:
            <strong>{{this.session.date.time}}</strong>
          </p>
          <p>Salong:
            <strong>{{this.theatre.name}}</strong>
          </p>

          <div class="Biljetter">
            <p>Biljetter:</p>
            <div class="vilkaBiljetter">
              <p v-if="antal>0">
                <strong>{{antal}} Ordinarie</strong>
              </p>
              <p v-if="antalPensionar>0">
                <strong>{{antalPensionar}} Pensionär</strong>
              </p>
              <p v-if="antalBarn>0">
                <strong>{{antalBarn}} Barn</strong>
              </p>
            </div>
          </div>
          <p>Att betala:
            <strong>{{totalt}}kr</strong>
          </p>
          <p class="my-4">Din bokningsnummer:
            <strong>{{bokningsnummer}}</strong>
          </p>
          <p class="my-4">
            <strong>OBS!</strong>Du kan hämta ut dina biljetter senast 40min innan filmen börjar
          </p>
          <p>betalningen sker vid kassan i biografen</p>
        </b-modal>
      </div>
    </section>
    <section v-else>
      <h1 class="text-center spinner">
        <font-awesome-icon icon="spinner"/>
      </h1>
      <h1 class="text-center">Loading</h1>
    </section>
  </main>
</template>

<script>
let pris = 85;
let antal = 0;
let antalPensionar = 0;
let prisPensionar = 75;
let antalBarn = 0;
let prisBarn = 65;
let totalt = 0;

import api from "@/services/Api.js";
import MovieSaloon from "@/components/MovieTheatres/MovieSaloon";
export default {
  name: "BokningSida",
  data() {
    return {
      antal: null,
      antalPensionar: null,
      prisPensionar: null,
      antalBarn: null,
      prisBarn: null,
      pris: null,
      movie: undefined,
      ledigaPlatserISal: null,
      session: null,
      sessions: null,
      theatre: null,
      bokningsnummer: null,
      totalt: null,
      visaMedellande: false,
      movieID: null,
      sessionID: null,
      theatreID: null,
      errorFromMongo: false,
      urlQuery: {},
      allSeatsSelected: false,
      choosenSeats: []
    };
  },
  components: {
    MovieSaloon
  },
  mounted: function() {
    this.errorFromMongo = false;
    this.getUrlQuery();
    this.getMovieByID();
    this.getSessions();
    if (!this.$store.getters.isUserSignedIn) {
      this.$router.push("/filmSida");
    }
  },
  watch: {
    $route: function() {
      this.errorFromMongo = false;
      this.getUrlQuery();
      this.getMovieByID();
      this.getSessions();
    }
  },

  computed: {
    createTicket: function() {
      let ticket = {
        sessionID: this.urlQuery.sessionID,
        children: this.antalBarn,
        pensioner: this.antalPensionar,
        adults: this.antal,
        placeNumbers: this.choosenSeats
      };
      return ticket;
    },
    totalSeats: function() {
      return this.antalBarn + this.antalPensionar + this.antal;
    }
  },
  created() {
    this.pris = 85;
    this.prisPensionar = 75;
    this.prisBarn = 65;
    this.antalPensionar = 0;
    this.antalBarn = 0;
    this.antal = 0;
    this.totalt = 0;
  },
  methods: {
    getWeekdayString(y, m, d) {
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
          output = "Ingen dag alls";
      }
      return output;
    },
    changeSession(e) {
      this.$router.push(
        `/BokningSida?movieID=${this.urlQuery.movieID}&sessionID=${
          e.target.value
        }`
      );
    },
    getUrlQuery() {
      this.urlQuery = {};
      let url = window.location.href;
      url = url.substr(url.lastIndexOf("#"));
      let searchIndex = url.indexOf("?") + 1;
      let output = {};

      if (searchIndex > 0) {
        url = url.substr(searchIndex).split("&");
        for (let i = 0; i < url.length; i++) {
          url[i] = url[i].split("=");
          if (url[i][1].length > 0) this.urlQuery[url[i][0]] = url[i][1];
        }
      }
    },
    async getMovieByID() {
      this.movie = null;
      if (this.urlQuery.movieID) {
        try {
          const response = await api.getMovies({
            _id: this.urlQuery.movieID
          });
          this.movie = response.data.movies[0];
        } catch (error) {}
      }
      if (this.movie === null) this.errorFromMongo = true;
    },
    async getSessions() {
      this.sessions = null;
      if (this.urlQuery.movieID) {
        try {
          const response = await api.getMovieSessions({
            movieID: this.urlQuery.movieID
          });
          this.sessions = response.data.movie_sessions;
        } catch (error) {}
      }

      if (this.sessions === null) this.errorFromMongo = true;
      else this.getSessionByID();
    },
    async getSessionByID() {
      this.session = null;

      if (this.urlQuery.sessionID) {
        this.session = this.sessions.find(curr => {
          return curr._id === this.urlQuery.sessionID;
        });
        this.ledigaPlatserISal = this.session.freePlaces;
        this.theatreID = this.session.movieTheatreID;
      }
      if (!this.session) this.errorFromMongo = true;
      else this.getTheatreByID();
    },
    async getTheatreByID() {
      // Sätt theatre till null för att testa om lyckas hämtning
      this.theatre = null;
      // Hämta salong om det finns ID
      if (this.theatreID !== null) {
        try {
          const response = await api.getTheatres({
            _id: this.theatreID
          });
          if (response.data.movie_theatres.length)
            this.theatre = response.data.movie_theatres[0];
        } catch (error) {}
      }
      if (this.theatre === null) this.errorFromMongo = true;
    },
    goHem() {
      this.$router.push("/");
    },
    plus() {
      this.antal += 1;
      this.totalt += 85;
      this.visaTotal = true;
      this.visaMedellande = false;
      this.ledigaPlatserISal--;
    },
    minus() {
      if (this.antal > 0) {
        this.totalt -= 85;
        this.antal -= 1;
        this.ledigaPlatserISal++;
      } else {
        alert("Du kan inte välja mindre än en biljett ");
      }
    },
    plusPensionar() {
      this.totalt += 75;
      this.antalPensionar += 1;
      this.visaTotal = true;
      this.visaMedellande = false;
      this.ledigaPlatserISal--;
    },
    minusPensionar() {
      if (this.antalPensionar > 0) {
        this.totalt -= 75;
        this.antalPensionar -= 1;
        this.ledigaPlatserISal++;
      } else {
        alert("Du kan inte välja mindre än en biljett ");
      }
    },
    plusBarn() {
      this.totalt += 65;
      this.antalBarn += 1;
      this.visaTotal = true;
      this.visaMedellande = false;
      this.ledigaPlatserISal--;
    },
    minusBarn() {
      if (this.antalBarn > 0) {
        this.antalBarn -= 1;
        this.totalt -= 65;
        this.ledigaPlatserISal++;
      } else {
        alert("Du kan inte välja mindre än en biljett ");
      }
    },

    checkAllSeatsChoosen(moreSeats, choosenSeats){
      this.allSeatsSelected = !moreSeats;
      this.choosenSeats = choosenSeats;
      console.log("Bokningen har " + choosenSeats.length);
    },

    visaFelMedellande() {
      if (this.totalt == 0) {
        this.visaMedellande = true;
      } else {
        if (this.allSeatsSelected) {
          this.bokaFilm();
        }else{
          console.log("Du måste boka platser för så många biljetter du valt")
        }
      }
    },

    async bokaFilm() {
      const response = await api.setTickets(
        this.createTicket,
        this.$store.getters.getCredentials
      );
      this.bokningsnummer = response.data.orderID;
      this.$store.commit("updateTickets", response.data.bookedTickets);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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

.spinner {
  -webkit-animation: spin 3s infinite linear;
}

@-webkit-keyframes spin {
  0% {
    -webkit-transform: rotate(0deg);
  }

  100% {
    -webkit-transform: rotate(360deg);
  }
}

main{
  background-color: white;
}
.textBekraftelse{
  width: 20vw;
}
.mainBekraftelse{
  display: flex;
}
.img2{
  width: 90%;
  box-shadow: 2px 2px 20px black;
}

.modal-body p {
  margin: 0.8rem;
  text-align: start;
}

.Biljetter {
  display: flex;
}

.vilkaBiljetter p {
  margin: 0.3rem;
}

div .location {
  margin: 5vh 0;
  display: flex;
  justify-content: space-around;
  width: 45vw;
}

.ledigaPlatser {
  margin-top: 6vh;
}

.kostnad {
  display: flex;
  width: 40vw;
  justify-content: space-between;
  margin-top: 10vh;
  padding-top: 2vh;
  border-top: 0.0625rem solid rgba(94, 94, 94, 0.411);
}

.antal-bilijetter {
  display: flex;
  justify-content: center;
  margin: 3vh 0;
}

.bokning {
  margin: 3vh;
}

h4,
h5,
p,
h1 {
  margin-top: 5vh;
}

.totalt {
  margin-top: 0.5vh;
}

.title {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 2.55rem;
  margin-top: 5vh;
  color: white;
  text-shadow: -3px 3px 10px black, -3px 3px 10px black, -3px 3px 10px black,
    3px -3px 10px black;
  font-weight: bold;
  font-style: oblique;
}

h4 {
  margin: 0;
}

.barn {
  text-align: center;
}

title {
  position: relative;
  margin-top: -17vh;
  display: block;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

img {
  width: 100%;
  box-shadow: 2px 2px 80px black;
}

.antal {
  margin: 0;
  display: flex;
  justify-content: space-around;
}

.slutför {
  margin: 6vh auto;
}

.text {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 3vh;
}

.hej {
  margin: 0 2vw;
}

div .hej {
  margin-top: 1vh;
  margin-bottom: 1vh;
}

.felMedellande {
  font-size: 0.8rem;
  color: red;
  margin-top: 1vh;
  margin-bottom: 0;
}

div .vilkaBiljetter {
  margin-top: 1vh;
}

@media screen and (max-width: 416px) {

  title {
    margin-top: -10vh;
  }
  .textBekraftelse{
    width: 90vw;
  } 
  .mainBekraftelse{
  display: flex;
  flex-direction: column;
  }

  .title {
    font-size: 5vw;
  }

  div .location h4 {
    font-size: 4vw;
  }

  div .location {
    width: 90vw;
  }

  div .text {
    margin-top: -3vh;
  }

  .ledigaPlatser em {
    font-size: 4vw;
  }

  .kostnad {
    width: 90vw;
  }

  .kostnad h3 {
    font-size: 6.5vw;
  }
}
</style>
