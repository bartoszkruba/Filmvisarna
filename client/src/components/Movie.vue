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
