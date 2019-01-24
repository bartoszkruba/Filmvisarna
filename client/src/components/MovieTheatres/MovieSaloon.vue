
<template>
  <section class="movie-saloon">
    <section class="instruktions">
      <h5>
        <span v-if="mySeats > 0">Välj {{mySeats}} Platser</span>
        <span v-else>Välj antal biljetter du vill boka</span>
      </h5>
      <p v-if="mySeats > 0">Välj platser genom att klicka på stolarna i salongen</p>
    </section>
    <section class="screen">Bioduk</section>
    <section class="seats mt-5">
      <template v-for="(rows,index) in seatsPerRow">
        <section class="rows" v-bind:id="rows">
          <template v-for="(seat, index2) in seatsPerRow[index]">
            <MovieSeat
              @hoverOverSeat="hoverOverSeat"
              :myId="freePlaces[(count(index)+index2)].seatNumber"
              :seatBooked="freePlaces[(count(index)+index2)].booked"
              :moreSeats="moreSeats"
              :btnPressed="btnPressed"
              :seatsToHover="seatsToHover"
              :markSeatsClicked="markSeatsClicked"
            ></MovieSeat>
          </template>
        </section>
      </template>
    </section>
    <section class="mt-3">
      <font-awesome-icon style="color: blue" class="mr-1 ml-2" icon="square"/>Vald plats
      <font-awesome-icon style="color: red" class="mr-1 ml-2" icon="square"/>Upptagen plats
    </section>
  </section>
</template>

<script>
import api from "@/services/Api.js";
import MovieSeat from "@/components/MovieTheatres/MovieSeat";
export default {
  name: "MovieSaloon",
  props: ["theatreID", "sessionID", "mySeats", "btnPressed"],
  data() {
    return {
      seatsPerRow: null,
      totalSeats: null,
      freePlaces: null,
      choosenSeats: [],
      leavingSeat: false,
      seatsToHover: [],
      markSeatsClicked: false,
      clickedSeats: []
    };
  },
  components: {
    MovieSeat
  },
  mounted: async function() {
    const response = await api.getTheatres({ _id: this.theatreID });
    const sessionSeats = await api.getMovieSessions({ _id: this.sessionID });
    this.freePlaces = sessionSeats.data.movie_sessions[0].places;
    this.seatsPerRow = response.data.movie_theatres[0].seatsPerRow;
    this.totalSeats = response.data.movie_theatres[0].seats;
    this.coiehf = 0;
  },
  methods: {
    count(n) {
      let output = 0;
      for (let i = 0; i < n; i++) {
        output += this.seatsPerRow[i];
      }
      return output;
    },

    hoverOverSeat(e) { 
      let index = this.freePlaces.findIndex(i => i.seatNumber === e.target.id);
      if (e.type === "mouseover" && this.mySeats > 0 && !this.markSeatsClicked) {
        let tryToHover = [];
        if (this.mySeats > 1 && !this.freePlaces[index].booked) {
          for (let i = index; i < this.mySeats + index; i++) {
            try{
              if(this.freePlaces[i].booked){throw "Platsen är redan bokad"}
              tryToHover.push(this.freePlaces[i].seatNumber);
                let lastIndex = tryToHover[tryToHover.length-1].length === 2 ? tryToHover[tryToHover.length-1].slice(0,-1) : tryToHover[tryToHover.length-1].slice(0,-2);
                let firstIndex = tryToHover[0].length === 2 ? tryToHover[0].slice(0,-1) : tryToHover[0].slice(0,-2)
                if(firstIndex !== lastIndex){throw "Out Of Bounds"}
            }

            catch(e){
              tryToHover = this.goToLeft(index,tryToHover);
            }          
          }
          if(tryToHover !== undefined){
          this.seatsToHover = tryToHover;
          }else{
            this.seatsToHover = [];
          }
        } 
        else if(!this.freePlaces[index].booked){
            tryToHover.push(e.target.id);
            this.seatsToHover = tryToHover;
        }

      } 
      else if(e.type === "mouseleave"){
        this.leavingSeat = !this.leavingSeat;
      }

      else if(e.type === "click"){
        if(this.seatsToHover.length !== 0){
        if(this.clickedSeats.length !== this.mySeats){
          this.markSeatsClicked = true;
          this.clickedSeats = this.seatsToHover;
        }
        else if(this.clickedSeats.includes(e.target.id)){
          this.markSeatsClicked = false;
          this.clickedSeats = [];
        }    
        this.$emit("checkAllSeatsChoosen", this.clickedSeats);
      }
      }
    },

    goToLeft(index, tryToHover){
      tryToHover = [];
      let outOfBounds = false;
       for (let j = index; j > index - this.mySeats; j--) {
            try{
              if(this.freePlaces[j].booked){throw "Platsen är redan bokad"}
              tryToHover.push(this.freePlaces[j].seatNumber);
                let lastIndex = tryToHover[tryToHover.length-1].length === 2 ? tryToHover[tryToHover.length-1].slice(0,-1) : tryToHover[tryToHover.length-1].slice(0,-2);
                let firstIndex = tryToHover[0].length === 2 ? tryToHover[0].slice(0,-1) : tryToHover[0].slice(0,-2)
                if(firstIndex !== lastIndex){throw "Out Of Bounds"}
            }
            catch(e){
              outOfBounds = true;
            }          
          }
          if(!outOfBounds) {return tryToHover}
    }
  },
  computed: {
    moreSeats: function() {
      return this.mySeats > this.choosenSeats.length;
    }
  },

  watch: {
    btnPressed: function() {
      this.markSeatsClicked = false;
      this.clickedSeats = [];
      this.seatsToHover = [];
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.movie-saloon {
  text-align: center;
  height: 100%;
}
.rows {
  justify-content: center;
  display: flex;
  margin-bottom: 1%;
}
.screen {
  text-align: center;
  color: white;
  background-color: gray;
  margin-bottom: 2%;
}
.instruktions {
  text-align: center;
}

.active {
  background-color: orange !important;
}
</style>
