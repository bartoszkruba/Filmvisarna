<template> 
<div>
    <div>
        <div class="papillon">
            <h1>{{movie.title}}</h1>
            <div class="antal-bilijetter">
               <h4>Antal bilijetter:</h4>
            </div>
        </div>
    <img src ="https://i.ytimg.com/vi/xqj7XOv9mC8/maxresdefault.jpg"> 
    
  </div> 
   

    <div class="text"> 
        
        <p>Ordinarie</p>
        <div class="antal">
           <button v-on:click="minus" type="button" class="btn btn-dark">-</button>
           <h5 class="hej"> {{antal}}st/{{pris}}kr </h5>
           <button v-on:click="plus" type="button" class="btn btn-dark">+</button>
        </div>
        <p>Pensionär</p>
         <div class="antal">
           <button v-on:click="minusPensionar" type="button" class="btn btn-dark">-</button>
           <h5 class="hej"> {{antalPensionar}}st/{{prisPensionar}}kr </h5>
           <button v-on:click="plusPensionar" type="button" class="btn btn-dark">+</button>
        </div>
        <p>Barn</p>
        <div class="antal">
           <button v-on:click="minusBarn" type="button" class="btn btn-dark">-</button>
           <h5 class="hej"> {{antalBarn}}st/{{prisBarn}}kr </h5>
           <button v-on:click="plusBarn" type="button" class="btn btn-dark">+</button>
        </div>
        <div>
           <button type="button" class="slutför btn btn-danger">Slutför bokning</button>
        </div>
    </div>

</div>

</template> 
 
<script> 
let pris = 85;
let antal=1;
let antalPensionar=1;
let prisPensionar= 75;
let antalBarn=1;
let prisBarn= 65;
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
        movie: null
    }; 
  }, 
   created(){
      this.getMovies();
      this.plus();
      this.plusPensionar();
      this.plusBarn();

        },
  methods: {
      async getMovies(){
          const response = await api.getMovies();
          this.movie = response.data.movies[0];
      },
      plus(){
          this.pris+= 85;
          this.antal+=1;
      },
      minus(){
          if (this.pris>85){
          this.pris-= 85;
          this.antal-=1;}
          else {
              alert('Du kan inte välja mindre än ett biljett ')
          }
      },
      plusPensionar(){
          this.prisPensionar+= 75;
          this.antalPensionar+=1;
      },
      minusPensionar(){
          if (this.prisPensionar>75){
          this.prisPensionar-= 75;
          this.antalPensionar-=1;
          }
          else {
              alert('Du kan inte välja mindre än ett biljett ')
          }
      },
      plusBarn(){
          this.prisBarn+= 65;
          this.antalBarn+=1;
      },
      minusBarn(){
          if (this.prisBarn>65){
          this.prisBarn-= 65;
          this.antalBarn-=1;
          }
          else {
              alert('Du kan inte välja mindre än ett biljett ')
          }
      }
  } 
}; 
</script> 
 
<!-- Add "scoped" attribute to limit CSS to this component only --> 
<style > 
main{
    background-color: black;
}
.antal-bilijetter{
    display: flex;
    justify-content: center;
    margin: 3vh 0;
}
.bokning{
    margin: 3vh;
}
h4, h5, p, h1{
    color: white;
    margin-top: 2vh;
}
h1{
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 33vh;
}

.papillon{
    position: absolute;
    display: block;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(180deg,rgba(14,15,15,0) 50%,#0e0f0f);
    height: 45.3vh;
}
img{
    height: 45vh;
    width: 100%;
}

.antal{
    margin: 0;
    display: flex;
    justify-content:space-around;
}
.slutför{
    margin: 5vh auto
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
@media screen and (max-height: 600px) {
    .papillon{
    height: 32vh;
}
    
}


</style> 