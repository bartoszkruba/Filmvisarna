
<template>
  <section class="movie-saloon">
    <section class="instruktions">
      <h5><span v-if="mySeats > 0">Välj {{mySeats}} Platser</span> <span v-else>Välj antal biljetter du vill boka</span></h5>
      <p v-if="mySeats > 0">Välj platser genom att klicka på stolarna i salongen</p>
    </section>
    <section class="screen">Bioduk</section>
    <section class="seats mt-5">
      <template v-for="(rows,index) in seatsPerRow">
        <section class="rows">
          <template v-for="(seat, index2) in seatsPerRow[index]">
            <MovieSeat
              @setChoosenSeats="setChoosenSeats"
              :myId="freePlaces[(count(index)+index2)].seatNumber"
              :seatBooked="freePlaces[(count(index)+index2)].booked"
              :moreSeats="moreSeats"
            ></MovieSeat>
          </template>
        </section>
      </template>
    </section>
  </section>
</template>

<script>
import api from "@/services/Api.js";
import MovieSeat from "@/components/MovieTheatres/MovieSeat";
export default {
  name: "MovieSaloon",
  props: ["theatreID", "sessionID", "mySeats"],
  data() {
    return {
      seatsPerRow: null,
      totalSeats: null,
      freePlaces: null,
      choosenSeats: [],
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

    //Sets the choosen
    setChoosenSeats(seatsChoosen) {
      console.log(seatsChoosen);
      //If choosen seats is already in array and it comes as an input again,
      //remove it from array because user undid his choise
      if (this.choosenSeats.includes(seatsChoosen)) {
        this.choosenSeats.splice(this.choosenSeats.indexOf(seatsChoosen), 1);
      } else {
        if (this.moreSeats) {
          //otherwise add it to the array
          this.choosenSeats.push(seatsChoosen);
        } else {
          console.log("du får inte välja fler säten");
        }

      }
      this.$emit('checkAllSeatsChoosen',this.moreSeats, this.choosenSeats);
      console.log(this.choosenSeats);
    }
  },
  computed:{
    moreSeats: function(){
      return this.mySeats > this.choosenSeats.length;
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
</style>
