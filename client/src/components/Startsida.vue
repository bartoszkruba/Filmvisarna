<template>
  <div class="main">
    <!--{{movies[0].title}}
    {{movies[1].description}}
    {{movies[2].description}}-->
    <div class="box">
      <div>
        <b-container fluid class="startposter">
          <b-row>
            <b-col>
              <figure class="imgbox">
                <img class="poster" :src="require('../assets/'+this.movies[0].images[1])">
                <h3>{{movies[0].title}}</h3>
                <router-link
                  class="router-link"
                  :to="'/Movie?'+this.movies[0]._id"
                  exact-active-class="menu-item-active"
                >
                  <b-button>Film</b-button>
                </router-link> 
                <router-link
                  class="router-link"
                  :to="'/BokningSida?'+this.movies[0]._id"
                  exact-active-class="menu-item-active"
                >
                  <b-button>Boka</b-button>
                </router-link> 
              </figure>
            </b-col>
            <b-col>
              <figure class="imgbox">
                <img class="poster" :src="require('../assets/'+this.movies[1].images[1])">
                <h3>{{movies[1].title}}</h3>
                <router-link
                  class="router-link"
                  :to="'/Movie?'+this.movies[1]._id"
                  exact-active-class="menu-item-active"
                >
                  <b-button>Film</b-button>
                </router-link>
                <router-link
                  class="router-link"
                  :to="'/BokningSida?'+this.movies[1]._id"
                  exact-active-class="menu-item-active"
                >
                  <b-button>Boka</b-button>
                </router-link>
              </figure>
            </b-col>
            <b-col>
              <figure class="imgbox">
                <img class="poster" :src="require('../assets/'+this.movies[2].images[1])">
                <h3>{{movies[2].title}}</h3>
                <router-link
                  class="router-link"
                  :to="'/Movie?'+this.movies[2]._id"
                  exact-active-class="menu-item-active"
                >
                  <b-button>Film</b-button>
                </router-link>
                 <router-link
                  class="router-link"
                  :to="'/BokningSida?'+this.movies[2]._id"
                  exact-active-class="menu-item-active"
                >
                  <b-button>Boka</b-button>
                </router-link>
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
          <img slot="img" class="d-block img-fluid b-carousel-slide poster"
           :src="require('../assets/'+this.movies[0].images[1])">
          <ul class="schadow-text">
            <h3>{{movies[0].title}}</h3>
            <li>Visnings tid: {{parseInt(movies[1].length/60)}} timmar och {{movies[1].length%60}} minuter</li>
            <li>Åldersgräns {{movies[0].ageLimit}}år</li>
          </ul>
          <router-link
                  class="router-link"
                  :to="'/Movie?'+this.movies[0]._id"
                  exact-active-class="menu-item-active"
                >
                  <b-button>Film</b-button>
                </router-link> 
           <router-link
                  class="router-link"
                  :to="'/BokningSida?'+this.movies[0]._id"
                  exact-active-class="menu-item-active"
                >
                  <b-button>Boka</b-button>
                </router-link>
        </b-carousel-slide>
        <b-carousel-slide>
          <img slot="img" class="d-block img-fluid b-carousel-slide poster"
           :src="require('../assets/'+this.movies[1].images[1])">
          <ul class="schadow-text">
            <h3>{{movies[1].title}}</h3>
            <li>Visnings tid: {{parseInt(movies[1].length/60)}} timmar och {{movies[1].length%60}} minuter</li>
            <li>Åldersgräns {{movies[1].ageLimit}}år</li>
          </ul>
          <router-link
                  class="router-link"
                  :to="'/Movie?'+this.movies[1]._id"
                  exact-active-class="menu-item-active"
                >
                  <b-button>Film</b-button>
                </router-link> 
           <router-link
                  class="router-link"
                  :to="'/BokningSida?'+this.movies[1]._id"
                  exact-active-class="menu-item-active"
                >
                  <b-button>Boka</b-button>
                </router-link>
        </b-carousel-slide>
        <b-carousel-slide>
          <img slot="img" class="d-block img-fluid b-carousel-slide poster"
           :src="require('../assets/'+this.movies[2].images[1])">
          <ul class="schadow-text">
            <h3>{{movies[2].title}}</h3>
            <li>Visnings tid: {{parseInt(movies[2].length/60)}} timmar och {{movies[2].length%60}} minuter</li>
            <li>Åldersgräns {{movies[2].ageLimit}}år</li>
          </ul>
          <router-link
                  class="router-link"
                  :to="'/Movie?'+this.movies[2]._id"
                  exact-active-class="menu-item-active"
                >
                  <b-button>Film</b-button>
                </router-link> 
           <router-link
                  class="router-link"
                  :to="'/BokningSida?'+this.movies[2]._id"
                  exact-active-class="menu-item-active"
                >
                  <b-button>Boka</b-button>
                </router-link>
        </b-carousel-slide>
      </b-carousel>
    </div>

    <b-jumbotron>
      <template slot="header">Senaste nytt</template>
      <h1>Vi har nu Öppnat Välkomna</h1>
      <h2>På plats säljer vi</h2>
      <ul>
        <li>Popcorn</li>
        <li>Läsk</li>
        <li>Chips</li>
        <li>Godis</li>
        <li>mm</li>
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
    };
  },
  created() {
    this.getMovies();
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
      console.log(this.movies);
    }
  }
};
</script>
<style scoped>
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
.calusel {
  display: none;
}
.box {
  min-width: 50vh;
}
.poster {
  height: auto;
  width: 20vw;
}
.imgbox{
  text-align: center;
}
.flex-row{
  display: flex;
  flex-direction: row;
}
.startposter{
  padding-top: 2vh;
}
@media only screen and (max-device-width: 580px) {
  .b-carousel-slide {
    width: 100%;  
  }
  .schadow-text{
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
  .poster{
    height: 90vmax;
    width: 100vmin;
  }
}
</style>