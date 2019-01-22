
<template>
  <div @click="seatClicked" class="movie-seat" v-bind:id="myId" v-bind:class="{ isBooked: seatBooked}"></div>
</template>

<script>
import api from "@/services/Api.js";

export default {
  name: "MovieSeat",
  props:['myId','seatBooked'],
  data() {
    return{

    }
  },
  methods: {
    seatClicked(e){
      console.log(e.target.id);
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
     .myBooking {
    background-color: yellow !important;
  }

  .movieSeat:hover {
    background-color: yellow !important;
  }

  .isBooked {
    background-color: red !important;
    
  } 
  .isBooked:hover {
    background-color: red !important;
    
  } 

    @media screen and (max-width: 1024px){
    .movie-seat {
    width: 3vw;
    height: 3vw;
    }
    }
     @media screen and (max-width: 770px){
    .movie-seat {
    width: 5vw;
    height: 5vw;
    }
     }
      @media screen and (max-width: 570px){
    .movie-seat {
    width: 5vw;
    height: 5vw;
    }
      }
</style>
