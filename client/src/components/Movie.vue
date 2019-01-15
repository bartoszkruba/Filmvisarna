<<<<<<< current
<!-- INTE KOPPLAD MOT DATABAS -->

<template>
  <b-jumbotron bg-variant="white">

    <!-- Title -->
    <template slot="header">
      {{aStaticMovie.title}}
    </template>
    <!-- description -->
    <template slot="lead">
        <span v-html="aStaticMovie.description"></span>
    </template>
    <b-btn variant="primary" href="#">Boka platser</b-btn>


    <hr class="my-4">
    <section class="trailer-view">
      <section class="trailer-video">
        <iframe width="560" height="315" src="https://www.youtube.com/embed/Z9AYPxH5NTM" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </section>
      <section class="trailer-text">
        <ul>
          <li>Genre: {{aStaticMovie.genre}}</li>
          <li>Längd: {{parseInt(aStaticMovie.length/60)}} timmar {{parseInt(aStaticMovie.length%60)}} minuter</li>
          <li>År: {{aStaticMovie.productionYear}}</li>
          <li>Land:<span v-for="c in aStaticMovie.productionCountries"> {{c}}</span></li>
          <li>Språk: {{aStaticMovie.language}}</li>
          <li>Undertexter: {{aStaticMovie.subtitles}}</li>
          <li>Regisör: {{aStaticMovie.director}}</li>
          <li>Utgivare: {{aStaticMovie.distributor}}</li>
        </ul>
      </section>
      <section class="trailer-text">
        <ul>
          <li>Skådespelare:</li>
          <li v-for="actor in aStaticMovie.actors">{{actor}}</li>
        </ul>
      </section>
    </section>
    <hr class="my-4">


  </b-jumbotron>
</template>

<script>
import api from "@/services/Api.js";

export default {
  name: "HelloWorld",
  data() {
    return {
      aStaticMovie: {
        "title": "Call me by your name",
        "productionCountries": [
          "Italien",
          "USA"
        ],
        "productionYear": 2017,
        "length": 132,
        "genre": "Drama",
        "distributor": "UIP",
        "language": "engelska",
        "subtitles": "svenska",
        "director": "Luca Guadagnino",
        "actors": [
          "Armie Hammer",
          "Timothée Chalamet",
          "Michael Stuhlbarg"
        ],
        "description": "<p>Filmen utspelas i norra Italien sommaren 1983. En ung amerikansk-italienare blir förälskad i en amerikansk student som kommer för att studera och bo hos hans familj.</p><p>Tillsammans upplever de en oförglömlig sommar - full av musik, mat och kärlek - som för evigt kommer att förändra dem.</p>",
        "images": [
           "https://i.pinimg.com/originals/eb/27/e6/eb27e6462a18f5c3bc82f5cf6a0b351c.jpg",
           "https://i.pinimg.com/originals/eb/27/e6/eb27e6462a18f5c3bc82f5cf6a0b351c.jpg"
        ],
        "youtubeTrailers": [
          "Z9AYPxH5NTM"
        ],
        "reviews": [
          {
            "source": "Sydsvenskan",
            "quote": "ett drama berättat med stor ömhet",
            "stars": 4,
            "max": 5
          },
          {
            "source": "Svenska Dagbladet",
            "quote": "en film att förälska sig i",
            "stars": 5,
            "max": 5
          },
          {
            "source": "DN",
            "quote": "en het romans i åttiotalskostym",
            "stars": 4,
            "max": 5
          }
        ]
      }
    };
  },
  methods: {
    async getMovie() {
      const response = await api.getMovies();
      this.movies = response.data.movies;
    }
  },
  computed: {
    randomReview: function(){
      var random = parseInt(Math.random() * this.aStaticMovie.reviews.length);
      console.log(random);
      var ranReview = this.aStaticMovie.reviews[random];


      let text = `
      <h5>${ranReview.source}</h5>
      <p class="reviewQuote">${ranReview.quote}</p>
      `;
      return text;
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

</style>
=======
<!-- INTE KOPPLAD MOT DATABAS -->

<template>
  <div class="Movie">

    <section v-if="aMovie === null">
      <p>Något blev galet!</p>
      <p>Det finns ingen film med det ID du angav </p>
      <p>Länk tillbaka till MoviesPage</p>
    </section>

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
  </div>
</template>

<script>
import api from "@/services/Api.js";

export default {
  name: "Movie",
  data() {
    return {
      aMovie: null,
      movieID: null
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
    async getMovieByID(id = this.movieID) {
      const response = await api.getMovieByID(id);
      this.aMovie = response.data.movie;
    },

  },
  created: function() {
    this.getMovieByID();
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
>>>>>>> before discard
