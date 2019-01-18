<template>
  <section>
    <b-jumbotron class="jumbotron">
      <h1>{{this.$store.state.loggedInUser.name}}</h1>
      <b-link @click="displayUserSettings">
        <font-awesome-icon class="mr-2" icon="pen"/>Uppdatera Medlemsprofil
      </b-link>
    </b-jumbotron>
    <section class="order-history">
      <h1>Orderhistorik</h1>
      <b-table striped hover responsive :fields="fields" :items="this.$store.state.loggedInUser.bookedTickets"></b-table>
    </section>
    <b-modal v-model="showUserSettings" title="Uppdatera Medlemsprofil" ok-only>
      <h5>{{this.$store.state.loggedInUser.name}}</h5>
      <label for class="mt-3">E-postadress</label>
      <b-input-group>
        <b-form-input :disabled="!showEmailButton" ref="emailField"></b-form-input>
        <b-input-group-append>
          <b-btn variant="outline-danger" class="mr-1 ml-1" @click="editEmailClicked('undo')" v-if="showEmailButton">Ångra</b-btn>
          <b-btn variant="outline-success" @click="editEmailClicked('save')" v-if="showEmailButton">Spara</b-btn>
          <b-btn variant="info" @click="editEmailClicked('edit')" v-if="!showEmailButton">Redigera</b-btn>
        </b-input-group-append>
      </b-input-group>
      <label for class="mt-3">Lösenord</label>
       <b-input-group>
        <b-form-input :disabled="!showPasswordButton" type="password" :value="this.$store.state.loggedInUser.password"></b-form-input>
        <b-input-group-append>
          <b-btn variant="outline-danger" class="mr-1 ml-1" @click="editPasswordClicked('undo')" v-if="showPasswordButton">Ångra</b-btn>
          <b-btn variant="outline-success" @click="editPasswordClicked('save')" v-if="showPasswordButton">Spara</b-btn>
          <b-btn variant="info" @click="editPasswordClicked('edit')" v-if="!showPasswordButton">Redigera</b-btn>
        </b-input-group-append>
      </b-input-group>
      <b-button variant="danger" class="mt-5" @click="deleteAccount">Avsluta medlemsskap</b-button>
    </b-modal>
    <b-modal v-model="deleteAccountPopup" title="Avsluta Medlemsskap" cancel-title="Nej" ok-title="Ja"><p>Är du säker på att du vill asvluta ditt medlemsskap hos filmvisarna? <br> <br>Detta innebär att alla dina uppgifter raderas permanent från vår databas</p></b-modal>
  </section>
</template>

<script>
import api from "@/services/Api.js";
export default {
  data() {
    return {
      showUserSettings: false,
      showEmailButton: false,
      showPasswordButton: false,
      deleteAccountPopup: false,
      test: this.$store.state.loggedInUser.email,
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
  methods: {
    displayUserSettings() {
      this.showUserSettings = !this.showUserSettings;
    },
    editEmailClicked(clicked){
      console.log(clicked);
      this.showEmailButton = !this.showEmailButton;
      if(clicked === 'undo') {
        console.log(this.$refs.emailField);
        this.$refs.emailField.value ="fuck this";
      }
    },

    editPasswordClicked(){
      this.showPasswordButton = !this.showPasswordButton;
    },

    deleteAccount(){
      this.deleteAccountPopup = true;
    }
  },
  mounted: async function() {
    if (!this.$store.state.loggedInUser.name) {
      this.$router.push("/LoggaIn");
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
}
</style>
