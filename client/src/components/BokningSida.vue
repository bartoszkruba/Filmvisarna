<template> 
<div>
    <div>
        <div class="papillon"></div>
    <img src ="https://i.ytimg.com/vi/xqj7XOv9mC8/maxresdefault.jpg">
  </div> <p>
    <!-- {{movies}} -->

    <div class="text"> 
        <div class="antal-bilijetter">
           <h4>Antal bilijetter:</h4>
        </div>
        <div class="antal">
           <button v-on:click="minus" type="button" class="btn btn-dark">+</button>
           <h5 class="hej"> {{antal}}st/{{pris}}kr </h5>
           <button v-on:click="plus" type="button" class="btn btn-dark">+</button>
        </div>
        <div>
           <button type="button" class="slutför btn btn-danger">Slutför bokning</button>
        </div>
    </div>

</div>

</template> 
 
<script> 
let pris = 150;
let antal=1;
import api from "@/services/Api.js"; 

 
export default {
  name: "BokningSida", 
  data() { 
    return { 
        antal: null,
        pris: null,
        movies: null
    }; 
  }, 
   created(){
      this.getMovies();
      this.plus();
        },
  methods: {
      async getMovies(){
          this.movies = await api.getMovies();
          this.movies = this.movie.data
      },
      plus(){
          this.pris+= 150;
          this.antal+=1;
      },
      minus(){
          if (this.pris>150){
          this.pris-= 150;
          this.antal-=1;}
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
h4, h5{
    color: white;
}

.papillon{
    position: absolute;
    display: block;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(180deg,rgba(14,15,15,0) 50%,#0e0f0f);
    height: 37.3vh;
}
img{
    height: 30vh;
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
}
.hej{
    margin: 0 2vw;
}
@media screen and (min-height: 600px) {
    .papillon{
    height: 38vh;
}
    
}


</style> 