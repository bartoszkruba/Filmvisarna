<template>
  <section> 
    <section class="order-history">
      <h1 class="mt-5">{{this.$store.state.loggedInUser.name}}</h1>
      <h1 class="mt-5">Orderhistorik</h1>
      <b-table class="bg" striped hover responsive :fields="fields" :items="this.$store.state.loggedInUser.bookedTickets"></b-table>
    </section>
  </section>
</template>

<script>
import api from "@/services/Api.js";
export default {
  data() {
    return {
      fields: {
        orderID: {
          label: "Bokningsnummer",
          sortable: false
        },
        title: {
          label: "Film",
          sortable: false
        },
        theatre: {
          label: "Salong",
          sortable: false
        },
        totalTickets: {
          label: "Biljetter",
          sortable: false
        },
        price: {
          label: "Pris",
          sortable: false
        },
        time: {
          label: "Tid",
          sortable: false
        },
        date: {
          label: "Datum",
          sortable: true
        }
      }
    };
  },
  mounted: async function() {
    if (!this.$store.state.loggedInUser.name) {
      this.$router.push("/");
    } else {
      const response = await api.getTickets(this.$store.getters.getCredentials);
      this.$store.commit("updateTickets", response.data.bookedTickets);
    }
  }
};
</script>

<style scoped>
.jumbotron {
  background: linear-gradient(180deg, transparent, rgba(0, 0, 0, 0.16)),
    linear-gradient(#860717, #860717);
  border-radius: 0;
  color: white;
  text-align: center;
}

.order-history {
  padding: 1% 5%;
  text-align: center;
  color: white;
}

.bg{
  background-color: rgba(2, 2, 2, 0.4);
}
</style>
