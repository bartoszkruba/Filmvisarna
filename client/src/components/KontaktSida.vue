<template> 
  <div class="main"> 
    <h1>Kontakt</h1> 

    <div class="kontakta">
      <h3>Sveriges största biograf</h3>
      <p>Filmvisarna AB är en av Sveriges ledande leverantörer av kultur och nöje med 
        ca 12 miljoner biobesök per år. Vi ingår i Odeon Cinemas Group som ägs av världens 
        största biografkedja AMC Theatres.</p>

    </div>
    
    <div class="kontakta">
      <h3>Biografer:</h3>
      <h6>ECutbildningar</h6>
      <div class="biograf">
      <p>Storagatan, 213 56 Malmö</p>
      <p>Telefon 05-17 17 00 00</p></div>
    </div>


    <div class="kontakta">
      <h3>Kontakta oss via e-post</h3>
      <p>På e-postadressen <strong> kundservice@grupplosa.se</strong> 
      kontaktar du oss om frågor eller åsikter som gäller biobesöket, webbplatsen osv. </p>
    </div>
    <div class="kontakta">
      <h3>För reservation av rullstolsplats</h3>
      <p>Telefon 05-17 17 00 00</p>
      <p>Öppet måndag - fredag 10:00-17:00, lördag - söndag 11:00-16:00</p>
      <p>Julafton stängt</p>
      <p>Nyårsafton 10:00-15:00</p>
      <p>Nyårsdagen 11:00-17:00</p>
    </div>
    <div class="kontakta">
      <h3>Postadress</h3>
      <p>GL Bio AB</p>
      <p>Kundservice</p>
      <p>Storagatan, 213 56 Malmö</p>

    </div>
  </div> 
</template> 
 
<script> 
import api from "@/services/Api.js"; 
 
export default { 
  name: "KontaktSida", 
  data() { 
    return { 
    }; 
  }, 
  methods: { 
  } 
}; 
</script> 
 
<!-- Add "scoped" attribute to limit CSS to this component only --> 
<style scoped> 
h1{
  margin-top: 3vh;
  text-align: center;
}
.kontakta{
  width: 50vw;
  margin-top: 6vh; 
  margin-left: 20vw;
}
.biograf{
  margin: 0;
  color: rgb(102, 102, 102);
}
</style> 