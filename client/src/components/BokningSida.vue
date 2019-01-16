<template> 
<main>
    <div>
       
       {{movie.}}
    <!--<img src="../assets/SecoundActBokning1.png"> -->
     <div class="papillon">
            <h1>{{movie.title}}</h1>
            <div class="antal-bilijetter">
               <h4>Antal bilijetter:</h4>
            </div>
        </div>
  </div> 
   

    <div class="text"> 
        
        <p>Ordinarie</p>
        <div class="antal">
           <button v-on:click="minus" type="button" class="btn btn-dark">-</button>
           <h5 class="hej"> {{antal}}st / {{pris}}kr per st </h5>
           <button v-on:click="plus" type="button" class="btn btn-dark">+</button>
        </div>
        <p>Pensionär</p>
         <div class="antal">
           <button v-on:click="minusPensionar" type="button" class="btn btn-dark">-</button>
           <h5 class="hej"> {{antalPensionar}}st / {{prisPensionar}}kr per st </h5>
           <button v-on:click="plusPensionar" type="button" class="btn btn-dark">+</button>
        </div>
        <p>Barn</p>
        <div class="antal">
           <button v-on:click="minusBarn" type="button" class="btn btn-dark">-</button>
           <h5 class="hej"> {{antalBarn}}st / {{prisBarn}}kr per st </h5>
           <button v-on:click="plusBarn" type="button" class="btn btn-dark">+</button>
        </div>
        <div class="kostnad" v-if="visaTotal">
            <h3>Kostnad</h3>
            <p class="totalt" >totalt: {{totalt}}kr</p>
        </div>
        <div class="slutför btn">
           <button v-on:click="visaFelMedellande" type="button" class="btn btn-danger">Slutför bokning</button>

           <p class="felMedellande" v-if="visaMedellande">Du måste välja minst ett biljett</p>
        </div>
    </div>

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

        visaTotal: false,
        visaMedellande: false
    };
    
  }, 
   created(){
      this.getMovies();
      this.pris=85;
      this.prisPensionar= 75;
      this.prisBarn= 65;
      this.antalPensionar=0;
      this.antalBarn=0;
      this.antal=0;
      this.totalt=0;

        },
  methods: {
      async getMovies(){
          const response = await api.getMovies();
          this.movie = response.data.movies[1];
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
              alert('Du kan inte välja mindre än ett biljett ')
          }
          if (this.antalBarn<1 && this.antalPensionar==0 && this.antal==0){
              this.visaTotal=false;
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
              alert('Du kan inte välja mindre än ett biljett ')
          }
          if (this.antalBarn==0 && this.antalPensionar<1 && this.antal==0){
              this.visaTotal=false;
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
              alert('Du kan inte välja mindre än ett biljett ')
          }
          if (this.antalBarn<1 && this.antalPensionar==0 && this.antal==0){
              this.visaTotal=false;
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
main{
    background-color: black;
}

.kostnad{
    
    display: flex;
    width: 40vw;
    justify-content: space-between;
    margin-top: 10vh;
    padding-top: 2vh;
    color: white;
    border-top: .0625rem solid rgba(255, 255, 255, 0.411);
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
    color: white;
    margin-top: 2vh;
}
.totalt{
    margin-top: 0.5vh;
    color: white;
}
h1{
    display: flex;
    flex-direction: column;
    align-items: center;
    
}

.papillon{
       position: relative;
margin-top: -15vh;
    display: block;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(180deg,rgba(14,15,15,0) 50%,#0e0f0f);
    height: 13.6vh;
}
img{
    width: 100vw;
    height: 40vh;
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


</style> 