<template>
<b-modal hide-footer size="lg" @hidden="loggInWindowClosed" v-model="$store.state.showLoggaInWindow" title="Registrera / Logga In ">
  <section class="form" v-if="!showLicenseAndAgreements">
    <b-form class="form-section register" @submit="submitRegistration">
      <h3>Registrera</h3>
      <label for>Namn</label>
      <b-input
        class="mb-2 mr-sm-2 mb-sm-0"
        v-model="form.username"
        required
        placeholder="Namn"
      />
      <label for class="mt-3">E-Mail</label>
      <b-input
        class="mb-2 mr-sm-2 mb-sm-0"
        v-model="form.email"
        required
        placeholder="Ex. example@example.com"
      />
      <label for class="mt-3">Lösenord</label>
      <b-input
        class="mb-2 mr-sm-2 mb-sm-0"
        v-model="form.password"
        required
        placeholder="Lösenord"
        type="password"
      />
      <label for class="mt-3">Repetera Lösenord</label>
      <b-input
        class="mb-2 mr-sm-2 mb-sm-0"
        v-model="form.repeatPassword"
        required
        placeholder="Repetera Lösenord"
        type="password"
      />
      <b-alert
      v-model="this.showErrorMessage"
      variant="danger"
      class="mt-3">{{this.message}}
      </b-alert>
      <b-alert
      v-model="this.showSuccessMessage"
      variant="success"
      class="mt-3">{{this.message}}
      </b-alert>
      <b-form-checkbox
        class="mb-2 mr-sm-2 mb-sm-0 mt-2"
        v-model="form.terms"
        required
      >Jag har läst och förstår <b-link @click="LicenseAndAgreement">villkoren</b-link><br>för att bli medlem på filmvisarna
      </b-form-checkbox>
      <b-button
      variant="primary"
      type="submit"
      class="mt-3 btn-danger">Registrera
      </b-button>
    </b-form>

    <b-form class="form-section sign-in" @submit="submitSignIn">
      <h3>Logga In</h3>
      <label for>E-Mail</label>
      <b-input
      class="mb-2 mr-sm-2 mb-sm-0"
      v-model="signInForm.email"
      required placeholder="E-Mail"
      />
      <label for class="mt-3">Lösenord</label>
      <b-input
      class="mb-2 mr-sm-2 mb-sm-0"
      type="password"
      v-model="signInForm.password"
      required placeholder="Lösenord"
      />
      <b-alert
      v-model="this.showErrorMessageSignIn"
      variant="danger"
      class="mt-3">{{this.messageSignIn}}
      </b-alert>
      <b-button variant="primary" type="submit" class="mt-3 btn-danger">Logga In</b-button>
    </b-form>
  </section>
  <AnvandarVillkor v-if="showLicenseAndAgreements" @closeLicenseAgreement="LicenseAndAgreement"/>
  </b-modal>
</template>

<script>
import api from "@/services/Api.js";
import AnvandarVillkor from "@/components/AnvandarVillkor";
export default {
  name: "LoggaIn",
  components: {
    AnvandarVillkor
  },
  data() {
    return {
      modalShow: false,
      showErrorMessage: false,
      showSuccessMessage: false,
      showErrorMessageSignIn: false,
      showLicenseAndAgreements: false,
      message: '',
      messageSignIn: '',
      form: {
        username: "",
        email: "",
        password: "",
        repeatPassword: "",
        terms: false
      },
      signInForm: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    async submitRegistration() {
      const user = {
        name: this.form.username,
        email: this.form.email,
        password: this.form.password
      };
      if(this.validatePassword(this.form.password,this.form.repeatPassword)){
      try {
        const response = await api.registerUser({ user });
        this.showErrorMessage = false;
        this.message = response.data.message;
        this.showSuccessMessage = true;
      } catch (error) {
        this.message = error.response.data.error;
        this.showSuccessMessage = false;
        this.showErrorMessage = true;
      }
    }else{
      this.message = 'Lösenorden matchar inte varandra';
      this.showErrorMessage = true;
      this.showSuccessMessage = false;
    }

    },
    validatePassword(password,repeatPassword){
      return password === repeatPassword ? true : false;
    },

    async submitSignIn(){
      const user = {
        email: this.signInForm.email,
        password: this.signInForm.password
      }
      const response = await api.loginUser({user})
      if(response.data.validated){
        this.showErrorMessageSignIn = false;
        this.$store.commit('toggleLoggaInWindow');
        this.$store.commit('showMinaSidor');
        this.$store.commit('setLoggedInUser',response.data);
        console.log("logga in")
        if(response.data.admin){
          this.$store.commit('showAdminControls');
        }

      }else{
        this.messageSignIn = "Email adressen och lösenordet matchade inte varandra eller finns inte registrerad, vänligen försök igen";
        this.showErrorMessageSignIn = true;
      }
    },
    loggInWindowClosed(){
      this.showLicenseAndAgreements = false;
      this.resetForm();
    },

    resetForm(){
      this.form = {
        username: "",
        email: "",
        password: "",
        repeatPassword: "",
        terms: false
      }
      this.signInForm = {
        email: "",
        password: ""
      }
    },

    LicenseAndAgreement(){
      this.showLicenseAndAgreements = !this.showLicenseAndAgreements;
    }
  }
};
</script>

<style scoped>
.form {
  display: flex;
  flex-direction: row;
}

.form-section {
  flex: 1;
  padding: 0 5%;
  margin-top: 5%;
  margin-bottom: 5%;
}

h3 {
  text-align: center;
}

.register {
  border-right: 2px solid black;
}

@media screen and (max-width: 600px) {
  .form {
    flex-direction: column;
    margin-left: 2%;
    margin-right: 2%;
  }
  .register {
    border-right: 0px solid black;
    order: 2;
  }
  .sign-in {
    border-bottom: 2px solid black;
    padding-bottom: 10%;
  }
}
</style>
