<template>
  <div id="app">
    <Header></Header>
    <main>
      <LoggaIn v-if="$store.state.showLoggaInWindow"></LoggaIn>
      <router-view/>
    </main>
    <Footer/>
  </div>
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";
import LoggaIn from "./components/LoggaIn";
export default {
  name: "App",
  components: {
    Header,
    Footer,
    LoggaIn
  },
  data() {
    return {
      logginShow: false
    };
  }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Poppins');

.list-style-none{
  list-style: none;
  margin: 0;
  padding: 0;
}

.dark-transparent{
  background-color: rgba(0, 0, 0, 0.5);
}

.text-shadow{
  text-shadow: 4px 1px 1px  #000;
}

body {
  font-family: 'Poppins', sans-serif;
  min-height: 100vh;
  flex-direction: column;
  display: flex;
  background-image: url(http://www.milanticketsopera.com/themes/theater/images/img.jpg);
  background-attachment: fixed;
  background-size: cover;
  background-position: center;
  overflow-x: hidden;
}
#app {
  flex: 1;
  display: flex;
  flex-direction: column;
}
main {
  flex: 1;
}
</style>
