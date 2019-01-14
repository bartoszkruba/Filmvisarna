<template> 
<div>
    <img src ="https://i.ytimg.com/vi/xqj7XOv9mC8/maxresdefault.jpg" class="papillon float-right">
   <p>
       {{movies}}
      <h4><label class=" ">Antal bilijett(er):</label></h4>
      <select id="antal-bilijetter">
        <option value="one" class="one">1</option>
        <option value="two" class="">2</option>
        <option value="three" class="">3</option>
        <option value="thour" class="">4</option>
        <option value="five" class="">5</option>
        <option value="sex" class="">6</option>
        <option value="sven" class="">7</option>
      </select>
      <button @click="getMovies">getMovies</button>
        
</div>

</template> 
 
<script> 
import api from "@/services/Api.js"; 
 
export default {
  name: "BokningSida", 
  data() { 
    return { 
        movies: null
    }; 
  }, 
  methods: {
      async getMovies(){
          this.movies = await api.getMovies();
          this.movies = this.movie.data
      }
  } 
}; 
</script> 
 
<!-- Add "scoped" attribute to limit CSS to this component only --> 
<style > 
h4{
    width: 20vw;
    margin-right: 0;
}
.papillon{
    margin: 3vh 1vw 3vh 0;
   float: right;
   height: 25vh;
   width: 25vw;
}

</style> 