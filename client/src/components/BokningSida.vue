<template>
<main>

<section v-if="movie === null">
        <h1>Något blev fel!</h1>
        <p>Vi hittade ingen film med det ID som angavs. Det kan bero på något av följande</p>
        <ul>
          <li>Antipiratbyrån har hackat oss</li>
          <li>Vår hemsida har tekniskt strul</li>
          <li>Du har klickat på en gammal länk</li>
        </ul>
        <router-link class="router-link" to="/moviesPage" exact-active-class="menu-item-active">Klicka här för att komma till alla filmer</router-link>

      </section>

      <section v-else>

    <div>


    <img :src="require('../assets/'+this.movie.images[0])" class="img">
        <div class="papillon">
            <h1>{{movie.title}}</h1>
            <div class="antal-bilijetter">

            </div>
        </div>
  </div>


    <div class="text">
         <h4>Antal biljetter:</h4>
        <p><strong> Ordinarie</strong></p>
        <div class="antal">
           <button v-on:click="minus" type="button" class="btn btn-dark">-</button>
           <h5 class="hej"> {{antal}} st / {{pris}}kr per st </h5>
           <button v-on:click="plus" type="button" class="btn btn-dark">+</button>
        </div>
        <p><strong> Pensionär</strong></p>
         <div class="antal">
           <button v-on:click="minusPensionar" type="button" class="btn btn-dark">-</button>
           <h5 class="hej"> {{antalPensionar}} st / {{prisPensionar}}kr per st </h5>
           <button v-on:click="plusPensionar" type="button" class="btn btn-dark">+</button>
        </div>

        <div v-if="movie.ageLimit<15">
        <p class="barn"><strong> Barn</strong></p>
        <div class="antal">
           <button v-on:click="minusBarn" type="button" class="btn btn-dark">-</button>
           <h5 class="hej"> {{antalBarn}} st / {{prisBarn}}kr per st </h5>
           <button v-on:click="plusBarn" type="button" class="btn btn-dark">+</button>
        </div>
        </div>
        <div class="kostnad" v-if="totalt>=65">
            <h3>Kostnad</h3>
            <p class="totalt" >totalt: {{totalt}}kr</p>
        </div>
        <div class="slutför btn">
           <button v-on:click="visaFelMedellande" type="button" class="btn btn-danger">Slutför bokning</button>

           <p class="felMedellande" v-if="visaMedellande">Du måste välja minst en biljett</p>
        </div>
    </div>
      </section>
</main>

</template>

<script>
let pris = 85;
let antal=0;
let antalPensionar=0;
let prisPensionar= 75;
let antalBarn=0;
let prisBarn= 65;
let totalt=0;
import api from "@/services/Api.js";


export default {
  name: "BokningSida",
  data() {
    return {
        antal: null,
        antalPensionar: null,
        prisPensionar: null,
        antalBarn: null,
        prisBarn: null,
        pris: null,
        movie: null,
        totalt: null,
        visaMedellande: false
    };

  },
  mounted: function() {
    this.getMovieByID();
  },
  watch: {
    '$route': function() {
      this.getMovieByID();
    }
  },
   created(){
      this.pris=85;
      this.prisPensionar= 75;
      this.prisBarn= 65;
      this.antalPensionar=0;
      this.antalBarn=0;
      this.antal=0;
      this.totalt=0;

        },
  methods: {
      async getMovieByID() {
      if(this.movieID() !== null){
        try{
          const response = await api.getMovies({_id: this.movieID()});
          if(response.data.movies.length > 0)
            this.movie = response.data.movies[0];


        } catch(error){
          this.movie = null;
        }
      } else {
         this.movie = null;
        }
      },
      movieID(){
      if(window.location.hash.indexOf("?") > 0)
        return window.location.hash.substr(window.location.hash.indexOf("?")+1);
      return null;

      },
      plus(){
          this.antal+=1;
          this.totalt+=85;
          this.visaTotal = true;
          this.visaMedellande = false;
      },
      minus(){

          if (this.antal>0){
          this.totalt-=85
          this.antal-=1;}
          else {
              alert('Du kan inte välja mindre än en biljett ')
          }

      },
      plusPensionar(){
          this.totalt+=75;
          this.antalPensionar+=1;
          this.visaTotal = true;
          this.visaMedellande = false;

      },
      minusPensionar(){
          if (this.antalPensionar>0){
          this.totalt-=75
          this.antalPensionar-=1;
          }
          else {
              alert('Du kan inte välja mindre än en biljett ')
          }

      },
      plusBarn(){
          this.totalt+=65
          this.antalBarn+=1;
          this.visaTotal = true;
           this.visaMedellande = false;
      },
      minusBarn(){
          if (this.antalBarn>0){
          this.antalBarn-=1;
          this.totalt-=65
          }
          else {
              alert('Du kan inte välja mindre än en biljett ')
          }

      },
      visaFelMedellande(){
          if(this.totalt==0)
              this.visaMedellande = true;
      }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.kostnad{

    display: flex;
    width: 40vw;
    justify-content: space-between;
    margin-top: 10vh;
    padding-top: 2vh;
    border-top: .0625rem solid rgba(94, 94, 94, 0.411);
}
.antal-bilijetter{
    display: flex;
    justify-content: center;
    margin: 3vh 0;
}
.bokning{
    margin: 3vh;
}
h4, h5,p, h1{

    margin-top: 2vh;
}
.totalt{
    margin-top: 0.5vh;
}
h1{
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 2.55rem;
    margin-top: 5vh;
    color: white;
    text-shadow: -3px 3px 10px black, -3px 3px 10px black, -3px 3px 10px black, 3px -3px 10px black;
    font-weight: bold;
    font-style: oblique;
}
h4{
    margin: 0;
}
.barn{
text-align: center;
}

.papillon{
    position: relative;
    margin-top: -17vh;
    display: block;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

}
img{
    width: 100vw;
    box-shadow: 2px 2px 80px black;
}

.antal{
    margin: 0;
    display: flex;
    justify-content:space-around;
}
.slutför{
    margin: 8vh auto
}
.text{
   display: flex;
   flex-direction: column;
   align-items: center;
   margin-top: 8vh
}
.hej{
    margin: 0 2vw;
}

.felMedellande{
    font-size: 1vw;
    color: red;
    margin-top: 1vh;
    margin-bottom: 0;
}
@media screen and (max-width: 416px) {
    h1{
    margin-top: 8vh;
    font-size: 1.3rem;
    }
}


</style>
