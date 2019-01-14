<template>
  <div id="app">
    <router-view />
    <Footer />
  </div>
</template>

<script>
import Footer from './components/Footer'
export default {
  name: 'App',
  components: {
    Footer
  }
}
</script>

<style> 
  body {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
  #app{
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  .main{
    flex: 1;
  }

</style>
