
<template>
  <section class="movie-saloon">
    <section class="screen col-md-4 offset-md-4 col-8 offset-2">
      Bioduk
    </section>
    <section class="instruktions">
        <h5>Välj Platser</h5>
        <p>Väl platser genom att klicka i salongen</p>
    </section>
    <section class="seats">
      <template v-for="(rows,index) in seatsPerRow">
        <section class="rows">
        <template v-for="seat in seatsPerRow[index]">
          <MovieSeat />
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
  data() {
    return {
      seatsPerRow: null,
      totalSeats: null,
      freePlaces: null,
    };
  },
  components: {
    MovieSeat
  },
  mounted: async function() {
    const response = await api.getTheatres({ _id: "5c3dae361a418e28df53e67a" });
    const sessionSeats = await api.getMovieSessions({
      _id: "5c4042698cf2136b74961eb1"
    });
    console.log(sessionSeats.data.movie_sessions[0].freePlaces);
    this.freePlaces = sessionSeats.data.movie_sessions[0].freePlaces;
    this.seatsPerRow = response.data.movie_theatres[0].seatsPerRow;
    this.totalSeats = response.data.movie_theatres[0].seats;
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .movie-saloon{
    text-align: center;
    height: 100%;
  }
  .rows {
    justify-content: center;
    display: flex;
    margin-bottom:1%;
  }
  .screen{
    text-align: center;
    color: white;
    background-color: gray;
    margin-bottom: 2%
  }
  .instruktions {
    text-align: center;
  }
</style>
