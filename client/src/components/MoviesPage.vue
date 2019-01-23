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
    <section v-if="errorFromMongo" class="text-center mt-3 nagotFel">
      <h1>Något blev fel!</h1>
      <p>Vi hittade ingen film med det ID som angavs. Det kan bero på något av följande</p>
      <ul>
        <li>Antipiratbyrån har hackat oss</li>
        <li>Vår hemsida har tekniskt strul</li>
        <li>Du har klickat på en gammal länk</li>
      </ul>
      <router-link
        class="router-link"
        to="/"
        exact-active-class="menu-item-active"
      >Klicka här för att komma till start sidan</router-link>
    </section>

    <section v-if="movies">
      <h1 class="text-center mt-3" v-if="movies && movies.length === 0">Inga Sökträffar :(</h1>
      
      <section class="main">
      <div v-for="m in movies">
        <div class="flexbox main-placing">
          <div class="flex-mobil">
            <figure class="images">
              <router-link
                class="router-link"
                :to="'/film?movieID='+m._id"
                exact-active-class="menu-item-active"
              >
                <img :src="url + m.imagesLinks.poster" class="posterpic">
              </router-link>
            </figure>

            <div class="movietext">
              <div class="flex-col">
                <router-link
                  class="router-link"
                  :to="'/film?movieID='+m._id"
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
                <router-link
                    class="router-link"
                    :to="'/film?movieID='+m._id"
                    exact-active-class="menu-item-active"
                  >
                    <b-button class="info-btn">Läs mer</b-button>
                  </router-link>
              </div>
            </div>
          </div>
        </div>
        <hr>
      </div>
      </section>
      <div class="mt-5 loading-logo" v-if="movies === null">
        <h1 class="text-center spinner">
          <font-awesome-icon icon="spinner"/>
        </h1>
        <h1 class="text-center">Loading</h1>
      </div>
    </section>
  </section>
</template>

<script>
import api from "@/services/Api.js";

export default {
  name: "MoviesPage",
  data() {
    return {
      movies: undefined,
      urlQuery: {},
      errorFromMongo: false
    };
  },
  mounted() {
    this.errorFromMongo = false;
    this.getUrlQuery();
    this.getMovies();
  },
  computed: {
    url:function() {
        return api.url;
    }
  },
  methods: {
    async getMovies() {
      this.movies = null;

      try {
        if (this.urlQuery.searchQuery) {
          const response = await api.searchMovies(
            this.urlQuery.searchQuery.split('_').join(' ')
          );
          this.movies = response.data.movies;
          if (this.movies.length === 1) {
            this.$router.push(`/film?movieID=${this.movies[0]._id}`);
          }
        } else {
          const response = await api.getMovies();
          this.movies = response.data.movies;
        }
      } catch (error) {}

      if (this.movies === null) this.errorFromMongo = true;
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
    }
  },
  watch: {
    $route: function() {
      this.errorFromMongo = false;
      this.getUrlQuery();
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

.nagotFel  {
  color: white;
}
.nagotFel h1{
  font-weight: bold;
}
.nagotFel p{
  padding: 0;
}

.main{
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
}
.flex-mobil {
  display: flex;
}
.main-placing {
  margin: 1rem;
}
p {
  font-size: 1rem;
  padding: 0.5rem;
  padding-left: 1rem;
}
h2 {
  margin-left: 1rem;
  margin-bottom: 0;
  color: black;
  font-weight: bold;
  font-size: 2.5rem;
  color: white;
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
  margin-top: 1rem;
  margin-bottom: 1rem;
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
.info-btn{
  margin-left: 1rem;
  margin-top: 1rem;
}
@media screen and (min-width: 501px) and (max-width: 800px) {
  .main{
    margin-left: 10vw;
    margin-right: 10vw;
  }
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
  .nagotFel{
    margin-bottom: 30vh;
  }
  .nagotFel p{
    font-size: 1rem;
    line-height: 1rem;
  }
  .main{
   margin: 0;
  }
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
  .info-btn{
    display: none;
  }
}
</style>