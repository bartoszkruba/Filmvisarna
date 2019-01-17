<template>
  <div id="app">
    <Header></Header>
    <main>
    <b-modal  v-model="$store.state.showLoggaInWindow" hide-footer title="Registrera / Logga In "><LoggaIn /></b-modal>
    <router-view/>
    </main>
    <Footer />
  </div>
</template>

<script>
import Header from './components/Header';
import Footer from './components/Footer';
import LoggaIn from './components/LoggaIn';
export default {
  name: 'App',
  components: {
    Header,
    Footer,
    LoggaIn
  },
  data(){
    return{
      logginShow: false,
    }
  },
}
</script>

<style> 
  body {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    /* background-color: black;
    color: white; */
  }
  #app{
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  main{
    flex: 1;
  }

</style>
