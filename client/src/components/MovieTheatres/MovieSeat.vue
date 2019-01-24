
<template>
  <div
    @mouseenter="hoverOverSeats"
    @mouseout="hoverOverSeats"
    @click="hoverOverSeats"
    class="movie-seat"
    v-bind:id="myId"
    v-bind:ref="myId"
    v-bind:class="{ isBooked: seatBooked, myBooking: choosenSeat, movieSeat: moreSeats, active: hover, clickedSeat: seatIsClicked}"
  ></div>
</template>

<script>
import api from "@/services/Api.js";

export default {
  name: "MovieSeat",
  props: ["myId", "seatBooked", "moreSeats", "btnPressed", "leavingSeat", "seatsToHover", "markSeatsClicked"],
  data() {
    return {
      choosenSeat: false,
      hover: false,
      leavingHover: false,
      previousHover: [],
      seatIsClicked: false,
    };
  },
  methods: {
    hoverOverSeats(e){
      this.$emit('hoverOverSeat',e);
    },
  },
  watch: {
    btnPressed: function() {
      this.seatIsClicked = false;
    },
    seatsToHover: function() {
          this.hover = false;
      if(this.seatsToHover.includes(this.myId)  && !this.seatIsClicked){
          this.hover = true;
      }
    },
    leavingSeat: function() {
      if(this.seatsToHover.includes(this.myId)){
          this.hover = false;
          console.log("leaving seat")
      }
    },

    markSeatsClicked: function() {
      if(this.seatsToHover.includes(this.myId) && !this.seatIsClicked){
          this.seatIsClicked = true;
          this.hover = false;
          console.log("clicked seat")
      }else if(this.seatsToHover.includes(this.myId) && this.seatIsClicked){
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
  margin: 4px;
}

.active{
  background-color: yellow;
}

.clickedSeat {
  background-color: blue;
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
