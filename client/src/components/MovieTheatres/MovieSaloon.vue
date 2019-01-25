
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
    <b-form-checkbox id="checkbox1"
                     v-model="seperateSeats"
                     v-if="showSeperateSeatsBtn"
                     >
      Välj seperata platser
    </b-form-checkbox>
    <section class="seats mt-5">
      <template v-for="(rows,index) in seatsPerRow">
        <section class="rows" v-bind:id="rows">
          <template v-for="(seat, index2) in seatsPerRow[index]">
            <MovieSeat
              @hoverOverSeat="hoverOverSeat"
              :myId="freePlaces[count(index,index2)].seatNumber"
              :seatBooked="freePlaces[count(index,index2)].booked"
              :btnPressed="btnPressed"
              :seatsToHover="seatsToHover"
              :markSeatsClicked="markSeatsClicked"
              :seperateSeats="seperateSeats"
              :clickedSeats="clickedSeats"
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
      leavingSeat: false,
      seatsToHover: [],
      markSeatsClicked: false,
      clickedSeats: [],
      seperateSeats: false,
      showSeperateSeatsBtn: true,
      hasBeenCounted: [],
      longestFreeRow: 0,
      currentRow: 0,
      currentLongCount: []
    };
  },
  components: {
    MovieSeat
  },

  //When site is loaded do this
  mounted: async function() {
    const response = await api.getTheatres({ _id: this.theatreID });
    const sessionSeats = await api.getMovieSessions({ _id: this.sessionID });
    this.freePlaces = sessionSeats.data.movie_sessions[0].places;
    this.seatsPerRow = response.data.movie_theatres[0].seatsPerRow;
    this.totalSeats = response.data.movie_theatres[0].seats;
  },

  //Methods
  methods: {

    count(n, n2) {
      let output = 0;
      for (let i = 0; i < n; i++) {
        output += this.seatsPerRow[i];
      }
      output += n2;
      this.countLongest(output, n)
      return output;
    },

    countLongest(id, row){
      if(this.hasBeenCounted.includes(id)){
        return 0;
      } else {
        this.hasBeenCounted.push(id);
      }
      if(row > this.currentRow){
        this.currentRow++;
        if(this.longestFreeRow < this.currentLongCount.length){
          this.longestFreeRow = this.currentLongCount.length;
        }
        this.currentLongCount.length = 0;
      }
      if(!this.freePlaces[id].booked){
        this.currentLongCount.push(id);
      } else {
        if(this.longestFreeRow < this.currentLongCount.length){
          this.longestFreeRow = this.currentLongCount.length;
        }
        this.currentLongCount.length = 0;
      }
    },

    //When hovering/clicking/leaving hover over a seat, do this
    hoverOverSeat(e) {
      //Find the index of the hovered seat in the freePlaces array
      let index = this.freePlaces.findIndex(i => i.seatNumber === e.target.id);
      //if hovering over a seat and choosen tickets is more than 0 and no seat is already marked
      if (e.type === "mouseover" && this.mySeats > 0 && this.clickedSeats.length < this.mySeats) {
        //Reset try to hover
        let tryToHover = [];

        //If we want to book more than one seat and the seat we are right now hovering over isnt taken
        if (this.mySeats > 1 && !this.freePlaces[index].booked && !this.seperateSeats) {
          //Try mark seats to right when hovering
          try {
                for (let i = index; i < this.mySeats + index; i++) {

                      //Check if some of the seats are taken, if it is exit the loop an run catch
                      if (this.freePlaces[i].booked) {throw "Platsen är redan bokad";}

                      //Fill the tryToHover array with seats we want to mark on hover
                      tryToHover.push(this.freePlaces[i].seatNumber);

                      //Get the row letter for the first and last seat in the array that we want to mark when hovering
                      let lastIndex = tryToHover[tryToHover.length - 1].length === 2 ? tryToHover[tryToHover.length - 1].slice(0, -1) : tryToHover[tryToHover.length - 1].slice(0, -2);
                      let firstIndex = tryToHover[0].length === 2 ? tryToHover[0].slice(0, -1) : tryToHover[0].slice(0, -2);

                      //Check if the firstSeat row letter and the last seat row letter is not the same
                      //If they don´t match dont hover because the theres more seats on the row to mark
                      if (firstIndex !== lastIndex) {
                        throw "Out Of Bounds";
              }
            }
          }
          catch (e) {
            //If previous loop doesn´t go as planned try mark the seats to left
            tryToHover = this.goToLeft(index, tryToHover);
          }
          //If try to hover is not undefined(everything went as it should in printing to left)
          //Mark the seats to be yellow now by setting this.seatsToHover to the seats we tested before to see if we could hover them
          if (tryToHover !== undefined) {
            this.seatsToHover = tryToHover;
          }
          //if it didn´t find any seats to left either to hover, seat seatsToHover to empty to not show any missleading hover
          else {
            this.seatsToHover = [];
          }
        }
        //If user only wants to book one seat , just push the current hovering seat to be shown as hovered
        else if (!this.freePlaces[index].booked) {
          tryToHover.push(e.target.id);
          this.seatsToHover = tryToHover;
        }
      }
      //Whe mouseLeaves a seat just trigger the watch on leaving seat variable in MovieSeat.vue to unmark the seats that was hovered
      else if (e.type === "mouseleave") {
        this.leavingSeat = !this.leavingSeat;
      }

      //If we click the seat that we are hovering over
      else if (e.type === "click") {

        //First check if there is any seats that are being displayed as hovered
        if (this.seatsToHover.length !== 0) {
          //If there is, keep adding seats to the clickedSeats array untill
          //the length of that matches the number of tickets the user choosed
          if (this.clickedSeats.length < this.mySeats && !this.clickedSeats.includes(e.target.id)) {
            this.markSeatsClicked = !this.markSeatsClicked;
            this.clickedSeats.push(...this.seatsToHover);
          }
          //If the user choosed as many seats as tickets, and then clicks again on a seat,
          //check if the seat is choosen and if it is,
          //unmark that/those seats(Depending if the user choosed one or multiple, if multiple all the seats will unmark)
          else if (this.clickedSeats.includes(e.target.id) && !this.seperateSeats) {
            this.markSeatsClicked = !this.markSeatsClicked;
            this.clickedSeats = [];
          }

          else if(this.clickedSeats.includes(e.target.id) && this.seperateSeats){
            this.markSeatsClicked = !this.markSeatsClicked;
            this.clickedSeats.splice(this.clickedSeats.indexOf(e.target.id),1);
            this.seatsToHover = e.target.id;
          }

          //Everytime we click a seat update BokningSida.vue with this information so it can check
          //When user presses boka button to se if he choose seats or not.
          this.$emit("checkAllSeatsChoosen", this.clickedSeats);
        }
      }
    },

    //If something doesn´t go right, go left
    // (Does the same as marking seats to right but tries to do it to left instead)
    goToLeft(index, tryToHover) {
      tryToHover = [];
      let outOfBounds = false;
      try {
        for (let j = index; j > index - this.mySeats; j--) {
          if (this.freePlaces[j].booked) {throw "Platsen är redan bokad";}

          tryToHover.push(this.freePlaces[j].seatNumber);

          let lastIndex = tryToHover[tryToHover.length - 1].length === 2 ? tryToHover[tryToHover.length - 1].slice(0, -1) : tryToHover[tryToHover.length - 1].slice(0, -2);
          let firstIndex = tryToHover[0].length === 2 ? tryToHover[0].slice(0, -1) : tryToHover[0].slice(0, -2);

          if (firstIndex !== lastIndex) {throw "Out Of Bounds";}
        }
      } catch (e) {
        outOfBounds = true;
      }
      if (!outOfBounds) {
        return tryToHover;
      }
    }
  },

  watch: {
    //Watches the +/- buttons in BokningSida.vue, if user pressses them reset the seats user choose
    btnPressed: function() {
      this.markSeatsClicked = false;
      this.clickedSeats = [];
      this.seatsToHover = [];
      this.$emit("checkAllSeatsChoosen", this.clickedSeats);

      if(this.mySeats <= this.longestFreeRow){
        this.showSeperateSeatsBtn = true;
        this.seperateSeats = false;
      }else{
        this.showSeperateSeatsBtn = false;
        this.seperateSeats = true;
      }
    },

    seperateSeats: function(){
      this.markSeatsClicked = false;
      this.clickedSeats = [];
      this.seatsToHover = [];
      this.$emit("checkAllSeatsChoosen", this.clickedSeats);
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
