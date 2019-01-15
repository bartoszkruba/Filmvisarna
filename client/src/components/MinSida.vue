<template>
  <section>
    <b-jumbotron class="jumbotron"><h1>{{this.$store.state.loggedInUser.name}}</h1></b-jumbotron>
    <section class="order-history">
      <h1>Orderhistorik</h1>
    <b-table striped hover :items="this.$store.state.loggedInUser.bookedTickets"></b-table>
    </section>
  </section>
</template>

<script>
import api from "@/services/Api.js";

const items = [
  {Film: 'Djunelboken' , Pris: '85kr', Datum: '2018-12-01'},
  {Film: 'Tintin' , Pris: '300kr', Datum: '2019-11-01'},
  {Film: 'Skönheten och Odjuret' , Pris: '85kr', Datum: '2019-12-01'},
  {Film: 'Göta Kanal' , Pris: '85kr', Datum: '2019-01-01'},
  {Film: 'Hejsan Hoppsan' , Pris: '85kr', Datum: '2018-12-01'},
]
export default {
  data(){
    return{
      items
    }
  }
};
</script>

<style scoped>
  .jumbotron {
    background:linear-gradient(180deg,transparent,rgba(0,0,0,.16)),linear-gradient(#860717,#860717);
    border-radius: 0;
    color: white;
    text-align: center;
  }

  .order-history {
    padding: 1% 5%;
    text-align: center;
  }

</style>
