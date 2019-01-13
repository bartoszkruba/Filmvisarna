<template>
  <footer class="footer">
    <section class="footer-info">
      <section class="footer-section">
        <h5>Kontakta Oss</h5>
        <p>
          <font-awesome-icon style="margin-right: 5px" icon="envelope"/>kundservice@filmvisarna.se
        </p>
        <p>
          <font-awesome-icon style="margin-right: 5px" icon="phone"/>05 17 00 00
        </p>
        <hr>
      </section>
      <section class="footer-section">
        <h5>Postadress</h5>
        <p>Filmvisarna AB</p>
        <p>Storagatan, 213 56 Malmö</p>
        <hr>
      </section>
    </section>
    <section class="footer-section-2">
      <section class="copyright footer-section">
        <p>Filmvisarna ©2019</p>
      </section>
      <section class="footer-section">
        <p><font-awesome-icon :icon="['fab', 'facebook']"/>
        <font-awesome-icon :icon="['fab', 'instagram']"/>
        <font-awesome-icon :icon="['fab', 'twitter']"/></p>
      </section>
    </section>
  </footer>
</template>

<script>
export default {
  name: "Footer"
};
</script>

<style scoped>
p {
  margin: 0;
  padding: 0;
}
hr {
  background-color: white;
}

.footer {
  display: flex;
  flex-direction: column;
  background-color: #cc0020;
  color: white;
  padding: 1%;
}
.footer-info {
  display: flex;
  flex-direction: row;
}
.footer-section {
  flex: 1;
  text-align: center;
}
.footer-section-2 {
  display: flex;
  flex-direction: row;
}
.copyright {
  text-align: center;
  font-size: 90%;
}

@media screen and (max-height: 900px) and (max-width: 500px) {
  .footer-info {
    flex-direction: column;
  }

  .footer-section-2 {
  flex-direction: column;
}
}
</style>
