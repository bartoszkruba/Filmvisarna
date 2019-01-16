<template>
  <div class="main">
    <!--{{movies[0].title}}
    {{movies[1].description}}
    {{movies[2].description}}-->
    <div class="box">
      <div>
        <b-container fluid class="p-4 startposter">
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
                <b-button>Boka</b-button>
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
                <b-button>Boka</b-button>
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
                <b-button>Boka</b-button>
              </figure>
            </b-col>
          </b-row>
        </b-container>
      </div>

      <b-carousel
        id="carousel1"
        style="text-shadow: 1px 1px 2px #333;"
        controls
        indicators
        background="#ababab"
        :interval="4000"
        img-width="1980"
        img-height="512"
        v-model="slide"
        @sliding-start="onSlideStart"
        @sliding-end="onSlideEnd"
        class="calusel"
      >
        <b-carousel-slide>
          <img slot="img" class="d-block img-fluid b-carousel-slide" width="5" height="5"
          src=https://is2-ssl.mzstatic.com/image/thumb/Video128/v4/16/f2/c2/16f2c2d3-0390-b491-36b1-7abd29ac6b4f/pr_source.lsr/268x0w.png alt="image slot">
          <ul>
            <h1>{{movies[0].title}}</h1>
            <li>Visnings tid: {{movies[0].length}} min</li>
            <li>Pris: 105kr</li>
            <li>Antal lediga platser: {{empty}}/{{full}}</li>
            <li>Åldersgräns {{movies[0].ageLimit}}år</li>
            <li></li>
          </ul>
          <b-button>Film</b-button>
          <b-button>Boka</b-button>
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
      <b-button>Mer information</b-button>
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
      empty: 83,
      full: 100
    };
  },
  created() {
    this.getMovies();
  },
  methods: {
    onSlideStart(slide) {
      this.sliding = true;
    },
    greet: function(event) {
      // `this` inside methods points to the Vue instance
      alert("Hello " + this.name + "!");
      // `event` is the native DOM event
      if (event) {
        alert(event.target.tagName);
      }
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
  /*width: 50vmin;*/
  width: 100%;
}
imgbox {
}
@media only screen and (max-width: 768px) {
  .b-carousel-slide {
    width: 50%;
  }
  .box {
    min-width: 50vh;
  }
  .calusel {
    display: none;
  }
}
@media only screen and (max-device-width: 480px) {
  .b-carousel-slide {
    width: 100%;
  }
  .box {
    min-width: 50vh;
  }
  .startposter {
    display: none;
  }
  .calusel {
    display: inline;
  }
}
</style>