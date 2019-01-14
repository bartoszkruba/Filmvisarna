<template>
  <div id="app">
    <Header />
    <main>
    <router-view/>
    </main>
    <Footer />
  </div>
</template>

<script>
import Header from './components/Header';
import Footer from './components/Footer'
export default {
  name: 'App',
  components: {
    Header,
    Footer
  }
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
