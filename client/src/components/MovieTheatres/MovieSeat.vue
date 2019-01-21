
<template>
  <div class="movie-seat"></div>
</template>

<script>
import api from "@/services/Api.js";

export default {
  name: "MovieSeat",
  data() {
    return{

    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .movie-seat {
    width: 2vw;
    height: 2vw;
    background-color: gray;
    border-radius: 0 0 20% 20%;
    display: inline-block;
    margin: 1px;
    }

    @media screen and (max-width: 1000px){
    .movie-seat {
    width: 3vw;
    height: 3vw;
    }
    }
     @media screen and (max-width: 770px){
    .movie-seat {
    width: 4vw;
    height: 4vw;
    }
     }
      @media screen and (max-width: 570px){
    .movie-seat {
    width: 5vw;
    height: 5vw;
    }
      }
</style>
