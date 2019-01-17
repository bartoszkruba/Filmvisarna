<template>
  <section class="hello">
      <h1>kalendarium</h1>
  </section>
</template>

<script>
import api from "@/services/Api.js";

export default {
  name: "Kalendarium",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      movies: null
    };
  },
  created() {
    this.getMovies();
  },
  mounted(){
    this.getMovies();
  },
  methods: {
    async getMovies() {
      if(window.location.hash.indexOf("?") > 0){
        const response = await api.searchMovies(window.location.hash.substr(window.location.hash.indexOf("?")+1).replace('_', ' ')); 
        this.movies = response.data.movies;
        if(this.movies.length === 1){
          this.$router.push(`/Movie?${this.movies[0]._id}`);
        }
      }else{
        const response = await api.getMovies();
        this.movies = response.data.movies;
      }
    }
  },
  watch:{
    $route (to, from){
        this.getMovies();
    }
} 
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.flexbox {
  display: flex;
}
.flex-col {
  display: flex;
  flex-direction: column;
}
.flex-mobil {
  display: flex;
}
.main-placing {
  margin: 1rem;
}
p {
  padding: 0.5rem;
  padding-left: 1rem;
}
h2 {
  margin-left: 1rem;
  margin-bottom: 0;
  color: black;
  font-weight: bold;
  font-size: 3rem;
}
a:hover {
  text-decoration: none;
}
hr {
  border-color: black;
}
.posterpic {
  width: 20vmin;
  box-shadow: 2px 2px 5px black;
}
.images {
  margin: 0;
}
.info-direction {
  flex-direction: row;
}
.movietext{
  display: flex;
  align-items: center;
  justify-content: center;
}
@media screen and (min-width: 501px) and (max-width: 1500px) {
  h2 {
    font-size: 2rem;
  }
  p {
    font-size: 1.2rem;
    margin: 0;
    line-height: 0.5rem;
  }
  
  .info-direction {
    flex-direction: column;
  }
  .destop-only {
    display: none;
  }
}

@media screen and (max-width: 500px) {
  h2 {
    font-size: 1.5rem;
    margin-top: 0.8rem;
    margin-bottom: 0.5rem;
    text-align: center;
  }
  p {
    font-size: 0.7rem;
    padding: 0.1rem;
    line-height: 0.5rem;
  }
  .ptaggar {
    justify-content: center;
  }
  .flex-mobil {
    flex-direction: column;
  }
  .posterpic {
    width: 90vmin;
  }
  .info-direction {
    flex-direction: column;
    text-align: center;
  }
  .destop-only {
    display: none;
  }
}
</style>

