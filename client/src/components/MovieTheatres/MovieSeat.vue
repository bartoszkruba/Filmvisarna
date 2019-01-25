<template>
  <div
    @mouseover="hoverOverSeats"
    @mouseleave="hoverOverSeats"
    @click="hoverOverSeats"
    class="movie-seat"
    v-bind:id="myId"
    v-bind:class="{isBooked: seatBooked, active: hover, clickedSeat: seatIsClicked}"
  ></div>
</template>

<script>
import api from "@/services/Api.js";

export default {
  name: "MovieSeat",
  props: ["myId", "seatBooked", "btnPressed", "leavingSeat", "seatsToHover", "markSeatsClicked","seperateSeats","clickedSeats"],
  data() {
    return {
      hover: false,
      seatIsClicked: false,
    };
  },
  methods: {
    //When hovering/leaving/clicking a seat, call parent method hoverOverSeats
    hoverOverSeats(e){
      this.$emit('hoverOverSeat',e);
    },
  },
  
  watch: {

    //When +/- is clicked in BokningSida.vue
    //Reset the clicked seats
    btnPressed: function() {
      this.seatIsClicked = false;
    },
    seperateSeats: function(){
      this.seatIsClicked = false;
    },
    //Runs when parent calls a seat to show as hovered
    seatsToHover: function() {
          this.hover = false;
      //Check if THIS seat is included in the seatsToHover array and that is not clicked
      //Set to display hover
      if(this.seatsToHover.includes(this.myId)  && !this.seatIsClicked){
          this.hover = true;
      }
    },
    //When leaving the seat
    leavingSeat: function() {
      //Check so THIS seat was one of the ones who displayed hover before, and remove the hover
      if(this.seatsToHover.includes(this.myId)){
          this.hover = false;
      }
    },

    //When seat is clicked
    markSeatsClicked: function() {
      //Check if THIS seat is included in the seatsToHover array and that is not clicked
      //Then mark it as clicked and remove the hover effect
      if(this.clickedSeats.includes(this.myId) && !this.seatIsClicked){
          this.seatIsClicked = true;
          this.hover = false;
      }
      //Check if THIS seat is included in the seatsToHover array and that is clicked
      //Then remove the click effect and set it to show hover
      else if(this.seatsToHover.includes(this.myId) && this.seatIsClicked){
        this.seatIsClicked = false;
      }
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
  margin: 2px;
}

.active{
  background-color: yellow;
}

.clickedSeat {
  background-color: blue;
}

.isBooked {
  background-color: red !important;
}

@media screen and (max-width: 1024px) {
  .movie-seat {
    width: 3vw;
    height: 3vw;
  }
}
@media screen and (max-width: 770px) {
  .movie-seat {
    width: 5vw;
    height: 5vw;
  }
}
@media screen and (max-width: 570px) {
  .movie-seat {
    width: 6vw;
    height: 6vw;
  }
}
</style>
