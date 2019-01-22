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
body {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-image: url(http://www.milanticketsopera.com/themes/theater/images/img.jpg);
  background-position: sticky;
  background-size: 100% 100%;
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
