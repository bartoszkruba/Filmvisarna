
<template>
<div class="Nothing">

  <b-jumbotron bg-variant="white">
    <section class="centersection">
      <h1>Något blev fel!</h1>
      <p>Sidan du försöker visa finns inte. Det kan bero på något av följande</p>
      <ul>
        <li>Antipiratbyrån har hackat oss</li>
        <li>Vår hemsida har tekniskt strul</li>
        <li>Du har klickat på en gammal länk</li>
      </ul>
      <router-link class="router-link" to="/" exact-active-class="menu-item-active">Klicka här för att komma till startsidan</router-link>
    </section>
  </b-jumbotron>


</div>
</template>

<script>



export default {
  name: "Nothing",
  data() {
    return {

    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.centersection{
  text-align: center;
}
</style>
