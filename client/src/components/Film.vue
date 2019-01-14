<template>
  <div class="Film">
    <section>
      <h1>
        {{aStaticMovie.title}}
      </h1>
    </section>
  </div>
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
           "call-me-poster1.jpg",
           "call-me-poster2.jpg"
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
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
